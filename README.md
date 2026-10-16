# Armoreum Documentation

Public architecture, product scope, security boundaries, recovery, and economic-reference documentation based on the supplied Armoreum artifacts.

[MIT License](LICENSE) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Releases](https://github.com/armoreum/armoreum-docs/releases) · [Support](mailto:support@armoreum.io)

## Reading guide

- [Complete supplied project reference](PROJECT_REFERENCE.md): preserved with historical-status attribution and missing-reference labels.
- [Artifact-based repository map](docs/repositories.md): responsibilities, actual source, overlap, and missing system dependencies.
- [Architecture and trust boundaries](docs/architecture.md).
- [Authorization and recovery security](docs/security-and-recovery.md).
- [Product implementation status](docs/product-status.md).
- [Economic reference](docs/economics.md).
- [Project and upstream licensing boundaries](docs/licensing.md).
- [Source scope](docs/source-scope.md), [provenance](SOURCE_MANIFEST.json), and [verification](docs/verification.md).

## Important limits

Historical statements about live deployments, runtime hashes, active bridge pairs, or production health are not newly verified by this documentation release. The supplied source still lacks the API backend, two original shared API packages, database schema/migrations, workspace catalog/lockfile, and OpenAPI/generation inputs.

This is a source/documentation prerelease. It does not certify post-quantum security, deploy contracts, enable a banking product, or publish an npm registry package.

## Documentation checks

```sh
npm test
```

This uses Node.js built-ins to check local Markdown links. It does not validate historical external operational claims.

## Ecosystem

[armoreum](https://github.com/armoreum/armoreum) · [armoreum-contracts](https://github.com/armoreum/armoreum-contracts) · [armoreum-authorization](https://github.com/armoreum/armoreum-authorization) · [armoreum-recovery](https://github.com/armoreum/armoreum-recovery) · [armoreum-bridge](https://github.com/armoreum/armoreum-bridge) · [armoreum-launchpad](https://github.com/armoreum/armoreum-launchpad) · [armoreum-docs](https://github.com/armoreum/armoreum-docs)

Contributions are welcome through issues and pull requests. Contact **support@armoreum.io**. Never submit secrets, real recovery files, or customer data.
