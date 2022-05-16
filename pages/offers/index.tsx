import { Button, Grid, Title } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { OfferCard } from '../../components/offers/offer/offers';
import { EthersService } from '../../services/ethers.service';

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

const OrderPage: NextPage = () => {
  const [offers, setOffers] = useState<allOfferInfo[]>([]);
  let run = 0;

  useEffect(() => {
    console.log('toto prebehne 2 krat');
    // eslint-disable-next-line eqeqeq
    if (run != 0) {
      return;
    }
    async function getOffers() {
      console.log('tento use effect sa teraz pustil');
      setOffers([]);
      // get offers from crossbnb
      const ethersService = new EthersService();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let offers = [];
      try {
        offers = await ethersService.getAllOffers();
      } catch (e) {
        console.log(e);
      }
      for (let i = 0; i < offers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const offer = await ethersService.getCompleteInformationAboutOffer(
          offers[i],
        );
        setOffers(prev => [...prev, offer]);
      }
    }
    getOffers();
    run += 1;
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 0px 30px 0px',
          alignItems: 'center',
        }}
      >
        <Title order={1}>Offers</Title>
        <Link href="/createOffer" passHref>
          <Button>Create offer</Button>
        </Link>
      </div>
      <Grid>
        {offers.map(offer => (
          <Grid.Col sm={6} md={4} lg={3} xl={2} key={offer.address}>
            <OfferCard
              description={offer.description}
              name={offer.address}
              id={0}
              paymentToken={offer.paymentToken}
              price={offer.price}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default OrderPage;
