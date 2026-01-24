/* --- Mining Commands --- */
// progress 9/9

/** Returns a block template for mining. */
export interface GetBlockTemplate {
  method: 'getblocktemplate';
  params: {
    mode?: 'template' | 'proposal';
    capabilities?: ('longpoll' | 'coinbasetxn' | 'coinbasevalue' | 'proposal' | 'serverlist' | 'workid')[];
    longpollid?: string;
    checkvalidity?: boolean;
    ignorecache?: boolean;
  };
  response: {
    version: number;
    previousblockhash: string;
    transactions: {
      data: string;
      txid: string;
      hash: string;
      depends: number[];
      fee: number;
      sigops: number;
      required: boolean;
    }[];
    coinbaseaux: {
      flags: string;
    };
    coinbasevalue: number;
    coinbasetxn?: object;
    target: string;
    mintime: number;
    mutable: string[];
    noncerange: string;
    sigoplimit: number;
    sizelimit: number;
    curtime: number;
    bits: string;
    height: number;
  }
}

/** Returns a lightweight block template (for mining pools). */
export interface GetBlockTemplateLight {
  method: 'getblocktemplatelight';
  params: [
    {
      mode?: 'template' | 'proposal';
      capabilities?: ('longpoll' | 'coinbasetxn' | 'coinbasevalue' | 'proposal' | 'serverlist' | 'workid')[];
      longpollid?: string;
      checkvalidity?: boolean;
      ignorecache?: boolean;
    },
    additional_txs?: string[]
  ];
  response: {
    version: number;
    previousblockhash: string;
    job_id: string;
    merkle: string[];
    coinbaseaux: {
      flags: string;
    };
    coinbasevalue: number;
    coinbasetxn: object;
    target: string;
    mintime: number;
    mutable: string[];
    noncerange: string;
    sigoplimit: number;
    sizelimit: number;
    curtime: number;
    bits: string;
    height: number;
  };
}

/** Returns mining-related information. */
export interface GetMiningInfo {
  method: 'getmininginfo';
  params: [];
  response: {
    blocks: number;
    currentblocksize: number;
    currentblocktx: number;
    difficulty: number;
    networkhashps: number;
    miningblocksizelimit: number;
    pooledtx: number;
    chain: string;
    warnings: string;
  }
}

/** Returns estimated network hash rate. */
export interface GetNetworkHashps {
  method: 'getnetworkhashps';
  params: [
    nblocks?: number,
    height?: number
  ];
  response: number
}

/** Modifies a mempool transaction's priority. */
export interface PrioritiseTransaction {
  method: 'prioritisetransaction';
  params: [
    txid: string,
    fee_delta: number
  ];
  response: true
}

/** Submits a mined block to the network. */
export interface SubmitBlock {
  method: 'submitblock';
  params: [
    hexdata: string,
    dummy?: string
  ];
  response: {}
}

/** Submits a lightweight block (for mining pools). */
export interface SubmitBlockLight {
  method: 'submitblocklight';
  params: [
    hexdata: string,
    job_id: string
  ];
  response: {}
}

/** Submits a block header for validation. */
export interface SubmitHeader {
  method: 'submitheader';
  params: [
    hexdata: string
  ];
  response: {}
}

/** Validates a block template without mining. */
export interface ValidateBlockTemplate {
  method: 'validateblocktemplate';
  params: [
    hexdata: string
  ];
  response: true
}
