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

run scripts
```
yarn ts scripts/generate-key.ts
```

deploy MACI contract

```
yarn run node // at http://127.0.0.1:8545/

npx hardhat --network localhost run scripts/deployMaci.ts
```