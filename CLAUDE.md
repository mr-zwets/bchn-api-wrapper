# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands

```bash
pnpm build          # Compile TypeScript to dist/
pnpm test           # Run all tests with Vitest
pnpm test <file>    # Run a specific test file
```

## Architecture

TypeScript library providing type-safe wrappers for Bitcoin Cash Node (BCHN) JSON-RPC and REST interfaces. Types compatible with **BCHN v29.0.0**. Zero runtime dependencies.

### Two Client Classes

**BchnRestClient** (`src/restClient.ts`)
- Wraps 11 REST endpoints for read-only blockchain access-
- Class with dedicated methods for each endpoint
- Supports format options (`json`, `hex`, `bin`) via conditional return types
- Uses function overloads for type-safe returns based on parameters (e.g., `getBlock` with `includeTxDetails`)

**BchnRpcClient** (`src/rpcClient.ts`)
- Wraps 136 RPC commands for full node interaction
- Single generic `request<T extends RpcRequest>()` method
- Type safety achieved through discriminated union interfaces
- Each RPC command interface defines: `method`, `params[]`, and `response` type

### Interface Organization

```
src/interfaces/
├── interfaces.ts              # Config types, RpcRequest base, shared types
├── restInterfaces/            # REST response types
└── rpcInterfaces/             # 136 RPC command interfaces across 9 files
    ├── blockchain.ts          # 33 commands
    ├── wallet.ts              # 52 commands
    ├── rawtransactions.ts
    ├── network.ts             # 14 commands
    ├── mining.ts
    ├── control.ts             # 6 commands
    ├── util.ts
    ├── generating.ts
    └── zmq.ts
```

### RPC Type Pattern

RPC interfaces follow this pattern for full type inference:

```typescript
export interface GetBlockVerbosity1 extends GetBlockBase {
  params: [blockhash: string, verbosity?: 1 | true];
  response: { hash: string; /* ... */ };
}

// Usage - params and response are fully typed:
const result = await rpcClient.request<GetBlockVerbosity1>("getblock", hash, 1);
```

### Configuration Types

- `RpcClientConfig`: Supports URL-based (`{url, rpcUser, rpcPassword}`) or host-based (`{protocol, host, port, rpcUser, rpcPassword}`) configuration
- `RestClientConfig`: Requires `url`, optional `logger` and `timeoutMs`

### Testing

Tests use Vitest with MSW (Mock Service Worker) for HTTP interception. Mock server setup is in `test/setupTests.ts`.
