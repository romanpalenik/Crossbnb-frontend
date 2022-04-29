import {
  crossBnbAbi,
  CrossBnbContractAddress,
  nftAbi,
  NFTContractAddress,
} from "../constant";
const ethers = require("ethers");
const { setupParentArgs, waitForTx, log } = require("../utils");

const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export class EthersService {
  provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  wallet = new ethers.Wallet(
    "0x000000000000000000000000000000000000000000000000000000616c696365",
    this.provider
  );

  // Connect to the network
  erc721Instance = new ethers.Contract(NFTContractAddress, nftAbi, this.wallet);
  crossBnbContract = new ethers.Contract(
    CrossBnbContractAddress,
    crossBnbAbi,
    this.wallet
  );

  async createReality(form: any) {
    ipfs.addJSON(form.values, async (err: any, result: any) => {
      console.log(err, result);
      const url = `https://ipfs.infura.io/ipfs/${result}`;
      console.log(url);
      try {
        await this.erc721Instance.mint(
          "0x8e0a907331554AF72563Bd8D43051C2E64Be5d35",
          ethers.utils.hexlify("0x35"),
          url,
          {
            gasLimit: ethers.utils.hexlify(Number(800000)),
            gasPrice: ethers.utils.hexlify(Number(20000000000)),
          }
        );
      } catch (err) {
        console.log(err);
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
      }
    );
  }

  async getAllOffers() {
    return await this.crossBnbContract.getAllOffers();
  }

  async getCompleteInformationAboutOffer(offer: any) {
    //need to make from offer a object with all information
    let completeOffer = {
      owner: offer.owner,
      tokenId: offer.tokenId.toNumber(),
      price: offer.price.toNumber(),
      paymentToken: offer.paymentToken,
      state: offer.state,
    };
    // offer.tokenId = ethers.utils.hexlify(offer.tokenId);
    console.log(offer.tokenId);
    const urlWithTokenData = await this.erc721Instance.tokenURI(0x35);
    console.log(urlWithTokenData);
    const res = await fetch(urlWithTokenData);
    const tokenInfo = await res.json();
    console.log(tokenInfo);
    return { ...completeOffer, ...tokenInfo };
  }
}
