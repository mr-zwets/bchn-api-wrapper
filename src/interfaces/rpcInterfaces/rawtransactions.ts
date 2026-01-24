/* --- Rawtransactions Commands --- */
// progress 14/14

import  type { TokenData, Transaction, TransactionInput, TransactionOutput } from "../interfaces.js";

/** Combines multiple PSBTs into one. */
export interface CombinePsbt {
  method: 'decoderawtransaction';
  params: [
    txs: string[]
  ];
  response: string
}

/** Combines multiple raw transactions into one. */
export interface CombineRawTransaction {
  method: 'combinerawtransaction';
  params: [
    txs: string[]
  ];
  response: string;
}

/** Converts a raw transaction to PSBT format. */
export interface ConvertToPsbt {
  method: 'converttopsbt';
  params: [
    hexstring: string,
    permitsigdata?: boolean
  ];
  response: string;
}

/** Creates an unsigned PSBT. */
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

/** Creates an unsigned raw transaction. */
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

/** Decodes a PSBT to inspect its contents. */
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

/** PSBT input structure. */
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

/** PSBT output structure. */
interface PsbtOutput {
  redeem_script?: RedeemScript;
  bip32_derivs?: Bip32Derivation[];
  unknown?: Record<string, string>;
}

/** Redeem script in PSBT. */
interface RedeemScript {
  asm: string;
  hex: string;
  type: string;
}

/** BIP32 derivation path info. */
interface Bip32Derivation {
  pubkey: string;
  master_fingerprint: string;
  path: string;
}

/** Decodes a raw transaction hex string. */
export interface DecodeRawTransaction {
  method: 'decoderawtransaction';
  params: [
    hexstring: string
  ];
  response: Transaction
}

/** Decodes a script hex string. */
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

/** Finalizes a PSBT, extracting the raw transaction if complete. */
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

/** Adds inputs to a raw transaction to meet output value. */
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

/** Verbosity 0: Returns raw transaction as hex string. */
export interface GetRawTransactionVerbosity0 extends GetRawTransactionBase {
  params: [
    txid: string,
    verbose?: false | 0,
    blockhash?: string
  ];
  response: string;
}

/** Verbosity 1: Returns decoded transaction with basic info. */
export interface GetRawTransactionVerbosity1 extends GetRawTransactionBase {
  params: [
    txid: string,
    verbose?: true | 1,
    blockhash?: string
  ];
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

/** Verbosity 2: Returns decoded transaction with input values and fee. */
export interface GetRawTransactionVerbosity2 extends GetRawTransactionBase {
  params: [
    txid: string,
    verbose?: 2,
    blockhash?: string
  ];
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

/** Transaction input with previous output value (verbosity 2). */
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

/** Broadcasts a signed raw transaction. */
export interface SendRawTransaction {
  method: 'sendrawtransaction';
  params: [
    hexstring: string,
    allowhighfees?: boolean
  ];
  response: string;
}

/** Signs a raw transaction with provided private keys. */
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

/** Tests if raw transactions would be accepted to mempool. */
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
