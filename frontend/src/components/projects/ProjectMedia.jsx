import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { Check, CircleDot, Scale, ScanLine, UserCheck } from 'lucide-react';

function DocumentGraph() {
  return (
    <div className="artifact-scene artifact-scene--documents" aria-hidden="true">
      <div className="doc-node">
        <div className="doc-node__head">
          <span>EXPORT INVOICE</span>
          <small>CASE 024</small>
        </div>
        <div className="doc-node__rows">
          <p><span>Exporter</span><i /></p>
          <p><span>Declared value</span><i /></p>
          <p className="is-flagged"><span>Net weight</span><i /></p>
          <p><span>HS code</span><i /></p>
        </div>
      </div>
      <div className="graph-route">
        <span>Extract</span>
        <span>Validate</span>
        <span>Retrieve</span>
        <span>Suggest</span>
      </div>
      <div className="review-chip">
        <UserCheck size={15} aria-hidden="true" />
        Human review
      </div>
    </div>
  );
}

function RetrievalPipeline() {
  return (
    <div className="artifact-scene artifact-scene--retrieval" aria-hidden="true">
      <div className="query-strip">
        <span>QUERY</span>
        <p>What does the policy require?</p>
        <i />
      </div>
      <div className="retrieval-sources">
        <div className="retrieval-source">
          <span>Semantic search</span>
          <i /><i /><i />
        </div>
        <div className="retrieval-source">
          <span>Keyword · BM25</span>
          <i /><i /><i />
        </div>
      </div>
      <div className="fusion-core">
        <span>RRF</span>
        <small>fuse</small>
      </div>
      <div className="rank-stack">
        <p><b>1</b><span>context candidate</span><em>reranked</em></p>
        <p><b>2</b><span>context candidate</span><em>reranked</em></p>
        <p><b>3</b><span>context candidate</span><em>reranked</em></p>
      </div>
      <div className="evaluation-strip">
        <span><Check size={14} /> faithfulness</span>
        <span><Check size={14} /> context precision</span>
        <span><Check size={14} /> context recall</span>
      </div>
    </div>
  );
}

function ModelLab() {
  return (
    <div className="artifact-scene artifact-scene--model" aria-hidden="true">
      <div className="model-stack">
        <div className="model-stack__core">
          <span>FLAN</span>
          <strong>T5</strong>
        </div>
        <div className="model-stack__chips">
          <span>LoRA adapters</span>
          <span>HF Trainer</span>
          <span>INT8 / INT4 loading</span>
        </div>
      </div>
      <div className="lab-note">
        <Scale size={15} aria-hidden="true" />
        Outputs compared before and after tuning with ROUGE — read as a signal,
        not a headline score.
      </div>
    </div>
  );
}

function VisionService() {
  return (
    <div className="artifact-scene artifact-scene--vision" aria-hidden="true">
      <div className="scan-stage">
        <div className="scan-stage__tooth scan-stage__tooth--one" />
        <div className="scan-stage__tooth scan-stage__tooth--two" />
        <div className="scan-stage__tooth scan-stage__tooth--three" />
        <span className="scan-stage__box"><small>finding</small></span>
        <i className="scan-stage__line" />
        <ScanLine size={22} />
      </div>
      <div className="service-boundary">
        <span>Flutter app</span>
        <i />
        <span>Python API</span>
        <i />
        <span>YOLOv8</span>
      </div>
      <div className="structured-return">
        <CircleDot size={14} aria-hidden="true" />
        structured detections returned into the patient case
      </div>
    </div>
  );
}

const visualByType = {
  'document-graph': DocumentGraph,
  'retrieval-pipeline': RetrievalPipeline,
  'model-lab': ModelLab,
  'vision-service': VisionService,
};

export default function ProjectMedia({ project, mode = 'preview' }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 130, damping: 22, mass: 0.75 });
  const rotateY = useSpring(rawRotateY, { stiffness: 130, damping: 22, mass: 0.75 });
  const Visual = visualByType[project.visual] ?? DocumentGraph;
  const isCompact = mode === 'compact';

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateY.set(x * 5);
    rawRotateX.set(y * -4);
    containerRef.current?.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
    containerRef.current?.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
  };

  const resetPointer = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={`project-artifact project-artifact--${project.accent} project-artifact--${mode}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      role="img"
      aria-label={`${project.longTitle} architecture illustration`}
    >
      <motion.div
        className="project-artifact__surface"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        {!isCompact ? (
          <div className="project-artifact__topline">
            <span>{project.longTitle}</span>
            <span>{project.year}</span>
          </div>
        ) : null}

        <Visual />

        {!isCompact ? (
          <ol className="project-pipeline" aria-label={`${project.title} workflow`}>
            {project.pipeline.map((step, index) => (
              <li key={step.label}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <small>{step.detail}</small>
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        <div className="project-artifact__footer">
          <span className="project-artifact__status"><i aria-hidden="true" /> {project.status}</span>
          {!isCompact ? <span>{project.proof.join(' · ')}</span> : null}
        </div>
      </motion.div>
    </div>
  );
}
