import type { Transaction } from "../interfaces.js";

/** Adaptive Block Limit Algorithm state (activated May 2024). */
export interface AblaState {
  epsilon: number;
  beta: number;
  blocksize: number;
  blocksizelimit: number;
  nextblocksizelimit: number;
}

/**
 * Base block info fields shared across response types.
 * @note `previousblockhash` not present on genesis block (height 0).
 * @note `nextblockhash` not present on chain tip.
 */
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
  previousblockhash: string;
  nextblockhash: string;
}

/** Block info with tx IDs only - works for any block. */
export interface BlockInfoNoTxDetails extends BlockInfoBase {
  tx: string[];
  ablastate?: AblaState;
}

/** Block info with tx IDs only - for blocks before ABLA activation (May 2024). */
export interface BlockInfoNoTxDetailsPreAbla extends BlockInfoBase {
  tx: string[];
}

/** Block info with tx IDs only - for blocks after ABLA activation (May 2024). */
export interface BlockInfoNoTxDetailsPostAbla extends BlockInfoBase {
  tx: string[];
  ablastate: AblaState;
}

/** Block info with full transaction objects - works for any block. */
export interface BlockInfoTxDetails extends BlockInfoBase {
  tx: Transaction[];
  ablastate?: AblaState;
}

/** Block info with full transaction objects - for blocks before ABLA activation (May 2024). */
export interface BlockInfoTxDetailsPreAbla extends BlockInfoBase {
  tx: Transaction[];
}

/** Block info with full transaction objects - for blocks after ABLA activation (May 2024). */
export interface BlockInfoTxDetailsPostAbla extends BlockInfoBase {
  tx: Transaction[];
  ablastate: AblaState;
}

/**
 * Base header info fields shared across response types.
 * @note `previousblockhash` not present on genesis block (height 0).
 * @note `nextblockhash` not present on chain tip.
 */
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
  previousblockhash: string;
  nextblockhash: string;
}

/** Block header info - works for any block. */
export interface HeaderInfo extends HeaderInfoBase {
  ablastate?: AblaState;
}

/** Block header info - for blocks before ABLA activation (May 2024). */
export interface HeaderInfoPreAbla extends HeaderInfoBase {}

/** Block header info - for blocks after ABLA activation (May 2024). */
export interface HeaderInfoPostAbla extends HeaderInfoBase {
  ablastate: AblaState;
}

/** Current blockchain state and synchronization status. */
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

/** UTXO set query result with bitmap for checked outpoints. */
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

/** Mempool configuration and size statistics. */
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

/** Mempool contents indexed by txid with fee and dependency info. */
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

/** Transaction with block hash (for confirmed transactions). */
export interface TxDetails extends Transaction {
  blockhash: string;
}

/** Script fingerprint and pattern info for bytecode analysis (v29.0.0+). */
export interface ByteCodePattern {
  fingerprint: string;
  pattern: string;
  patternArgsInfo?: string[];
}

/** Script with optional bytecode pattern metadata (v29.0.0+). */
export interface ScriptPubKeyWithPattern {
  asm: string;
  hex: string;
  type: string;
  address?: string;
  byteCodePattern?: ByteCodePattern;
}

/** Transaction input with prevout and pattern info (v29.0.0+). */
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

/** Transaction output with pattern-enabled scriptPubKey (v29.0.0+). */
export interface TransactionOutputWithPattern {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKeyWithPattern;
}

/** Transaction with bytecode patterns and optional fee (v29.0.0+). */
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

/** Block with pattern-enhanced transactions (v29.0.0+). */
export interface BlockInfoWithPatterns extends Omit<BlockInfoNoTxDetails, 'tx'> {
  tx: TxDetailsWithPatterns[];
}