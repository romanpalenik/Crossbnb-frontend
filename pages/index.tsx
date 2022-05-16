import type { NextPage } from 'next';
import React from 'react';

import { Title, Text, Space, Button, Group, Stepper } from '@mantine/core';

import Link from 'next/link';
import Image from 'next/image';
import welcomeStyles from '../styles/welcomePage.module.css';
import { AppFooter } from '../components/partials/footer/footer';

const Home: NextPage = () => (
  <div className={welcomeStyles.welcomeText}>
    <div style={{ marginBottom: '100px', display: 'flex' }}>
      <div style={{ marginRight: '50px' }}>
        <Title order={1}>Let&apos;s go to travel</Title>
        <Space h="lg" />
        <Text>
          Create rent offer or rent an apartment while taking advantage of cross
          chain payment{' '}
        </Text>
        <Space h="lg" />
        <Group spacing="xl">
          <Link href="/createOffer" passHref>
            <Button>Create offer</Button>
          </Link>
          <Link href="/offers" passHref>
            <Button>Rent appartment</Button>
          </Link>
        </Group>
      </div>

      <Image
        src="/../public/dom.jpg"
        alt="House to rent"
        width={800}
        height={400}
        loading="lazy"
      />
    </div>

    <div style={{ marginBottom: '100px' }}>
      <Space h="lg" />
      <Title order={1}>Use your ERC20 to rent place to stay on trip</Title>

      <Space h="lg" />
      <Text>Our service take every ERC20 token from MoonBeam or Ethereum</Text>
      <Space h="lg" />
      <Group spacing="xl">
        <Link href="/createOffer" passHref>
          <Button>Learn more</Button>
        </Link>
      </Group>
    </div>

    <div style={{ marginBottom: '100px', paddingRight: '10em' }}>
      <Title order={1}>Earn money from renting your home in 3 steps</Title>
      <Space h="xl" />
      <Stepper color="gray" size="md" active={0}>
        <Stepper.Step label="Step 1" description="Register real estate" />
        <Stepper.Step label="Step 2" description="Create offer" />
        <Stepper.Step label="Step 3" description="Get money from renting" />
      </Stepper>
    </div>

    <AppFooter />
  </div>
);

export default Home;
