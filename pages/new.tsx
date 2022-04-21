import { Title, Space, Group, Button, Text, Stepper } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { AppFooter } from "../components/partials/footer/footer";
import welcomeStyles from "../styles/welcomePage.module.css";

const NewLanding: NextPage = () => {
  return (
    <div>
      <div className={welcomeStyles.welcomeText2}>
        <div>
          <Title order={1}>Let's go to travel</Title>
          <Space h="lg" />
          <Text weight={700} styles={{ color: "white" }}>
            Create rent offer or rent an apartment while taking advantage of
            cross chain payment{" "}
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
      </div>

      <div
        style={{
          marginBottom: "100px",
          marginTop: "100px",
          paddingLeft: "6em",
        }}
      >
        <Space h="lg" />
        <Title order={1}>Use your ERC20 to rent place to stay on trip</Title>

        <Space h="lg" />
        <Text>
          Our service take every ERC20 token from MoonBeam or Ethereum
        </Text>
        <Space h="lg" />
        <Group spacing="xl">
          <Link href="/createOffer" passHref>
            <Button>Learn more</Button>
          </Link>
        </Group>
      </div>

      <div
        style={{
          marginBottom: "100px",
          paddingRight: "6em;",
          paddingLeft: "6em",
        }}
      >
        <Title order={1}>Earn money from renting your home in 3 steps</Title>
        <Space h="xl" />
        <Stepper color="gray" size="md" active={0} style={{ margin: "50px" }}>
          <Stepper.Step label="Step 1" description="Register real estate" />
          <Stepper.Step label="Step 2" description="Create offer" />
          <Stepper.Step label="Step 3" description="Get money from renting" />
        </Stepper>

        <Link href="/createOffer" passHref>
          <Button>Register real estate</Button>
        </Link>
      </div>

      <AppFooter></AppFooter>
    </div>
  );
};

export default NewLanding;
