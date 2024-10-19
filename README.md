## BCHN-API-Wrapper 

This library is a Typescript wrapper for interacting with the Bitcoin Cash Node (BCHN) RPC and REST interfaces. 

### Features

The library is a wrapper for using both the REST and RPC endpoints of BCHN in a type-safe way.

The library is easy to get started with.

The library is actively maintained and has no dependencies.

### Details

The `BchnRestClient` uses a class with unqiue methods for each of the endpoints.

The `BchnRpcClient` uses a request function which uses generics to type arguments and responses.

### Install

```
yarn add 
```

### REST Example
```ts
import { BchnRestClient } from 'bchn-api-wrapper'

const restClient = new BchnRestClient("http://localhost:8332")
const mempoolInfo = await restClient.getMempoolInfo()
console.log(`mempool size is currently ${mempoolInfo.bytes}`)
```


### RPC Example

```ts
import { BchnRpcClient, RpcClientConfig, GetBlockCount } from 'bchn-api-wrapper'

// Instead of the url it's also possible to privide the protocol, host and port separately
// See the interface for more configuarables (logger, timeoutMs, retryDelayMs, maxRetries)
const clientOptions: RpcClientConfig = {
  url: "http://localhost:8332",
  rpcUser: "rpcUser",
  rpcPassword: "rpcPassword"
}

const rpcClient = new BchnRpcClient(clientOptions)
// Find the full list of RPC commands on https://docs.bitcoincashnode.org/doc/json-rpc/
const blockHeight = await rpcClient.request<GetBlockCount>("getblockcount")

console.log(`The current blockHeight is ${blockHeight}`)
```
