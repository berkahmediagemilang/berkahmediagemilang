import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/**
 * Horizontal stepper: one rail, one node per stage, read strictly left to
 * right. Cheapest to scan and it never makes the reader decode the layout.
 *
 * Falls back to a single-column vertical stepper below 900px.
 *
 * @param {Array<[React.ComponentType<{ size?: number }>, string, string, string?]>} items
 *   `[Icon, number, title, description?]`.
 * @param {boolean} [showDescription=false] Render the optional 4th tuple entry.
 * @param {string} [className] Extra classes for the wrapper.
 */
export default function ProcessStepper({ items, showDescription = false, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduceMotion = useReducedMotion()
  const revealed = inView || reduceMotion

  const classes = ['stepper', 'stepper--reveal', revealed && 'is-visible', className].filter(Boolean).join(' ')

  return (
    <div className={classes} ref={ref}>
      <ol className="stepper__list" role="list">
        {items.map(([Icon, number, title, description]) => (
          <li className="stepper__item" key={number}>
            <span className="stepper__node" aria-hidden="true">
              <Icon size={18} />
            </span>
            <div className="stepper__body">
              <span className="stepper__num">{number}</span>
              <h3 className="stepper__title">{title}</h3>
              {showDescription && description ? <p className="stepper__text">{description}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}