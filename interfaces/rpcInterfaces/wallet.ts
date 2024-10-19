/* --- Wallet Commands --- */
// progress 5/53

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

interface TokenData {
  category : string;
  amount: string;
  nft?: {
    capability: 'none' | 'mutable' | 'minting';
    commitment: string;
  }
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