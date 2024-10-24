import { BchnRpcClient, type RpcClientConfig } from '../src/index.js';

describe('BchnRpcClient should have the correct constructor arguments', () => {
  it('should create an instance with a valid URL', () => {
    const config = {
      url: 'http://localhost:8332',
      rpcUser: 'rpcUser',
      rpcPassword: 'rpcPassword'
    }
    const client = new BchnRpcClient(config);
    expect(client).toBeInstanceOf(BchnRpcClient);
  });

  it('should throw an error for an invalid URL', () => {
    const config = {
      url: 'invalid-url',
      rpcUser: 'rpcUser',
      rpcPassword: 'rpcPassword'
    }
    expect(() => new BchnRpcClient(config)).toThrow('Invalid URL');
  });

  it('should throw an error if the URL is empty', () => {
    const config = {
      url: '',
      rpcUser: 'rpcUser',
      rpcPassword: 'rpcPassword'
    }
    expect(() => new BchnRpcClient(config)).toThrow('URL is required');
  });

  it('should throw an error if the URL is missing', () => {
    const config = {
      rpcUser: 'rpcUser',
      rpcPassword: 'rpcPassword'
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Invalid configuration: Either provide the url or protocol/host/port');
  });

  it('should throw an error if rpcUser is missing', () => {
    const config = {
      url: 'http://localhost:8332',
      rpcPassword: 'rpcPassword'
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Need to provide rpcUser in config');
  });

  it('should throw an error if rpcPassword is missing', () => {
    const config = {
      url: 'http://localhost:8332',
      rpcUser: 'rpcUser'
    } as RpcClientConfig
    expect(() => new BchnRpcClient(config)).toThrow('Need to provide rpcPassword in config');
  });
});