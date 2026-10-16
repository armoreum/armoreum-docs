# Authorization and recovery boundaries

The password source uses NFKC normalization, Argon2id with 65,536 KiB memory, three iterations, parallelism one, and a 32-byte output. The server-assisted seed step introduces a server trust boundary.

The password protocol uses 64 epochs, four operation-specific chains, and 100 proofs per chain. Other retained authorization families use 256 proofs and different domains; they must not be mixed.

One-time hash proofs do not make the entire system post-quantum secure. ECDSA remains in signing and administration. Secret entropy, implementation, context binding, pending-operation state, and actual deployed configuration matter.

QRC v3.0 is an unencrypted bearer container. It can include passwords, creator keys, authorization seeds, context, and proof chains. Its SHA-256 checksum is corruption detection, not encryption or authenticity.

Offline inspection does not establish current onchain state or execute a payout. Never upload a real capsule to a repository, issue, pull request, release, or support email. Synthetic fixtures only.
