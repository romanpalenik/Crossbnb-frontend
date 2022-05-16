import {
  Title,
  Card,
  useMantineTheme,
  Text,
  Button,
  NumberInput,
} from '@mantine/core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from '@mantine/dates';
import { NextPage } from 'next';
import offerStyles from '../../styles/offerDetail.module.css';
import { AppFooter } from '../../components/partials/footer/footer';
import { EthersService } from '../../services/ethers.service';

const OneOffer: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [offer, setOffer] = useState({} as any);

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  const [numberOfNights, setNumberOfNights] = useState<number>(1);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(0);

  useEffect(() => {
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = value[1]!.getTime() - value[0]!.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    setNumberOfNights(diffInDays);
  }, [value]);

  useEffect(() => {
    async function getInfo() {
      const ethersService = new EthersService();
      const offer2 = await ethersService.getOfferById(0);
      const offer3 = await ethersService.getCompleteInformationAboutOffer(
        offer2,
      );
      setOffer(offer3);
    }
    getInfo();
  }, []);

  function bookOffer() {
    const ethersService = new EthersService();
    ethersService.sendERC20TokenCrossChain(
      2,
      0,
      '0x8e0a907331554AF72563Bd8D43051C2E64Be5d35',
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '80%' }}>
        <div>
          <Title order={1}>{offer.address}</Title>
          <p> ikona 3-izbovy byt | ikona {offer?.city} </p>
        </div>

        {/* image section */}
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80%' }}>
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
          <Card shadow="sm" p="lg" style={{ width: '20%' }}>
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
              value={numberOfGuests}
              onChange={(val: number) => setNumberOfGuests(val)}
            />
            <p>
              One night: {offer?.price} {offer?.paymentToken}
            </p>
            <p>Number of night: {numberOfNights}</p>
            <p>
              {/* eslint-disable-next-line no-unsafe-optional-chaining */}
              Total: {`${offer?.price * numberOfNights * numberOfGuests}`}
            </p>
            <Button
              variant="light"
              color="blue"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => bookOffer()}
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
      <AppFooter />
    </div>
  );
};

export default OneOffer;
