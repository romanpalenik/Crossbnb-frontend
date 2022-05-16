/* eslint-disable @typescript-eslint/no-unused-vars */

import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import {
  bridgeAbi,
  BridgeContractAddress,
  crossBnbAbi,
  CrossBnbContractAddress,
  ERC20SResourceId,
  nftAbi,
  NFTContractAddress,
} from '../constant';

const IPFS = require('ipfs-mini');

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export class EthersService {
  provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  wallet = new ethers.Wallet(
    '0x000000000000000000000000000000000000000000000000000000616c696365',
    this.provider,
  );

  // ts-ignore
  // provider = new ethers.providers.Web3Provider(window.ethereum);
  // signer = this.provider.getSigner();

  // Connect to the network
  erc721Instance = new ethers.Contract(NFTContractAddress, nftAbi, this.wallet);
  crossBnbContract = new ethers.Contract(
    CrossBnbContractAddress,
    crossBnbAbi,
    this.wallet,
  );

  bridgeInstance = new ethers.Contract(
    BridgeContractAddress,
    bridgeAbi,
    this.wallet,
  );

  async someCall() {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFTContractAddress, nftAbi, signer);
    const tokens = await contract.balanceOf(
      '0x8e0a907331554AF72563Bd8D43051C2E64Be5d35',
    );
    console.log('toto su tokeny', tokens);
  }

  async createReality(form: any) {
    ipfs.addJSON(form.values, async (err: any, result: any) => {
      const url = `https://ipfs.infura.io/ipfs/${result}`;
      try {
        await this.erc721Instance.mint(
          '0x8e0a907331554AF72563Bd8D43051C2E64Be5d35',
          ethers.utils.hexlify('0x35'),
          url,
          {
            gasLimit: ethers.utils.hexlify(Number(800000)),
            gasPrice: ethers.utils.hexlify(Number(20000000000)),
          },
        );
      } catch (err2) {
        console.log(err2);
      }
    });
  }

  async createOffer(form: any) {
    await this.crossBnbContract.createOffer(
      form.values.NFTId,
      form.values.price,
      form.values.tokenForPayment,
      {
        gasLimit: ethers.utils.hexlify(Number(800000)),
        gasPrice: ethers.utils.hexlify(Number(20000000000)),
      },
    );
  }

  async getAllOffers() {
    const offers = await this.crossBnbContract.getAllOffers();
    return offers;
  }

  async getOfferById(id: number) {
    const result = await this.crossBnbContract.getOffer(id);
    return result;
  }

  async getCompleteInformationAboutOffer(offer: any) {
    console.log('offer', offer);
    //need to make from offer a object with all information
    const completeOffer = {
      owner: offer.owner,
      tokenId: offer.tokenId.toNumber(),
      price: offer.price.toNumber(),
      paymentToken: offer.paymentToken,
      state: offer.state,
    };
    const urlWithTokenData = await this.erc721Instance.tokenURI(
      `0x${offer.tokenId.toNumber()}`,
    );
    const res = await fetch(urlWithTokenData);
    const tokenInfo = await res.json();
    return { ...completeOffer, ...tokenInfo };
  }

  bookOffer(offer: any) {
    return this.crossBnbContract.bookOffer(offer.id, {
      gasLimit: ethers.utils.hexlify(Number(800000)),
      gasPrice: ethers.utils.hexlify(Number(20000000000)),
    });
  }

  async sendERC20TokenCrossChain(
    amount: any,
    destinationId: number,
    recipient: string,
  ) {
    const decimals = 18;
    const data = `0x${
      ethers.utils
        .hexZeroPad(
          ethers.BigNumber.from(
            this.expandDecimals(amount, decimals),
          ).toHexString(),
          32,
        )
        .substr(2) // Deposit Amount        (32 bytes)
    }${
      ethers.utils
        .hexZeroPad(ethers.utils.hexlify((recipient.length - 2) / 2), 32)
        .substr(2) // len(recipientAddress) (32 bytes)
    }${recipient.substr(2)}`; // recipientAddress      (?? bytes)

    console.log(
      `  Amount: ${this.expandDecimals(amount, decimals).toHexString()}`,
    );
    console.log('Creating deposit to initiate transfer!');

    // Make the deposit
    const tx = await this.bridgeInstance.deposit(
      destinationId, // destination chain id
      ERC20SResourceId,
      data,
      {
        gasLimit: ethers.utils.hexlify(Number(800000)),
        gasPrice: ethers.utils.hexlify(Number(20000000000)),
      },
    );
    this.provider.waitForTransaction(tx.hash).then(async (tx2: any) => {
      if (tx2.status === 1) {
        console.log('Transaction Successful!');
        console.log('Offer is yours');
        console.log(tx2);
      } else {
        console.log('Transaction Failed!');
      }
    });
  }

  // eslint-disable-next-line max-len
  expandDecimals = (amount: any, decimals = 18) =>
    ethers.utils.parseUnits(String(amount), decimals);

  async getAllMyTokens(account: string) {
    const tokens = await this.erc721Instance.balanceOf(account);
    console.log('toto su tokeny', tokens);
    return [tokens];
  }
}
