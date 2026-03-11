import { useState } from 'react'
import { buildFakeJwt, validatePassword } from '../../../utils/jwt'
import styles from './AuthApp.module.css'

interface AuthAppProps {
  onTokenGenerated: (token: string) => void
}

const AuthApp = ({ onTokenGenerated }: AuthAppProps) => {
  const [body, setBody] = useState(`{\n  "grant_type": "client_credentials",\n  "password": ""\n}`)
  const [response, setResponse] = useState<string | null>(null)
  const [responseType, setResponseType] = useState<'ok' | 'error' | 'idle'>('idle')
  const [latency, setLatency] = useState(0)
  const [token, setToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    setLoading(true)
    setResponse(null)
    setToken(null)

    let parsed: Record<string, string>
    try {
      parsed = JSON.parse(body)
    } catch {
      setResponseType('error')
      setResponse('SyntaxError: JSON inválido')
      setLoading(false)
      return
    }

    const ms = Math.floor(600 + Math.random() * 500)
    setLatency(ms)

    setTimeout(() => {
      if (!parsed.password) {
        setResponseType('error')
        setResponse(`400 Bad Request · ${ms}ms\n\n{ "error": "password is required" }`)
      } else if (!validatePassword(parsed.password)) {
        setResponseType('error')
        setResponse(`401 Unauthorized · ${ms}ms\n\n{ "error": "invalid credentials" }`)
      } else {
        const newToken = buildFakeJwt()
        setToken(newToken)
        setResponseType('ok')
        setResponse(
          `200 OK · ${ms}ms\n\n` +
          `{\n  "access_token": "${newToken}",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}`
        )
        onTokenGenerated(newToken)
      }
      setLoading(false)
    }, ms)
  }

  const handleCopy = () => {
    if (!token) return
    navigator.clipboard?.writeText(token).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.container}>

      <div className={styles.urlRow}>
        <div className={styles.method}>POST</div>
        <input className={styles.urlBox} value="gabriellima.dev/api/auth/token" readOnly />
        <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>
          {loading ? '...' : 'SEND ▶'}
        </button>
      </div>

      <div className={styles.sectionLabel}>Body · raw JSON</div>
      <textarea
        className={styles.bodyArea}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className={styles.hint}>
        💡 Dica: <span>Abra o PORTFOLIO.exe para pegar a senha!</span>
      </div>

      <div className={styles.sectionLabel}>Response</div>
      <pre className={`${styles.respBox} ${responseType === 'ok' ? styles.respOk : responseType === 'error' ? styles.respErr : ''}`}>
        {response ?? '// Clique SEND para enviar a requisição...'}
      </pre>

      {token && (
        <div className={styles.copyRow}>
          <button className={styles.copyBtn} onClick={handleCopy}>
            📋 COPY TOKEN
          </button>
          {copied && <span className={styles.copiedBadge}>✓ COPIADO!</span>}
        </div>
      )}

    </div>
  )
}

export default AuthApp