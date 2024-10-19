/* --- Blockchain Commands --- */
// progress 2/33

export interface GetBlockCount {
  method: 'getblockcount';
  params: [];
  response: number;
}

// TODO: type verbose result
export interface GetBlock {
  method: 'getblock';
  params: [
    blockhash: string,
    verbosity?: number
  ];
  response: string | any;
}