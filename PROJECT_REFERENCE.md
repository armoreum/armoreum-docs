# Provided project reference

> This document preserves the project overview supplied with the artifacts. Its dated live-status, deployment, and review claims are **reported historical statements**, not new verification performed for this source publication. Original links to documents that were not supplied are marked explicitly. No missing evidence file or backend implementation is fabricated.

# ***armoreum*** — complete project reference

**armoreum is building quantum-resistant asset-protection infrastructure for the open asset economy.** It combines additional authorization, programmable controls, protected reward accounting, cross-chain infrastructure, and a growing set of DeFi applications. Token launches are one entry point into this ecosystem—not its entire purpose.

Documentation review date: **2026-10-16 UTC**. Live read-only observations were collected around **11:50 UTC**. Source inspection describes this workspace; a published release can differ. See evidence and unresolved discrepancies (original reference: `docs/evidence.md`; file not supplied).

## Contents

1. [Mission and investor perspective](#mission-and-investor-perspective)
2. [Product ecosystem](#product-ecosystem)
3. [Architecture and trust](#architecture-and-trust)
4. [Authorization and quantum-resistant scope](#authorization-and-quantum-resistant-scope)
5. [Recovery and published creator wallets](#recovery-and-published-creator-wallets)
6. [Money flows](#money-flows)
7. [Launch infrastructure](#launch-infrastructure)
8. [Cross-chain infrastructure](#cross-chain-infrastructure)
9. [Contracts and networks](#contracts-and-networks)
10. [API and persistent state](#api-and-persistent-state)
11. [Development and operation](#development-and-operation)
12. [Evidence and remaining limitations](#evidence-and-remaining-limitations)

## Mission and investor perspective

### Problem

Blockchain ownership commonly depends on signatures from externally owned accounts. A stolen signing key can authorize whatever that account is permitted to do. Future large-scale quantum attacks against elliptic-curve cryptography motivate additional mechanisms, but do not remove present-day risks such as malware, phishing, weak passwords, compromised servers, or contract defects.

### Solution direction

armoreum's design puts enforceable conditions at the account/contract level. Sensitive supported operations require more than an intentionally disclosed creator key. The existing creator-reward implementation uses password-derived material and one-time hash preimages in addition to ECDSA signatures. The long-term objective is an ecosystem in which protection rules can be reused in rewards, financial workflows, swaps, payments, and cross-network applications.

### Product relationships and business model

- **Protection infrastructure** supplies vault isolation, authorization rules, accounting, and recovery mechanisms.
- **Creator Vaults/JailETH** apply those controls to creator reward backing and redemption.
- **Offline Recovery and ArmorProof** provide credential inspection/recovery support and scoped public transparency.
- **Bridge and Bridge Explorer** move explicitly registered token pairs and report settlement.
- **DeFi Tools** is a product-discovery surface; JailSwap and the Jail Bank/JailPay concepts extend the intended financial ecosystem.
- **Launchpad** provisions token-related contracts and connects trading-fee income with creator protection.
- **Explore, token pages, creator/rewards, security and activity views** connect these products for users.

Implemented fees are documented in tokenomics (original reference: `docs/tokenomics.md`; file not supplied). There is no evidence here establishing an Armoreum governance-token sale, protocol-token allocation, revenue forecast, adoption metric, partnership, external audit, or investment return. Individual launched tokens must not be presented as an Armoreum platform token.

## Product ecosystem

The table describes the implementation, not an assurance that every deployed instance is correctly configured.

| Product / surface | Users, purpose, and workflow | Dependencies, networks, fees, and status |
| --- | --- | --- |
| Programmable asset protection | Creators and application builders use vault-enforced conditions for supported asset movements | Contract-specific; creator protection is implemented, general protection for arbitrary wallets is not established |
| Creator Vaults | Creator rewards enter an isolated token/chain vault; protected actions read live epoch and commitments | Ethereum 1 / Robinhood 4663; backing, issuance, upgrades, pause states, and authorization must be checked |
| JailETH rewards | View protected ETH-denominated credits; request Unjail, then redeem to an authorized recipient | Not an ordinary freely transferable ETH token; 1:1 creator issuance/redemption in current source, with gas and solvency conditions |
| Password/hash-chain authorization | Browser derives material; contracts register commitments and consume the next valid proof | Argon2id, backend-derived seed, SHA-256 and ECDSA; a narrow hash-based authorization path, not universal quantum security |
| Offline Recovery | Open `/offline-recovery`, cache the static tool, go offline, select and inspect a QRC | Local browser/file handling; inspection is not itself an onchain redemption; see recovery guide (original reference: `docs/guides/recovery.md`; file not supplied) |
| ArmorProof | Open the landing modal; inspect published creator identities and scoped balances | Public completed-launch directory; refreshes every 100 seconds while open; descending exact balance order; balances are not an audit |
| Bridge | Open `/bridge` or a Multichain token's bridge modal; resolve its pair, select direction, connect wallet, quote and submit | Live for registered, activated pairs on Ethereum ↔ Robinhood; wallet gas, LayerZero quote, destination 0.2% token fee and reserve limits apply |
| Bridge Explorer | Open `/bridge-explorer`; track submission, source confirmation, verification and destination settlement | Public application records and receipts, with LayerZero Scan links; missing Scan indexing is not proof of failure |
| DeFi Tools | Open `/defi-tools` to discover tools and their explanations | Directory implemented; its old blanket “transactions disabled” copy conflicts with the functional bridge |
| JailSwap | Intended ETH/token swaps with JailToken/JailETH receipt accounting and vault controls | **Coming Soon**; source contracts and legacy UI do not establish a verified released public swap flow |
| Jail Bank | Intended consolidated protected-finance experience | `/my-jail` currently renders a notice, not an enabled bank; older functional component source remains but is not the active route |
| JailPay | Intended payments with explicit authorization and clear transaction details | Concept in the Jail Bank notice; no separate implemented payment endpoint or independently verified deployment identified |
| JailBridge within Jail Bank | Intended bridge integration inside the banking experience | Not a separate released banking product; distinguish from the existing standalone Bridge |
| Launchpad | Prepare details/authorization, fund the selected chain, confirm execution, reconcile and download QRC | Pons V2, Ethereum and Multichain execution source exists; per-network readiness and funding remain mandatory |
| Explore and token pages | Browse actual launches, select a token, inspect chain-specific data and relevant actions | Landing preview is limited; `/explore` is the full discovery surface. Multichain is one category with paired CAs and chain tabs |
| Creator/reward views | Inspect launches and protected credits; enter secure claim flows | `/creator`, `/my-launches`, `/rewards`; only live chain/vault state establishes available claims |
| Security and activity | Inspect network/dependency health and recorded activity | `/security`, `/activity`; informational status is not an audit, a guarantee, or a replacement for receipts |
| Informational documentation | Explain security, launches, tools, integrations, privacy and terms | `/docs`, `/documentation`, and `*-armoreum` routes; older copy is not authoritative when it contradicts code or measured state |

Only JailSwap receives the “Coming Soon” product label in this documentation. Jail Bank's current UI also contains that wording; the documentation explicitly records this difference without editing product behavior.

## Architecture and trust

The React/Vite application talks to an Express API. OpenAPI and generated Zod/React libraries describe much, but not all, of the API. PostgreSQL persists drafts, metadata, jobs, bridge submissions and transfer state; object storage holds token logos. The API connects to supported mainnets through server-side Alchemy URLs.

Production starts separate responsibilities within the API lifecycle: Pons market indexing, Pons fee processing, Ethereum source verification, bridge provisioning, and bridge relay/reconciliation. Browser requests should inspect readiness, not start relayers. A process restart must recover durable jobs; browser polling is not the sole source of liveness.

Contracts include factories, upgradeable implementations/proxies, creator and trading-related vaults, receipt token components, TaxRouter, V4 hooks/seeding, and per-token bridge OApps. External dependencies include Pons V2, Uniswap V4, LayerZero endpoints/libraries, Reown, Alchemy, explorer services, database and object storage.

**Trust is not uniform.** A receipt proves a transaction's execution at a particular block. A database status is an application claim. A source-verification page helps inspect deployed source but does not prove safety. A successful health response is not a transaction test.

Read architecture (original reference: `docs/architecture.md`; file not supplied) and system/contract diagrams (original reference: `docs/diagrams/flows.md`; file not supplied).

## Authorization and quantum-resistant scope

### Actual password path

1. Normalize the password with Unicode NFKC. Current browser policy requires at least six characters with letters and numbers; meeting this minimum does not establish strong entropy.
2. Run **Argon2id**, with 65,536 KiB memory, three iterations, parallelism one, and a 32-byte output. The launch ID supplies the 32-byte salt.
3. Send the KDF output to the backend seed endpoint. The server derives material with HKDF-SHA-256/HMAC-SHA-256 and a 32-byte server secret. This introduces backend trust; it is not a browser-only, zero-knowledge construction.
4. Derive the creator wallet and a password-authorizing secp256k1 signer from domain-separated seed material. Their signatures are **ECDSA**, not post-quantum signatures.
5. Derive four operation-specific chains—claim, redemption, rotation, recovery—for each of 64 epochs. Each chain has 100 one-time proofs.
6. Register H100 commitments and an epoch Merkle root. SHA-256 leaves bind chain ID, vault, creator, launch ID, epoch and all four commitments. Sibling pairs are byte-sorted before hashing.
7. For a live current commitment H100, reveal H99; the verifier checks `SHA256(H99) == H100`, stores H99 and decrements the counter. Continue toward H0. Reusing a consumed proof fails.
8. For the password Unjail request, the source requires both creator and password-signer signatures, a valid one-time proof, nonzero balance, valid recipient, unexpired deadline, correct mode and unpaused state.
9. The request fixes a pending operation. Redemption consumes another proof, burns the creator's JailETH, increments the operation nonce, and pays the pending recipient. The recipient cannot be the deliberately exposed creator EOA.

Proofs are bound to an operation chain and vault context; the preimage alone does **not** encode every amount/recipient. Signed digests and the stored pending operation provide that binding. Concurrent or stale clients must reread epoch, commitment, pending action and remaining count before proceeding.

### What this establishes—and what it does not

The one-time preimage path can be described as **quantum-resistant under stated hash-function assumptions**. Its security also depends on secret entropy, derivation, protocol design, implementation correctness and actual deployed configuration. No blanket post-quantum claim follows merely from using SHA-256.

ECDSA remains in wallet transactions, creator/password-signer authorization, administration and bridge attestation. WebAuthn/P-256 source exists as a separate conventional-cryptography path; its presence does not make it a post-quantum verifier or prove every passkey enrollment route is enabled.

See the mandatory security-boundary table (original reference: `docs/security.md`; file not supplied), including EOA, server, browser, administrator, RPC and LayerZero limitations.

## Recovery and published creator wallets

Creator wallets are deliberately disclosed only within the completed-launch publication boundary. That does not make them safe places to hold ETH, tokens or approvals. Anyone can use an exposed key for ordinary EOA actions.

**The current QRC is an unencrypted bearer recovery file.** The source emits a QRC v3.0 container with payload version 2 and can include the creator password, creator private key, authorization seed, vault/chain context, epoch root and all operation proof chains. File possession grants the included authority. The SHA-256 checksum detects accidental corruption; it is not encryption, authenticity protection or access control.

The offline viewer does not upload the selected file or send transactions. Cached static assets must be available for a genuine offline opening. File parsing does not establish the current onchain epoch or that a payout is possible. Current state must be reconciled before online protected operations.

Published keys are not equivalent to a QRC. Passwords, backend secrets and recovery proofs must never be published in ArmorProof or copied into this documentation.

Old documentation in the repository describes a smaller QRC v2 payload without passwords or stored proof chains; that description is obsolete for the current writer. See recovery (original reference: `docs/guides/recovery.md`; file not supplied) and evidence (original reference: `docs/evidence.md`; file not supplied).

## Money flows

The following balances are distinct:

- Creator-wallet funding used for chain gas, launch fees and selected initial purchase.
- Pons escrowed/unclaimed fees.
- TaxRouter accrued or batch-ready fees.
- Creator Vault ETH backing.
- Issued JailETH liabilities.
- Bridge token inventory, pending transfers and retained destination fees.
- Platform/foundation receipts and buyback allocations.

The current network configuration specifies **0.0025 ETH required launch funding** and a **0.0005 ETH Pons contract launch fee**. Initial buys and actual gas requirements are separate; a deposit parameter is not a guarantee of sufficient funds for every configuration. Ethereum configuration reuses the 0.0025 ETH funding constant, while its opening seed quote is a separate economic input.

Current TaxRouter source uses a 70-basis-point Ethereum base tax and mode-specific additional-tax allocations. Additional tax is configured within a 100–1,000-basis-point source range. The additional-tax split is:

| Mode | Creator | Platform | Buyback |
| --- | --- | --- | --- |
| Ethereum-only | 100% | 0% | 0% |
| Ethereum Multichain | 80% | 0% | 20% |
| Pons-only | 90% | 10% | 0% |
| Pons Multichain | 70% | 10% | 20% |

These percentages partition the **additional tax**, not the entire trade amount or Pons' native protocol fee. Older deployed instances can retain prior rates; the legacy HASH token is not retroactively assigned every new-source setting.

Current CreatorRewardVault source issues full newly credited creator rewards as JailETH at 1:1 ETH units within the credit/deposit transaction. Its backing and burn/payout controls remain necessary. Router batching thresholds are distinct from vault issuance.

Bridge fee: `floor(gross * 20 / 10000)` tokens retained at the destination; recipient receives gross minus that fee. Gas and the LayerZero native quote are additional and chain-dependent.

Application bridge maximum:

```text
spendableDestination = max(inventoryExcludingAccruedFees - pendingGross, 0)
applicationMaximum = min(floor(spendableDestination / 10),
                         sourceContractLimit, destinationContractLimit)
walletMaximum = min(applicationMaximum, walletTokenBalance)
```

The form and quote API reject a larger amount and expose the current maximum. This **10% restriction is currently application-layer policy**, not an assurance that direct contract calls cannot bypass that percentage rule.

See full accounting and illustrative example (original reference: `docs/tokenomics.md`; file not supplied). No fixed relay-duration or profitability claim is supported.

## Launch infrastructure

The walletless launch flow derives a creator identity rather than requiring a connected trading wallet. Details and token imagery must be saved and verified. Funding orders are scoped per chain. Both authorization signatures and chain-specific readiness gates are checked before execution.

Pons-only uses the Robinhood Pons integration. Ethereum-only uses the Ethereum factory/deployer and V4 seeding path. Multichain coordinates both legs, preserves each leg's receipts/status, and provisions bridge OApps only after both legs complete. Robinhood's atomic initial purchase sends the actual acquired token output to its per-launch Bridge Vault; Ethereum's configured reserve is a different calculation.

The current preset file specifies a 1,000,000,000-token supply with 18 decimals. Initial-buy presets 0.02 / 0.05 / 0.1 / 0.2 ETH correspond to Ethereum reserve allocations 1% / 2.5% / 5% / 10%. This is a launch preset, not platform-token tokenomics or a promise of equal reserves on both networks.

Recovery is receipt-first: reconcile existing token/factory records and completed stages before resuming. A metadata write failure must not cause a second token deployment. Ethereum hook source verification is a distinct queued process and is not contingent on every subsequent launch stage succeeding.

## Cross-chain infrastructure

Only registered Armoreum Multichain pairs are eligible. The standalone bridge resolves a token's paired contracts rather than letting users invent an arbitrary destination token. Token-page modals use that page's pair. Users choose Ethereum or Robinhood as source, switch the real wallet network, enter an amount, and optionally set a different receiver; blank receiver defaults to the connected wallet.

A wallet approval is not a transfer. A reported source hash is not a confirmed receipt. A confirmed source lock is not destination delivery.

The service persists submitted hashes for early visibility, verifies the receipt/OApp/event, then processes the configured confirmation policy. Current early-relay source policy is:

- Ethereum: at least **3 confirmations and 24 seconds**.
- Robinhood: at least **30 confirmations and 3 seconds**.
- Early exposure: gross transfer no more than 10% of configured capacity, and aggregate unsettled exposure no more than 25%; otherwise the worker uses the full-finality path.

This early-confirmation policy deliberately accepts reorganization exposure; it is not Ethereum finalized consensus. Destination DVN verification, endpoint commitment, and execution can be grouped through AtomicRelay when its path is enabled. One destination transaction cannot combine a source-chain transaction and destination settlement into one cross-chain atomic transaction.

Per-launch provisioning deploys/funds OApps, sets peers, configures path policy, validates activation and stores retry state. This runs in production after completed launch legs, with startup recovery of pending work. It is **automatic orchestration with prerequisites**, not a guarantee that no operator, dependency, funding or retry failure can occur.

Bridge is live for registered, activated token pairs on Ethereum ↔ Robinhood. Production readiness and active-pair records were checked at review time. This does not imply arbitrary tokens are bridgeable or establish an under-two-minute service-level guarantee.

## Contracts and networks

Verified chain identities in this review:

| Network | Chain ID | Explorer | LayerZero EID |
| --- | --- | --- | --- |
| Ethereum | 1 | [Etherscan](https://etherscan.io) | 30101 |
| Robinhood | 4663 | [Robinhood explorer](https://robin.etherscan.io) | 30416 |
| Local Ethereum fixture | 31337 | No public explorer established | Local test configuration |
| Local Robinhood fixture | 46630 | No public explorer established | Local test configuration |

Base, Solana and BNB entries in the network selector/configuration are not evidence of released launch or bridge support.

Contracts (original reference: `docs/contracts.md`; file not supplied) inventories the relevant source families and selected live deployments. contract-registry.json (original reference: `docs/contract-registry.json`; file not supplied) records ten source-record-backed, code-hash-checked core addresses. Historical and candidate entries remain in the original deployment manifests; a candidate label is not silently upgraded into a claim of active use.

Hash matching here compares observed runtime bytecode with a recorded hash. It does not establish reproducible compilation, complete proxy-role correctness, explorer source verification, an independent audit, or operational safety. Source-verification URLs are provided for inspection, with unverified status reported explicitly.

## API and persistent state

The API is mounted at `/api`. API reference (original reference: `docs/api.md`; file not supplied) inventories every directly registered Express route and identifies the OpenAPI schemas, unmodeled routes, validation, trust boundaries and side effects. It separates public reads, draft/authorization mutations, gas-sponsored reward transactions, bridge submission reports and development-only transaction paths.

Not every POST requires a user account/session. In particular, a draft identifier or same-origin check is not strong user authentication. Authorization-sensitive transaction endpoints validate cryptographic payloads; public hash submission must be reconciled against chain evidence rather than trusted as settlement.

PostgreSQL stores drafts/creator ciphertext, per-chain launch metadata, funding/execution state, source-verification jobs, market cursors, fee jobs, bridge pair activation, reported source submissions, and GUID-based transfers. Metadata is separate per draft and chain. Onchain accounting and transaction receipts remain authoritative over indexing and UI state.

## Development and operation

See development (original reference: `docs/development.md`; file not supplied) for actual package scripts, environment-variable names, local chain setup, code generation and tests. See operations (original reference: `docs/operations.md`; file not supplied) for release procedures, jobs, funding, reconciliation and failure handling.

Secrets remain server-side. App-controlled mainnet RPC reads/broadcasts route through Alchemy; wallet signing remains with the wallet/provider, whose internal RPC and alert processing are not fully controlled by the application.

A release must validate schema compatibility without dropping valid history, preserve per-chain launch outcomes, avoid duplicate sends after uncertain broadcasts, and test recovery against live commitment state. Publishing is a separate operator action; this documentation work does not change configuration or send mainnet transactions.

## Evidence and remaining limitations

The review checked source, generated API contracts, database definitions, scripts, manifests, ten selected core runtime hashes, four factory proxy implementation slots, and selected public production endpoints. It did not execute funded launches, approve tokens, redeem rewards, change administrators, deploy contracts, or submit bridge transactions.

Known discrepancies include obsolete workspace-note deployment/public-RPC claims, stale DeFi explanatory copy, old manifest status flags, obsolete QRC format documentation, Jail Bank's notice wording, and OpenAPI coverage gaps. Source verification for every contract, role enumeration for every proxy, every historical deployment receipt/timestamp, independent security review, complete external protocol economics, and future-launch reliability remain unverified or outside this read-only sample.

These limitations and the precise evidence locations are maintained in the evidence register (original reference: `docs/evidence.md`; file not supplied). Unsupported claims must not be filled with invented addresses, metrics, capabilities or assurances.

