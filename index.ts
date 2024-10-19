import { RpcClientConfig, RpcRequest } from "./interfaces/interfaces";
import { getRandomId, validateAndConstructUrl } from "./utils/utils";
import { RetryLimitExceededError } from "./utils/errors";

export * from './interfaces/interfaces.ts'
export * from './interfaces/requestInterfaces/index.ts'

export class BchnRpcClient {
  private url: string
  private rpcUser: string
  private rpcPassword: string
  
  private maxRetries: number // number of retries before throwing an exception
  private retryDelayMs: number // delay between each retry
  private logger: typeof console // logger
  private timeoutMs: number // max timeout for each retry

  constructor(config: RpcClientConfig){
    this.url = validateAndConstructUrl(config)
    if(!config.rpcUser) throw new Error('Need to provide rpcUser in config')
    if(!config.rpcPassword) throw new Error('Need to provide rpcPassword in config')
    this.rpcUser = config.rpcUser;       
    this.rpcPassword= config.rpcPassword;  

    // optional config
    this.maxRetries = config.maxRetries ?? 0;       
    this.retryDelayMs= config.retryDelayMs ?? 100;  
    this.logger = config.logger ?? console;         
    this.timeoutMs = config.timeoutMs ?? 5000;      
  }

  async request<T extends RpcRequest>(
    endpoint: T['method'],
    ...params: T['params']
  ): Promise<T['response']> {
    const auth = Buffer.from(`${this.rpcUser}:${this.rpcPassword}`).toString('base64');
    
    // Retry logic
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
  
      try {
        // Send the request with a timeout and retries
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
          },
          body: JSON.stringify({ jsonrpc: '2.0', method: endpoint, params, id: getRandomId() }),
          signal: controller.signal,  // Attach the AbortController signal for timeout
        });
  
        clearTimeout(timeout);  // Clear the timeout if the request completes
  
        const result = await response.json();
  
        // Handle response errors
        if (!response.ok || result.error) {
          throw new Error(`Error: ${result.error?.message || response.statusText}`);
        }
  
        return result.result as T['response'];  // Return the result if successful
  
      } catch (error) {
        clearTimeout(timeout);  // Clear timeout on error
  
        // Check if the error is due to timeout or other fetch-related issues
        if (error.name === 'AbortError') {
          this.logger.error(`Request timed out after ${this.timeoutMs} ms`);
        } else {
          this.logger.error(`Request failed with error: ${error.message}`);
        }
  
        // Retry if allowed
        if (attempt < this.maxRetries) {
          this.logger.warn(`Retrying request... (${attempt + 1}/${this.maxRetries})`);
          await new Promise(res => setTimeout(res, this.retryDelayMs));  // Wait before retrying
        } else {
          // If no retries are left, throw the final error
          throw new RetryLimitExceededError(`Request failed after ${this.maxRetries + 1} attempts: ${error.message}`);
        }
      }
    }
  
    // This line ensures TypeScript is satisfied that a value will always be returned, but
    // it should never be reached if the retries fail, as the last attempt should throw an error.
    throw new Error('Request failed unexpectedly');
  }
}
