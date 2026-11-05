import {
  PrismaQuestLevel,
  PrismaBossChallenge,
  PrismaQuickFire,
  PrismaFlashcard,
  PrismaMatchPair,
  PrismaPosterTable,
} from '../types/prismaTypes';

export const prismaGlossary = [
  { word: 'Database', meaning: 'A program that stores data safely, usually in tables (PostgreSQL, MySQL...).' },
  { word: 'Table / row / column', meaning: 'Table = a sheet. Row = one record (one user). Column = one property (email).' },
  { word: 'Primary key (PK)', meaning: 'A column whose value is different for every row; it identifies the row (usually id).' },
  { word: 'Foreign key (FK)', meaning: 'A column that stores the primary key of a row in another table; it creates the link.' },
  { word: 'Schema', meaning: 'The description of your tables. In Prisma it is the file schema.prisma.' },
  { word: 'Model', meaning: 'A Prisma block describing one table, e.g. model User { ... }.' },
  { word: 'Relation', meaning: 'A link between two models (one-to-one, one-to-many, many-to-many).' },
  { word: 'Migration', meaning: 'A saved change to the database structure, stored as an SQL file.' },
  { word: 'Shadow database', meaning: 'A temporary database Prisma uses to work out what a new migration should contain.' },
  { word: 'Drift', meaning: 'When the real database no longer matches the migration history.' },
  { word: 'Seed', meaning: 'Starter data inserted by a script.' },
  { word: 'Adapter (driver adapter)', meaning: 'A small package that lets Prisma Client talk to a specific database driver such as pg.' },
  { word: 'Transaction', meaning: 'A group of steps that all succeed or all fail.' },
  { word: 'N+1 problem', meaning: 'Doing 1 query plus 1 extra query per row; slow. Fix with include or select.' },
  { word: 'Idempotent', meaning: 'Safe to run many times with the same result (like upsert).' },
  { word: 'Nested write', meaning: 'Creating or linking related records inside one query using create, connect...' },
  { word: 'Introspection', meaning: 'Reading an existing database and generating the Prisma schema from it (db pull).' },
  { word: 'Cascade', meaning: 'Automatically delete/update child rows when the parent changes.' },
  { word: 'Node.js', meaning: 'A program that runs JavaScript outside the browser.' },
  { word: 'Event loop', meaning: 'The Node mechanism that runs callbacks when slow tasks (files, network) finish.' },
  { word: 'Module (ESM / CJS)', meaning: 'A file that exports and imports things. ESM uses import/export, CJS uses require.' },
  { word: 'npm / package.json', meaning: 'npm downloads packages; package.json lists them and your scripts.' },
  { word: 'Promise / async-await', meaning: 'An object for a future result / easy syntax to wait for it.' },
  { word: 'Environment variable', meaning: 'A setting kept outside the code (like DATABASE_URL), read from process.env.' },
  { word: 'Express', meaning: 'A small framework for building web servers and APIs in Node.' },
  { word: 'Middleware', meaning: 'A function that runs between the request and the route; calls next() to continue.' },
  { word: 'REST API', meaning: 'A way to design HTTP APIs: nouns in URLs, methods as actions, status codes as results.' },
  { word: 'HTTP status code', meaning: 'A number saying what happened: 200 OK, 201 Created, 404 Not Found, 500 Server Error.' },
  { word: 'JWT', meaning: 'A signed token the client sends to prove who it is. Readable but cannot be forged.' },
  { word: 'Hash (bcrypt)', meaning: 'A one-way scrambled form of a password, safe to store.' },
  { word: 'Index (database)', meaning: 'A lookup structure that makes searches on a column fast.' },
  { word: 'Soft delete', meaning: 'Marking a row as deleted (deletedAt) instead of removing it.' },
  { word: 'Client extension', meaning: 'A plug-in for Prisma Client made with $extends (methods, computed fields, query hooks).' },
  { word: 'Race condition', meaning: 'A bug when two requests change the same data at once and overwrite each other.' },
  { word: 'CI/CD', meaning: 'Automatic pipeline that tests, builds and deploys your code after each push.' },
];

export const prismaQuestLevels: PrismaQuestLevel[] = [
  {
    level: 1,
    day: 1,
    title: 'Node.js Foundations',
    subtitle: 'N1 - N4: Event Loop, Non-Blocking I/O, Modules & Environment Variables',
    focus: 'Event loop, modules, async/await, env vars. Run every example.',
    topics: [
      {
        id: 'n1',
        code: 'N1',
        level: 1,
        title: 'Node.js Runtime and the Event Loop',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'My server froze when one user asked for a huge report!' },
          { speaker: 'pri', speech: 'Node has ONE main thread. A long loop blocks everyone. Use async I/O or worker threads.' },
          { speaker: 'bug', speech: 'Use readFileSync in a request handler and I will freeze your whole site. Hehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Node.js lets JavaScript run on your computer, not only in a browser. Imagine a restaurant with one waiter. He takes an order, hands it to the kitchen, and immediately serves the next table. When food is ready a bell rings and he delivers it. That is the event loop: one worker who never stands around waiting.',
          danger:
            'The danger: if the waiter personally cooks a 10-minute dish (a huge loop), every table waits. So slow work must go to the kitchen (async I/O) or to extra cooks (worker threads).',
        },
        detailedTheory:
          'Node.js is a program that runs JavaScript outside the browser. It combines the V8 engine (compiles JS to machine code), libuv (C library for event loop, thread pool, async I/O) and built-in modules.\n\nOrder of execution:\n1. All synchronous code (call stack)\n2. Microtask queue: process.nextTick first, then Promise callbacks (.then, await)\n3. Event-loop phases: Timers (setTimeout), Poll (I/O callbacks), Check (setImmediate). Microtasks are drained again after every callback!',
        codeLab: {
          title: 'Predict the Output (Execution Order)',
          code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// Output: A D C B`,
          output: 'A\nD\nC\nB',
          explanation: 'Sync code runs first (A, D). Promise callback is a microtask, running before timers (C). setTimeout callback runs last in timers phase (B).',
        },
        didYouKnow: 'Node.js is built on V8, the same JavaScript engine that powers Google Chrome.',
        memoryTrick: 'Sync first, then Micro, then Macro (timers).',
        remember: [
          'One thread + event loop = non-blocking I/O.',
          'Order: sync -> microtasks (nextTick, Promise) -> timers/poll/check.',
          'Never use ...Sync functions inside request handlers.',
        ],
        mcqs: [
          {
            id: 'QN1.1',
            question: 'What is the output order of the snippet in the Code Lab (A, setTimeout B, Promise C, D)?',
            options: ['A B C D', 'A D B C', 'A D C B', 'D A C B'],
            answerIndex: 2,
            explanation: 'Sync code first (A, D). Then microtasks (Promise C). Then timers (B).',
          },
          {
            id: 'QN1.2',
            question: 'Which statement about Node.js is true?',
            options: [
              'It runs your JavaScript on many threads by default',
              'It uses one main thread plus an event loop and non-blocking I/O',
              'It needs a browser to run',
              'It has a window object',
            ],
            answerIndex: 1,
            explanation: "Node's design is a single JS thread that never waits for I/O.",
          },
        ],
        codingQuest: {
          id: 'CN1.1',
          prompt: 'Write a script (ES module) that reads notes.txt WITHOUT blocking the event loop and prints how many characters it has.',
          solution: `import { readFile } from "node:fs/promises";
const text = await readFile("notes.txt", "utf8");
console.log(text.length);`,
          steps: [
            'Import the Promise version readFile from node:fs/promises (not callback or Sync).',
            'Use top-level await (works in ES modules).',
            'Pass "utf8" encoding to receive text rather than a raw Buffer.',
          ],
        },
        mythTraps: [
          {
            id: 'MN1.1',
            statement: 'setTimeout(fn, 0) runs immediately, so before any Promise callback.',
            factCheck: 'False! Promise callbacks are microtasks and always run before timers, even setTimeout(fn, 0). Order: sync code, microtasks, then timers.',
          },
        ],
      },
      {
        id: 'n2',
        code: 'N2',
        level: 1,
        title: 'Modules, package.json and npm',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: "It says 'Cannot use import statement outside a module'. Help!" },
          { speaker: 'pri', speech: 'Add "type": "module" to package.json and Node will understand import/export.' },
          { speaker: 'bug', speech: 'Commit node_modules to git and your repo becomes 300 MB. Wonderful!' },
        ],
        inSimpleWords: {
          comparison:
            'A module is one file that shares some things and uses things from other files, like LEGO bricks that click together. npm is the huge shop where you download bricks other people built. package.json is your shopping list plus instructions (scripts) for your project.',
          danger: 'Two styles of LEGO exist: CommonJS (require) and ES Modules (import). Modern projects and Prisma v7 use ES Modules.',
        },
        detailedTheory:
          'CommonJS uses require() and module.exports. ES Modules use import and export. Turn ESM on with "type": "module" in package.json.\n\nDependencies vs devDependencies:\n- dependencies: needed at runtime (express, @prisma/client, pg, dotenv)\n- devDependencies: needed only during development (typescript, tsx, prisma CLI)\n\nLockfile: package-lock.json pins exact versions. Commit it. Never commit node_modules (put it in .gitignore). In CI/CD, always run npm ci.',
        codeLab: {
          title: 'Typical Modern package.json',
          code: `{
  "name": "blog-api",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^5.0.0",
    "@prisma/client": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "tsx": "^4.0.0",
    "prisma": "^7.0.0"
  }
}`,
          explanation: '"type": "module" enables ESM. dev uses tsx watch for hot-reloading.',
        },
        didYouKnow: 'npx can run a tool once without installing it globally, for example npx prisma init.',
        memoryTrick: 'Dev tools -> devDependencies. Needed at runtime -> dependencies.',
        remember: [
          'Use ES Modules: "type": "module".',
          'dependencies = runtime, devDependencies = tools.',
          'Commit package-lock.json, never node_modules.',
          'CI uses npm ci.',
        ],
        mcqs: [
          {
            id: 'QN2.1',
            question: 'Which package.json line makes .js files use import/export?',
            options: ['"module": true', '"type": "module"', '"esm": "on"', '"imports": "es"'],
            answerIndex: 1,
            explanation: '"type": "module" switches the package to ES Modules.',
          },
          {
            id: 'QN2.2',
            question: 'Where does the prisma CLI package normally belong?',
            options: ['dependencies', 'devDependencies', 'scripts', 'nowhere'],
            answerIndex: 1,
            explanation: 'It is a development tool (generate, migrate); the runtime needs only @prisma/client.',
          },
        ],
        codingQuest: {
          id: 'CN2.1',
          prompt: 'Write the scripts section so that npm run dev runs src/server.ts with auto-restart using tsx, npm run build compiles with tsc, and npm start runs dist/server.js.',
          solution: `"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}`,
          steps: ['dev uses tsx watch', 'build calls tsc', 'start uses plain node on compiled JS'],
        },
        mythTraps: [
          {
            id: 'MN2.1',
            statement: 'npm install and npm ci are the same.',
            factCheck: 'npm ci deletes node_modules and installs exactly the pinned versions in package-lock.json without touching it. npm install can modify the lockfile.',
          },
          {
            id: 'MN2.2',
            statement: 'I can still use require() when package.json has type: module.',
            factCheck: 'False. require is not defined in ES modules; use import (or createRequire as a workaround).',
          },
        ],
      },
      {
        id: 'n3',
        code: 'N3',
        level: 1,
        title: 'Asynchronous JavaScript: Promises and async/await',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'My two queries take 2 seconds in total. Why so slow?' },
          { speaker: 'pri', speech: 'You await them one after another. Start both and use Promise.all!' },
          { speaker: 'bug', speech: 'Forget await on create() and I will crash your app with an unhandled rejection!' },
        ],
        inSimpleWords: {
          comparison:
            'Ordering pizza is async. You place the order, do other things, and eat when it arrives. A Promise is the order receipt: pending now, later fulfilled or rejected. async/await lets you write code in natural top-to-bottom order without freezing the server.',
          danger: 'Two independent queries? Start both at once with Promise.all instead of waiting for the first before starting the second.',
        },
        detailedTheory:
          'An async function always returns a Promise. await pauses ONLY that function until the Promise settles; the rest of Node keeps handling other requests. Handle errors with try/catch.\n\nPromise helpers:\n- Promise.all([a, b]): runs in parallel, rejects immediately if any fails (fastest for independent queries).\n- Promise.allSettled: waits for all to complete regardless of errors.\n\nSafety rule: every Prisma call returns a Promise. Always await it! Forgetting await leaves the promise running unhandled in the background.',
        codeLab: {
          title: 'Sequential vs Parallel Prisma Queries',
          code: `// Slow sequential: 1s + 1s = 2s
const users = await prisma.user.count();
const posts = await prisma.post.count();

// Fast parallel: max(1s, 1s) = 1s
const [u, p] = await Promise.all([
  prisma.user.count(),
  prisma.post.count()
]);`,
          explanation: 'Promise.all fires both queries simultaneously over separate pool connections.',
        },
        didYouKnow: 'Since Node 15, an unhandled Promise rejection crashes the process by default.',
        memoryTrick: 'Many independent awaits? Wrap them in Promise.all.',
        remember: [
          'async function = returns a Promise.',
          'await pauses ONLY that function.',
          'Independent tasks -> Promise.all.',
          'Always await Prisma calls.',
        ],
        mcqs: [
          {
            id: 'QN3.1',
            question: 'What does await do?',
            options: [
              'Blocks the entire Node process',
              'Pauses only the current async function until the Promise settles',
              'Turns code into a thread',
              'Cancels the Promise',
            ],
            answerIndex: 1,
            explanation: 'Other work continues on the single thread while this function waits.',
          },
          {
            id: 'QN3.2',
            question: 'How do you run two independent Prisma queries at the same time?',
            options: ['await a; await b;', 'Promise.all([a, b])', 'for...of loop', 'setTimeout'],
            answerIndex: 1,
            explanation: 'Promise.all starts both operations before waiting.',
          },
        ],
        codingQuest: {
          id: 'CN3.1',
          prompt: 'Write an async function getStats() that returns { users, posts } counts using parallel queries, and returns null if anything fails.',
          solution: `async function getStats() {
  try {
    const [users, posts] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
    ]);
    return { users, posts };
  } catch (e) {
    console.error(e);
    return null;
  }
}`,
          steps: ['Wrap with try/catch', 'Fire both in Promise.all', 'Destructure and return'],
        },
        mythTraps: [
          {
            id: 'MN3.1',
            statement: 'await blocks the whole server until it finishes.',
            factCheck: 'False! Only the async function that contains the await pauses. The event loop keeps serving other requests.',
          },
          {
            id: 'MN3.2',
            statement: 'Forgetting await before prisma.user.create is harmless.',
            factCheck: 'You get a pending Promise instead of data; code continues before the row is inserted and any DB error becomes an unhandled rejection.',
          },
        ],
      },
      {
        id: 'n4',
        code: 'N4',
        level: 1,
        title: 'Core Modules and Environment Variables',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'My app says DATABASE_URL is undefined, but I have a .env file!' },
          { speaker: 'pri', speech: "Node does not read .env alone. Add import 'dotenv/config' at the top." },
          { speaker: 'bug', speech: 'Commit your .env to GitHub and I will happily publish your passwords. Hehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Think of core modules as tools built into the Node box (node:fs, node:path, node:events). Environment variables are sticky notes taped to the machine holding secrets (database passwords, tokens) so they never get written into code.',
          danger: 'Everything read from process.env is a STRING or undefined. Number(process.env.PORT) is needed for numeric ports.',
        },
        detailedTheory:
          'Node core modules should be imported with the node: prefix (node:fs/promises, node:path, node:crypto, node:events). Always use path.join() instead of manual string concatenation so Windows backslashes and POSIX slashes are handled.\n\nEnvironment variables:\n- Read with process.env.KEY\n- Load with import "dotenv/config" at the entry point or node --env-file=.env\n- Never commit .env to version control; provide .env.example with dummy values.',
        codeLab: {
          title: 'Config Helper with Validation',
          code: `import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in environment");
}

export const config = { PORT, DATABASE_URL };`,
          explanation: 'Validates presence of secrets at startup so the application fails fast.',
        },
        didYouKnow: 'Node 20.6+ supports loading .env files natively with node --env-file=.env without extra packages.',
        memoryTrick: 'env = Everything Not Visible in code (secrets).',
        remember: [
          'node: prefix for core modules.',
          'process.env values are always strings.',
          '.env never in git; .env.example yes.',
          'Prisma v7: load env yourself (dotenv).',
        ],
        mcqs: [
          {
            id: 'QN4.1',
            question: 'What type is process.env.PORT?',
            options: ['number', 'string (or undefined)', 'boolean', 'object'],
            answerIndex: 1,
            explanation: 'Environment variables are always strings.',
          },
          {
            id: 'QN4.2',
            question: "Why use path.join('a', 'b') instead of 'a' + '/' + 'b'?",
            options: ['It is shorter', 'It uses the correct separator for the operating system', 'It is async', 'It checks the file exists'],
            answerIndex: 1,
            explanation: 'Windows uses backslashes, Linux uses slashes; path.join handles both.',
          },
        ],
        codingQuest: {
          id: 'CN4.1',
          prompt: 'Read PORT from environment as a number defaulting to 3000, and throw an Error if JWT_SECRET is missing.',
          solution: `const PORT = Number(process.env.PORT) || 3000;
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}`,
          steps: ['Use Number(process.env.PORT) || 3000', 'Check !process.env.JWT_SECRET and throw'],
        },
        mythTraps: [
          {
            id: 'MN4.1',
            statement: 'process.env.PORT is a number because I wrote PORT=3000 in .env.',
            factCheck: 'False! It is the string "3000". Always convert with Number() or parseInt().',
          },
          {
            id: 'MN4.2',
            statement: 'My repo is private, so committing .env is fine.',
            factCheck: 'Secrets leak through collaborators, forks, build logs, and backup dumps. Never commit .env.',
          },
        ],
      },
    ],
  },
  {
    level: 2,
    day: 2,
    title: 'Express and REST APIs',
    subtitle: 'N5 - N7: Routing, Middleware, Central Error Handler & REST Design',
    focus: 'Build a tiny server with middleware, routes and an error handler.',
    topics: [
      {
        id: 'n5',
        code: 'N5',
        level: 2,
        title: 'HTTP and Express Basics',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'I sent JSON with POST but req.body is undefined!' },
          { speaker: 'pri', speech: 'Add app.use(express.json()) before your routes so Express can read JSON.' },
          { speaker: 'bug', speech: 'Call res.json twice and I will throw a headers-already-sent error. Muahaha!' },
        ],
        inSimpleWords: {
          comparison:
            'A web server is a receptionist. A visitor (request) asks for something ("GET /users/5"). The receptionist checks the route list, directs to the handler desk, and the desk gives an answer with an HTTP status code.',
          danger: 'Send exactly one response per request. Calling res.json() twice triggers "Cannot set headers after they are sent".',
        },
        detailedTheory:
          'Express 5 handles routing, request params, query strings, and body parsing.\n- req.params: route parameters (/users/:id -> req.params.id)\n- req.query: query string (?page=2 -> req.query.page)\n- req.body: parsed JSON body (requires app.use(express.json()))\n\nHTTP Methods: GET (read), POST (create, 201), PUT (replace), PATCH (update), DELETE (remove, 204).',
        codeLab: {
          title: 'Express 5 Minimal App',
          code: `import express from "express";

export const app = express();
app.use(express.json());

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: \`Hello \${name}\`, page: req.query.page });
});

app.post("/echo", (req, res) => {
  res.status(201).json(req.body);
});`,
          explanation: 'Demonstrates params, query string, and 201 Created response.',
        },
        didYouKnow: 'Express 5 is now the default version installed by npm install express.',
        memoryTrick: 'PQB: Params (path), Query (?), Body (JSON).',
        remember: [
          'params = path, query = after ?, body = JSON.',
          'express.json() before routes.',
          'One response per request.',
          'Values from params/query are strings.',
        ],
        mcqs: [
          {
            id: 'QN5.1',
            question: 'In the route /users/:id, how do you read the id?',
            options: ['req.body.id', 'req.params.id', 'req.query.id', 'res.params.id'],
            answerIndex: 1,
            explanation: 'Path parameters live in req.params.',
          },
          {
            id: 'QN5.2',
            question: 'Which middleware is needed to read a JSON request body?',
            options: ['express.json()', 'express.static()', 'cors()', 'none'],
            answerIndex: 0,
            explanation: 'app.use(express.json()) parses incoming JSON bodies.',
          },
        ],
        codingQuest: {
          id: 'CN5.1',
          prompt: 'Add a route GET /users/:id that returns { id: <number> }, or status 400 with { error: "Invalid id" } if id is not a number.',
          solution: `app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  res.json({ id });
});`,
          steps: ['Parse with Number()', 'Check Number.isNaN() and return 400', 'Return { id }'],
        },
        mythTraps: [
          {
            id: 'MN5.1',
            statement: 'req.params.id is automatically a number.',
            factCheck: 'All route parameters are strings. You must convert with Number() and validate.',
          },
          {
            id: 'MN5.2',
            statement: 'I can call res.json() twice to send extra data.',
            factCheck: 'Throws "Cannot set headers after they are sent". Return immediately after sending.',
          },
        ],
      },
      {
        id: 'n6',
        code: 'N6',
        level: 2,
        title: 'Middleware and Error Handling',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'My server crashed at 3 AM because of one bad request!' },
          { speaker: 'pri', speech: 'Add an error middleware at the end. It catches errors and sends a clean JSON reply.' },
          { speaker: 'bug', speech: 'Forget next() and your request hangs forever. I love hanging requests!' },
        ],
        inSimpleWords: {
          comparison:
            'Middleware is airport security checkpoints: ID check, bag scan, boarding gate. Each either waves you through (next()) or stops you. The error handler is the lost-and-found desk at the end. Order is everything!',
          danger: 'Error handler MUST have 4 arguments: (err, req, res, next). Express uses function arity to identify error handlers.',
        },
        detailedTheory:
          'Middleware functions receive (req, res, next). They must call next() to continue or respond to stop the chain. Express runs middleware strictly in order of declaration.\n\nError-handling middleware signature: (err, req, res, next). In Express 5, rejected Promises inside async route handlers are automatically passed to error middleware without manual try/catch.',
        codeLab: {
          title: 'Central Error Handler and 404 Route',
          code: `// 404 handler for unmatched routes (after all routes)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler (ALWAYS LAST)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status ?? 500).json({
    error: err.message ?? "Server error"
  });
});`,
          explanation: 'Central error middleware handles all unhandled errors uniformly.',
        },
        didYouKnow: 'Popular middleware includes morgan (logging), cors, helmet (security headers), and express-rate-limit.',
        memoryTrick: 'Middleware chain: Log -> Parse -> Auth -> Route -> 404 -> Error.',
        remember: [
          'next() = continue, next(err) = jump to error handler.',
          'Error handler: exactly 4 parameters, registered last.',
          '404 handler goes after all routes.',
          'Express 5 automatically catches async rejections.',
        ],
        mcqs: [
          {
            id: 'QN6.1',
            question: 'How does Express recognise an error-handling middleware?',
            options: [
              "Its name is 'error'",
              'It has four parameters (err, req, res, next)',
              'It is registered with app.error()',
              'It returns a Promise',
            ],
            answerIndex: 1,
            explanation: 'Express inspects function.length === 4 to distinguish error handlers.',
          },
          {
            id: 'QN6.2',
            question: 'What does next(err) do?',
            options: ['Continues to next normal middleware', 'Skips to the error handler', 'Ends the process', 'Retries request'],
            answerIndex: 1,
            explanation: 'Passing any argument to next() jumps straight to error middleware.',
          },
        ],
        codingQuest: {
          id: 'CN6.1',
          prompt: 'Write a requestLogger middleware that logs "METHOD URL" and then continues.',
          solution: `function requestLogger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next();
}
app.use(requestLogger);`,
          steps: ['Define (req, res, next)', 'Log method and url', 'Call next()'],
        },
        mythTraps: [
          {
            id: 'MN6.1',
            statement: 'The order of app.use() calls does not matter.',
            factCheck: 'Order is everything. A 404 handler before routes blocks all routes; body parser after routes means empty req.body.',
          },
          {
            id: 'MN6.2',
            statement: 'In Express 5 I must wrap every async route in try/catch.',
            factCheck: 'False! Express 5 catches rejected Promises in async handlers automatically and forwards them to next(err).',
          },
        ],
      },
      {
        id: 'n7',
        code: 'N7',
        level: 2,
        title: 'REST API Design and Status Codes',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'Should I name my route /createPost or /deletePost?' },
          { speaker: 'pri', speech: 'No verbs in URLs! Use POST /posts and DELETE /posts/5. The method is the verb.' },
          { speaker: 'bug', speech: "Return 200 for every error and I'll confuse all the clients. Hehe!" },
        ],
        inSimpleWords: {
          comparison:
            'REST is a restaurant menu with consistent names. Things are nouns (/posts), actions are HTTP verbs (GET = read, POST = create, PATCH = update, DELETE = remove). Status codes are traffic lights: 2xx green (success), 4xx amber (client mistake), 5xx red (server crashed).',
          danger: 'Do not invent custom verbs in URLs like /getUserById or /modifyAccount.',
        },
        detailedTheory:
          'HTTP Status Codes to master:\n- 200 OK: successful GET/PATCH\n- 201 Created: successful POST\n- 204 No Content: successful DELETE\n- 400 Bad Request: malformed JSON or validation failure\n- 401 Unauthorized: missing or invalid credentials (who are you?)\n- 403 Forbidden: authenticated but lacks permission (access denied)\n- 404 Not Found: resource does not exist\n- 409 Conflict: duplicate unique key\n- 500 Internal Server Error: unexpected bug',
        codeLab: {
          title: 'RESTful Route Declaration Pattern',
          code: `export const postsRouter = Router();

postsRouter.get("/", listPosts);          // 200 OK (paginated)
postsRouter.get("/:id", getPost);         // 200 OK or 404
postsRouter.post("/", createPost);        // 201 Created
postsRouter.patch("/:id", updatePost);     // 200 OK
postsRouter.delete("/:id", deletePost);   // 204 No Content`,
          explanation: 'Clear noun URLs with HTTP verbs representing the operations.',
        },
        didYouKnow: "HTTP status 418 is 'I\\'m a teapot', an April Fools RFC joke permanently preserved in the spec.",
        memoryTrick: '2xx = Yay, 4xx = You, 5xx = Server.',
        remember: [
          'Nouns in URLs, verbs in HTTP methods.',
          '201 create, 204 delete, 404 missing, 409 duplicate.',
          '401 = Who are you? 403 = Not allowed.',
          'Consistent error shape: { error: { message: "..." } }.',
        ],
        mcqs: [
          {
            id: 'QN7.1',
            question: 'Which status code means a new resource was created?',
            options: ['200', '201', '204', '302'],
            answerIndex: 1,
            explanation: 'POST that creates a new resource returns 201 Created.',
          },
          {
            id: 'QN7.2',
            question: 'A user who is NOT logged in calls a protected route. The correct code is:',
            options: ['403', '401', '404', '409'],
            answerIndex: 1,
            explanation: '401 Unauthorized indicates authentication is required.',
          },
        ],
        codingQuest: {
          id: 'CN7.1',
          prompt: 'Design REST routes (method + path + status) for comments belonging to a post.',
          solution: `GET    /posts/:postId/comments      -> 200 (list comments)
POST   /posts/:postId/comments      -> 201 (create comment)
GET    /comments/:id                -> 200 / 404
PATCH  /comments/:id                -> 200 (update)
DELETE /comments/:id                -> 204 (delete)`,
          steps: ['Nested routes for creation/list', 'Top-level /comments/:id for specific entity mutations'],
        },
        mythTraps: [
          {
            id: 'MN7.1',
            statement: 'POST is the right method to update an existing record.',
            factCheck: 'Use PATCH (partial update) or PUT (full replacement). POST is for creating new resources.',
          },
          {
            id: 'MN7.2',
            statement: '401 and 403 mean the same thing.',
            factCheck: '401 = unauthenticated (not logged in). 403 = authenticated but unauthorized (forbidden for your role).',
          },
        ],
      },
    ],
  },
  {
    level: 3,
    day: 3,
    title: 'Foundations: ORM and Prisma',
    subtitle: '1 - 2: Impedance Mismatch, Prisma v7 Architecture & Driver Adapters',
    focus: 'Understand what an ORM is and where Prisma ORM v7 fits before touching syntax.',
    topics: [
      {
        id: '1',
        code: '1',
        level: 3,
        title: 'Object-Relational Mapping (ORM)',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'nova', speech: 'Ugh! My app speaks objects but my database speaks tables. They cannot understand each other!' },
          { speaker: 'pri', speech: "Meet the ORM: a translator! You say 'find users' and it writes the SQL for you." },
          { speaker: 'bug', speech: 'Forget how SQL works and I will sneak slow queries into your app. Hehehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Think of a database as Excel sheets (tables) with columns and rows. Your TypeScript code speaks objects ({ id: 1, name: "Ana" }). The gap between them is called the impedance mismatch. An ORM is a 2-way translator between rows and objects.',
          danger: 'An ORM is a convenience layer, not an excuse to ignore how SQL, joins, and indexes work.',
        },
        detailedTheory:
          'Relational databases store tabular data queried with SQL. Applications use object graphs. Prisma ORM is schema-first: you define schema.prisma and Prisma generates a 100% type-safe client from it.\n\nBenefits: compile-time type safety, IDE autocompletion, less raw SQL boilerplate, automated migrations.\nCosts: abstraction leaks, danger of N+1 query patterns if used carelessly.',
        codeLab: {
          title: 'Raw SQL vs Prisma Query',
          code: `// Raw SQL string (no type checking, typo caught only at runtime)
const rows = await db.query('SELECT id, email FROM "User" WHERE id = 1');

// Prisma Client (100% typed, autocompletion, compile errors)
const user = await prisma.user.findUnique({
  where: { id: 1 }
});
console.log(user?.email);`,
          explanation: 'Prisma provides compile-time safety and autocomplete for all fields.',
        },
        didYouKnow: 'The clash between object models and relational tables is called the object-relational impedance mismatch.',
        memoryTrick: 'ORM = Objects <-> Rows, Mapped.',
        remember: [
          'ORM = translator between tables and objects.',
          'Prisma is schema-first: ONE file (schema.prisma) describes everything.',
          'An ORM does not eliminate the database; know tables, keys and indexes.',
        ],
        mcqs: [
          {
            id: 'Q1.1',
            question: 'What core problem does an ORM solve?',
            options: [
              'Making the network faster',
              'The mismatch between relational tables and application objects',
              'Replacing the need for a database',
              'Encrypting stored data',
            ],
            answerIndex: 1,
            explanation: 'ORMs bridge relational rows/columns and application objects.',
          },
          {
            id: 'Q1.2',
            question: 'In Prisma ORM, where is the single source of truth for your data model?',
            options: ['A TypeScript class per model', 'The generated client folder', 'schema.prisma', 'The migrations table only'],
            answerIndex: 2,
            explanation: 'schema.prisma is the declarative source of truth.',
          },
        ],
        codingQuest: {
          id: 'C1.1',
          prompt: 'Write the raw SQL and Prisma Client call that return all users whose email ends with @example.com.',
          solution: `-- SQL
SELECT * FROM "User" WHERE email LIKE '%@example.com';

// Prisma Client
const users = await prisma.user.findMany({
  where: { email: { endsWith: '@example.com' } }
});`,
          steps: ['SQL uses LIKE % suffix', 'Prisma uses endsWith filter inside where'],
        },
        mythTraps: [
          {
            id: 'M1.1',
            statement: 'With an ORM I never need to know SQL, and an ORM is always slower than SQL.',
            factCheck: 'False on both counts! You still need SQL knowledge to optimize queries, and well-structured Prisma queries compile into efficient single-query SQL.',
          },
        ],
      },
      {
        id: '2',
        code: '2',
        level: 3,
        title: 'Prisma ORM Overview (v7 Architecture)',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'Prisma has so many parts! Schema, Client, Migrate, Studio... help!' },
          { speaker: 'pri', speech: 'Easy! Schema = plan, Migrate = builder, Client = remote control, Studio = window.' },
          { speaker: 'bug', speech: 'In v7 I hid your database URL inside prisma.config.ts. Good luck! Hehe.' },
        ],
        inSimpleWords: {
          comparison:
            'Building a house: schema.prisma is the blueprint. Prisma Migrate is the builder who constructs the rooms (tables). Prisma Client is the remote control to use the house (queries). Prisma Studio is the window to inspect the rooms.',
          danger: 'In Prisma v7: connection URLs live in prisma.config.ts, driver adapters (@prisma/adapter-pg) handle DB connections, and Prisma does not auto-load .env.',
        },
        detailedTheory:
          'Prisma ORM v7 major architecture updates:\n1. Generator provider = "prisma-client" with an explicit output directory (replaces legacy prisma-client-js in node_modules).\n2. Rust-free TypeScript runtime that connects through driver adapters like @prisma/adapter-pg or @prisma/adapter-neon.\n3. CLI database connection URL is declared in prisma.config.ts using defineConfig({ datasource: { url: env("DATABASE_URL") } }).\n4. Environment variables must be loaded via import "dotenv/config".\n5. migrate dev and migrate reset do NOT automatically run generate or seed.',
        codeLab: {
          title: 'Minimal prisma.config.ts (v7)',
          code: `import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  },
});`,
          explanation: 'v7 configuration file specifying schema path, migrations, seed script, and database URL.',
        },
        didYouKnow: "Prisma 7's client runs on pure TypeScript instead of a separate Rust binary engine, reducing deployment size drastically.",
        memoryTrick: 'S-M-C-S: Schema plans, Migrate builds, Client uses, Studio shows.',
        remember: [
          'Schema = what. Config = how/where. Client = use it. Migrate = change it.',
          'After editing the schema: run npx prisma generate.',
          'v7: import "dotenv/config" is your job.',
        ],
        mcqs: [
          {
            id: 'Q2.1',
            question: 'Which is NOT a component of Prisma ORM?',
            options: ['Prisma Client', 'Prisma Migrate', 'Prisma Studio', 'Sequelize'],
            answerIndex: 3,
            explanation: 'Sequelize is a completely different legacy ORM.',
          },
          {
            id: 'Q2.2',
            question: 'In Prisma v7, where does the database URL used by CLI commands live?',
            options: ['Inside schema.prisma datasource block', 'prisma.config.ts', 'package.json', 'The generated client'],
            answerIndex: 1,
            explanation: 'In Prisma v7, CLI connection settings live in prisma.config.ts.',
          },
        ],
        codingQuest: {
          id: 'C2.1',
          prompt: 'Write a prisma.config.ts pointing to prisma/schema.prisma, with migrations in prisma/migrations, reading DATABASE_URL from the environment.',
          solution: `import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});`,
          steps: ['Import dotenv/config', 'Use defineConfig from prisma/config', 'Set schema, migrations, datasource'],
        },
        mythTraps: [
          {
            id: 'M2.1',
            statement: 'I generate the client once and it stays correct forever.',
            factCheck: 'False! Client types are generated from your schema. After ANY change to schema.prisma you MUST rerun prisma generate.',
          },
          {
            id: 'M2.2',
            statement: 'Prisma v7 reads my .env file automatically.',
            factCheck: 'False! Prisma v7 does not auto-load .env. You must explicitly import "dotenv/config" or pass node --env-file.',
          },
        ],
      },
    ],
  },
  {
    level: 4,
    day: 3,
    title: 'Prisma Setup',
    subtitle: '3a: 6-Step Quickstart Recipe with Prisma Postgres',
    focus: 'Run the quickstart. Model User/Post/Profile.',
    topics: [
      {
        id: '3a',
        code: '3a',
        level: 4,
        title: 'Quickstart: Prisma ORM with Prisma Postgres',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'pri', speech: 'Six steps to your first query: install, init, schema, migrate, generate, query.' },
          { speaker: 'nova', speech: "My script says 'Cannot find module generated/prisma'. What did I do wrong?" },
          { speaker: 'pri', speech: 'You skipped prisma generate! That command writes the client code for you.' },
        ],
        inSimpleWords: {
          comparison:
            'The quickstart is a 6-step recipe: 1. init project, 2. install tools, 3. prisma init, 4. write models, 5. prisma migrate dev (builds tables), 6. prisma generate (builds TypeScript code).',
          danger: 'Remember: migrate dev updates the database; generate updates your TypeScript client files. You need both!',
        },
        detailedTheory:
          'Step-by-step setup in Prisma v7:\n1. npm install typescript tsx @types/node prisma --save-dev\n2. npm install @prisma/client @prisma/adapter-pg pg dotenv\n3. npx prisma init --datasource-provider postgresql --output ../generated/prisma\n4. Define models in prisma/schema.prisma\n5. npx prisma migrate dev --name init\n6. npx prisma generate\n7. Query using PrismaClient instantiated with driver adapter.',
        codeLab: {
          title: 'Client Instantiation with Driver Adapter (src/lib/prisma.ts)',
          code: `import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });`,
          explanation: 'Prisma Client v7 requires passing the driver adapter instance into the constructor.',
        },
        didYouKnow: 'npx prisma init --db can automatically provision a Prisma Postgres cloud database directly from your terminal.',
        memoryTrick: "I-I-S-M-G-Q: 'I Invent Smart Models, Generate Queries'.",
        remember: [
          'Order: init -> schema -> migrate dev -> generate -> query.',
          'Import PrismaClient from YOUR generated folder.',
          'Always $disconnect() at the end of one-off scripts.',
        ],
        mcqs: [
          {
            id: 'Q3a.1',
            question: 'Which command creates a migration file AND applies it to your development database?',
            options: ['prisma generate', 'prisma migrate dev', 'prisma db seed', 'prisma studio'],
            answerIndex: 1,
            explanation: 'prisma migrate dev creates the SQL file and applies it to dev DB.',
          },
          {
            id: 'Q3a.2',
            question: 'In v7 with the prisma-client generator, the PrismaClient import path is determined by:',
            options: ['node_modules/@prisma/client always', 'The output field of the generator block', 'The DATABASE_URL', 'prisma.config.ts only'],
            answerIndex: 1,
            explanation: 'The output field in generator client defines where client code is written.',
          },
        ],
        codingQuest: {
          id: 'C3a.1',
          prompt: 'Write a script that creates user Alice with one post, then prints all users with their posts.',
          solution: `import { prisma } from "./lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      posts: { create: { title: "Hello World", published: true } },
    },
  });
  const users = await prisma.user.findMany({ include: { posts: true } });
  console.dir(users, { depth: null });
}

main().finally(() => prisma.$disconnect());`,
          steps: ['Use prisma.user.create with nested posts: { create }', 'Query with include: { posts: true }', 'Disconnect in finally'],
        },
        mythTraps: [
          {
            id: 'M3a.1',
            statement: 'npm install @prisma/client gives me my User model types.',
            factCheck: 'npm install only installs the base library. Model types are created only after running prisma generate.',
          },
          {
            id: 'M3a.2',
            statement: 'I can run migrate dev with no DATABASE_URL because Prisma finds .env itself.',
            factCheck: 'In v7, Prisma does not auto-load .env. You must configure dotenv in prisma.config.ts.',
          },
        ],
      },
    ],
  },
  {
    level: 5,
    day: 4,
    title: 'Prisma Schema Mastery',
    subtitle: '4a - 4h: Models, Attributes, 1-1, 1-N, M-N, Self-Relations, Referential Actions & Mapping',
    focus: 'Model all relation styles, handle Cascade/Restrict, @@map, @@index.',
    topics: [
      {
        id: '4a',
        code: '4a',
        level: 5,
        title: 'Models & Attributes',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'pri', speech: 'A model is a blueprint. model User becomes a table and each field becomes a column.' },
          { speaker: 'nova', speech: 'What do ? and [] after a type mean?' },
          { speaker: 'pri', speech: '? = can be empty (nullable). [] = a list. And @unique = no duplicates allowed!' },
        ],
        inSimpleWords: {
          comparison:
            'A model is an architectural plan for an entity (User, Product, Order). In the database it translates to a table. Attributes starting with @ modify a field (@id, @unique, @default), while @@ applies to the entire table (@@id, @@index, @@map).',
          danger: '@updatedAt is filled in by Prisma Client when updated through the client; raw SQL updates will NOT update it!',
        },
        detailedTheory:
          'Scalar types: String, Boolean, Int, BigInt, Float, Decimal, DateTime, Json, Bytes.\nField modifiers: ? (optional/nullable) and [] (list).\nField attributes: @id, @default(...), @unique, @updatedAt, @map("col_name").\nBlock attributes: @@id([a, b]) (composite PK), @@unique([a, b]), @@index([a, b]), @@map("table_name").\nDefault functions: autoincrement(), now(), uuid(), cuid().',
        codeLab: {
          title: 'Comprehensive Model Definition',
          code: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}`,
          explanation: '@id specifies primary key. @updatedAt manages automatic modification timestamps.',
        },
        didYouKnow: '@updatedAt is not a SQL database trigger. Prisma Client populates it during mutation calls.',
        memoryTrick: 'Field = name + type + @labels.',
        remember: [
          'model = table, field = column.',
          '? = optional/nullable, [] = list.',
          'Every model needs a unique identifier (@id or @@id).',
          '@updatedAt is handled by Prisma Client, not the DB.',
        ],
        mcqs: [
          {
            id: 'Q4a.1',
            question: 'What does name String? mean?',
            options: ['name is a list of strings', 'name is optional (nullable)', 'name is unique', 'name is indexed'],
            answerIndex: 1,
            explanation: '? signifies an optional nullable column.',
          },
          {
            id: 'Q4a.2',
            question: 'Which declares a composite primary key on two fields?',
            options: ['@id([a, b])', '@@id([a, b])', '@unique([a, b])', '@@primary([a, b])'],
            answerIndex: 1,
            explanation: '@@id([a, b]) is the block attribute for composite PKs.',
          },
          {
            id: 'Q4a.3',
            question: '@updatedAt is applied by:',
            options: ['A database trigger', 'Prisma Client on updates made through it', 'Prisma Migrate at deploy time', 'The Postgres server clock'],
            answerIndex: 1,
            explanation: 'Prisma Client handles @updatedAt timestamps during updates.',
          },
        ],
        codingQuest: {
          id: 'C4a.1',
          prompt: 'Define model Product: uuid primary key, unique sku, price Decimal, stock Int defaulting to 0, tags list of strings, createdAt and updatedAt.',
          solution: `model Product {
  id        String   @id @default(uuid())
  sku       String   @unique
  price     Decimal
  stock     Int      @default(0)
  tags      String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`,
          steps: ['Use @id @default(uuid())', '@unique on sku', 'Decimal for price', 'String[] for tags'],
        },
        mythTraps: [
          {
            id: 'M4a.1',
            statement: '@updatedAt is a database trigger, so raw SQL UPDATEs also change it.',
            factCheck: '@updatedAt is handled in Prisma Client runtime. Raw SQL queries bypass it completely.',
          },
          {
            id: 'M4a.2',
            statement: '@default(now()) is computed in JavaScript by Prisma Client.',
            factCheck: '@default(now()) maps directly to the database default timestamp (e.g. CURRENT_TIMESTAMP).',
          },
        ],
      },
      {
        id: '4b',
        code: '4b',
        level: 5,
        title: 'Relations Overview & Referential Actions',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'How does a Post know who wrote it?' },
          { speaker: 'pri', speech: 'It stores the author’s id in authorId (the foreign key). author is just a friendly shortcut.' },
          { speaker: 'bug', speech: 'And if the user is deleted? Cascade, Restrict, SetNull... choose wisely or I break your data!' },
        ],
        inSimpleWords: {
          comparison:
            'A relation links two tables, like "post was written by user". In the database, only the foreign key column (authorId) exists. The relation field (author User) is a virtual helper that Prisma uses to navigate objects.',
          danger: 'Referential actions define what happens when a parent is deleted: Cascade (delete children), Restrict (prevent deletion if children exist), SetNull (make FK null).',
        },
        detailedTheory:
          'Relation anatomy:\n- Relation scalar field: the actual foreign key column (authorId Int).\n- Relation field: virtual navigation property (author User).\n- @relation(fields: [authorId], references: [id], onDelete: Cascade, onUpdate: Cascade).\n\nDefaults:\n- Required relation: onDelete: Restrict, onUpdate: Cascade\n- Optional relation: onDelete: SetNull, onUpdate: Cascade',
        codeLab: {
          title: 'Owning Side and Referential Action',
          code: `model User {
  id    Int    @id @default(autoincrement())
  posts Post[] // Virtual list field (NO DB column)
}

model Post {
  id       Int  @id @default(autoincrement())
  title    String
  authorId Int  // REAL foreign key column
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}`,
          explanation: 'authorId is the foreign key column. onDelete: Cascade deletes all posts when their author is deleted.',
        },
        didYouKnow: 'Required relations default to onDelete: Restrict; optional relations default to SetNull.',
        memoryTrick: 'Only the FK is real. The friendly field is fake.',
        remember: [
          'fields = the FK column here. references = the PK it points to.',
          'Only the scalar FK is a real column in the database table.',
          'Defaults: required -> Restrict, optional -> SetNull.',
        ],
        mcqs: [
          {
            id: 'Q4b.1',
            question: 'Which of these is an actual database column?',
            options: ['Post.author', 'User.posts', 'Post.authorId', 'None of them'],
            answerIndex: 2,
            explanation: 'Post.authorId is the scalar foreign key column; author and posts are virtual relation fields.',
          },
          {
            id: 'Q4b.2',
            question: 'For a REQUIRED relation, what is the default onDelete action?',
            options: ['Cascade', 'Restrict', 'SetNull', 'NoAction'],
            answerIndex: 1,
            explanation: 'Required relations default to Restrict to prevent orphaned rows.',
          },
        ],
        codingQuest: {
          id: 'C4b.1',
          prompt: 'Model a User who has many Posts; deleting a User must automatically delete all their Posts.',
          solution: `model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  title    String
  authorId Int
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}`,
          steps: ['Add posts Post[] on User', 'Add authorId Int on Post', 'Add @relation with onDelete: Cascade'],
        },
        mythTraps: [
          {
            id: 'M4b.1',
            statement: 'The field posts Post[] creates a column in the User table.',
            factCheck: 'It creates ZERO columns in the User table. It is purely a Prisma virtual relation field.',
          },
        ],
      },
      {
        id: '4c',
        code: '4c',
        level: 5,
        title: 'One-to-One Relations',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'pri', speech: 'One user, one profile: like one person, one passport!' },
          { speaker: 'nova', speech: 'How do I stop two profiles pointing at the same user?' },
          { speaker: 'pri', speech: 'Add @unique to the foreign key. That one word turns 1-n into 1-1!' },
        ],
        inSimpleWords: {
          comparison:
            'One-to-one means one person has one passport. In a database, it looks exactly like a 1-to-many relation, but you put @unique on the foreign key column (userId Int @unique) so no two rows can point to the same user.',
          danger: 'The side without the foreign key (profile Profile?) MUST be optional, because a user can exist before their profile is created.',
        },
        detailedTheory:
          'In a 1-1 relation, each parent links to at most one child. The owning side holds the foreign key marked with @unique. The back-relation field on the non-owning side must be marked optional (e.g. profile Profile?) because database constraints cannot guarantee both rows exist at identical microsecond creation.',
        codeLab: {
          title: '1-1 Model with Nested Write',
          code: `model User {
  id      Int      @id @default(autoincrement())
  profile Profile? // Must be optional!
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId Int    @unique // @unique makes it 1-to-1!
  user   User   @relation(fields: [userId], references: [id])
}`,
          explanation: '@unique on userId enforces that each user has at most one profile.',
        },
        didYouKnow: 'Nested writes allow creating the user and the profile simultaneously in one atomic transaction.',
        memoryTrick: '1-1 = Foreign key + @unique.',
        remember: [
          '1-1 = FK + @unique.',
          'Back-relation (Profile?) is always optional.',
          'Use optional chaining (user.profile?.bio) when reading.',
        ],
        mcqs: [
          {
            id: 'Q4c.1',
            question: 'What turns a 1-n relation into 1-1?',
            options: ['Making the list optional', '@unique on the foreign key field', 'Using @@id', 'onDelete: Cascade'],
            answerIndex: 1,
            explanation: '@unique on the foreign key prevents multiple rows from linking to the same parent.',
          },
          {
            id: 'Q4c.2',
            question: 'In a 1-1 relation, which side must be optional?',
            options: ['The side holding the FK', 'The side without the FK (back relation)', 'Both', 'Neither'],
            answerIndex: 1,
            explanation: 'The side without the FK must be optional because the parent can exist without the child.',
          },
        ],
        codingQuest: {
          id: 'C4c.1',
          prompt: 'Create a User together with a Profile in one query using a nested write, and read the profile bio.',
          solution: `const user = await prisma.user.create({
  data: {
    email: "a@x.com",
    profile: { create: { bio: "Hello!" } },
  },
  include: { profile: true },
});
console.log(user.profile?.bio);`,
          steps: ['Use prisma.user.create', 'Pass profile: { create: { bio } }', 'include: { profile: true }'],
        },
        mythTraps: [
          {
            id: 'M4c.1',
            statement: 'I can make both sides of a 1-1 relation required.',
            factCheck: 'Impossible in relational databases. You cannot insert row A requiring non-existent row B while B simultaneously requires non-existent A.',
          },
        ],
      },
      {
        id: '4d',
        code: '4d',
        level: 5,
        title: 'One-to-Many Relations',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'nova', speech: 'One author, many posts. Where does the foreign key go?' },
          { speaker: 'pri', speech: "On the MANY side. Every post carries a sticky note: 'My author is #7'." },
          { speaker: 'bug', speech: 'Write Post[]? and I will laugh. Lists are never optional!' },
        ],
        inSimpleWords: {
          comparison:
            'Think of a teacher with many students. Each student ID card has "Teacher #7". The teacher does not keep an array of student IDs inside their desk. In databases, the foreign key always lives on the MANY side.',
          danger: 'Relation lists in Prisma can NEVER be optional (Post[]? is invalid syntax). An empty list [] represents zero related records.',
        },
        detailedTheory:
          'In a 1-n relation, the foreign key scalar and @relation attribute are on the child model. The parent model defines a list field (e.g. posts Post[]). Querying the one side with include returns an array ([] if empty, never null).',
        codeLab: {
          title: 'Optional Parent in 1-N Relation',
          code: `model Category {
  id       Int       @id @default(autoincrement())
  products Product[]
}

model Product {
  id         Int       @id @default(autoincrement())
  name       String
  categoryId Int?      // Optional foreign key!
  category   Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
}`,
          explanation: 'categoryId Int? allows products without a category. onDelete: SetNull clears the FK if category is deleted.',
        },
        didYouKnow: 'An empty relation list [] represents "no related records"; Prisma never returns null for lists.',
        memoryTrick: 'Many side holds the key.',
        remember: [
          'FK lives on the many side.',
          'Post[] is never optional.',
          'FK can be optional (Int?) if a child may have no parent.',
        ],
        mcqs: [
          {
            id: 'Q4d.1',
            question: 'Where is the foreign key in a one-to-many relation?',
            options: ["On the 'one' side", "On the 'many' side", 'In a hidden table', 'Nowhere'],
            answerIndex: 1,
            explanation: 'The foreign key column always belongs to the many (child) table.',
          },
          {
            id: 'Q4d.2',
            question: 'Which syntax is invalid in Prisma schema?',
            options: ['author User?', 'authorId Int?', 'posts Post[]?', 'posts Post[]'],
            answerIndex: 2,
            explanation: 'List relation fields cannot be marked optional (Post[]? is invalid).',
          },
        ],
        codingQuest: {
          id: 'C4d.1',
          prompt: 'Fetch each category with the total count of products it has using _count.',
          solution: `const rows = await prisma.category.findMany({
  include: {
    _count: { select: { products: true } }
  }
});
// rows[0]._count.products`,
          steps: ['Call findMany on category', 'Use include with _count: { select: { products: true } }'],
        },
        mythTraps: [
          {
            id: 'M4d.1',
            statement: 'Optional list: Post[]? means a user may have no posts.',
            factCheck: 'False. Post[] without question mark already allows zero posts (returns []). Adding ? is a syntax error.',
          },
        ],
      },
      {
        id: '4e',
        code: '4e',
        level: 5,
        title: 'Many-to-Many Relations (Implicit vs Explicit)',
        difficulty: 3,
        examWeight: 3,
        xp: 80,
        comicPanels: [
          { speaker: 'nova', speech: 'Students join many courses and courses have many students. Where is that stored?' },
          { speaker: 'pri', speech: 'In a middle table! Prisma can hide it (implicit) or you can build it (explicit).' },
          { speaker: 'bug', speech: "Implicit tables allow no extra columns. Nobody can add 'joinedAt'. Mwahaha!" },
        ],
        inSimpleWords: {
          comparison:
            'Many-to-many: a student has many courses, and a course has many students. A database cannot store a list inside one column, so it creates a middle table (join table) of pairs: (student 1, course 5). Implicit: Prisma generates the table secretly. Explicit: you write the join model yourself so you can store extra data like assignedAt or grade.',
          danger: 'If you need extra columns on the link (like assignedAt, role), you MUST use an explicit relation!',
        },
        detailedTheory:
          'Implicit m-n: both models declare list fields pointing to each other (categories Category[] and posts Post[]). Prisma generates a hidden join table named _ModelAToModelB (e.g. _CategoryToPost) with columns A and B.\n\nExplicit m-n: you define a join model (CategoriesOnPosts) with @@id([postId, categoryId]) and two @relation fields. This allows adding custom columns (assignedAt DateTime @default(now()), role, etc.).',
        codeLab: {
          title: 'Explicit Many-to-Many with Custom Fields',
          code: `model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String              @unique
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int
  assignedAt DateTime @default(now())

  @@id([postId, categoryId])
}`,
          explanation: 'The join model allows storing extra metadata such as assignedAt on the connection.',
        },
        didYouKnow: 'Implicit join tables are named in alphabetical order: _CategoryToPost with columns A and B.',
        memoryTrick: 'Need extra data on the link? Go explicit.',
        remember: [
          'Hidden table name: _ModelAToModelB, columns A and B.',
          'Extra data on the link -> explicit join model.',
          'Explicit join model usually has composite PK @@id([aId, bId]).',
        ],
        mcqs: [
          {
            id: 'Q4e.1',
            question: 'What is the name of the implicit join table for models Post and Category?',
            options: ['PostCategory', '_CategoryToPost', 'CategoryPost', '_Post_Category'],
            answerIndex: 1,
            explanation: 'Alphabetical order with an underscore prefix: _CategoryToPost.',
          },
          {
            id: 'Q4e.2',
            question: 'When should you choose an explicit m-n relation over implicit?',
            options: ['When you want less code', 'When the relationship needs extra fields', 'Never, implicit is always better', 'Only on MongoDB'],
            answerIndex: 1,
            explanation: 'Explicit join tables let you add columns like assignedAt, role, or score.',
          },
        ],
        codingQuest: {
          id: 'C4e.1',
          prompt: 'With the explicit schema above, create a Post and connect it to existing category id 3 via the join model.',
          solution: `await prisma.post.create({
  data: {
    title: "Hi",
    categories: {
      create: [{ category: { connect: { id: 3 } } }],
    },
  },
});`,
          steps: ['Create post', 'Nest categories: { create: [{ category: { connect: { id: 3 } } }] }'],
        },
        mythTraps: [
          {
            id: 'M4e.1',
            statement: 'With an implicit m-n I can later add an assignedAt field to the join table.',
            factCheck: 'Implicit tables are managed strictly by Prisma with fixed A/B columns. To add columns, you must migrate to an explicit join table.',
          },
        ],
      },
      {
        id: '4f',
        code: '4f',
        level: 5,
        title: 'Self-Relations (Hierarchies & Followers)',
        difficulty: 3,
        examWeight: 2,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'Employees have managers... but managers are employees too!' },
          { speaker: 'pri', speech: 'That is a self-relation: a table pointing at itself. Give the relation a name so Prisma can pair the fields.' },
          { speaker: 'bug', speech: "Forget the name and I shout 'ambiguous relation' at you!" },
        ],
        inSimpleWords: {
          comparison:
            'A self-relation is when a table links to itself. For example, an Employee has a manager (who is another Employee). Because both sides refer to the Employee type, Prisma cannot guess which belongs to which. You must give the relation a name string in @relation("Reports").',
          danger: 'For hierarchy trees, the managerId foreign key MUST be optional (Int?), otherwise you could never create the top CEO/boss!',
        },
        detailedTheory:
          'Self-relations connect a model to itself.\n- 1-n hierarchy: manager User? @relation("Reports", fields: [managerId], references: [id]) and reports User[] @relation("Reports").\n- m-n followers: followedBy User[] @relation("UserFollows") and following User[] @relation("UserFollows").\n\nThe relation name is mandatory to disambiguate the field pair.',
        codeLab: {
          title: 'Manager-Reports 1-N Hierarchy',
          code: `model User {
  id        Int     @id @default(autoincrement())
  name      String
  managerId Int?
  manager   User?   @relation("Reports", fields: [managerId], references: [id])
  reports   User[]  @relation("Reports")
}`,
          explanation: 'managerId must be optional so the root node (CEO) can exist.',
        },
        didYouKnow: 'Follower/following networks on Twitter or Instagram are classic self-referencing many-to-many relations.',
        memoryTrick: 'Same model twice? Name it twice in quotes.',
        remember: [
          'Same model on both sides -> relation name required.',
          'Hierarchy FK must be optional (Int?).',
          'Followers = self m-n with two list fields sharing the same relation name.',
        ],
        mcqs: [
          {
            id: 'Q4f.1',
            question: 'Why must self-relations be given a relation name in @relation("Name")?',
            options: ['To make them faster', 'To disambiguate which two fields form the pair', 'It is optional style only', 'For MongoDB only'],
            answerIndex: 1,
            explanation: 'Both fields reference the same model, so Prisma needs the name to pair them correctly.',
          },
          {
            id: 'Q4f.2',
            question: 'In a manager/reports employee hierarchy, managerId should be:',
            options: ['Required Int', 'Optional Int?', 'A list', 'Unique and required'],
            answerIndex: 1,
            explanation: 'The top-level record (CEO) has no manager, so it must allow NULL.',
          },
        ],
        codingQuest: {
          id: 'C4f.1',
          prompt: 'Write a query returning user id 1 with their manager name and all direct reports names.',
          solution: `await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    name: true,
    manager: { select: { name: true } },
    reports: { select: { name: true } },
  },
});`,
          steps: ['Use findUnique where id: 1', 'Select manager and reports sub-objects with name: true'],
        },
        mythTraps: [
          {
            id: 'M4f.1',
            statement: 'Two self-relation fields on the same model are paired automatically without a name.',
            factCheck: 'Prisma throws an ambiguous relation error during schema validation. A relation name string is required.',
          },
        ],
      },
      {
        id: '4g',
        code: '4g',
        level: 5,
        title: 'Special Rules for Referential Actions (SQL Server & MongoDB)',
        difficulty: 3,
        examWeight: 1,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: "SQL Server says 'cycles or multiple cascade paths'. What does that mean?!" },
          { speaker: 'pri', speech: 'A deletes B, B deletes C, C deletes A: an endless loop! Use NoAction on one link.' },
          { speaker: 'bug', speech: 'MongoDB has no foreign keys. Prisma only pretends, so my tricks work outside Prisma!' },
        ],
        inSimpleWords: {
          comparison:
            'If deleting A deletes B, and deleting B deletes A, you have an infinite loop! SQL Server forbids multiple cascade paths or cyclic cascades. The fix is setting NoAction on one link and handling deletion in application code.',
          danger: 'MongoDB has no native foreign keys. Prisma emulates referential actions in Prisma Client using relationMode = "prisma".',
        },
        detailedTheory:
          'SQL Server rejects cascading cycles or multi-path cascade trees. Use onDelete: NoAction or SetNull on the offending edges.\n\nMongoDB and PlanetScale do not support foreign key constraints at the database level. Set relationMode = "prisma" in datasource db to have Prisma Client emulate referential actions in application code. When emulating, manually add @@index on foreign keys for performance.',
        codeLab: {
          title: 'SQL Server Self-Relation Fix',
          code: `model Employee {
  id        Int        @id @default(autoincrement())
  managerId Int?
  manager   Employee?  @relation("Mgr", fields: [managerId], references: [id],
                       onDelete: NoAction, onUpdate: NoAction)
  reports   Employee[] @relation("Mgr")
}`,
          explanation: 'NoAction prevents SQL Server cyclic cascade errors.',
        },
        didYouKnow: 'relationMode = "prisma" emulates foreign keys inside the client layer, enabling relations on DBs without FK support.',
        memoryTrick: 'Cascade cycle? Use NoAction.',
        remember: [
          'SQL Server: no cascade cycles / multiple paths -> NoAction.',
          'MongoDB: emulated actions via relationMode = "prisma".',
          'Add @@index on FK fields when emulating.',
        ],
        mcqs: [
          {
            id: 'Q4g.1',
            question: 'A self-relation with onDelete: Cascade on SQL Server will:',
            options: ['Work fine', 'Fail because of cyclic cascade paths; use NoAction', 'Be ignored silently', 'Convert to SetNull automatically'],
            answerIndex: 1,
            explanation: 'SQL Server strictly rejects cyclic or multi-path cascade constraints.',
          },
          {
            id: 'Q4g.2',
            question: 'On MongoDB, referential actions are provided by:',
            options: ['Database foreign keys', 'Prisma Client emulation (relationMode = prisma)', 'Triggers', 'Not available at all'],
            answerIndex: 1,
            explanation: 'MongoDB has no native FKs, so Prisma Client emulates the actions in software.',
          },
        ],
        codingQuest: {
          id: 'C4g.1',
          prompt: 'Rewrite parent Node? @relation(fields:[parentId], references:[id], onDelete: Cascade) so it is valid for SQL Server.',
          solution: `parent Node? @relation("Tree", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
children Node[] @relation("Tree")`,
          steps: ['Keep relation name', 'Change onDelete to NoAction', 'Set onUpdate to NoAction'],
        },
        mythTraps: [
          {
            id: 'M4g.1',
            statement: 'MongoDB enforces foreign keys, so Cascade is handled by the database.',
            factCheck: 'MongoDB has no concept of database-level foreign key constraints. Prisma Client emulates them when relationMode = "prisma".',
          },
        ],
      },
      {
        id: '4h',
        code: '4h',
        level: 5,
        title: 'Database Mapping (@map and @@map)',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'nova', speech: 'My column is first_name but I want firstName in my code.' },
          { speaker: 'pri', speech: 'Use @map("first_name") for columns and @@map("users") for tables.' },
          { speaker: 'bug', speech: 'Your code still says firstName. The map only changes the database side!' },
        ],
        inSimpleWords: {
          comparison:
            'Sometimes legacy databases have old names (tbl_users, first_name). Mapping lets you use clean camelCase and PascalCase in TypeScript (User, firstName) while the database retains its legacy names.',
          danger: 'Mapping changes ONLY what the database sees. Your application TypeScript code still uses the Prisma model and field names!',
        },
        detailedTheory:
          '@map("col_name") renames a column in the database.\n@@map("table_name") renames the table in the database.\nEnums can use @@map("enum_type") and @map on values.\nConstraint names: @unique(map: "uq_user_email").\n\nWhen you run prisma db pull on an existing database, Prisma automatically generates these @map and @@map attributes.',
        codeLab: {
          title: 'Table and Column Mapping',
          code: `model User {
  id        Int    @id @default(autoincrement())
  firstName String @map("first_name")
  
  @@map("tbl_users")
}

// In your TypeScript application code:
await prisma.user.findMany({
  where: { firstName: 'Ana' }
});`,
          explanation: 'Code uses user and firstName, which translate to tbl_users and first_name in SQL.',
        },
        didYouKnow: 'prisma db pull generates these @map attributes automatically when inspecting an existing legacy schema.',
        memoryTrick: 'One @ = column. Two @@ = table.',
        remember: [
          '@map = column, @@map = table.',
          'Application code always keeps Prisma names.',
          'map: argument renames constraints/indexes.',
        ],
        mcqs: [
          {
            id: 'Q4h.1',
            question: 'Which attribute renames the TABLE in the underlying database?',
            options: ['@map', '@@map', '@table', '@@name'],
            answerIndex: 1,
            explanation: '@@map renames the model table.',
          },
          {
            id: 'Q4h.2',
            question: 'After @@map("users") on model User, the client call is:',
            options: ['prisma.users', 'prisma.user', 'prisma.Users', "prisma.table('users')"],
            answerIndex: 1,
            explanation: 'Client API method names match the Prisma model name (lowercase singular prisma.user).',
          },
        ],
        codingQuest: {
          id: 'C4h.1',
          prompt: 'Map model OrderItem to table order_items and field unitPrice to column unit_price.',
          solution: `model OrderItem {
  id        Int   @id @default(autoincrement())
  unitPrice Float @map("unit_price")
  @@map("order_items")
}`,
          steps: ['Use @map("unit_price") on unitPrice', 'Use @@map("order_items") at model level'],
        },
        mythTraps: [
          {
            id: 'M4h.1',
            statement: '@map renames the field in Prisma Client too.',
            factCheck: '@map only affects the column name in the database. In TypeScript, the field name remains unchanged.',
          },
        ],
      },
    ],
  },
  {
    level: 6,
    day: 5,
    title: 'Prisma Queries in Action',
    subtitle: '5a - 5g: CRUD, Select, Omit, Relations, Filters, Pagination & Aggregation',
    focus: 'Master all CRUD methods, whitelisting with select, omit, skip/take vs cursor, groupBy.',
    topics: [
      {
        id: '5a',
        code: '5a',
        level: 6,
        title: 'CRUD Reference',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'So many methods! create, findMany, update, upsert...' },
          { speaker: 'pri', speech: 'find = read, create = add, update = change, delete = remove. Add Many for bulk work.' },
          { speaker: 'bug', speech: 'Call update on a missing row and I throw P2025 at you!' },
        ],
        inSimpleWords: {
          comparison:
            'CRUD is Create, Read, Update, Delete. Single-row operations (findUnique, update, delete) need a unique field in where. Methods ending in Many work on multiple rows and return { count: number }.',
          danger: 'Calling update or delete on a non-existent row throws error code P2025! Use updateMany/deleteMany for silent no-ops.',
        },
        detailedTheory:
          'Single-row queries:\n- findUnique({ where: { id } }): returns record or null\n- findUniqueOrThrow: throws P2025 if missing\n- update({ where, data }): throws P2025 if row does not exist\n- delete({ where }): throws P2025 if missing\n- upsert({ where, update, create }): updates if present, creates if missing\n\nBulk queries:\n- findMany({ where }): returns array\n- createMany / updateMany / deleteMany: return { count: number }\n\nAtomic number updates: { increment: 1 }, { decrement: 5 }, { multiply: 2 }.',
        codeLab: {
          title: 'CRUD Operations & Atomic Updates',
          code: `// Create
const user = await prisma.user.create({
  data: { email: "ana@x.com", name: "Ana" }
});

// Atomic increment
await prisma.post.update({
  where: { id: 1 },
  data: { views: { increment: 1 } }
});

// Idempotent upsert
await prisma.user.upsert({
  where: { email: "ana@x.com" },
  update: { name: "Ana B" },
  create: { email: "ana@x.com", name: "Ana B" }
});`,
          explanation: 'atomic increment prevents race conditions; upsert is idempotent.',
        },
        didYouKnow: 'upsert means UPdate or inSERT. It is ideal for seed scripts because re-running it never creates duplicate keys.',
        memoryTrick: 'Unique -> one row (or P2025). Many -> a count.',
        remember: [
          'findUnique -> row or null. update/delete on missing row -> P2025.',
          '...Many operations return { count: number }.',
          'upsert = update if found, else create.',
        ],
        mcqs: [
          {
            id: 'Q5a.1',
            question: 'What does updateMany return?',
            options: ['The updated records', '{ count: number }', 'void', 'boolean'],
            answerIndex: 1,
            explanation: 'Bulk mutation operations return an object containing the affected count.',
          },
          {
            id: 'Q5a.2',
            question: 'findUnique({ where: { id: 999 } }) when no row exists returns:',
            options: ['undefined', '[]', 'null', 'throws'],
            answerIndex: 2,
            explanation: 'findUnique returns null when no matching record is found.',
          },
          {
            id: 'Q5a.3',
            question: 'Which can be used in the where clause of findUnique?',
            options: ['Any field', 'Only @id / @unique (or compound unique) fields', 'Only the primary key', 'Relation fields'],
            answerIndex: 1,
            explanation: 'findUnique requires a unique identifier field.',
          },
        ],
        codingQuest: {
          id: 'C5a.1',
          prompt: '1) Increment views of every published post by 10. 2) Safely delete post id 5 returning null instead of throwing if it does not exist.',
          solution: `// 1
await prisma.post.updateMany({
  where: { published: true },
  data: { views: { increment: 10 } }
});

// 2 (deleteMany avoids P2025 on missing row)
const { count } = await prisma.post.deleteMany({
  where: { id: 5 }
});`,
          steps: ['updateMany with { increment: 10 }', 'deleteMany returns { count: 0 } without throwing P2025'],
        },
        mythTraps: [
          {
            id: 'M5a.1',
            statement: 'update() on a non-existent record returns null.',
            factCheck: 'update() throws PrismaClientKnownRequestError with code P2025. Only findUnique returns null.',
          },
          {
            id: 'M5a.2',
            statement: 'findUnique can filter by any field just like findFirst.',
            factCheck: 'findUnique strictly accepts fields marked @id or @unique in the schema.',
          },
        ],
      },
      {
        id: '5b',
        code: '5b',
        level: 6,
        title: 'Select Fields (Whitelisting)',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'I only want the email, not the whole user!' },
          { speaker: 'pri', speech: 'Use select and tick what you want. include gives everything plus a relation.' },
          { speaker: 'bug', speech: 'Mix select and include at the same level and I explode!' },
        ],
        inSimpleWords: {
          comparison:
            'By default Prisma returns every column. If you only need two columns, ask for them with select (a whitelist). include means "give me everything normal PLUS this related table".',
          danger: 'Never use select and include side by side at the same level of a query! To include related fields inside select, nest them inside select.',
        },
        detailedTheory:
          'select creates a typed projection. The resulting TypeScript type narrows automatically to only include selected fields.\n\nRules:\n- select = whitelist only the specified fields.\n- include = all scalar fields + related models.\n- Mutual exclusion: select and include CANNOT be mixed at the same object level.',
        codeLab: {
          title: 'Nested Select Projection',
          code: `const users = await prisma.user.findMany({
  select: {
    email: true,
    posts: {
      where: { published: true },
      select: { title: true }
    },
    _count: {
      select: { posts: true }
    }
  }
});`,
          explanation: 'Result type contains only email, posts array with title, and _count.',
        },
        didYouKnow: 'The TypeScript return type shrinks automatically to match your exact select projection.',
        memoryTrick: 'select = Selective. include = Includes all.',
        remember: [
          'select = whitelist.',
          'include = all scalars + relation.',
          'Never use both at the same level.',
        ],
        mcqs: [
          {
            id: 'Q5b.1',
            question: 'Using select and include together at the same level:',
            options: ['Merges both', 'Is an error', 'Prefers include', 'Prefers select'],
            answerIndex: 1,
            explanation: 'select and include are mutually exclusive at the same level.',
          },
          {
            id: 'Q5b.2',
            question: 'What does include: { posts: true } return?',
            options: ['Only posts', 'All User scalars and all posts', 'Only post ids', 'Nothing extra'],
            answerIndex: 1,
            explanation: 'include returns all model scalar fields plus the specified relation.',
          },
        ],
        codingQuest: {
          id: 'C5b.1',
          prompt: "Return each user's email and the titles of their published posts only.",
          solution: `await prisma.user.findMany({
  select: {
    email: true,
    posts: {
      where: { published: true },
      select: { title: true }
    }
  }
});`,
          steps: ['Use select: { email: true }', 'Nest posts: { where: { published: true }, select: { title: true } }'],
        },
        mythTraps: [
          {
            id: 'M5b.1',
            statement: 'include returns only the relation data.',
            factCheck: 'include returns ALL scalar fields of the parent model AND the relation data. To return only the relation, use select.',
          },
        ],
      },
      {
        id: '5c',
        code: '5c',
        level: 6,
        title: 'Excluding Fields (omit)',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'pri', speech: 'omit hides fields. Perfect for passwords!' },
          { speaker: 'nova', speech: 'Can I hide it everywhere at once?' },
          { speaker: 'bug', speech: 'A leaked password hash would make me so happy. Do not forget omit!' },
        ],
        inSimpleWords: {
          comparison:
            'omit is the opposite of select. Instead of ticking 20 fields, you cross out one (like passwordHash). You can set it globally on the client so passwords are never accidentally returned to the client API.',
          danger: 'omit removes fields from the query RESULT; the column and its data remain in the database.',
        },
        detailedTheory:
          'omit removes specified fields from query results.\n- Per-query: prisma.user.findMany({ omit: { passwordHash: true } })\n- Global configuration: new PrismaClient({ omit: { user: { passwordHash: true } } })\n- Per-query override: omit: { passwordHash: false } re-includes the field when needed (e.g. in auth login).\n- Cannot mix omit and select at the same level.',
        codeLab: {
          title: 'Global Client omit with Local Override',
          code: `const prisma = new PrismaClient({
  adapter,
  omit: {
    user: { passwordHash: true }
  }
});

// Default query: passwordHash is hidden
const safeUser = await prisma.user.findFirst();

// Auth login route: re-include passwordHash explicitly
const loginUser = await prisma.user.findUnique({
  where: { email },
  omit: { passwordHash: false }
});`,
          explanation: 'Guarantees passwords are never leaked by default across the entire app.',
        },
        didYouKnow: 'Global omit settings in PrismaClient protect APIs from accidental data leakage.',
        memoryTrick: 'omit = cross a name off the list.',
        remember: [
          'omit hides fields from results; data stays in the DB.',
          'No select + omit together at the same level.',
          'Global omit can be overridden per query.',
        ],
        mcqs: [
          {
            id: 'Q5c.1',
            question: 'Which combination is invalid?',
            options: ['omit alone', 'select alone', 'select and omit at the same level', 'global omit + per-query override'],
            answerIndex: 2,
            explanation: 'select and omit cannot be used at the same level.',
          },
          {
            id: 'Q5c.2',
            question: 'How do you re-include a globally omitted field for one specific query?',
            options: ['Impossible', 'omit: { field: false }', 'select: { field: false }', 'include: { field: true }'],
            answerIndex: 1,
            explanation: 'Setting omit: { field: false } overrides the global omit.',
          },
        ],
        codingQuest: {
          id: 'C5c.1',
          prompt: 'Configure PrismaClient so User.passwordHash is never returned unless explicitly requested.',
          solution: `const prisma = new PrismaClient({
  adapter,
  omit: {
    user: { passwordHash: true }
  }
});`,
          steps: ['Pass omit option to PrismaClient constructor', 'Set user: { passwordHash: true }'],
        },
        mythTraps: [
          {
            id: 'M5c.1',
            statement: 'omit deletes the column or prevents data from being stored.',
            factCheck: 'omit only excludes the field from query output. Data is still saved and persisted in the database.',
          },
        ],
      },
      {
        id: '5d',
        code: '5d',
        level: 6,
        title: 'Relation Queries & The N+1 Problem',
        difficulty: 3,
        examWeight: 3,
        xp: 80,
        comicPanels: [
          { speaker: 'nova', speech: 'I loop over users and fetch posts for each. It is so slow!' },
          { speaker: 'pri', speech: 'That is the N+1 problem. One include does it in a single trip.' },
          { speaker: 'bug', speech: 'And every is true for users with ZERO posts. Surprise!' },
        ],
        inSimpleWords: {
          comparison:
            'If you fetch 100 users, and then loop over each user to fetch their posts with a query, that is 1 + 100 = 101 trips to the database! That is the famous N+1 problem. A single include fetches everything in one trip.',
          danger: 'every has a mathematical surprise (vacuous truth): every is TRUE if a user has zero posts! Combine with some: {} if you require at least one post.',
        },
        detailedTheory:
          'Relation filters in where:\n- Lists: some (at least one matches), every (all match, or list is empty!), none (zero match).\n- Single relation: is, isNot.\n- Fluent API: prisma.user.findUnique({ where: { id } }).posts() navigates relations directly.\n- Nested writes execute in a single atomic transaction.',
        codeLab: {
          title: 'Relation Filters and Nested Write',
          code: `// Users who have at least one published post
const activeAuthors = await prisma.user.findMany({
  where: {
    posts: { some: { published: true } }
  },
  include: {
    posts: { orderBy: { createdAt: "desc" }, take: 3 }
  }
});

// Users with zero posts
const lurkers = await prisma.user.findMany({
  where: { posts: { none: {} } }
});`,
          explanation: 'some, every, and none filter parents based on child criteria.',
        },
        didYouKnow: 'Nested writes (like creating a user and 2 posts inside one call) execute atomically in a single transaction.',
        memoryTrick: 'some = at least 1, every = all, none = zero.',
        remember: [
          'some = at least one, every = all (true if empty), none = zero.',
          'Nested writes are atomic.',
          'Use include/select instead of loops to prevent N+1.',
        ],
        mcqs: [
          {
            id: 'Q5d.1',
            question: 'where: { posts: { every: { published: true } } } also matches users who:',
            options: ['Have unpublished posts', 'Have no posts at all', 'Are admins', 'Never match'],
            answerIndex: 1,
            explanation: 'Vacuous truth: every condition is satisfied if there are zero items to check.',
          },
          {
            id: 'Q5d.2',
            question: 'Nested writes inside create or update run:',
            options: ['Each in its own transaction', 'Atomically in a single transaction', 'Without transactions', 'Only in $transaction'],
            answerIndex: 1,
            explanation: 'Prisma wraps nested writes in an automatic atomic transaction.',
          },
        ],
        codingQuest: {
          id: 'C5d.1',
          prompt: 'Find users who have NO posts, and use the fluent API to fetch posts of user id 1.',
          solution: `// No posts
const zeroPosts = await prisma.user.findMany({
  where: { posts: { none: {} } }
});

// Fluent API
const posts = await prisma.user.findUnique({ where: { id: 1 } }).posts();`,
          steps: ['posts: { none: {} } for zero relations', 'Chain .posts() on findUnique'],
        },
        mythTraps: [
          {
            id: 'M5d.1',
            statement: 'every returns only users who have posts and all of them are published.',
            factCheck: 'every returns users with zero posts too! To require at least one published post, use { every: { published: true }, some: {} }.',
          },
          {
            id: 'M5d.2',
            statement: 'Calling findMany inside a for-loop over users is the same as include.',
            factCheck: 'Looping issues N+1 round trips to the database. include fetches in 1 (or 2) optimized batch queries.',
          },
        ],
      },
      {
        id: '5e',
        code: '5e',
        level: 6,
        title: 'Filtering and Sorting',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'How do I combine conditions in where?' },
          { speaker: 'pri', speech: 'Same object = AND. Use OR: [...] for either, NOT to exclude.' },
          { speaker: 'bug', speech: "contains is case-sensitive on Postgres. Add mode: 'insensitive'!" },
        ],
        inSimpleWords: {
          comparison:
            'where filters which rows stay. Put multiple keys in the same object and all must match (AND). Use OR: [...] for either. orderBy sorts results; pass an array of sort objects when you need tie-breakers.',
          danger: 'PostgreSQL text searches are case-sensitive by default! Add mode: "insensitive" for case-insensitive matching.',
        },
        detailedTheory:
          'Filter operators: equals, not, in, notIn, lt, lte, gt, gte, contains, startsWith, endsWith.\nCase sensitivity: mode: "insensitive" (Postgres / Mongo).\nScalar list filters: has, hasSome, hasEvery, isEmpty.\nMultiple sort keys: orderBy: [{ views: "desc" }, { id: "asc" }].\ndistinct: ["authorId"] returns unique rows.',
        codeLab: {
          title: 'Complex Filtering and Sorting',
          code: `await prisma.post.findMany({
  where: {
    published: true,
    OR: [
      { title: { contains: "prisma", mode: "insensitive" } },
      { views: { gte: 100 } }
    ],
    NOT: {
      author: { email: { endsWith: "@spam.com" } }
    }
  },
  orderBy: [
    { views: "desc" },
    { id: "asc" }
  ]
});`,
          explanation: 'Demonstrates case-insensitive search, OR, NOT, and multi-column ordering.',
        },
        didYouKnow: 'You can sort models by relation aggregate counts, e.g. orderBy: { posts: { _count: "desc" } }.',
        memoryTrick: 'Same object = AND. Array = OR.',
        remember: [
          'Same object = AND.',
          'mode: "insensitive" for case-insensitive search on Postgres.',
          'Many sort keys -> array of objects.',
        ],
        mcqs: [
          {
            id: 'Q5e.1',
            question: 'Two keys inside one where object are combined with:',
            options: ['OR', 'AND', 'XOR', 'Depends on the DB'],
            answerIndex: 1,
            explanation: 'Keys in an object are implicitly combined with AND.',
          },
          {
            id: 'Q5e.2',
            question: 'To sort by views desc then title asc you pass:',
            options: ["{ views:'desc', title:'asc' }", "[{ views:'desc' }, { title:'asc' }]", 'two orderBy keys', 'sort: [...]'],
            answerIndex: 1,
            explanation: 'Multiple sort criteria must be passed as an array of single-key objects.',
          },
        ],
        codingQuest: {
          id: 'C5e.1',
          prompt: "Return users ordered by number of posts (most first) whose name starts with 'A' ignoring case.",
          solution: `await prisma.user.findMany({
  where: {
    name: { startsWith: "A", mode: "insensitive" }
  },
  orderBy: {
    posts: { _count: "desc" }
  }
});`,
          steps: ['Use startsWith with mode: "insensitive"', 'orderBy: { posts: { _count: "desc" } }'],
        },
        mythTraps: [
          {
            id: 'M5e.1',
            statement: 'contains is always case-insensitive.',
            factCheck: 'PostgreSQL is case-sensitive by default. You must add mode: "insensitive".',
          },
          {
            id: 'M5e.2',
            statement: 'I can put multiple sort fields inside one single orderBy object like { views: "desc", id: "asc" }.',
            factCheck: 'JavaScript objects do not guarantee key order. Always pass an array of objects to enforce sort priority.',
          },
        ],
      },
      {
        id: '5f',
        code: '5f',
        level: 6,
        title: 'Pagination (Offset vs Cursor)',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'I need to show results in pages!' },
          { speaker: 'pri', speech: 'Offset: skip + take. Cursor: bookmark a row, then take the next ones. Cursor is faster.' },
          { speaker: 'bug', speech: 'Forget skip: 1 and the bookmark row appears twice!' },
        ],
        inSimpleWords: {
          comparison:
            'Offset pagination is like jumping to page 5 of a book (skip 40 rows, take 10). Cursor pagination is like placing a bookmark at row 50 and asking for the next 10. Cursor is much faster on huge tables and never shifts if rows are inserted.',
          danger: 'When using cursor pagination, always include skip: 1 to avoid returning the cursor item itself again!',
        },
        detailedTheory:
          'Offset pagination:\n- Formula: skip: (page - 1) * limit, take: limit.\n- Good for page number buttons, but slow for deep pages (database must scan and discard skipped rows).\n\nCursor pagination:\n- Syntax: cursor: { id: lastSeenId }, skip: 1, take: limit.\n- Fast at any depth and stable against data inserts.\n- Negative take reads backwards from the cursor.',
        codeLab: {
          title: 'Offset vs Cursor Pagination',
          code: `// Offset pagination (Page 3, 10 items)
const offsetPosts = await prisma.post.findMany({
  skip: 20,
  take: 10,
  orderBy: { id: "asc" }
});

// Cursor pagination (Next 10 after ID 30)
const cursorPosts = await prisma.post.findMany({
  take: 10,
  skip: 1, // Skip the cursor itself!
  cursor: { id: 30 },
  orderBy: { id: "asc" }
});`,
          explanation: 'skip: 1 skips the bookmark item in cursor queries.',
        },
        didYouKnow: 'Negative take values (take: -10) read backwards from the cursor, enabling backward infinite scroll.',
        memoryTrick: 'Offset = page number. Cursor = bookmark.',
        remember: [
          'offset = skip/take; cursor = cursor + skip: 1 + take.',
          'Always set a stable deterministic orderBy.',
          'Cursor is much faster on large tables.',
        ],
        mcqs: [
          {
            id: 'Q5f.1',
            question: 'Why do you pass skip: 1 with cursor?',
            options: ['Performance hint', 'The cursor record is included, so skip it', 'Required syntax for take', 'To reverse order'],
            answerIndex: 1,
            explanation: 'The cursor record is included in the query by default, so skip: 1 excludes it.',
          },
          {
            id: 'Q5f.2',
            question: 'Which pagination strategy scales better for deep pages (e.g. page 5000)?',
            options: ['Offset', 'Cursor', 'Same', 'Neither'],
            answerIndex: 1,
            explanation: 'Cursor seeks directly using indexed keys without scanning prior rows.',
          },
        ],
        codingQuest: {
          id: 'C5f.1',
          prompt: 'Write getPage(page, size) using offset pagination returning rows plus totalPages.',
          solution: `async function getPage(page: number, size: number) {
  const [rows, total] = await prisma.$transaction([
    prisma.post.findMany({
      skip: (page - 1) * size,
      take: size,
      orderBy: { id: "asc" },
    }),
    prisma.post.count(),
  ]);
  return { rows, totalPages: Math.ceil(total / size) };
}`,
          steps: ['Run findMany with skip/take and count() in $transaction', 'Calculate Math.ceil(total / size)'],
        },
        mythTraps: [
          {
            id: 'M5f.1',
            statement: 'Cursor pagination only works with auto-increment integer IDs.',
            factCheck: 'Any unique, sequential column (such as createdAt + id composite or UUIDv7) can be used as a cursor.',
          },
        ],
      },
      {
        id: '5g',
        code: '5g',
        level: 6,
        title: 'Aggregation, Grouping and Summarizing',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'I need totals per author.' },
          { speaker: 'pri', speech: 'Use groupBy! where filters rows first, then groups form, then having filters groups.' },
          { speaker: 'bug', speech: 'Mix up where and having and I win!' },
        ],
        inSimpleWords: {
          comparison:
            'Aggregation calculates numbers: count, sum, average, min, max. groupBy does it per group ("posts per author"). where filters individual rows before grouping; having filters calculated groups after aggregation.',
          danger: 'Aggregating over an empty set returns null for _sum, _avg, _min, _max (NOT 0). Handle nulls!',
        },
        detailedTheory:
          'Methods:\n- count({ where })\n- aggregate({ _count, _sum, _avg, _min, _max })\n- groupBy({ by: ["authorId"], where, having, _count, _sum, orderBy, skip, take })\n\nIn groupBy, every column used in orderBy must be present in by or be an aggregate field.',
        codeLab: {
          title: 'groupBy with Having Filter',
          code: `const stats = await prisma.post.groupBy({
  by: ["authorId"],
  where: { published: true },
  _count: { _all: true },
  _sum: { views: true },
  having: {
    views: { _sum: { gt: 100 } }
  },
  orderBy: {
    _sum: { views: "desc" }
  }
});`,
          explanation: 'where filters published posts; having filters groups whose total views exceed 100.',
        },
        didYouKnow: 'Aggregates like _sum and _avg return null (not 0) when no matching records exist.',
        memoryTrick: 'WHERE = rows. HAVING = groups.',
        remember: [
          'where = before grouping, having = after.',
          'Aggregates of nothing are null.',
          'Fields used in orderBy must be in by or be aggregates.',
        ],
        mcqs: [
          {
            id: 'Q5g.1',
            question: 'having filters:',
            options: ['Rows before grouping', 'Groups after aggregation', 'Columns', 'Relations'],
            answerIndex: 1,
            explanation: 'having filters groups after aggregation has been computed.',
          },
          {
            id: 'Q5g.2',
            question: '_avg over zero matching rows returns:',
            options: ['0', 'NaN', 'null', 'throws'],
            answerIndex: 2,
            explanation: 'Aggregates over an empty set evaluate to null.',
          },
        ],
        codingQuest: {
          id: 'C5g.1',
          prompt: 'List authorIds who have written at least 2 published posts, with their post counts.',
          solution: `const r = await prisma.post.groupBy({
  by: ["authorId"],
  where: { published: true },
  _count: { _all: true },
  having: {
    authorId: { _count: { gte: 2 } }
  }
});`,
          steps: ['by: ["authorId"]', 'where: { published: true }', 'having: { authorId: { _count: { gte: 2 } } }'],
        },
        mythTraps: [
          {
            id: 'M5g.1',
            statement: 'having and where are interchangeable in groupBy.',
            factCheck: 'where filters individual rows before grouping. having filters aggregated group statistics.',
          },
        ],
      },
    ],
  },
  {
    level: 7,
    day: 5,
    title: 'Prisma Client Lifecycle',
    subtitle: '6a - 6b: Singleton Pattern, Connection Pools & Client Generation',
    focus: 'Instantiate once, avoid connection exhaustion, generate client.',
    topics: [
      {
        id: '6a',
        code: '6a',
        level: 7,
        title: 'Introduction to Prisma Client (Singleton & Pool)',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'Should I create a new PrismaClient for every request?' },
          { speaker: 'pri', speech: 'NO! Create one and share it. Each client owns a connection pool.' },
          { speaker: 'bug', speech: "Make me 100 clients and the database cries 'too many connections'!" },
        ],
        inSimpleWords: {
          comparison:
            'Prisma Client manages a pool of database connections. If you create a new client on every HTTP request, you open hundreds of database connections until the server crashes with "too many connections". Create one client and export it everywhere.',
          danger: 'In dev servers with hot module reloading (like Vite or tsx watch), cache the client on globalThis to prevent leaking pools on each save.',
        },
        detailedTheory:
          'PrismaClient lifecycle:\n- Connection is lazy: the client does not connect to the database until the first query is issued.\n- $connect() is optional; $disconnect() is required when closing scripts or shutting down the server.\n- Dev singleton pattern stores the client on globalThis.prisma.',
        codeLab: {
          title: 'Global Singleton Pattern (src/lib/prisma.ts)',
          code: `import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const g = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  g.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
  });

if (process.env.NODE_ENV !== "production") {
  g.prisma = prisma;
}`,
          explanation: 'Reuses the existing client instance across dev server file reloads.',
        },
        didYouKnow: 'Prisma Client connects lazily: the socket connection is opened on the very first query execution.',
        memoryTrick: 'One app, one client, one pool.',
        remember: [
          'One client per application.',
          'Connection is lazy; $disconnect() at the end of scripts.',
          'v7 needs a driver adapter passed to new PrismaClient({ adapter }).',
        ],
        mcqs: [
          {
            id: 'Q6a.1',
            question: 'How many PrismaClient instances should a typical app create?',
            options: ['One per request', 'One shared instance', 'One per model', 'One per query'],
            answerIndex: 1,
            explanation: 'One shared singleton instance manages the database connection pool.',
          },
          {
            id: 'Q6a.2',
            question: 'Do you need to call $connect() before running the first query?',
            options: ['Always', 'No, connection is lazy', 'Only on Postgres', 'Only in v7'],
            answerIndex: 1,
            explanation: 'Prisma automatically connects on demand when the first query executes.',
          },
        ],
        codingQuest: {
          id: 'C6a.1',
          prompt: 'Create a typed reusable select object that returns id and email using satisfies Prisma.UserSelect.',
          solution: `import { Prisma } from "../generated/prisma/client";

const userBasic = {
  id: true,
  email: true
} satisfies Prisma.UserSelect;

type UserBasic = Prisma.UserGetPayload<{ select: typeof userBasic }>;
const users: UserBasic[] = await prisma.user.findMany({ select: userBasic });`,
          steps: ['Use satisfies Prisma.UserSelect', 'Derive payload type with Prisma.UserGetPayload'],
        },
        mythTraps: [
          {
            id: 'M6a.1',
            statement: 'I should create a new PrismaClient() inside every request handler.',
            factCheck: 'Each instance creates its own connection pool. Creating instances per request quickly exhausts database connections.',
          },
        ],
      },
      {
        id: '6b',
        code: '6b',
        level: 7,
        title: 'Generating Prisma Client',
        difficulty: 1,
        examWeight: 3,
        xp: 60,
        comicPanels: [
          { speaker: 'pri', speech: 'prisma generate reads your schema and writes your typed client.' },
          { speaker: 'nova', speech: 'Where does the code go?' },
          { speaker: 'bug', speech: 'Edit the generated files by hand? I will erase your edits next time. Hehe!' },
        ],
        inSimpleWords: {
          comparison:
            'prisma generate is like a compiler. It reads schema.prisma and writes real TypeScript code into your generated folder. Whenever you edit the schema or pull changes from Git, re-run prisma generate so your types match.',
          danger: 'Never edit files inside the generated folder! Any manual changes will be wiped clean the next time generate runs.',
        },
        detailedTheory:
          'In Prisma v7, the generator block uses provider = "prisma-client" and requires an output directory. Optional settings include moduleFormat = "esm" or "cjs". Output should be added to .gitignore. In CI/CD pipelines, always run npx prisma generate before running tests or building with tsc.',
        codeLab: {
          title: 'Generator Block in schema.prisma',
          code: `generator client {
  provider     = "prisma-client"
  output       = "../generated/prisma"
  moduleFormat = "esm"
}

datasource db {
  provider = "postgresql"
}`,
          explanation: 'Specifies explicit client generation destination and ES Modules format.',
        },
        didYouKnow: 'npx prisma generate --watch keeps the generator running in development, recompiling types automatically when the schema changes.',
        memoryTrick: 'Schema changed? Generate again.',
        remember: [
          'output is required with provider = "prisma-client".',
          'Never edit generated files by hand.',
          'Run prisma generate in CI before tsc build.',
        ],
        mcqs: [
          {
            id: 'Q6b.1',
            question: 'Which generator provider is the default recommendation in Prisma v7?',
            options: ['prisma-client-js', 'prisma-client', 'prisma-orm', 'client-gen'],
            answerIndex: 1,
            explanation: 'Prisma v7 introduces provider = "prisma-client" with explicit output.',
          },
          {
            id: 'Q6b.2',
            question: 'When must you re-run prisma generate?',
            options: ['Never', 'After schema changes or git pull', 'Only on deploy', 'Only if DATABASE_URL changes'],
            answerIndex: 1,
            explanation: 'Whenever schema.prisma is modified, the client must be regenerated to reflect updated types.',
          },
        ],
        codingQuest: {
          id: 'C6b.1',
          prompt: 'Write a generator block outputting to src/generated/prisma as CommonJS.',
          solution: `generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "cjs"
}`,
          steps: ['provider = "prisma-client"', 'output path', 'moduleFormat = "cjs"'],
        },
        mythTraps: [
          {
            id: 'M6b.1',
            statement: "I can keep importing PrismaClient from '@prisma/client' with the new generator.",
            factCheck: 'With provider = "prisma-client", you import PrismaClient from your configured output folder.',
          },
          {
            id: 'M6b.2',
            statement: 'Generated files should be hand-edited for small fixes.',
            factCheck: 'Generated files are completely overwritten on every generate command. Use $extends or helper wrappers instead.',
          },
        ],
      },
    ],
  },
  {
    level: 8,
    day: 5,
    title: 'Prisma Migrate & Drift Detection',
    subtitle: '7a - 7c: Versioned SQL Migrations, --create-only & Shadow Databases',
    focus: 'Both paginations, groupBy, migrate dev vs deploy, drift.',
    topics: [
      {
        id: '7a',
        code: '7a',
        level: 8,
        title: 'Database, Schema & SQL Migration Tool',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'What exactly is a migration?' },
          { speaker: 'pri', speech: 'A saved, numbered SQL change: version control for your tables.' },
          { speaker: 'bug', speech: 'db push forgets history. Use it for prototypes only!' },
        ],
        inSimpleWords: {
          comparison:
            'A migration is a version-controlled SQL file that records a schema change (like "add column bio"). Prisma stores these files in prisma/migrations and tracks applied migrations in the _prisma_migrations database table.',
          danger: 'migrate dev is for local development only! On production servers, always run prisma migrate deploy.',
        },
        detailedTheory:
          'Prisma Migrate command guide:\n- migrate dev: creates migration SQL file, applies to dev DB, uses shadow DB. May reset if drift occurs.\n- migrate deploy: applies pending migrations in production/CI without prompts or shadow DB.\n- migrate reset: drops database, re-applies all migrations from start.\n- db push: syncs schema without generating migration history files (prototyping only).\n- db pull: introspects existing database into schema.prisma.\n- migrate status: checks if migrations are pending.',
        codeLab: {
          title: 'Inspecting migration.sql',
          code: `-- prisma/migrations/20260120_add_bio/migration.sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN "bio" TEXT;

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");`,
          explanation: 'Plain SQL files that can be reviewed, edited, and tracked in git.',
        },
        didYouKnow: 'The database table _prisma_migrations keeps track of checksums and timestamps of applied migrations.',
        memoryTrick: 'dev creates. deploy applies.',
        remember: [
          'dev creates, deploy applies.',
          'db push = no history (prototype only).',
          'History lives in migration files + _prisma_migrations table.',
        ],
        mcqs: [
          {
            id: 'Q7a.1',
            question: 'Where does Prisma record which migrations were applied to the database?',
            options: ['migration_lock.toml', '_prisma_migrations table', 'schema.prisma', 'package.json'],
            answerIndex: 1,
            explanation: 'The _prisma_migrations table records migration names, checksums, and execution timestamps.',
          },
          {
            id: 'Q7a.2',
            question: 'A migration generated by Prisma Migrate is:',
            options: ['A JSON file', 'A TypeScript file', 'A plain SQL file', 'Binary'],
            answerIndex: 2,
            explanation: 'Migrations are plain, human-readable SQL files.',
          },
        ],
        codingQuest: {
          id: 'C7a.1',
          prompt: 'Name the command that syncs the schema to a throwaway dev database WITHOUT creating migration history.',
          solution: 'npx prisma db push',
          steps: ['Use npx prisma db push for prototyping'],
        },
        mythTraps: [
          {
            id: 'M7a.1',
            statement: 'db push and migrate dev are the same.',
            factCheck: 'migrate dev generates versioned SQL files for safe deployment. db push applies changes directly with zero history.',
          },
        ],
      },
      {
        id: '7b',
        code: '7b',
        level: 8,
        title: 'Safe Migrations with --create-only',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'How do I change my database safely?' },
          { speaker: 'pri', speech: 'Edit schema, run migrate dev --name ..., commit the SQL. On servers run migrate deploy.' },
          { speaker: 'bug', speech: 'Run migrate dev in production and I will reset your data. Muahaha!' },
        ],
        inSimpleWords: {
          comparison:
            'Adding a NOT NULL column to a table with 100,000 rows will fail because existing rows have no value! Use --create-only to generate the SQL file first without applying it. You edit the SQL to add the column as nullable, fill in default values, set NOT NULL, and then apply.',
          danger: 'NEVER run migrate dev in production! It requires interactive input and can prompt to wipe all data.',
        },
        detailedTheory:
          'Safe backfill recipe:\n1. Update schema.prisma\n2. npx prisma migrate dev --create-only --name add_status\n3. Edit the generated migration.sql:\n   - ADD COLUMN "status" TEXT;\n   - UPDATE "User" SET "status" = \'active\';\n   - ALTER COLUMN "status" SET NOT NULL;\n4. npx prisma migrate dev (applies the edited SQL)\n5. npx prisma generate',
        codeLab: {
          title: 'Safe Backfill SQL in migration.sql',
          code: `-- Step 1: Add column nullable
ALTER TABLE "User" ADD COLUMN "status" TEXT;

-- Step 2: Backfill existing rows
UPDATE "User" SET "status" = 'active';

-- Step 3: Enforce NOT NULL constraint
ALTER TABLE "User" ALTER COLUMN "status" SET NOT NULL;`,
          explanation: 'Ensures zero-downtime, crash-free migrations on tables with existing records.',
        },
        didYouKnow: '--create-only lets you review and modify generated SQL before it touches your development database.',
        memoryTrick: 'Dev = Develop. Deploy = Deliver.',
        remember: [
          'Dev: migrate dev. Prod: migrate deploy.',
          '--create-only lets you edit SQL first.',
          'Run prisma generate after migrating in v7.',
        ],
        mcqs: [
          {
            id: 'Q7b.1',
            question: 'Which command applies pending migrations in production or CI/CD?',
            options: ['migrate dev', 'migrate reset', 'migrate deploy', 'db push'],
            answerIndex: 2,
            explanation: 'migrate deploy applies pending migrations safely without prompts.',
          },
          {
            id: 'Q7b.2',
            question: 'What is the purpose of the --create-only flag in migrate dev?',
            options: ['Skip SQL', 'Create the migration file but do not apply it so you can edit it', 'Create only shadow DB', 'Seed only'],
            answerIndex: 1,
            explanation: '--create-only creates the migration SQL file for inspection and manual edits.',
          },
        ],
        codingQuest: {
          id: 'C7b.1',
          prompt: 'Give the command sequence to add a new required column status with a backfill for existing rows.',
          solution: `npx prisma migrate dev --create-only --name add_status
# Edit migration.sql: add nullable, update old rows, set not null
npx prisma migrate dev
npx prisma generate`,
          steps: ['Run migrate dev --create-only', 'Edit SQL file to backfill', 'Run migrate dev to apply', 'Generate client'],
        },
        mythTraps: [
          {
            id: 'M7b.1',
            statement: 'It is fine to run migrate dev in production.',
            factCheck: 'migrate dev detects drift and may prompt to reset (wipe) the database. Always run migrate deploy in production.',
          },
        ],
      },
      {
        id: '7c',
        code: '7c',
        level: 8,
        title: 'Shadow Database & Drift Detection',
        difficulty: 3,
        examWeight: 3,
        xp: 80,
        comicPanels: [
          { speaker: 'nova', speech: 'What is a shadow database?' },
          { speaker: 'pri', speech: 'A temporary scratch database. Prisma replays history there to work out your next migration, then deletes it.' },
          { speaker: 'bug', speech: 'Change tables by hand and I create drift. Prisma will ask to reset!' },
        ],
        inSimpleWords: {
          comparison:
            'How does Prisma know what SQL to write? It creates a temporary scratch database (shadow DB), replays all past migrations from step 1, compares the result to your schema.prisma, and generates the exact diff. If someone altered a table manually in the dev DB, the history disagrees: that is database drift!',
          danger: 'Drift occurs when tables are modified by hand or migration files are edited after being applied.',
        },
        detailedTheory:
          'Four components of migration architecture:\n1. schema.prisma: desired state\n2. prisma/migrations/: ordered SQL history\n3. Dev database + _prisma_migrations: actual current state\n4. Shadow database: temporary disposable DB used during migrate dev to detect drift and compute clean diffs.\n\nProduction never uses a shadow database; migrate deploy simply executes unapplied SQL files.',
        codeLab: {
          title: 'Resolving Database Drift',
          code: `# Option 1: Development reset (drops and recreates dev DB)
npx prisma migrate reset

# Option 2: Baseline an existing production database
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
npx prisma migrate resolve --applied 0_init`,
          explanation: 'migrate resolve marks migrations as applied without re-executing them.',
        },
        didYouKnow: 'The shadow database is created and dropped on the fly; cloud databases with limited permissions can specify a shadowDatabaseUrl.',
        memoryTrick: 'History + Shadow = Diff.',
        remember: [
          'Shadow DB is temporary and automatic.',
          'Drift = DB state differs from migration history.',
          'migrate deploy never uses a shadow DB.',
        ],
        mcqs: [
          {
            id: 'Q7c.1',
            question: 'What is the shadow database used for?',
            options: ['Backups', 'Replaying history to compute diffs and detect drift', 'Production replica', 'Caching'],
            answerIndex: 1,
            explanation: 'The shadow DB replays all migrations to verify history and compute clean SQL diffs.',
          },
          {
            id: 'Q7c.2',
            question: 'What does database drift mean?',
            options: ['A slow query', 'The DB schema differs from what migration history produces', 'An outdated client', 'A seed failure'],
            answerIndex: 1,
            explanation: 'Drift means changes occurred in the DB outside of the migration history.',
          },
        ],
        codingQuest: {
          id: 'C7c.1',
          prompt: 'You manually added a column in dev DB with SQL and migrate dev reports drift. Name two ways to proceed.',
          solution: `1) Accept 'migrate reset' in development (re-creates schema, wipes data).
2) Run 'npx prisma db pull' / 'migrate diff' to capture the change in a migration, and mark it with 'migrate resolve --applied'.`,
          steps: ['Option 1: migrate reset', 'Option 2: capture diff and migrate resolve --applied'],
        },
        mythTraps: [
          {
            id: 'M7c.1',
            statement: 'The shadow database is my dev database.',
            factCheck: 'False! The shadow database is a separate temporary database created and dropped automatically during migrate dev.',
          },
          {
            id: 'M7c.2',
            statement: 'migrate reset only truncates table data.',
            factCheck: 'migrate reset drops the entire database/schema, re-applies all migrations from scratch, and in v7 requires running seed manually.',
          },
        ],
      },
    ],
  },
  {
    level: 9,
    day: 6,
    title: 'Prisma Seed',
    subtitle: '8: Idempotent Seeding with Upsert in v7',
    focus: 'Write seed script, register in prisma.config.ts, run prisma db seed.',
    topics: [
      {
        id: '8',
        code: '8',
        level: 9,
        title: 'Seeding Starter Data',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'nova', speech: 'I need test data in every fresh database.' },
          { speaker: 'pri', speech: 'Write prisma/seed.ts, register it in prisma.config.ts, run prisma db seed.' },
          { speaker: 'bug', speech: 'Use createMany and I crash you with duplicates on the second run!' },
        ],
        inSimpleWords: {
          comparison:
            'Seeding means populating a fresh database with essential starter data: an admin user, default categories, sample posts. Always use upsert so running the seed script 10 times will not crash with duplicate key errors.',
          danger: 'In Prisma v7: migrate dev and migrate reset no longer run seed automatically. You run npx prisma db seed yourself.',
        },
        detailedTheory:
          'In Prisma v7, seed configuration lives in prisma.config.ts:\nmigrations: { seed: "tsx prisma/seed.ts" }\n\nSeed scripts should:\n1. Use upsert with @unique fields or createMany with skipDuplicates: true.\n2. Always disconnect PrismaClient via .finally(() => prisma.$disconnect()).\n3. Exit with process.exit(1) on caught errors.',
        codeLab: {
          title: 'Idempotent prisma/seed.ts',
          code: `import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      posts: { create: { title: "Welcome" } }
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });`,
          explanation: 'Running this multiple times safely keeps the data without duplicate errors.',
        },
        didYouKnow: 'upsert update: {} performs a safe no-op if the record already exists.',
        memoryTrick: 'Seed with upsert: safe to repeat.',
        remember: [
          'Config: migrations.seed in prisma.config.ts.',
          'Execute with: npx prisma db seed.',
          'v7: seed is not run automatically after migrate.',
        ],
        mcqs: [
          {
            id: 'Q8.1',
            question: 'What is the command to run the seed script?',
            options: ['prisma seed', 'prisma db seed', 'prisma migrate seed', 'prisma generate --seed'],
            answerIndex: 1,
            explanation: 'npx prisma db seed triggers the configured seed command.',
          },
          {
            id: 'Q8.2',
            question: 'Why should seed scripts use upsert instead of create?',
            options: ['Faster', 'Makes the script safe to run repeatedly without unique constraint errors', 'Required by Prisma', 'Avoids adapters'],
            answerIndex: 1,
            explanation: 'upsert makes seeds idempotent, preventing duplicate key violations.',
          },
        ],
        codingQuest: {
          id: 'C8.1',
          prompt: 'Configure prisma.config.ts so prisma db seed runs prisma/seed.ts with tsx.',
          solution: `export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: { url: env("DATABASE_URL") },
});`,
          steps: ['Add migrations.seed in defineConfig', 'Set value to "tsx prisma/seed.ts"'],
        },
        mythTraps: [
          {
            id: 'M8.1',
            statement: 'The seed script runs automatically after every migrate dev in v7.',
            factCheck: 'In Prisma v7, automatic seeding was removed from migrate. Run npx prisma db seed explicitly.',
          },
          {
            id: 'M8.2',
            statement: 'createMany makes re-running the seed safe.',
            factCheck: 'createMany without skipDuplicates: true throws a unique constraint error on the second run. Use upsert or skipDuplicates.',
          },
        ],
      },
    ],
  },
  {
    level: 10,
    day: 6,
    title: 'Prisma Studio',
    subtitle: '9: Visual Database Browser on localhost:5555',
    focus: 'Inspect data, edit cells, follow relations, custom ports.',
    topics: [
      {
        id: '9',
        code: '9',
        level: 10,
        title: 'Prisma Studio Visual Browser',
        difficulty: 1,
        examWeight: 1,
        xp: 40,
        comicPanels: [
          { speaker: 'pri', speech: 'Studio is a spreadsheet-like website for your database. Run npx prisma studio!' },
          { speaker: 'nova', speech: 'Can I change my table design in there?' },
          { speaker: 'bug', speech: 'Port 5555 busy? I took it. Use --port!' },
        ],
        inSimpleWords: {
          comparison:
            'Prisma Studio is an interactive spreadsheet running on localhost:5555. You can view rows, click through foreign key relations, add test data, and edit values directly.',
          danger: 'Studio edits data only! It does NOT edit your schema or generate migrations. To change columns or tables, edit schema.prisma and migrate.',
        },
        detailedTheory:
          'Prisma Studio is a visual database editor.\n- Default URL: http://localhost:5555\n- Useful CLI flags:\n  --port <number>: choose alternate port if 5555 is in use\n  --browser none: prevents launching a browser window automatically (ideal in Docker or headless VMs)\n- Edits commit directly to the database.',
        codeLab: {
          title: 'Prisma Studio CLI Commands',
          code: `# Default launch
npx prisma studio

# Custom port without opening browser
npx prisma studio --port 5556 --browser none`,
          explanation: 'Studio connects directly using settings from prisma.config.ts.',
        },
        didYouKnow: 'You can navigate deeply nested relations inside Prisma Studio by clicking linked foreign key badges.',
        memoryTrick: 'Studio shows data, not schema.',
        remember: [
          'Default port is 5555.',
          'Edits go straight to the database.',
          'Does not modify schema.prisma or generate migrations.',
        ],
        mcqs: [
          {
            id: 'Q9.1',
            question: 'What is the default port for Prisma Studio?',
            options: ['3000', '5555', '8080', '5432'],
            answerIndex: 1,
            explanation: 'Prisma Studio serves at http://localhost:5555 by default.',
          },
          {
            id: 'Q9.2',
            question: 'Edits made inside Prisma Studio:',
            options: ['Create migrations', 'Change schema.prisma', 'Write directly to the database', 'Are staged until git commit'],
            answerIndex: 2,
            explanation: 'Studio directly manipulates database records.',
          },
        ],
        codingQuest: {
          id: 'C9.1',
          prompt: 'Start Studio on port 5556 without opening a browser window.',
          solution: 'npx prisma studio --port 5556 --browser none',
          steps: ['Pass --port 5556', 'Pass --browser none'],
        },
        mythTraps: [
          {
            id: 'M9.1',
            statement: 'Prisma Studio is read-only.',
            factCheck: 'False! Prisma Studio supports full CRUD: creating, editing, and deleting records.',
          },
          {
            id: 'M9.2',
            statement: 'Adding a column in Prisma Studio updates my schema.',
            factCheck: 'Studio cannot modify database structure. Column changes must be made in schema.prisma and applied with migrate.',
          },
        ],
      },
    ],
  },
  {
    level: 11,
    day: 6,
    title: 'Prisma Client API Reference',
    subtitle: '10a - 10d: Options, Query Operators, Transactions & Error Code Decoder',
    focus: 'Client options, operators, array vs interactive tx, P2002/P2025/P2003.',
    topics: [
      {
        id: '10a',
        code: '10a',
        level: 11,
        title: 'Client Constructor, Options & Lifecycle',
        difficulty: 1,
        examWeight: 2,
        xp: 50,
        comicPanels: [
          { speaker: 'nova', speech: 'How do I see the SQL that Prisma runs?' },
          { speaker: 'pri', speech: "Pass log: ['query'] to the PrismaClient constructor." },
          { speaker: 'bug', speech: '$extends does not change your client. It returns a NEW one. Use that!' },
        ],
        inSimpleWords: {
          comparison:
            'Constructor options configure how the client behaves. Passing log: ["query"] prints every SQL statement to your console—an invaluable tool for spotting N+1 queries.',
          danger: '$extends does NOT mutate the original client instance; it returns a new extended client. Export and use the returned instance!',
        },
        detailedTheory:
          'PrismaClient constructor options:\n- adapter: driver adapter instance (v7 requirement)\n- log: ["query", "warn", "error"] or custom event listeners\n- errorFormat: "pretty" | "colorless" | "minimal"\n- omit: global field omission\n\n$extends returns a brand new extended client instance.',
        codeLab: {
          title: 'Logging and Extending Client',
          code: `const prisma = new PrismaClient({
  adapter,
  log: ["query", "error"]
}).$extends({
  result: {
    user: {
      displayName: {
        needs: { name: true },
        compute: (u) => u.name ?? "Anonymous"
      }
    }
  }
});`,
          explanation: 'Logs queries and adds virtual computed field displayName.',
        },
        didYouKnow: 'Client extensions completely replaced the legacy prisma.$use() middleware, which has been removed.',
        memoryTrick: 'log = peek at the SQL.',
        remember: [
          'log: ["query"] displays underlying SQL.',
          '$extends returns a NEW client.',
          'Model accessor = lower-camel model name (prisma.user).',
        ],
        mcqs: [
          {
            id: 'Q10a.1',
            question: 'Which constructor option turns on query logging?',
            options: ['debug', 'log', 'trace', 'verbose'],
            answerIndex: 1,
            explanation: 'log: ["query"] logs generated SQL statements.',
          },
          {
            id: 'Q10a.2',
            question: 'What is $extends used for?',
            options: ['Extending schema', 'Client extensions such as computed fields and custom methods', 'Migrations', 'Seeding'],
            answerIndex: 1,
            explanation: '$extends allows adding custom model methods, computed fields, and query hooks.',
          },
        ],
        codingQuest: {
          id: 'C10a.1',
          prompt: 'Create a client instance that logs queries and errors.',
          solution: `const prisma = new PrismaClient({
  adapter,
  log: ["query", "error"]
});`,
          steps: ['Pass adapter', 'Set log: ["query", "error"]'],
        },
        mythTraps: [
          {
            id: 'M10a.1',
            statement: '$extends mutates the original client.',
            factCheck: 'Prisma Client is immutable. $extends returns a new client; you must export and use that returned client.',
          },
        ],
      },
      {
        id: '10b',
        code: '10b',
        level: 11,
        title: 'Model Query Reference: Arguments and Operators',
        difficulty: 2,
        examWeight: 2,
        xp: 60,
        comicPanels: [
          { speaker: 'nova', speech: 'There are so many arguments!' },
          { speaker: 'pri', speech: 'Learn these: where, data, select, include, omit, orderBy, skip, take, cursor.' },
          { speaker: 'bug', speech: 'Use some on a scalar list and I laugh. Scalar lists use has!' },
        ],
        inSimpleWords: {
          comparison:
            'Every query is constructed with consistent argument keywords: where (which rows), data (values to write), select/include/omit (what to return), and orderBy/skip/take/cursor (order and paging).',
          danger: 'List filtering difference: relation lists use some/every/none; scalar lists (String[]) use has/hasSome/hasEvery!',
        },
        detailedTheory:
          'Filter categories:\n- Scalar: equals, not, in, notIn, lt, lte, gt, gte, contains, startsWith, endsWith, mode\n- Scalar list (String[]): has, hasSome, hasEvery, isEmpty\n- Relation list (Post[]): some, every, none\n- Single relation: is, isNot\n- Logical: AND, OR, NOT\n- JSON: path, string_contains, array_contains\n- distinct: ["authorId"] removes duplicates.',
        codeLab: {
          title: 'Distinct and Scalar List Queries',
          code: `// Distinct author IDs
const distinctAuthors = await prisma.post.findMany({
  where: { views: { gt: 50 } },
  distinct: ["authorId"],
  select: { authorId: true }
});

// Scalar list filter
const taggedPosts = await prisma.post.findMany({
  where: { tags: { has: "typescript" } }
});`,
          explanation: 'distinct deduplicates results; has filters scalar array columns.',
        },
        didYouKnow: 'distinct returns unique combinations of the selected columns.',
        memoryTrick: 'where = which. data = what. select = show.',
        remember: [
          'by/having only exist in groupBy.',
          'Scalar list filters: has, hasSome, hasEvery, isEmpty.',
          'Relation filters: some, every, none, is, isNot.',
        ],
        mcqs: [
          {
            id: 'Q10b.1',
            question: 'Which argument appears only in groupBy?',
            options: ['where', 'by', 'take', 'orderBy'],
            answerIndex: 1,
            explanation: 'by specifies the columns to group by.',
          },
          {
            id: 'Q10b.2',
            question: 'Which operator checks if a scalar list contains a specific value?',
            options: ['contains', 'has', 'in', 'some'],
            answerIndex: 1,
            explanation: 'Scalar lists use has; relation lists use some.',
          },
        ],
        codingQuest: {
          id: 'C10b.1',
          prompt: 'Return distinct authorIds of posts with views above 50.',
          solution: `await prisma.post.findMany({
  where: { views: { gt: 50 } },
  distinct: ["authorId"],
  select: { authorId: true }
});`,
          steps: ['where: { views: { gt: 50 } }', 'distinct: ["authorId"]', 'select: { authorId: true }'],
        },
        mythTraps: [
          {
            id: 'M10b.1',
            statement: 'some is used for filtering scalar lists (String[]).',
            factCheck: 'some is for relation lists (Post[]). Scalar lists use has, hasSome, and hasEvery.',
          },
        ],
      },
      {
        id: '10c',
        code: '10c',
        level: 11,
        title: 'Transactions and Raw Queries',
        difficulty: 3,
        examWeight: 3,
        xp: 80,
        comicPanels: [
          { speaker: 'nova', speech: 'How do I move money between two accounts safely?' },
          { speaker: 'pri', speech: 'Use a transaction: all steps succeed or none do. $transaction does it.' },
          { speaker: 'bug', speech: 'Use prisma instead of tx inside and I escape the transaction!' },
        ],
        inSimpleWords: {
          comparison:
            'A transaction is all-or-nothing: like a bank transfer, money leaves account A and enters account B; if step 2 fails, step 1 is rolled back. Sequential array: $transaction([q1, q2]). Interactive transaction: $transaction(async (tx) => { ... }). Inside, ALWAYS use tx, not prisma!',
          danger: 'Never use string concatenation with raw SQL! Use the tagged template `prisma.$queryRaw` which safely parameterizes inputs.',
        },
        detailedTheory:
          'Two transaction styles:\n1. Array style: prisma.$transaction([q1, q2]) — executes all in one round-trip; rolls back if any fails.\n2. Interactive style: prisma.$transaction(async (tx) => { ... }, options) — allows intermediate JavaScript logic. Throwing rolls back all operations.\n\nRaw SQL:\n- prisma.$queryRaw`SELECT * FROM "User" WHERE id = ${id}` (automatically parameterised and safe from SQL injection)\n- Prisma.join([1, 2, 3]) formats IN clauses safely\n- $queryRawUnsafe is vulnerable to SQL injection if not sanitized.',
        codeLab: {
          title: 'Interactive Transaction (Bank Transfer)',
          code: `await prisma.$transaction(async (tx) => {
  const from = await tx.account.update({
    where: { id: 1 },
    data: { balance: { decrement: 100 } }
  });

  if (from.balance < 0) {
    throw new Error("Insufficient funds"); // Rolls back!
  }

  await tx.account.update({
    where: { id: 2 },
    data: { balance: { increment: 100 } }
  });
});`,
          explanation: 'Using tx ensures operations run in the transaction context. Throwing rolls back changes.',
        },
        didYouKnow: 'Tagged templates with $queryRaw convert ${value} into positional SQL parameters ($1, $2), blocking SQL injection completely.',
        memoryTrick: 'Inside the transaction, use tx.',
        remember: [
          'Array style for independent queries; function style for conditional logic.',
          'Always use tx inside interactive transactions.',
          'Never concatenate strings into raw SQL.',
        ],
        mcqs: [
          {
            id: 'Q10c.1',
            question: 'Inside an interactive transaction callback $transaction(async (tx) => ...), you must call operations on:',
            options: ['prisma', 'tx', 'global client', 'either'],
            answerIndex: 1,
            explanation: 'Operations called on prisma execute outside the transaction boundary and will not roll back.',
          },
          {
            id: 'Q10c.2',
            question: 'Which raw SQL API is SAFE from SQL injection when using template literals?',
            options: ['$queryRawUnsafe', '$queryRaw', 'both unsafe', 'neither'],
            answerIndex: 1,
            explanation: '$queryRaw tagged templates automatically parameterize interpolated variables.',
          },
        ],
        codingQuest: {
          id: 'C10c.1',
          prompt: 'Atomically create a user and a post in one array transaction.',
          solution: `await prisma.$transaction([
  prisma.user.create({ data: { email: "n@x.com" } }),
  prisma.post.create({ data: { title: "T", authorId: 1 } }),
]);`,
          steps: ['Pass array to prisma.$transaction', 'Both operations execute atomically'],
        },
        mythTraps: [
          {
            id: 'M10c.1',
            statement: 'Inside $transaction(async (tx) => ...) I can keep using prisma.',
            factCheck: 'Calling prisma runs outside the transaction and does not participate in the rollback. Always use tx.',
          },
        ],
      },
      {
        id: '10d',
        code: '10d',
        level: 11,
        title: 'Error Codes & Utility Types Decoder',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'What does error code P2002 mean?' },
          { speaker: 'pri', speech: 'Duplicate in a unique field! P2025 = not found. P2003 = foreign key problem.' },
          { speaker: 'bug', speech: 'Catch every error and hide it? Great, I will live in your app forever!' },
        ],
        inSimpleWords: {
          comparison:
            'When a database constraint fails, Prisma throws an error with a distinct code:\n- P2002: unique constraint failed (duplicate email)\n- P2025: record not found (update/delete on non-existent row)\n- P2003: foreign key constraint failed (parent row does not exist)\nAlways check instanceof PrismaClientKnownRequestError, inspect e.code, and re-throw unexpected errors.',
          danger: 'Catching and swallowing all errors hides syntax errors and network disconnects. Always re-throw unknown errors!',
        },
        detailedTheory:
          'Error Hierarchy:\n- Prisma.PrismaClientKnownRequestError: has e.code and e.meta\n  • P2002: Unique constraint failed\n  • P2025: Record to update/delete/orThrow not found\n  • P2003: Foreign key constraint failed\n  • P2000: Value too long for column\n  • P2014: Required relation violation\n  • P1001: Cannot reach database server\n- Prisma.PrismaClientValidationError: missing required argument or bad type\n- Prisma.PrismaClientInitializationError: connection string or credentials invalid.',
        codeLab: {
          title: 'Handling P2002 Duplicate Error',
          code: `try {
  await prisma.user.create({ data: { email } });
} catch (e) {
  if (
    e instanceof Prisma.PrismaClientKnownRequestError &&
    e.code === "P2002"
  ) {
    return "This email is already registered";
  }
  throw e; // Re-throw unknown errors!
}`,
          explanation: 'Checks instance and code; re-throws unknown errors.',
        },
        didYouKnow: 'e.meta in P2002 includes target: ["email"] indicating exactly which unique field clashed.',
        memoryTrick: 'P2002 Twice. P2025 Nobody home. P2003 Parent missing.',
        remember: [
          'P2002 duplicate, P2025 not found, P2003 foreign key.',
          'Always re-throw unknown errors.',
          'Validation error = invalid arguments or types.',
        ],
        mcqs: [
          {
            id: 'Q10d.1',
            question: 'Which error code indicates a unique constraint violation?',
            options: ['P2025', 'P2002', 'P2003', 'P1001'],
            answerIndex: 1,
            explanation: 'P2002 signals a unique constraint violation.',
          },
          {
            id: 'Q10d.2',
            question: 'prisma.post.delete({ where: { id: 9999 } }) with no such row throws error code:',
            options: ['P2002', 'P2003', 'P2025', 'None'],
            answerIndex: 2,
            explanation: 'Attempting to delete a missing row throws P2025.',
          },
        ],
        codingQuest: {
          id: 'C10d.1',
          prompt: 'Write safeCreateUser(email) returning null if email already exists.',
          solution: `async function safeCreateUser(email: string) {
  try {
    return await prisma.user.create({ data: { email } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return null;
    }
    throw e;
  }
}`,
          steps: ['Wrap in try/catch', 'Check instance and e.code === "P2002"', 'Return null on P2002, throw otherwise'],
        },
        mythTraps: [
          {
            id: 'M10d.1',
            statement: 'All Prisma errors are instances of the same error class.',
            factCheck: 'Prisma uses distinct classes: PrismaClientKnownRequestError, PrismaClientValidationError, and PrismaClientInitializationError.',
          },
        ],
      },
    ],
  },
  {
    level: 12,
    day: 7,
    title: 'Level Up: Prisma + Express API',
    subtitle: 'A1 - A3: Central Error Mapping, Zod Validation & JWT Authentication',
    focus: 'Express + Prisma CRUD, Zod validation, JWT auth.',
    topics: [
      {
        id: 'a1',
        code: 'A1',
        level: 12,
        title: 'Prisma in Express: CRUD API with Error Mapping',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'My API crashes with a long Prisma error when I create a duplicate email!' },
          { speaker: 'pri', speech: 'Catch it in one error middleware. P2002 means duplicate, so reply 409.' },
          { speaker: 'bug', speech: 'Send the whole stack trace to the browser and hackers will thank you. Hehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Express is the receptionist and Prisma is the librarian. When a visitor requests a post that is missing, the receptionist gives a polite "404 Not Found", rather than handing over the librarian’s confusing internal database crash log. Central error mapping translates DB error codes into clean HTTP status codes.',
          danger: 'Never expose raw database errors or stack traces to clients in production! They reveal table structures, column names, and DB versions.',
        },
        detailedTheory:
          'Error Mapping Matrix:\n- P2002 (Unique constraint) -> 409 Conflict\n- P2025 (Record not found) -> 404 Not Found\n- P2003 (Foreign key failed) -> 400 Bad Request\n- ZodError -> 400 Bad Request with field error list\n- Other errors -> 500 Server error (logged to server console).\n\nIn Express 5, async errors automatically flow to the central error middleware.',
        codeLab: {
          title: 'Central Error Mapping Middleware (src/middleware/error.ts)',
          code: `import { Prisma } from "../../generated/prisma/client";

export function errorHandler(err: any, req: any, res: any, next: any) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Already exists" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    if (err.code === "P2003") {
      return res.status(400).json({ error: "Related record missing" });
    }
  }

  console.error(err);
  res.status(500).json({ error: "Server error" });
}`,
          explanation: 'Converts database constraint exceptions into clean HTTP responses.',
        },
        didYouKnow: 'Express 5 automatically forwards rejected Promises from async handlers to your error middleware.',
        memoryTrick: '2002 -> 409. 2025 -> 404. 2003 -> 400.',
        remember: [
          'One shared PrismaClient instance across all routes.',
          'findUnique returning null -> reply 404 yourself.',
          'P2002 -> 409, P2025 -> 404, P2003 -> 400.',
          'Never leak raw Prisma errors to HTTP clients.',
        ],
        mcqs: [
          {
            id: 'QA1.1',
            question: 'Which HTTP status code best matches Prisma error P2025 (record not found)?',
            options: ['400', '404', '409', '500'],
            answerIndex: 1,
            explanation: 'P2025 indicates a requested record is absent, mapping to 404 Not Found.',
          },
          {
            id: 'QA1.2',
            question: 'Where should you create the PrismaClient in an Express project?',
            options: ['Inside every route handler', 'Once in a shared module imported everywhere', 'In the browser', 'Inside error middleware'],
            answerIndex: 1,
            explanation: 'Create a single client in src/lib/prisma.ts and import it.',
          },
        ],
        codingQuest: {
          id: 'CA1.1',
          prompt: 'Write GET /posts/:id that returns the post or 404 JSON { error: "Post not found" }.',
          solution: `postsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});`,
          steps: ['Validate numeric id', 'findUnique', 'Check null and reply 404'],
        },
        mythTraps: [
          {
            id: 'MA1.1',
            statement: 'For debugging, I should return full Prisma error objects to API clients.',
            factCheck: 'Dangerous security risk! Stack traces and Prisma error messages reveal table names, SQL constraints, and system paths to attackers.',
          },
        ],
      },
      {
        id: 'a2',
        code: 'A2',
        level: 12,
        title: 'Validation with Zod and Pagination Endpoints',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'Someone sent title: 12345 and my database blew up!' },
          { speaker: 'pri', speech: 'Validate with Zod first. Bad data gets a 400 and never reaches Prisma.' },
          { speaker: 'bug', speech: 'Pass req.body straight into create() and I will add role: ADMIN. Hehehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Validation is the club bouncer checking IDs. Zod defines the rules ("title must be a string of at least 3 characters"). If a request fails, it is rejected with 400 Bad Request immediately and never touches your database.',
          danger: 'Mass assignment vulnerability: NEVER write data: req.body! An attacker could pass role: "ADMIN" or verified: true. Always pass parsed, validated fields.',
        },
        detailedTheory:
          'Zod patterns:\n- schema.safeParse(req.body) returns { success, data } or { success: false, error } without throwing.\n- z.coerce.number() safely converts query parameters from strings into numbers.\n- schema.partial() marks all fields optional (ideal for PATCH).\n- z.infer<typeof schema> derives TypeScript types automatically.',
        codeLab: {
          title: 'Zod Validator and Controller',
          code: `import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(120),
  content: z.string().optional(),
  authorId: z.number().int().positive()
});

export const updatePostSchema = createPostSchema.partial();
export type CreatePost = z.infer<typeof createPostSchema>;

// In route:
postsRouter.post("/", async (req, res) => {
  const r = createPostSchema.safeParse(req.body);
  if (!r.success) {
    return res.status(400).json({ errors: r.error.issues });
  }
  const post = await prisma.post.create({ data: r.data });
  res.status(201).json(post);
});`,
          explanation: 'Only validated fields in r.data are forwarded to prisma.create.',
        },
        didYouKnow: 'z.infer<typeof schema> generates full TypeScript types from runtime validation schemas with zero type duplication.',
        memoryTrick: 'Validate -> Pick -> Save.',
        remember: [
          'safeParse never throws.',
          'Use z.coerce for query parameters.',
          'Never pass raw req.body into Prisma mutations.',
          'Pagination metadata: page, limit, total, totalPages.',
        ],
        mcqs: [
          {
            id: 'QA2.1',
            question: 'What does schema.safeParse(data) return on invalid data?',
            options: ['Throws an exception', 'Returns { success: false, error }', 'Returns null', 'Fixes the data'],
            answerIndex: 1,
            explanation: 'safeParse never throws; it returns an object containing success: false and the error.',
          },
          {
            id: 'QA2.2',
            question: 'Why is prisma.user.create({ data: req.body }) dangerous?',
            options: ['It is slow', "A client could inject fields like role: 'ADMIN' (mass assignment)", 'Prisma forbids it', 'It deletes data'],
            answerIndex: 1,
            explanation: 'Mass assignment allows attackers to set administrative or sensitive fields.',
          },
        ],
        codingQuest: {
          id: 'CA2.1',
          prompt: 'Write a Zod schema for query params page (default 1, min 1) and limit (default 10, max 50) where values arrive as strings.',
          solution: `const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});`,
          steps: ['Use z.coerce.number()', 'Add .int().min(1)', 'Set defaults'],
        },
        mythTraps: [
          {
            id: 'MA2.1',
            statement: 'req.query values are numbers when I write ?page=2.',
            factCheck: 'All query string values arrive as strings. Use z.coerce.number() or Number() to parse them.',
          },
          {
            id: 'MA2.2',
            statement: 'TypeScript types already protect my server from bad request bodies.',
            factCheck: 'TypeScript types are erased during compilation. At runtime, clients can send any payload. Zod validation is mandatory.',
          },
        ],
      },
      {
        id: 'a3',
        code: 'A3',
        level: 12,
        title: 'Authentication: bcrypt and JWT',
        difficulty: 3,
        examWeight: 3,
        xp: 80,
        comicPanels: [
          { speaker: 'nova', speech: 'Can I just save the password in the database? It is easier.' },
          { speaker: 'pri', speech: 'NEVER! Save a bcrypt hash. Then give users a signed JWT after login.' },
          { speaker: 'bug', speech: 'Store plain passwords and I will leak them all. A delicious data breach!' },
        ],
        inSimpleWords: {
          comparison:
            'Passwords are never stored directly. Instead, you store a one-way fingerprint (hash). On login, you hash what the user typed and compare. After successful login, the server hands the user a signed wristband (JWT). At every protected door, the guard verifies the signature on the wristband.',
          danger: 'JWT payloads are only Base64 encoded, NOT encrypted! Anyone can decode them. Never store secrets or passwords inside a JWT payload.',
        },
        detailedTheory:
          'Security Flow:\n1. Registration: hash password with bcrypt.hash(password, 10), store passwordHash.\n2. Login: fetch user by email, verify with bcrypt.compare(plain, hash). If valid, sign JWT with jwt.sign({ sub: user.id, role }, SECRET, { expiresIn: "1h" }).\n3. requireAuth middleware: extracts Bearer token from Authorization header, verifies with jwt.verify(token, SECRET), attaches user to req.user.\n4. requireRole("ADMIN") middleware checks role authorization.',
        codeLab: {
          title: 'Auth Middleware and Role Guard',
          code: `import jwt from "jsonwebtoken";

export function requireAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export const requireRole = (role: string) => (req: any, res: any, next: any) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};`,
          explanation: '401 if unauthenticated (token missing/expired); 403 if role unauthorized.',
        },
        didYouKnow: 'A JWT consists of three base64url sections separated by dots: header.payload.signature.',
        memoryTrick: 'Hash to store, token to travel, 401 = who?, 403 = no.',
        remember: [
          'Hash with bcrypt, compare with bcrypt.compare.',
          'JWT is signed and readable, with an expiration time.',
          '401 = not logged in; 403 = insufficient permission.',
          'Keep JWT_SECRET in environment variables.',
        ],
        mcqs: [
          {
            id: 'QA3.1',
            question: 'The payload of a JWT is:',
            options: [
              'Encrypted and unreadable',
              'Base64 text that anyone can decode (signed, not encrypted)',
              'Stored in the database',
              'Always empty',
            ],
            answerIndex: 1,
            explanation: 'JWT payload is Base64 encoded; the signature guarantees it was not tampered with, but it is readable by anyone.',
          },
          {
            id: 'QA3.2',
            question: 'What does bcrypt.compare(plain, hash) do?',
            options: ['Decrypts the hash', 'Checks whether the plain password matches the stored hash', 'Creates a new hash', 'Signs a token'],
            answerIndex: 1,
            explanation: 'It hashes the plain input with the salt in the hash and compares the results.',
          },
        ],
        codingQuest: {
          id: 'CA3.1',
          prompt: 'Write requireRole(role) middleware that runs after requireAuth and replies 403 if req.user.role differs.',
          solution: `export const requireRole = (role: string) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};`,
          steps: ['Return a middleware function', 'Check req.user?.role', 'Reply 403 or call next()'],
        },
        mythTraps: [
          {
            id: 'MA3.1',
            statement: 'A JWT encrypts the data inside it, so I can put the user’s password in it.',
            factCheck: 'JWTs are signed, not encrypted. Any user or intermediary can decode the payload. Never store secrets inside JWTs.',
          },
          {
            id: 'MA3.2',
            statement: 'SHA-256 is fine for storing passwords.',
            factCheck: 'SHA-256 is designed to be fast, making it vulnerable to brute-force attacks. Passwords must use slow, salted algorithms like bcrypt or argon2.',
          },
        ],
      },
    ],
  },
  {
    level: 13,
    day: 8,
    title: 'Advanced Prisma Patterns',
    subtitle: 'A4 - A7: Client Extensions, Indexes, Concurrency Guarded Updates, Tests & Docker',
    focus: 'Extensions, indexes, guarded updates, tests, Docker.',
    topics: [
      {
        id: 'a4',
        code: 'A4',
        level: 13,
        title: 'Client Extensions, Soft Delete and Computed Fields',
        difficulty: 3,
        examWeight: 2,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'I want deleted posts to disappear but still be recoverable.' },
          { speaker: 'pri', speech: 'Use soft delete: add deletedAt and a query extension that filters it automatically.' },
          { speaker: 'bug', speech: 'Forget the filter in an include and deleted posts come back from the dead! Boo!' },
        ],
        inSimpleWords: {
          comparison:
            'Extensions are plug-ins for Prisma Client. You can add a new method (prisma.post.softDelete(id)), computed virtual fields (fullName), or automatic query filters. Soft delete is the recycle bin: rows are marked with deletedAt rather than destroyed.',
          danger: 'Query extensions run on top-level model queries; nested queries inside include bypass top-level query filters!',
        },
        detailedTheory:
          '$extends components:\n- model: custom helper methods (e.g. softDelete)\n- result: computed properties (e.g. fullName)\n- query: query lifecycle interception (e.g. automatically injecting deletedAt: null into where)\n- client: top-level client methods.\n\nSoft delete preserves audit history and enables un-delete.',
        codeLab: {
          title: 'Soft Delete and Computed Fields with $extends',
          code: `export const prisma = base.$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute: (u) => \`\${u.firstName} \${u.lastName}\`
      }
    }
  },
  query: {
    post: {
      async findMany({ args, query }) {
        args.where = { deletedAt: null, ...args.where };
        return query(args);
      }
    }
  },
  model: {
    post: {
      async softDelete(id: number) {
        return base.post.update({
          where: { id },
          data: { deletedAt: new Date() }
        });
      }
    }
  }
});`,
          explanation: 'Demonstrates result, query, and model extension hooks.',
        },
        didYouKnow: 'Client extensions replaced legacy middleware (prisma.$use), which has been deprecated and removed.',
        memoryTrick: 'Soft delete = recycle bin (deletedAt).',
        remember: [
          '$extends returns a NEW client instance.',
          'model = methods, result = computed fields, query = intercept.',
          'Nested include queries bypass top-level query extensions.',
        ],
        mcqs: [
          {
            id: 'QA4.1',
            question: 'Which $extends component adds a computed virtual field like fullName?',
            options: ['model', 'result', 'query', 'client'],
            answerIndex: 1,
            explanation: 'The result block defines computed properties based on model fields.',
          },
          {
            id: 'QA4.2',
            question: 'What does prisma.$extends({...}) return?',
            options: ['It mutates the original client', 'A new extended client', 'A Promise', 'Nothing'],
            answerIndex: 1,
            explanation: '$extends returns a new extended PrismaClient instance.',
          },
        ],
        codingQuest: {
          id: 'CA4.1',
          prompt: "Add a computed field displayName to User that returns name or 'Anonymous' when name is null.",
          solution: `export const prisma = base.$extends({
  result: {
    user: {
      displayName: {
        needs: { name: true },
        compute: (u) => u.name ?? "Anonymous",
      },
    },
  },
});`,
          steps: ['Use result block on user', 'Declare needs: { name: true }', 'Return u.name ?? "Anonymous"'],
        },
        mythTraps: [
          {
            id: 'MA4.1',
            statement: 'My soft-delete query extension also automatically filters deleted rows inside include.',
            factCheck: 'Top-level query extensions only intercept root queries. Nested includes bypass them; you must filter deletedAt: null explicitly inside include.',
          },
        ],
      },
      {
        id: 'a5',
        code: 'A5',
        level: 13,
        title: 'Performance: Indexes, N+1 and Connection Pooling',
        difficulty: 3,
        examWeight: 2,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'My posts page takes 5 seconds with 1 million rows!' },
          { speaker: 'pri', speech: 'Add @@index on the columns you filter and sort by. And stop the N+1 loop!' },
          { speaker: 'bug', speech: 'Index everything and I will slow your writes. Hehe, balance is key!' },
        ],
        inSimpleWords: {
          comparison:
            'A database without indexes is a book without a table of contents: to find a topic, you scan every page. An index is the table of contents: jump directly to the target row.',
          danger: 'PostgreSQL does NOT automatically index foreign keys! You must add @@index([authorId]) yourself to speed up joins and filters.',
        },
        detailedTheory:
          'Performance Checklist:\n1. Indexing: @@index([authorId, createdAt]). Left-most prefix rule applies: an index on (A, B) accelerates filters on (A) and (A, B), but NOT (B) alone.\n2. Avoid N+1: Use include or select with relationLoadStrategy: "join".\n3. Projection: select only needed fields.\n4. Deep pagination: use cursor pagination instead of high skip offsets.\n5. Connection pooling: use PgBouncer or Prisma Accelerate for serverless deployments.',
        codeLab: {
          title: 'Composite Index for Author Query Ordering',
          code: `model Post {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int
  createdAt DateTime @default(now())
  author    User     @relation(fields: [authorId], references: [id])

  @@index([authorId, createdAt]) // Accelerates author posts sorted by date
}`,
          explanation: 'Enables instant index scan for author posts ordered by timestamp.',
        },
        didYouKnow: 'PostgreSQL automatically creates indexes for @id and @unique, but NOT for foreign keys.',
        memoryTrick: 'WSJ: index Where, Sort, Join columns.',
        remember: [
          'Index columns used in WHERE, ORDER BY, and JOIN.',
          'PostgreSQL requires manual @@index on foreign keys.',
          'Left-most prefix rule governs composite indexes.',
          'Single shared client avoids connection pool exhaustion.',
        ],
        mcqs: [
          {
            id: 'QA5.1',
            question: 'Does PostgreSQL automatically create an index on a foreign key column?',
            options: ['Yes, always', 'No, add @@index yourself', 'Only for unique keys', 'Only on Prisma Postgres'],
            answerIndex: 1,
            explanation: 'Postgres only creates indexes for primary and unique keys; foreign keys must be indexed explicitly.',
          },
          {
            id: 'QA5.2',
            question: 'An index on [authorId, createdAt] helps a query that filters by:',
            options: ['createdAt only', 'authorId (alone or with createdAt)', 'title', 'nothing'],
            answerIndex: 1,
            explanation: 'The left-most prefix rule means authorId must be part of the filter condition.',
          },
        ],
        codingQuest: {
          id: 'CA5.1',
          prompt: "Add an index so 'latest posts of an author' (filter by authorId, order by createdAt) is fast.",
          solution: `model Post {
  // ... fields ...
  @@index([authorId, createdAt])
}`,
          steps: ['Add @@index([authorId, createdAt]) to Post model', 'Run migrate dev'],
        },
        mythTraps: [
          {
            id: 'MA5.1',
            statement: 'The more indexes I add, the faster everything gets.',
            factCheck: 'Indexes speed up reads but slow down INSERT, UPDATE, and DELETE operations while consuming disk space. Only index what you query.',
          },
        ],
      },
      {
        id: 'a6',
        code: 'A6',
        level: 13,
        title: 'Concurrency, Guarded Updates & Raw SQL',
        difficulty: 3,
        examWeight: 2,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'Two users bought the last item at the same time!' },
          { speaker: 'pri', speech: 'Make the stock check part of the update itself. updateMany with a guard, then check count.' },
          { speaker: 'bug', speech: 'Read first, update later? Then I slip between the two steps. Hehehe!' },
        ],
        inSimpleWords: {
          comparison:
            'Two cashiers sell the last concert ticket simultaneously because both checked the screen before either updated it. To prevent this race condition, combine the check and update into one atomic statement: update where stock >= qty decrementing stock. If the affected count is 0, reply 409 Sold Out.',
          danger: 'Never perform slow external HTTP calls or file uploads inside an interactive transaction! Transactions hold locks and connections.',
        },
        detailedTheory:
          'Concurrency techniques:\n1. Guarded Update (Pessimistic style): updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } }). If count === 0, abort with 409.\n2. Optimistic Concurrency: version Int column. where: { id, version }, data: { version: { increment: 1 } }.\n3. Interactive transactions with isolation levels: isolationLevel: Prisma.TransactionIsolationLevel.Serializable.\n4. Raw SQL: $queryRaw tagged template with parameterization.',
        codeLab: {
          title: 'Atomic Guarded Purchase Flow',
          code: `async function purchase(productId: number, qty: number) {
  return prisma.$transaction(async (tx) => {
    // Atomic check + update in ONE database operation
    const r = await tx.product.updateMany({
      where: { id: productId, stock: { gte: qty } },
      data: { stock: { decrement: qty } }
    });

    if (r.count === 0) {
      throw new Error("OUT_OF_STOCK"); // Triggers rollback!
    }

    return tx.order.create({
      data: { productId, qty }
    });
  });
}`,
          explanation: 'Guarantees the stock is decremented only if available; rollback if sold out.',
        },
        didYouKnow: 'updateMany returns { count: number } and allows filtering by non-unique fields like stock: { gte: qty }.',
        memoryTrick: 'Guard in the WHERE, count to check.',
        remember: [
          'Check + change in ONE atomic statement.',
          'updateMany returns { count }; 0 means condition failed.',
          'Keep transactions short; no network calls inside.',
          'Raw SQL only as tagged templates ($queryRaw).',
        ],
        mcqs: [
          {
            id: 'QA6.1',
            question: 'What is the safest way to avoid overselling the last item in inventory?',
            options: [
              'Read stock, check in JS, then update',
              'updateMany with where stock >= qty and check count',
              'setTimeout before update',
              'Two awaits in a row',
            ],
            answerIndex: 1,
            explanation: 'The check and decrement occur atomically in a single statement inside the database engine.',
          },
          {
            id: 'QA6.2',
            question: 'Why is $queryRaw with a tagged template safe against SQL injection?',
            options: ['It encrypts SQL', 'Interpolated values are sent as parameters, not pasted into the SQL string', 'It only allows SELECT', 'It is slower'],
            answerIndex: 1,
            explanation: 'Tagged templates treat interpolated values as bound query parameters.',
          },
        ],
        codingQuest: {
          id: 'CA6.1',
          prompt: 'Write purchase(productId, qty) that decrements stock only if sufficient, throwing OUT_OF_STOCK otherwise.',
          solution: `async function purchase(productId: number, qty: number) {
  const r = await prisma.product.updateMany({
    where: { id: productId, stock: { gte: qty } },
    data: { stock: { decrement: qty } }
  });
  if (r.count === 0) throw new Error("OUT_OF_STOCK");
}`,
          steps: ['updateMany with where: { id, stock: { gte: qty } }', 'decrement stock', 'Check count === 0'],
        },
        mythTraps: [
          {
            id: 'MA6.1',
            statement: 'A long interactive transaction containing external Stripe API calls is fine.',
            factCheck: 'Dangerous anti-pattern! It holds database connections and table locks open while waiting for third-party networks, causing connection starvation and timeouts.',
          },
        ],
      },
      {
        id: 'a7',
        code: 'A7',
        level: 13,
        title: 'Testing and Production Deployment',
        difficulty: 2,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'It works on my laptop but crashes on the server!' },
          { speaker: 'pri', speech: 'Run tests in CI, use migrate deploy on the server, and keep env values separate.' },
          { speaker: 'bug', speech: 'Run migrate dev in production and I will reset your database. Mwahaha!' },
        ],
        inSimpleWords: {
          comparison:
            'Testing is a robot that tests your API automatically before you ship. Deployment is moving your tested code to a 24/7 cloud server. Golden rule: laptop dev = migrate dev; production server = migrate deploy.',
          danger: 'Always implement graceful shutdown: listen for SIGTERM, close the HTTP server, and await prisma.$disconnect() before process exit.',
        },
        detailedTheory:
          'Production Architecture:\n- Separation: export app from app.ts; start listening in server.ts. This allows supertest to test the Express app in-memory without binding network ports.\n- Testing: run tests against an isolated test database (TEST_DATABASE_URL).\n- CI/CD sequence: npm ci -> npx prisma generate -> npm test -> npm run build -> npx prisma migrate deploy -> node dist/server.js.\n- Graceful shutdown handles SIGTERM and SIGINT cleanly.',
        codeLab: {
          title: 'Graceful Shutdown (server.ts)',
          code: `import { app } from "./app";
import { prisma } from "./lib/prisma";

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
  console.log(\`Listening on \${PORT}\`);
});

const shutdown = async () => {
  console.log("Shutting down cleanly...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);`,
          explanation: 'Closes HTTP server and cleanly disconnects Prisma connection pool.',
        },
        didYouKnow: 'supertest drives Express apps in memory via Node HTTP internals without needing to open network ports.',
        memoryTrick: 'Laptop dev, Server deploy.',
        remember: [
          'Export app separately from server.ts.',
          'Never test against production or dev databases.',
          'Servers and CI use prisma migrate deploy.',
          'Implement /health route and handle SIGTERM.',
        ],
        mcqs: [
          {
            id: 'QA7.1',
            question: 'Which Prisma command applies migrations on a production server or CI pipeline?',
            options: ['migrate dev', 'migrate reset', 'migrate deploy', 'db push'],
            answerIndex: 2,
            explanation: 'migrate deploy applies pending migrations safely without prompts or shadow DBs.',
          },
          {
            id: 'QA7.2',
            question: 'Why should you export app separately from app.listen()?',
            options: ['To make the server faster', 'So tests can drive the app without opening network ports', 'Express requires it', 'To avoid TypeScript errors'],
            answerIndex: 1,
            explanation: 'Separating app definition allows test frameworks like supertest to invoke handlers in memory.',
          },
        ],
        codingQuest: {
          id: 'CA7.1',
          prompt: 'Write graceful shutdown: on SIGTERM close the server, disconnect Prisma, and exit.',
          solution: `const server = app.listen(PORT);
process.on("SIGTERM", () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});`,
          steps: ['Store server instance', 'Attach SIGTERM listener', 'server.close', 'await prisma.$disconnect()'],
        },
        mythTraps: [
          {
            id: 'MA7.1',
            statement: 'I can run automated tests against my development database.',
            factCheck: 'Tests write and delete fixtures, which destroys development data. Always test against a dedicated test database.',
          },
        ],
      },
    ],
  },
  {
    level: 14,
    day: 9,
    title: 'Capstone Project',
    subtitle: 'A8: Full Production Blog API Blueprint',
    focus: 'Build the Blog API blueprint step by step: schema, CRUD, validation, auth, tests, deploy.',
    topics: [
      {
        id: 'a8',
        code: 'A8',
        level: 14,
        title: 'Capstone: Blog API Blueprint',
        difficulty: 3,
        examWeight: 3,
        xp: 70,
        comicPanels: [
          { speaker: 'nova', speech: 'I learned so many topics. How do I put them all together?' },
          { speaker: 'pri', speech: 'Build the Blog API step by step: schema, CRUD, validation, auth, tests, deploy.' },
          { speaker: 'bug', speech: 'Skip the tests and I will wait until demo day to appear. Muahaha!' },
        ],
        inSimpleWords: {
          comparison:
            'The capstone combines every single skill into one real, production-ready system: users (auth, roles), posts (CRUD, soft delete, pagination), comments (1-n), and categories (many-to-many). Build it in small verified steps.',
          danger: 'Keep layers separated: routes handle HTTP, services handle business logic and rules, Prisma handles data.',
        },
        detailedTheory:
          'The 13-Step Production Blueprint:\n1. Project setup & ES Modules\n2. schema.prisma with models + first migration\n3. Seed script with idempotent upsert\n4. Express app setup + /health route\n5. Posts CRUD API routes\n6. Zod validation schemas\n7. Central error middleware with Prisma error mapping\n8. User registration & login with bcrypt and JWT\n9. Comments (1-n) & Categories (m-n)\n10. Pagination and composite indexes\n11. Soft delete client extension\n12. Integration tests with Vitest and supertest\n13. Multi-stage Dockerfile and deployment.',
        codeLab: {
          title: 'Capstone Complete Schema (prisma/schema.prisma)',
          code: `model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String
  role         Role      @default(USER)
  posts        Post[]
  comments     Comment[]
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String
  content    String?
  deletedAt  DateTime?
  createdAt  DateTime   @default(now())
  authorId   Int
  author     User       @relation(fields: [authorId], references: [id])
  comments   Comment[]
  categories Category[]

  @@index([authorId, createdAt])
}

model Comment {
  id       Int    @id @default(autoincrement())
  text     String
  postId   Int
  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}`,
          explanation: 'Production schema with soft delete, cascading comments, and implicit m-n categories.',
        },
        didYouKnow: 'Many real-world production backends share this exact structural architecture.',
        memoryTrick: 'Small steps: Schema -> CRUD -> Validate -> Auth -> Test -> Deploy.',
        remember: [
          'Routes -> services -> Prisma architecture.',
          'Validate input, map errors, guard routes.',
          'Build and test iteratively in small increments.',
          'migrate dev locally, migrate deploy in production.',
        ],
        mcqs: [
          {
            id: 'QA8.1',
            question: "In the capstone, where should business rules like 'only the owner can edit a post' live?",
            options: ['Directly in the database', 'In a service/handler layer, separate from HTTP parsing', 'In the Prisma schema', 'In package.json'],
            answerIndex: 1,
            explanation: 'Business rules belong in the application service layer to keep routes thin and testable.',
          },
          {
            id: 'QA8.2',
            question: 'Which relation type is Post <-> Category in the capstone blueprint?',
            options: ['one-to-one', 'one-to-many', 'implicit many-to-many', 'self-relation'],
            answerIndex: 2,
            explanation: 'Both models have list fields (Category[] and Post[]), creating an implicit m-n relation.',
          },
        ],
        codingQuest: {
          id: 'CA8.1',
          prompt: 'Write the PATCH /posts/:id handler logic: only author or ADMIN may edit; 403 if unauthorized; 404 if missing.',
          solution: `postsRouter.patch("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: "Post not found" });

  const me = req.user;
  if (post.authorId !== Number(me.sub) && me.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const data = updatePostSchema.parse(req.body);
  const updated = await prisma.post.update({ where: { id }, data });
  res.json(updated);
});`,
          steps: ['findUnique post or 404', 'Check authorId === me.sub || me.role === "ADMIN"', 'Validate with Zod', 'Update and reply'],
        },
        mythTraps: [
          {
            id: 'MA8.1',
            statement: 'Putting all database and business logic directly inside route files is fine for large production projects.',
            factCheck: 'Mixing HTTP handling, validation, database access, and business rules inside routes makes testing and refactoring difficult. Separate into controllers, services, and repositories.',
          },
        ],
      },
    ],
  },
];

export const prismaBossChallenges: PrismaBossChallenge[] = [
  {
    id: 1,
    title: 'Boss 1: Explicit M-N Schema with Metadata',
    prompt: 'Schema: A Course has many Students and each Student has many Courses with an enrolledAt timestamp. Write the Prisma models.',
    solutionCode: `model Student {
  id          Int          @id @default(autoincrement())
  name        String
  enrollments Enrollment[]
}

model Course {
  id          Int          @id @default(autoincrement())
  title       String
  enrollments Enrollment[]
}

model Enrollment {
  studentId  Int
  courseId   Int
  enrolledAt DateTime @default(now())

  student    Student  @relation(fields: [studentId], references: [id])
  course     Course   @relation(fields: [courseId], references: [id])

  @@id([studentId, courseId])
}`,
    explanation: 'Uses an explicit join model Enrollment with composite primary key @@id([studentId, courseId]) and enrolledAt field.',
  },
  {
    id: 2,
    title: 'Boss 2: Paginated Query with Projection',
    prompt: "Return the 5 most recently created published posts with the author's name only, skipping the first 5.",
    solutionCode: `await prisma.post.findMany({
  where: { published: true },
  orderBy: { id: "desc" },
  skip: 5,
  take: 5,
  select: {
    title: true,
    author: { select: { name: true } }
  }
});`,
    explanation: 'Combines where, orderBy desc, skip 5, take 5, and nested select for author name.',
  },
  {
    id: 3,
    title: 'Boss 3: Aggregation & Having Filter',
    prompt: 'Count posts per author, filtering only authors with more than 3 posts, sorted by count descending.',
    solutionCode: `await prisma.post.groupBy({
  by: ["authorId"],
  _count: { _all: true },
  having: {
    authorId: { _count: { gt: 3 } }
  },
  orderBy: {
    _count: { authorId: "desc" }
  }
});`,
    explanation: 'groupBy by authorId with having condition on _count and orderBy descending.',
  },
  {
    id: 4,
    title: 'Boss 4: Atomic Two-Step Cascade Deletion',
    prompt: 'Delete a user and all their posts atomically when onDelete is NOT set to Cascade.',
    solutionCode: `await prisma.$transaction([
  prisma.post.deleteMany({ where: { authorId: 1 } }),
  prisma.user.delete({ where: { id: 1 } }),
]);`,
    explanation: 'Sequential array $transaction deletes child posts first, then the parent user in one atomic batch.',
  },
  {
    id: 5,
    title: 'Boss 5: Dev Schema Modification Cycle',
    prompt: 'Write the command sequence for: change schema, apply in dev, regenerate client, and reseed.',
    solutionCode: `npx prisma migrate dev --name <change_name>
npx prisma generate
npx prisma db seed`,
    explanation: 'In Prisma v7, migrate dev does not auto-generate or seed; run all three sequentially.',
  },
  {
    id: 6,
    title: 'Boss 6: Database Column Mapping without Breaking Code',
    prompt: 'Rename database column name to full_name without changing TypeScript client code.',
    solutionCode: `model User {
  id   Int    @id @default(autoincrement())
  name String @map("full_name")
}`,
    explanation: '@map("full_name") renames the DB column; TypeScript property remains name.',
  },
  {
    id: 7,
    title: 'Boss 7: Interactive Transaction with Invariant Guard',
    prompt: 'Transfer 50 from account 1 to account 2 and abort if balance falls below 0.',
    solutionCode: `await prisma.$transaction(async (tx) => {
  const from = await tx.account.update({
    where: { id: 1 },
    data: { balance: { decrement: 50 } }
  });

  if (from.balance < 0) {
    throw new Error("Insufficient balance"); // Auto rolls back!
  }

  await tx.account.update({
    where: { id: 2 },
    data: { balance: { increment: 50 } }
  });
});`,
    explanation: 'Interactive transaction uses tx client; throwing an error rolls back all updates.',
  },
  {
    id: 8,
    title: 'Boss 8: Express GET Handler with 404 Guard',
    prompt: 'Write an Express route GET /posts/:id using Prisma that replies 404 JSON { error: "Post not found" } when the post does not exist.',
    solutionCode: `app.get("/posts/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});`,
    explanation: 'Validates presence and returns 404 when findUnique yields null.',
  },
  {
    id: 9,
    title: 'Boss 9: Central Error Middleware Mapping',
    prompt: 'Write an error middleware that maps Prisma error codes P2002 to 409 and P2025 to 404.',
    solutionCode: `app.use((err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return res.status(409).json({ error: "Already exists" });
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
  }
  res.status(500).json({ error: "Server error" });
});`,
    explanation: 'Translates P2002 (duplicate) to 409 and P2025 (not found) to 404.',
  },
  {
    id: 10,
    title: 'Boss 10: Zod Validated POST Controller',
    prompt: 'Validate POST /posts with Zod (title min 3 chars, authorId int) and return 201 with created post.',
    solutionCode: `const schema = z.object({
  title: z.string().min(3),
  authorId: z.number().int()
});

app.post("/posts", async (req, res) => {
  const r = schema.safeParse(req.body);
  if (!r.success) return res.status(400).json({ errors: r.error.issues });
  const post = await prisma.post.create({ data: r.data });
  res.status(201).json(post);
});`,
    explanation: 'Rejects bad input with 400; persists validated data with 201 Created.',
  },
  {
    id: 11,
    title: 'Boss 11: Soft Delete Client Extension',
    prompt: 'Add soft delete: deletedAt field, softDelete(id) model method, and auto-filtering in findMany.',
    solutionCode: `// schema: deletedAt DateTime?
const prisma = base.$extends({
  query: {
    post: {
      async findMany({ args, query }) {
        args.where = { deletedAt: null, ...args.where };
        return query(args);
      }
    }
  },
  model: {
    post: {
      async softDelete(id: number) {
        return base.post.update({
          where: { id },
          data: { deletedAt: new Date() }
        });
      }
    }
  }
});`,
    explanation: 'Uses $extends query hook for auto-filtering and model hook for softDelete method.',
  },
];

export const prismaQuickFireQuestions: PrismaQuickFire[] = [
  { id: 'T1', statement: 'findUnique returns [] when nothing is found.', isTrue: false, reason: 'False: findUnique returns null (findMany returns []).' },
  { id: 'T2', statement: '@@map changes the model name used in prisma.<model>.', isTrue: false, reason: 'False: only the underlying database table name changes; client code keeps the Prisma name.' },
  { id: 'T3', statement: 'include and select can be mixed at the same level.', isTrue: false, reason: 'False: select and include are mutually exclusive at the same query level.' },
  { id: 'T4', statement: 'migrate deploy uses a shadow database.', isTrue: false, reason: 'False: migrate deploy applies pending migrations directly; only migrate dev uses the shadow DB.' },
  { id: 'T5', statement: 'In v7, migrate dev always runs your seed.', isTrue: false, reason: 'False: v7 removed automatic seed execution; run npx prisma db seed explicitly.' },
  { id: 'T6', statement: 'Implicit many-to-many tables can hold extra columns like assignedAt.', isTrue: false, reason: 'False: implicit join tables are locked to A/B columns; convert to explicit join model.' },
  { id: 'T7', statement: 'having runs before groupBy.', isTrue: false, reason: 'False: where filters rows before grouping; having filters groups after aggregation.' },
  { id: 'T8', statement: 'A 1-1 relation needs @unique on the foreign key.', isTrue: true, reason: 'True: @unique prevents multiple child records from referencing the same parent.' },
  { id: 'T9', statement: 'Prisma Studio edits create migrations.', isTrue: false, reason: 'False: Studio directly edits data rows; schema changes require schema.prisma edits and migrate.' },
  { id: 'T10', statement: 'Cursor pagination includes the cursor row unless you pass skip: 1.', isTrue: true, reason: 'True: cursor starts AT the given record, so skip: 1 is needed to advance past it.' },
  { id: 'T11', statement: 'Promise callbacks run before setTimeout(fn, 0) callbacks.', isTrue: true, reason: 'True: Promise callbacks are microtasks, which always drain before timer macrotasks.' },
  { id: 'T12', statement: 'res.json() may be called twice per request.', isTrue: false, reason: 'False: calling res.json() twice throws "Cannot set headers after they are sent".' },
  { id: 'T13', statement: 'Every value in process.env is a string.', isTrue: true, reason: 'True: environment variable values are always strings (or undefined).' },
  { id: 'T14', statement: '401 means the user is logged in but not allowed.', isTrue: false, reason: 'False: that is 403 Forbidden; 401 Unauthorized means the user is not authenticated.' },
  { id: 'T15', statement: 'Query extensions also filter nested include results.', isTrue: false, reason: 'False: top-level query extensions only intercept root queries; filter inside include manually.' },
];

export const prismaWordSearchGrid = [
  ['A', 'D', 'A', 'P', 'T', 'E', 'R', 'M', 'M', 'M', 'O', 'D', 'E', 'L', 'G', 'T'],
  ['F', 'H', 'H', 'E', 'Y', 'C', 'I', 'X', 'M', 'S', 'Q', 'D', 'R', 'I', 'F', 'T'],
  ['P', 'R', 'I', 'S', 'M', 'A', 'V', 'T', 'M', 'T', 'W', 'R', 'C', 'T', 'P', 'G'],
  ['N', 'S', 'X', 'T', 'M', 'S', 'R', 'G', 'I', 'U', 'Z', 'Z', 'S', 'E', 'E', 'D'],
  ['C', 'L', 'H', 'E', 'M', 'E', 'V', 'G', 'D', 'D', 'E', 'O', 'V', 'F', 'S', 'K'],
  ['C', 'L', 'H', 'A', 'S', 'W', 'E', 'Q', 'D', 'I', 'N', 'C', 'L', 'U', 'D', 'E'],
  ['V', 'C', 'I', 'P', 'D', 'S', 'Y', 'C', 'L', 'O', 'P', 'K', 'M', 'B', 'I', 'R'],
  ['S', 'A', 'U', 'E', 'I', 'O', 'E', 'N', 'E', 'G', 'L', 'R', 'C', 'O', 'C', 'Q'],
  ['G', 'T', 'O', 'M', 'N', 'T', 'W', 'B', 'W', 'L', 'E', 'G', 'W', 'F', 'A', 'X'],
  ['Z', 'O', 'O', 'T', 'A', 'T', 'F', 'Q', 'A', 'E', 'V', 'F', 'B', 'D', 'S', 'A'],
  ['F', 'R', 'P', 'R', 'V', 'N', 'C', 'N', 'R', 'X', 'S', 'U', 'C', 'E', 'C', 'J'],
  ['P', 'T', 'G', 'A', 'M', 'K', 'E', 'Q', 'E', 'P', 'M', 'E', 'G', 'Z', 'A', 'O'],
  ['B', 'I', 'U', 'G', 'C', 'U', 'R', 'S', 'O', 'R', 'O', 'I', 'L', 'R', 'D', 'M'],
  ['M', 'M', 'Y', 'U', 'N', 'I', 'Q', 'U', 'E', 'E', 'E', 'L', 'W', 'E', 'E', 'I'],
  ['P', 'B', 'E', 'X', 'W', 'T', 'Y', 'X', 'E', 'S', 'T', 'N', 'D', 'D', 'C', 'T'],
  ['R', 'E', 'L', 'A', 'T', 'I', 'O', 'N', 'D', 'S', 'E', 'J', 'F', 'F', 'N', 'T'],
];

export const prismaHiddenWords = [
  'PRISMA', 'MODEL', 'SCHEMA', 'MIGRATE', 'SEED', 'STUDIO', 'CLIENT',
  'ADAPTER', 'UPSERT', 'CASCADE', 'SELECT', 'INCLUDE', 'CURSOR', 'SHADOW',
  'DRIFT', 'UNIQUE', 'RELATION', 'OMIT', 'EXPRESS', 'MIDDLEWARE', 'PROMISE'
];

export const prismaMatchPairs: PrismaMatchPair[] = [
  { id: 1, term: 'Foreign key (FK)', definitionLetter: 'D', definition: 'A column that stores the primary key of a row in another table; it creates the link.' },
  { id: 2, term: 'Schema', definitionLetter: 'C', definition: 'The description of your tables. In Prisma it is the file schema.prisma.' },
  { id: 3, term: 'Migration', definitionLetter: 'A', definition: 'A saved change to the database structure, stored as an SQL file.' },
  { id: 4, term: 'Shadow database', definitionLetter: 'B', definition: 'A temporary database Prisma uses to work out what a new migration should contain.' },
  { id: 5, term: 'Drift', definitionLetter: 'I', definition: 'When the real database no longer matches the migration history.' },
  { id: 6, term: 'Seed', definitionLetter: 'H', definition: 'Starter data inserted by a script.' },
  { id: 7, term: 'Adapter (driver adapter)', definitionLetter: 'G', definition: 'A small package that lets Prisma Client talk to a specific database driver such as pg.' },
  { id: 8, term: 'Transaction', definitionLetter: 'F', definition: 'A group of steps that all succeed or all fail.' },
  { id: 9, term: 'N+1 problem', definitionLetter: 'E', definition: 'Doing 1 query plus 1 extra query per row; slow. Fix with include or select.' },
  { id: 10, term: 'Idempotent', definitionLetter: 'J', definition: 'Safe to run many times with the same result (like upsert).' },
];

export const prismaFlashcards: PrismaFlashcard[] = [
  { id: 'fc-1', topicCode: 'N1.1', question: 'What is the output order of: console.log(A); setTimeout(B,0); Promise.resolve(C); console.log(D)?', answer: 'A D C B (Sync code first, then microtask Promise, then timer callback).' },
  { id: 'fc-2', topicCode: 'N1.2', question: 'Which statement about Node.js runtime is true?', answer: 'It uses one main thread plus an event loop and non-blocking I/O.' },
  { id: 'fc-3', topicCode: 'N2.1', question: 'Which package.json setting enables ES Modules (import/export)?', answer: '"type": "module"' },
  { id: 'fc-4', topicCode: 'N2.2', question: 'Where does the prisma CLI package belong in package.json?', answer: 'devDependencies (it is a build/dev tool; runtime needs only @prisma/client).' },
  { id: 'fc-5', topicCode: 'N3.1', question: 'What does await actually pause?', answer: 'It pauses ONLY the current async function until the Promise settles. Other requests keep running.' },
  { id: 'fc-6', topicCode: 'N3.2', question: 'How do you run two independent Prisma queries at the same time?', answer: 'Promise.all([queryA, queryB])' },
  { id: 'fc-7', topicCode: 'N4.1', question: 'What type is process.env.PORT?', answer: 'string (or undefined). Always convert with Number() or parseInt().' },
  { id: 'fc-8', topicCode: 'N4.2', question: "Why use path.join('a', 'b') instead of string concatenation?", answer: 'It uses the correct path separator for the host operating system (\\ on Windows, / on Linux).' },
  { id: 'fc-9', topicCode: 'N5.1', question: 'In the route /users/:id, how do you access the id?', answer: 'req.params.id (as a string).' },
  { id: 'fc-10', topicCode: 'N5.2', question: 'Which middleware is required to read a JSON request body in Express?', answer: 'app.use(express.json())' },
  { id: 'fc-11', topicCode: 'N6.1', question: 'How does Express identify an error-handling middleware?', answer: 'By having exactly four parameters: (err, req, res, next).' },
  { id: 'fc-12', topicCode: 'N6.2', question: 'What does calling next(err) do?', answer: 'Bypasses remaining normal route middleware and jumps directly to the error handler.' },
  { id: 'fc-13', topicCode: 'N7.1', question: 'Which HTTP status code indicates a new resource was created?', answer: '201 Created' },
  { id: 'fc-14', topicCode: 'N7.2', question: 'A user who is not logged in attempts to call a protected route. What is the status code?', answer: '401 Unauthorized (403 Forbidden is when logged in but lacking role).' },
  { id: 'fc-15', topicCode: '1.1', question: 'What core problem does an ORM solve?', answer: 'The object-relational impedance mismatch between relational tables and code objects.' },
  { id: 'fc-16', topicCode: '1.2', question: 'Where is the single source of truth for your data model in Prisma?', answer: 'prisma/schema.prisma' },
  { id: 'fc-17', topicCode: '2.1', question: 'In Prisma v7, where does the CLI database connection URL live?', answer: 'prisma.config.ts (inside defineConfig({ datasource: { url: env("DATABASE_URL") } })).' },
  { id: 'fc-18', topicCode: '3a.1', question: 'Which command creates an SQL migration file AND applies it to your development database?', answer: 'npx prisma migrate dev' },
  { id: 'fc-19', topicCode: '3a.2', question: 'In v7 with provider = "prisma-client", where is the client import path determined?', answer: 'By the output field inside the generator client block.' },
  { id: 'fc-20', topicCode: '4a.1', question: 'What does name String? mean in Prisma schema?', answer: 'name is optional and nullable in the database.' },
  { id: 'fc-21', topicCode: '4a.2', question: 'Which attribute declares a composite primary key across two fields?', answer: '@@id([fieldA, fieldB])' },
  { id: 'fc-22', topicCode: '4a.3', question: 'How is @updatedAt applied?', answer: 'By Prisma Client whenever a record is updated through the client (NOT by a DB trigger).' },
  { id: 'fc-23', topicCode: '4b.1', question: 'In model Post, is author User an actual database column?', answer: 'No! It is a virtual relation field. Only the scalar foreign key authorId is a real column.' },
  { id: 'fc-24', topicCode: '4b.2', question: 'What is the default onDelete action for a required relation?', answer: 'Restrict (prevents parent deletion while child records exist).' },
  { id: 'fc-25', topicCode: '4c.1', question: 'What converts a 1-n relation into a 1-1 relation?', answer: 'Adding @unique to the foreign key field.' },
  { id: 'fc-26', topicCode: '4c.2', question: 'In a 1-1 relation, which side must be optional in the schema?', answer: 'The side without the foreign key (the back-relation, e.g. profile Profile?).' },
  { id: 'fc-27', topicCode: '4d.1', question: 'Where does the foreign key live in a 1-to-many relation?', answer: 'On the MANY side.' },
  { id: 'fc-28', topicCode: '4d.2', question: 'Can relation list fields be optional, like posts Post[]??', answer: 'Never! Lists in Prisma cannot be optional. An empty list [] represents no relations.' },
  { id: 'fc-29', topicCode: '4e.1', question: 'What is the name of the hidden join table created by an implicit m-n relation between Post and Category?', answer: '_CategoryToPost (alphabetical model names prefixed with an underscore).' },
  { id: 'fc-30', topicCode: '4e.2', question: 'When must you switch from implicit to explicit many-to-many?', answer: 'Whenever the relation needs extra columns (such as assignedAt, role, or score).' },
  { id: 'fc-31', topicCode: '4f.1', question: 'Why must self-relations define a relation name string in @relation("Name")?', answer: 'Because both fields point to the same model, so Prisma needs the name to pair them up.' },
  { id: 'fc-32', topicCode: '4f.2', question: 'In an employee manager-reports tree, what type must managerId be?', answer: 'Int? (optional), otherwise the top-level CEO could never be inserted.' },
  { id: 'fc-33', topicCode: '4g.1', question: 'What happens with a self-relation with onDelete: Cascade on SQL Server?', answer: 'SQL Server rejects it due to cyclic cascade paths. Use onDelete: NoAction.' },
  { id: 'fc-34', topicCode: '4h.1', question: 'Which attribute renames the table in the underlying database?', answer: '@@map("table_name") (one @ renames a column; two @@ renames a table).' },
  { id: 'fc-35', topicCode: '5a.1', question: 'What does prisma.user.update() do if the requested row does not exist?', answer: 'Throws a PrismaClientKnownRequestError with code P2025.' },
  { id: 'fc-36', topicCode: '5b.1', question: 'Can select and include be used together at the same level?', answer: 'No! They are mutually exclusive. Nest select inside include or relation select.' },
  { id: 'fc-37', topicCode: '5c.1', question: 'What does omit: { passwordHash: true } do?', answer: 'Hides passwordHash from the returned object; the column and its data remain in the database.' },
  { id: 'fc-38', topicCode: '5d.1', question: 'Does where: { posts: { every: { published: true } } } match users with zero posts?', answer: 'Yes! Vacuous truth: every condition is satisfied for empty collections.' },
  { id: 'fc-39', topicCode: '5f.1', question: 'Why do you include skip: 1 in cursor pagination queries?', answer: 'Because cursor includes the bookmark record itself, so skip: 1 advances to the next row.' },
  { id: 'fc-40', topicCode: '10c.1', question: 'Inside prisma.$transaction(async (tx) => ...), which client must you call?', answer: 'tx! Queries on prisma run outside the transaction and will not roll back on error.' },
  { id: 'fc-41', topicCode: '10d.1', question: 'What does error code P2002 mean?', answer: 'Unique constraint failed (e.g. attempting to insert a duplicate email).' },
  { id: 'fc-42', topicCode: 'A6.1', question: 'How do you prevent two customers from buying the last item at the exact same moment?', answer: 'Guarded update: updateMany where id and stock >= qty, decrement stock, and verify count === 1.' },
  { id: 'fc-43', topicCode: 'A7.1', question: 'Which command applies pending migrations in production or CI/CD?', answer: 'npx prisma migrate deploy' },
];

export const prismaPosters: PrismaPosterTable[] = [
  {
    id: 'poster-1',
    title: 'POSTER 1: RELATIONS AT A GLANCE',
    subtitle: 'Where the keys live, special rules, and example schema syntax',
    headers: ['Type', 'Where is the key?', 'Special trick', 'Example line'],
    rows: [
      ['One-to-one', 'FK side, with @unique', 'Back side must be optional', 'profile Profile?'],
      ['One-to-many', 'On the "many" side', 'List field Post[] is never optional', 'posts Post[]'],
      ['Many-to-many (implicit)', 'Hidden table _AToB (cols A, B)', 'Both sides are lists. No extra columns', 'categories Category[]'],
      ['Many-to-many (explicit)', 'Your own join model', '@@id([aId, bId]) and extra fields', 'categories CategoriesOnPosts[]'],
      ['Self-relation', 'Same model, FK optional', 'Relation name is required', 'manager User? @relation("Reports", ...)'],
    ],
  },
  {
    id: 'poster-2',
    title: 'POSTER 2: ERROR CODE DECODER',
    subtitle: 'Common Prisma runtime errors, what they mean, and why they happen',
    headers: ['Code', 'Plain meaning', 'Typical cause'],
    rows: [
      ['P2002', 'Duplicate value in a unique field', 'Creating a user with an email that already exists'],
      ['P2025', 'Record needed but not found', 'update / delete / findUniqueOrThrow on a missing row'],
      ['P2003', 'Foreign key constraint failed', 'Pointing to a parent row that does not exist'],
      ['P2000', 'Value too long for the column', 'Text longer than the database column character limit'],
      ['P2014', 'Change would break a required relation', 'Removing a link that a child record must have'],
      ['P1001', 'Cannot reach the database server', 'Wrong DATABASE_URL, database down, network or firewall issue'],
    ],
  },
  {
    id: 'poster-3',
    title: 'POSTER 3: COMMAND CHEAT SHEET',
    subtitle: 'All daily and deployment Prisma CLI commands',
    headers: ['Task', 'Command'],
    rows: [
      ['Create project config', 'npx prisma init --datasource-provider postgresql --output ../generated/prisma'],
      ['Create + apply migration (dev)', 'npx prisma migrate dev --name <name>'],
      ['Create SQL only', 'npx prisma migrate dev --create-only --name <name>'],
      ['Apply migrations (prod/CI)', 'npx prisma migrate deploy'],
      ['Reset dev DB', 'npx prisma migrate reset'],
      ['Migration status', 'npx prisma migrate status'],
      ['Prototype without history', 'npx prisma db push'],
      ['Introspect DB', 'npx prisma db pull'],
      ['Generate client', 'npx prisma generate'],
      ['Seed database', 'npx prisma db seed'],
      ['Open Studio GUI', 'npx prisma studio (serves on localhost:5555)'],
      ['Format / validate schema', 'npx prisma format / npx prisma validate'],
    ],
  },
];
