/* --- Network Commands --- */
// progress 14/14

export interface AddNode {
  method: 'addnode';
  params: [
    node: string,
    command: 'add' | 'remove' | 'onetry'
  ];
  response: null;
}

export interface ClearBanned {
  method: 'clearbanned';
  params: [
    manual?: boolean,
    automatic?: boolean
  ];
  response: null;
}

export interface DisconnectNode {
  method: 'disconnectnode';
  params: [
    address?: string,
    nodeid?: number
  ];
  response: null;
}

export interface GetAddedNodeInfo {
  method: 'getaddednodeinfo';
  params: [
    node?: string
  ];
  response: {
    addednode: string;
    connected: boolean;
    addresses?: {
      address: string;
      connected: string;
    }[];
  }[];
}

export interface GetConnectionCount {
  method: 'getconnectioncount';
  params: [];
  response: number
}

export interface GetExcessiveBlock {
  method: 'getexcessiveblock';
  params: [];
  response: number;
}

export interface GetNetTotals {
  method: 'getnettotals';
  params: [];
  response: {
    totalbytesrecv: number;
    totalbytessent: number;
    timemillis: number;
    uploadtarget: {
      timeframe: number;
      target: number;
      target_reached: boolean;
      serve_historical_blocks: boolean;
      bytes_left_in_cycle: number;
      time_left_in_cycle: number;
    };
  };
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

export interface GetNodeAddresses {
  method: 'getnodeaddresses';
  params: [
    count?: number
  ];
  response: {
    time: number;
    services: number;
    address: string;
    port: number;
  }[];
}

export interface GetPeerInfo {
  method: 'getpeerinfo';
  params: [];
  response: {
    id: number;
    addr: string;
    addrbind: string;
    addrlocal: string;
    mapped_as: string;
    services: string;
    relaytxes: boolean;
    lastsend: number;
    lastrecv: number;
    bytessent: number;
    bytesrecv: number;
    conntime: number;
    timeoffset: number;
    pingtime: number;
    minping: number;
    pingwait: number;
    version: number;
    subver: string;
    inbound: boolean;
    addnode: boolean;
    startingheight: number;
    banscore: number;
    synced_headers: number;
    synced_blocks: number;
    inflight: number[];
    addr_processed: number;
    addr_rate_limited: number;
    whitelisted: boolean;
    minfeefilter: number;
    bytessent_per_msg: {
      [msg: string]: number;
    };
    bytesrecv_per_msg: {
      [msg: string]: number;
    };
  }[];
}

export interface ListBanned {
  method: 'listbanned';
  params: [];
  response: {
    address: string;
    banned_until: number;
    ban_created: number;
    ban_reason: string;
  }[];
}

export interface Ping {
  method: 'ping';
  params: [];
  response: null;
}

export interface SetBan {
  method: 'setban';
  params: [
    subnet: string,
    command: 'add' | 'remove',
    bantime?: number,
    absolute?: boolean
  ];
  response: null;
}

export interface SetNetworkActive {
  method: 'setnetworkactive';
  params: [
    state: boolean
  ];
  response: null;
}
