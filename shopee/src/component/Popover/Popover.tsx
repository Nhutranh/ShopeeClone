// eslint-disable-next-line import/named
import { FloatingPortal, useFloating, arrow, shift, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useId } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  placement?: Placement
}

export default function Popover({ children, className, renderPopover, placement = 'bottom-end' }: Props) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const id = useId()
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }

  return (
    <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute -translate-y-full'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
