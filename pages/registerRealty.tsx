import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Title,
  Center,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";
import { AppFooter } from "../components/partials/footer/footer";
import { create } from "ipfs-http-client";
import { useState } from "react";
import { NFTContractAddress } from "../constant";
import { nftAbi } from "../constant";
import { Web3Service } from "../services/web3service";
import { EthersService } from "../services/ethers.service";
const { setupParentArgs, waitForTx, log } = require("../utils");

const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const ethers = require("ethers");

// const client = create("https://ipfs.infura.io:5001/api/v0");

const RegisterRealty: NextPage = () => {
  const ethersService = new EthersService();

  let Web3 = require("web3");
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
  let account = web3.currentProvider.selectedAddress;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({
    initialValues: {
      address: "",
      city: "",
      country: "",
      description: "",
      size: "",
    },
  });

  async function sendToken() {
    ethersService.createReality(form);
  }

  return (
    <>
      <Title order={1}>Register real estate</Title>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(sendToken)}>
          <TextInput
            required
            label="Address of real estate"
            placeholder="Hlboka 32"
            {...form.getInputProps("address")}
          />
          <TextInput
            required
            label="City"
            placeholder="Hronské Kľačany"
            {...form.getInputProps("city")}
          />
          <Select
            data={["Slovakia", "Czech republic"]}
            placeholder="Pick one"
            label="State"
            required
            // set default value
            // TODO
            // treba tam nastavit defaultne hodnotu
            {...form.getInputProps("country")}
          />
          <TextInput
            required
            label="Description"
            placeholder="Nice house with better view"
            {...form.getInputProps("description")}
          />
          <TextInput
            required
            label="How many m2"
            placeholder="Starý Tekov"
            {...form.getInputProps("size")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Register real estate</Button>
          </Group>
        </form>
      </Box>
      <AppFooter></AppFooter>
    </>
  );
};

export default RegisterRealty;
