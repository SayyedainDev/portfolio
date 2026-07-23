/**
 * Canonical content for Muhammad Sayyedain's AI / GenAI portfolio.
 *
 * Claims are grounded in the supplied July 2026 resume and the Crewlogix
 * 13-week course outline. Projects without a public repository are labelled
 * clearly instead of linking to placeholders.
 */

export const siteMeta = {
  title: 'Muhammad Sayyedain — AI / GenAI Engineer',
  description:
    'Junior AI and GenAI engineer in Lahore building RAG systems, LangGraph workflows, FastAPI services, and product-ready AI experiences.',
};

export const identity = {
  name: 'Muhammad Sayyedain',
  shortName: 'Muhammad',
  role: 'Junior AI / GenAI Engineer',
  location: 'Lahore, Pakistan',
  roleLine: 'Junior AI / GenAI Engineer · Lahore, Pakistan',
  statement: 'I build AI systems that retrieve, reason, and ship.',
  introduction:
    'I build the working parts behind useful AI products: retrieval that finds the right context, agent workflows that reason in clear steps, and typed Python services that ship the result into a real interface. My Flutter background keeps the person using it in the frame.',
  availability: 'Open to junior AI, GenAI, and Python backend roles',
  email: 'sayyedain0001@gmail.com',
  phone: '+92 349 8719352',
  links: {
    email: {
      label: 'Email Muhammad',
      href: 'mailto:sayyedain0001@gmail.com',
      external: false,
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/SayyedainDev',
      external: true,
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammad-sayyedain-112510269/',
      external: true,
    },
    resume: {
      label: 'Download résumé',
      href: '/resume.pdf',
      external: false,
      download: true,
    },
  },
};

export const navigation = [
  { label: 'AI work', href: '#work', sectionId: 'work' },
  { label: 'Capabilities', href: '#capabilities', sectionId: 'capabilities' },
  { label: 'Training', href: '#training', sectionId: 'training' },
  { label: 'Journey', href: '#experience', sectionId: 'experience' },
  { label: 'About', href: '#about', sectionId: 'about' },
];

export const hero = {
  roleLine: identity.roleLine,
  heading: identity.statement,
  body: identity.introduction,
  availability: identity.availability,
  currentBuild: 'Currently building CACE · AI document review with a human in the loop',
  actions: {
    primary: {
      label: 'Explore AI work',
      href: '#work',
    },
    secondary: identity.links.resume,
  },
  stack: ['Python', 'FastAPI', 'LangGraph', 'RAG', 'Evaluation', 'Docker', 'Flutter'],
};

const localCaseStudyLink = (slug) => ({
  label: 'Explore case study',
  href: `/work/${slug}`,
  type: 'case-study',
  external: false,
});

export const projects = [
  {
    id: 'cace',
    slug: 'cace',
    number: '01',
    title: 'CACE',
    longTitle: 'Customs Automation & Compliance Engine',
    type: 'GenAI capstone · Full-stack system',
    year: '2026',
    status: 'In development',
    statusDetail: 'Repository publishing after project cleanup',
    accent: 'amber',
    visual: 'document-graph',
    summary:
      'A human-in-the-loop AI workflow for reviewing export invoices and packing lists against customs and reference material.',
    problem:
      'Customs review spans dense documents, repeated data checks, classification hints, and policy lookups. CACE brings those steps into one traceable case workflow without removing the final human decision.',
    role:
      'GenAI engineer across workflow design, Python API boundaries, retrieval, persistence, and Flutter product integration.',
    decisions: [
      'Model the review as a LangGraph state machine so extraction, validation, retrieval, suggestions, and human review remain inspectable steps.',
      'Use retrieval over customs and reference documents to ground compliance answers instead of relying on model memory.',
      'Validate API inputs and structured outputs with Pydantic before they reach persistence or the next workflow node.',
      'Keep case history and review status in PostgreSQL/Supabase so a reviewer can return to prior work.',
      'Package the Python backend with Docker and expose it to a Flutter review interface through FastAPI.',
    ],
    features: [
      'Invoice and packing-list extraction',
      'Cross-document field validation',
      'HS-code suggestion workflow',
      'Compliance-document retrieval',
      'Grounded case Q&A',
      'Mismatch flagging',
      'Human review checkpoints',
      'Persistent case history',
    ],
    technology: [
      'Python',
      'FastAPI',
      'LangGraph',
      'LangChain',
      'RAG',
      'Pydantic',
      'PostgreSQL',
      'Supabase',
      'Docker',
      'Flutter',
    ],
    pipeline: [
      { label: 'Ingest', detail: 'invoice + packing list' },
      { label: 'Extract', detail: 'structured fields' },
      { label: 'Validate', detail: 'cross-document rules' },
      { label: 'Retrieve', detail: 'compliance context' },
      { label: 'Review', detail: 'human decision' },
    ],
    proof: ['Stateful graph', 'Grounded Q&A', 'Human oversight'],
    evidenceBoundary:
      'CACE is actively being built. This case study reflects the architecture and implemented work described in the supplied résumé; it does not claim production deployment, autonomous customs decisions, or a public repository yet.',
    repositoryUrl: null,
    caseStudyPath: '/work/cace',
    links: [localCaseStudyLink('cace')],
  },
  {
    id: 'rag-evaluation',
    slug: 'rag-evaluation',
    number: '02',
    title: 'Production RAG',
    longTitle: 'RAG Chatbot & Evaluation Pipeline',
    type: 'Crewlogix applied GenAI build',
    year: '2026',
    status: 'Build complete · code soon',
    statusDetail: 'Repository is being prepared for GitHub',
    accent: 'petrol',
    visual: 'retrieval-pipeline',
    summary:
      'An end-to-end retrieval system that combines dense and keyword search, reranking, grounded generation, and measurable evaluation.',
    problem:
      'Pure semantic retrieval can miss exact identifiers and domain terms. The build tests a hybrid retrieval path and evaluates both retrieval quality and generated answers instead of treating a plausible response as success.',
    role:
      'Designed and coded the applied pipeline during the Crewlogix PSDF GenAI programme, including retrieval, evaluation, tracing, memory, and privacy handling.',
    decisions: [
      'Combine BM25 keyword retrieval with dense vector search through Reciprocal Rank Fusion.',
      'Retrieve a broader candidate set, then apply cross-encoder reranking before generation.',
      'Measure faithfulness, answer relevancy, context precision, and context recall with RAGAS.',
      'Trace retrieval and generation failures with LangSmith rather than tuning prompts blindly.',
      'Redact Pakistan-specific CNIC and phone-number patterns before sensitive text reaches the model flow.',
    ],
    features: [
      'Multi-format document ingestion',
      'Configurable chunking',
      'Persistent vector storage',
      'BM25 + dense hybrid retrieval',
      'RRF fusion',
      'Cross-encoder reranking',
      'Multi-turn memory',
      'RAGAS evaluation',
      'LangSmith tracing',
      'PII redaction',
    ],
    technology: [
      'Python',
      'LangChain',
      'ChromaDB',
      'FAISS',
      'BM25',
      'RRF',
      'Cross-encoders',
      'RAGAS',
      'LangSmith',
      'FastAPI',
    ],
    pipeline: [
      { label: 'Load', detail: 'documents' },
      { label: 'Retrieve', detail: 'BM25 + dense' },
      { label: 'Fuse', detail: 'RRF ranking' },
      { label: 'Rerank', detail: 'cross-encoder' },
      { label: 'Evaluate', detail: 'RAGAS + traces' },
    ],
    proof: ['Hybrid retrieval', 'Evaluation first', 'PII aware'],
    evidenceBoundary:
      'This is an applied bootcamp build rather than a production service with public traffic. No unsupported latency, accuracy, or recall-improvement number is presented, and the repository is not public yet.',
    repositoryUrl: null,
    caseStudyPath: '/work/rag-evaluation',
    links: [localCaseStudyLink('rag-evaluation')],
  },
  {
    id: 'flan-t5-lab',
    slug: 'flan-t5-lab',
    number: '03',
    title: 'FLAN‑T5 Lab',
    longTitle: 'Fine-tuning & Quantization Lab',
    type: 'Applied model adaptation lab',
    year: '2026',
    status: 'Experiment documented · code soon',
    statusDetail: 'Notebook publishing after cleanup',
    accent: 'amber',
    visual: 'model-lab',
    summary:
      'A hands-on model adaptation experiment exploring fine-tuning, parameter efficiency, evaluation, and constrained deployment.',
    problem:
      'Model adaptation has real compute and quality tradeoffs. This lab makes those choices concrete by preparing an instruction dataset, running FLAN‑T5 training, comparing outputs, and testing lower-precision loading.',
    role:
      'Built and evaluated the training workflow in Google Colab as part of applied GenAI coursework.',
    decisions: [
      'Frame the task as instruction-style fine-tuning with a consistent input, target, and evaluation format.',
      'Use the Hugging Face Trainer workflow to keep dataset preparation, training arguments, and evaluation reproducible.',
      'Compare pre- and post-training outputs with ROUGE while treating the score as one signal rather than a complete quality judgment.',
      'Explore PEFT/LoRA to understand how low-rank adapters reduce the number of trainable parameters.',
      'Test INT8 and INT4 loading with BitsAndBytes to examine memory, speed, and quality tradeoffs on limited GPU resources.',
    ],
    features: [
      'Instruction dataset preparation',
      'Tokenization and preprocessing',
      'Hugging Face Trainer run',
      'Pre/post output comparison',
      'ROUGE evaluation',
      'PEFT/LoRA exploration',
      'INT8 and INT4 experiments',
      'Colab T4 constraints',
    ],
    technology: [
      'Python',
      'FLAN‑T5',
      'Hugging Face Transformers',
      'HF Trainer',
      'PEFT',
      'LoRA',
      'BitsAndBytes',
      'ROUGE',
      'Google Colab',
    ],
    pipeline: [
      { label: 'Prepare', detail: 'instruction data' },
      { label: 'Tokenize', detail: 'input + target' },
      { label: 'Adapt', detail: 'Trainer / LoRA' },
      { label: 'Compress', detail: 'INT8 / INT4' },
      { label: 'Compare', detail: 'outputs + ROUGE' },
    ],
    proof: ['Measured outputs', 'PEFT concepts', 'Compute aware'],
    evidenceBoundary:
      'The lab demonstrates hands-on model adaptation and deployment tradeoff exploration. It does not claim a novel model, benchmark-leading results, or a production-tuned foundation model.',
    repositoryUrl: null,
    caseStudyPath: '/work/flan-t5-lab',
    links: [localCaseStudyLink('flan-t5-lab')],
  },
  {
    id: 'palpath',
    slug: 'palpath',
    number: '04',
    title: 'PalPath',
    longTitle: 'AI-Assisted Dental Workflow Platform',
    type: 'Final Year Project · Applied AI + mobile',
    year: '2025–2026',
    status: 'Public repository',
    statusDetail: 'Authentication preview is publicly available',
    accent: 'petrol',
    visual: 'vision-service',
    summary:
      'A Flutter clinic workflow that brings model-assisted dental X-ray analysis into patient and teaching flows through a Python API.',
    problem:
      'Dental case records, teaching workflows, and image-assisted analysis live in different contexts. PalPath connects them in one role-aware product while keeping inference behind a clear service boundary.',
    role:
      'Built the Flutter workflow and integrated the Python/YOLOv8 inference service as part of a team Final Year Project.',
    decisions: [
      'Use Flutter for a single role-aware dentist and student experience across clinic and teaching flows.',
      'Keep patient, case, and identity data in Firebase while Supabase handles scans and documents.',
      'Serve YOLOv8 predictions through a Python REST API so inference stays independent from the client.',
      'Return structured detections to the case-review flow instead of making the model output a separate demo.',
      'Present image analysis as decision support and avoid unsupported clinical or model-performance claims.',
    ],
    features: [
      'Dentist and student roles',
      'Patient records',
      'Case management',
      'Appointments',
      'Quiz module',
      'Scan storage',
      'YOLOv8 inference API',
      'Prediction review flow',
    ],
    technology: [
      'Flutter',
      'Dart',
      'Python',
      'FastAPI',
      'YOLOv8',
      'Firebase',
      'Supabase',
      'REST APIs',
    ],
    pipeline: [
      { label: 'Capture', detail: 'dental scan' },
      { label: 'Upload', detail: 'case context' },
      { label: 'Infer', detail: 'Python + YOLOv8' },
      { label: 'Return', detail: 'detections' },
      { label: 'Review', detail: 'inside patient case' },
    ],
    proof: ['Public code', 'REST integration', 'Product context'],
    evidenceBoundary:
      'PalPath is a team academic project. The public site is verified only through authentication screens; no clinical-validation, diagnostic-accuracy, or production-deployment claim is made.',
    repositoryUrl: 'https://github.com/SayyedainDev/FYP',
    caseStudyPath: '/work/palpath',
    links: [
      {
        label: 'View GitHub repository',
        href: 'https://github.com/SayyedainDev/FYP',
        type: 'repository',
        external: true,
      },
      {
        label: 'View authentication preview',
        href: 'https://dental-care-6daf8.web.app/',
        type: 'demo',
        external: true,
      },
      localCaseStudyLink('palpath'),
    ],
  },
];

export const capabilityGroups = [
  {
    id: 'retrieval',
    number: '01',
    title: 'Retrieval systems',
    summary: 'Ground the answer, then measure whether the right context arrived.',
    items: [
      {
        title: 'RAG pipeline engineering',
        description:
          'Document ingestion, chunking, embeddings, persistent vector storage, retrieval, and grounded generation.',
        evidence: ['LangChain', 'ChromaDB', 'FAISS'],
      },
      {
        title: 'Hybrid search and reranking',
        description:
          'BM25 and dense candidates combined with RRF, followed by cross-encoder reranking.',
        evidence: ['BM25', 'RRF', 'Cross-encoders'],
      },
    ],
  },
  {
    id: 'agents-backend',
    number: '02',
    title: 'Agents & backend',
    summary: 'Turn uncertain model calls into explicit, observable application steps.',
    items: [
      {
        title: 'Stateful agent workflows',
        description:
          'LangGraph nodes, conditional edges, tool calling, and human-in-the-loop review for multi-step work.',
        evidence: ['LangGraph', 'ReAct', 'Tool calling'],
      },
      {
        title: 'Typed Python APIs',
        description:
          'Async FastAPI services, Pydantic validation, REST boundaries, SQL persistence, and Docker packaging.',
        evidence: ['FastAPI', 'Pydantic', 'PostgreSQL', 'Docker'],
      },
    ],
  },
  {
    id: 'evaluation',
    number: '03',
    title: 'Evaluation & adaptation',
    summary: 'Treat quality as a system to inspect—not a response that merely looks right.',
    items: [
      {
        title: 'RAG evaluation and tracing',
        description:
          'Faithfulness, answer relevance, context precision and recall, backed by trace-level failure analysis.',
        evidence: ['RAGAS', 'LangSmith', 'Recall@k'],
      },
      {
        title: 'Fine-tuning and optimization',
        description:
          'Instruction tuning, PEFT/LoRA concepts, ROUGE comparison, and INT8/INT4 deployment tradeoffs.',
        evidence: ['HF Trainer', 'PEFT/LoRA', 'BitsAndBytes'],
      },
    ],
  },
  {
    id: 'product-delivery',
    number: '04',
    title: 'Product delivery',
    summary: 'AI is only useful when it survives the trip into a real user workflow.',
    items: [
      {
        title: 'Connected product interfaces',
        description:
          'Flutter interfaces connected to Python services, authentication, realtime data, and persisted user state.',
        evidence: ['Flutter', 'Firebase', 'Supabase'],
      },
      {
        title: 'Engineering foundations',
        description:
          'Git-based iteration, Linux tooling, API testing, SQL databases, and reproducible local environments.',
        evidence: ['Git', 'Linux', 'Postman', 'SQL'],
      },
    ],
  },
];

export const buildNotes = [
  {
    id: 'retrieval-before-generation',
    label: 'RAG · Retrieval quality',
    title: 'Debug what the model saw before rewriting the prompt.',
    body:
      'A polished answer can still be grounded in the wrong evidence. I inspect candidate retrieval, fusion, reranking, and context metrics before treating generation as the source of the failure.',
    projectSlug: 'rag-evaluation',
  },
  {
    id: 'bounded-agency',
    label: 'LangGraph · Control flow',
    title: 'Use agency where choices help—and structure where mistakes cost.',
    body:
      'CACE separates deterministic validation, retrieval, model-assisted suggestions, and human review into visible nodes. The graph makes the handoffs easier to trace and change.',
    projectSlug: 'cace',
  },
  {
    id: 'product-boundary',
    label: 'Applied AI · Product delivery',
    title: 'The model belongs inside the workflow, not beside it.',
    body:
      'PalPath returns structured image-analysis results to the patient case. CACE follows the same principle: AI output becomes reviewable product state, not a disconnected chatbot response.',
    projectSlug: 'palpath',
  },
];

export const training = {
  id: 'training',
  label: 'Crewlogix PSDF GenAI Bootcamp',
  organization: 'The Institute of Technology',
  dateLabel: 'May—July 2026',
  duration: '13 weeks',
  hours: '180 contact hours',
  description:
    'An applied programme spanning Python foundations, production RAG, agents, model adaptation, evaluation, deployment, and a team capstone.',
  phases: [
    {
      number: '01',
      title: 'Language & model foundations',
      weeks: 'Weeks 01—03',
      topics: ['Python + REST', 'Prompt engineering', 'Transformers', 'Structured outputs'],
    },
    {
      number: '02',
      title: 'Retrieval engineering',
      weeks: 'Weeks 04—07',
      topics: ['Embeddings', 'Vector databases', 'Hybrid search', 'RAGAS + LangSmith'],
    },
    {
      number: '03',
      title: 'Agents & model adaptation',
      weeks: 'Weeks 08—10',
      topics: ['ReAct tools', 'LangGraph', 'PEFT / LoRA', 'Quantization'],
    },
    {
      number: '04',
      title: 'Shipping the system',
      weeks: 'Weeks 11—13',
      topics: ['HF Spaces', 'n8n workflows', 'Deployment', 'Capstone demo'],
    },
  ],
  credentials: [
    'IBM Prompt Engineering Basics · Coursera · 2026',
    'Supervised Machine Learning: Regression and Classification · Stanford Online',
  ],
};

export const timeline = [
  {
    id: 'genai-bootcamp',
    kind: 'Applied GenAI training',
    dateLabel: 'May—Jul 2026',
    title: 'Crewlogix PSDF GenAI Bootcamp',
    organization: 'The Institute of Technology',
    location: 'Lahore, Pakistan',
    description:
      'A 13-week, 180-hour programme covering production RAG, LangGraph agents, evaluation, fine-tuning, optimization, deployment, and a team capstone.',
  },
  {
    id: 'bahria-university',
    kind: 'Education',
    dateLabel: '2022—2026',
    title: 'Bachelor of Science in Computer Science',
    organization: 'Bahria University',
    location: 'Lahore, Pakistan',
    description:
      'Core foundations in data structures and algorithms, object-oriented programming, databases, and operating systems.',
  },
  {
    id: 'optimusfox',
    kind: 'Industry experience',
    dateLabel: 'Jun—Jul 2025',
    title: 'Mobile App Development Intern',
    organization: 'OptimusFox',
    location: 'Lahore, Pakistan',
    description:
      'Developed a Flutter/Firebase property-booking application with role-aware user flows, Firestore data models, authentication, listings, bookings, favourites, and admin management.',
  },
];

export const about = {
  id: 'about',
  heading: 'I moved up the stack without leaving product thinking behind.',
  paragraphs: [
    'Flutter taught me to think about the person at the end of the system: what they see, what state changes, and where a workflow can break. I now bring that same discipline to AI backends, retrieval pipelines, and agent orchestration.',
    'My current focus is building GenAI systems that are grounded, observable, and useful—clear API contracts, deliberate retrieval, measurable evaluation, and human review where the decision needs it.',
  ],
};

export const contact = {
  id: 'contact',
  availability: identity.availability,
  heading: 'Let’s build AI that holds up outside the demo.',
  body:
    'I’m looking for a junior AI, GenAI, or Python backend role where I can contribute to retrieval, agents, evaluation, and the product layer that makes them useful.',
  primaryAction: identity.links.email,
  links: [identity.links.linkedin, identity.links.github, identity.links.resume],
};

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);

const portfolio = {
  siteMeta,
  identity,
  navigation,
  hero,
  projects,
  capabilityGroups,
  buildNotes,
  training,
  timeline,
  about,
  contact,
};

export default portfolio;
