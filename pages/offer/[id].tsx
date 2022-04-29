import {
  Title,
  Card,
  useMantineTheme,
  Text,
  Button,
  NumberInput,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { DateRangePicker } from "@mantine/dates";
import offerStyles from "../../styles/offerDetail.module.css";
import { AppFooter } from "../../components/partials/footer/footer";
import { GetServerSideProps, NextPage } from "next";
import { Web3Service } from "../../services/web3service";

const OneOffer: NextPage = ({ offer }: any) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "80%" }}>
        <div>
          <Title order={1}>{offer.address}</Title>
          <p> ikona 3-izbovy byt | ikona {offer?.city} </p>
        </div>

        {/* image section */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            <div className={offerStyles.gallery}>
              <div
                className={
                  offerStyles.gallery_img && offerStyles.gallery_item_1
                }
              >
                <Image
                  src="/../public/dom3.jpg"
                  height={600}
                  width={600}
                  alt="Norway"
                />
              </div>
              <div
                className={
                  offerStyles.gallery_img && offerStyles.gallery_item_2
                }
              >
                <Image
                  src="/../public/dom3.jpg"
                  height={400}
                  width={400}
                  alt="Norway"
                  loading="lazy"
                />
              </div>
              <div
                className={
                  offerStyles.gallery_img && offerStyles.gallery_item_3
                }
              >
                <Image
                  src="/../public/dom3.jpg"
                  height={400}
                  width={400}
                  alt="Norway"
                  loading="lazy"
                />
              </div>
              <figure
                className={
                  offerStyles.gallery_img && offerStyles.gallery_item_4
                }
              >
                <Image
                  src="/../public/dom3.jpg"
                  height={400}
                  width={400}
                  alt="Norway"
                />
              </figure>
              <figure
                className={
                  offerStyles.gallery_img && offerStyles.gallery_item_5
                }
              >
                <Image
                  src="/../public/dom3.jpg"
                  height={400}
                  width={400}
                  alt="Norway"
                />
              </figure>
            </div>
          </div>
          <Card shadow="sm" p="lg" style={{ width: "20%" }}>
            <DateRangePicker
              label="Select date"
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
              inputFormat="DD/MM/YYYY"
            />
            <NumberInput
              defaultValue={1}
              placeholder="Number of guest"
              label="Number of guest"
              radius="md"
              required
              value={numberOfNights}
              onChange={(val: number) => setNumberOfNights(val)}
            />
            <p>
              One night: {offer?.price} {offer?.paymentToken}
            </p>
            <p>Number of night: {numberOfNights}</p>
            <p> Total: </p>
            <Button
              variant="light"
              color="blue"
              fullWidth
              style={{ marginTop: 14 }}
            >
              Book classic tour now
            </Button>
          </Card>
        </div>
        <Title order={2}>Detail info</Title>

        <p> ikona 3-izbovy byt | ikona Levice </p>

        <Title order={2}>Description</Title>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let web3service = new Web3Service();

  // const { id } = context.params;
  const offer2 = await web3service.getOfferById(1);
  const offer = await web3service.getCompleteInformationAboutOffer(offer2);

  return {
    props: { offer }, // will be passed to the page component as props
  };
};

export default OneOffer;
