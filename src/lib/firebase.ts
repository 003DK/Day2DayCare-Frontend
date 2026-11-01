import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { env, getMissingFirebaseConfig } from '@/lib/env'

export function getFirebaseAuth(): Auth {
  const missingConfig = getMissingFirebaseConfig()

  if (missingConfig.length > 0) {
    throw new Error(`Add these Firebase settings to your .env file: ${missingConfig.join(', ')}`)
  }

  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey: env.VITE_FIREBASE_API_KEY,
          authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: env.VITE_FIREBASE_PROJECT_ID,
          appId: env.VITE_FIREBASE_APP_ID,
        })

  return getAuth(app)
}
