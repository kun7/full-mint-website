import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

return (
  <Flex justify="space-between" align="center" padding= "30px">
    {/* Left Side - Social media Icons */}
    <Flex justify="space-around" width= "40%" padding= "0 75px">Facebook</Flex>
    <div>Twitter</div>
    <div>Email</div>

    {/*Right Side - Sections and Connect*/}
    <div>About</div>
    <div>Mint</div>
    <div>Team</div>

    {/*Connect*/}
    {isConnected ? (
      <p>Connected</p>
    ) : (
      <button onClick={connectAccount}>Connect</button>
    )}

  </Flex>
 );
};

export default NavBar;
