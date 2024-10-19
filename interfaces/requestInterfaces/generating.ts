/* --- Generating Commands --- */
// progress 2/2

export interface Generate {
  method: 'generate';
  params: [
    nblocks: number,
    maxtries?: number,
  ];
  response: string[];
}

export interface GenerateToAddress {
  method: 'generatetoaddress';
  params: [
    nblocks: number,
    address: string,
    maxtries?: number,
  ];
  response: string[];
}