import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/utils'

export default function BotaoWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  )
}
