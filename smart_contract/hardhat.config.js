require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/G61chq941zfRB69H175xMtpaQMZR68Fn',
      accounts: [ process.env.ACCOUNT_KEY ]
    }
  }
}
