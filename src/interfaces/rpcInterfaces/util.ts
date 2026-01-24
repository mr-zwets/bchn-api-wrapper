/* --- Util Commands --- */
// progress 5/5

/** Creates a multisig address (without adding to wallet). */
export interface CreateMultisig {
  method: 'createmultisig';
  params: [
    nrequired: number,
    keys: string[]
  ];
  response: {
    address: string;
    redeemScript: string;
  };
}

/** Returns estimated fee rate in BCH/kB. */
export interface EstimateFee {
  method: 'estimatefee';
  params: [];
  response: number;
}

/** Signs a message with a private key (returns base64 signature). */
export interface SignMessageWithPrivKey {
  method: 'signmessagewithprivkey';
  params: [
    privkey: string,
    message: string
  ];
  response: string;
}

/** Validates a Bitcoin Cash address. */
export interface ValidateAddress {
  method: 'validateaddress';
  params: [string];
  response: {
    isvalid: boolean;
    address: string;
    scriptPubKey?: string;
    isscript: boolean;
    istokenaware: boolean;
  };
}

/** Verifies a signed message. */
export interface VerifyMessage {
  method: 'verifymessage';
  params: [
    address:string,
    signature: string,
    message:string
  ];
  response: boolean;
}
