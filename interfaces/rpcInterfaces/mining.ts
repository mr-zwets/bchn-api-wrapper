/* --- Mining Commands --- */
// progress 4/9

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
