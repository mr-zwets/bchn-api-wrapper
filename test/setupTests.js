import { http, delay, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
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
);

// Start the server before tests and reset handlers after each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
