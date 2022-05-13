import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { EthersService } from '../services/ethers.service';

const CreateOffer: NextPage = () => {
  const ethersService = new EthersService();
  const [account, setAccount] = useState<string>();
  const [tokens, setTokens] = useState([...Array(10)].map(() => 0));

  useEffect(() => {
    function getAccount() {
      //@ts-ignore
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (accounts: any) => {
          setAccount(accounts[0]);
          setTokens(await ethersService.getAllMyTokens(accounts[0]));
        });
    }
    getAccount();
  }, []);

  return (
    <div>
      <h1>My tokens</h1>
      {tokens.map((token: any) => (
        <div key={token}>
          <h2>{token.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CreateOffer;
