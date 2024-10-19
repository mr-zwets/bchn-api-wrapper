/* --- Blockchain Commands --- */
// progress 11/33

export interface GetBestBlockHash {
  method: 'getbestblockhash';
  params: [];
  response: string;
}

interface GetBlockBase {
  method: 'getblock';
  params: [
    blockhash: string,
    verbosity?: number
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
    verbosity?: number,
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