/* --- Blockchain Commands --- */
// progress 33/33

import type { TokenData } from "../interfaces.js";

export interface FinalizeBlock {
  method: 'finalizeblock';
  params: [
    blockhash: string
  ];
}

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

// Verbosity = 0 (or false)
export interface GetBlockVerbosity0 extends GetBlockBase {
  response: string
}

// Verbosity = 1 (or true)
export interface GetBlockVerbosity1 extends GetBlockBase {
  response: {
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
}

// TODO: type Verbosity2, Verbosity3

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
  }
}

export interface GetBlockCount {
  method: 'getblockcount';
  params: [];
  response: number;
}

export interface GetBlockHash {
  method: 'getblockhash';
  params: [number];
  response: string;
}

export interface GetBlockHeaderBase {
  method: 'getblockheader';
  params: [
    hash_or_height: string| number,
    verbosity?: boolean | number
  ];
}

export interface GetBlockHeaderVerbosity0 extends GetBlockHeaderBase {
  response: string;
}

export interface GetBlockHeaderVerbosity1 extends GetBlockHeaderBase {
  response: {
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
    ablastate : {
      epsilon: number;
      beta: number;
      blocksize: number;
      blocksizelimit: number;
      nextblocksizelimit: number;
    }
  };
}

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

// Verbosity = 0 (or false)
export interface GetDsProofVerbosity0 extends GetDsProofBase {
  response: {
    hex: string;
    txid: string | null;
    path?: string[];  // Optional for recursive = true
  };
}

// Verbosity = 1
export interface GetDsProofVerbosity1 extends GetDsProofBase {
  response: {
    hex: string;
    txid: string | null;
    path?: string[];  // Optional for recursive = true
    descendants?: string[]
  };
}

// Verbosity = 2 (or true)
export interface GetDsProofVerbosity2 extends GetDsProofBase {
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

// Verbosity = 3
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

// Verbosity = 0 (or false)
export interface GetDsProofListVerbosity0 extends GetDsProofListBase {
  response: string[]
}

// Verbosity = 1
export interface GetDsProofListVerbosity1 extends GetDsProofListBase {
  response: {
    hex: string;
    txid: string | null;
  }[]
}

// Verbosity = 2 (or true)
export interface GetDsProofListVerbosity2 extends GetDsProofListBase {
  response: {
    dspid: string;
    txid: string | null;
    outpoint: {
      txid: string;
      vout: number;
    };
  }[]
}

// Verbosity = 3
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

export interface GetDsProofScore {
  method: 'getdsproofscore';
  params: [
    txid: string
  ];
  response: number;
}

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

// Verbosity 0 (false)
export interface GetMempoolAncestorsVerbosity0 extends GetMempoolAncestorsBase {
  response: string[];
}

// Verbosity 1 (true)
export interface GetMempoolAncestorsVerbosity1 extends GetMempoolAncestorsBase {
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

// Verbosity 0 (false)
export interface GetMempoolDescendantsVerbosity0 extends GetMempoolDescendantsBase {
  response: string[];
}

// Verbosity 1 (true)
export interface GetMempoolDescendantsVerbosity1 extends GetMempoolDescendantsBase {
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
  }
}

interface GetRawMempoolBase {
  method: 'getrawmempool';
  params: [
    verbose?: boolean | number
  ];
}

// Verbosity 0 (false)
export interface GetRawMempoolVerbosity0 extends GetRawMempoolBase {
  response: string[];
}

// Verbosity 1 (true)
export interface GetRawMempoolVerbosity1 extends GetRawMempoolBase {
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

export interface GetTxOutProof {
  method: 'gettxoutproof';
  params: [
    txids: string[],
    blockhash?: string
  ];
  response: string;
}


export interface GetTxOutSetInfo {
  method: 'gettxoutsetinfo';
  params: [
    txid: string
  ];
  response: {
    height: number;
    bestblock: string;
    transactions: number;
    txouts: number;
    bogosize: number;
    hash_serialized: string;
    disk_size: number;
    total_amount: number;
  }
}

export interface InvalidateBlock {
  method: 'invalidateblock';
  params: [
    blockhash: string
  ];
  response: null;
}

export interface ParkBlock {
  method: 'parkblock';
  params: [
    blockhash: string
  ];
  response: null;
}

export interface PreciousBlock {
  method: 'preciousblock';
  params: [
    blockhash: string
  ];
  response: null;
}

export interface PruneBlockchain {
  method: 'pruneblockchain';
  params: [
    height: number
  ];
  response: number;
}

export interface ReconsiderBlock {
  method: 'reconsiderblock';
  params: [
    blockhash: string
  ];
  response: null;
}

export interface SaveMempool {
  method: 'savemempool';
  params: [];
  response: null;
}

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

export interface UnparkBlock {
  method: 'unparkblock';
  params: [
    blockhash: string
  ];
  response: null;
}

export interface VerifyChain {
  method: 'verifychain';
  params: [
    checklevel?: number,
    nblocks?: number
  ];
  response: boolean;
}

export interface VerifyTxOutProof {
  method: 'verifytxoutproof';
  params: [
    proof: string
  ];
  response: string[];
}