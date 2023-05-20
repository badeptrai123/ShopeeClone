import {
  useFloating,
  FloatingPortal,
  arrow,
  FloatingArrow,
  offset,
  shift,
  autoPlacement,
  Placement
} from '@floating-ui/react'
import { ElementType, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  initialOpen?: boolean
  as?: ElementType
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  initialOpen,
  as: Element = 'div',
  placement = 'bottom-end'
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    middleware: [
      offset(7),
      shift(),
      arrow({ element: arrowRef }),
      autoPlacement({
        // 'right' and 'left' won't be chosen
        allowedPlacements: [placement]
      })
    ]
  })

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  const id = useId()
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal id={id}>
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
            >
              <FloatingArrow ref={arrowRef} className='bottom-99 z-10' fill='white' height={8} context={context} />
              {renderPopover}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </Element>
  )
}
