import { Button, Grid, Title } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OfferCard } from "../../components/offers/offer/offers";
import { EthersService } from "../../services/ethers.service";
import { Web3Service } from "../../services/web3service";

export interface Offer {
  owner: string;
  tokenId: number;
  price: number;
  paymentToken: string;
  state: string;
}

export interface allOfferInfo {
  owner: string;
  tokenId: number;
  price: number;
  paymentToken: string;
  state: string;
  address: string;
  city: string;
  country: string;
  description: string;
}

const ethers = require("ethers");

const OrderPage: NextPage = () => {
  const web3service = new Web3Service();

  const [offers, setOffers] = useState<allOfferInfo[]>([]);

  useEffect(() => {
    async function getOffers() {
      setOffers([]);
      // get offers from crossbnb
      const ethersService = new EthersService();
      let offers = await ethersService.getAllOffers();
      for (let i = 0; i < offers.length; i++) {
        const offer = await ethersService.getCompleteInformationAboutOffer(
          offers[i]
        );
        console.log("toto je offer", offer);
        setOffers((prev) => [...prev, offer]);
      }
    }
    getOffers();
  }, []);

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
            <Grid.Col sm={6} md={4} lg={3} xl={2} key={offer.address}>
              <OfferCard
                description={offer.description}
                name={offer.address}
                id={1}
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
