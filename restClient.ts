import type { RestClientConfig, formatOptions, ResponseType } from "./interfaces/interfaces.js";
import type {
  BlockInfoNoTxDetails,
  BlockInfoTxDetails,
  ChainInfo,
  HeaderInfo,
  MempoolContent,
  MempoolInfo,
  TxDetails,
  UtxosInfo
} from "./interfaces/restInterfaces/interfaces.js";

export class BchnRestClient {
  private baseUrl: string;
  private timeoutMs: number;
  private logger: Console;

  constructor(config: RestClientConfig) {
    this.baseUrl = config.url;
    this.timeoutMs = config.timeoutMs ?? 5000;
    this.logger = config.logger ?? console;
  }

  private async fetchFromNode<T, TFormat extends formatOptions>(
    endpoint: string,
    format: TFormat
  ): Promise<ResponseType<TFormat, T>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await fetch(`${this.baseUrl}/rest/${endpoint}`, {
        signal: controller.signal,  // Attach the AbortController signal for timeout
      });
      
      clearTimeout(timeout);  // Clear the timeout if the request completes

      if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`);
      }
      
      if (format === 'json') {
        return await response.json() as ResponseType<TFormat, T>;
      } else {
        return await response.text() as ResponseType<TFormat, T>;  // For 'bin' and 'hex', return raw text
      }
    } catch(error) {
      clearTimeout(timeout);  // Clear timeout on error
      let errorMessage: string | undefined
      
      // Check if the error is due to timeout or other fetch-related issues
      if (typeof error === 'string') {
        errorMessage = error;
        this.logger.error(error);
      } else if (error instanceof Error) {
        // If error is an instance of Error, you can safely access its properties
        errorMessage = error.message;
        if (error.name === 'AbortError') {
          this.logger.error(`Request to ${endpoint} timed out after ${this.timeoutMs} ms`);
        } else {
          this.logger.error(`Request to ${endpoint} failed with error: ${error.message}`);
        }
      } else {
        this.logger.error(`Unknown error occurred during request to ${endpoint}`);
        throw new Error(`Unknown error: ${error}`);
      }
      
      // Always rethrow the error after logging
      throw new Error(errorMessage);
    }
  }

  // Get transaction details by transaction hash
  async getTransaction<TFormat extends formatOptions = 'json'>(
    txid: string, format:TFormat = 'json' as TFormat
  ) {
    return this.fetchFromNode<TxDetails, TFormat>(`tx/${txid}.${format}`, format);
  }

  // getBlock overload signatures 
  // This is needed so the getBlock return type can depend on the 'includeTxDetails' boolean flag
  async getBlock<TFormat extends formatOptions = 'json'>(
    blockhash: string, includeTxDetails: true, format?:TFormat
  ): Promise<TFormat extends 'json' ? BlockInfoTxDetails : string>;

  async getBlock<TFormat extends formatOptions = 'json'>(
    blockhash: string, includeTxDetails: false, format?:TFormat
  ): Promise<TFormat extends 'json' ? BlockInfoNoTxDetails : string>;

  // getBlock Implementation
  async getBlock<TFormat extends formatOptions = 'json'>(
    blockhash: string, includeTxDetails: boolean, format:TFormat = 'json' as TFormat
  ): Promise<any> {
    const path = includeTxDetails ? 'block' : 'block/notxdetails';
    return this.fetchFromNode(`${path}/${blockhash}.${format}`, format);
  }

  // Get block headers starting from a specific block hash
  async getBlockHeaders<TFormat extends formatOptions = 'json'>(
    count: number, blockhash: string, format:TFormat = 'json' as TFormat
  ) {
    return this.fetchFromNode<HeaderInfo, TFormat>(`headers/${count}/${blockhash}.${format}`, format);
  }

  // Get chain info (chain state details)
  async getChainInfo() {
    return this.fetchFromNode<ChainInfo, 'json'>('chaininfo.json', 'json');
  }

  // Query UTXO set based on specific outpoints (txid and vout)
  async getUTXOs<TFormat extends formatOptions = 'json'>(
    checkmempool: boolean, outpoints: string[], format:TFormat = 'json' as TFormat
  ) {
    const path = (checkmempool ? 'checkmempool/' : '') + outpoints.join('/');
    const endpoint = `getutxos/${path}.${format}`;
    return this.fetchFromNode<UtxosInfo, TFormat>(endpoint, format);
  }

  // Get mempool information (basic)
  async getMempoolInfo() {
    return this.fetchFromNode<MempoolInfo, 'json'>('mempool/info.json', 'json');
  }

  // Get mempool contents (transactions currently in the mempool)
  async getMempoolContents() {
    return this.fetchFromNode<MempoolContent, 'json'>('mempool/contents.json', 'json');
  }
}
