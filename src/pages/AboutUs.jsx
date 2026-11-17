import { Link } from 'react-router-dom'
import { Award, Calendar, Handshake, Layers, Lightbulb, Megaphone, ShieldCheck, Sparkles, Star, Target, Users } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter.jsx'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/about-us.js'
import en from '@/i18n/locale/en/about-us.js'
import zh from '@/i18n/locale/zh/about-us.js'

const activityPhoto = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=88'
const heroPhoto = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85'
const teamPhoto = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=88'

const statIcons = [Calendar, Handshake, Star, Users]
const missionIcons = [Lightbulb, Layers, Megaphone]
const valueIcons = [Sparkles, ShieldCheck, Handshake, Award, Target]

export default function AboutUs() {
  const t = useStrings({ id, en, zh })

  return (
    <>
      <PageHero
        image={heroPhoto}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.about}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      {/* Who we are --------------------------------------------------- */}
      <section className="section section--white">
        <Wrap className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <SectionHead
              eyebrow={t.whoWeAre.eyebrow}
              title={<>{t.whoWeAre.title.replace(t.whoWeAre.titleAccent, '')}<span className="text-accent-600">{t.whoWeAre.titleAccent}</span></>}
              lead={t.whoWeAre.lead}
            />
          </div>
          <div className="media-frame aspect-[4/3]">
            <img
              src={activityPhoto}
              alt={t.whoWeAre.imageAlt}
              loading="lazy"
            />
          </div>
        </Wrap>
      </section>

      {/* Stats --------------------------------------------------------- */}
      <section className="section--tight">
        <Wrap className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-white shadow-sm md:grid-cols-4">
          {t.stats.map((stat, index) => {
            const Icon = statIcons[index]
            return (
              <div className="flex flex-col items-center border-r border-line px-4 py-8 text-center last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0" key={stat.label}>
                <Icon size={20} className="text-brand-600" />
                <strong className="stat__value mt-3">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </strong>
                <span className="stat__label mt-2">{stat.label}</span>
              </div>
            )
          })}
        </Wrap>
      </section>

      {/* Team ---------------------------------------------------------- */}
      <section className="section pt-6">
        <Wrap className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="media-frame aspect-[4/3] lg:order-1">
            <img
              src={teamPhoto}
              alt={t.team.imageAlt}
              loading="lazy"
            />
          </div>
          <div>
            <SectionHead
              eyebrow={t.team.eyebrow}
              title={<>{t.team.title.replace(t.team.titleAccent, '')}<span className="text-accent-600">{t.team.titleAccent}</span></>}
              lead={t.team.lead}
              className="mb-4"
            />
            <ButtonLink to="/about-us/our-team" variant="primary" className="mt-4">
              {t.team.cta}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </Wrap>
      </section>

      {/* Vision & Mission --------------------------------------------- */}
      <section className="section section--white">
        <Wrap>
          <SectionHead
            eyebrow={t.visionMission.eyebrow}
            title={<>{t.visionMission.title.replace(t.visionMission.titleAccent, '')}<span className="text-accent-600">{t.visionMission.titleAccent}</span></>}
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
                  {t.visionMission.visionLabel}
                </p>
                <blockquote className="mt-3 max-w-4xl font-display text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink-900 md:mt-4 md:text-[24px] md:leading-[1.4]">
                  {t.visionMission.visionText}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-[13px] font-semibold text-muted">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent-500" />
                  Berkah Media Gemilang
                </figcaption>
              </div>
            </div>
          </figure>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 md:mt-10">
            {t.visionMission.missionLabel}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {t.visionMission.missions.map((item, index) => {
              const Icon = missionIcons[index]
              return (
                <article className="card card--hover h-full p-5" key={item.title}>
                  <div className="flex items-start justify-between">
                    <div className="icon-badge icon-badge--accent icon-badge--sm">
                      <Icon size={20} />
                    </div>
                    <span className="font-display text-xs font-bold text-muted-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold leading-snug text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.text}</p>
                </article>
              )
            })}
          </div>
        </Wrap>
      </section>

      {/* Values -------------------------------------------------------- */}
      <section className="section">
        <Wrap>
          <SectionHead
            eyebrow={t.values.eyebrow}
            title={<>{t.values.title.replace(t.values.titleAccent, '')}<span className="text-accent-600">{t.values.titleAccent}</span></>}
            lead={t.values.lead}
            className="max-w-2xl"
          />

          <div className="grid gap-4 md:grid-cols-6">
            {t.values.items.map((value, index) => {
              const Icon = valueIcons[index]
              return (
                <article
                  className={`card card--hover p-5 ${index < 3 ? 'md:col-span-2' : 'md:col-span-3'}`}
                  key={value.title}
                >
                  <div className="icon-badge icon-badge--sm">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold leading-snug text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{value.text}</p>
                </article>
              )
            })}
          </div>
        </Wrap>
      </section>

       {/* CTA ---------------------------------------------------------- */}
       <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${activityPhoto})` }}>
         <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.83),rgba(7,14,28,.72)),var(--hero-image)] bg-center bg-cover" />
         <Wrap className="relative z-[1]">
           <div className="max-w-3xl" data-enter>
             <Eyebrow dark accent>
               {t.cta.eyebrow}
             </Eyebrow>
             <h2 className="h2 mt-5">
               {t.cta.title.replace(t.cta.titleAccent, '')}<span className="text-accent-400">{t.cta.titleAccent}</span>
             </h2>
             <p className="lead lead--onDark mt-5 max-w-[560px]">
               {t.cta.lead}
             </p>
             <div className="hero__actions">
               <ButtonLink to="/services" variant="accent">
                 {t.cta.button}
                 <span className="btn__icon" aria-hidden="true">→</span>
               </ButtonLink>
             </div>
           </div>
         </Wrap>
       </section>
    </>
  )
}