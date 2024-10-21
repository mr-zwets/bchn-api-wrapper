/* --- Rawtransactions Commands --- */
// progress 5/14

import { TxDetailsBlock } from "../restInterfaces/interfaces";

export interface DecodeRawTransaction {
  method: 'decoderawtransaction';
  params: [
    hexstring: string
  ];
  response: TxDetailsBlock
}

export interface DecodeScript {
  method: 'decodescript';
  params: [
    hexstring: string
  ];
  response: {
    asm: string;
    type: string;
    reqSigs: number;
    addresses: string[]
    p2sh: string;
  };
}

interface GetRawTransactionBase {
  method: 'getrawtransaction';
  params: [
    txid: string,
    verbose?: boolean | number,
    blockhash?: string
  ];
}

export interface GetRawTransactionVerbosity0 extends GetRawTransactionBase {
  response: string;
}

// TODO: type type Verbosity1, Verbosity2

export interface SendRawTransaction {
  method: 'sendrawtransaction';
  params: [
    hexstring: string,
    allowhighfees?: boolean
  ];
  response: string;
}

export interface TestMempoolAccept {
  method: 'testmempoolaccept';
  params: [
    rawtxs: string[],
    allowhighfees?: boolean
  ];
  response: {
    txid: string
    allowed: boolean
    'reject-reason': string
  }[];
}