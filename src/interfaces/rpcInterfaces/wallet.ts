/* --- Wallet Commands --- */
// progress 52/52

import type { TokenData } from "../interfaces.js";

/** Marks an in-wallet transaction as abandoned (only works on unconfirmed tx). */
export interface AbandonTransaction {
  method: 'abandontransaction';
  params: [
    txid: string
  ];
  response: null;
}

/** Stops current wallet rescan. */
export interface AbortRescan {
  method: 'abortrescan';
  params: [];
  response: null;
}

/** Adds a multisig address to the wallet. */
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

/** Backs up wallet to specified file. */
export interface BackupWallet {
  method: 'backupwallet';
  params: [
    destination: string
  ];
  response: null;
}

/** Creates a new wallet. */
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

/** Dumps all wallet keys to a file. */
export interface DumpWallet {
  method: 'dumpwallet';
  params: [
    filename: string
  ];
  response: {
    filename: string;
  };
}

/** Returns private key for an address. */
export interface DumpPrivKey {
  method: 'dumpprivkey';
  params: [
    address: string,
  ];
  response: string;
}

/** Encrypts wallet with passphrase (requires restart). */
export interface EncryptWallet {
  method: 'encryptwallet';
  params: [
    passphrase: string
  ];
  response: string;
}

/** Returns addresses assigned to a label. */
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

/** Returns detailed information about an address. */
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

/** Returns wallet balance. */
export interface GetBalance {
  method: 'getbalance';
  params: [
    dummy?: string,
    minconf?: number,
    include_watchonly?: boolean
  ];
  response: number;
}

/** Generates a new address for receiving payments. */
export interface GetNewAddress {
  method: 'getnewaddress';
  params: [
    label?: string,
  ];
  response: string;
}

/** Returns a new address for receiving change. */
export interface GetRawChangeAddress {
  method: 'getrawchangeaddress';
  params: [];
  response: string;
}

/** Returns total amount received by an address. */
export interface GetReceivedByAddress {
  method: 'getreceivedbyaddress';
  params: [
    address: string,
    minconf?: number
  ];
  response: number;
}

/** Returns total amount received by addresses with a label. */
export interface GetReceivedByLabel {
  method: 'getreceivedbylabel';
  params: [
    label: string,
    minconf?: number
  ];
  response: number;
}

/** Returns detailed information about an in-wallet transaction. */
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

/** Returns unconfirmed balance. */
export interface GetUnconfirmedBalance {
  method: 'getunconfirmedbalance';
  params: [];
  response: number;
}

/** Returns wallet state info. */
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

/** Imports an address or script for watching (without private key). */
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

/** Imports multiple addresses/scripts/keys. */
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

/** Imports a private key. */
export interface ImportPrivKey {
  method: 'importprivkey';
  params: [
    privkey: string,
    label?: string,
    rescan?: boolean
  ];
  response: null;
}

/** Imports funds without rescan (requires merkle proof). */
export interface ImportPrunedFunds {
  method: 'importprunedfunds';
  params: [
    rawtransaction: string,
    txoutproof: string
  ];
  response: null;
}

/** Imports a public key for watching. */
export interface ImportPubKey {
  method: 'importpubkey';
  params: [
    pubkey: string,
    label?: string,
    rescan?: boolean
  ];
  response: null;
}

/** Imports keys from a wallet dump file. */
export interface ImportWallet {
  method: 'importwallet';
  params: [
    filename: string
  ];
  response: null;
}

/** Refills the keypool. */
export interface KeyPoolRefill {
  method: 'keypoolrefill';
  params: [
    newsize?: number
  ];
  response: null;
}

/** Returns addresses grouped by common ownership. */
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

/** Returns all labels in the wallet. */
export interface ListLabels {
  method: 'listlabels';
  params: [
    purpose?: string
  ];
  response: string[];
}

/** Returns list of locked unspent outputs. */
export interface ListLockUnspent {
  method: 'listlockunspent';
  params: [];
  response: {
    txid: string;
    vout: number;
  }[];
}

/** Lists transactions received by address. */
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

/** Lists transactions received by label. */
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

/** Wallet transaction representation. */
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

/** Returns transactions since a block. */
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

/** Returns recent transactions for the wallet. */
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

/** Returns unspent outputs in the wallet. */
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

/** Single UTXO from listunspent. */
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

/** Returns list of available wallets. */
export interface ListWalletDir {
  method: 'listwalletdir';
  params: [];
  response: {
    wallets: {
      name: string;
    }[];
  };
}

/** Returns list of loaded wallets. */
export interface ListWallets {
  method: 'importaddress';
  params: [];
  response: string[];
}

/** Loads a wallet from file. */
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

/** Locks or unlocks unspent outputs. */
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

/** Removes imported pruned funds from wallet. */
export interface RemovePrunedFunds {
  method: 'removeprunedfunds';
  params: [
    txid: string
  ];
  response: null;
}

/** Rescans blockchain for wallet transactions. */
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

/** Sends to multiple recipients. */
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

/** Sends to a single address. */
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

/** Sets the HD seed for the wallet. */
export interface SetHdSeed {
  method: 'sethdseed';
  params: [
    newkeypool?: boolean,
    seed?: string
  ];
  response: null;
}

/** Sets the label for an address. */
export interface SetLabel {
  method: 'setlabel';
  params: [
    address: string,
    label: string
  ];
  response: null;
}

/** Sets the transaction fee per kB. */
export interface SetTxFee {
  method: 'settxfee';
  params: [
    amount: number | string
  ];
  response: boolean;
}

/** Signs a message with an address's private key. */
export interface SignMessage {
  method: 'signmessage';
  params: [
    address: string,
    message: string
  ];
  response: string;
}

/** Signs a raw transaction with wallet keys. */
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

/** Unloads a wallet. */
export interface UnloadWallet {
  method: 'unloadwallet';
  params: [
    wallet_name?: string
  ];
  response: null;
}

/** Creates and funds a PSBT. */
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

/** Locks the encrypted wallet. */
export interface WalletLock {
  method: 'walletlock';
  params: [];
  response: null;
}

/** Unlocks the wallet for a specified time. */
export interface WalletPassphrase {
  method: 'walletpassphrase';
  params: [
    passphrase: string,
    timeout: number
  ];
  response: null;
}

/** Changes the wallet passphrase. */
export interface WalletPassphraseChange {
  method: 'walletpassphrasechange';
  params: [
    oldpassphrase: string,
    newpassphrase: string
  ];
  response: null;
}

/** Processes a PSBT with wallet data. */
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
