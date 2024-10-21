/* --- Network Commands --- */
// progress 2/14

export interface GetConnectionCount {
  method: 'getconnectioncount';
  params: [];
  response: number
}

export interface GetNetworkInfo {
  method: 'getnetworkinfo';
  params: [];
  response: {
    version: number;
    subversion: string;
    protocolversion: number;
    localservices: string;
    localrelay: boolean;
    timeoffset: number;
    connections: number;
    networkactive: boolean;
    networks: {
      name: string;
      limited: boolean;
      reachable: boolean;
      proxy: string;
      proxy_randomize_credentials: boolean;
    }[];
    relayfee: number;
    excessutxocharge: number;
    localaddresses: {
      address: string;
      port: number;
      score: number;
    }[]
    warnings: string;
  }
}
