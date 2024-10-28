import { http, delay, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

type jsonResult = { method: string; params?: unknown[] } | null | undefined

const server: SetupServerApi = setupServer(
  // Mock endpoint with a delay to simulate timeout
  http.get('http://localhost:8332/rest/chaininfo.json', async() => {
    // Introduce a delay longer than the timeout setting to simulate a timeout scenario
    await delay(3000)
    return HttpResponse.json({})
  }),

  http.get('http://localhost:8332/rest/mempool/info.json', async() => {
    // Mock normally working REST endpoint
    await delay(500)
    return HttpResponse.json({})
  }),

  http.post('http://localhost:8332', async ({ request }) => {
    const json = await request.json() as jsonResult;

    if (json === null || json === undefined) {
      throw new Error('Invalid JSON response');
    }    

    // Introduce a delay longer than the timeout setting to simulate a timeout scenario
    if (json.method === 'getbestblockhash') {
      await delay(3000)
      return HttpResponse.json({"jsonrpc": "2.0", "result": {}, "id": 4})
    }

    if (json.method === 'getblockcount') {
      // Mock normally working RPC command
      await delay(500)
      return HttpResponse.json({"jsonrpc": "2.0", "result": {}, "id": 5})
    }

    if (json.method === 'getblockhash') {
      // Mock normally working RPC command
      await delay(500)
      if (json.params?.[0]) {
        return HttpResponse.json({"jsonrpc": "2.0", "result": {}, "id": 6})
      } else {
        return HttpResponse.json({"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": 7})
      }
    }
  })
);

// Start the server before tests and reset handlers after each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
