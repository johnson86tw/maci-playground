/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IncrementalMerkleTreeInterface extends ethers.utils.Interface {
  functions: {
    "hash11(uint256[])": FunctionFragment;
    "hash5(uint256[5])": FunctionFragment;
    "hashLeftRight(uint256,uint256)": FunctionFragment;
    "insertLeaf(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "root()": FunctionFragment;
    "rootHistory(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "hash11",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "hash5",
    values: [
      [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hashLeftRight",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "insertLeaf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "root", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rootHistory",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "hash11", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hash5", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hashLeftRight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "insertLeaf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rootHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "LeafInsertion(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LeafInsertion"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class IncrementalMerkleTree extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IncrementalMerkleTreeInterface;

  functions: {
    hash11(
      array: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hash5(
      array: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hashLeftRight(
      _left: BigNumberish,
      _right: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    insertLeaf(
      _leaf: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    root(overrides?: CallOverrides): Promise<[BigNumber]>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  hash11(array: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;

  hash5(
    array: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  hashLeftRight(
    _left: BigNumberish,
    _right: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  insertLeaf(
    _leaf: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  root(overrides?: CallOverrides): Promise<BigNumber>;

  rootHistory(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    hash11(
      array: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hash5(
      array: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashLeftRight(
      _left: BigNumberish,
      _right: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    insertLeaf(
      _leaf: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    root(overrides?: CallOverrides): Promise<BigNumber>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    LeafInsertion(
      leaf?: BigNumberish | null,
      leafIndex?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { leaf: BigNumber; leafIndex: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    hash11(
      array: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hash5(
      array: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashLeftRight(
      _left: BigNumberish,
      _right: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    insertLeaf(
      _leaf: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    root(overrides?: CallOverrides): Promise<BigNumber>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    hash11(
      array: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hash5(
      array: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashLeftRight(
      _left: BigNumberish,
      _right: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    insertLeaf(
      _leaf: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    root(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rootHistory(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}