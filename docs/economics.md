# Economic reference

The figures below are attributed to the supplied dated project reference and should be checked against applicable contract source and current configuration before use.

Distinct balances include creator-wallet funding, Pons unclaimed fees, TaxRouter accrued/batch-ready fees, Creator Vault ETH backing, JailETH liabilities, bridge inventory/pending transfers/retained fees, and platform/foundation/buyback receipts.

The reference specifies 0.0025 ETH required launch funding and a separate 0.0005 ETH Pons launch fee. Initial buys and actual gas requirements are additional.

Additional-tax allocations described by launch mode:

| Mode | Creator | Platform | Buyback |
| --- | --- | --- | --- |
| Ethereum-only | 100% | 0% | 0% |
| Ethereum Multichain | 80% | 0% | 20% |
| Pons-only | 90% | 10% | 0% |
| Pons Multichain | 70% | 10% | 20% |

These partition the additional tax, not the whole trade or every external protocol fee. The reference describes a 70-basis-point Ethereum base tax and a 100–1,000-basis-point additional-tax range. Historical deployed instances can differ.

The described bridge fee is floor(gross × 20 / 10,000) tokens retained at destination, separate from gas and LayerZero's quote. The 10% inventory maximum described by the reference is application policy, not necessarily enforced against direct contract calls.

No profitability, relay-time guarantee, governance-token allocation, or investment-return claim is supported by this source publication.
