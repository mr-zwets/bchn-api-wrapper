import type { formatOptions, ResponseType } from "./interfaces/interfaces.js";
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
