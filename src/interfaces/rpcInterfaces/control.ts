/* --- Control Commands --- */
// progress 6/6

/** Returns memory usage information. */
export interface GetMemoryInfo {
  method: 'getmemoryinfo';
  params: [
    mode?: 'stats' | 'mallocinfo'
  ];
  response: {
    locked: {
      used: number;
      free: number;
      total: number;
      locked: number;
      chunks_used: number;
      chunks_free: number;
    };
  };
}

/** Returns details about the RPC server. */
export interface GetRpcInfo {
  method: 'getrpcinfo';
  params: [];
  response: {
    active_commands: {
      method: string;
      duration: number;
    }[];
    logpath: string;
  };
}

/** Returns help text for RPC commands. */
export interface Help {
  method: 'help';
  params: [
    command?: string
  ];
  response: string;
}

/** Gets or sets logging categories. */
export interface Logging {
  method: 'logging';
  params: [
    include_category?: string[],
    exclude_category?: string[]
  ];
  response: {
    [category: string]: boolean;
  };
}

/** Stops the BCHN server. */
export interface Stop {
  method: 'stop';
  params: [];
  response: string;
}

/** Returns server uptime in seconds. */
export interface Uptime {
  method: 'uptime';
  params: [];
  response: number;
}
