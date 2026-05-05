import test from 'node:test'
import assert from 'node:assert/strict'

import * as pricing from './pricing.ts'
import {
  buildPricingPlan,
  formatCurrency,
  formatFeeRate,
  isTierList,
  sortTiers,
} from './pricing.ts'

const plusTier = {
  id: 2,
  name: 'Plus',
  monthly_price: '9',
  fee_rate: '0.0100',
  monthly_free_quota: '2000',
  enable_deposit_withdrawal: false,
  allowed_chain_codes: ['ethereum-mainnet', 'bsc-mainnet', 'polygon-mainnet'],
  allowed_crypto_symbols: ['USDT', 'USDC'],
}

test('formats monthly prices and fee rates from tier strings', () => {
  assert.equal(formatCurrency('9'), '$9.00')
  assert.equal(formatCurrency('2000'), '$2,000.00')
  assert.equal(formatFeeRate('0.0070'), '0.7%')
})

test('builds Chinese pricing card content from API tier data', () => {
  const plan = buildPricingPlan(plusTier, 'zh')

  assert.equal(plan.name, 'Plus')
  assert.equal(plan.price, '$9.00')
  assert.equal(plan.period, '/ 月')
  assert.equal(plan.billing, '月度订阅')
  assert.equal(plan.description, '$2,000.00 月度免费配额')
  assert.deepEqual(plan.usageHighlights, ['$2,000.00 月度免费配额', '超出后 1% 手续费'])
  assert.equal(plan.usageHighlights.length, 2)
  assert.deepEqual(plan.coreFeatures, [
    {
      title: '支付收款',
      description: '买家付款直达您的收款地址，平台不托管资金。',
      included: true,
    },
    {
      title: '用户充提币',
      description: '允许您的平台用户像交易所用户一样充值和提现代币。',
      included: false,
    },
  ])
  assert.deepEqual(plan.supportGroups, [
    {
      title: '支持链',
      allSupported: false,
      summary: '支持以下链',
      items: ['Ethereum', 'Bsc', 'Polygon'],
    },
    {
      title: '支持代币',
      allSupported: false,
      summary: '支持以下代币',
      items: ['USDT', 'USDC'],
    },
  ])
})

test('derives chain labels from name-mainnet chain codes dynamically', () => {
  const plan = buildPricingPlan(
    {
      ...plusTier,
      allowed_chain_codes: ['ethereum-mainnet', 'bsc-mainnet', 'polygon-mainnet', 'arbitrum-mainnet'],
    },
    'zh',
  )

  assert.deepEqual(plan.supportGroups[0].items, ['Ethereum', 'Bsc', 'Polygon', 'Arbitrum'])
})

test('builds English pricing card content and deposit withdrawal state', () => {
  const plan = buildPricingPlan(
    { ...plusTier, name: 'Max', monthly_price: '299', enable_deposit_withdrawal: true },
    'en',
  )

  assert.equal(plan.period, '/ mo')
  assert.equal(plan.billing, 'Monthly subscription')
  assert.equal(plan.description, '$2,000.00 monthly free quota')
  assert.deepEqual(plan.coreFeatures, [
    {
      title: 'Payment collection',
      description: 'Buyer payments go directly to your receiving address. The platform never custodies funds.',
      included: true,
    },
    {
      title: 'User deposits & withdrawals',
      description: 'Let your platform users deposit and withdraw tokens like exchange users.',
      included: true,
    },
  ])
})

test('describes empty chain and token lists as all platform-supported assets', () => {
  const plan = buildPricingPlan(
    { ...plusTier, allowed_chain_codes: [], allowed_crypto_symbols: [] },
    'zh',
  )

  assert.deepEqual(plan.supportGroups, [
    {
      title: '支持链',
      allSupported: true,
      summary: '支持平台内全部链',
      items: [],
    },
    {
      title: '支持代币',
      allSupported: true,
      summary: '支持平台内全部代币',
      items: [],
    },
  ])
})

test('sorts tiers by id before rendering', () => {
  const sorted = sortTiers([{ ...plusTier, id: 4 }, { ...plusTier, id: 1 }])

  assert.deepEqual(sorted.map((tier) => tier.id), [1, 4])
})

test('validates public tiers payload shape before rendering dynamic cards', () => {
  assert.equal(isTierList([plusTier]), true)
  assert.equal(isTierList([{ ...plusTier, monthly_price: 9 }]), false)
  assert.equal(isTierList({ data: [plusTier] }), false)
})

test('does not export local tier fallback data', () => {
  assert.equal('fallbackTiers' in pricing, false)
})
