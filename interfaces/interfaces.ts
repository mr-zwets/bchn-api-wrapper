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

export type RPCParameter = string | number | boolean | undefined;
declare type RequestResponse = object | string | number | boolean | null | RequestResponse[];

export interface RpcRequest {
  method: string;
  params: Array<RPCParameter>;
  response: RequestResponse;
}


export type formatOptions = 'bin' | 'hex' | 'json'

// Conditional type to return the appropriate data type based on format
export type ResponseType<TFormat extends formatOptions, TJson> = 
  TFormat extends 'json' ? TJson :
  TFormat extends 'hex' | 'bin' ? string :
  never;

export interface TokenData {
  category : string;
  amount: string;
  nft?: {
    capability: 'none' | 'mutable' | 'minting';
    commitment: string;
  }
}