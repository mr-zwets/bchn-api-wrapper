import { BchnRestClient } from '../src/index.js';

describe('BchnRestClient URL validation tests', () => {
  it('should create an instance with a valid URL', () => {
    const client = new BchnRestClient({url: 'http://localhost:8332'});
    expect(client).toBeInstanceOf(BchnRestClient);
  });

  it('should throw an error for an invalid URL', () => {
    expect(() => new BchnRestClient({url: 'invalid-url'})).toThrow('Invalid URL');
  });

  it('should throw an error if the URL is missing', () => {
    expect(() => new BchnRestClient({url: ''})).toThrow('URL is required');
  });
});

describe('BchnRestClient Timeout Handling', () => {
  const config = {
    url: 'http://localhost:8332',
    timeoutMs: 1000, // 1 second timeout
  };
  const restClient = new BchnRestClient(config);

  it('should throw a timeout error if the request exceeds the timeout limit', async () => {
    await expect(restClient.getChainInfo()).rejects.toThrow('Request timed out');
  });

  it('should not return a timeout error if the request completes in time', async () => {
    await expect(restClient.getMempoolInfo()).resolves.toEqual({});
  });
});