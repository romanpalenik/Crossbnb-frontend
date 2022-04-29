import {
  crossBnbAbi,
  CrossBnbContractAddress,
  nftAbi,
  NFTContractAddress,
} from "../constant";

export class Web3Service {
  Web3 = require("web3");
  web3 = new this.Web3(this.Web3.givenProvider || "ws://localhost:8545");
  // address of cronssbnb contract

  crossBnbContract = new this.web3.eth.Contract(
    crossBnbAbi,
    CrossBnbContractAddress
  );

  account = this.web3.currentProvider.selectedAddress;
  nftContract = new this.web3.eth.Contract(nftAbi, NFTContractAddress);

  async getAllOffersFromContract() {
    return await this.crossBnbContract.methods.getAllOffers().call();
  }

  async getOfferById(id: number) {
    return await this.crossBnbContract.methods.getOffer(id).call();
  }

  async getCompleteInformationAboutOffer(offer: any) {
    //need to make from offer a object with all information
    let completeOffer = {
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

  async call(): Promise<any> {
    return await this.crossBnbContract.methods.getSomething().call();
  }
}
