import { WebDevBook } from '../types/webDevComicTypes';

export const typescriptComicData: WebDevBook = {
  id: 'typescript',
  title: 'TypeScript: JavaScript with Superpowers',
  badge: 'Comic Classic',
  color: '#3B82F6',
  accentBg: 'bg-blue-500/10',
  accentBorder: 'border-blue-500',
  tagline: 'Types, interfaces, generics and real projects',
  description: 'A spell-checker for your code that catches bugs before they run. Master type annotations, interfaces vs type aliases, unions, narrowing, generics, utility types (Partial, Pick, Omit), typing React components, Express APIs, and 20 classic TypeScript problems.',
  gangNotes: {
    tuple: 'TypeScript is JavaScript plus types: a spell-checker for your code that catches bugs before they run.',
    sam: 'I ask the "dumb" questions so you don’t have to. They are never dumb!',
    nully: 'I am null and undefined. With strict on, TypeScript finally makes everyone check for me!',
    bugsy: 'I love any: it turns the type checker off and lets me run wild at runtime. Please do not use it!'
  },
  chapters: [
    {
      id: 1,
      title: 'Why TypeScript? & Setup',
      subtitle: 'A safety net for JavaScript and tsconfig configuration',
      sections: [
        {
          heading: '1.1 What TypeScript Does',
          codeSnippet: {
            language: 'typescript',
            code: `// JavaScript: runs, then crashes or silently gives nonsense
function area(w, h) { return w * h }
area('10', 5) // 50 ... by accident
area(10)      // NaN

// TypeScript: red squiggly BEFORE you run anything
function area(w: number, h: number): number { return w * h }
area('10', 5) // Error: Argument of type 'string' is not assignable to parameter of type 'number'
area(10)      // Error: Expected 2 arguments, but got 1`
          },
          explanation: [
            'TypeScript is a typed superset of JavaScript: all valid JavaScript is valid TypeScript.',
            'Type errors stop you at compile time before you run the code in production.',
            'Types are completely erased upon compilation to standard JavaScript; types do NOT exist at runtime.'
          ]
        },
        {
          heading: '1.2 Setup and tsconfig.json',
          codeSnippet: {
            language: 'json',
            code: `// tsconfig.json essentials
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true, // THE most important switch: turns on strict checks
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}`
          },
          explanation: [
            '"strict": true is essential: it activates strictNullChecks, preventing null and undefined crashes.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c1-q1',
          question: 'TypeScript code runs in the browser...',
          options: [
            { label: 'A', text: 'directly' },
            { label: 'B', text: 'after compiling to JavaScript' },
            { label: 'C', text: 'only in Node' },
            { label: 'D', text: 'never' }
          ],
          correct: 'B',
          explanation: 'The tsc compiler erases types to output plain JS for the browser.'
        },
        {
          id: 'ts-c1-q2',
          question: 'Are types available at runtime?',
          options: [
            { label: 'A', text: 'yes' },
            { label: 'B', text: 'no, erased on compile' },
            { label: 'C', text: 'only interfaces' },
            { label: 'D', text: 'only enums' }
          ],
          correct: 'B',
          explanation: 'Types exist exclusively at compile-time.'
        },
        {
          id: 'ts-c1-q3',
          question: 'Which tsconfig option turns on all strict checks?',
          options: [
            { label: 'A', text: '"safe": true' },
            { label: 'B', text: '"strict": true' },
            { label: 'C', text: '"types": "all"' },
            { label: 'D', text: '"check": true' }
          ],
          correct: 'B',
          explanation: '"strict": true enables strictNullChecks, noImplicitAny, etc.'
        }
      ],
      misunderstandings: [
        { myth: 'TypeScript adds runtime overhead to execution speed.', truth: 'Types are erased completely during compilation; emitted JS runs at native speed.' }
      ]
    },
    {
      id: 2,
      title: 'Basic Types & Type Inference',
      subtitle: 'Primitives, arrays, tuples, enums, any vs unknown',
      sections: [
        {
          heading: '2.1 Primitive Types, Arrays, Tuples & Enums',
          codeSnippet: {
            language: 'typescript',
            code: `let name: string = 'Asha'
let age: number = 21         // single number type (no int/float)
let ok: boolean = true
let big: bigint = 10n
let nothing: null = null
let u: undefined = undefined

let city = 'Pune'            // INFERENCE: TS infers type string automatically
// city = 42                 // Error!

let scores: number[] = [90, 80]
let pair: [string, number] = ['Asha', 21] // tuple: fixed length and types
const ro: readonly string[] = ['a']

type Status = 'idle' | 'loading' | 'error' // string literal union (preferred)`
          },
          explanation: [
            'Type inference: TS figures out obvious types without verbose annotations.',
            'Tuple: fixed-length array with specific types per index: [string, number].'
          ]
        },
        {
          heading: '2.2 any vs unknown',
          codeSnippet: {
            language: 'typescript',
            code: `// any: turns off type checking completely (DANGEROUS)
let a: any = 'hi'; a.toUpperCase(); a.foo.bar() // compiles... crashes at runtime!

// unknown: type-safe "anything" - forces you to narrow before usage
let x: unknown = JSON.parse('...')
// x.toUpperCase() // Error: Object is of type 'unknown'
if (typeof x === 'string') {
  x.toUpperCase() // OK! Narrowed to string
}`
          },
          explanation: [
            'Never use any; use unknown for unpredictable data, forcing type narrowing checks.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c2-q1',
          question: 'Which is the type-safe alternative to any?',
          options: [
            { label: 'A', text: 'unknown' },
            { label: 'B', text: 'void' },
            { label: 'C', text: 'object' },
            { label: 'D', text: 'never' }
          ],
          correct: 'A',
          explanation: 'unknown forces you to perform runtime checks before calling properties.'
        },
        {
          id: 'ts-c2-q2',
          question: 'let t: [string, number] is a...',
          options: [
            { label: 'A', text: 'array of strings' },
            { label: 'B', text: 'tuple' },
            { label: 'C', text: 'object' },
            { label: 'D', text: 'enum' }
          ],
          correct: 'B',
          explanation: 'A tuple defines fixed length and specific indexed types.'
        }
      ],
      codeLab: {
        task: 'Create a type for traffic light states and a function that returns the next state.',
        solution: `type Light = 'red' | 'green' | 'yellow'
function next(l: Light): Light {
  return l === 'red' ? 'green' : l === 'green' ? 'yellow' : 'red'
}`,
        note: 'Literal unions guarantee exhaustive state handling.'
      }
    },
    {
      id: 3,
      title: 'Objects, Interfaces & Functions',
      subtitle: 'type vs interface, optional fields, readonly and function signatures',
      sections: [
        {
          heading: '3.1 Object Types: type vs interface',
          codeSnippet: {
            language: 'typescript',
            code: `interface User {
  id: number
  name: string
  email?: string          // optional
  readonly createdAt: Date // cannot be reassigned
}

// Interfaces extend; types intersect
interface Admin extends User { permissions: string[] }
type Staff = User & { team: string }

const u: User = { id: 1, name: 'Asha', createdAt: new Date() }
u.email?.toLowerCase()    // optional chaining
const city = u.email ?? 'none' // nullish coalescing

type Dictionary = { [key: string]: number } // or Record<string, number>`
          },
          explanation: [
            'interface is ideal for public API contracts and object models (supports declaration merging).',
            'type alias is flexible for unions, intersections, primitives, and tuples.'
          ]
        },
        {
          heading: '3.2 Function Annotations',
          codeSnippet: {
            language: 'typescript',
            code: `function add(a: number, b: number = 0): number { return a + b }
const greet = (name: string, greeting?: string) => \`\${greeting ?? 'Hi'} \${name}\`
function sum(...nums: number[]): number { return nums.reduce((s, n) => s + n, 0) }
type Handler = (event: string, id: number) => void
function fail(msg: string): never { throw new Error(msg) } // never returns normally`
          },
          explanation: [
            'void: returns undefined or has no return statement.',
            'never: function that never successfully returns (throws or infinite loop).'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c3-q1',
          question: 'email?: string means the property is...',
          options: [
            { label: 'A', text: 'required' },
            { label: 'B', text: 'optional' },
            { label: 'C', text: 'readonly' },
            { label: 'D', text: 'null' }
          ],
          correct: 'B',
          explanation: '? marks an optional property (type is string | undefined).'
        },
        {
          id: 'ts-c3-q2',
          question: 'A function that never returns normally has return type...',
          options: [
            { label: 'A', text: 'void' },
            { label: 'B', text: 'null' },
            { label: 'C', text: 'never' },
            { label: 'D', text: 'any' }
          ],
          correct: 'C',
          explanation: 'never indicates unreachable termination.'
        }
      ],
      codeLab: {
        task: 'Define a Product interface and a function returning total price of products array.',
        solution: `interface Product { id: number; name: string; price: number; qty?: number }
const total = (items: Product[]): number =>
  items.reduce((s, p) => s + p.price * (p.qty ?? 1), 0)`,
        note: 'p.qty ?? 1 safely falls back when qty is optional.'
      }
    },
    {
      id: 4,
      title: 'Unions, Narrowing & Generics',
      subtitle: 'Discriminated unions, type narrowing, and generic parameters',
      sections: [
        {
          heading: '4.1 Union Types and Discriminated Unions',
          codeSnippet: {
            language: 'typescript',
            code: `// DISCRIMINATED UNION: a shared literal discriminant field ("kind")
type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'rect'; w: number; h: number }

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2
    case 'rect':   return s.w * s.h
    default: {
      const _exhaustive: never = s // compile error if any variant is forgotten!
      return _exhaustive
    }
  }
}`
          },
          explanation: [
            'Discriminated unions combine distinct object types via a shared literal tag.',
            'Exhaustiveness checking using the never type ensures all possible cases are handled.'
          ]
        },
        {
          heading: '4.2 Generics and Utility Types',
          codeSnippet: {
            language: 'typescript',
            code: `// Generic function: retains type relationship between arguments and return
function first<T>(arr: T[]): T | undefined { return arr[0] }

interface ApiResponse<T> { data: T; status: number }

// Built-in Utility Types:
type UserPreview = Pick<User, 'id' | 'name'>
type UserNoEmail = Omit<User, 'email'>
type UserPatch   = Partial<User> // makes all fields optional
type FullUser    = Required<User>
type Frozen      = Readonly<User>
type Scores      = Record<string, number>
type Keys        = keyof User // 'id' | 'name' | 'email' | 'createdAt'`
          },
          explanation: [
            'Generics (<T>) allow components and functions to work over a variety of types while retaining full type safety.',
            'Partial<T> is invaluable for API update/patch functions.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c4-q1',
          question: 'Partial<User> makes...',
          options: [
            { label: 'A', text: 'all fields required' },
            { label: 'B', text: 'all fields optional' },
            { label: 'C', text: 'all fields readonly' },
            { label: 'D', text: 'all null' }
          ],
          correct: 'B',
          explanation: 'Partial transforms all properties to optional.'
        },
        {
          id: 'ts-c4-q2',
          question: 'Omit<User, "email"> gives...',
          options: [
            { label: 'A', text: 'User without email' },
            { label: 'B', text: 'only email' },
            { label: 'C', text: 'email optional' },
            { label: 'D', text: 'error' }
          ],
          correct: 'A',
          explanation: 'Omit removes specific keys from an object type.'
        }
      ],
      codeLab: {
        task: 'Write a generic groupBy that groups items by a key.',
        solution: `function groupBy<T, K extends string | number>(items: T[], key: (i: T) => K): Record<K, T[]> {
  return items.reduce((acc, i) => {
    (acc[key(i)] ??= []).push(i)
    return acc
  }, {} as Record<K, T[]>)
}`,
        note: 'Generic type parameters preserve full item types.'
      },
      misunderstandings: [
        { myth: 'Type assertions like (x as User) cast data at runtime.', truth: 'as only tells the compiler to trust you; invalid assertions cause runtime crashes.' },
        { myth: 'Non-null assertion ! is safe.', truth: 'It silences the checker without adding runtime checks.' }
      ]
    },
    {
      id: 5,
      title: 'Classes, Modules & Tooling',
      subtitle: 'Access modifiers, parameter properties, interfaces and type-only imports',
      sections: [
        {
          heading: '5.1 Classes and Modules',
          codeSnippet: {
            language: 'typescript',
            code: `class Account {
  static count = 0
  readonly id: number
  #pin: string // ECMAScript true runtime private field

  constructor(public owner: string, private balance = 0, pin = '0000') {
    this.id = ++Account.count
    this.#pin = pin
  }
  deposit(n: number): void { this.balance += n }
  get total(): number { return this.balance }
}

// Type-only import (erased completely during compilation):
import { type User, API } from './types'`
          },
          explanation: [
            'Parameter properties (public owner: string in constructor) automatically declare and initialize class fields in one concise line.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c5-q1',
          question: 'constructor(public name: string) does what?',
          options: [
            { label: 'A', text: 'declares and assigns this.name shorthand' },
            { label: 'B', text: 'only declares a parameter' },
            { label: 'C', text: 'causes error' },
            { label: 'D', text: 'makes it static' }
          ],
          correct: 'A',
          explanation: 'Parameter properties are concise class field declarations.'
        }
      ]
    },
    {
      id: 6,
      title: 'TypeScript in React and Node',
      subtitle: 'Typing components, props, hooks, events, and Express endpoints',
      sections: [
        {
          heading: '6.1 React with TypeScript',
          codeSnippet: {
            language: 'tsx',
            code: `interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'ghost'
  children?: React.ReactNode
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} className={variant}>{label}</button>
}

const [user, setUser] = useState<User | null>(null)
const inputRef = useRef<HTMLInputElement>(null)
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault() }`
          },
          explanation: [
            'Generic useState<User | null>(null) handles async state that initializes as null.',
            'React.ChangeEvent and React.FormEvent provide strongly-typed form events.'
          ]
        },
        {
          heading: '6.2 Express with TypeScript',
          codeSnippet: {
            language: 'typescript',
            code: `import express, { Request, Response, NextFunction } from 'express'

interface CreateUserBody { name: string; email: string }

app.post('/users', (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { name, email } = req.body // strongly typed!
  res.status(201).json({ id: 1, name, email })
})`
          },
          explanation: [
            'Always validate untrusted external network data using libraries like Zod or Valibot; TS types only describe compile-time expectations.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'ts-c6-q1',
          question: 'useState with user that starts null:',
          options: [
            { label: 'A', text: 'useState<User | null>(null)' },
            { label: 'B', text: 'useState(null)' },
            { label: 'C', text: 'useState<User>()' },
            { label: 'D', text: 'useState: User' }
          ],
          correct: 'A',
          explanation: 'Pass a union type to the generic type parameter.'
        },
        {
          id: 'ts-c6-q2',
          question: 'Type of an HTML input change event in React:',
          options: [
            { label: 'A', text: 'React.ChangeEvent<HTMLInputElement>' },
            { label: 'B', text: 'Event' },
            { label: 'C', text: 'InputEvent' },
            { label: 'D', text: 'any' }
          ],
          correct: 'A',
          explanation: 'React provides generic synthetic ChangeEvent types.'
        }
      ]
    }
  ],
  problems20: [
    { id: 1, title: 'Typed Addition Function', problem: 'Type a function adding two numbers.', solution: 'const add = (a: number, b: number): number => a + b' },
    { id: 2, title: 'Point Type and Distance', problem: 'Create a Point type and calculate distance between points.', solution: 'type Point = { x: number; y: number }\nconst dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)' },
    { id: 3, title: 'Optional Property in Interface', problem: 'Declare an interface with an optional field.', solution: 'interface User { name: string; nickname?: string }' },
    { id: 4, title: 'Union of Allowed Sizes', problem: 'Declare a union type of shirt sizes S, M, L.', solution: 'type Size = "S" | "M" | "L"' },
    { id: 5, title: 'Array of Tuples', problem: 'Declare an array of [name, score] tuples.', solution: 'const rows: [string, number][] = [["A", 90]]' },
    { id: 6, title: 'Make All Properties Optional', problem: 'Transform all properties of User to optional.', solution: 'type Patch = Partial<User>' },
    { id: 7, title: 'Pick Subset of Properties', problem: 'Extract only id and name from User.', solution: 'type Preview = Pick<User, "id" | "name">' },
    { id: 8, title: 'Dictionary String to Number', problem: 'Type a dictionary mapping strings to numbers.', solution: 'const stock: Record<string, number> = { apple: 5 }' },
    { id: 9, title: 'Generic Identity Function', problem: 'Declare a generic identity function.', solution: 'const id = <T,>(x: T): T => x' },
    { id: 10, title: 'Return Last Element Generically', problem: 'Generic function returning the last array item.', solution: 'const last = <T,>(a: T[]): T | undefined => a[a.length - 1]' },
    { id: 11, title: 'Narrow String | Number', problem: 'Narrow union variable with typeof check.', solution: 'if (typeof v === "string") v.toUpperCase(); else v.toFixed(1)' },
    { id: 12, title: 'Safe Property Access', problem: 'Safe optional chaining with fallback.', solution: 'const city = user?.address?.city ?? "Unknown"' },
    { id: 13, title: 'Discriminated Union Area', problem: 'Compute area for circle and square discriminated union.', solution: 'type S = {k: "c", r: number} | {k: "s", a: number}\nconst area = (s: S) => s.k === "c" ? Math.PI * s.r ** 2 : s.a ** 2' },
    { id: 14, title: 'Readonly Array Parameter', problem: 'Function taking a readonly array to prevent mutations.', solution: 'function sum(xs: readonly number[]) { return xs.reduce((a, b) => a + b, 0) }' },
    { id: 15, title: 'Type a Callback Function', problem: 'Function accepting a typed callback argument.', solution: 'function run(cb: (n: number) => void) { cb(1) }' },
    { id: 16, title: 'Async Function Returning Typed Promise', problem: 'Fetch function returning Promise<User>.', solution: 'async function getUser(id: number): Promise<User> { const r = await fetch(`/u/${id}`); return r.json() }' },
    { id: 17, title: 'Custom Type Guard Function', problem: 'Custom type guard verifying if unknown object is User.', solution: 'function isUser(x: unknown): x is User { return typeof x === "object" && x !== null && "name" in x }' },
    { id: 18, title: 'Extract Object Keys', problem: 'Extract union of all keys of User.', solution: 'type K = keyof User' },
    { id: 19, title: 'Class with Private Balance', problem: 'Class featuring private balance field.', solution: 'class Acc { private bal = 0; deposit(n: number) { this.bal += n } }' },
    { id: 20, title: 'Enum-Like Const Object', problem: 'Const assertion object acting as enum.', solution: 'const Role = { Admin: "admin", User: "user" } as const\ntype Role = typeof Role[keyof typeof Role]' }
  ],
  finalBoss: [
    {
      id: 1,
      question: 'Which type is safest for unpredictable unknown input?',
      options: [{ label: 'A', text: 'any' }, { label: 'B', text: 'unknown' }, { label: 'C', text: 'object' }, { label: 'D', text: 'Function' }],
      correct: 'B',
      explanation: 'unknown forces type narrowing before usage, preventing runtime crashes.'
    },
    {
      id: 2,
      question: 'TypeScript types exist at...',
      options: [{ label: 'A', text: 'runtime' }, { label: 'B', text: 'compile time only' }, { label: 'C', text: 'both runtime and compile time' }, { label: 'D', text: 'neither' }],
      correct: 'B',
      explanation: 'Types are erased during compilation.'
    },
    {
      id: 3,
      question: 'Readonly<T> makes all properties...',
      options: [{ label: 'A', text: 'optional' }, { label: 'B', text: 'immutable / non-reassignable' }, { label: 'C', text: 'private' }, { label: 'D', text: 'deleted' }],
      correct: 'B',
      explanation: 'Prevents reassignment of properties.'
    },
    {
      id: 4,
      question: 'Optional chaining operator:',
      options: [{ label: 'A', text: '?.' }, { label: 'B', text: '??' }, { label: 'C', text: '!!' }, { label: 'D', text: '=>' }],
      correct: 'A',
      explanation: '?. safely accesses nested properties.'
    },
    {
      id: 5,
      question: 'Nullish coalescing operator:',
      options: [{ label: 'A', text: '||' }, { label: 'B', text: '??' }, { label: 'C', text: '&&' }, { label: 'D', text: '?:' }],
      correct: 'B',
      explanation: '?? falls back only on null or undefined.'
    },
    {
      id: 6,
      question: 'Tuple type example:',
      options: [{ label: 'A', text: '[string, number]' }, { label: 'B', text: 'string[]' }, { label: 'C', text: '{a: string}' }, { label: 'D', text: 'Set' }],
      correct: 'A',
      explanation: '[string, number] is a fixed-order tuple.'
    },
    {
      id: 7,
      question: 'Narrow union by common discriminant literal field:',
      options: [{ label: 'A', text: 'discriminated union' }, { label: 'B', text: 'type cast' }, { label: 'C', text: 'any' }, { label: 'D', text: 'enum only' }],
      correct: 'A',
      explanation: 'Discriminated unions use a shared literal property.'
    },
    {
      id: 8,
      question: 'What does the non-null assertion exclamation mark (x!) do?',
      options: [{ label: 'A', text: 'negates the value' }, { label: 'B', text: 'asserts non-null to the compiler (unsafe)' }, { label: 'C', text: 'logs to console' }, { label: 'D', text: 'makes it optional' }],
      correct: 'B',
      explanation: 'Silences null checks without adding runtime protection.'
    }
  ],
  bugDictionary: [
    { bug: "Type 'string | undefined' is not assignable to type 'string'", causeAndFix: 'Strict null checks are active: handle undefined first using an if check, nullish coalescing (??), or optional chaining (?.).' },
    { bug: "Property 'x' does not exist on type 'Y'", causeAndFix: 'Typo in property name, or the type definition lacks the field. Add the field to the interface or narrow the union.' },
    { bug: "Object is possibly 'null'", causeAndFix: 'Check before accessing: if (x) { ... } or use optional chaining x?.prop.' },
    { bug: "Parameter 'x' implicitly has an 'any' type", causeAndFix: 'noImplicitAny is enabled. Annotate the parameter explicitly (e.g. x: string).' },
    { bug: "Cannot find module './x' or its type declarations", causeAndFix: 'Wrong file path, missing file extension resolution in tsconfig, or missing @types/<pkg> devDependency.' },
    { bug: "Argument of type 'X' is not assignable to parameter of type 'Y'", causeAndFix: 'Object shapes or primitive types differ. Adjust data structure or widen the parameter type.' }
  ]
};
