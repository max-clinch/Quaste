require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
//require("@nomiclabs/hardhat-waffle");
// Any file that has require('dotenv').config() statement 
// will automatically load any variables in the root's .env file.
module.exports = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
    networks: {
     goerli: {
      url: `https://goerli.infura.io/v3/5782cc4fd0cd4c73af2a57c545a5f1ea`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000, // 8 gwei
    },
  },
};
