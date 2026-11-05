// Full-Stack Developer, CS Fundamentals and AI Roadmap Data
// Complete 40-Week Curriculum, 10 Phases, Project Ladder & Milestones

export interface RoadmapResource {
  name: string;
  description: string;
  url: string;
  category?: 'free-book' | 'interactive' | 'docs' | 'video' | 'practice';
  isPrimary?: boolean;
}

export interface RoadmapPhase {
  id: string;
  number: number;
  title: string;
  track: 'core' | 'parallel' | 'career';
  weeks: string;
  startWeek: number;
  endWeek: number;
  goal: string;
  tagline: string;
  comicMentor: 'professor' | 'byte' | 'nova' | 'sid' | 'prof_tuple' | 'prof_pivot' | 'pri';
  comicQuote: string;
  connectedSaga?: 'dsa' | 'sql' | 'prisma' | 'linear-algebra' | 'web-dev' | 'python-dsa';
  topics: {
    id: string;
    label: string;
    detail: string;
  }[];
  practice: string;
  milestone: string;
  resources: RoadmapResource[];
}

export interface ProjectLadderItem {
  id: number;
  title: string;
  stack: string;
  weeks: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  description: string;
  deliverables: string[];
  keyLearnings: string[];
  suggestedRepo: string;
  gitCommitMsg: string;
  starterCodePrompt: string;
}

export interface RoadmapRhythmDay {
  day: string;
  hours: number;
  activities: {
    track: string;
    duration: string;
    focus: string;
  }[];
}

export const ROADMAP_WEEKLY_RHYTHM: RoadmapRhythmDay[] = [
  {
    day: 'Monday',
    hours: 3,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Daily 5 AM Quest + 2 LeetCode / Codeforces pattern problems' },
      { track: 'Core Build Track', duration: '2 hours', focus: 'Theory, new concepts & scaffold code' },
    ],
  },
  {
    day: 'Tuesday',
    hours: 3,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Timed problem solving & edge case debugging' },
      { track: 'Core Build Track', duration: '2 hours', focus: 'Hands-on feature implementation & tests' },
    ],
  },
  {
    day: 'Wednesday',
    hours: 3,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Homework Quests & Big-O complexity analysis' },
      { track: 'Parallel: Maths / Logic', duration: '2 hours', focus: 'Discrete maths, linear algebra or logic puzzles' },
    ],
  },
  {
    day: 'Thursday',
    hours: 3,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Review misses, re-solve without looking at hints' },
      { track: 'Core Build Track', duration: '2 hours', focus: 'API routes, database queries & component state' },
    ],
  },
  {
    day: 'Friday',
    hours: 3,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Speed Blitz Arena & code formatting clean-up' },
      { track: 'Core Build Track', duration: '2 hours', focus: 'Refactoring, error boundaries & responsive styling' },
    ],
  },
  {
    day: 'Saturday',
    hours: 5,
    activities: [
      { track: 'Parallel: DSA', duration: '1 hour', focus: 'Weekend Rush: 2 Medium / 1 Hard challenge' },
      { track: 'Core Build Track', duration: '4 hours', focus: 'Deep Work: Milestone Project sprint & git commits' },
    ],
  },
  {
    day: 'Sunday',
    hours: 3,
    activities: [
      { track: 'Weekly Review', duration: '30 mins', focus: 'Audit progress, log what broke, commit phase notes' },
      { track: 'Milestone Polish', duration: '2.5 hours', focus: 'Documentation, README GIFs, deployment check & rest' },
    ],
  },
];

export const ROADMAP_PROJECT_LADDER: ProjectLadderItem[] = [
  {
    id: 1,
    title: 'Personal Developer Portfolio',
    stack: 'HTML5, CSS3, Modern JavaScript, Responsive Flex/Grid',
    weeks: 'Weeks 8–12',
    difficulty: 'Beginner',
    description: 'Clean, accessible, responsive portfolio showcasing your story, skills, live projects and contact form. Zero UI frameworks.',
    deliverables: [
      'Semantic HTML structure with WCAG 2.1 AA accessibility score >95',
      'Dark/Light mode toggle with CSS custom properties & localStorage persistence',
      'Interactive project showcase cards with live demos and GitHub repo links',
      'Deployed on GitHub Pages / Vercel with custom domain and OpenGraph cards',
    ],
    keyLearnings: ['DOM manipulation', 'CSS box model', 'Flexbox & CSS Grid', 'Mobile-first responsive design', 'Semantic markup'],
    suggestedRepo: 'developer-portfolio',
    gitCommitMsg: 'feat: launch responsive portfolio v1 with interactive theme switcher',
    starterCodePrompt: 'Create a responsive modern portfolio with HTML5 and CSS Grid',
  },
  {
    id: 2,
    title: 'API-Driven Dynamic Web App',
    stack: 'React 19, TypeScript, TanStack Query, Tailwind CSS, REST API',
    weeks: 'Weeks 14–17',
    difficulty: 'Intermediate',
    description: 'Interactive dashboard consuming real public APIs (weather radar, movie database, or GitHub explorer) with pagination, debounced search, and caching.',
    deliverables: [
      'TanStack Query server state management with automatic caching & background revalidation',
      'Debounced live search input with optimistic feedback',
      'Graceful error boundaries and animated skeleton loading states',
      'Custom hooks for localStorage sync and media query listeners',
    ],
    keyLearnings: ['React component lifecycles', 'Custom hooks', 'Async data fetching', 'Debouncing & throttling', 'TypeScript interfaces'],
    suggestedRepo: 'react-api-explorer',
    gitCommitMsg: 'feat: add debounced query search and tanstack query caching layer',
    starterCodePrompt: 'Build a weather and forecast explorer using React and TanStack Query',
  },
  {
    id: 3,
    title: 'Full-Stack Task & Workspace Manager',
    stack: 'Next.js App Router, Express/Node.js, Prisma ORM, PostgreSQL, JWT Auth',
    weeks: 'Weeks 20–27',
    difficulty: 'Intermediate',
    description: 'Collaborative Kanban/Task manager with relational database, user authentication, role-based permissions, and Prisma ORM migrations.',
    deliverables: [
      'PostgreSQL database with 1-to-N and N-to-M relations modeled via Prisma schema',
      'Secure password hashing with bcrypt and stateless JWT authentication with refresh cookies',
      'Zod runtime schema validation on both frontend and backend routes',
      'Full CRUD actions with optimistic UI updates and undo toasts',
    ],
    keyLearnings: ['Relational schema design', 'Prisma Client API', 'ACID transactions', 'JWT auth flows', 'Server vs Client components'],
    suggestedRepo: 'taskflow-fullstack',
    gitCommitMsg: 'feat: implement workspace membership permissions and Prisma relational queries',
    starterCodePrompt: 'Scaffold Prisma schema with User, Workspace, Task models and express router',
  },
  {
    id: 4,
    title: 'Production URL Shortener & Analytics API',
    stack: 'Node.js, Express, Redis Caching, Docker, Vitest, CI/CD Actions',
    weeks: 'Weeks 26–30',
    difficulty: 'Advanced',
    description: 'High-throughput URL shortener with Base62 encoding, Redis caching, click analytics, rate-limiting, and automated GitHub Actions test pipelines.',
    deliverables: [
      'Sub-10ms redirection using Redis key-value cache layer before hitting PostgreSQL',
      'OWASP compliant: Express rate-limiter, Helmet security headers, and CORS config',
      'Comprehensive test suite with Vitest / Supertest (>85% code coverage)',
      'Multi-stage Dockerfile and automated GitHub Actions CI workflow running lint + tests',
    ],
    keyLearnings: ['Cache-aside pattern', 'Docker containerization', 'CI/CD pipelines', 'Rate limiting', 'Integration testing'],
    suggestedRepo: 'speedy-shortener-api',
    gitCommitMsg: 'feat: add redis cache hit layer and github actions ci workflow',
    starterCodePrompt: 'Build express URL shortener with Base62 hashing and rate limiter',
  },
  {
    id: 5,
    title: 'Real-Time Collaborative Chat & Canvas',
    stack: 'Next.js, WebSockets (Socket.io / ws), PostgreSQL, Tailwind v4',
    weeks: 'Weeks 30–34',
    difficulty: 'Advanced',
    description: 'Real-time multi-room messaging and live whiteboard with presence indicators, typing status, message history persistence, and reconnection fallbacks.',
    deliverables: [
      'Bi-directional WebSocket event channels for instant room messages and reactions',
      'Presence system broadcasting online/away/offline user statuses',
      'PostgreSQL message archiving with cursor-based infinite scroll pagination',
      'Optimistic message delivery with retry queue on temporary connection loss',
    ],
    keyLearnings: ['WebSockets vs HTTP polling', 'Event-driven architecture', 'Cursor pagination', 'Concurrency & connection handling'],
    suggestedRepo: 'pulse-realtime-chat',
    gitCommitMsg: 'feat: wire websocket broadcast rooms and cursor-based message history',
    starterCodePrompt: 'Implement Socket.io server with room joins and real-time message events',
  },
  {
    id: 6,
    title: 'AI RAG Knowledge Base & Agentic Chatbot',
    stack: 'Next.js, Google Gemini / Claude API, Vector Embeddings, LangChain / Vercel AI SDK',
    weeks: 'Weeks 34–40',
    difficulty: 'Capstone',
    description: 'Autonomous AI assistant that ingests your custom documents/notes, performs semantic vector search (RAG), and answers complex queries with cited sources.',
    deliverables: [
      'Document chunking and vector embedding generation stored in pgvector / Pinecone',
      'Retrieval-Augmented Generation (RAG) pipeline matching top-k cosine similarity snippets',
      'Streaming token responses via Vercel AI SDK with markdown and syntax highlighting',
      'Tool calling / Agentic execution allowing the AI to query databases or trigger actions',
    ],
    keyLearnings: ['Vector embeddings & cosine similarity', 'RAG pipeline design', 'Prompt engineering', 'AI streaming APIs', 'Production LLM deployment'],
    suggestedRepo: 'cortex-ai-rag-agent',
    gitCommitMsg: 'feat: launch vector semantic retrieval and streaming AI response pipeline',
    starterCodePrompt: 'Build RAG semantic search endpoint with vector embeddings and Gemini API',
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Phase 1: Linux, CLI, Git and Networking',
    track: 'core',
    weeks: 'Weeks 1–4',
    startWeek: 1,
    endWeek: 4,
    goal: 'Become comfortable in a terminal, version everything with Git, and understand what actually happens when a browser talks to a server. Everything later in this roadmap sits on this layer.',
    tagline: 'The Foundation of All Modern Software Engineering',
    comicMentor: 'professor',
    comicQuote: 'Before you build skyscrapers of code, you must master the bedrock: the Linux terminal, TCP packet handshakes, and the Git commit graph!',
    connectedSaga: 'dsa',
    topics: [
      { id: 'p1-1', label: 'Files, permissions, processes, pipes, grep, find, sed', detail: 'chmod, chown, ps aux, kill, stdout/stderr redirection, pipelines' },
      { id: 'p1-2', label: 'OSI vs TCP/IP model, IP addressing, subnets, ports', detail: 'Understand Layer 3 IP routing, Layer 4 TCP/UDP transport, and port binding' },
      { id: 'p1-3', label: 'Shell scripting basics, environment variables, PATH', detail: 'Bash/Zsh scripts, variables, loops, export, PATH resolution' },
      { id: 'p1-4', label: 'DNS, HTTP/HTTPS, TLS handshake, cookies, CORS', detail: 'A/CNAME records, 3-way handshake, TLS 1.3 encryption, CORS headers' },
      { id: 'p1-5', label: 'SSH, curl, package managers, systemd basics', detail: 'Public/private key pairs, curl debugging, apt/brew, systemctl service management' },
      { id: 'p1-6', label: 'Docker basics: image, container, volume, port mapping', detail: 'Dockerfile directives, docker build, run, volumes for persistent storage' },
      { id: 'p1-7', label: 'Git: branch, merge, rebase, PRs, resolving conflicts', detail: 'Git DAG, fast-forward vs merge commits, interactive rebase, pull requests' },
      { id: 'p1-8', label: 'Inspect real traffic in Wireshark and Browser DevTools', detail: 'Packet sniffing, inspect headers, TTFB, status codes, payload inspection' },
    ],
    practice: 'Finish Bandit wargame levels 0–15. Use only the terminal for an entire week. Push 3 small repos to GitHub with structured commits.',
    milestone: 'Capture one HTTPS request in DevTools and Wireshark, then explain DNS lookup, TCP handshake, TLS negotiation, and the HTTP response in your own words.',
    resources: [
      { name: 'The Linux Command Line (Shotts)', description: 'Free book, the best beginner-to-confident path', url: 'https://linuxcommand.org/tlcl.php', category: 'free-book', isPrimary: true },
      { name: 'MIT The Missing Semester', description: 'Shell, vim, git, scripting, debugging', url: 'https://missing.csail.mit.edu', category: 'video' },
      { name: 'OverTheWire: Bandit', description: 'Learn Linux security & commands by playing a wargame', url: 'https://overthewire.org/wargames/bandit', category: 'interactive' },
      { name: 'Linux Journey', description: 'Short structured lessons with quizzes', url: 'https://linuxjourney.com', category: 'interactive' },
      { name: 'explainshell.com', description: 'Paste any complex shell command, get every flag explained', url: 'https://explainshell.com', category: 'interactive' },
      { name: 'Pro Git (Official Book)', description: 'Free, the definitive Git reference guide', url: 'https://git-scm.com/book/en/v2', category: 'free-book' },
      { name: 'Learn Git Branching', description: 'Interactive visual Git practice playground', url: 'https://learngitbranching.js.org', category: 'interactive' },
      { name: 'Computer Networking: A Top-Down Approach', description: 'Standard textbook slides, Kurose & Ross', url: 'https://gaia.cs.umass.edu/kurose_ross', category: 'free-book' },
      { name: 'Cloudflare Learning Center', description: 'DNS, TCP, TLS, and HTTP explainers', url: 'https://www.cloudflare.com/learning', category: 'docs' },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Phase 2: HTML, CSS, JavaScript and TypeScript',
    track: 'core',
    weeks: 'Weeks 3–12',
    startWeek: 3,
    endWeek: 12,
    goal: 'Learn the web platform properly before frameworks. Strong fundamentals make React, Next.js and debugging far easier and are what interviewers test first.',
    tagline: 'The Core Building Blocks of the Web Platform',
    comicMentor: 'nova',
    comicQuote: 'Mastering the DOM, CSS specificity, the Event Loop, and TypeScript type narrowing gives you superhero powers in any frontend framework!',
    connectedSaga: 'web-dev',
    topics: [
      { id: 'p2-1', label: 'Semantic HTML, modern forms, input types, accessibility (a11y)', detail: 'header, main, nav, section, article, ARIA roles, form validation attributes' },
      { id: 'p2-2', label: 'Async JavaScript: promises, async/await, event loop, microtasks', detail: 'Call stack, web APIs, task queue vs microtask queue (Promise.then vs setTimeout)' },
      { id: 'p2-3', label: 'Flexbox, Grid, responsive design, container queries, CSS variables', detail: 'flex-direction, justify/align, grid-template-columns: repeat(auto-fit, minmax()), clamp()' },
      { id: 'p2-4', label: 'DOM manipulation, event delegation, fetch API, localStorage', detail: 'querySelector, addEventListener with capture/bubble, AbortController, storage APIs' },
      { id: 'p2-5', label: 'Tailwind CSS utility workflow & modern CSS styling', detail: 'Responsive modifiers, utility composition, custom themes, dark mode classes' },
      { id: 'p2-6', label: 'ES Modules, modern array methods, destructuring, rest/spread', detail: 'map, filter, reduce, find, some, every, flatMap, object spread, import/export' },
      { id: 'p2-7', label: 'JS under the hood: scope, closures, this keyword, prototypes', detail: 'Lexical scope, execution context, call/apply/bind, prototype chain inheritance' },
      { id: 'p2-8', label: 'TypeScript: static typing, interfaces, generics, type narrowing', detail: 'Union types, keyof, Record, Partial, type guards, generic functions' },
    ],
    practice: 'Clone 5 Frontend Mentor challenges. Build 5 JavaScript30 projects from scratch without looking at the solutions first.',
    milestone: 'A responsive, accessible portfolio site in plain HTML, CSS and JS (no framework) with a working dark mode toggle and deployed live to GitHub Pages or Netlify.',
    resources: [
      { name: 'MDN Web Docs', description: 'The official reference for all web technologies', url: 'https://developer.mozilla.org', category: 'docs', isPrimary: true },
      { name: 'javascript.info', description: 'Best modern JavaScript tutorial from basics to advanced', url: 'https://javascript.info', category: 'free-book', isPrimary: true },
      { name: 'Eloquent JavaScript', description: 'Free classic book with in-browser exercises', url: 'https://eloquentjavascript.net', category: 'free-book' },
      { name: 'You Don\'t Know JS (YDKJS)', description: 'Deep dive into scopes, closures, objects and async', url: 'https://github.com/getify/You-Dont-Know-JS', category: 'free-book' },
      { name: 'Flexbox Froggy & Grid Garden', description: 'Visual interactive games to master layouts', url: 'https://flexboxfroggy.com', category: 'interactive' },
      { name: 'JavaScript30 by Wes Bos', description: '30 vanilla JS mini-projects in 30 days', url: 'https://javascript30.com', category: 'video' },
      { name: 'TypeScript Handbook', description: 'Official TypeScript docs and type system guide', url: 'https://www.typescriptlang.org/docs', category: 'docs' },
      { name: 'Type Challenges', description: 'Solve TypeScript type puzzles from warm-up to extreme', url: 'https://github.com/type-challenges/type-challenges', category: 'interactive' },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Phase 3: React and Next.js',
    track: 'core',
    weeks: 'Weeks 11–20',
    startWeek: 11,
    endWeek: 20,
    goal: 'Move from pages to applications: components, state, data fetching, routing and server rendering. This is the core of your internship pitch.',
    tagline: 'Modern Declarative UI & Full-Stack React Architecture',
    comicMentor: 'nova',
    comicQuote: 'UI is a pure function of state: f(state) = UI. Learn how hooks tick, when components re-render, and why Next.js server components change the game!',
    connectedSaga: 'web-dev',
    topics: [
      { id: 'p3-1', label: 'Components, props, JSX syntax, lists and unique keys', detail: 'Pure components, unidirectional data flow, reconciliation and virtual DOM diffing' },
      { id: 'p3-2', label: 'Data fetching and server state caching with TanStack Query', detail: 'staleTime, cacheTime, useQuery, useMutation, query invalidation' },
      { id: 'p3-3', label: 'Hooks in depth: useState, useEffect, useRef, useMemo, custom hooks', detail: 'Dependency arrays, stale closures, DOM refs, memoizing expensive computations' },
      { id: 'p3-4', label: 'Next.js App Router, Server Components vs Client Components', detail: 'RSC streaming, async server components, "use client" boundaries, SSR vs SSG' },
      { id: 'p3-5', label: 'Context API, useReducer, and global state architecture', detail: 'Avoiding prop drilling, action dispatching, complex state machines' },
      { id: 'p3-6', label: 'Routing, layouts, loading skeletons, and error boundaries', detail: 'Nested layout templates, loading.tsx, error.tsx, not-found.tsx in Next.js' },
      { id: 'p3-7', label: 'Forms and runtime schema validation with Zod + React Hook Form', detail: 'Form state, controlled vs uncontrolled inputs, type-safe schema parsing' },
      { id: 'p3-8', label: 'Authentication flows, environment variables, and Vercel deployment', detail: 'OAuth, JWT storage, public vs private env vars, Edge runtime deployment' },
    ],
    practice: 'Rebuild: todo app, weather app, movie search with pagination, then a real-time dashboard with charts.',
    milestone: 'Ship a Next.js app with auth-ready layout, loading and error UI, real API data fetching, and deployed publicly on Vercel.',
    resources: [
      { name: 'react.dev/learn', description: 'Official React docs with interactive walkthroughs', url: 'https://react.dev/learn', category: 'docs', isPrimary: true },
      { name: 'Next.js Learn Course', description: 'Official hands-on full-stack dashboard course', url: 'https://nextjs.org/learn', category: 'interactive', isPrimary: true },
      { name: 'TanStack Query Docs', description: 'Powerful asynchronous state management for TS/JS', url: 'https://tanstack.com/query/latest', category: 'docs' },
      { name: 'Patterns.dev', description: 'Design and rendering patterns for modern web apps', url: 'https://www.patterns.dev', category: 'free-book' },
      { name: 'Full Stack Open (Univ of Helsinki)', description: 'Deep React, TypeScript, GraphQL and Node curriculum', url: 'https://fullstackopen.com/en', category: 'interactive' },
      { name: 'Zod Docs', description: 'TypeScript-first schema declaration and validation', url: 'https://zod.dev', category: 'docs' },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Phase 4: Node.js, Express, APIs and Prisma',
    track: 'core',
    weeks: 'Weeks 18–26',
    startWeek: 18,
    endWeek: 26,
    goal: 'Build the server half: REST APIs, middleware, authentication, validation and an ORM. Pairs with your Advanced Programming coursework.',
    tagline: 'Type-Safe Backend Engineering & Relational ORM Magic',
    comicMentor: 'pri',
    comicQuote: 'Prisma gives you compile-time type safety for your database queries. No more guessing table column names or runtime typos!',
    connectedSaga: 'prisma',
    topics: [
      { id: 'p4-1', label: 'Node.js runtime, event loop, modules (ESM/CJS), non-blocking async I/O', detail: 'libuv thread pool, EventEmitter, streams, buffers, file system operations' },
      { id: 'p4-2', label: 'Input validation with Zod and multipart file uploads with Multer', detail: 'Request body validation middleware, sanitized uploads, MIME type checks' },
      { id: 'p4-3', label: 'Express routing, custom middleware pipeline, central error handling', detail: 'app.use(), next(err), 4-argument error handler, status code consistency' },
      { id: 'p4-4', label: 'Prisma schema modeling, relations (1-1, 1-N, N-M), migrations, Client API', detail: 'prisma migrate dev, prisma generate, findUnique, findMany, include, select' },
      { id: 'p4-5', label: 'RESTful API design: resources, HTTP verbs, status codes, pagination', detail: 'GET/POST/PUT/PATCH/DELETE, 200/201/400/401/403/404/500, limit & offset' },
      { id: 'p4-6', label: 'Security: OWASP Top 10, rate limiting, helmet headers, CORS policy', detail: 'SQL injection prevention, XSS mitigation, express-rate-limit, cors origin config' },
      { id: 'p4-7', label: 'JWT tokens, cookie sessions, password hashing with bcrypt', detail: 'Salting passwords, sign/verify tokens, HTTP-only secure samesite cookies' },
      { id: 'p4-8', label: 'Logging (Winston/Pino), environment validation, API testing with Vitest', detail: 'Structured JSON logging, dotenv schema, Supertest endpoint assertions' },
    ],
    practice: 'Build a CRUD API 3 times with growing features: authentication, pagination, search, rate limiting, and role-based access control.',
    milestone: 'A documented REST API built in Express and Prisma, protected by JWT auth, with automated integration tests and a Postman / OpenAPI collection.',
    resources: [
      { name: 'Prisma Docs & Guides', description: 'Official Prisma v7 documentation & tutorials', url: 'https://www.prisma.io/docs', category: 'docs', isPrimary: true },
      { name: 'Node.js Official Learn', description: 'Runtime fundamentals and core architecture', url: 'https://nodejs.org/en/learn', category: 'docs' },
      { name: 'Node.js Best Practices Checklist', description: 'The largest GitHub repository of Node architecture tips', url: 'https://github.com/goldbergyoni/nodebestpractices', category: 'docs' },
      { name: 'Microsoft REST API Guidelines', description: 'Industry standards for designing scalable REST APIs', url: 'https://github.com/microsoft/api-guidelines', category: 'docs' },
      { name: 'OWASP Top 10 Security Risks', description: 'Essential web vulnerability defense checklist', url: 'https://owasp.org/www-project-top-ten', category: 'docs' },
      { name: 'jwt.io Introduction', description: 'Interactive debugger and guide for JSON Web Tokens', url: 'https://jwt.io/introduction', category: 'interactive' },
    ],
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Phase 5: DBMS, SQL and PostgreSQL',
    track: 'core',
    weeks: 'Weeks 20–30',
    startWeek: 20,
    endWeek: 30,
    goal: 'Understand relational theory and write confident SQL. This directly supports your DBMS exams and every backend interview.',
    tagline: 'Relational Database Theory & Advanced SQL Mastery',
    comicMentor: 'prof_tuple',
    comicQuote: 'Data without relations is chaos. Master B-Tree indexes, isolation levels, and ACID transactions, and your queries will fly!',
    connectedSaga: 'sql',
    topics: [
      { id: 'p5-1', label: 'Relational model, primary & foreign keys, ER diagrams', detail: 'Entity-relationship modeling, referential integrity, ON DELETE CASCADE' },
      { id: 'p5-2', label: 'Transactions, ACID guarantees, isolation levels (Read Committed to Serializable)', detail: 'Atomicity, Consistency, Isolation, Durability, dirty reads, phantom reads' },
      { id: 'p5-3', label: 'Normalization: 1NF, 2NF, 3NF, BCNF and functional dependencies', detail: 'Decomposition, lossless join, dependency preservation, eliminating redundancy' },
      { id: 'p5-4', label: 'Concurrency control, row-level locking, deadlocks, MVCC in Postgres', detail: 'SELECT FOR UPDATE, shared vs exclusive locks, multi-version concurrency control' },
      { id: 'p5-5', label: 'Advanced SQL: multi-table JOINs, GROUP BY, HAVING, Window Functions, CTEs', detail: 'ROW_NUMBER(), RANK(), DENSE_RANK(), PARTITION BY, WITH RECURSIVE' },
      { id: 'p5-6', label: 'Production schema design and constraint enforcement', detail: 'CHECK constraints, UNIQUE constraints, default values, schema migrations' },
      { id: 'p5-7', label: 'Indexes (B-Tree, Hash, GIN), query execution plans, EXPLAIN ANALYZE', detail: 'Index scans vs sequential scans, cost estimation, composite index column ordering' },
      { id: 'p5-8', label: 'Modern PostgreSQL features: JSONB querying and full-text search', detail: 'jsonb_set, GIN indexing on JSON, tsvector, tsquery, fuzzy matching' },
    ],
    practice: 'Finish PG Exercises completely, then complete the LeetCode SQL 50 study plan. Redraw ER diagrams from previous projects in dbdiagram.io.',
    milestone: 'Design and optimize a 6-table database for an e-commerce platform; write complex queries with window functions and prove sub-5ms performance using EXPLAIN ANALYZE.',
    resources: [
      { name: 'CMU 15-445 Database Systems (Andy Pavlo)', description: 'The legendary database architecture course lectures', url: 'https://15445.courses.cs.cmu.edu', category: 'video', isPrimary: true },
      { name: 'PostgreSQL Official Documentation', description: 'The definitive reference for Postgres internals and SQL', url: 'https://www.postgresql.org/docs', category: 'docs', isPrimary: true },
      { name: 'PG Exercises', description: 'Hands-on practice queries run directly in browser', url: 'https://pgexercises.com', category: 'interactive' },
      { name: 'Use The Index, Luke!', description: 'Essential developer guide to database indexes and performance', url: 'https://use-the-index-luke.com', category: 'free-book' },
      { name: 'SQLBolt', description: 'Interactive introductory SQL tutorials', url: 'https://sqlbolt.com', category: 'interactive' },
      { name: 'LeetCode Top SQL 50', description: 'Curated interview-focused SQL problem set', url: 'https://leetcode.com/studyplan/top-sql-50', category: 'practice' },
      { name: 'dbdiagram.io', description: 'Draw relational database diagrams with code syntax', url: 'https://dbdiagram.io', category: 'interactive' },
    ],
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Phase 6: DSA in Python (Basic to Advanced)',
    track: 'parallel',
    weeks: 'Weeks 1–40 (Daily)',
    startWeek: 1,
    endWeek: 40,
    goal: 'Daily problem solving builds speed and pattern recognition. Start easy, always re-solve misses, and move to advanced topics only after core patterns feel natural.',
    tagline: 'The Daily Problem Solving Marathon: 40 Weeks of Algorithmic Mastery',
    comicMentor: 'professor',
    comicQuote: 'Algorithms are the sheet music of computing. Practice daily, study your mistakes, and the patterns will reveal themselves like magic!',
    connectedSaga: 'python-dsa',
    topics: [
      { id: 'p6-1', label: 'Python fundamentals: lists, dicts, sets, collections.deque, heapq, bisect', detail: 'List comprehensions, defaultdict, Counter, binary search via bisect_left' },
      { id: 'p6-2', label: 'Trees, Binary Search Trees (BST), Heaps, and Tries', detail: 'In-order/pre-order traversals, lowest common ancestor, min-heap sift-up/down, prefix trees' },
      { id: 'p6-3', label: 'Big-O asymptotic analysis, master theorem, and recursion trees', detail: 'Time and space complexity bounds, recursion stack frames, recurrence relations' },
      { id: 'p6-4', label: 'Graphs: BFS, DFS, Topological Sort (Kahn\'s algorithm), Disjoint Set Union (DSU)', detail: 'Adjacency lists, visited sets, cycle detection, union by rank and path compression' },
      { id: 'p6-5', label: 'Arrays, Hash Maps, Two Pointers, and Sliding Window techniques', detail: 'Fast/slow pointers, left/right window contractions, prefix sum maps' },
      { id: 'p6-6', label: 'Dynamic Programming (1D & 2D memoization / tabulation), Backtracking', detail: 'State transitions, base cases, knapsack variations, N-Queens, subset generation' },
      { id: 'p6-7', label: 'Stacks, Queues, Monotonic Stack, and Linked Lists (Singly/Doubly)', detail: 'Next greater element, sliding window maximum, cycle detection via Floyd\'s algorithm' },
      { id: 'p6-8', label: 'Advanced: Dijkstra, Prim\'s/Kruskal\'s MST, Segment Tree, Bitmask DP', detail: 'Shortest paths with priority queues, range queries with lazy propagation, state compression' },
    ],
    practice: 'Solve 2 problems every single day: 1 morning 5 AM quest + 1 evening homework quest. Maintain your streak without dropping shields.',
    milestone: 'Solve 200+ problems across NeetCode 150 and LeetCode Top Interview 150 with clean, well-commented Python implementations and Big-O explanations.',
    resources: [
      { name: 'NeetCode Roadmap & Solutions', description: 'Visual pattern roadmap with video walkthroughs', url: 'https://neetcode.io', category: 'video', isPrimary: true },
      { name: 'Problem Solving with Algorithms & DS in Python', description: 'Free interactive textbook with code runner', url: 'https://runestone.academy/ns/books/published/pythonds3/index.html', category: 'free-book', isPrimary: true },
      { name: 'LeetCode Top Interview 150', description: 'Curated interview study plan', url: 'https://leetcode.com/studyplan/top-interview-150', category: 'practice' },
      { name: 'Striver\'s A2Z DSA Sheet', description: 'Comprehensive topic-by-topic structured curriculum', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2', category: 'practice' },
      { name: 'Abdul Bari YouTube Lectures', description: 'World-renowned algorithm intuition and whiteboard proofs', url: 'https://www.youtube.com/@abdul_bari', category: 'video' },
      { name: 'VisuAlgo.net', description: 'Animated visualizer for algorithms and data structures', url: 'https://visualgo.net', category: 'interactive' },
      { name: 'CP-Algorithms', description: 'Advanced competitive programming algorithm reference', url: 'https://cp-algorithms.com', category: 'docs' },
    ],
  },
  {
    id: 'phase-7',
    number: 7,
    title: 'Phase 7: Maths: Discrete, Graphs, Linear Algebra, Calculus, Probability',
    track: 'parallel',
    weeks: 'Weeks 1–32',
    startWeek: 1,
    endWeek: 32,
    goal: 'Math is the long game: discrete and graphs improve DSA now, linear algebra and calculus unlock ML, and probability underpins data science and interviews.',
    tagline: 'The Mathematical Underpinnings of Computer Science & Artificial Intelligence',
    comicMentor: 'prof_pivot',
    comicQuote: 'Matrices are not just grids of numbers—they are geometric transformations that bend and rotate vector spaces! Understand eigenvalues and you understand the universe.',
    connectedSaga: 'linear-algebra',
    topics: [
      { id: 'p7-1', label: 'Mathematical logic, sets, relations, mathematical induction, proof techniques', detail: 'Truth tables, predicate calculus, direct/contradiction proofs, strong induction' },
      { id: 'p7-2', label: 'Calculus: derivatives, partial derivatives, gradients, chain rule, optimization', detail: 'Rate of change, tangent hyperplanes, gradient descent mechanics' },
      { id: 'p7-3', label: 'Combinatorics, recurrences, number theory, modular arithmetic, Chinese Remainder Theorem', detail: 'Permutations, combinations, pigeonhole principle, Euclidean GCD, modular inverse' },
      { id: 'p7-4', label: 'Integrals and infinite series as needed for continuous models', detail: 'Riemann sums, improper integrals, Taylor series expansions' },
      { id: 'p7-5', label: 'Graph theory: paths, cycles, trees, matchings, bipartite graphs, vertex coloring', detail: 'Eulerian/Hamiltonian paths, Hall\'s marriage theorem, chromatic numbers' },
      { id: 'p7-6', label: 'Probability theory: Bayes\' theorem, discrete/continuous distributions, expectation, variance', detail: 'Conditional probability, binomial, Poisson, normal distributions, linearity of expectation' },
      { id: 'p7-7', label: 'Linear algebra: vectors, matrices, dot/cross products, eigenvalues, eigenvectors, SVD', detail: 'Matrix multiplication, rank, null space, orthogonal projections, Singular Value Decomposition' },
      { id: 'p7-8', label: 'Statistics: parameter estimation, confidence intervals, hypothesis testing, p-values', detail: 'Maximum likelihood estimation, central limit theorem, z-tests, t-tests' },
    ],
    practice: 'Solve 5 discrete math proof problems per week. Implement matrix multiplication, Gaussian elimination, and gradient descent from scratch in Python.',
    milestone: 'Write a self-contained Python notebook computing eigenvalues and SVD from first principles and applying them to image compression or PCA dimensionality reduction.',
    resources: [
      { name: 'Mathematics for Computer Science (MIT 6.042J)', description: 'Free MIT textbook covering discrete maths and proofs', url: 'https://courses.csail.mit.edu/6.042/spring18/mcs.pdf', category: 'free-book', isPrimary: true },
      { name: '3Blue1Brown: Essence of Linear Algebra', description: 'The absolute best visual intuition for vectors and matrices', url: 'https://www.3blue1brown.com/topics/linear-algebra', category: 'video', isPrimary: true },
      { name: '3Blue1Brown: Essence of Calculus', description: 'Visual, geometric explanations of derivatives and integrals', url: 'https://www.3blue1brown.com/topics/calculus', category: 'video' },
      { name: 'Discrete Mathematics: An Open Introduction', description: 'Free interactive textbook by Oscar Levin', url: 'https://discrete.openmathbooks.org', category: 'free-book' },
      { name: 'Book of Proof (Hammack)', description: 'Learn how to read and write formal mathematical proofs', url: 'https://www.people.vcu.edu/~rhammack/BookOfProof', category: 'free-book' },
      { name: 'Project Euler', description: 'Challenging mathematical and computational problem set', url: 'https://projecteuler.net', category: 'practice' },
      { name: 'Seeing Theory: Visual Introduction to Probability', description: 'Interactive visualizations of probability and statistics', url: 'https://seeing-theory.brown.edu', category: 'interactive' },
    ],
  },
  {
    id: 'phase-8',
    number: 8,
    title: 'Phase 8: Brain Teasers, Logic and Real-Life Problem Solving',
    track: 'parallel',
    weeks: 'Ongoing (Weeks 1–40)',
    startWeek: 1,
    endWeek: 40,
    goal: 'Train how you think, not just what you know. Puzzle practice sharpens interview performance, aptitude tests and estimation skills.',
    tagline: 'Cognitive Agility, First-Principles Thinking & Fermi Estimation',
    comicMentor: 'sid',
    comicQuote: 'When an interviewer asks how many golf balls fit in a Boeing 747, they aren\'t testing your trivia knowledge—they are testing your structured thought process!',
    connectedSaga: 'dsa',
    topics: [
      { id: 'p8-1', label: 'Logic puzzles, pattern spotting, deductive reasoning, truth-teller/liar riddles', detail: 'Knights and knaves, weighing scale balances, river crossing optimization' },
      { id: 'p8-2', label: 'Contest-style math problems and Olympiad-level puzzles', detail: 'Invariance principles, extremal arguments, parity constraints' },
      { id: 'p8-3', label: 'Fermi estimation: how many X in Y, order of magnitude calculations', detail: 'Deconstructing massive quantities into sensible assumptions and multiplication bounds' },
      { id: 'p8-4', label: 'Think-aloud protocol: articulating assumptions and hypotheses clearly under pressure', detail: 'Stating constraints upfront, communicating trade-offs, sanity-checking solutions' },
      { id: 'p8-5', label: 'Aptitude test preparation: quantitative speed, logical reasoning, data interpretation', detail: 'Percentages, ratios, syllogisms, sequence completion, bar/pie chart deductions' },
      { id: 'p8-6', label: 'Decision frameworks, cognitive biases, probability intuition, Monty Hall problem', detail: 'Base rate fallacy, expected value calculations, risk vs reward matrices' },
    ],
    practice: 'Do 2 logic puzzles or quantitative questions every morning (10 minutes). Practice Fermi estimation on everyday observations.',
    milestone: 'Solve a medium Brainstellar quant puzzle out loud, clearly state all assumptions without rushing, and independently verify the answer using a secondary sanity-check.',
    resources: [
      { name: 'Brainstellar Quant & Logic Puzzles', description: 'Premier collection of quant interview brain teasers', url: 'https://brainstellar.com', category: 'interactive', isPrimary: true },
      { name: 'Art of Problem Solving (AoPS)', description: 'Challenging math competition problems and community', url: 'https://artofproblemsolving.com', category: 'interactive' },
      { name: 'Brilliant.org Logic & Math', description: 'Interactive visual puzzles and critical thinking courses', url: 'https://brilliant.org', category: 'interactive' },
      { name: 'IndiaBIX Aptitude', description: 'Standard campus placement aptitude and quantitative practice', url: 'https://www.indiabix.com', category: 'practice' },
      { name: 'How to Solve It by George Pólya', description: 'Classic manifesto on problem-solving heuristics', url: 'https://en.wikipedia.org/wiki/How_to_Solve_It', category: 'free-book' },
      { name: 'Lichess Tactics & Puzzles', description: 'Sharpen pattern recognition and sequential planning', url: 'https://lichess.org/training', category: 'interactive' },
    ],
  },
  {
    id: 'phase-9',
    number: 9,
    title: 'Phase 9: AI, Machine Learning and LLMs',
    track: 'parallel',
    weeks: 'Weeks 28–40+',
    startWeek: 28,
    endWeek: 40,
    goal: 'Start after Python, linear algebra and basic calculus feel comfortable. Go classical ML first, then deep learning, then build real applications with LLMs.',
    tagline: 'From Statistical Machine Learning to Modern Generative AI & Agents',
    comicMentor: 'nova',
    comicQuote: 'Generative AI is not magic—it is attention mechanisms multiplying high-dimensional embedding tensors! Harness LLMs to supercharge your apps.',
    connectedSaga: 'web-dev',
    topics: [
      { id: 'p9-1', label: 'Python scientific data stack: NumPy arrays, pandas DataFrames, Matplotlib visualization', detail: 'Vectorized operations, broadcasting, grouping, filtering, line and heatmap plots' },
      { id: 'p9-2', label: 'Neural networks, computational graphs, backpropagation, and PyTorch tensors', detail: 'Forward pass, loss functions (cross-entropy/MSE), autograd, optimizers (Adam)' },
      { id: 'p9-3', label: 'Supervised vs unsupervised learning algorithms and foundational workflows', detail: 'Linear/logistic regression, decision trees, random forests, k-means clustering' },
      { id: 'p9-4', label: 'Transformer architectures and self-attention mechanisms (intuitive grasp)', detail: 'Query/Key/Value vectors, multi-head attention, positional encoding, tokens' },
      { id: 'p9-5', label: 'Evaluation metrics: precision, recall, F1 score, ROC-AUC, confusion matrices', detail: 'Class imbalance handling, accuracy paradox, sensitivity vs specificity' },
      { id: 'p9-6', label: 'Prompt engineering, Retrieval-Augmented Generation (RAG), tool calling, autonomous agents', detail: 'Few-shot prompting, system instructions, cosine similarity retrieval, function calling' },
      { id: 'p9-7', label: 'Overfitting prevention: regularization (L1/L2), dropout, k-fold cross-validation', detail: 'Bias-variance tradeoff, early stopping, hyperparameter tuning' },
      { id: 'p9-8', label: 'Deploying an AI-powered feature in a production web application', detail: 'Streaming responses, rate limiting, token cost optimization, Vercel AI SDK integration' },
    ],
    practice: 'Enter 2 Kaggle beginner competitions (Titanic / Housing). Code linear regression and a 2-layer neural network from scratch using only NumPy.',
    milestone: 'A deployed AI-powered web app (such as a RAG assistant querying your custom notes or documents) with streaming token responses and clean UI.',
    resources: [
      { name: 'Andrew Ng Machine Learning Specialization', description: 'The golden standard introductory ML course on Coursera', url: 'https://www.coursera.org/specializations/machine-learning-introduction', category: 'video', isPrimary: true },
      { name: 'Andrej Karpathy: Neural Networks Zero to Hero', description: 'Build micrograd, makemore, and GPT from scratch in pure Python', url: 'https://karpathy.ai/zero-to-hero.html', category: 'video', isPrimary: true },
      { name: 'Google Machine Learning Crash Course', description: 'Free, fast, hands-on ML course by Google engineers', url: 'https://developers.google.com/machine-learning/crash-course', category: 'interactive' },
      { name: 'Fast.ai: Practical Deep Learning for Coders', description: 'Top-down, code-first deep learning curriculum', url: 'https://course.fast.ai', category: 'video' },
      { name: 'Hands-On Machine Learning (Aurélien Géron)', description: 'Best practical book for scikit-learn, Keras and TensorFlow', url: 'https://github.com/ageron/handson-ml3', category: 'free-book' },
      { name: '3Blue1Brown: Neural Networks', description: 'Visual explanation of backpropagation and gradient descent', url: 'https://www.3blue1brown.com/topics/neural-networks', category: 'video' },
      { name: 'Hugging Face Learn & NLP Course', description: 'Comprehensive guide to modern Transformers and LLMs', url: 'https://huggingface.co/learn', category: 'interactive' },
    ],
  },
  {
    id: 'phase-10',
    number: 10,
    title: 'Phase 10: Ship, Test, Deploy, System Design and Interviews',
    track: 'career',
    weeks: 'Weeks 24–40',
    startWeek: 24,
    endWeek: 40,
    goal: 'Turn skills into proof. Recruiters hire for shipped projects, clear communication, engineering taste and solid computer science fundamentals.',
    tagline: 'Production Engineering, System Design & Career Launchpad',
    comicMentor: 'professor',
    comicQuote: 'A project that only runs on localhost does not exist to recruiters! Ship it, test it with CI, write an inspiring README, and showcase your craftsmanship.',
    connectedSaga: 'dsa',
    topics: [
      { id: 'p10-1', label: 'Unit testing, integration testing, and end-to-end (E2E) testing with Playwright & Vitest', detail: 'Test-driven principles, mocking network requests, asserting DOM and API behaviors' },
      { id: 'p10-2', label: 'Operating systems fundamentals: processes, threads, virtual memory, CPU scheduling', detail: 'Context switching, paging, virtual address spaces, deadlock prevention' },
      { id: 'p10-3', label: 'Continuous Integration / Continuous Deployment (CI/CD) with GitHub Actions', detail: 'YAML workflows, test automation on PR, automated container build & deployment' },
      { id: 'p10-4', label: 'Resume, GitHub profile README, and LinkedIn optimization for tech recruiters', detail: 'STAR method bullet points, quantifiable metric impacts, pinned showcase repos' },
      { id: 'p10-5', label: 'Cloud deployment: Vercel, Render, Railway, Docker Compose, AWS/GCP basics', detail: 'Multi-stage builds, reverse proxies, environment secrets, SSL certificates' },
      { id: 'p10-6', label: 'Mock interviews: live coding, behavioral stories (STAR method), technical communication', detail: 'Explaining thought processes out loud, handling hints, writing clean readable code' },
      { id: 'p10-7', label: 'System design essentials: horizontal scaling, load balancers, caching, message queues', detail: 'CDN caching, Redis LRU, Kafka/RabbitMQ decoupling, database sharding & read replicas' },
      { id: 'p10-8', label: 'Freelancing & Internship outreach: scoping, contract templates, client communication', detail: 'Cold email pitches, defining MVP scope, pricing value vs hours, deliverable tracking' },
    ],
    practice: 'Complete 1 live mock interview per week from week 32. Update your resume with STAR bullet points highlighting measurable outcomes.',
    milestone: '3 deployed full-stack projects with comprehensive READMEs & demo videos, 300+ DSA problems solved, 10 peer mock interviews completed, and 30+ tailored applications sent.',
    resources: [
      { name: 'System Design Primer (Donne Martin)', description: 'The universally acclaimed GitHub roadmap for system design', url: 'https://github.com/donnemartin/system-design-primer', category: 'docs', isPrimary: true },
      { name: 'Operating Systems: Three Easy Pieces (OSTEP)', description: 'Free classic OS textbook explaining virtualization, concurrency & persistence', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP', category: 'free-book', isPrimary: true },
      { name: 'Playwright Documentation', description: 'Fast, reliable end-to-end testing for modern web apps', url: 'https://playwright.dev', category: 'docs' },
      { name: 'Vitest Guide', description: 'Next generation fast unit test runner powered by Vite', url: 'https://vitest.dev', category: 'docs' },
      { name: 'roadmap.sh', description: 'Community-driven developer roadmaps for all specializations', url: 'https://roadmap.sh', category: 'interactive' },
      { name: 'Pramp', description: 'Free peer-to-peer technical mock interviews', url: 'https://www.pramp.com', category: 'interactive' },
      { name: 'Good First Issue', description: 'Curated open source issues perfect for first-time contributors', url: 'https://goodfirstissue.dev', category: 'practice' },
    ],
  },
];

export interface ReadinessChecklistItem {
  id: string;
  category: 'github' | 'resume' | 'dsa' | 'concepts' | 'networking' | 'freelance';
  label: string;
  detail: string;
}

export const READINESS_CHECKLIST: ReadinessChecklistItem[] = [
  {
    id: 'rc-1',
    category: 'github',
    label: 'GitHub Profile README & Pinned Repos',
    detail: 'Profile README with stats, skills badges, and 4–6 pinned showcase repositories containing live demo links, architecture diagrams, and GIF walkthroughs.',
  },
  {
    id: 'rc-2',
    category: 'resume',
    label: 'Single-Page High-Impact Tech Resume',
    detail: 'One-page PDF formatted cleanly. Every project has 2–3 STAR method bullet points with measurable outcomes (e.g. "Reduced load latency by 45% using Redis caching").',
  },
  {
    id: 'rc-3',
    category: 'resume',
    label: 'Online Portfolio with Project Case Studies',
    detail: 'Live portfolio featuring deep case studies detailing the architecture problem, trade-offs evaluated, tech stack choices, and key learnings.',
  },
  {
    id: 'rc-4',
    category: 'dsa',
    label: '150+ LeetCode / DSA Problems Solved with Active Streak',
    detail: 'Comfortable with core patterns: two pointers, sliding window, BFS/DFS, binary search, heaps, and 1D dynamic programming.',
  },
  {
    id: 'rc-5',
    category: 'concepts',
    label: 'Verbal Mastery of Core CS & Web Fundamentals',
    detail: 'Can explain HTTP/HTTPS, REST status codes, JWT auth flows, SQL JOINs vs indexing, ACID properties, and React reconciliation out loud without notes.',
  },
  {
    id: 'rc-6',
    category: 'networking',
    label: 'Active LinkedIn Outreach Rhythm (5 People / Week)',
    detail: 'Engaging thoughtfully with engineering founders, tech leads, and alumni. Reaching out with tailored, concise messages referencing their company\'s public engineering work.',
  },
  {
    id: 'rc-7',
    category: 'freelance',
    label: 'Freelance Pitch Kit Ready to Deploy',
    detail: 'A simple one-page service offerings menu, 2 client-ready demo projects, standard milestone pricing structure, and a mutual contract agreement template.',
  },
];
