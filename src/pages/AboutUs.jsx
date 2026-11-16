import { Link } from 'react-router-dom'
import { Award, Calendar, Handshake, Layers, Lightbulb, Megaphone, ShieldCheck, Sparkles, Star, Target, Users } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter.jsx'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import { useLanguage } from '@/i18n/language.js'

const activityPhoto = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=88'
const heroPhoto = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85'
const teamPhoto = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=88'

export default function AboutUs() {
  const { language } = useLanguage()
  const isIndonesian = language === 'id'
  const isChinese = language === 'zh'

  const statistics = [
    { Icon: Calendar, end: 10, suffix: '+', label: isIndonesian ? 'Event terlaksana' : isChinese ? '已举办活动' : 'Events executed' },
    { Icon: Handshake, end: 20, suffix: '+', label: isIndonesian ? 'Brand & mitra' : isChinese ? '品牌与合作伙伴' : 'Brands & partners' },
    { Icon: Star, end: 5, suffix: '+', label: isIndonesian ? 'Tahun pengalaman' : isChinese ? '多年行业经验' : 'Years experience' },
    { Icon: Users, end: 100, suffix: 'K+', label: isIndonesian ? 'Audiens terjangkau' : isChinese ? '覆盖受众超 10 万' : 'Audience reached' },
  ]

  const visionText = isIndonesian
    ? 'Menjadi event organizer terpercaya dan berpengaruh untuk menciptakan pengalaman berkesan dan memberikan nilai lebih bagi klien dan audiens.'
    : isChinese
      ? '成为值得信赖且具有影响力的活动策划伙伴，持续打造让人难忘并为客户与受众创造价值的活动体验。'
      : 'To become a trusted and influential event organizer, creating memorable experiences and greater value for clients and audiences.'

  const missionItems = isIndonesian
    ? [
        { Icon: Lightbulb, title: 'Solusi Inovatif', text: 'Ide dan format event yang segar, relevan dengan tujuan komunikasi klien.' },
        { Icon: Layers, title: 'Terintegrasi', text: 'Perencanaan, produksi, promosi, hingga hari-H berjalan dalam satu alur.' },
        { Icon: Megaphone, title: 'Komunikasi Efektif', text: 'Pesan yang tepat, sampai ke audiens yang tepat, dengan hasil terukur.' },
      ]
    : isChinese
      ? [
          { Icon: Lightbulb, title: '创新方案', text: '以新鲜的创意与活动形式，贴合客户的传播目标。' },
          { Icon: Layers, title: '全流程整合', text: '策划、制作、宣传到现场执行，始终一个流程。' },
          { Icon: Megaphone, title: '有效沟通', text: '把对的信息，在对的时间传递给对的受众，并留下可衡量的结果。' },
        ]
      : [
          { Icon: Lightbulb, title: 'Innovative solutions', text: 'Fresh ideas and formats built around your communication goals.' },
          { Icon: Layers, title: 'Integrated delivery', text: 'Planning, production, promotion, and show day in one single flow.' },
          { Icon: Megaphone, title: 'Effective communication', text: 'The right message, delivered to the right audience, with measurable results.' },
        ]

  const values = isIndonesian
    ? [
        { Icon: Sparkles, title: 'Kreativitas', text: 'Ide segar yang membuat setiap event terasa berbeda.' },
        { Icon: ShieldCheck, title: 'Integritas', text: 'Jujur, transparan, dan konsisten pada setiap janji.' },
        { Icon: Handshake, title: 'Kolaborasi', text: 'Bertumbuh bersama klien, mitra, dan tim.' },
        { Icon: Award, title: 'Keunggulan', text: 'Detail terkecil kami kerjakan dengan standar tinggi.' },
        { Icon: Target, title: 'Berorientasi Hasil', text: 'Setiap keputusan diukur dari dampaknya bagi klien.' },
      ]
    : isChinese
      ? [
          { Icon: Sparkles, title: '创意', text: '用新鲜的创意，让每一场活动都与众不同。' },
          { Icon: ShieldCheck, title: '诚信', text: '坦诚、透明，始终兑现每一个承诺。' },
          { Icon: Handshake, title: '协作', text: '与客户、伙伴和团队一起成长。' },
          { Icon: Award, title: '卓越', text: '再小的细节，也按高标准完成。' },
          { Icon: Target, title: '成果导向', text: '每个决策，都以它为客户带来的实际收获来衡量。' },
        ]
      : [
          { Icon: Sparkles, title: 'Creativity', text: 'Fresh ideas that make every event feel different.' },
          { Icon: ShieldCheck, title: 'Integrity', text: 'Honest, transparent, and consistent with every promise.' },
          { Icon: Handshake, title: 'Collaboration', text: 'Growing together with clients, partners, and the team.' },
          { Icon: Award, title: 'Excellence', text: 'Small details handled to a high standard, every time.' },
          { Icon: Target, title: 'Result driven', text: 'Every decision measured by the impact it creates for clients.' },
        ]

  return (
    <>
      <PageHero
        image={heroPhoto}
        breadcrumb={
          <>
            <Link to="/">{isIndonesian ? 'Beranda' : isChinese ? '首页' : 'Home'}</Link>
            <span aria-hidden="true">›</span>
            {isIndonesian ? 'Tentang Kami' : isChinese ? '关于我们' : 'About Us'}
          </>
        }
        eyebrow={isIndonesian ? 'Tentang Kami' : isChinese ? '关于我们' : 'About Us'}
        title={
          isIndonesian ? (
            <>
              Tim di balik <span className="text-accent-400">event yang hebat</span>
            </>
          ) : isChinese ? (
            <>
              精彩活动<span className="text-accent-400">背后的团队</span>
            </>
          ) : (
            <>
              The people behind <span className="text-accent-400">great events</span>
            </>
          )
        }
        lead={
          isIndonesian
            ? 'Berkah Media Gemilang adalah event planner dan creative partner yang menghadirkan solusi terintegrasi dalam perencanaan, produksi, promosi, hingga eksekusi event.'
            : isChinese
              ? 'Berkah Media Gemilang 是一支为品牌与机构提供全方位活动策划与创意执行的专业团队，覆盖活动规划、制作、宣传与现场执行。'
              : 'Berkah Media Gemilang is an event planning and creative partner delivering integrated solutions in planning, production, promotion, and event execution.'
        }
      />

      {/* Who we are --------------------------------------------------- */}
      <section className="section section--white">
        <Wrap className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <SectionHead
              eyebrow={isIndonesian ? 'Siapa Kami' : isChinese ? '我们是谁' : 'Who We Are'}
              title={
                isIndonesian ? (
                  <>
                    Kami tak hanya mengatur event. <span className="text-accent-600">Kami menciptakan pengalaman.</span>
                  </>
                ) : isChinese ? (
                  <>
                    我们不只是策划活动。<span className="text-accent-600">我们创造难忘体验。</span>
                  </>
                ) : (
                  <>
                    We don't just organize events. <span className="text-accent-600">We create experiences.</span>
                  </>
                )
              }
              lead={
                isIndonesian
                  ? 'BMG hadir sebagai partner strategis untuk membantu brand, perusahaan, dan instansi menciptakan event yang berkesan, berdampak, dan relevan dengan tujuan komunikasi mereka.'
                  : isChinese
                    ? 'BMG 为品牌、企业与机构提供全方位策略支持，帮助他们打造富有感染力、兼具影响力且符合传播目标的活动体验。'
                    : 'BMG is a strategic partner helping brands, companies, and institutions create memorable, impactful events aligned with their communication goals.'
              }
            />
          </div>
          <div className="media-frame aspect-[4/3]">
            <img
              src={activityPhoto}
              alt={isIndonesian ? 'Tim dan peserta mengikuti aktivitas team building BMG' : isChinese ? 'BMG 团队与参与者进行团队建设活动' : 'BMG team and participants taking part in a team-building activity'}
              loading="lazy"
            />
          </div>
        </Wrap>
      </section>

      {/* Stats --------------------------------------------------------- */}
      <section className="section--tight">
        <Wrap className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-white shadow-sm md:grid-cols-4">
          {statistics.map((stat) => (
            <div className="flex flex-col items-center border-r border-line px-4 py-8 text-center last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0" key={stat.label}>
              <stat.Icon size={20} className="text-brand-600" />
              <strong className="stat__value mt-3">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </strong>
              <span className="stat__label mt-2">{stat.label}</span>
            </div>
          ))}
        </Wrap>
      </section>

      {/* Team ---------------------------------------------------------- */}
      <section className="section pt-6">
        <Wrap className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="media-frame aspect-[4/3] lg:order-1">
            <img
              src={teamPhoto}
              alt={isIndonesian ? 'Tim BMG berkolaborasi dalam rapat perencanaan event' : isChinese ? 'BMG 团队在办公室协作' : 'BMG team collaborating in an event planning meeting'}
              loading="lazy"
            />
          </div>
          <div>
            <SectionHead
              eyebrow={isIndonesian ? 'Tim Kami' : isChinese ? '我们的团队' : 'Our Team'}
              title={
                isIndonesian ? (
                  <>
                    Orang-orang di balik <span className="text-accent-600">event yang hebat</span>
                  </>
                ) : isChinese ? (
                  <>
                    精彩活动<span className="text-accent-600">背后的团队</span>
                  </>
                ) : (
                  <>
                    People behind <span className="text-accent-600">great events</span>
                  </>
                )
              }
              lead={
                isIndonesian
                  ? 'Tim profesional dengan pengalaman dan dedikasi tinggi yang siap memastikan setiap detail event berjalan dengan sempurna.'
                  : isChinese
                    ? '我们拥有丰富经验和高度责任心的专业团队，确保每一个细节都被精心把控，活动顺利落地。'
                    : 'A professional team with deep experience and dedication, ready to make sure every detail of your event runs perfectly.'
              }
              className="mb-4"
            />
            <ButtonLink to="/about-us/our-team" variant="primary" className="mt-4">
              {isIndonesian ? 'Kenali tim kami' : isChinese ? '认识我们的团队' : 'Meet the team'}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </Wrap>
      </section>

      {/* Vision & Mission --------------------------------------------- */}
      <section className="section section--white">
        <Wrap>
          <SectionHead
            eyebrow={isIndonesian ? 'Visi & Misi' : isChinese ? '愿景与使命' : 'Vision & Mission'}
            title={
              isIndonesian ? (
                <>
                  Visi dan misi yang <span className="text-accent-600">menggerakkan kami</span>
                </>
              ) : isChinese ? (
                <>
                  驱动我们的<span className="text-accent-600">愿景与使命</span>
                </>
              ) : (
                <>
                  The vision & mission that <span className="text-accent-600">drive us</span>
                </>
              )
            }
          />

          <figure className="card p-6 md:p-10">
            <div className="flex items-start gap-3 md:gap-6">
              <span
                aria-hidden="true"
                className="select-none font-display text-[48px] leading-none text-accent-300 md:text-[76px]"
              >
                &ldquo;
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                  {isIndonesian ? 'Visi Kami' : isChinese ? '我们的愿景' : 'Our Vision'}
                </p>
                <blockquote className="mt-3 max-w-4xl font-display text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink-900 md:mt-4 md:text-[24px] md:leading-[1.4]">
                  {visionText}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-[13px] font-semibold text-muted">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent-500" />
                  Berkah Media Gemilang
                </figcaption>
              </div>
            </div>
          </figure>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 md:mt-10">
            {isIndonesian ? 'Misi Kami' : isChinese ? '我们的使命' : 'Our Mission'}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {missionItems.map((item, index) => (
              <article className="card card--hover h-full p-5" key={item.title}>
                <div className="flex items-start justify-between">
                  <div className="icon-badge icon-badge--accent icon-badge--sm">
                    <item.Icon size={20} />
                  </div>
                  <span className="font-display text-xs font-bold text-muted-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 text-[16px] font-bold leading-snug text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Values -------------------------------------------------------- */}
      <section className="section">
        <Wrap>
          <SectionHead
            eyebrow={isIndonesian ? 'Nilai Kami' : isChinese ? '我们的价值观' : 'Our Values'}
            title={
              isIndonesian ? (
                <>
                  Lima nilai yang <span className="text-accent-600">kami pegang</span>
                </>
              ) : isChinese ? (
                <>
                  我们坚持的<span className="text-accent-600">五项价值观</span>
                </>
              ) : (
                <>
                  Five values we <span className="text-accent-600">stand for</span>
                </>
              )
            }
            lead={
              isIndonesian
                ? 'Cara kami bekerja setiap hari, dari rapat pertama sampai event selesai.'
                : isChinese
                  ? '从第一次会议到活动收尾，我们每天的工作方式。'
                  : 'How we work every day, from the first meeting to the final load-out.'
            }
            className="max-w-2xl"
          />

          <div className="grid gap-4 md:grid-cols-6">
            {values.map((value, index) => (
              <article
                className={`card card--hover p-5 ${index < 3 ? 'md:col-span-2' : 'md:col-span-3'}`}
                key={value.title}
              >
                <div className="icon-badge icon-badge--sm">
                  <value.Icon size={20} />
                </div>
                <h3 className="mt-4 text-[16px] font-bold leading-snug text-ink-900">{value.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

       {/* CTA ---------------------------------------------------------- */}
       <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${activityPhoto})` }}>
         <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.83),rgba(7,14,28,.72)),var(--hero-image)] bg-center bg-cover" />
         <Wrap className="relative z-[1]">
           <div className="max-w-3xl" data-enter>
             <Eyebrow dark accent>
               {isIndonesian ? 'Layanan Kami' : isChinese ? '我们的服务' : 'Our Services'}
             </Eyebrow>
             <h2 className="h2 mt-5">
               {isIndonesian ? (
                 <>
                   Temukan layanan <span className="text-accent-400">yang Anda butuhkan</span>
                 </>
               ) : isChinese ? (
                 <>
                   找到您需要的<span className="text-accent-400">活动服务</span>
                 </>
               ) : (
                 <>
                   Find the <span className="text-accent-400">services</span> you need
                 </>
               )}
             </h2>
             <p className="lead lead--onDark mt-5 max-w-[560px]">
               {isIndonesian
                 ? 'Jelajahi layanan kami dan temukan solusi terbaik untuk event Anda.'
                 : isChinese
                   ? '探索我们的服务，为您的活动找到最佳解决方案。'
                   : 'Explore our services and find the best solution for your event.'}
             </p>
             <div className="hero__actions">
               <ButtonLink to="/services" variant="accent">
                 {isIndonesian ? 'Lihat Layanan' : isChinese ? '查看服务' : 'View Services'}
                 <span className="btn__icon" aria-hidden="true">→</span>
               </ButtonLink>
             </div>
           </div>
         </Wrap>
       </section>
    </>
  )
}
