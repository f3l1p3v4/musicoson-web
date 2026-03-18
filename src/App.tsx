import './index.css'

import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { PwaInstallPrompt } from '@/components/pwa-install-prompt'

import { router } from './routes'
export function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="musicoson-theme">
        <Toaster richColors />
        <RouterProvider router={router} />
        <PwaInstallPrompt />
      </ThemeProvider>
    </div>
  )
}


import { useEffect, useState } from 'react';

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // Impede o banner padrão do Chrome
      setInstallPrompt(e); // Guarda o evento para usar no seu botão
    });
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return { installPrompt, handleInstallClick };
}