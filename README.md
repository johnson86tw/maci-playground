# MACI playground


## Guild

install dependencies
```
yarn install
```

run test
```
yarn test
```

## Demo (hardhat network)

### Roles

```ts
const [deployer, coordinator, aasta, anyone] = await ethers.getSigners();
```

### Initiate

Start hardhat network

```sh
yarn start // at http://127.0.0.1:8545/
```

Deploy MACI contract

```sh
npx hardhat --network localhost run scripts/deployMaci.ts
```

### Vote


### Tally


### Verify