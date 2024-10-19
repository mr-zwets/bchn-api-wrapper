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

export interface ListUnspentItem {
  txid: string;
  vout: number;
  address: string;
  label: string;
  scriptPubKey: string;
  amount: number;
  confirmations: number;
  redeemScript: string;
  spendable: boolean;
  solvable: boolean;
  safe: boolean;
}

export type RPCParameter = string | number | boolean | null;
declare type RequestResponse = object | string | number | boolean | null | RequestResponse[];

export interface RpcRequest {
  method: string;
  params: Array<RPCParameter>;
  response: RequestResponse;
}

/*
  async listUnspent(): Promise<ListUnspentItem>{
    return {}
  }

  async getBlockHeight(): Promise<number> {
    return 0
  }

  async getRawTransaction(txid: string, verbose?: boolean, blockHash?: string): Promise<string> {
    return "";
  }

  async sendRawTransaction(hexString: string, allowHighFees?: boolean): Promise<string> {
    return "";
  }
*/