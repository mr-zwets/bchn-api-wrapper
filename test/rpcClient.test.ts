import { BchnRpcClient, type GetBestBlockHash, type GetBlockCount, type GetBlockHash, type RpcClientConfig } from '../src/index.js';

const localhostUrl = 'http://localhost:8332';
const testRpcUser = 'rpcUser';
const testRpcPassword = 'rpcPassword';

describe('BchnRpcClient should have the correct constructor arguments', () => {
  it('should create an instance with a valid URL', () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword
    }
    const client = new BchnRpcClient(config);
    expect(client).toBeInstanceOf(BchnRpcClient);
  });

  it('should throw an error for an invalid URL', () => {
    const config = {
      url: 'invalid-url',
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword
    }
    expect(() => new BchnRpcClient(config)).toThrow('Invalid URL');
  });

  it('should throw an error if the URL is empty', () => {
    const config = {
      url: '',
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword
    }
    expect(() => new BchnRpcClient(config)).toThrow('URL is required');
  });

  it('should throw an error if the URL is missing', () => {
    const config = {
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Invalid configuration: Either provide the url or protocol/host/port');
  });

  it('should throw an error if rpcUser is missing', () => {
    const config = {
      url: localhostUrl,
      rpcPassword: testRpcPassword
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Need to provide rpcUser in config');
  });

  it('should throw an error if rpcPassword is missing', () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Need to provide rpcPassword in config');
  });
});

describe('BchnRpcClient Timeout and Retry Handling', () => {
  it('should throw a timeout error if the request exceeds the timeout limit', async () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword,
      timeoutMs: 1000,
    }
    const rpcClient = new BchnRpcClient(config);

    await expect(rpcClient.request("getbestblockhash")).rejects.toThrow('Request failed after 1 attempts: The operation was aborted due to timeout');
  });

  it('should not return a timeout error if the request completes in time', async () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword,
      timeoutMs: 1000,
    }
    const rpcClient = new BchnRpcClient(config);

    await expect(rpcClient.request<GetBlockCount>("getblockcount")).resolves.toEqual({});
  });

  it('should return an RetryLimitExceededError if all retries fail', async () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword,
      maxRetries: 3,
      timeoutMs: 1000,
    }
    const rpcClient = new BchnRpcClient(config);
    await expect(rpcClient.request<GetBestBlockHash>("getbestblockhash")).rejects.toThrow("Request failed after 4 attempts: The operation was aborted due to timeout");
  });
});

describe('BchnRpcClient Handling of Parameters', () => {
  it('should error with incorrect number of params', async () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword,
    }
    const rpcClient = new BchnRpcClient(config);
    await expect(rpcClient.request("getblockhash")).rejects.toThrow("Request failed after 1 attempts: Error: Invalid Request");
  })

  it('should not error with correct number of params', async () => {
    const config = {
      url: localhostUrl,
      rpcUser: testRpcUser,
      rpcPassword: testRpcPassword,
    }
    const rpcClient = new BchnRpcClient(config);
    await expect(rpcClient.request<GetBlockHash>("getblockhash", 5)).resolves.toEqual({});
  })
})
