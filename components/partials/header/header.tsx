import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Button,
  Anchor,
  Group,
  Center,
} from "@mantine/core";
import { Box } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useWeb3 } from "@3rdweb/hooks";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export default function AppHeader({ opened, setOpened }: HeaderProps) {
  let Web3 = require("web3");
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
  let account = web3.currentProvider.selectedAddress;
  // const { connectWallet, address, error } = useWeb3();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <>
      <Header
        height={70}
        p="md"
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid #b5b5b5",
        }}
        fixed
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "90%",
          }}
        >
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o: any) => !o)}
              size="sm"
              mr="xl"
            />
          </MediaQuery>

          <Group>
            <Link href="/" passHref>
              <a>
                <Text size="xl">Cross-bnb</Text>
              </a>
            </Link>
          </Group>

          <Center>
            <Group>
              <Link href="/offers" passHref>
                <a>
                  <Text size="lg">OFFERS</Text>
                </a>
              </Link>
              <Link href="/registerRealty" passHref>
                <a>
                  <Text size="lg">BECOME HOST</Text>
                </a>
              </Link>
            </Group>
          </Center>

          {account ? (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[3],
                textAlign: "center",
                borderRadius: theme.radius.xl,
              })}
              style={{ padding: "0px 0px 0px 10px" }}
            >
              <Text>
                Connected wallet:
                <Button style={{ borderRadius: 15 }}>
                  {account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`}
                </Button>
              </Text>
            </Box>
          ) : (
            <Button onClick={() => console.log()}>Connect to a wallet</Button>
          )}
        </div>
      </Header>
    </>
  );
}
