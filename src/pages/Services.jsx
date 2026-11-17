import { Link } from 'react-router-dom'
import { ArrowRight, Lightbulb, Play, Search, Settings, Target, TrendingUp } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import { localized, services } from '@/data/services.js'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/services.js'
import en from '@/i18n/locale/en/services.js'
import zh from '@/i18n/locale/zh/services.js'

const heroPhoto = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85'
const ctaPhoto = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=88'

const stepIcons = [Search, Target, Lightbulb, Settings, Play, TrendingUp]

export default function Services() {
  const { language } = useLanguage()
  const t = useStrings({ id, en, zh })
  const local = (field) => localized(field, language)

  return (
    <>
      <PageHero
        image={heroPhoto}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.services}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      {/* Service cards ------------------------------------------------- */}
      <section className="section">
        <Wrap>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const serviceTitle = local(service.title)
              return (
                <Link
                  className="card card--hover group overflow-hidden"
                  key={service.slug}
                  to={`/services/${service.slug}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={service.image}
                      alt={`${serviceTitle} ${t.serviceAlt}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" aria-hidden="true" />
                    <span className="chip absolute left-4 top-4 bg-white/92 text-ink-900">
                      {local(service.category)}
                    </span>
                  </div>
                  <div className="p-7">
                    <span className="font-display text-sm font-bold text-brand-600">{service.number}</span>
                    <h3 className="h3 mt-2">{serviceTitle}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{local(service.text)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                      {t.learnMore}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Wrap>
      </section>

      {/* Approach ------------------------------------------------------- */}
      <section className="section section--dark">
        <Wrap>
          <SectionHead
            dark
            eyebrow={t.approach.eyebrow}
            title={<>{t.approach.title.replace(t.approach.titleAccent, '')}<span className="text-accent-400">{t.approach.titleAccent}</span></>}
          />
          <div className="timeline">
            {t.approach.steps.map((step, index) => {
              const StepIcon = stepIcons[index]
              const side = index % 2 === 0 ? 'left' : 'right'
              return (
                <div className="timeline__row" key={step.number}>
                  <div className="timeline__icon">
                    <StepIcon size={18} />
                  </div>
                  <div className={`timeline__card card card--dark p-6 sm:max-w-[430px] ${side === 'left' ? 'timeline__card--left' : 'timeline__card--right'}`}>
                    <span className="text-xs font-bold tracking-[0.14em] text-brand-300">{step.number}</span>
                    <h3 className="h3 mt-2 text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/62">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Wrap>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${ctaPhoto})` }}>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.88),rgba(7,14,28,.76)),var(--hero-image)] bg-cover bg-center" aria-hidden="true" />
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
              <ButtonLink to="/contact" variant="accent">
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