export const SECRET_PASSWORD = 'dev@2026'

export const buildFakeJwt = (): string => {
  const header  = btoa('{"alg":"HS256","typ":"JWT"}').replace(/=/g, '')
  const payload = btoa(JSON.stringify({
    sub: 'visitor',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  })).replace(/=/g, '')
  const signature = btoa('gl_secret_' + Date.now()).replace(/=/g, '').slice(0, 28)
  return `${header}.${payload}.${signature}`
}

export const validatePassword = (password: string): boolean => {
  return password === SECRET_PASSWORD
}

export const validateJwt = (token: string, currentToken: string | null): boolean => {
  if (!token) return false
  if (token.split('.').length !== 3) return false
  if (token !== currentToken) return false
  return true
}