import { Link } from 'react-router-dom'
import { BookOpen, FileText, Link2, RefreshCw, ScrollText, ShieldAlert } from 'lucide-react'
import { ButtonLink, PageHero, Wrap } from '../components/ui.jsx'
import { useLanguage } from '../i18n/language.js'

export default function TermsCondition() {
  const { language } = useLanguage()
  const isIndonesian = language === 'id'
  const isChinese = language === 'zh'

  const sections = isIndonesian
    ? [
        { icon: ScrollText, title: '1. Ketentuan Umum', body: 'Dengan mengakses situs BMG, Anda menyetujui ketentuan penggunaan ini. Situs ini disediakan untuk informasi layanan dan portofolio event BMG.' },
        { icon: FileText, title: '2. Penggunaan Konten', body: 'Seluruh konten, gambar, dan materi di situs ini adalah milik BMG dan tidak boleh digunakan ulang tanpa izin tertulis.' },
        { icon: Link2, title: '3. Tautan Pihak Ketiga', body: 'Situs ini dapat memuat tautan ke layanan pihak ketiga. BMG tidak bertanggung jawab atas konten atau kebijakan privasi situs tersebut.' },
        { icon: ShieldAlert, title: '4. Batasan Tanggung Jawab', body: 'Informasi di situs ini bersifat umum. BMG tidak bertanggung jawab atas kerugian yang timbul dari penggunaan informasi tersebut.' },
        { icon: RefreshCw, title: '5. Perubahan Ketentuan', body: 'Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini.' },
      ]
    : isChinese
      ? [
          { icon: ScrollText, title: '1. 一般条款', body: '访问 BMG 网站即表示您同意本使用条款。本网站提供 BMG 的服务信息与活动作品。' },
          { icon: FileText, title: '2. 内容使用', body: '本网站的所有内容、图片与素材均为 BMG 所有，未经书面许可不得转载使用。' },
          { icon: Link2, title: '3. 第三方链接', body: '本网站可能包含第三方服务的链接。BMG 不对这些网站的内容或隐私政策负责。' },
          { icon: ShieldAlert, title: '4. 责任限制', body: '本网站信息仅供参考。BMG 不对因使用这些信息而产生的损失承担责任。' },
          { icon: RefreshCw, title: '5. 条款变更', body: '本条款可能随时更新，最新版本始终发布在本页面。' },
        ]
      : [
          { icon: ScrollText, title: '1. General Terms', body: 'By accessing the BMG website, you agree to these terms of use. This site provides information about BMG services and event portfolio.' },
          { icon: FileText, title: '2. Content Use', body: 'All content, images, and materials on this site belong to BMG and may not be reused without written permission.' },
          { icon: Link2, title: '3. Third-Party Links', body: 'This site may contain links to third-party services. BMG is not responsible for the content or privacy policies of those sites.' },
          { icon: ShieldAlert, title: '4. Limitation of Liability', body: 'Information on this site is general in nature. BMG is not liable for any loss arising from the use of this information.' },
          { icon: RefreshCw, title: '5. Changes to Terms', body: 'These terms may be updated at any time. The latest version is always available on this page.' },
        ]

  const tocTitle = isIndonesian ? 'Isi Halaman' : isChinese ? '本页目录' : 'On This Page'
  const scopeLabel = isIndonesian ? 'Situs & layanan BMG' : isChinese ? 'BMG 网站与服务' : 'BMG website & services'
  const sectionCount = isIndonesian
    ? `${sections.length} bagian`
    : isChinese
      ? `共 ${sections.length} 节`
      : `${sections.length} sections`
  const shortTitle = (title) => title.replace(/^\d+\.\s*/, '')

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{isIndonesian ? 'Beranda' : isChinese ? '首页' : 'Home'}</Link>
            <span aria-hidden="true">›</span>
            {isIndonesian ? 'Syarat & Ketentuan' : isChinese ? '条款与条件' : 'Terms & Conditions'}
          </>
        }
        eyebrow={isIndonesian ? 'Bantuan' : isChinese ? '帮助' : 'Help'}
        title={isIndonesian ? <>Syarat & <span className="text-accent-400">Ketentuan</span></> : isChinese ? <>条款<span className="text-accent-400">与条件</span></> : <>Terms & <span className="text-accent-400">Conditions</span></>}
        lead={isIndonesian ? 'Ketentuan penggunaan situs dan layanan BMG.' : isChinese ? 'BMG 网站与服务的使用条款。' : 'Terms of use for the BMG website and services.'}
      />
      <section className="section section--white">
        <Wrap className="max-w-6xl">
          <div className="doc-meta">
            <span className="chip">
              <ScrollText size={14} aria-hidden="true" />
              {scopeLabel}
            </span>
            <span className="chip">
              <BookOpen size={14} aria-hidden="true" />
              {sectionCount}
            </span>
          </div>

          <div className="doc-layout">
            <nav className="doc-toc doc-sidebar" aria-label={tocTitle}>
              <p className="doc-toc__title">
                <BookOpen size={14} aria-hidden="true" />
                {tocTitle}
              </p>
              <ul className="doc-toc__grid">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a className="doc-toc__link" href={`#terms-${index + 1}`}>
                      <span className="doc-toc__num" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {shortTitle(section.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              {sections.map((section, index) => {
                const Icon = section.icon
                const anchor = `terms-${index + 1}`
                return (
                  <section className="doc-section" id={anchor} key={section.title} aria-labelledby={`${anchor}-title`}>
                    <div className="doc-section__head">
                      <span className="icon-badge icon-badge--accent" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                      <h2 className="h3" id={`${anchor}-title`}>{section.title}</h2>
                    </div>
                    <p>{section.body}</p>
                  </section>
                )
              })}

              <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-8">
                <ButtonLink to="/contact" variant="primary">
                  {isIndonesian ? 'Hubungi Kami' : isChinese ? '联系我们' : 'Contact Us'}
                  <span className="btn__icon" aria-hidden="true">→</span>
                </ButtonLink>
                <Link to="/privacy" className="btn btn--outline">
                  {isIndonesian ? 'Kebijakan Privasi' : isChinese ? '隐私政策' : 'Privacy Policy'}
                </Link>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}
