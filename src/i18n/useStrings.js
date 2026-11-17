import { useLanguage } from '@/i18n/language.js'

/**
 * Pick the active language's strings from a `{ id, en, zh }` bundle.
 * Each page imports its own three locale files, so the strings land in that
 * page's chunk instead of the entry bundle.
 */
export function useStrings(bundle) {
  const { language } = useLanguage()
  return bundle[language] ?? bundle.id
}