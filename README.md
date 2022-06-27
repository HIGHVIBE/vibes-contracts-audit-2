# vibes-contracts-audit-2

# VIBES upgradable Token contract, its TransparentUpgradeableProxy and a vesting contract

## Introduction

In this audit request our purpose is to audit our VIBES Token contract and its supplementary contracts.

Our Token contract:
`VIBESToken.sol`

our contracts for wrapped ETH:
`WETH.sol`

our proxy contracts to make our token upgradable:
`VIBESProxy.sol`
`VIBESProxyAdmin.sol`

our contracts for liqudity pool token and pair:
`VibesLPERC20.sol`
`VibesLPPair.sol`


our contracts for liqudity pool token and pair:
`VibesLPERC20.sol`
`VibesLPPair.sol`

our contracts for manipulating of pairs:
`VibesFactory.sol`
`VibesRouter.sol`

our contracts for vault staking:
`VibesBar.sol`
`LPVibesStacking.sol`

and our staking contract to create new staking logics for SVIBES.
`VIBESStaking_with_SVIBES.sol`

## Tech stack

[**OpenZeppelin**](https://openzeppelin.com/) - verified market standards

[**Remix IDE**](https://remix.ethereum.org/) - for deployment tests

## Deployment steps

Deployment order is as follows:

1. Deploy and initialize VIBESToken.sol with "name: VIBES, symbol: VIBES and 21 Billion * 10^18 totalSupply"
2. Deploy VIBESProxyAdmin.sol
3. Deploy VIBESProxy.sol
4. Change the proxy address on the Admin contract
5. Deploy WETH for take theare ETH when we add liqudity with ETH
6. Deploy VibesFactory
7. Deploy VibesRouter with adresses in constructor of deployed _factory: VibesFactory address, _WETH: WETH address 
8. Add liqudity to pair user method addLiquidity or addLiquidityETH of VibesRouter it will create pair and lp token.
9. Deploy and initialize VibesBar with _vibes: VIBESToken address
10. Deploy and initialize LPVibesStacking with _vibes: VIBESToken address, _bar: VibesBar address, _devaddr: address of taking part of reward, _vibePerBlock: uint256 numbers reward per block, _startBlock: initial block numner
11. Execute VIBESToken.transferOwnership(LPVibesStacking address)
12. Execute VibesBar.transferOwnership(LPVibesStacking address)
13. Execute LPVibesStacking.add for adding pool to our staking where _allocPoint is the weight assigned to this pool, which will be used to calculate rewards for liquidity providers. This number will be added to totalAllocPoint which is used to calculate the relative weight of each pool; _lpToken as you already know, is the LP token address to be added; _withUpdate is a boolean that indicates whether to call massUpdatePools or not, which in turn will call updatePool for each pool. For what I’m seeing, updatePool will update reward related variables as accBnsdPerShare, lastRewardBlock for a given pool;
14. Execute approve with LPVibesStacking.address and neccessary amount on VibesLPPair created by factory when you run 8 step
15. Execute LPVibesStacking.deposit where _pid: is id of pool(if you execute one time step 13 it will be 1), _amount: amount of lp token which you want to deposit for take reward
16. Wait for reward, execute LPVibesStacking.withdraw here _pid: is id of pool(if you execute one time step 13 it will be 1), _amount: amount of lp token which you want to windraw(you can use 0 if you wand just take reward)
17. Check balanceof VIBESToken you have reward


