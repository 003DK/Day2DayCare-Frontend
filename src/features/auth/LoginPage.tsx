import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getFirebaseAuth } from '@/lib/firebase'
import { getMissingFirebaseConfig } from '@/lib/env'

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuthenticatedUser = useAuth((state) => state.setAuthenticatedUser)
  const setDemoUser = useAuth((state) => state.setDemoUser)
  const authError = useAuth((state) => state.authError)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState(import.meta.env.DEV ? 'superadmin' : '')
  const [password, setPassword] = useState(import.meta.env.DEV ? 'superadmin' : '')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const missingConfig = getMissingFirebaseConfig()
  const isDemoCredentials = email.trim().toLowerCase() === 'superadmin' && password === 'superadmin'

  const describeAuthError = (authError: unknown) => {
    if (authError instanceof FirebaseError) {
      switch (authError.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return 'Email or password is incorrect.'
        case 'auth/email-already-in-use':
          return 'An account already exists for this email. Sign in instead.'
        case 'auth/weak-password':
          return 'Choose a password with at least 6 characters.'
        case 'auth/invalid-email':
          return 'Enter a valid email address.'
        case 'auth/popup-closed-by-user':
          return 'The Google sign-in window was closed before sign-in finished.'
        default:
          return authError.message
      }
    }

    return authError instanceof Error
      ? authError.message
      : 'Authentication could not be completed. Please try again.'
  }

  const handleEmailPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      if (import.meta.env.DEV && missingConfig.length > 0) {
        if (!isRegistering && isDemoCredentials) {
          setDemoUser()
          navigate('/dashboard')
          return
        }

        throw new Error(
          'Firebase is not configured. For local testing, use the pre-filled demo username and password.',
        )
      }

      const auth = getFirebaseAuth()
      const credential = isRegistering
        ? await createUserWithEmailAndPassword(auth, email.trim(), password)
        : await signInWithEmailAndPassword(auth, email.trim(), password)

      if (isRegistering) {
        await updateProfile(credential.user, { displayName: displayName.trim() })
      }

      setAuthenticatedUser(
        credential.user.displayName ?? displayName.trim(),
        credential.user.email ?? email.trim(),
      )
      navigate('/dashboard')
    } catch (authError) {
      setError(describeAuthError(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsSubmitting(true)

    try {
      const result = await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider())
      setAuthenticatedUser(result.user.displayName ?? '', result.user.email ?? '')
      navigate('/dashboard')
    } catch (signInError) {
      setError(describeAuthError(signInError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const changeMode = () => {
    setIsRegistering((registering) => {
      const nextMode = !registering
      setEmail(nextMode ? '' : import.meta.env.DEV ? 'superadmin' : '')
      setPassword(nextMode ? '' : import.meta.env.DEV ? 'superadmin' : '')
      setConfirmPassword('')
      setDisplayName('')
      return nextMode
    })
    setError('')
  }

  return (
    <div className="auth-shell">
      <div className="login-card">
        <div className="login-panel login-panel-left">
          <div className="brand-mark">
            <span className="brand-icon">✚</span>
            <div>
              <h1>PhysioCare</h1>
              <p>Clinic Management</p>
            </div>
          </div>
        </div>

        <div className="login-panel login-panel-right">
          <div className="login-header">
            <div className="mini-badge">
              {isRegistering ? 'Create your account' : 'Secure sign-in'}
            </div>
            <h2>{isRegistering ? 'Join Day2Day CARE' : 'Welcome back'}</h2>
            <p>
              {isRegistering
                ? 'Create an account to get started with your clinic workspace.'
                : 'Sign in to manage your clinic operations.'}
            </p>
          </div>

          <div className="google-login">
            {missingConfig.length > 0 ? (
              <p className="auth-config-note" role="status">
                Email/password and Google sign-in need Firebase setup. Add the Firebase values to
                your local .env file and enable Email/Password and Google providers in Firebase
                Authentication.
                {import.meta.env.DEV ? (
                  <> For local dashboard testing, use the pre-filled demo username and password.</>
                ) : null}
              </p>
            ) : null}
            {authError ? (
              <div className="error-message" role="alert">
                {authError}
              </div>
            ) : null}
            {error ? (
              <div className="error-message" role="alert">
                {error}
              </div>
            ) : null}
            <form className="login-form" onSubmit={handleEmailPassword}>
              {isRegistering ? (
                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
              ) : null}
              <label>
                <span>{import.meta.env.DEV ? 'Username or email' : 'Email address'}</span>
                <input
                  type={import.meta.env.DEV ? 'text' : 'email'}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={
                    import.meta.env.DEV ? 'superadmin or you@clinic.com' : 'you@clinic.com'
                  }
                  autoComplete={import.meta.env.DEV ? 'username' : 'email'}
                  required
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isRegistering ? 'At least 6 characters' : 'Enter your password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  minLength={6}
                  required
                />
              </label>
              {isRegistering ? (
                <label>
                  <span>Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </label>
              ) : null}
              <button
                type="submit"
                className="primary-button full-width"
                disabled={
                  isSubmitting ||
                  (missingConfig.length > 0 && !(import.meta.env.DEV && isDemoCredentials))
                }
              >
                {isSubmitting ? (
                  <LoaderCircle className="google-signin-spinner" size={19} aria-hidden="true" />
                ) : null}
                {isSubmitting
                  ? 'Please wait…'
                  : isRegistering
                    ? 'Create account'
                    : import.meta.env.DEV && isDemoCredentials
                      ? 'Sign in to demo dashboard'
                      : 'Sign in with email'}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>
            <button
              type="button"
              className="google-signin-button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting || missingConfig.length > 0}
            >
              {isSubmitting ? (
                <LoaderCircle className="google-signin-spinner" size={19} aria-hidden="true" />
              ) : (
                <svg className="google-signin-icon" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.24l7.73 5.99c4.5-4.15 7.11-10.27 7.11-17.7Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59a14.39 14.39 0 0 1 0-9.18l-7.98-6.19a23.96 23.96 0 0 0 0 21.56l7.98-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.77l-7.73-5.99c-2.14 1.44-4.89 2.29-8.17 2.29-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>
              )}
              Continue with Google
            </button>
            <p className="google-login-caption">
              {isRegistering ? 'Already have an account?' : 'New to Day2Day CARE?'}{' '}
              <button
                type="button"
                className="auth-mode-toggle"
                onClick={changeMode}
                disabled={isSubmitting}
              >
                {isRegistering ? 'Sign in' : 'Register new user'}
              </button>
            </p>
            <Link to="/" className="auth-home-link">
              <ArrowLeft size={16} aria-hidden="true" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
