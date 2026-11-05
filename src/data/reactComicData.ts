import { WebDevBook } from '../types/webDevComicTypes';

export const reactComicData: WebDevBook = {
  id: 'react',
  title: 'React: Build UI with Components',
  badge: 'Comic Classic',
  color: '#06B6D4',
  accentBg: 'bg-cyan-500/10',
  accentBorder: 'border-cyan-500',
  tagline: 'JSX, props, state, hooks and real-world patterns',
  description: 'UI as a function of data: UI = f(state). Master modern React 18/19, JSX rules, props flow, useState immutability, controlled forms, useEffect lifecycle, custom hooks, context, reducer, and 20 classic React problems.',
  gangNotes: {
    tuple: 'React lets you describe the UI as a function of data: UI = f(state). Change the data and React updates the screen.',
    sam: 'I ask the "dumb" questions so you don’t have to. They are never dumb!',
    nully: 'I am undefined: the state before the data arrived, the prop you forgot to pass...',
    bugsy: 'Mutating state, missing keys, infinite useEffect loops, stale closures: my favourite meals!'
  },
  chapters: [
    {
      id: 1,
      title: 'Setup, JSX & Components',
      subtitle: 'Your first modern React app and JSX syntax rules',
      sections: [
        {
          heading: '1.1 Why React and Getting Started',
          codeSnippet: {
            language: 'bash',
            code: `npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev # opens http://localhost:5173`
          },
          explanation: [
            'React is a declarative library for building user interfaces from reusable, encapsulated components.',
            'Declarative means you describe what the UI should look like for the current state, and React handles the DOM tree mutations.'
          ]
        },
        {
          heading: '1.2 JSX Rules & Differences from HTML',
          codeSnippet: {
            language: 'jsx',
            code: `function Card() {
  const name = 'Asha', items = 3
  return (
    <> {/* Fragment: one parent root required, no extra DOM node */}
      <h2 className="title">Hi, {name.toUpperCase()}!</h2> {/* class -> className */}
      <img src="a.jpg" alt="Avatar" /> {/* self-closing tag required */}
      <p style={{ color: 'tomato', fontSize: 18 }}>{items * 2} items</p>
      <label htmlFor="email">Email</label> {/* for -> htmlFor */}
      <button onClick={() => alert('Hi')}>Click</button> {/* camelCase event */}
    </>
  )
}`
          },
          explanation: [
            'HTML class becomes className, for becomes htmlFor.',
            'Single root required: wrap sibling elements in a Fragment (<>...</>).',
            'style prop accepts a JavaScript object with camelCase properties: {{ color: "tomato", fontSize: 18 }}.',
            'Event handlers take functions, not strings: onClick={() => ...}.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c1-q1',
          question: 'React is mainly for...',
          options: [
            { label: 'A', text: 'databases' },
            { label: 'B', text: 'building UIs' },
            { label: 'C', text: 'styling only' },
            { label: 'D', text: 'servers only' }
          ],
          correct: 'B',
          explanation: 'React is a client-side declarative UI library.'
        },
        {
          id: 'react-c1-q2',
          question: 'JSX must return...',
          options: [
            { label: 'A', text: 'multiple siblings without a parent' },
            { label: 'B', text: 'a single root (or fragment)' },
            { label: 'C', text: 'only strings' },
            { label: 'D', text: 'a promise' }
          ],
          correct: 'B',
          explanation: 'Wrap sibling elements in a parent node or React Fragment.'
        },
        {
          id: 'react-c1-q3',
          question: 'To use a JS expression inside JSX:',
          options: [
            { label: 'A', text: '(( ))' },
            { label: 'B', text: '{ }' },
            { label: 'C', text: '${ }' },
            { label: 'D', text: '<% %>' }
          ],
          correct: 'B',
          explanation: 'Curly braces {} evaluate JavaScript inside JSX.'
        }
      ],
      codeLab: {
        task: 'Create a Greeting component that shows "Hello, World" in an h1 with a red colour.',
        solution: `export default function Greeting() {
  return <h1 style={{ color: 'red' }}>Hello, World</h1>
}`,
        note: 'Component names must start with a capital letter.'
      },
      misunderstandings: [
        { myth: 'JSX is just HTML in JavaScript.', truth: 'JSX is syntactic sugar that compiles to React.createElement() JavaScript function calls.' }
      ]
    },
    {
      id: 2,
      title: 'Props & Component Composition',
      subtitle: 'Passing data down from parents to children',
      sections: [
        {
          heading: '2.1 Props and children',
          codeSnippet: {
            language: 'jsx',
            code: `function Avatar({ src, name, size = 48 }) { // destructuring + default value
  return <img src={src} alt={name} width={size} height={size} />
}

function Card({ title, children }) { // children = nested JSX
  return <section className="card"><h2>{title}</h2>{children}</section>
}

export default function App() {
  return (
    <Card title="Team">
      <Avatar src="a.jpg" name="Asha" />
      <Avatar src="r.jpg" name="Ravi" size={64} />
    </Card>
  )
}`
          },
          explanation: [
            'Props flow DOWN, events flow UP. Props are strictly read-only: components must never modify incoming props directly.',
            'children prop contains whatever nested JSX is placed between the opening and closing component tags.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c2-q1',
          question: 'Props are...',
          options: [
            { label: 'A', text: 'mutable local data' },
            { label: 'B', text: 'read-only inputs from a parent' },
            { label: 'C', text: 'global variables' },
            { label: 'D', text: 'state' }
          ],
          correct: 'B',
          explanation: 'Props are immutable inputs passed down from parent components.'
        },
        {
          id: 'react-c2-q2',
          question: 'Component names must start with...',
          options: [
            { label: 'A', text: 'lowercase' },
            { label: 'B', text: 'uppercase' },
            { label: 'C', text: 'underscore' },
            { label: 'D', text: 'digit' }
          ],
          correct: 'B',
          explanation: 'Lowercase names are treated as native HTML tags; uppercase denotes React components.'
        }
      ],
      codeLab: {
        task: 'Create a Badge that shows text and a colour prop (default "gray").',
        solution: `function Badge({ text, color = 'gray' }) {
  return <span style={{ background: color, padding: '2px 8px', borderRadius: 8 }}>{text}</span>
}`,
        note: 'Default prop parameters keep call sites concise.'
      }
    },
    {
      id: 3,
      title: 'State & Events',
      subtitle: 'Making the UI interactive with useState and immutability',
      sections: [
        {
          heading: '3.1 useState & Immutable Updates',
          codeSnippet: {
            language: 'jsx',
            code: `import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)}>-1</button> {/* updater fn */}
    </div>
  )
}

// IMMUTABLE UPDATES: Never mutate directly!
const [user, setUser] = useState({ name: 'Asha', age: 20 })
setUser({ ...user, age: 21 }) // copy + override

const [todos, setTodos] = useState([])
setTodos([...todos, { id: 1, text: 'Learn' }]) // add
setTodos(todos.filter(t => t.id !== 1))         // remove
setTodos(todos.map(t => t.id === 1 ? { ...t, done: !t.done } : t)) // update`
          },
          explanation: [
            'Never mutate state directly (e.g. todos.push() or user.age = 21). React compares object references; mutating the existing reference prevents re-rendering.',
            'State updates are asynchronous/batched: use setCount(c => c + 1) when the new value depends on the previous state.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c3-q1',
          question: 'Calling the setState setter...',
          options: [
            { label: 'A', text: 'changes the variable immediately' },
            { label: 'B', text: 'schedules a re-render with the new value' },
            { label: 'C', text: 'reloads the page' },
            { label: 'D', text: 'does nothing' }
          ],
          correct: 'B',
          explanation: 'State updates schedule re-renders asynchronously.'
        },
        {
          id: 'react-c3-q2',
          question: 'Correct way to add an item to array state:',
          options: [
            { label: 'A', text: 'todos.push(x)' },
            { label: 'B', text: 'setTodos([...todos, x])' },
            { label: 'C', text: 'todos = [...todos, x]' },
            { label: 'D', text: 'todos.add(x)' }
          ],
          correct: 'B',
          explanation: 'Create a new array reference via spread syntax.'
        }
      ],
      codeLab: {
        task: 'A toggle button that shows ON / OFF.',
        solution: `function Toggle() {
  const [on, setOn] = useState(false)
  return <button onClick={() => setOn(!on)}>{on ? 'ON' : 'OFF'}</button>
}`,
        note: 'Boolean state toggle combined with a ternary expression.'
      },
      misunderstandings: [
        { myth: 'setState changes the variable value immediately in the current line.', truth: 'The new value appears on the next render pass.' },
        { myth: 'Every single variable in a component should be state.', truth: 'Only store data that changes over time AND directly determines UI output.' }
      ]
    },
    {
      id: 4,
      title: 'Lists, Conditions & Controlled Forms',
      subtitle: 'Rendering dynamic collections and bidirectional input bindings',
      sections: [
        {
          heading: '4.1 Conditional Rendering & Lists',
          codeSnippet: {
            language: 'jsx',
            code: `{isLoggedIn ? <Dashboard /> : <Login />} // ternary
{unread > 0 && <Badge count={unread} />}   // beware: 0 && ... prints "0" in UI!
if (loading) return <Spinner />            // early return

<ul>
  {todos.map(todo => (
    <li key={todo.id}>{todo.text}</li> /* key: stable unique ID, NOT array index */
  ))}
</ul>`
          },
          explanation: [
            'Keys must be stable, unique identifiers (e.g. database ID). Using array index as key leads to nasty state bugs when items are reordered or removed.',
            'Watch out for numbers in &&: {count && <Comp />} will render "0" when count is 0. Use {count > 0 && <Comp />} instead.'
          ]
        },
        {
          heading: '4.2 Controlled Form Inputs',
          codeSnippet: {
            language: 'jsx',
            code: `function SignUp() {
  const [form, setForm] = useState({ name: '', email: '' })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); console.log(form) }
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} type="email" />
      <button type="submit" disabled={!form.name || !form.email}>Join</button>
    </form>
  )
}`
          },
          explanation: [
            'In a controlled input, React state is the single source of truth: value={state} + onChange={setter}.',
            'Always call e.preventDefault() in form onSubmit handlers to prevent the default browser page reload.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c4-q1',
          question: 'Why does a list need key?',
          options: [
            { label: 'A', text: 'styling' },
            { label: 'B', text: 'help React track items between renders' },
            { label: 'C', text: 'sorting' },
            { label: 'D', text: 'SEO' }
          ],
          correct: 'B',
          explanation: 'Keys allow React’s reconciliation engine to identify which items changed, moved, or were deleted.'
        },
        {
          id: 'react-c4-q2',
          question: '{count && <X />} with count = 0 renders...',
          options: [
            { label: 'A', text: 'nothing' },
            { label: 'B', text: '0' },
            { label: 'C', text: 'X' },
            { label: 'D', text: 'error' }
          ],
          correct: 'B',
          explanation: '0 is a falsy number in JS that React renders literally to the DOM.'
        }
      ],
      codeLab: {
        task: 'Build a todo app: add, toggle done, delete.',
        solution: `function Todos() {
  const [todos, setTodos] = useState([]), [text, setText] = useState('')
  const add = e => {
    e.preventDefault(); if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text, done: false }]); setText('')
  }
  const toggle = id => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = id => setTodos(todos.filter(t => t.id !== id))
  return (<>
    <form onSubmit={add}><input value={text} onChange={e => setText(e.target.value)} /><button>Add</button></form>
    <ul>{todos.map(t => <li key={t.id}>
      <span onClick={() => toggle(t.id)} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
      <button onClick={() => remove(t.id)}>x</button>
    </li>)}</ul>
  </>)
}`,
        note: 'Combines state, list mapping, keys, immutable updates, and a controlled input.'
      }
    },
    {
      id: 5,
      title: 'Effects & Data Fetching',
      subtitle: 'Talking to the outside world with useEffect',
      sections: [
        {
          heading: '5.1 useEffect & the Fetch Pattern',
          codeSnippet: {
            language: 'jsx',
            code: `// runs when count changes
useEffect(() => { document.title = \`Count \${count}\` }, [count])

// runs ONCE on mount
useEffect(() => {
  const ctrl = new AbortController()
  fetch('/api/users', { signal: ctrl.signal })
    .then(r => r.json())
    .then(setUsers)
    .catch(e => { if (e.name !== 'AbortError') setError(e.message) })
  return () => ctrl.abort() // CLEANUP: cancels fetch on unmount
}, [])`
          },
          explanation: [
            'Dependency array controls execution: [] runs on mount, [dep] runs when dep changes, omitted runs after EVERY render.',
            'Missing dependency array + setState = catastrophic infinite render loop!',
            'Returned function is the cleanup phase: runs before re-running effect and when unmounting.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c5-q1',
          question: 'useEffect(fn, []) runs...',
          options: [
            { label: 'A', text: 'every render' },
            { label: 'B', text: 'once after first render (mount)' },
            { label: 'C', text: 'never' },
            { label: 'D', text: 'before render' }
          ],
          correct: 'B',
          explanation: 'Empty dependency array runs exclusively after the initial mount.'
        },
        {
          id: 'react-c5-q2',
          question: 'What does the cleanup function returned in useEffect do?',
          options: [
            { label: 'A', text: 'runs after every render' },
            { label: 'B', text: 'runs before re-run and on unmount' },
            { label: 'C', text: 'handles errors' },
            { label: 'D', text: 'is ignored' }
          ],
          correct: 'B',
          explanation: 'Tears down subscriptions, timers, or aborts in-flight network requests.'
        }
      ],
      codeLab: {
        task: 'Fetch a post by id prop and re-fetch when id changes.',
        solution: `useEffect(() => {
  fetch(\`/api/posts/\${id}\`).then(r => r.json()).then(setPost)
}, [id])`,
        note: 'id must be included in the dependency array.'
      }
    },
    {
      id: 6,
      title: 'Refs, Context, Reducer & Custom Hooks',
      subtitle: 'Sharing state and organizing complex business logic',
      sections: [
        {
          heading: '6.1 useRef, useContext & useReducer',
          codeSnippet: {
            language: 'jsx',
            code: `// useRef: mutable container that DOES NOT trigger re-renders
const inputRef = useRef(null)
useEffect(() => inputRef.current.focus(), [])

// useContext: avoid prop-drilling for global data (theme, auth)
const ThemeContext = createContext('light')
function App() { return <ThemeContext.Provider value="dark"><Page /></ThemeContext.Provider> }
function Button() { const theme = useContext(ThemeContext); return <button className={theme}>Hi</button> }

// useReducer: centralized state transitions
function reducer(state, action) {
  switch (action.type) {
    case 'add': return [...state, action.todo]
    case 'remove': return state.filter(t => t.id !== action.id)
    default: return state
  }
}
const [todos, dispatch] = useReducer(reducer, [])`
          },
          explanation: [
            'useRef is for direct DOM node access or persisting values without triggering a re-render.',
            'useContext shares data globally down the component subtree without manual prop drilling.',
            'useReducer centralizes complex multi-step state transitions.'
          ]
        },
        {
          heading: '6.2 Custom Hooks',
          codeSnippet: {
            language: 'jsx',
            code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial }
    catch { return initial }
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])
  return [value, setValue]
}

// Usage:
const [theme, setTheme] = useLocalStorage('theme', 'light')`
          },
          explanation: [
            'Custom hooks are functions starting with "use" that compose built-in hooks to share stateful logic.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c6-q1',
          question: 'Changing ref.current causes a re-render?',
          options: [
            { label: 'A', text: 'yes' },
            { label: 'B', text: 'no' },
            { label: 'C', text: 'only for DOM refs' },
            { label: 'D', text: 'sometimes' }
          ],
          correct: 'B',
          explanation: 'Refs are plain mutable containers; mutations never trigger render passes.'
        },
        {
          id: 'react-c6-q2',
          question: 'Custom hook names must start with...',
          options: [
            { label: 'A', text: 'hook' },
            { label: 'B', text: 'use' },
            { label: 'C', text: 'get' },
            { label: 'D', text: 'my' }
          ],
          correct: 'B',
          explanation: 'The "use" prefix allows the linter to enforce Rules of Hooks.'
        }
      ],
      misunderstandings: [
        { myth: 'Context replaces external state managers for all data.', truth: 'Context re-renders all consumers on every change; keep it for low-frequency global settings like theme or auth.' }
      ]
    },
    {
      id: 7,
      title: 'Patterns, Performance & Routing',
      subtitle: 'Lifting state up, React.memo, useMemo, useCallback and React Router',
      sections: [
        {
          heading: '7.1 Lifting State & Client-Side Routing',
          codeSnippet: {
            language: 'jsx',
            code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

function Product() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}

<BrowserRouter>
  <nav><Link to="/">Home</Link> <Link to="/products/7">Item 7</Link></nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products/:id" element={<Product />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>`
          },
          explanation: [
            'Lift state up: when sibling components need to synchronize, move the shared state to their closest common parent.',
            '<Link> navigates client-side without browser page reload, maintaining JavaScript memory state.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'react-c7-q1',
          question: 'Two sibling components need the same data. You...',
          options: [
            { label: 'A', text: 'duplicate it' },
            { label: 'B', text: 'lift state up to their parent' },
            { label: 'C', text: 'use globals' },
            { label: 'D', text: 'use refs' }
          ],
          correct: 'B',
          explanation: 'Lifting state up ensures a single source of truth.'
        },
        {
          id: 'react-c7-q2',
          question: '<Link> vs <a> in React:',
          options: [
            { label: 'A', text: 'identical behavior' },
            { label: 'B', text: 'Link navigates without a full browser reload' },
            { label: 'C', text: 'a is faster' },
            { label: 'D', text: 'Link is for emails' }
          ],
          correct: 'B',
          explanation: 'Link updates the URL via HTML5 History API without triggering a full page reload.'
        }
      ]
    }
  ],
  problems20: [
    { id: 1, title: 'Greeting Component with Prop', problem: 'Component showing a name prop.', solution: 'const Hi = ({ name }) => <h1>Hello {name}</h1>' },
    { id: 2, title: 'Counter with Reset', problem: 'Counter component with +, -, and reset buttons.', solution: 'const [n, setN] = useState(0)\n<button onClick={() => setN(0)}>reset</button>' },
    { id: 3, title: 'Toggle Visibility', problem: 'Toggle show/hide paragraph with boolean state.', solution: 'const [open, setOpen] = useState(false)\n<button onClick={() => setOpen(o => !o)}>Toggle</button>{open && <p>Hidden text</p>}' },
    { id: 4, title: 'Render Array of Names', problem: 'Render an array of names in an unordered list with keys.', solution: '{names.map(n => <li key={n}>{n}</li>)}' },
    { id: 5, title: 'Controlled Text Input Echo', problem: 'Controlled text input echoing value into a paragraph.', solution: 'const [t, setT] = useState("")\n<input value={t} onChange={e => setT(e.target.value)} /><p>{t}</p>' },
    { id: 6, title: 'Textarea Character Counter', problem: 'Textarea character counter with 100 character maximum.', solution: '<textarea maxLength={100} value={t} onChange={e => setT(e.target.value)} /><small>{t.length}/100</small>' },
    { id: 7, title: 'Filter List by Search Query', problem: 'Filter list items by case-insensitive search text.', solution: 'const shown = items.filter(i => i.toLowerCase().includes(q.toLowerCase()))' },
    { id: 8, title: 'Sort Array Without Mutating', problem: 'Sort an array of products by price without mutating original state.', solution: 'const sorted = [...items].sort((a, b) => a.price - b.price)' },
    { id: 9, title: 'Delete Item by ID', problem: 'Delete item from state array by id.', solution: 'setItems(items.filter(i => i.id !== id))' },
    { id: 10, title: 'Loading, Error, Data Pattern', problem: 'Handle loading spinner, error message, and data list.', solution: 'if (loading) return <Spinner />\nif (error) return <Err msg={error} />\nreturn <List data={data} />' },
    { id: 11, title: 'Seconds Timer Interval', problem: 'Timer interval counting seconds with cleanup.', solution: 'useEffect(() => { const id = setInterval(() => setS(s => s + 1), 1000); return () => clearInterval(id) }, [])' },
    { id: 12, title: 'Fetch on Component Mount', problem: 'Fetch data on component mount and update state.', solution: 'useEffect(() => { fetch(url).then(r => r.json()).then(setData) }, [])' },
    { id: 13, title: 'Auto-Focus Input on Mount', problem: 'Focus input element on mount using useRef.', solution: 'const r = useRef(); useEffect(() => r.current.focus(), []); <input ref={r} />' },
    { id: 14, title: 'Theme Context Toggle', problem: 'Create and consume ThemeContext toggle.', solution: 'const ThemeCtx = createContext(); // provider holds [theme, setTheme], consumers call useContext(ThemeCtx)' },
    { id: 15, title: 'Custom useDebounce Hook', problem: 'Debounce search query using custom hook and timer.', solution: 'function useDebounce(v, ms) { const [d, setD] = useState(v)\n  useEffect(() => { const id = setTimeout(() => setD(v), ms); return () => clearTimeout(id) }, [v, ms]); return d }' },
    { id: 16, title: 'Custom useWindowWidth Hook', problem: 'Track window resize dynamically in a custom hook.', solution: 'function useWidth(){ const [w,setW]=useState(innerWidth); useEffect(()=>{ const f=()=>setW(innerWidth); addEventListener("resize",f); return ()=>removeEventListener("resize",f)},[]); return w }' },
    { id: 17, title: 'Conditional CSS ClassName', problem: 'Apply conditional "done" CSS class based on boolean prop.', solution: '<li className={done ? "done" : ""}>' },
    { id: 18, title: 'Prevent Form Reload', problem: 'Prevent default browser form submission reload.', solution: 'const onSubmit = e => { e.preventDefault(); /* use state */ }' },
    { id: 19, title: 'Lift State to Common Parent', problem: 'Two input components sharing state via common parent.', solution: 'function Parent(){ const [v,setV]=useState(""); return <><In v={v} set={setV}/><In v={v} set={setV}/></> }' },
    { id: 20, title: 'Persistent List in localStorage', problem: 'Keep list state synchronized with localStorage.', solution: 'const [list, setList] = useLocalStorage("list", [])' }
  ],
  finalBoss: [
    {
      id: 1,
      question: 'Which React hook holds state?',
      options: [{ label: 'A', text: 'useState' }, { label: 'B', text: 'useRef' }, { label: 'C', text: 'useMemo' }, { label: 'D', text: 'useId' }],
      correct: 'A',
      explanation: 'useState preserves local state across renders.'
    },
    {
      id: 2,
      question: 'JSX attribute for CSS classes:',
      options: [{ label: 'A', text: 'class' }, { label: 'B', text: 'className' }, { label: 'C', text: 'cssClass' }, { label: 'D', text: 'klass' }],
      correct: 'B',
      explanation: 'className is used because "class" is a reserved JavaScript keyword.'
    },
    {
      id: 3,
      question: 'In standard React architecture, props flow...',
      options: [{ label: 'A', text: 'up' }, { label: 'B', text: 'down' }, { label: 'C', text: 'sideways' }, { label: 'D', text: 'nowhere' }],
      correct: 'B',
      explanation: 'Unidirectional data flow: props flow downward from parent to child.'
    },
    {
      id: 4,
      question: 'useEffect with dependency array [] runs...',
      options: [{ label: 'A', text: 'every render' }, { label: 'B', text: 'on mount only' }, { label: 'C', text: 'never' }, { label: 'D', text: 'on unmount only' }],
      correct: 'B',
      explanation: 'Empty array executes once on mount.'
    },
    {
      id: 5,
      question: 'Updating state based on previous value safely:',
      options: [{ label: 'A', text: 'setX(x+1) always' }, { label: 'B', text: 'setX(prev => prev+1)' }, { label: 'C', text: 'x++' }, { label: 'D', text: 'x = x+1' }],
      correct: 'B',
      explanation: 'Updater function receives guaranteed latest state.'
    },
    {
      id: 6,
      question: 'Which of the following breaks React state change detection?',
      options: [{ label: 'A', text: 'setList([...l, x])' }, { label: 'B', text: 'l.push(x); setList(l)' }, { label: 'C', text: 'setList(l.concat(x))' }, { label: 'D', text: 'setList(l.filter())' }],
      correct: 'B',
      explanation: 'Direct mutation keeps the exact same memory pointer, preventing React from detecting changes.'
    },
    {
      id: 7,
      question: 'Key purpose in React lists:',
      options: [{ label: 'A', text: 'style' }, { label: 'B', text: 'identity of list items' }, { label: 'C', text: 'security' }, { label: 'D', text: 'routing' }],
      correct: 'B',
      explanation: 'Keys provide stable element identity across render diffs.'
    },
    {
      id: 8,
      question: 'Custom hook rule:',
      options: [{ label: 'A', text: 'name starts with "use"' }, { label: 'B', text: 'must return JSX' }, { label: 'C', text: 'no state inside' }, { label: 'D', text: 'one per file' }],
      correct: 'A',
      explanation: 'Custom hook functions must be prefixed with "use".'
    }
  ],
  bugDictionary: [
    { bug: 'Too many re-renders (Maximum update depth exceeded)', causeAndFix: 'You called setState during render, e.g. onClick={setX(1)} instead of onClick={() => setX(1)}.' },
    { bug: 'Each child in a list should have a unique "key" prop', causeAndFix: 'Add key with a stable unique id on the root element returned inside your array map.' },
    { bug: 'Nothing updates on the screen after calling setState', causeAndFix: 'You mutated the existing object/array. React detected the same object reference. Always spread or create a new copy.' },
    { bug: 'Stale value in setTimeout or setInterval', causeAndFix: 'Closure captured the initial state value. Use an updater function setState(prev => ...) or add the value to dependency array.' },
    { bug: 'Cannot read properties of undefined', causeAndFix: 'Data has not loaded yet. Guard with loading check or optional chaining (user?.name).' },
    { bug: 'Input is stuck / cannot type in text field', causeAndFix: 'Input has value={text} but lacks an onChange handler (controlled input without update event).' }
  ]
};
