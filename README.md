# BCHN-API-Wrapper 

This library is a Typescript wrapper for interacting with the Bitcoin Cash Node (BCHN) RPC and REST interfaces. 

## Features

The library is a wrapper for using both the REST and RPC endpoints of BCHN in a type-safe way.

The library is designed to be easy to use and get started with.

The library is actively maintained and has no dependencies.

## Details

The `BchnRestClient` uses a class with unique methods for each of the endpoints.

The `BchnRpcClient` uses a request function which uses generics to type arguments and responses.

## Configuration

To use the RPC and REST APIs on your BCHN node, you need to enable them in your node's configuration file.

<details>
  <summary>BCHN Configuration</summary>
  In the BCHN `.conf` file add the following settings:

  ```
    server=1
    rest=1
    rpcuser=rpcuser
    rpcpassword=rpcpassword
    rpcallowip=127.0.0.1
    rpcport=8332
  ```

  To learn more about the `.conf` settings, see the [official documentation](https://docs.bitcoincashnode.org/doc/bitcoin-conf/).
</details>

## Install

For now, you can clone the library locally.
This library will be published to NPM in the future when it is more mature.

## REST usage

The `BchnRestClient` is a wrapper over the 10 BCHN REST-endpoints. For the list of the 10 BCHN REST-endpoints see the [REST documentation](https://docs.bitcoincashnode.org/doc/REST-interface/).

### REST example

```ts
import { BchnRestClient } from 'bchn-api-wrapper'

// Instantiate the REST client to query your BCHN node
const restClient = new BchnRestClient("http://localhost:8332")

// Fetch mempool information and log the size
const mempoolInfo = await restClient.getMempoolInfo()
console.log(`mempool size is currently ${mempoolInfo.bytes} bytes`)
```

## RPC usage

The `BchnRpcClient` is a thin type-wrapper over the actual RPC endpoints, because of this you can always use all RPC functionality through the library. For a complete list of all BCHN RPC-endpoints see the [RPC documentation](https://docs.bitcoincashnode.org/doc/json-rpc/).

The library currently exports types for `21/137` RPC methods.

### RPC example

```ts
import { BchnRpcClient, RpcClientConfig, GetBestBlockHash, GetBlockVerbosity1 } from 'bchn-api-wrapper'

// Create the RpcClientConfig to configure the node-url and add authentication details
// See the interface for more configuarables (logger, timeoutMs, retryDelayMs, maxRetries)
const clientOptions: RpcClientConfig = {
  url: "http://localhost:8332",
  rpcUser: "rpcUser",
  rpcPassword: "rpcPassword"
}
// Instantiate the RPC client to query your BCHN node
const rpcClient = new BchnRpcClient(clientOptions)

// Get the latest blockhash
const latestBlockHash = await rpcClient.request<GetBestBlockHash>("getbestblockhash")
console.log(`The latest blockhash is ${latestBlockHash}`)

// Get verbosity1 info about the latest block contents
const fullBlockInfo = await rpcClient.request<GetBlockVerbosity1>("getblock", latestBlockHash, 1)
console.log(JSON.stringify(fullBlockInfo))
```
