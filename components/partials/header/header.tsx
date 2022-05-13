/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  Button,
  Group,
  Center,
  Box,
} from '@mantine/core';
import Link from 'next/link';

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export default function AppHeader({ opened, setOpened }: HeaderProps) {
  // We currently only ever provide a single account,
  // but the array gives us some room to grow.
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    function getAccount() {
      //@ts-ignore
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: any) => {
          setAccount(accounts[0]);
        });
    }
    getAccount();
  }, []);

  return (
    <>
      <Header
        height={70}
        p="md"
        style={{
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid #b5b5b5',
        }}
        fixed
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            width: '90%',
          }}
        >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
              sx={theme => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[3],
                textAlign: 'center',
                borderRadius: theme.radius.xl,
              })}
              style={{ padding: '0px 0px 0px 10px' }}
            >
              <Text>
                Connected wallet:
                <Button style={{ borderRadius: 15 }}>
                  {account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length,
                    )}`}
                </Button>
              </Text>
            </Box>
          ) : (
            // eslint-disable-next-line no-console
            <Button onClick={() => console.log()}>Connect to a wallet</Button>
          )}
        </div>
      </Header>
    </>
  );
}
