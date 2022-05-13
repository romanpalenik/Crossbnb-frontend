/* eslint-disable global-require */
import {
  crossBnbAbi,
  CrossBnbContractAddress,
  nftAbi,
  NFTContractAddress,
} from '../constant';

export class Web3Service {
  Web3 = require('web3');
  web3 = new this.Web3(this.Web3.givenProvider || 'ws://localhost:7545');
  // address of cronssbnb contract

  crossBnbContract = new this.web3.eth.Contract(
    crossBnbAbi,
    CrossBnbContractAddress,
  );

  account = this.web3.currentProvider.selectedAddress;
  nftContract = new this.web3.eth.Contract(nftAbi, NFTContractAddress);

  async getAllOffersFromContract() {
    const offers = await this.crossBnbContract.methods.getAllOffers().call();
    return offers;
  }

  async getOfferById(id: number) {
    const offer = await this.crossBnbContract.methods.getOffer(id).call();
    return offer;
  }

  async getCompleteInformationAboutOffer(offer: any) {
    //need to make from offer a object with all information
    const completeOffer = {
      owner: offer.owner,
      tokenId: offer.tokenId,
      price: offer.price,
      paymentToken: offer.paymentToken,
      state: offer.state,
    };
    const urlWithTokenData = await this.nftContract.methods
      .tokenURI(offer.tokenId)
      .call();
    const res = await fetch(urlWithTokenData);
    const tokenInfo = await res.json();
    return { ...completeOffer, ...tokenInfo };
  }

  mintToken(form: any) {
    const IPFS = require('ipfs-mini');

    const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });
    //register to infura and then add token to contract
    ipfs.addJSON(form.values, async (err: any, result: any) => {
      const url = `https://ipfs.infura.io/ipfs/${result}`;
      await this.nftContract.methods
        .mintNFT(url)
        .send({ gas: '1000000', from: this.account });
    });
  }

  createOffer(form: any) {
    this.crossBnbContract.methods
      .createOffer(
        form.values.NFTId,
        form.values.price,
        form.values.tokenForPayment,
      )
      .send({ gas: '1000000', from: this.account });
  }
}
