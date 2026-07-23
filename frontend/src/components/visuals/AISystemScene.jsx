import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { BookOpenCheck, FileSearch, UserCheck } from 'lucide-react';

const chips = [
  {
    id: 'extract',
    className: 'exam-scene__chip--extract',
    icon: FileSearch,
    title: 'Read the documents',
    detail: 'invoice + packing list',
    delay: 0.3,
    z: 72,
  },
  {
    id: 'policy',
    className: 'exam-scene__chip--policy',
    icon: BookOpenCheck,
    title: 'Check against policy',
    detail: 'grounded retrieval',
    delay: 0.45,
    z: 94,
  },
  {
    id: 'review',
    className: 'exam-scene__chip--review',
    icon: UserCheck,
    title: 'A person decides',
    detail: 'human review checkpoint',
    delay: 0.6,
    z: 116,
  },
];

/* Entrances move, they never hide: content is fully visible even if an
   animation frame is never delivered (crawlers, headless previews). */
const rise = (reduceMotion, delay) =>
  reduceMotion
    ? {}
    : {
        initial: { y: 34 },
        animate: { y: 0 },
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
      };

export default function AISystemScene() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 110, damping: 20, mass: 0.7 });
  const rotateY = useSpring(pointerX, { stiffness: 110, damping: 20, mass: 0.7 });

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(x * 8);
    pointerY.set(y * -7);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="exam-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      role="img"
      aria-label="An export invoice on an examination table: fields are read, checked against policy, and routed to a human reviewer"
    >
      <motion.div
        className="exam-scene__stage"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <div className="exam-scene__table" aria-hidden="true" />

        <motion.div
          className="exam-scene__sheet"
          style={reduceMotion ? undefined : { z: 46, rotate: -2 }}
          {...rise(reduceMotion, 0.1)}
        >
          <div className="exam-scene__sheet-head">
            <span>EXPORT INVOICE</span>
            <small>CASE 024</small>
          </div>
          <div className="exam-scene__rows">
            <p><span>Exporter</span><i /></p>
            <p><span>Declared value</span><i /></p>
            <p className="is-flagged"><span>Net weight</span><i /></p>
            <p><span>HS code</span><i /></p>
          </div>
          <motion.div
            className="exam-scene__stamp"
            {...(reduceMotion
              ? {}
              : {
                  initial: { scale: 1.7, rotate: -18 },
                  animate: { scale: 1, rotate: -8 },
                  transition: {
                    delay: 0.9,
                    type: 'spring',
                    stiffness: 320,
                    damping: 19,
                  },
                })}
          >
            REVIEW
          </motion.div>
        </motion.div>

        {chips.map((chip) => {
          const Icon = chip.icon;
          return (
            <motion.div
              key={chip.id}
              className={`exam-scene__chip ${chip.className}`}
              style={reduceMotion ? undefined : { z: chip.z }}
              {...rise(reduceMotion, chip.delay)}
            >
              <span className="exam-scene__chip-icon">
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <span>
                <strong>{chip.title}</strong>
                <small>{chip.detail}</small>
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="exam-scene__caption">
        <i aria-hidden="true" />
        CACE, in progress — every AI suggestion ends in human review
      </p>
    </div>
  );
}
