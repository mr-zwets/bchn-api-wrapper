export interface ChainInfo {
  chain: 'main' | 'test' | 'regtest';
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean,
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  warnings: string;
}

export interface MempoolInfo {
  loaded: boolean;
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mempoolminfee: number;
  minrelaytxfee: number;
}

export interface MempoolContent {
  [txid: string]: {
    fees: {
      base: number;
      modified: number;
    },
    size: number;
    time: number;
    depends: string[];
    spentby: string[];
  }
}

export interface TxDetails {
  txid: string;
  hash: string;
  version: number;
  size: number;
  locktime: number;
  vin:{
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    },
    sequence: number;
  }[]
  vout: {
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      reqSigs: number;
      type: string;
      addresses: string[]
    }
  }[]
  blockhash: string;
  hex: string;
}