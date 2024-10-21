/* --- Mining Commands --- */
// progress 7/9

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

export interface GetNetworkHashps {
  method: 'getnetworkhashps';
  params: [
    nblocks?: number,
    height?: number
  ];
  response: number
}

export interface PrioritiseTransaction {
  method: 'prioritisetransaction';
  params: [
    txid: string,
    fee_delta: number
  ];
  response: true
}

export interface SubmitBlock {
  method: 'submitblock';
  params: [
    hexdata: string,
    dummy?: string
  ];
  response: {}
}

export interface SubmitBlockLight {
  method: 'submitblocklight';
  params: [
    hexdata: string,
    job_id: string
  ];
  response: {}
}

export interface SubmitHeader {
  method: 'submitheader';
  params: [
    hexdata: string
  ];
  response: {}
}

export interface ValidateBlockTemplate {
  method: 'validateblocktemplate';
  params: [
    hexdata: string
  ];
  response: true
}
