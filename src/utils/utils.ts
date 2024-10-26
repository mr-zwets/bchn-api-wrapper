import type {
  RpcClientConfig,
  RpcClientUrlConfig,
  RpcClientHostConfig,
} from "../interfaces/interfaces.js";

export function getRandomId(): number {
  return Math.floor(Math.random() * 100000);
}

// A utility function to validate and construct the URL from the RpcClientConfig object
export function validateAndConstructUrl(config: RpcClientConfig): string {
  let url: string
  if (isUrlConfig(config)) {
    url = validateUrl(config.url)
  } else if (isHostConfig(config)) {
    const { protocol, host, port } = config;
    if (protocol !== 'http' && protocol !== 'https') {
      throw new Error("Protocol should be 'http' or 'https'");
    }
    url = validateUrl(`${protocol}://${host}:${port}`)
  } else {
    throw new Error('Invalid configuration: Either provide the url or protocol/host/port');
  }
  return url
}

// A utility function to validate a URL
export function validateUrl(url: string) {
  if(!url) throw new Error('URL is required');
  try {
    new URL(url);
  } catch (err) {
    throw new Error('Invalid URL format');
  }
  return url
}

// Type guard to check if the config is RpcClientUrlConfig
function isUrlConfig(config: RpcClientConfig): config is RpcClientUrlConfig {
  return 'url' in config;
}

// Type guard to check if the config is RpcClientHostConfig
function isHostConfig(config: RpcClientConfig): config is RpcClientHostConfig {
  return 'protocol' in config && 'hostname' in config && 'port' in config;
}

export enum BchnNetworkPort {
  Mainnet = 8332,
  Testnet = 18332,
  Testnet4 = 28332,
  Scalenet = 38332,
  Regtest = 18443
}
