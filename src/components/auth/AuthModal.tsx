'use client'

import { useEffect } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { X } from 'lucide-react'
import { useLoginModal } from '@/lib/context/AuthContext'

export function AuthModal() {
  const { isAuthModalOpen, modalType, closeAuthModal } = useLoginModal()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAuthModal()
      }
    }

    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isAuthModalOpen, closeAuthModal])

  if (!isAuthModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md mx-4">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {modalType === 'login' ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  )
} 