# Kavel Anonymous Task API

> The keyless GET side of Kavel&#39;s anonymous AI image API: polling a generation task for its status and result image URLs. Anonymous output is 1K and watermarked.
>
> Sources: https://kavel.readthedocs.io/en/latest/sdk/http/ and the reference it links, https://hanshs474.gitbook.io/kavel-api/kavel-anonymous-image-api.md, with the poll endpoint probed live on 2026-10-23 using the task id from that reference (2a04f52a-0da3-4629-8a3f-ecc5a507f34f), which still answers with a finished result, and with an unknown task id.
>
> NOT modelled: POST /api/ai/generate, which submits a job and is the only way to obtain a new task id. It is not GET, it spends credits from a small per-client wallet (15 credits; 5 per text-to-image, 15 per edit) under a 30-credit per-IP daily ceiling, and it was not probed. Without it this spec can only read tasks whose id is already known. Observed but unexplained: the image URL in a finished task changed between two polls of the same task. The `x-anon-id` header the docs say to send on the poll is not required: the probe without it returned the same result. Unverified: the item type of `videos` (always empty; assumed URL strings) and any status other than success.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 1 entities and 1 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AnonQuery

Results: The task. `code` is 0 on success and -1 on failure (then `data` is absent).

SDK operations: `load`.

Key fields to recognise:

- `images`: Result image URLs, present once the task has succeeded.
- `status`: pending, processing, success or failed. Only success and failed are final.
- `videos`: Result video URLs (always empty on the anonymous tier, which cannot run video).
- `watermarked`: One flag per image; anonymous output is watermarked.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AnonQuery | `load` | `GET /api/ai/anon-query` | See reference |

## Connect to the API

- API server: `https://www.kavel.ai`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `kavel_list`: List records for an entity. No active entity supports this operation.
- `kavel_load`: Load one record for an entity. Supported entities: `anon_query`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

