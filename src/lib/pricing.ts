export const PUBLIC_TIERS_URL = 'https://dash.xca.sh/api/v1/public/tiers'

export type PricingLanguage = 'zh' | 'en'

export interface PublicTier {
  id: number
  name: string
  monthly_price: string
  fee_rate: string
  monthly_free_quota: string
  enable_deposit_withdrawal: boolean
  allowed_chain_codes: string[]
  allowed_crypto_symbols: string[]
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  billing: string
  description: string
  cta: string
  usageHighlights: string[]
  coreFeatures: PricingCoreFeature[]
  supportGroups: PricingSupportGroup[]
}

export interface PricingCoreFeature {
  title: string
  description: string
  included: boolean
}

export interface PricingSupportGroup {
  title: string
  allSupported: boolean
  summary: string
  items: string[]
}

const copy = {
  zh: {
    period: '/ 月',
    freeBilling: '永久免费',
    paidBilling: '月度订阅',
    freeQuota: '月度免费配额',
    feePrefix: '超出后',
    feeSuffix: '手续费',
    paymentCollectionTitle: '支付收款',
    paymentCollectionDescription: '买家付款直达您的收款地址，平台不托管资金。',
    depositWithdrawalTitle: '用户充提币',
    depositWithdrawalDescription: '允许您的平台用户像交易所用户一样充值和提现代币。',
    chainsTitle: '支持链',
    chainsLimitedSummary: '支持以下链',
    chainsAllSummary: '支持平台内全部链',
    symbolsTitle: '支持代币',
    symbolsLimitedSummary: '支持以下代币',
    symbolsAllSummary: '支持平台内全部代币',
    ctaFree: '立即开始',
    ctaPaid: '升级',
  },
  en: {
    period: '/ mo',
    freeBilling: 'Free forever',
    paidBilling: 'Monthly subscription',
    freeQuota: 'monthly free quota',
    feePrefix: 'Then',
    feeSuffix: 'fee',
    paymentCollectionTitle: 'Payment collection',
    paymentCollectionDescription: 'Buyer payments go directly to your receiving address. The platform never custodies funds.',
    depositWithdrawalTitle: 'User deposits & withdrawals',
    depositWithdrawalDescription: 'Let your platform users deposit and withdraw tokens like exchange users.',
    chainsTitle: 'Supported chains',
    chainsLimitedSummary: 'Available chains',
    chainsAllSummary: 'All platform-supported chains',
    symbolsTitle: 'Supported tokens',
    symbolsLimitedSummary: 'Available tokens',
    symbolsAllSummary: 'All platform-supported tokens',
    ctaFree: 'Get started',
    ctaPaid: 'Upgrade',
  },
} satisfies Record<PricingLanguage, Record<string, string>>

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export function isPublicTier(value: unknown): value is PublicTier {
  if (!value || typeof value !== 'object') return false

  const tier = value as Record<string, unknown>
  return (
    typeof tier.id === 'number' &&
    typeof tier.name === 'string' &&
    typeof tier.monthly_price === 'string' &&
    typeof tier.fee_rate === 'string' &&
    typeof tier.monthly_free_quota === 'string' &&
    typeof tier.enable_deposit_withdrawal === 'boolean' &&
    isStringArray(tier.allowed_chain_codes) &&
    isStringArray(tier.allowed_crypto_symbols)
  )
}

export function isTierList(value: unknown): value is PublicTier[] {
  return Array.isArray(value) && value.every(isPublicTier)
}

export function sortTiers(tiers: PublicTier[]): PublicTier[] {
  return [...tiers].sort((a, b) => a.id - b.id)
}

export function formatCurrency(value: string): string {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return '$0.00'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatFeeRate(value: string): string {
  const rate = Number(value)

  if (!Number.isFinite(rate)) return '0%'

  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rate)
}

function getChainLabel(code: string): string {
  const name = code.endsWith('-mainnet') ? code.slice(0, -'-mainnet'.length) : code
  if (!name) return code

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

export function buildPricingPlan(tier: PublicTier, language: PricingLanguage): PricingPlan {
  const text = copy[language]
  const price = formatCurrency(tier.monthly_price)
  const quota = formatCurrency(tier.monthly_free_quota)
  const isFree = Number(tier.monthly_price) === 0
  const chains = tier.allowed_chain_codes.map(getChainLabel)
  const symbols = tier.allowed_crypto_symbols

  return {
    name: tier.name,
    price,
    period: isFree ? '' : text.period,
    billing: isFree ? text.freeBilling : text.paidBilling,
    description: language === 'zh' ? `${quota} ${text.freeQuota}` : `${quota} ${text.freeQuota}`,
    cta: isFree ? text.ctaFree : text.ctaPaid,
    usageHighlights: [
      language === 'zh' ? `${quota} ${text.freeQuota}` : `${quota} ${text.freeQuota}`,
      `${text.feePrefix} ${formatFeeRate(tier.fee_rate)} ${text.feeSuffix}`,
    ],
    coreFeatures: [
      {
        title: text.paymentCollectionTitle,
        description: text.paymentCollectionDescription,
        included: true,
      },
      {
        title: text.depositWithdrawalTitle,
        description: text.depositWithdrawalDescription,
        included: tier.enable_deposit_withdrawal,
      },
    ],
    supportGroups: [
      {
        title: text.chainsTitle,
        allSupported: chains.length === 0,
        summary: chains.length === 0 ? text.chainsAllSummary : text.chainsLimitedSummary,
        items: chains,
      },
      {
        title: text.symbolsTitle,
        allSupported: symbols.length === 0,
        summary: symbols.length === 0 ? text.symbolsAllSummary : text.symbolsLimitedSummary,
        items: symbols,
      },
    ],
  }
}
