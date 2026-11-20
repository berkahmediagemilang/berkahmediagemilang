import { Link } from 'react-router-dom'
import { ArrowRight, Headset, LifeBuoy, MessageCircleQuestion, ShieldCheck } from 'lucide-react'
import { PageHero, Wrap } from '../components/ui.jsx'
import { useLanguage } from '../i18n/language.js'

export default function Help() {
  const { language } = useLanguage()
  const isIndonesian = language === 'id'
  const isChinese = language === 'zh'

  const tiles = isIndonesian
    ? [
        { to: '/contact', icon: Headset, title: 'Hubungi Kami', desc: 'Kirim pesan lewat formulir kontak kami.', cta: 'Ke halaman kontak' },
        { to: '/privacy', icon: ShieldCheck, title: 'Kebijakan Privasi', desc: 'Pelajari bagaimana kami melindungi data Anda.', cta: 'Baca kebijakan privasi' },
        { to: '/faq', icon: MessageCircleQuestion, title: 'FAQ', desc: 'Lihat pertanyaan yang sering diajukan.', cta: 'Buka FAQ' },
      ]
    : isChinese
      ? [
          { to: '/contact', icon: Headset, title: '联系我们', desc: '通过联系表单给我们留言。', cta: '前往联系页面' },
          { to: '/privacy', icon: ShieldCheck, title: '隐私政策', desc: '了解我们如何保护您的数据。', cta: '阅读隐私政策' },
          { to: '/faq', icon: MessageCircleQuestion, title: '常见问题', desc: '查看常见问题。', cta: '打开常见问题' },
        ]
      : [
          { to: '/contact', icon: Headset, title: 'Contact Us', desc: 'Send us a message through our contact form.', cta: 'Go to contact page' },
          { to: '/privacy', icon: ShieldCheck, title: 'Privacy Policy', desc: 'Learn how we protect your data.', cta: 'Read privacy policy' },
          { to: '/faq', icon: MessageCircleQuestion, title: 'FAQ', desc: 'See frequently asked questions.', cta: 'Open FAQ' },
        ]

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{isIndonesian ? 'Beranda' : isChinese ? '首页' : 'Home'}</Link>
            <span aria-hidden="true">›</span>
            {isIndonesian ? 'Pusat Bantuan' : isChinese ? '帮助中心' : 'Help Center'}
          </>
        }
        eyebrow={isIndonesian ? 'Bantuan' : isChinese ? '帮助' : 'Help'}
        title={isIndonesian ? <>Pusat <span className="text-accent-400">Bantuan</span></> : isChinese ? <>帮助<span className="text-accent-400">中心</span></> : <>Help <span className="text-accent-400">Center</span></>}
        lead={isIndonesian ? 'Butuh bantuan? Hubungi tim BMG atau lihat tautan di bawah ini.' : isChinese ? '需要帮助？请联系 BMG 团队或查看以下链接。' : 'Need help? Contact the BMG team or see the links below.'}
      />
      <section className="section section--white">
        <Wrap className="max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[12px] font-semibold text-muted">
            <LifeBuoy size={14} aria-hidden="true" className="text-brand-600" />
            {isIndonesian ? 'Pilih salah satu — kami jawab secepatnya.' : isChinese ? '任选其一 —— 我们会尽快回复。' : 'Pick one — we get back to you fast.'}
          </p>
          <div className="help-tiles mt-5">
            {tiles.map(({ to, icon: Icon, title, desc, cta }) => (
              <Link key={to} to={to} className="help-tile">
                <span className="help-tile__icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <h2 className="help-tile__title">{title}</h2>
                <p className="help-tile__desc">{desc}</p>
                <span className="help-tile__cta">
                  {cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}
