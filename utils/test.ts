import { BigNumber } from '@ethersproject/bignumber'
import { bnSqrt } from './maci'

// @todo Fail with 3
const x = 3
const res = bnSqrt(BigNumber.from(x)).toString()
console.log(res)
