# MACI playground


## Guild

Install dependencies
```
yarn install
```

Run test
```
yarn test
```

## Demo
(on hardhat network)

### Roles

```ts
const [deployer, coordinator, alice, anyone] = await ethers.getSigners();
```

### Initiate

Start hardhat network

```sh
yarn start // at http://127.0.0.1:8545/
```

Deploy MACI, Ballot, and others.

```sh
yarn hardhat:local scripts/deployMaci.ts
```

### Vote

Sign up
```sh
yarn hardhat:local scripts/signUp.ts
```

Publish Message
```sh
yarn hardhat:local scripts/vote.ts
```

Change Decisions


### Tally


### Verify