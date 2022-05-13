import { TextInput, Button, Group, Box, Title, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { AppFooter } from '../components/partials/footer/footer';
import { EthersService } from '../services/ethers.service';

const RegisterRealty: NextPage = () => {
  const ethersService = new EthersService();

  const form = useForm({
    initialValues: {
      address: '',
      city: '',
      country: '',
      description: '',
      size: '',
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
            {...form.getInputProps('address')}
          />
          <TextInput
            required
            label="City"
            placeholder="Hronské Kľačany"
            {...form.getInputProps('city')}
          />
          <Select
            data={['Slovakia', 'Czech republic']}
            placeholder="Pick one"
            label="State"
            required
            // set default value
            // TODO
            // treba tam nastavit defaultne hodnotu
            {...form.getInputProps('country')}
          />
          <TextInput
            required
            label="Description"
            placeholder="Nice house with better view"
            {...form.getInputProps('description')}
          />
          <TextInput
            required
            label="How many m2"
            placeholder="Starý Tekov"
            {...form.getInputProps('size')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Register real estate</Button>
          </Group>
        </form>
      </Box>
      <AppFooter />
    </>
  );
};

export default RegisterRealty;
