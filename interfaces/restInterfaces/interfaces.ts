import { TokenData } from "../interfaces";

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
  tx: TxDetailsBlock[]
}

export interface TxDetailsBlock {
  txid: string;
  hash: string;
  version: number;
  size: number;
  locktime: number;
  vin:{
    txid: string;
    vout: number;
    scriptSig: {
      asm: string;
      hex: string;
    },
    sequence: number;
  }[]
  vout: {
    value: number;
    n: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      reqSigs: number;
      type: string;
      addresses: string[];
      tokenData: TokenData;
    }
  }[]
  hex: string;
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

export interface TxDetails extends TxDetailsBlock {
  blockhash: string;
}