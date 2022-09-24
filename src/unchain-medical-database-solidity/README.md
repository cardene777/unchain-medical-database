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
