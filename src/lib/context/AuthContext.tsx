'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type LoginModalContextType = {
  isAuthModalOpen: boolean
  modalType: 'login' | 'register'
  openLoginModal: () => void
  openRegisterModal: () => void
  closeAuthModal: () => void
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined)

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'login' | 'register'>('login')

  const openLoginModal = () => {
    setModalType('login')
    setIsAuthModalOpen(true)
  }

  const openRegisterModal = () => {
    setModalType('register')
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <LoginModalContext.Provider
      value={{
        isAuthModalOpen,
        modalType,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  )
}

export function useLoginModal() {
  const context = useContext(LoginModalContext)
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider')
  }
  return context
} 