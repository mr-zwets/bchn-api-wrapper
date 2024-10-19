import { formatOptions, ResponseType } from "./interfaces/interfaces";
import { ChainInfo, MempoolContent, MempoolInfo, TxDetails } from "./interfaces/restInterfaces/interfaces";

export class BchnRestClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetchFromNode<T, TFormat extends formatOptions>(
    endpoint: string,
    format: TFormat
  ): Promise<ResponseType<TFormat, T>> {
    const response = await fetch(`${this.baseUrl}/rest/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`);
    }
    
    if (format === 'json') {
      return await response.json() as ResponseType<TFormat, T>;
    } else {
      return await response.text() as ResponseType<TFormat, T>;  // For 'bin' and 'hex', return raw text
    }
  }

  // Get transaction details by transaction hash
  async getTransaction<TFormat extends formatOptions = 'json'>(
    txid: string, format:TFormat = 'json' as TFormat
  ) {
    return this.fetchFromNode<TxDetails, TFormat>(`tx/${txid}.${format}`, format);
  }

  // Get block details by block hash
  async getBlock<TFormat extends formatOptions = 'json'>(
    blockhash: string, includeTxDetails: boolean, format:TFormat = 'json' as TFormat
  ) {
    const path = includeTxDetails ? 'block' : 'block/notxdetails'
    return this.fetchFromNode<object, TFormat>(`${path}/${blockhash}.${format}`, format);
  }

  // Get block headers starting from a specific block hash
  async getBlockHeaders<TFormat extends formatOptions = 'json'>(
    count: number, blockhash: string, format:TFormat = 'json' as TFormat
  ) {
    return this.fetchFromNode<object, TFormat>(`headers/${count}/${blockhash}.${format}`, format);
  }

  // Get chain info (chain state details)
  async getChainInfo() {
    return this.fetchFromNode<ChainInfo, 'json'>('chaininfo.json', 'json');
  }

  // Query UTXO set based on specific outpoints (txid and vout)
  async getUTXOs<TFormat extends formatOptions = 'json'>(
    checkmempool: boolean, outpoints: string[], format:TFormat = 'json' as TFormat
  ) {
    const endpoint = `getutxos/${checkmempool ? 'checkmempool' : 'nocheckmempool'}/${outpoints.join('/')}.${format}`;
    return this.fetchFromNode<any, TFormat>(endpoint, format);
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
