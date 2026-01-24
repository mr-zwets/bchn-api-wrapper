/* --- Generating Commands --- */
// progress 2/2

/** Mines blocks to the wallet (regtest only). */
export interface Generate {
  method: 'generate';
  params: [
    nblocks: number,
    maxtries?: number,
  ];
  response: string[];
}

/** Mines blocks to a specified address (regtest only). */
export interface GenerateToAddress {
  method: 'generatetoaddress';
  params: [
    nblocks: number,
    address: string,
    maxtries?: number,
  ];
  response: string[];
}
