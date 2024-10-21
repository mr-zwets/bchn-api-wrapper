/* --- Wallet Commands --- */
// progress 15/53

import { TokenData } from "../interfaces";

export interface DumpPrivKey {
  method: 'dumpprivkey';
  params: [
    address: string,
  ];
  response: string;
}

export interface GetAddressInfo {
  method: 'getaddressinfo';
  params: [string];
  response: {
    address: string;
    scriptPubKey: string;
    ismine: boolean;
    iswatchonly: boolean;
    isscript: boolean;
    ischange: boolean;
    script?: 'nonstandard' | 'pubkey' | 'pubkeyhash' | 'scripthash' | 'multisig' | 'nulldata';
    hex?: string;
    pubkeys?: string[];
    sigsrequired?: number;
    pubkey?: string;
    embedded?: object;
    iscompressed: boolean;
    label: string;
    timestamp?: number;
    hdkeypath?: string;
    hdseedid?: string;
    hdmasterkeyid?: string;
    labels: {
      name: string;
      purpose: 'send' | 'receive';
    }[];
  };
}

export interface GetBalance {
  method: 'getbalance';
  params: [
    dummy?: string,
    minconf?: number,
    include_watchonly?: boolean
  ];
  response: number;
}

export interface GetNewAddress {
  method: 'getnewaddress';
  params: [
    label?: string,
  ];
  response: string;
}

export interface GetReceivedByAddress {
  method: 'getreceivedbyaddress';
  params: [
    address: string,
    minconf?: number
  ];
  response: number;
}

export interface GetUnconfirmedBalance {
  method: 'getunconfirmedbalance';
  params: [];
  response: number;
}

export interface GetWalletInfo {
  method: 'getwalletinfo';
  params: [];
  response: {
    walletname: string,
    walletversion: number;
    balance: number;
    unconfirmed_balance: number;
    immature_balance: number;
    txcount: number;
    keypoololdest: number;
    keypoolsize: number;
    keypoolsize_hd_internal: number;
    unlocked_until: number;
    paytxfee: number;
    hdseedid?: string;
    hdmasterkeyid?: string;
    private_keys_enabled: boolean;
  }
}

export interface ImportAddress {
  method: 'importaddress';
  params: [
    address: string,
    label?: string,
    rescan?: boolean,
    p2sh?: boolean
  ];
  response: number;
}

export interface ListUnspent {
  method: 'listunspent';
  params: [
    minconf?: number,
    maxconf?: number,
    addresses?: string[],
    include_unsafe?: boolean,
    query_options?: {
      minimumAmount?: number | string;
      maximumAmount?: number | string;
      maximumCount?: number;
      minimumSumAmount?: number | string;
      includeTokens?: boolean;
      tokensOnly?: boolean;
    }
  ];
  response: ListUnspentItem[];
}

export interface ListUnspentItem {
  txid: string;
  vout: number;
  address: string;
  label: string;
  scriptPubKey: string;
  amount: number;
  tokenData?: TokenData;
  confirmations: number;
  redeemScript: string;
  spendable: boolean;
  solvable: boolean;
  safe: boolean;
}

export interface ListWallets {
  method: 'importaddress';
  params: [];
  response: string[];
}

export interface SendMany {
  method: 'sendmany';
  params: [
    dummy: string,
    amounts: {
      [address: string]: number | string
    },
    minconf?: number,
    comment?: string,
    subtractfeefrom?: string[],
    coinsel?: number,
    include_unsafe?: boolean
  ];
  response: string;
}

export interface SendToAddress {
  method: 'sendtoaddress';
  params: [
    address: string,
    amount: number | string,
    comment?: string,
    comment_to?: string,
    subtractfeefromamount?: boolean,
    coinsel?: number,
    include_unsafe?: boolean
  ];
  response: string;
}

export interface SignMessage {
  method: 'signmessage';
  params: [
    address: string,
    message: string
  ];
  response: string;
}

export interface SignRawTransactionWithWallet {
  method: 'signrawtransactionwithwallet';
  params: [
    hexstring: string,
    prevtxs?: {
      txid: string;
      vout: number;
      scriptPubKey: string;
      redeemScript?: string;
      amount: number | string;
      tokenData?: TokenData
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

export interface WalletProcessPsbt {
  method: 'walletprocesspsbt';
  params: [
    psbt: string,
    sign?: boolean,
    sighashtype?: string,
    bip32derivs?: boolean
  ];
  response: {
    psbt: string;
    complete: boolean;
  };
}
