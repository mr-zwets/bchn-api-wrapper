/* --- Util Commands --- */
// progress 5/5

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

export interface EstimateFee {
  method: 'estimatefee';
  params: [];
  response: number;
}


export interface SignMessageWithPrivKey {
  method: 'signmessagewithprivkey';
  params: [
    privkey: string,
    message: string
  ];
  response: string; // The signature of the message encoded in base 64
}

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

export interface VerifyMessage {
  method: 'verifymessage';
  params: [
    address:string,
    signature: string,
    message:string
  ];
  response: boolean;
}
