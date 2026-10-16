# Artifact-based repository organization

The complete source-backed publication target has seven repositories:

| Repository | Actual contents | Origin and limits |
| --- | --- | --- |
| [armoreum](https://github.com/armoreum/armoreum) | Full supplied frontend source and UI | Original frontend package; missing its backend/shared packages |
| [armoreum-contracts](https://github.com/armoreum/armoreum-contracts) | Full supplied contract and script source | Original contract package; private operational state excluded |
| [armoreum-authorization](https://github.com/armoreum/armoreum-authorization) | Hash-chain/password authorization, EIP-712 helpers, verifier contracts, tests | Module extraction, not a newly recovered original package |
| [armoreum-recovery](https://github.com/armoreum/armoreum-recovery) | QRC writer/parser, viewer model, shared derivation dependency, tests | Toolkit extraction; UI remains in application |
| [armoreum-bridge](https://github.com/armoreum/armoreum-bridge) | Bridge/relay contracts and explorer/retry/error helpers | No live relayer service or database implementation supplied |
| [armoreum-launchpad](https://github.com/armoreum/armoreum-launchpad) | Token deployers, V4/seeding and launch modules, sequencing/funding helpers | No backend orchestration or production presets recovered |
| [armoreum-docs](https://github.com/armoreum/armoreum-docs) | Supplied overview, architecture, security, product and economic scope | Documentation, not missing runtime code |

## Shared source

The application and full contracts are canonical source snapshots. Module repositories include copied relative dependencies where needed. `SOURCE_MANIFEST.json` in each module records the original repository, commit, path, and content digest. Do not mistake shared files for independently developed or independently audited algorithms.

## Missing runtime source

The application imports `@workspace/api-client-react` and `@workspace/api-zod`, but their implementations are not supplied. Contract scripts also refer to API-server relay policy and a shared `network-config.ts`. PostgreSQL and OpenAPI/generation responsibilities are described in the overview, but their implementation sources are absent.

The artifact-based layout does not claim to recover those components. A server/client/schema/database/specification repository split remains a possible later architecture only after source becomes available.
