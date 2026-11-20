import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/our-team.js'
import en from '@/i18n/locale/en/our-team.js'
import zh from '@/i18n/locale/zh/our-team.js'

const heroPhoto =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85'
const portrait = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`

const ctaPhoto =
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=88'

const teamMeta = [
  { name: 'Andika Pratama', src: portrait('photo-1560250097-0b93528c311a') },
  { name: 'Lintang Ayudya', src: portrait('photo-1573497019940-1c28c88b4f3e') },
  { name: 'Sinta Dewi', src: portrait('photo-1573496359142-b8d87734a5a2') },
  { name: 'Rafi Akbar', src: portrait('photo-1507003211169-0a1dd7228f2d') },
  { name: 'Dimas Saputra', src: portrait('photo-1500648767791-00dcc994a43e') },
  { name: 'Fajar Ramadhan', src: portrait('photo-1506794778202-cad84cf45f1d') },
  { name: 'Ayu Lestari', src: portrait('photo-1580489944761-15a19d654956') },
  { name: 'Aditya Nugraha', src: portrait('photo-1472099645785-5658abf4ff4e') },
  { name: 'Nadia Putri', src: portrait('photo-1531123897727-8f129e1688ce') },
  { name: 'Bimo Aji', src: portrait('photo-1519085360753-af0119f7cbe7') },
  { name: 'Galih Prakoso', initials: 'GP' },
  { name: 'Maya Anindita', initials: 'MA' },
  { name: 'Satria Wibowo', initials: 'SW' },
]

export default function OurTeam() {
  const t = useStrings({ id, en, zh })
  const [selected, setSelected] = useState(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const isOpen = selected !== null

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }
    const previousOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lastTriggerRef.current?.focus()
    }
  }, [isOpen])

  const team = t.team.map((member, i) => ({ ...teamMeta[i], ...member }))

  const openMember = (member, trigger) => {
    lastTriggerRef.current = trigger
    setSelected(member)
  }

  return (
    <>
      <PageHero
        image={heroPhoto}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            <Link to="/about-us">{t.breadcrumb.about}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.team}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      <section className="section">
        <Wrap>
          <div className="section-head">
            <h2 className="h2">{t.listTitle.replace(t.listTitleAccent, '')}<span className="text-accent-400">{t.listTitleAccent}</span></h2>
            <p className="lead mt-4 max-w-[560px]">{t.listLead}</p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <li key={member.name}>
                <article className="card card--hover flex h-full flex-col items-center p-6 text-center">
                  {member.src ? (
                    <img
                      className="h-32 w-32 rounded-full border-4 border-white object-cover object-top shadow-md"
                      src={member.src}
                      alt={`${member.name}: ${member.role}`}
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="grid h-32 w-32 place-items-center rounded-full border-4 border-white bg-brand-50 text-3xl font-bold text-brand-700 shadow-md"
                      aria-hidden="true"
                    >
                      {member.initials}
                    </span>
                  )}
                  <h3 className="h3 mt-5 text-[17px] leading-snug">{member.name}</h3>
                  <span className="chip mt-2 bg-brand-50 text-brand-700">{member.role}</span>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{member.bio}</p>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm mt-5"
                    aria-haspopup="dialog"
                    onClick={(event) => openMember(member, event.currentTarget)}
                  >
                    {t.viewDetail}
                    <span className="btn__icon" aria-hidden="true">→</span>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${ctaPhoto})` }}>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.88),rgba(7,14,28,.76)),var(--hero-image)] bg-cover bg-center" aria-hidden="true" />
        <Wrap className="relative z-[1]">
          <div className="max-w-3xl" data-enter>
            <Eyebrow dark accent>
              {t.cta.eyebrow}
            </Eyebrow>
            <h2 className="h2 mt-5">{t.cta.title.replace(t.cta.titleAccent, '')}<span className="text-accent-400">{t.cta.titleAccent}</span></h2>
            <p className="lead lead--onDark mt-4 max-w-[560px]">{t.cta.lead}</p>
            <div className="hero__actions">
              <ButtonLink
                to="/contact"
                variant="accent"
              >
                {t.cta.button}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Wrap>
      </section>

        {selected ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/70 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
            onClick={() => setSelected(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="our-team-modal-title"
              className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[24px] bg-white p-6 text-center shadow-xl sm:rounded-[24px] sm:p-8 animate-modal-in"
              onClick={(event) => event.stopPropagation()}
            >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t.closeLabel}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-brand-50 hover:text-ink-900"
              onClick={() => setSelected(null)}
            >
              <X size={20} aria-hidden="true" />
            </button>

            {selected.src ? (
              <img
                className="mx-auto h-36 w-36 rounded-full border-4 border-brand-50 object-cover object-top shadow-md"
                src={selected.src}
                alt={`${selected.name}: ${selected.role}`}
              />
            ) : (
              <span
                className="mx-auto grid h-36 w-36 place-items-center rounded-full border-4 border-brand-50 bg-brand-50 text-4xl font-bold text-brand-700 shadow-md"
                aria-hidden="true"
              >
                {selected.initials}
              </span>
            )}

            <h3 id="our-team-modal-title" className="h3 mt-5">{selected.name}</h3>
            <span className="chip mt-2 bg-brand-50 text-brand-700">{selected.role}</span>

            <p className="mt-4 text-[15px] leading-relaxed text-muted">{selected.detail}</p>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">{t.focusLabel}</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {selected.focus.map((item) => (
                <li key={item} className="chip bg-brand-50 text-brand-700">{item}</li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center">
              <ButtonLink to="/contact" variant="accent" onClick={() => setSelected(null)}>
                {t.modalCta}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  )
}