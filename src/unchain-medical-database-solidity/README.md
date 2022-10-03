## Start

```sh
mkdir src
mkdir unchain-medical-database-solidity
cd unchain-medical-database-solidity
npm init -y
npm install --save-dev hardhat
npx hardhat
```

## Check

```sh
 npx hardhat compile
 npx hardhat test
 ```

## Test

```sh
npx hardhat run scripts/run.js
```

## Local Deploy

- Launching the Ethereum Network

```sh
npx hardhat node
```

- Start a separate window and run it.

```sh
npx hardhat run scripts/deploy.js --network localhost
```

## hardhat.config.js

```sh
npm -i dotenv
```

- hardhat.config.js

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// ALCHEMY API KEY
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

// GOERLI PRIVATE KEY
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`],
    },
  },
};
```

## Deploy

```sh
npx hardhat run scripts/deploy.js --network goerli
```

- 出力された`Contract deployed to: ...`の部分を`App.js`の`contractAddress`にコピー。

- `src/unchain-medical-database-solidity/artifacts/contracts/unchainMedicalDatabase.sol/MedicalDatabase.json`を`src/unchain-medical-database/src/utils/MedicalDatabase.json`にコピー。
