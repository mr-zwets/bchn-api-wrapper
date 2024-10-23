/* --- Wallet Commands --- */
// progress 52/52

import type { TokenData } from "../interfaces.js";

export interface AbandonTransaction {
  method: 'abandontransaction';
  params: [
    txid: string
  ];
  response: null;
}

export interface AbortRescan {
  method: 'abortrescan';
  params: [];
  response: null;
}

export interface AddMultisigAddress {
  method: 'addmultisigaddress';
  params: [
    nrequired: number,
    keys: string[],
    label?: string
  ];
  response: {
    address: string;
    redeemScript: string;
  };
}

export interface BackupWallet {
  method: 'backupwallet';
  params: [
    destination: string
  ];
  response: null;
}

export interface CreateWallet {
  method: 'createwallet';
  params: [
    wallet_name: string,
    disable_private_keys?: boolean,
    blank?: boolean
  ];
  response: {
    name: string;
    warning?: string;
  };
}

export interface DumpWallet {
  method: 'dumpwallet';
  params: [
    filename: string
  ];
  response: {
    filename: string;
  };
}

export interface DumpPrivKey {
  method: 'dumpprivkey';
  params: [
    address: string,
  ];
  response: string;
}

export interface EncryptWallet {
  method: 'encryptwallet';
  params: [
    passphrase: string
  ];
  response: string;
}

export interface GetAddressesByLabel {
  method: 'getaddressesbylabel';
  params: [
    label: string
  ];
  response: {
    [address: string]: {
      purpose: string;
    };
  };
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

export interface GetRawChangeAddress {
  method: 'getrawchangeaddress';
  params: [];
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

export interface GetReceivedByLabel {
  method: 'getreceivedbylabel';
  params: [
    label: string,
    minconf?: number
  ];
  response: number;
}

export interface GetTransaction {
  method: 'gettransaction';
  params: [
    txid: string,
    include_watchonly?: boolean
  ];
  response: {
    amount: number;
    fee?: number;
    confirmations: number;
    blockhash?: string;
    blockindex?: number;
    blocktime?: number;
    txid: string;
    time: number;
    timereceived: number;
    'bip125-replaceable': 'yes' | 'no' | 'unknown';
    details: {
      address: string;
      category: 'send' | 'receive';
      amount: number;
      label?: string;
      vout: number;
      fee?: number;
      abandoned?: boolean;
    }[];
    hex: string;
  };
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

export interface ImportMulti {
  method: 'importmulti';
  params: [
    requests: {
      scriptPubKey: string | { address: string };
      timestamp: number | 'now';
      redeemscript?: string;
      pubkeys?: string[];
      keys?: string[];
      internal?: boolean;
      watchonly?: boolean;
      label?: string;
    }[],
    options?: {
      rescan?: boolean;
    }
  ];
  response: {
    success: boolean;
    error?: {
      code: number;
      message: string;
    };
  }[];
}

export interface ImportPrivKey {
  method: 'importprivkey';
  params: [
    privkey: string,
    label?: string,
    rescan?: boolean
  ];
  response: null;
}

export interface ImportPrunedFunds {
  method: 'importprunedfunds';
  params: [
    rawtransaction: string,
    txoutproof: string
  ];
  response: null;
}

export interface ImportPubKey {
  method: 'importpubkey';
  params: [
    pubkey: string,
    label?: string,
    rescan?: boolean
  ];
  response: null;
}

export interface ImportWallet {
  method: 'importwallet';
  params: [
    filename: string
  ];
  response: null;
}

export interface KeyPoolRefill {
  method: 'keypoolrefill';
  params: [
    newsize?: number
  ];
  response: null;
}

export interface ListAddressGroupings {
  method: 'listaddressgroupings';
  params: [];
  response: [
    [
      {
        address: string;
        amount: number;
        label?: string;
      }[]
    ][]
  ];
}

export interface ListLabels {
  method: 'listlabels';
  params: [
    purpose?: string
  ];
  response: string[];
}

export interface ListLockUnspent {
  method: 'listlockunspent';
  params: [];
  response: {
    txid: string;
    vout: number;
  }[];
}

export interface ListReceivedByAddress {
  method: 'listreceivedbyaddress';
  params: [
    minconf?: number,
    include_empty?: boolean,
    include_watchonly?: boolean,
    address_filter?: string
  ];
  response: {
    involvesWatchonly?: boolean;
    address: string;
    amount: number;
    confirmations: number;
    label: string;
    txids: string[];
  }[];
}

export interface ListReceivedByLabel {
  method: 'listreceivedbylabel';
  params: [
    minconf?: number,
    include_empty?: boolean,
    include_watchonly?: boolean
  ];
  response: {
    involvesWatchonly?: boolean;
    amount: number;
    confirmations: number;
    label: string;
  }[];
}

interface TransactionWallet {
  address?: string;
  category: 'send' | 'receive';
  amount: number;
  vout: number;
  fee?: number;
  confirmations: number;
  blockhash?: string;
  blockindex?: number;
  blocktime?: number;
  txid: string;
  time: number;
  timereceived: number;
  abandoned?: boolean;
  comment?: string;
  label?: string;
  to?: string;
}

export interface ListSinceBlock {
  method: 'listsinceblock';
  params: [
    blockhash?: string,
    target_confirmations?: number,
    include_watchonly?: boolean,
    include_removed?: boolean
  ];
  response: {
    transactions: TransactionWallet[];
    removed?: TransactionWallet[];
    lastblock: string;
  };
}

export interface ListTransactions {
  method: 'listtransactions';
  params: [
    label?: string,
    count?: number,
    skip?: number,
    include_watchonly?: boolean
  ];
  response: TransactionWallet[];
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

export interface ListWalletDir {
  method: 'listwalletdir';
  params: [];
  response: {
    wallets: {
      name: string;
    }[];
  };
}

export interface ListWallets {
  method: 'importaddress';
  params: [];
  response: string[];
}

export interface LoadWallet {
  method: 'loadwallet';
  params: [
    filename: string
  ];
  response: {
    name: string;
    warning?: string;
  };
}

export interface LockUnspent {
  method: 'lockunspent';
  params: [
    unlock: boolean,
    transactions?: {
      txid: string;
      vout: number;
    }[]
  ];
  response: boolean;
}

export interface RemovePrunedFunds {
  method: 'removeprunedfunds';
  params: [
    txid: string
  ];
  response: null;
}

export interface RescanBlockchain {
  method: 'rescanblockchain';
  params: [
    start_height?: number,
    stop_height?: number
  ];
  response: {
    start_height: number;
    stop_height: number;
  };
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

export interface SetHdSeed {
  method: 'sethdseed';
  params: [
    newkeypool?: boolean,
    seed?: string
  ];
  response: null;
}

export interface SetLabel {
  method: 'setlabel';
  params: [
    address: string,
    label: string
  ];
  response: null;
}

export interface SetTxFee {
  method: 'settxfee';
  params: [
    amount: number | string
  ];
  response: boolean;
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

export interface UnloadWallet {
  method: 'unloadwallet';
  params: [
    wallet_name?: string
  ];
  response: null;
}

export interface WalletCreateFundedPsbt {
  method: 'walletcreatefundedpsbt';
  params: [
    inputs: {
      txid: string;
      vout: number;
      sequence: number;
    }[],
    outputs: {
      address?: number | string | {
        amount: number | string;
        tokenData?: TokenData;
      };
      data?: string | string[];
    }[],
    locktime?: number,
    options?: {
      include_unsafe?: boolean;
      changeAddress?: string;
      changePosition?: number;
      includeWatching?: boolean;
      lockUnspents?: boolean;
      feeRate?: number | string;
      subtractFeeFromOutputs?: number[];
    },
    bip32derivs?: boolean
  ];
  response: {
    psbt: string;
    fee: number;
    changepos: number;
  };
}

export interface WalletLock {
  method: 'walletlock';
  params: [];
  response: null;
}

export interface WalletPassphrase {
  method: 'walletpassphrase';
  params: [
    passphrase: string,
    timeout: number
  ];
  response: null;
}

export interface WalletPassphraseChange {
  method: 'walletpassphrasechange';
  params: [
    oldpassphrase: string,
    newpassphrase: string
  ];
  response: null;
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
