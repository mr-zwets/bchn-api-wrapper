/* --- Wallet Commands --- */
// progress 7/53

import { TokenData } from "../interfaces";

export interface DumpPrivKey {
  method: 'dumpprivkey';
  params: [
    address: string,
  ];
  response: string;
}

export interface GetNewAddress {
  method: 'getnewaddress';
  params: [
    label?: string,
  ];
  response: string;
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
