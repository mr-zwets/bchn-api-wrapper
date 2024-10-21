/* --- Control Commands --- */
// progress 6/6

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

export interface Help {
  method: 'help';
  params: [
    command?: string
  ];
  response: string;
}

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

export interface Stop {
  method: 'stop';
  params: [];
  response: string;
}

export interface Uptime {
  method: 'uptime';
  params: [];
  response: number;
}