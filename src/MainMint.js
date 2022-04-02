import { useState } from 'react';
import { ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import roboPunkNFT from './RoboPunkNFT.json';

const roboPunkNFTAddress = '0x1c5ABE1178f31355F7A6ab6550d61c2F3001Cd29';

const MainMint = ({ accounts, setAccounts}) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunkNFTAddress,
        roboPunkNFT.abi,
        signer
      );
      try {
         const response = await contract.mint(BigNumber.from(mintAmount), {
           value: ethers.utils.parseEther((0.02 * mintAmount).toString())
         });
         console.log('response: ', response);
      }  catch (err) {
         console.log('error: ', err)
      }
    }
  }
  const handleDecrement = () => {
    if(mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if(mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
};

return (
  <div>
  <h1>RoboPunk</h1>
  <p> It's 2088. Can the Robopunks NFT save human from destructive rampant NFT speculation. Mint NFT to find out. </p>
  {isConnected ? (
    <div>
      <div>
        <button onCLick={handleDecrement}>-</button>
        <input type="number" value={mintAmount} />
        <button onCLick={handleIncrement}>+</button>
      </div>
      <button onClick={handleMint}>Mint Now</button>
    </div>
  ) : (
    <p> You must be connected to Mint</p>
  )}
  </div>
 );
};


export default MainMint;
