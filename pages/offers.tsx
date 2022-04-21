import { Button, Grid, Title } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { OfferCard } from "../components/offers/offer/offers";

const OrderPage: NextPage = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "Moj dom",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
    },
    {
      id: 2,
      name: "Moj dom2",
      price: "100 ShibaInu",
      dateFrom: "2020-01-01",
      dateTo: "2020-01-02",
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
              <OfferCard id={offer.id} />
            </Grid.Col>
          ))}
        </Grid>
      }
    </div>
  );
};

export default OrderPage;
