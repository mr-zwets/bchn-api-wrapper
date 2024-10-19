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
