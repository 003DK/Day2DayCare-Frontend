import { z } from 'zod'

const schema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
})

export const env = schema.parse(import.meta.env)

const firebaseConfig = {
  VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
}

export function getMissingFirebaseConfig() {
  return Object.entries(firebaseConfig)
    .filter(([, value]) => !value?.trim())
    .map(([key]) => key)
}

export function isFirebaseConfigured() {
  return getMissingFirebaseConfig().length === 0
}
