import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Clock, Lock, Mail, MapPin, MessageSquare, Phone, User } from 'lucide-react'
import { PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'
import id from '@/i18n/locale/id/contact.js'
import en from '@/i18n/locale/en/contact.js'
import zh from '@/i18n/locale/zh/contact.js'

const contactPhoto = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1100&q=85'
const contactHeroPhoto = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [phone, setPhone] = useState()
  const t = useStrings({ id, en, zh })

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Inquiry — ${form.get('inquiry') || 'Event'}`)
    const body = encodeURIComponent(
      `Nama: ${form.get('name')}\nEmail: ${form.get('email')}\nTelepon: ${phone || ''}\n\n${form.get('message')}`
    )
    window.location.href = `mailto:hello@bmg.co.id?subject=${subject}&body=${body}`
    setSent(true)
  }

  const details = [
    {
      Icon: MapPin,
      label: t.details.address,
      value: t.details.addressValue,
    },
    {
      Icon: Mail,
      label: 'Email',
      value: 'hello@bmg.co.id',
      href: 'mailto:hello@bmg.co.id',
    },
    {
      Icon: Phone,
      label: t.details.phone,
      value: '+62 812-3456-7890',
      href: 'tel:+6281234567890',
    },
    {
      Icon: Clock,
      label: t.details.hours,
      value: t.details.hoursValue,
    },
  ]

  return (
    <>
      <PageHero
        image={contactHeroPhoto}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.contact}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      <section className="section section--tight">
        <Wrap className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Form ------------------------------------------------------- */}
          <form className="card p-7 md:p-9" onSubmit={handleSubmit}>
            <h2 className="h3 text-[22px]">{t.form.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {t.form.subtitle}
            </p>

            <div className="mt-6">
              <label className="label" htmlFor="contact-name">
                {t.form.name} <span className="font-bold text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="input-wrap">
                <User size={17} aria-hidden="true" />
                <input
                  className="input"
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t.form.namePlaceholder}
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="contact-email">
                {t.form.email} <span className="font-bold text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="input-wrap">
                <Mail size={17} aria-hidden="true" />
                <input
                  className="input"
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="email@domain.com"
                  required
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="contact-phone">
                  {t.form.phone} <span className="font-bold text-red-600" aria-hidden="true">*</span>
                </label>
                <PhoneInput
                  className="input-wrap"
                  flags={flags}
                  defaultCountry="ID"
                  international
                  countryCallingCodeEditable={false}
                  value={phone}
                  onChange={setPhone}
                  required
                  autoComplete="tel"
                  numberInputProps={{
                    id: 'contact-phone',
                    className: 'input',
                    placeholder: '812 3456 7890',
                  }}
                />
              </div>

              <div>
                <label className="label" htmlFor="contact-inquiry">
                  {t.form.inquiry}
                </label>
                <div className="input-wrap relative">
                  <select
                    className="w-full cursor-pointer appearance-none border-0 bg-transparent pr-6 text-[14px] text-ink-900 outline-0"
                    id="contact-inquiry"
                    name="inquiry"
                    defaultValue="Event Planning"
                  >
                    <option>Event Planning</option>
                    <option>Event Production</option>
                    <option>Brand Activation</option>
                    <option>Media & Digital</option>
                    <option>{t.form.inquiryOther}</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none text-muted-2" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="contact-message">
                {t.form.message} <span className="font-bold text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="input-wrap items-start">
                <MessageSquare size={17} className="mt-3 shrink-0" aria-hidden="true" />
                <textarea
                  className="input textarea"
                  id="contact-message"
                  name="message"
                  placeholder={t.form.messagePlaceholder}
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-[13px] text-muted" role="status" aria-live="polite">
                {sent ? (
                  <span className="text-success-600">{t.form.sent}</span>
                ) : (
                  <>
                    <Lock size={14} aria-hidden="true" />
                    {t.form.privacy}
                  </>
                )}
              </p>
              <button className="btn btn--primary" type="submit">
                {t.form.submit}
                <span className="btn__icon" aria-hidden="true">→</span>
              </button>
            </div>
          </form>

          {/* Details ---------------------------------------------------- */}
          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h2 className="h3 text-[22px]">
              {t.details.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {t.details.subtitle}
            </p>

            <ul className="mt-4 md:mt-8 grid gap-4 md:gap-5">
              {details.map((detail) => (
                <li className="flex items-start gap-4" key={detail.label}>
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-ink-900 text-white">
                    <detail.Icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-ink-900">{detail.label}</h3>
                    {detail.href ? (
                      <a
                        className="mt-1 block text-[15px] leading-relaxed text-muted transition-colors hover:text-brand-600"
                        href={detail.href}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-[15px] leading-relaxed text-muted">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              className="group relative mt-4 md:mt-8 block h-[180px] overflow-hidden rounded-[20px] bg-ink-800"
              href="https://maps.google.com/?q=Jl.+Tamblong+No.46,+Bandung"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={contactPhoto}
                alt={t.details.mapAlt}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-900 shadow-lg">
                <MapPin size={20} />
              </span>
              <span className="chip absolute bottom-4 left-4 bg-white text-ink-900">
                {t.details.map} <span aria-hidden="true">→</span>
              </span>
            </a>
          </aside>
        </Wrap>
      </section>
    </>
  )
}