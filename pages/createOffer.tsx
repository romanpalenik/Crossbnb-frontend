import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";
import { crossBnbAbi } from "../constant";
import { CrossBnbContractAddress } from "../constant";

const createOffer = () => {
  let Web3 = require("web3");
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

  let account = web3.currentProvider.selectedAddress;
  let contract = new web3.eth.Contract(crossBnbAbi, CrossBnbContractAddress);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({
    initialValues: {
      NFTId: 0,
      tokenForPayment: "",
      price: 0,
    },
  });

  async function createRealEstate() {
    console.log(`posielam z tohto uctu ${account}`);
    try {
      let response = await contract.methods
        .createOffer(
          form.values.NFTId,
          form.values.price,
          form.values.tokenForPayment
        )
        .send({ gas: "1000000", from: account });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
    console.log(form.values);
  }

  return (
    <div>
      real estate:
      <form onSubmit={form.onSubmit(createRealEstate)}>
        <TextInput
          required
          label="Token id"
          placeholder="1"
          {...form.getInputProps("NFTId")}
        />
        <TextInput
          required
          label="Price"
          placeholder="32"
          {...form.getInputProps("price")}
        />
        <Select
          data={["ERC20S"]}
          placeholder="Pick one"
          label="State"
          required
          // set default value
          // TODO
          // treba tam nastavit defaultne hodnotu
          {...form.getInputProps("tokenForPayment")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create offer</Button>
        </Group>
      </form>
    </div>
  );
};

export default createOffer;
