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

const RegisterRealty: NextPage = () => {
  let Web3 = require("web3");
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
  let contractAddress = "0x52FcD44C7aD5C903FCD6F1fde45BeA0430B3729a";
  let abi = [
    {
      inputs: [],
      name: "last_completed_migration",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "sendMessage",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({
    initialValues: {
      name: "",
      termsOfService: false,
      address: "",
    },

    validate: {
      name: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  async function sendToken() {
    try {
      let contract = new web3.eth.Contract(abi, contractAddress);
      let response = await contract.methods.sendMessage().call();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Title order={1}>Register real estate</Title>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Address of real estate"
            placeholder="Hronské Kľačany"
            {...form.getInputProps("address")}
          />
          <TextInput
            required
            label="How many m2"
            placeholder="Starý Tekov"
            {...form.getInputProps("address")}
          />
          <TextInput
            required
            label="Price"
            placeholder="Starý Tekov"
            {...form.getInputProps("address")}
          />

          <Select
            data={["React", "Angular", "Svelte", "Vue"]}
            placeholder="Pick one"
            label="Form of token payment"
            required
          />

          <Group position="right" mt="md">
            <Button onClick={sendToken}>Register real estate</Button>
          </Group>
        </form>
      </Box>
      <AppFooter></AppFooter>
    </>
  );
};

export default RegisterRealty;
