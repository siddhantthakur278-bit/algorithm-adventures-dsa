import { WebDevBook } from '../types/webDevComicTypes';

export const tailwindComicData: WebDevBook = {
  id: 'tailwind',
  title: 'Tailwind: Utility-First CSS',
  badge: 'Comic Classic',
  color: '#06B6D4',
  accentBg: 'bg-cyan-500/10',
  accentBorder: 'border-cyan-500',
  tagline: 'Style at lightning speed with utility classes',
  description: 'Style right inside your HTML with tiny single-purpose classes. Covers Tailwind v4 (@theme, @import "tailwindcss"), spacing scale, Flex & Grid layout, responsive variants, dark mode, arbitrary values, and 20 build-it challenges.',
  gangNotes: {
    tuple: 'Tailwind lets you style right inside your HTML with tiny single-purpose classes. Fast, consistent, no CSS file hopping!',
    sam: 'I ask the "dumb" questions so you don’t have to. They are never dumb!',
    nully: 'I am the style that does not apply: the class that Tailwind never generated because you built its name dynamically...',
    bugsy: 'Walls of classes, bg-${color}-500 template strings, missing viewport tag: those are my playgrounds.'
  },
  chapters: [
    {
      id: 1,
      title: 'Why Tailwind? & Setup (v4 with Vite)',
      subtitle: 'Utility-first thinking and modern v4 installation',
      sections: [
        {
          heading: '1.1 Utility-First in One Picture',
          codeSnippet: {
            language: 'html',
            code: `<button class="bg-blue-600 px-4 py-2 rounded text-white">
  Click me
</button>

/* Generated CSS behind the scenes: */
.bg-blue-600 { background: #2563eb; }
.px-4        { padding-inline: 1rem; }
.py-2        { padding-block: .5rem; }
.rounded     { border-radius: .25rem; }
.text-white  { color: #fff; }`
          },
          explanation: [
            'Instead of inventing artificial class names (.card-title) and switching files constantly, you compose small utilities directly in markup.',
            'Tailwind scans your source files and generates ONLY the CSS classes you actually use, keeping the production stylesheet tiny (often < 15kb).'
          ],
          bullets: [
            'Traditional CSS: Name things, switch files, CSS grows forever, global side effects, custom arbitrary values everywhere.',
            'Tailwind: Style in place, no naming overhead, CSS stays tiny, styles are local to the element, shared constrained design tokens.'
          ]
        },
        {
          heading: '1.2 Installing Tailwind v4 with Vite',
          codeSnippet: {
            language: 'bash',
            code: `npm create vite@latest my-app -- --template react
cd my-app
npm install tailwindcss @tailwindcss/vite`
          },
          explanation: [
            'In vite.config.js, add the official @tailwindcss/vite plugin.',
            'In src/index.css, one single line replaces the legacy directives: @import "tailwindcss";',
            'Tailwind v4 is CSS-first with @theme support right in your stylesheet.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'tw-c1-q1',
          question: 'Tailwind generates...',
          options: [
            { label: 'A', text: 'all possible classes always' },
            { label: 'B', text: 'only the classes found in your source' },
            { label: 'C', text: 'one huge static file you edit' },
            { label: 'D', text: 'JavaScript' }
          ],
          correct: 'B',
          explanation: 'Tailwind statically scans your source files and generates only used classes.'
        },
        {
          id: 'tw-c1-q2',
          question: 'In Tailwind v4 the CSS entry file needs...',
          options: [
            { label: 'A', text: '@import "tailwindcss";' },
            { label: 'B', text: '@tailwind only' },
            { label: 'C', text: 'nothing' },
            { label: 'D', text: '@use tailwind' }
          ],
          correct: 'A',
          explanation: 'A single @import "tailwindcss"; replaces older @tailwind directives.'
        }
      ],
      misunderstandings: [
        { myth: 'Tailwind is just inline styles.', truth: 'Inline styles cannot handle hover, focus, media queries, or dark mode; Tailwind utilities can, while adhering to a shared design system.' }
      ]
    },
    {
      id: 2,
      title: 'Core Utilities: Spacing, Sizing, Colours & Typography',
      subtitle: 'The 4px scale, color palettes, and typography tokens',
      sections: [
        {
          heading: '2.1 Spacing, Sizing and Colours',
          codeSnippet: {
            language: 'html',
            code: `<div class="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
  <h2 class="text-xl font-bold text-slate-900">Hello Tailwind</h2>
  <p class="mt-2 text-sm leading-6 text-slate-600">
    Colours go 50 (lightest) to 950 (darkest).
  </p>
  <button class="mt-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">
    Click
  </button>
</div>
<!-- Opacity modifier: bg-black/50 ; text-red-500/80 -->`
          },
          explanation: [
            'The core spacing scale: 1 unit = 0.25rem = 4px. So p-4 = 1rem (16px), m-2 = 0.5rem (8px), w-64 = 16rem (256px).',
            'mx-auto centres block elements horizontally (margin-inline: auto).',
            'Slash syntax adds alpha opacity: bg-black/50 is black with 50% opacity.'
          ]
        },
        {
          heading: '2.2 Typography, Borders and Effects',
          codeSnippet: {
            language: 'html',
            code: `<h1 class="text-4xl font-extrabold tracking-tight text-balance md:text-6xl">Big heading</h1>
<p class="max-w-prose truncate text-lg italic underline decoration-wavy">...</p>
<div class="border-2 border-dashed border-gray-300 rounded-2xl ring-2 ring-blue-500 ring-offset-2 shadow-md"></div>
<img class="size-24 rounded-full object-cover" src="a.jpg" alt="Avatar">
<div class="bg-linear-to-r from-orange-400 to-rose-500 opacity-90 blur-sm"></div>`
          },
          explanation: [
            'size-24 sets both width and height to 6rem (96px).',
            'ring-* utilities create accessible focus and accent rings with offset spacing.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'tw-c2-q1',
          question: 'p-4 in Tailwind equals...',
          options: [
            { label: 'A', text: '4px' },
            { label: 'B', text: '1rem (16px)' },
            { label: 'C', text: '4rem' },
            { label: 'D', text: '4%' }
          ],
          correct: 'B',
          explanation: '4 x 0.25rem = 1rem = 16px.'
        },
        {
          id: 'tw-c2-q2',
          question: 'bg-black/50 does what?',
          options: [
            { label: 'A', text: 'black at 50% opacity' },
            { label: 'B', text: 'size 50' },
            { label: 'C', text: 'two separate classes' },
            { label: 'D', text: 'invalid syntax' }
          ],
          correct: 'A',
          explanation: 'Slash sets the color channel alpha opacity.'
        }
      ],
      codeLab: {
        task: 'Create a pill badge: small green text on light green, rounded fully, padded.',
        solution: `<span class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Active</span>`,
        note: 'Combines spacing, color, font-size, and border-radius utilities.'
      },
      misunderstandings: [
        { myth: 'I should memorise every single class.', truth: 'Memorise the patterns (p, m, w, h, text, bg, border). Autocomplete and search do the rest.' },
        { myth: 'Class order in HTML decides which style wins.', truth: 'CSS declaration order inside Tailwind’s compiled stylesheet determines specificity, not the HTML class order.' }
      ]
    },
    {
      id: 3,
      title: 'Layout with Flex & Grid',
      subtitle: 'Building modern interfaces with Flexbox, CSS Grid and position utilities',
      sections: [
        {
          heading: '3.1 Flex, Grid & Positioning',
          codeSnippet: {
            language: 'html',
            code: `<nav class="flex items-center justify-between gap-4 px-6 py-3">...</nav>
<div class="flex flex-col gap-2 sm:flex-row">...</div>
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <div class="col-span-2">wide</div>
  <div>normal</div>
</div>
<div class="grid min-h-screen place-items-center">centred</div>
<header class="sticky top-0 z-10 bg-white/80 backdrop-blur">...</header>
<ul class="divide-y divide-gray-200"><li class="py-2">item</li></ul>
<div class="space-y-4"><!-- vertical gap --></div>`
          },
          explanation: [
            'grid place-items-center centres both horizontally and vertically in one utility pair.',
            'sticky top-0 pins the navbar when scrolled to the viewport edge.',
            'gap-* replaces margin hacks on flex and grid items.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'tw-c3-q1',
          question: 'grid grid-cols-3 gap-4 makes...',
          options: [
            { label: 'A', text: '3 equal columns with gaps' },
            { label: 'B', text: '3 rows' },
            { label: 'C', text: 'a flex row' },
            { label: 'D', text: '3px columns' }
          ],
          correct: 'A',
          explanation: 'grid-cols-3 generates grid-template-columns: repeat(3, minmax(0, 1fr)).'
        },
        {
          id: 'tw-c3-q2',
          question: 'sticky top-0 makes an element...',
          options: [
            { label: 'A', text: 'stick when scrolling to top' },
            { label: 'B', text: 'fixed always' },
            { label: 'C', text: 'hidden' },
            { label: 'D', text: 'absolute' }
          ],
          correct: 'A',
          explanation: 'It acts as normal flow until reaching top: 0, then pins.'
        }
      ],
      codeLab: {
        task: 'Responsive card grid: 1 col on mobile, 2 on md, 4 on xl.',
        solution: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">...</div>`,
        note: 'Mobile-first breakpoint progression.'
      }
    },
    {
      id: 4,
      title: 'Responsive, States & Dark Mode',
      subtitle: 'Breakpoints, pseudo-class variants, group/peer and dark theming',
      sections: [
        {
          heading: '4.1 Breakpoints and Variants',
          codeSnippet: {
            language: 'html',
            code: `<!-- Breakpoints: base (0), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px) -->
<button class="bg-blue-600 hover:bg-blue-700 focus:ring-2 active:scale-95 disabled:opacity-50 transition">
  Save
</button>
<p class="text-sm md:text-base lg:text-lg">Grows with screen</p>
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>

<!-- group / peer styling based on parent or sibling state -->
<a class="group flex gap-2">
  <span class="group-hover:translate-x-1 transition">→</span> Read more
</a>
<input class="peer">
<p class="hidden peer-invalid:block text-red-500">Invalid email</p>`
          },
          explanation: [
            'Tailwind breakpoints are mobile-first (min-width queries). Unprefixed utilities apply everywhere; prefix: only applies at that breakpoint and wider.',
            'group and peer allow you to style elements based on the state of parent or sibling elements without JavaScript.'
          ]
        },
        {
          heading: '4.2 Dark Mode',
          codeSnippet: {
            language: 'html',
            code: `<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
  Adapts automatically
</div>
/* Default follows OS prefers-color-scheme. For manual class toggle in v4: */
@custom-variant dark (&:where(.dark, .dark *));
/* Toggle: document.documentElement.classList.toggle('dark') */`
          },
          explanation: [
            'dark: variant applies styles when dark mode is active.',
            'Supports OS media query or manual class-based toggling.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'tw-c4-q1',
          question: 'Tailwind breakpoints are...',
          options: [
            { label: 'A', text: 'max-width' },
            { label: 'B', text: 'min-width (mobile-first)' },
            { label: 'C', text: 'exact width' },
            { label: 'D', text: 'height' }
          ],
          correct: 'B',
          explanation: 'Tailwind is mobile-first: md: means 768px AND wider.'
        },
        {
          id: 'tw-c4-q2',
          question: 'group-hover reacts to...',
          options: [
            { label: 'A', text: 'hover on an ancestor with class group' },
            { label: 'B', text: 'hover on itself' },
            { label: 'C', text: 'dark mode' },
            { label: 'D', text: 'focus' }
          ],
          correct: 'A',
          explanation: 'Triggers styles on the child when the group ancestor is hovered.'
        }
      ],
      codeLab: {
        task: 'Button that is blue, darker on hover, grey and not clickable when disabled.',
        solution: `<button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400" disabled>Pay</button>`,
        note: 'Combines hover: and disabled: variants.'
      },
      misunderstandings: [
        { myth: 'md: means "only medium screens".', truth: 'md: means medium AND wider. Use max-md: for the inverse.' },
        { myth: 'Dark mode requires JavaScript.', truth: 'By default it follows the OS system preference via pure CSS.' }
      ]
    },
    {
      id: 5,
      title: 'Customising Tailwind: @theme & Arbitrary Values',
      subtitle: 'Configuring custom tokens, arbitrary values and avoiding dynamic class bugs',
      sections: [
        {
          heading: '5.1 @theme, Arbitrary Values & Reusing Styles',
          codeSnippet: {
            language: 'css',
            code: `@import "tailwindcss";
@theme {
  --color-brand: #e63946; /* enables bg-brand, text-brand, border-brand */
  --font-display: "Bangers", system-ui, sans-serif;
  --breakpoint-3xl: 120rem;
}

/* Arbitrary values in square brackets when escaping design scale: */
<div class="w-[137px] bg-[#1da1f2] top-[calc(100%-2rem)]">...</div>

/* BEST practice for component reuse in React: */
function Button({ children, variant = 'primary' }) {
  const styles = {
    primary: 'bg-brand text-white hover:opacity-90',
    ghost: 'border border-brand text-brand'
  };
  return <button className={\`rounded-lg px-4 py-2 font-semibold \${styles[variant]}\`}>{children}</button>;
}`
          },
          explanation: [
            'In v4, custom theme tokens are defined directly in CSS using @theme block.',
            'Arbitrary values [137px] let you specify custom one-off values while still generating minimal CSS.',
            'NEVER construct classes dynamically like `bg-${color}-500`. Tailwind static scanner cannot detect them. Use a lookup object with complete class names.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'tw-c5-q1',
          question: 'Where do you define a custom brand colour in Tailwind v4?',
          options: [
            { label: 'A', text: '@theme { --color-brand: ... }' },
            { label: 'B', text: 'package.json' },
            { label: 'C', text: 'index.html' },
            { label: 'D', text: '.env' }
          ],
          correct: 'A',
          explanation: 'v4 uses CSS-first configuration inside @theme.'
        },
        {
          id: 'tw-c5-q2',
          question: 'Why does text-${color}-500 fail in Tailwind?',
          options: [
            { label: 'A', text: 'syntax error' },
            { label: 'B', text: 'class name not complete in static source so never generated' },
            { label: 'C', text: 'v4 bans it' },
            { label: 'D', text: 'needs JS runtime' }
          ],
          correct: 'B',
          explanation: 'Tailwind statically scans raw text strings at build time.'
        }
      ],
      misunderstandings: [
        { myth: '@apply everywhere is cleaner.', truth: 'It recreates the classic CSS naming problem. Prefer component-level encapsulation.' },
        { myth: 'You must maintain tailwind.config.js in v4.', truth: 'v4 is CSS-first; config files are optional.' }
      ]
    }
  ],
  problems20: [
    { id: 1, title: 'Centre Box in Screen', problem: 'Centre a box in the screen.', solution: 'grid min-h-screen place-items-center' },
    { id: 2, title: 'Rounded Avatar 64px', problem: 'Circular avatar image of 64px.', solution: 'size-16 rounded-full object-cover' },
    { id: 3, title: 'Primary Button with Focus', problem: 'Primary button with hover and focus ring.', solution: 'rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' },
    { id: 4, title: 'Card with Shadow & Border', problem: 'Card with rounded corners, border, and shadow.', solution: 'rounded-xl border border-gray-200 bg-white p-6 shadow-md' },
    { id: 5, title: 'Navbar Logo Left, Links Right', problem: 'Navbar with logo on left and links spaced to right.', solution: 'flex items-center justify-between px-6 py-3' },
    { id: 6, title: '2-Column Layout on md+', problem: '1 column mobile, 2 columns on tablet and desktop.', solution: 'grid grid-cols-1 gap-6 md:grid-cols-2' },
    { id: 7, title: 'Hide on Mobile', problem: 'Hidden on mobile, displayed as block on desktop.', solution: 'hidden md:block' },
    { id: 8, title: 'Truncate Long Title', problem: 'Single-line truncation with ellipsis.', solution: 'truncate' },
    { id: 9, title: 'Muted Small Text', problem: 'Small grey secondary text.', solution: 'text-sm text-gray-500' },
    { id: 10, title: 'Full-Width Form Input', problem: 'Full-width input with borders and focus ring.', solution: 'w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none' },
    { id: 11, title: 'Sticky Blurred Header', problem: 'Header sticky with translucent background blur.', solution: 'sticky top-0 z-20 bg-white/70 backdrop-blur' },
    { id: 12, title: 'Animate a Spinner', problem: 'Circular spinning loader icon.', solution: 'size-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600' },
    { id: 13, title: 'Dark-Mode Aware Page', problem: 'Automatic light/dark background and text colors.', solution: 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white' },
    { id: 14, title: '16:9 Aspect Video Cover', problem: 'Image/video container with 16:9 aspect ratio.', solution: 'aspect-video w-full object-cover' },
    { id: 15, title: 'Vertical Stack Spacing', problem: 'Even vertical gaps between direct children.', solution: 'space-y-4' },
    { id: 16, title: 'Divider Lines in List', problem: 'Dividers between list items.', solution: 'divide-y divide-gray-200' },
    { id: 17, title: 'Group Hover Reveal', problem: 'Reveal child opacity on parent hover.', solution: 'group ... opacity-0 group-hover:opacity-100 transition' },
    { id: 18, title: 'Badge Pill', problem: 'Compact rounded pill badge with emerald color.', solution: 'rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700' },
    { id: 19, title: 'Gradient Hero Background', problem: 'Three-color linear gradient background.', solution: 'bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500' },
    { id: 20, title: 'Responsive Text Scaling', problem: 'Font size scaling across breakpoints.', solution: 'text-lg md:text-2xl lg:text-4xl' }
  ],
  finalBoss: [
    {
      id: 1,
      question: '1 spacing unit in Tailwind equals...',
      options: [{ label: 'A', text: '1px' }, { label: 'B', text: '0.25rem (4px)' }, { label: 'C', text: '1rem' }, { label: 'D', text: '10px' }],
      correct: 'B',
      explanation: '1 unit = 0.25rem = 4px.'
    },
    {
      id: 2,
      question: 'Utility to make an element a flex container:',
      options: [{ label: 'A', text: 'flex' }, { label: 'B', text: 'display-flex' }, { label: 'C', text: 'd-flex' }, { label: 'D', text: 'flexbox' }],
      correct: 'A',
      explanation: 'flex sets display: flex.'
    },
    {
      id: 3,
      question: 'sm breakpoint min-width is...',
      options: [{ label: 'A', text: '480px' }, { label: 'B', text: '640px' }, { label: 'C', text: '768px' }, { label: 'D', text: '1024px' }],
      correct: 'B',
      explanation: 'sm is 640px.'
    },
    {
      id: 4,
      question: 'Responsive prefix for tablet (768px) and up:',
      options: [{ label: 'A', text: 'tab:' }, { label: 'B', text: 'md:' }, { label: 'C', text: 'ipad:' }, { label: 'D', text: 'medium:' }],
      correct: 'B',
      explanation: 'md: starts at 768px.'
    },
    {
      id: 5,
      question: 'Class syntax to add a hover colour:',
      options: [{ label: 'A', text: 'hover:bg-red-500' }, { label: 'B', text: 'bg-red-500:hover' }, { label: 'C', text: 'on-hover:bg-red-500' }, { label: 'D', text: 'hover-bg-red-500' }],
      correct: 'A',
      explanation: 'Variants prepend with a colon: variant:utility.'
    },
    {
      id: 6,
      question: 'Space between flex/grid children:',
      options: [{ label: 'A', text: 'gap-4' }, { label: 'B', text: 'spacing-4' }, { label: 'C', text: 'gutter-4' }, { label: 'D', text: 'between-4' }],
      correct: 'A',
      explanation: 'gap-4 sets both row-gap and column-gap to 1rem.'
    },
    {
      id: 7,
      question: 'Dark variant class prefix:',
      options: [{ label: 'A', text: 'dark:' }, { label: 'B', text: 'night:' }, { label: 'C', text: 'theme-dark:' }, { label: 'D', text: 'mode:' }],
      correct: 'A',
      explanation: 'dark: targets dark mode.'
    },
    {
      id: 8,
      question: 'Arbitrary value syntax for 137px width:',
      options: [{ label: 'A', text: 'w-(137)' }, { label: 'B', text: 'w-[137px]' }, { label: 'C', text: 'w-{137}' }, { label: 'D', text: 'w-137' }],
      correct: 'B',
      explanation: 'Square brackets [137px] represent arbitrary CSS values.'
    }
  ],
  bugDictionary: [
    { bug: 'Classes do nothing', causeAndFix: 'Tailwind not imported in CSS (@import "tailwindcss";), plugin missing in Vite config, or file is outside scanned source directories.' },
    { bug: 'Dynamic class missing in build', causeAndFix: 'You assembled class name from pieces (e.g. bg-${c}-500). Write full static strings so the build scanner detects them.' },
    { bug: 'Mobile layout looks tiny or desktop-like', causeAndFix: 'Missing <meta name="viewport" content="width=device-width, initial-scale=1"> in index.html.' },
    { bug: 'Two conflicting classes (p-2 p-4)', causeAndFix: 'Remove one; do not rely on HTML order. Use tailwind-merge helper in dynamic React components.' },
    { bug: 'Custom colour not generated', causeAndFix: 'In Tailwind v4, define it under @theme with the --color- prefix (e.g. --color-brand: #e63946).' }
  ]
};
