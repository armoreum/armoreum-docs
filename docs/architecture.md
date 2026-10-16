# Architecture and trust boundaries

The supplied reference describes a React/Vite browser application, Express API, PostgreSQL persistence, object storage, wallet providers, and Ethereum/Robinhood contract integrations.

Only frontend and Solidity/script source were included. The server is described, not implemented in this documentation repository.

The server's described responsibilities include creator seed derivation, draft and launch state, chain-specific reconciliation, indexing, fee jobs, source verification, bridge provisioning, and relay/reconciliation. Browser polling is not a substitute for durable server jobs.

Source, database status, transaction submission, confirmed receipt, source verification, and destination settlement are different evidence classes. A source file does not establish deployed configuration. A health response does not prove a funded transaction succeeded.

Local fixture chain IDs are 31337 and 46630. Production identities described by the reference are Ethereum 1 and Robinhood 4663. This documentation does not verify a currently active RPC or deployed address.
