import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const codeExamples = [
  {
    tabKey: 'createInvoice',
    lang: 'python',
    code: `import requests
import hmac, hashlib, json

API_BASE = "https://pay.example.com/api/v1"
APP_ID = "your-app-id"
SECRET = "your-secret-key"

def create_invoice(amount, currency="USD"):
    payload = {
        "amount": amount,
        "currency": currency,
        "notify_url": "https://your-site.com/webhook",
        "redirect_url": "https://your-site.com/success"
    }
    body = json.dumps(payload, separators=(',', ':'))
    signature = hmac.new(
        SECRET.encode(), body.encode(), hashlib.sha256
    ).hexdigest()

    resp = requests.post(
        f"{API_BASE}/invoice/",
        json=payload,
        headers={
            "X-App-ID": APP_ID,
            "X-Signature": signature
        }
    )
    return resp.json()

# Create a $99 invoice
invoice = create_invoice("99.00")
print(f"Payment URL: {invoice['payment_url']}")`,
  },
  {
    tabKey: 'getDeposit',
    lang: 'bash',
    code: `# Get a unique deposit address for a customer
curl -X GET "https://pay.example.com/api/v1/deposit/address/" \\
  -H "X-App-ID: your-app-id" \\
  -H "X-Signature: \${SIGNATURE}" \\
  -G \\
  -d "uid=customer_123" \\
  -d "chain=ETH" \\
  -d "crypto=USDT"

# Response:
# {
#   "address": "0x742d35Cc6634C0532925a3b844Bc...",
#   "chain": "ETH",
#   "crypto": "USDT",
#   "uid": "customer_123"
# }`,
  },
  {
    tabKey: 'webhook',
    lang: 'python',
    code: `from flask import Flask, request, jsonify
import hmac, hashlib

app = Flask(__name__)
SECRET = "your-webhook-secret"

@app.route("/webhook", methods=["POST"])
def handle_webhook():
    # Verify signature
    signature = request.headers.get("X-Signature")
    body = request.get_data(as_text=True)
    expected = hmac.new(
        SECRET.encode(), body.encode(), hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected):
        return jsonify({"error": "Invalid signature"}), 403

    event = request.json
    if event["status"] == "completed":
        # Payment confirmed on-chain
        order_id = event["merchant_order_id"]
        amount = event["amount"]
        print(f"Payment {order_id}: {amount} confirmed!")

    return jsonify({"status": "ok"})`,
  },
]

function useTypewriter(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) { setDisplayed(text); setDone(true); return }
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); setDone(true) }
    }, 8)
    return () => clearInterval(interval)
  }, [text, active])

  return { displayed, done }
}

function SyntaxLine({ line }: { line: string }) {
  const parts: React.ReactElement[] = []
  let key = 0

  const patterns: [RegExp, string][] = [
    [/^(#.*)$/, 'text-gray-500'],
    [/^(\s*\/\/.*)$/, 'text-gray-500'],
    [/("""[\s\S]*?"""|"[^"]*"|'[^']*')/, 'text-amber-300'],
    [/\b(import|from|def|return|if|else|not|class|for|in|with|as|print)\b/, 'text-purple-400'],
    [/\b(curl|GET|POST|PUT|DELETE)\b/, 'text-green-400'],
    [/(@\w+)/, 'text-yellow-400'],
    [/\b(True|False|None)\b/, 'text-orange-400'],
    [/(\$\{?\w+\}?)/, 'text-cyan-300'],
  ]

  if (!line.trim()) return <span>{'\n'}</span>
  if (/^\s*#/.test(line) || /^\s*\/\//.test(line)) {
    return <span className="text-gray-500">{line}</span>
  }

  const tokens = line.split(/(\s+|[(){}[\],.:=\\]+|"[^"]*"|'[^']*')/)
  tokens.forEach((token) => {
    let className = 'text-slate-300'
    for (const [pattern, color] of patterns) {
      if (pattern.test(token)) { className = color; break }
    }
    parts.push(<span key={key++} className={className}>{token}</span>)
  })

  return <>{parts}</>
}

export default function CodePreview() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { displayed, done } = useTypewriter(codeExamples[activeIndex].code, isInView)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeIndex].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { key: 'createInvoice', label: t('codePreview.tabs.createInvoice') },
    { key: 'getDeposit', label: t('codePreview.tabs.getDeposit') },
    { key: 'webhook', label: t('codePreview.tabs.webhook') },
  ]

  return (
    <section id="integration" className="relative py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-medium tracking-wide uppercase mb-3"
            >
              {t('codePreview.label')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-6"
            >
              {t('codePreview.title')}
              <br />
              {t('codePreview.titleSuffix')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary leading-relaxed mb-8"
            >
              {t('codePreview.description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {['Python', 'cURL', 'Node.js', 'PHP', 'Go'].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-sm text-text-secondary"
                >
                  {lang}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl border border-gray-200 bg-code-bg overflow-hidden shadow-2xl shadow-gray-200/50">
              <div className="flex items-center justify-between border-b border-white/5 px-4">
                <div className="flex gap-0">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveIndex(i)}
                      className={`px-4 py-3 text-xs font-medium transition-colors duration-200 border-b-2 cursor-pointer ${
                        activeIndex === i
                          ? 'text-blue-400 border-blue-400'
                          : 'text-gray-500 border-transparent hover:text-gray-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-white transition-colors p-1.5 cursor-pointer"
                  aria-label="Copy code"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="p-5 font-mono text-[13px] leading-6 overflow-x-auto max-h-[480px] overflow-y-auto">
                <pre className="whitespace-pre">
                  {displayed.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 shrink-0 text-right pr-4 text-gray-600 select-none text-xs">
                        {i + 1}
                      </span>
                      <span>
                        <SyntaxLine line={line} />
                      </span>
                    </div>
                  ))}
                  {!done && (
                    <span className="inline-block w-[7px] h-[18px] bg-blue-400 animate-pulse ml-0.5" />
                  )}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
