## BCHN RPC 

This library is a Typescript wrapper for interacting with the Bitcoin Cash Node (BCHN) RPC interface. 

### Features

The library uses modern Typescript to provide a generic request function with typed arguments and responses.

The library is easy to get started with.

The library is actively maintained and has no dependencies.

### Install

```
yarn add 
```

### Example

```ts
import { BchnRpcClient, RpcClientConfig, GetBlockCount } from 'bchn-rpc'

// Instead of the url it's also possible to privide the protocol, host and port separately
// See the interface for more configuarables (logger, timeoutMs, retryDelayMs, maxRetries)
const clientOptions: RpcClientConfig = {
  url: "http://localhost:8332",
  rpcUser: "rpcUser",
  rpcPassword: "rpcPassword"
}

const client = new BchnRpcClient(clientOptions);
const blockHeight = await client.request<GetBlockCount>("getblockcount")

console.log(`The current blockHeight is ${blockHeight}`)
```
