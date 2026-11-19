import { useLanguage } from '@/i18n/language.js'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <select
        className="language-switcher__select"
        aria-label="Pilih bahasa / Select language / 选择语言"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="id">IDN</option>
        <option value="en">ENG</option>
        <option value="zh">CHN</option>
      </select>
      <span className="language-switcher__arrow" aria-hidden="true">⌄</span>
    </div>
  )
}