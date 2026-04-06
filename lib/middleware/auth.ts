import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tokencps-dev-secret-key-min-32-chars!!'
)

export async function signToken(payload: { userId: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return payload as { userId: string; role: string }
}

export async function getAuthUser(request: Request) {
  try {
    const auth = request.headers.get('Authorization')
    if (!auth?.startsWith('Bearer ')) return null
    const token = auth.slice(7)
    return await verifyToken(token)
  } catch {
    return null
  }
}

export async function requireAuth(request: Request) {
  const user = await getAuthUser(request)
  if (!user) {
    throw NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    )
  }
  return user
}

export async function requireRole(request: Request, roles: string[]) {
  const user = await requireAuth(request)
  if (!roles.includes(user.role)) {
    throw NextResponse.json(
      { success: false, message: 'Insufficient permissions' },
      { status: 403 }
    )
  }
  return user
}
