import type { Transaction } from "../interfaces.js";

// ABLA state object (Adaptive Block Limit Algorithm, activated May 2024)
export interface AblaState {
  epsilon: number;
  beta: number;
  blocksize: number;
  blocksizelimit: number;
  nextblocksizelimit: number;
}

// Base block info fields
interface BlockInfoBase {
  hash: string;
  confirmations: number;
  size: number;
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
  // Not present on genesis block (height 0)
  previousblockhash: string;
  // Not present on chain tip
  nextblockhash: string;
}

// Block info without tx details - works for any block
export interface BlockInfoNoTxDetails extends BlockInfoBase {
  tx: string[];
  ablastate?: AblaState;
}

// Block info without tx details - for blocks before ABLA activation (May 2024)
export interface BlockInfoNoTxDetailsPreAbla extends BlockInfoBase {
  tx: string[];
}

// Block info without tx details - for blocks after ABLA activation (May 2024)
export interface BlockInfoNoTxDetailsPostAbla extends BlockInfoBase {
  tx: string[];
  ablastate: AblaState;
}

// Block info with tx details - works for any block
export interface BlockInfoTxDetails extends BlockInfoBase {
  tx: Transaction[];
  ablastate?: AblaState;
}

// Block info with tx details - for blocks before ABLA activation (May 2024)
export interface BlockInfoTxDetailsPreAbla extends BlockInfoBase {
  tx: Transaction[];
}

// Block info with tx details - for blocks after ABLA activation (May 2024)
export interface BlockInfoTxDetailsPostAbla extends BlockInfoBase {
  tx: Transaction[];
  ablastate: AblaState;
}

// Base header info fields
interface HeaderInfoBase {
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
  // Not present on genesis block (height 0)
  previousblockhash: string;
  // Not present on chain tip
  nextblockhash: string;
}

// Header info - works for any block
export interface HeaderInfo extends HeaderInfoBase {
  ablastate?: AblaState;
}

// Header info - for blocks before ABLA activation (May 2024)
export interface HeaderInfoPreAbla extends HeaderInfoBase {}

// Header info - for blocks after ABLA activation (May 2024)
export interface HeaderInfoPostAbla extends HeaderInfoBase {
  ablastate: AblaState;
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