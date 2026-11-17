import { PartyPopper } from 'lucide-react'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/common.js'
import en from '@/i18n/locale/en/common.js'
import zh from '@/i18n/locale/zh/common.js'

/**
 * Placeholder shown while a lazily loaded page chunk is in flight.
 *
 * The ring + brand icon sit at the centre with a title and a short line under
 * it, so the pause reads as part of the product rather than a blank screen.
 */
export default function RouteFallback() {
  const t = useStrings({ id, en, zh })

  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__mark" aria-hidden="true">
        <span className="loader__ring" />
        <span className="loader__icon">
          <PartyPopper size={22} />
        </span>
      </span>
      <div className="loader__copy">
        <p className="loader__title">{t.loader.title}</p>
        <p className="loader__hint">{t.loader.hint}</p>
      </div>
    </div>
  )
}