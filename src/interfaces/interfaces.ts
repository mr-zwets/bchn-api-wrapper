/** Base RPC client authentication and connection settings. */
export interface BaseRpcClientConfig {
  rpcUser: string;
  rpcPassword: string;
  maxRetries?: number;
  retryDelayMs?: number;
  logger?: typeof console ;
  timeoutMs?: number;
}

/** RPC client config using a full URL (e.g., "http://localhost:8332"). */
export interface RpcClientUrlConfig extends BaseRpcClientConfig {
  url: string;
}

/** RPC client config using separate host, port, and protocol. */
export interface RpcClientHostConfig extends BaseRpcClientConfig {
  protocol: 'http' | 'https';
  host: string;
  port: number;
}

/** RPC client configuration - either URL-based or host-based. */
export type RpcClientConfig = RpcClientUrlConfig | RpcClientHostConfig

/** Valid parameter types for RPC method calls. */
export type RPCParameter = string | number | boolean | undefined | object;
declare type RequestResponse = object | string | number | boolean | null | RequestResponse[];

/** Base interface for all RPC request types with method, params, and response. */
export interface RpcRequest {
  method: string;
  params: Array<RPCParameter>;
  response: RequestResponse;
}

/** REST client configuration. */
export interface RestClientConfig {
  url: string;
  logger?: typeof console ;
  timeoutMs?: number;
}

/** REST endpoint response format options. */
export type formatOptions = 'bin' | 'hex' | 'json'

/** Conditional return type based on format: JSON returns parsed object, hex/bin return string. */
export type ResponseType<TFormat extends formatOptions, TJson> =
  TFormat extends 'json' ? TJson :
  TFormat extends 'hex' | 'bin' ? string :
  never;

/** Base transaction structure used in both REST and RPC responses. */
export interface Transaction {
  txid: string;
  hash: string;
  size: number;
  version: number;
  locktime: number;
  vin: TransactionInput[];
  vout: TransactionOutput[];
}

/** Transaction input referencing a previous output (UTXO). */
export interface TransactionInput {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
}

/** Transaction output with value and locking script. */
export interface TransactionOutput {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
    addresses: string[];
    tokenData: TokenData;
  }
}

/** CashTokens data attached to a UTXO (fungible amount and/or NFT). */
export interface TokenData {
  category : string;
  amount: string;
  nft?: {
    capability: 'none' | 'mutable' | 'minting';
    commitment: string;
  }
}