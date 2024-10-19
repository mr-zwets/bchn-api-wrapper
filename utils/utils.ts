import {
  RpcClientConfig,
  RpcClientUrlConfig,
  RpcClientHostConfig,
} from "../interfaces/interfaces";

export function getRandomId(): number {
  return Math.floor(Math.random() * 100000);
}

// A utility function to validate and construct the URL from the config object
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
    throw new Error('Invalid configuration: Missing required fields for URL or protocol/host/port setup');
  }
  return url
}

// A utility function to validate a URL
export function validateUrl(url: string) {
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
