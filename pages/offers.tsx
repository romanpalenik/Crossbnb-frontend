import { Button, Grid, Title } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OfferCard } from "../components/offers/offer/offers";
import { NFTContractAddress } from "../constant";
import { nftAbi } from "../constant";
import { CrossBnbContractAddress } from "../constant";
import { crossBnbAbi } from "../constant";

const OrderPage: NextPage = () => {
  let Web3 = require("web3");
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
  // address of cronssbnb contract

  let crossBnbContract = new web3.eth.Contract(
    crossBnbAbi,
    CrossBnbContractAddress
  );

  let account = web3.currentProvider.selectedAddress;
  let nftContract = new web3.eth.Contract(nftAbi, NFTContractAddress);

  useEffect(() => {
    async function getOffers() {
      setOffers([]);
      // get offers from crossbnb
      let offers = await crossBnbContract.methods.getAllOffers().call();
      for (let i = 0; i < offers.length; i++) {
        console.log(offers[i].owner);
      }
      console.log("offers", offers);
      // const urlWithTokenData = await nftContract.methods
      //   .tokenURI(offer.tokenId)
      //   .call();

      // const res = await fetch(urlWithTokenData);
      // const posts = await res.json();
    }
    getOffers();
  }, []);

  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "Moj dom",
      price: 100,
      paymentToken: "ShibaInu",
    },
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0px 30px 0px",
          alignItems: "center",
        }}
      >
        <Title order={1}>Offers</Title>
        <Link href="/createOffer" passHref>
          <Button>Create offer</Button>
        </Link>
      </div>
      {
        <Grid>
          {offers.map((offer) => (
            <Grid.Col sm={6} md={4} lg={3} xl={2} key={offer.id}>
              <OfferCard
                id={offer.id}
                paymentToken={offer.paymentToken}
                price={offer.price}
              />
            </Grid.Col>
          ))}
        </Grid>
      }
    </div>
  );
};

export default OrderPage;
