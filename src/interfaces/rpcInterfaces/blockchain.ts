/* --- Blockchain Commands --- */
// progress 33/33

import type { TokenData, Transaction, TransactionInput } from "../interfaces.js";

/** Finalize a block by hash (Avalanche post-consensus). */
export interface FinalizeBlock {
  method: 'finalizeblock';
  params: [
    blockhash: string
  ];
}

/** Returns the hash of the best (tip) block in the most-work chain. */
export interface GetBestBlockHash {
  method: 'getbestblockhash';
  params: [];
  response: string;
}

interface GetBlockBase {
  method: 'getblock';
  params: [
    blockhash: string,
    verbosity?: number | boolean
  ];
}

/** Adaptive Block Limit Algorithm state (activated May 2024). */
export interface AblaState {
  epsilon: number;
  beta: number;
  blocksize: number;
  blocksizelimit: number;
  nextblocksizelimit: number;
}

/**
 * Base block response fields shared across verbosity levels.
 * @note `previousblockhash` not present on genesis block (height 0).
 * @note `nextblockhash` not present on chain tip.
 */
interface BlockResponseBase {
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

/** Verbosity 0: Returns hex-encoded block data. */
export interface GetBlockVerbosity0 extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity?: 0 | false
  ];
  response: string
}

/** Verbosity 1 response: block with tx IDs as string array. */
interface BlockResponseVerbosity1 extends BlockResponseBase {
  tx: string[];
}

/** Verbosity 1: Block with tx IDs - works for any block. */
export interface GetBlockVerbosity1 extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity?: 1 | true
  ];
  response: BlockResponseVerbosity1 & { ablastate?: AblaState };
}

/** Verbosity 1: Block with tx IDs - for blocks before ABLA activation (May 2024). */
export interface GetBlockVerbosity1PreAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity?: 1 | true
  ];
  response: BlockResponseVerbosity1;
}

/** Verbosity 1: Block with tx IDs - for blocks after ABLA activation (May 2024). */
export interface GetBlockVerbosity1PostAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity?: 1 | true
  ];
  response: BlockResponseVerbosity1 & { ablastate: AblaState };
}

/** Verbosity 2 response: block with tx objects containing txid and fee. */
interface BlockResponseVerbosity2 extends BlockResponseBase {
  tx: {
    txid: string;
    fee?: number;
  }[];
}

/** Verbosity 2: Block with txid/fee objects - works for any block. */
export interface GetBlockVerbosity2 extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 2
  ];
  response: BlockResponseVerbosity2 & { ablastate?: AblaState };
}

/** Verbosity 2: Block with txid/fee objects - for blocks before ABLA activation (May 2024). */
export interface GetBlockVerbosity2PreAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 2
  ];
  response: BlockResponseVerbosity2;
}

/** Verbosity 2: Block with txid/fee objects - for blocks after ABLA activation (May 2024). */
export interface GetBlockVerbosity2PostAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 2
  ];
  response: BlockResponseVerbosity2 & { ablastate: AblaState };
}

/** Transaction input extended with previous output data. */
export interface TransactionInputWithPrevout extends TransactionInput {
  prevout?: {
    generated: boolean;
    height: number;
    value: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      type: 'nonstandard' | 'pubkey' | 'pubkeyhash' | 'scripthash' | 'multisig' | 'nulldata';
      address?: string;
    };
    tokenData?: TokenData;
  };
}

/** Transaction with prevout data on inputs (used by verbosity 3). */
export interface TransactionWithPrevout extends Omit<Transaction, 'vin'> {
  vin: TransactionInputWithPrevout[];  // Use the extended input type with `prevout`
}

/** Verbosity 3 response: full transaction details with prevout. */
interface BlockResponseVerbosity3 extends BlockResponseBase {
  tx: TransactionWithPrevout[];
}

/** Verbosity 3: Block with full tx objects including prevout - works for any block. */
export interface GetBlockVerbosity3 extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 3
  ];
  response: BlockResponseVerbosity3 & { ablastate?: AblaState };
}

/** Verbosity 3: Block with full tx objects including prevout - for blocks before ABLA activation (May 2024). */
export interface GetBlockVerbosity3PreAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 3
  ];
  response: BlockResponseVerbosity3;
}

/** Verbosity 3: Block with full tx objects including prevout - for blocks after ABLA activation (May 2024). */
export interface GetBlockVerbosity3PostAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 3
  ];
  response: BlockResponseVerbosity3 & { ablastate: AblaState };
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
  type: 'nonstandard' | 'pubkey' | 'pubkeyhash' | 'scripthash' | 'multisig' | 'nulldata';
  address?: string;
  byteCodePattern?: ByteCodePattern;
}

/** Transaction input with prevout and pattern info (v29.0.0+). */
export interface TransactionInputWithPattern extends TransactionInput {
  prevout?: {
    generated: boolean;
    height: number;
    value: number;
    scriptPubKey: ScriptPubKeyWithPattern;
    tokenData?: TokenData;
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
  tokenData?: TokenData;
}

/** Transaction with bytecode patterns (v29.0.0+). */
export interface TransactionWithPattern {
  txid: string;
  hash: string;
  size: number;
  version: number;
  locktime: number;
  vin: TransactionInputWithPattern[];
  vout: TransactionOutputWithPattern[];
  fee?: number;
}

/** Verbosity 4 response: includes byteCodePattern (v29.0.0+). */
interface BlockResponseVerbosity4 extends BlockResponseBase {
  tx: TransactionWithPattern[];
}

/** Verbosity 4: Block with bytecode patterns (v29.0.0+) - works for any block. */
export interface GetBlockVerbosity4 extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 4
  ];
  response: BlockResponseVerbosity4 & { ablastate?: AblaState };
}

/** Verbosity 4: Block with bytecode patterns (v29.0.0+) - for blocks before ABLA activation (May 2024). */
export interface GetBlockVerbosity4PreAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 4
  ];
  response: BlockResponseVerbosity4;
}

/** Verbosity 4: Block with bytecode patterns (v29.0.0+) - for blocks after ABLA activation (May 2024). */
export interface GetBlockVerbosity4PostAbla extends GetBlockBase {
  params: [
    blockhash: string,
    verbosity: 4
  ];
  response: BlockResponseVerbosity4 & { ablastate: AblaState };
}

/** Returns blockchain state, sync progress, and upcoming upgrade info. */
export interface GetBlockchainInfo {
  method: 'getblockchaininfo';
  params: [];
  response: {
    chain: 'main' | 'test' | 'regtest';
    blocks: number;
    headers: number;
    bestblockhash: string;
    difficulty: number;
    mediantime: number;
    verificationprogress: number;
    initialblockdownload: boolean;
    chainwork: string;
    size_on_disk: number;
    pruned: boolean;
    pruneheight: number;
    automatic_pruning: boolean;
    prune_target_size?: number;
    warnings: string;
    upgrade_status: {
      name: string;
      mempool_activated: boolean;
      mempool_activation_mtp: number;
      block_preactivation_height: number;
      block_preactivation_hash: string;
      block_postactivation_height: number;
      block_postactivation_hash: string;
      software_expiration_time: number;
    };
  }
}

/** Returns the current block height. */
export interface GetBlockCount {
  method: 'getblockcount';
  params: [];
  response: number;
}

/** Returns block hash at given height. */
export interface GetBlockHash {
  method: 'getblockhash';
  params: [
    height: number
  ];
  response: string;
}

export interface GetBlockHeaderBase {
  method: 'getblockheader';
  params: [
    hash_or_height: string| number,
    verbosity?: boolean | number
  ];
}

/** Verbosity 0: Returns hex-encoded block header. */
export interface GetBlockHeaderVerbosity0 extends GetBlockHeaderBase {
  params: [
    hash_or_height: string| number,
    verbosity?: false | 0
  ];
  response: string;
}

/**
 * Base header response fields.
 * @note `previousblockhash` not present on genesis block (height 0).
 * @note `nextblockhash` not present on chain tip.
 */
interface HeaderResponseBase {
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

/** Verbosity 1: Parsed header object - works for any block. */
export interface GetBlockHeaderVerbosity1 extends GetBlockHeaderBase {
  params: [
    hash_or_height: string| number,
    verbosity?: true | 1
  ];
  response: HeaderResponseBase & { ablastate?: AblaState };
}

/** Verbosity 1: Parsed header object - for blocks before ABLA activation (May 2024). */
export interface GetBlockHeaderVerbosity1PreAbla extends GetBlockHeaderBase {
  params: [
    hash_or_height: string| number,
    verbosity?: true | 1
  ];
  response: HeaderResponseBase;
}

/** Verbosity 1: Parsed header object - for blocks after ABLA activation (May 2024). */
export interface GetBlockHeaderVerbosity1PostAbla extends GetBlockHeaderBase {
  params: [
    hash_or_height: string| number,
    verbosity?: true | 1
  ];
  response: HeaderResponseBase & { ablastate: AblaState };
}

/** Returns fee/size statistics for a block. */
export interface GetBlockStats {
  method: 'getblockheader';
  params: [
    hash_or_height: string| number,
    stats?: string[]
  ];
  response: {
    avgfee: number;
    avgfeerate: number;
    avgtxsize: number;
    blockhash: string;
    feerate_percentiles: {
      "10th_percentile_feerate": number;
      "25th_percentile_feerate": number;
      "50th_percentile_feerate": number;
      "75th_percentile_feerate": number;
      "90th_percentile_feerate": number;
    };
    height: number;
    ins: number;
    maxfee: number;
    maxfeerate: number;
    maxtxsize: number;
    medianfee: number;
    mediantime: number;
    mediantxsize: number;
    minfee: number;
    minfeerate: number;
    mintxsize: number;
    outs: number;
    subsidy: number;
    time: number;
    total_out: number;
    total_size: number;
    totalfee: number;
    txs: number;
    utxo_increase: number;
    utxo_size_inc: number;
  }

}

/** Returns all known chain tips including forks. */
export interface GetChainTips {
  method: 'getchaintips';
  params: [];
  response: {
    height: number
    hash: string
    branchlen:number
    status: 'active' | 'parked' | 'headers-only' | 'valid-headers' | 'valid-fork' | 'active'
  }[]
}

/** Returns transaction statistics over a block window. */
export interface GetChainTxStats {
  method: 'getchaintxstats';
  params: [
    nblocks?: number,
    blockhash?: string
  ];
  response: {
    time: number;
    txcount: number;
    window_final_block_hash: string;
    window_block_count: number;
    window_tx_count: number | undefined;
    window_interval: number | undefined;
    txrate: number;
  }
}

/** Returns current network difficulty. */
export interface GetDifficulty {
  method: 'getdifficulty';
  params: [];
  response: number;
}

interface GetDsProofBase {
  method: 'getdsproof';
  params: [
    dspid_or_txid_or_outpoint: string | { txid: string; vout: number },
    verbosity?: number | boolean,
    recursive?: boolean
  ];
}

/** Verbosity 0: Double-spend proof as hex. */
export interface GetDsProofVerbosity0 extends GetDsProofBase {
  params: [
    dspid_or_txid_or_outpoint: string | { txid: string; vout: number },
    verbosity?: 0 | false,
    recursive?: boolean
  ];
  response: {
    hex: string;
    txid: string | null;
    path?: string[];  // Optional for recursive = true
  };
}

/** Verbosity 1: Double-spend proof with descendants. */
export interface GetDsProofVerbosity1 extends GetDsProofBase {
  params: [
    dspid_or_txid_or_outpoint: string | { txid: string; vout: number },
    verbosity?: 1,
    recursive?: boolean
  ];
  response: {
    hex: string;
    txid: string | null;
    path?: string[];  // Optional for recursive = true
    descendants?: string[]
  };
}

/** Verbosity 2: Double-spend proof with parsed outpoint. */
export interface GetDsProofVerbosity2 extends GetDsProofBase {
  params: [
    dspid_or_txid_or_outpoint: string | { txid: string; vout: number },
    verbosity?: 2 | true,
    recursive?: boolean
  ];
  response: {
    dspid: string;
    txid: string | null;
    outpoint: {
      txid: string;
      vout: number;
    };
    descendants?: string[];
    path?: string[];  // Optional for recursive = true
  };
}

/** Double-spend proof spender data. */
interface Spender {
  txversion: number,
  sequence: number,
  locktime: number,
  hashprevoutputs: string,
  hashsequence: string,
  hashoutputs: string,
  pushdata: {
    asm: string,
    hex: string
  }
}

/** Verbosity 3: Double-spend proof with full spender details. */
export interface GetDsProofVerbosity3 extends GetDsProofVerbosity2 {
  response: {
    dspid: string;
    txid: string | null;
    outpoint: {
      txid: string;
      vout: number;
    };
    spenders: Spender[];
    descendants?: string[];
    path?: string[];  // Optional for recursive = true
  };
}

export interface GetDsProofListBase {
  method: 'getdsprooflist';
  params: [
    verbosity?: number | boolean,
    include_orphans?: boolean
  ];
}

/** Verbosity 0: List of double-spend proof IDs. */
export interface GetDsProofListVerbosity0 extends GetDsProofListBase {
  params: [
    verbosity?: 0 | false,
    include_orphans?: boolean
  ];
  response: string[]
}

/** Verbosity 1: List of double-spend proofs as hex with txid. */
export interface GetDsProofListVerbosity1 extends GetDsProofListBase {
  params: [
    verbosity?: 1,
    include_orphans?: boolean
  ];
  response: {
    hex: string;
    txid: string | null;
  }[]
}

/** Verbosity 2: List of double-spend proofs with parsed outpoints. */
export interface GetDsProofListVerbosity2 extends GetDsProofListBase {
  params: [
    verbosity?: 2 | true,
    include_orphans?: boolean
  ];
  response: {
    dspid: string;
    txid: string | null;
    outpoint: {
      txid: string;
      vout: number;
    };
  }[]
}

/** Verbosity 3: List of double-spend proofs with full spender details. */
export interface GetDsProofListVerbosity3 extends GetDsProofListBase {
  response: {
    dspid: string;
    txid: string | null;
    outpoint: {
      txid: string;
      vout: number;
    };
    spenders: Spender[]
  }[]
}

/** Returns double-spend proof score for a transaction. */
export interface GetDsProofScore {
  method: 'getdsproofscore';
  params: [
    txid: string
  ];
  response: number;
}

/** Returns the hash of the last finalized block. */
export interface GetFinalizedBlockHash {
  method: 'getfinalizedblockhash';
  params: [];
  response: string;
}

interface GetMempoolAncestorsBase {
  method: 'getmempoolancestors';
  params: [
    txid: string,
    verbose?: boolean | number
  ];
}

/** Verbosity 0: Returns ancestor txids as array. */
export interface GetMempoolAncestorsVerbosity0 extends GetMempoolAncestorsBase {
  params: [
    txid: string,
    verbose?: false | 0
  ];
  response: string[];
}

/** Verbosity 1: Returns ancestor txids with detailed mempool info. */
export interface GetMempoolAncestorsVerbosity1 extends GetMempoolAncestorsBase {
  params: [
    txid: string,
    verbose?: true | 1
  ];
  response: {
    [transactionid: string]: {
      size: number;
      time: number;
      fees: {
        base: number;
        modified: number;
      };
      depends: string[];
      spentby: string[];
    };
  };
}

interface GetMempoolDescendantsBase {
  method: 'getmempooldescendants';
  params: [
    txid: string,
    verbose?: boolean | number
  ];
}

/** Verbosity 0: Returns descendant txids as array. */
export interface GetMempoolDescendantsVerbosity0 extends GetMempoolDescendantsBase {
  params: [
    txid: string,
    verbose?: false | 0
  ];
  response: string[];
}

/** Verbosity 1: Returns descendant txids with detailed mempool info. */
export interface GetMempoolDescendantsVerbosity1 extends GetMempoolDescendantsBase {
  params: [
    txid: string,
    verbose?: true | 1
  ];
  response: {
    [transactionid: string]: {
      size: number;
      time: number;
      fees: {
        base: number;
        modified: number;
      };
      depends: string[];
      spentby: string[];
    };
  };
}

/** Returns mempool entry for a specific transaction. */
export interface GetMempoolEntry {
  method: 'getmempoolentry';
  params: [
    txid: string
  ];
  response: {
    size: number;
    time: number;
    fees: {
      base: number;
      modified: number;
    };
    depends: string[];
    spentby: string[];
  };
}

/** Returns mempool statistics and configuration. */
export interface GetMempoolInfo {
  method: 'getmempoolinfo';
  params: [];
  response: {
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
}

interface GetRawMempoolBase {
  method: 'getrawmempool';
  params: [
    verbose?: boolean | number
  ];
}

/** Verbosity 0: Returns all mempool txids as array. */
export interface GetRawMempoolVerbosity0 extends GetRawMempoolBase {
  params: [
    verbose?: false | 0
  ];
  response: string[];
}

/** Verbosity 1: Returns all mempool txids with detailed info. */
export interface GetRawMempoolVerbosity1 extends GetRawMempoolBase {
  params: [
    verbose?: true | 1
  ];
  response: {
    [transactionid: string]: {
      size: number;
      time: number;
      fees: {
        base: number;
        modified: number;
      };
      depends: string[];
      spentby: string[];
    };
  };
}

/** Returns details about an unspent transaction output. */
export interface GetTxOut {
  method: 'gettxout';
  params: [
    txid: string,
    vout: number,
    include_mempool?: boolean
  ];
  response: {
    bestblock: string;
    confirmations: number
    value: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      type: string;
      addresses: string[];
    }
    tokenData?: TokenData;
    coinbase: boolean;
  }
}

/** Returns a merkle proof that transaction(s) are in a block. */
export interface GetTxOutProof {
  method: 'gettxoutproof';
  params: [
    txids: string[],
    blockhash?: string
  ];
  response: string;
}

/** Returns UTXO set statistics. */
export interface GetTxOutSetInfo {
  method: 'gettxoutsetinfo';
  params: [
    hash_type?: 'hash_serialized_3' | 'ecmh' | 'muhash',
    hash_or_height?: string | number,
    use_index?: boolean
  ];
  response: {
    height: number;
    bestblock: string;
    transactions: number;
    txouts: number;
    bogosize: number;
    hash_serialized_3: string;
    disk_size: number;
    total_amount: number;
  }
}

/** Permanently marks a block as invalid (cannot be part of best chain). */
export interface InvalidateBlock {
  method: 'invalidateblock';
  params: [
    blockhash: string
  ];
  response: null;
}

/** Marks a block as parked (temporarily invalid). */
export interface ParkBlock {
  method: 'parkblock';
  params: [
    blockhash: string
  ];
  response: null;
}

/** Treats a block as if it were received before others with same work. */
export interface PreciousBlock {
  method: 'preciousblock';
  params: [
    blockhash: string
  ];
  response: null;
}

/** Prunes blockchain up to specified height. Returns height of last pruned block. */
export interface PruneBlockchain {
  method: 'pruneblockchain';
  params: [
    height: number
  ];
  response: number;
}

/** Removes invalidity status from a block and its descendants. */
export interface ReconsiderBlock {
  method: 'reconsiderblock';
  params: [
    blockhash: string
  ];
  response: null;
}

/** Saves mempool to disk. */
export interface SaveMempool {
  method: 'savemempool';
  params: [];
  response: null;
}

/** Scans UTXO set for outputs matching descriptors. */
export interface ScanTxOutSet {
  method: 'scantxoutset';
  params: [
    action: 'start' | 'abort' | 'status',
    scanobjects?: Array<string | {
      desc: string;
      range?: number;
    }>
  ];
  response: {
    unspents: Array<{
      txid: string;
      vout: number;
      scriptPubKey: string;
      amount: number;
      height: number;
      tokenData?: TokenData;
    }>;
    total_amount: number;
    token_total_amount?: {
      [category: string]: string;
    };
  } | boolean;
}

/** Removes parked status from a block and its descendants. */
export interface UnparkBlock {
  method: 'unparkblock';
  params: [
    blockhash: string
  ];
  response: null;
}

/** Verifies blockchain database. */
export interface VerifyChain {
  method: 'verifychain';
  params: [
    checklevel?: number,
    nblocks?: number
  ];
  response: boolean;
}

/** Verifies a merkle proof and returns the txids it commits to. */
export interface VerifyTxOutProof {
  method: 'verifytxoutproof';
  params: [
    proof: string
  ];
  response: string[];
}