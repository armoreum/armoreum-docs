# Documentation verification

`npm test` checks local Markdown file links using only Node.js built-ins. It does not fetch external sites or verify historical operational statements.

The supplied reference has a recorded original digest and a transformed-publication digest in `SOURCE_MANIFEST.json`. Changes add historical-claim attribution, use platform-neutral workspace terminology, and mark unavailable reference documents.

The four module test suites passed 53 tests in total: authorization 13, recovery 12, bridge helpers 17, and launchpad helpers 11. These counts describe Node library/helper tests, not full application or Solidity integration testing.

Publication checks also inspect copied-file digests, local relative Solidity import closure, sensitive-file exclusions, source-secret scan results, repository metadata, and the pushed Git blob hashes.

No production deployment, live private RPC call, funded transaction, npm registry publication, or recovery-file upload is part of this source release.
