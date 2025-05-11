// apps/mobile/src/features/auth/services/authServiceNative.ts

// url de env
import { API_URL } from '@env'

async function getCSRFToken(): Promise<string> {
  const res = await fetch(`${API_URL}/csrf-token`, {
    credentials: 'include',
  })
  const body = await res.json()
  return body.csrfToken
}

export interface RegisterData {
  email: string
  password: string
  confirmPassword?: string
  acceptTerms: boolean
  studentId?: string
}

export async function register(data: RegisterData) {
  const csrfToken = await getCSRFToken()

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  const bodyRes = await res.json()
  if (!res.ok) {
    const msg = res.status !== 422 ? bodyRes.err : 'Hubo un problema en el registro'
    return { success: false, err: msg }
  }

  return { success: true, data: bodyRes.data.user }
}

export async function login(email: string, password: string) {
  const csrfToken = await getCSRFToken()

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  const bodyRes = await res.json()
  if (!res.ok) {
    const msg = res.status !== 422 ? bodyRes.err : 'Hubo un problema en el login'
    return { success: false, err: msg }
  }

  return { success: true, data: bodyRes.data.user }
}

export async function logout() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  const bodyRes = await res.json()
  if (!res.ok) return { success: false, err: bodyRes.err }
  return { success: true, message: bodyRes.message }
}
