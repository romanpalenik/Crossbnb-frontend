import { Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';
import { EthersService } from '../services/ethers.service';

const createOffer = () => {
  const form = useForm({
    initialValues: {
      NFTId: 0,
      tokenForPayment: '',
      price: 0,
    },
  });

  async function createRealEstate() {
    const ethersService = new EthersService();
    ethersService.createOffer(form);
  }

  return (
    <div>
      real estate:
      <form onSubmit={form.onSubmit(createRealEstate)}>
        <TextInput
          required
          label="Token id"
          placeholder="1"
          {...form.getInputProps('NFTId')}
        />
        <TextInput
          required
          label="Price"
          placeholder="32"
          {...form.getInputProps('price')}
        />
        <Select
          data={['ERC20S']}
          placeholder="Pick one"
          label="State"
          required
          // set default value
          // TODO
          // treba tam nastavit defaultne hodnotu
          {...form.getInputProps('tokenForPayment')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create offer</Button>
        </Group>
      </form>
    </div>
  );
};

export default createOffer;
