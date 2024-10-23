# BCHN-API-Wrapper 

This library is a Typescript wrapper for interacting with the Bitcoin Cash Node (BCHN) RPC and REST interfaces. 

## Features

The library is a wrapper for using both the REST and RPC endpoints of BCHN in a type-safe way.

The library is designed to be easy to use and get started with.

The library is actively maintained and has no dependencies.

## Details

The `BchnRestClient` uses a class with unique methods for each of the endpoints.

The `BchnRpcClient` uses a request function which uses generics to type arguments and responses.

The **REST API** is ideal for **read-only** access to general blockchain information such as transactions, blocks, and UTXO data. In contrast, the **RPC API** allows for **full interaction** with the Bitcoin Cash node, including managing the built-in wallet, sending transactions, performing mining operations, and issuing control commands like pruning or stopping the node. While the REST API provides 10 endpoints, the RPC API offers a much broader set of 136 commands.

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

Note that the REST-endpoints can be made public, but the RPC-endpoints should never be made public. If you want to use the RPC-endpoints of your own node remotely, you need a secure connection using SSL/TLS to encrypt your communication and protect your credentials and data from being exposed. Additionally, ensure you have strong, unique RPC credentials (username and password) set in your node's configuration file.

## Install

For now, you can clone the library locally.
This library will be published to NPM in the future when it is more mature.

## REST usage

The `BchnRestClient` is a wrapper over the BCHN REST-endpoints. For the list of the 10 BCHN REST-endpoints see the [REST documentation](https://docs.bitcoincashnode.org/doc/REST-interface/).

The `RestClientConfig` object accepts optional parameters for `logger` & `timeoutMs`

### REST example

```ts
import { BchnRestClient, RestClientConfig } from 'bchn-api-wrapper'

// Create the RestClientConfig
const clientOptions: RestClientConfig = {
  url: "http://localhost:8332",
}
// Instantiate the REST client to query your BCHN node
const restClient = new BchnRestClient(clientOptions)

// Get the latest blockhash
const chainInfo = await restClient.getChainInfo()
const latestBlockHash = chainInfo.bestblockhash
console.log(`The latest blockhash is ${latestBlockHash}`)

// Get block info with includeTxDetails flag
const fullBlockInfo = await restClient.getBlock(latestBlockHash, true)
console.log(JSON.stringify(fullBlockInfo))
```

## RPC usage

The `BchnRpcClient` is a thin type-wrapper over the actual RPC endpoints, with request interfaces for each endpoint. For a complete list of all BCHN RPC-endpoints see the [RPC documentation](https://docs.bitcoincashnode.org/doc/json-rpc/).

The `RpcClientConfig` object accepts optional parameters for `logger`, `timeoutMs`, `retryDelayMs` & `maxRetries`

The library does not currently support making batched RPC requests.

### RPC example

```ts
import { BchnRpcClient, RpcClientConfig, GetBestBlockHash, GetBlockVerbosity1 } from 'bchn-api-wrapper'

// Create the RpcClientConfig
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
