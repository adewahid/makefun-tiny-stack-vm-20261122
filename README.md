# Tiny Stack VM

A tiny stack virtual machine for make.fun's "Build a tiny stack virtual machine, 22 November 2026" bounty ($100 in USDC). One program answers all 40 instances of a drawn set: it runs each bytecode program of make.fun's tiny stack ISA and writes exactly the bytes it outputs and the exit code it ends with.

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/adewahid/makefun-tiny-stack-vm-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/adewahid/makefun-tiny-stack-vm-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

Referral code: `zsgcm8j7` — https://make.fun/r/zsgcm8j7

## Entry

`main.ts` (Node 22) implements the ISA: 32-bit wrapping integers, a 256-value stack, branches, calls, 256 words of memory, input/output, and all ten traps with their exit codes. Practice set: 40/40 outputs byte-identical, 40/40 exit codes, score 1,000,000.

## License

MIT — see LICENSE.
