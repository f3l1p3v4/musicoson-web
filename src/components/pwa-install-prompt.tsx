import { Download, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setInstallPrompt(null)
    }
  }

  if (!installPrompt || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] flex items-center justify-between gap-3 overflow-hidden rounded-xl bg-card p-4 shadow-2xl ring-1 ring-border sm:left-auto sm:w-[380px]">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground">Instalar Aplicativo</h3>
        <p className="text-xs text-muted-foreground leading-tight">
          Adicione o MusicosOn à sua tela inicial para um acesso mais rápido e imediato.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleInstallClick}
          size="sm"
          className="h-8 rounded-full px-4 text-xs font-bold"
        >
          <Download className="mr-1 h-3 w-3" />
          Instalar
        </Button>
        <button
          onClick={() => setIsDismissed(true)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
