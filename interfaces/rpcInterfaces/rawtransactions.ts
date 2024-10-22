/* --- Rawtransactions Commands --- */
// progress 14/14

import { TokenData, Transaction, TransactionInput, TransactionOutput } from "../interfaces";

export interface CombinePsbt {
  method: 'decoderawtransaction';
  params: [
    txs: string[]
  ];
  response: string
}

export interface CombineRawTransaction {
  method: 'combinerawtransaction';
  params: [
    txs: string[]
  ];
  response: string;
}

export interface ConvertToPsbt {
  method: 'converttopsbt';
  params: [
    hexstring: string,
    permitsigdata?: boolean
  ];
  response: string;
}

export interface CreatePsbt {
  method: 'createpsbt';
  params: [
    inputs: {
      txid: string;
      vout: number;
      sequence?: number;
    }[],
    outputs: {
      [address: string]: number
      | {
        amount: number;
        tokendata: TokenData;
      }
      | {
        data: string;
      }
    }[],
    locktime?: number
  ];
  response: string;
}

export interface CreateRawTransaction {
  method: 'createrawtransaction';
  params: [
    inputs: {
      txid: string;
      vout: number;
      sequence?: number;
    }[],
    outputs: {
      [address: string]: number
      | {
        amount: number;
        tokendata: TokenData;
      }
      | {
        data: string;
      }
    }[],
    locktime?: number,
  ];
  response: string;
}

export interface DecodePsbt {
  method: 'decodepsbt';
  params: [
    psbt: string
  ];
  response: {
    tx: Transaction;
    unknown: Record<string, string>;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
    fee?: number;
  };
}

interface PsbtInput {
  utxo?: {
    amount: number;
    scriptPubKey: {
      asm: string;
      hex: string;
      type: string;
      addresses?: string[];
    };
    tokenData?: TokenData;
  };
  partial_signatures?: Record<string, string>;
  sighash?: string;
  redeem_script?: RedeemScript;
  bip32_derivs?: Bip32Derivation[];
  final_scriptsig?: {
    asm: string;
    hex: string;
  };
  unknown?: Record<string, string>;
}

interface PsbtOutput {
  redeem_script?: RedeemScript;
  bip32_derivs?: Bip32Derivation[];
  unknown?: Record<string, string>;
}

interface RedeemScript {
  asm: string;
  hex: string;
  type: string;
}

interface Bip32Derivation {
  pubkey: string;
  master_fingerprint: string;
  path: string;
}

export interface DecodeRawTransaction {
  method: 'decoderawtransaction';
  params: [
    hexstring: string
  ];
  response: Transaction
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

export interface FinalizePsbt {
  method: 'finalizepsbt';
  params: [
    psbt: string,
    extract?: boolean
  ];
  response: {
    psbt: string;
    hex: string;
    complete: boolean;
  }
}

export interface FundRawTransaction {
  method: 'fundrawtransaction';
  params: [
    hexstring: string,
    options?: {
      include_unsafe?: boolean;
      changeAddress?: string;
      changePosition?: number;
      includeWatching?: boolean;
      lockUnspents?: boolean;
      feeRate?: number | string;
      subtractFeeFromOutputs?: number[];
    }
  ];
  response: {
    hex: string;
    fee: number;
    changepos: number;
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

// Verbosity 1 (basic transaction info)
export interface GetRawTransactionVerbosity1 extends GetRawTransactionBase {
  response: {
    hex: string;
    txid: string;
    hash: string;
    size: number;
    version: number;
    locktime: number;
    vin: TransactionInput[];
    vout: TransactionOutput[];
    blockhash?: string;
    confirmations?: number;
    time?: number;
    blocktime?: number;
    in_active_chain?: boolean;
  };
}

// Verbosity 2 (includes input values and transaction fee)
export interface GetRawTransactionVerbosity2 extends GetRawTransactionBase {
  response: {
    hex: string;
    txid: string;
    hash: string;
    size: number;
    version: number;
    locktime: number;
    vin: TransactionInputVerbosity2[];
    vout: TransactionOutput[];
    blockhash?: string;
    confirmations?: number;
    time?: number;
    blocktime?: number;
    in_active_chain?: boolean;
    fee?: number;
  };
}

interface TransactionInputVerbosity2 extends TransactionInput {
  value?: number;
  scriptPubKey?: {
    asm: string;
    hex: string;
    type: string;
    address?: string;
  };
  tokenData?: TokenData;
}


export interface SendRawTransaction {
  method: 'sendrawtransaction';
  params: [
    hexstring: string,
    allowhighfees?: boolean
  ];
  response: string;
}

export interface SignRawTransactionWithKey {
  method: 'signrawtransactionwithkey';
  params: [
    hexstring: string,
    privkeys: string[],
    prevtxs?: {
      txid: string;
      vout: number;
      scriptPubKey: string;
      redeemScript?: string;
      amount: number | string;
      tokenData?: TokenData;
    }[],
    sighashtype?: string
  ];
  response: {
    hex: string;
    complete: boolean;
    errors?: {
      txid: string;
      vout: number;
      scriptSig: string;
      sequence: number;
      error: string;
    }[];
  };
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