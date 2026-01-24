import type { Transaction } from "../interfaces.js";

export interface BlockInfoNoTxDetails {
  hash: string;
  confirmations: number;
  size: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx : string[]
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
  ablastate: {
    epsilon: number;
    beta: number;
    blocksize: number;
    blocksizelimit: number;
    nextblocksizelimit: number;
  }
}

export interface BlockInfoTxDetails extends Omit<BlockInfoNoTxDetails, 'tx'>{
  tx: Transaction[]
}

export interface HeaderInfo {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
  ablastate: {
    epsilon: number;
    beta: number;
    blocksize: number;
    blocksizelimit: number;
    nextblocksizelimit: number;
  }
}

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

export interface UtxosInfo {
  chaintipHash: string;
  chainHeight: number;
  utxos: {
    scriptPubKey: {
      addresses: string[];
      type: string;
      hex: string;
      reqSigs: number;
      asm: string;
    },
    value: number
    height: number
    txvers: number
  }[]
  bitmap: string;
}

export interface MempoolInfo {
  loaded: boolean;
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mempoolminfee: number;
  minrelaytxfee: number;
  permitbaremultisig: boolean;
  maxdatacarriersize: number;
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

export interface TxDetails extends Transaction {
  blockhash: string;
}

// Pattern types for v29.0.0+ REST endpoints
export interface ByteCodePattern {
  fingerprint: string;
  pattern: string;
  patternArgsInfo?: string[];
}

export interface ScriptPubKeyWithPattern {
  asm: string;
  hex: string;
  type: string;
  address?: string;
  byteCodePattern?: ByteCodePattern;
}

export interface TransactionInputWithPattern {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  prevout?: {
    generated: boolean;
    height: number;
    value: number;
    scriptPubKey: ScriptPubKeyWithPattern;
  };
  redeemScript?: {
    asm: string;
    hex: string;
    type: string;
    byteCodePattern?: ByteCodePattern;
    p2shType?: string;
  };
}

export interface TransactionOutputWithPattern {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKeyWithPattern;
}

export interface TxDetailsWithPatterns {
  txid: string;
  hash: string;
  size: number;
  version: number;
  locktime: number;
  vin: TransactionInputWithPattern[];
  vout: TransactionOutputWithPattern[];
  blockhash: string;
  fee?: number;
}

export interface BlockInfoWithPatterns extends Omit<BlockInfoNoTxDetails, 'tx'> {
  tx: TxDetailsWithPatterns[];
}