/* --- Rawtransactions Commands --- */
// progress 2/14

// TODO: type verbose result
export interface GetRawTransaction {
  method: 'getrawtransaction';
  params: [
    txid: string,
    verbose?: boolean | number,
    blockhash?: string
  ];
  response: string | any;
}

export interface SendRawTransaction {
  method: 'sendrawtransaction';
  params: [
    hexstring: string,
    allowhighfees?: boolean
  ];
  response: string;
}