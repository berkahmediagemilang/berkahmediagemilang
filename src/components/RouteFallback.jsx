import { PartyPopper } from 'lucide-react'
import { useLanguage } from '@/i18n/language.js'

/**
 * Placeholder shown while a lazily loaded page chunk is in flight.
 *
 * The ring + brand icon sit at the centre with a title and a short line under
 * it, so the pause reads as part of the product rather than a blank screen.
 */
export default function RouteFallback() {
  const { language } = useLanguage()

  const copy =
    language === 'id'
      ? { title: 'Memuat halaman', hint: 'Menyiapkan pengalaman untuk Anda' }
      : language === 'zh'
        ? { title: '正在加载页面', hint: '正在为您准备内容' }
        : { title: 'Loading page', hint: 'Preparing your experience' }

  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__mark" aria-hidden="true">
        <span className="loader__ring" />
        <span className="loader__icon">
          <PartyPopper size={22} />
        </span>
      </span>
      <div className="loader__copy">
        <p className="loader__title">{copy.title}</p>
        <p className="loader__hint">{copy.hint}</p>
      </div>
    </div>
  )
}