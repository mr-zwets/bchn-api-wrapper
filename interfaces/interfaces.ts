export interface BaseRpcClientConfig {
  rpcUser: string;
  rpcPassword: string;
  maxRetries?: number;
  retryDelayMs?: number;
  logger?: typeof console ;
  timeoutMs?: number;
}

export interface RpcClientUrlConfig extends BaseRpcClientConfig {
  url: string;
}

export interface RpcClientHostConfig extends BaseRpcClientConfig {
  protocol: 'http' | 'https';
  host: string;
  port: number;
}

export type RpcClientConfig = RpcClientUrlConfig | RpcClientHostConfig

export type RPCParameter = string | number | boolean | null;
declare type RequestResponse = object | string | number | boolean | null | RequestResponse[];

export interface RpcRequest {
  method: string;
  params: Array<RPCParameter>;
  response: RequestResponse;
}

interface TokenData {
  category : string;
  amount: string;
  nft?: {
    capability: 'none' | 'mutable' | 'minting';
    commitment: string;
  }
}

export interface ListUnspentItem {
  txid: string;
  vout: number;
  address: string;
  label: string;
  scriptPubKey: string;
  amount: number;
  tokenData?: TokenData;
  confirmations: number;
  redeemScript: string;
  spendable: boolean;
  solvable: boolean;
  safe: boolean;
}

export interface ListUnspent {
  method: 'listunspent';
  params: [
    minconf?: number,
    maxconf?: number,
    addresses?: string[],
    include_unsafe?: boolean,
    query_options?: {
      minimumAmount?: number | string;
      maximumAmount?: number | string;
      maximumCount?: number;
      minimumSumAmount?: number | string;
      includeTokens?: boolean;
      tokensOnly?: boolean;
    }
  ];
  response: ListUnspentItem[];
}

export interface GetBlockCount {
  method: 'getblockcount';
  params: [];
  response: number;
}

// TODO: type verbose result
export interface GetRawTransaction {
  method: 'getrawtransaction';
  params: [
    txid: string,
    verbose?: boolean | number,
    blockhash?: string
  ];
  response: string | any;
}

export interface SendRawTransaction {
  method: 'sendrawtransaction';
  params: [
    hexstring: string,
    allowhighfees?: boolean
  ];
  response: string;
}

// TODO: type verbose result
export interface GetBlock {
  method: 'getblock';
  params: [
    blockhash: string,
    verbosity?: number
  ];
  response: string | any;
}

export interface DumpPrivKey {
  method: 'dumpprivkey';
  params: [
    address: string,
  ];
  response: string;
}

export interface GetNewAddress {
  method: 'getnewaddress';
  params: [
    label?: string,
  ];
  response: string;
}

export interface GetBalance {
  method: 'getbalance';
  params: [
    dummy?: string,
    minconf?: number,
    include_watchonly?: boolean
  ];
  response: number;
}

export interface ImportAddress {
  method: 'importaddress';
  params: [
    address: string,
    label?: string,
    rescan?: boolean,
    p2sh?: boolean
  ];
  response: number;
}

export interface Generate {
  method: 'generate';
  params: [
    nblocks: number,
    maxtries?: number,
  ];
  response: string[];
}

export interface GenerateToAddress {
  method: 'generatetoaddress';
  params: [
    nblocks: number,
    address: string,
    maxtries?: number,
  ];
  response: string[];
}
