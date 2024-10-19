/* --- Blockchain Commands --- */
// progress 9/33

export interface GetBestBlockHash {
  method: 'getbestblockhash';
  params: [];
  response: string;
}

// TODO: type verbose result
export interface GetBlock {
  method: 'getblock';
  params: [
    blockhash: string,
    verbosity?: number
  ];
  response: string | any;
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