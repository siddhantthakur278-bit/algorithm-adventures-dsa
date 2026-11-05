import { WebDevBook } from '../types/webDevComicTypes';

export const cssComicData: WebDevBook = {
  id: 'css',
  title: 'CSS: Style the Web',
  badge: 'Comic Classic',
  color: '#0284C7',
  accentBg: 'bg-sky-500/10',
  accentBorder: 'border-sky-500',
  tagline: 'Selectors, box model, Flexbox, Grid and animations',
  description: 'The wardrobe, makeup and architecture of the web. Master cascade, specificity, box model, Flexbox, CSS Grid, media queries, CSS variables, and modern responsive design.',
  gangNotes: {
    tuple: 'If HTML is the skeleton, CSS is the wardrobe, makeup and architecture. Let us make pages look great.',
    sam: 'I ask the "dumb" questions so you don’t have to. They are never dumb!',
    nully: 'I am the mysterious empty space: the margin you did not expect, the height that collapsed to nothing...',
    bugsy: 'Specificity wars, overflowing boxes, centring failures: I thrive on them. Learn the rules and I vanish!'
  },
  chapters: [
    {
      id: 1,
      title: 'Selectors, Cascade & Specificity',
      subtitle: 'How CSS finds elements and decides who wins',
      sections: [
        {
          heading: '1.1 What CSS Is and How to Add It',
          codeSnippet: {
            language: 'css',
            code: `/* selector { property: value; } */
h1 { color: tomato; font-size: 2rem; }

<!-- 1) External file (best): --> <link rel="stylesheet" href="styles.css">
<!-- 2) Internal: --> <style> p { margin: 0; } </style>
<!-- 3) Inline (avoid): --> <p style="color: red">Hi</p>`
          },
          explanation: [
            'Rule = selector + declaration block. Declaration = property: value;',
            'Comments are /* like this */. CSS is forgiving: an invalid declaration is skipped while valid ones still render.',
            'Cascade is the algorithm that decides which style wins when multiple declarations compete.'
          ]
        },
        {
          heading: '1.2 Selectors',
          codeSnippet: {
            language: 'css',
            code: `p { }           /* element */
.card { }       /* class (reusable) */
#header { }     /* id (unique) */
* { }           /* universal */
div p { }       /* descendant: any p inside div */
div > p { }     /* child: direct children only */
h2 + p { }      /* adjacent sibling: p right after h2 */
h2 ~ p { }      /* general sibling */
a, button { }   /* group */
input[type="email"] { } /* attribute */
a:hover li:first-child li:nth-child(odd) input:focus /* pseudo-classes */
p::first-line p::before { content: "→ "; }          /* pseudo-elements */
.card:not(.active) .card:has(img)                   /* :not() and :has() */`
          },
          explanation: [
            'Child combinator (>) selects direct children; space combinator selects any descendant.',
            'Pseudo-classes (:hover, :focus, :nth-child) target dynamic states.',
            'Pseudo-elements (::before, ::after) create virtual DOM elements.'
          ]
        },
        {
          heading: '1.3 Specificity, Cascade and Inheritance',
          codeSnippet: {
            language: 'css',
            code: `p       { color: blue; }   /* 0,0,0,1 */
.note   { color: green; }  /* 0,0,1,0 <- beats p */
p.note  { color: orange; } /* 0,0,1,1 <- beats .note */
#intro  { color: red; }    /* 0,1,0,0 <- beats classes */
/* Inline style: 1,0,0,0. !important wins everything (avoid). */
.btn { color: inherit; border: initial; } /* explicit inheritance */`
          },
          explanation: [
            'Specificity scale: inline (1,0,0,0) > ID (0,1,0,0) > class / attribute / pseudo-class (0,0,1,0) > element / pseudo-element (0,0,0,1).',
            'When specificity is tied, the LATER rule in stylesheet source order wins.',
            'Inherited by default: text properties (color, font, line-height). Box properties (margin, padding, border) do NOT inherit.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c1-q1',
          question: 'Best way to add CSS to many pages?',
          options: [
            { label: 'A', text: 'inline style' },
            { label: 'B', text: 'external stylesheet' },
            { label: 'C', text: 'style tag in every page' },
            { label: 'D', text: 'JavaScript' }
          ],
          correct: 'B',
          explanation: 'External stylesheet is cached and reusable across all pages.'
        },
        {
          id: 'css-c1-q2',
          question: 'div > p selects...',
          options: [
            { label: 'A', text: 'all p inside div' },
            { label: 'B', text: 'only direct child p of div' },
            { label: 'C', text: 'p after div' },
            { label: 'D', text: 'div and p' }
          ],
          correct: 'B',
          explanation: '> is the direct child combinator.'
        },
        {
          id: 'css-c1-q3',
          question: 'Which wins: #a or .b.c.d?',
          options: [
            { label: 'A', text: '#a' },
            { label: 'B', text: '.b.c.d' },
            { label: 'C', text: 'tie' },
            { label: 'D', text: 'neither' }
          ],
          correct: 'A',
          explanation: 'One ID (0,1,0,0) outweighs any quantity of classes (0,0,3,0).'
        }
      ],
      codeLab: {
        task: 'Select every link inside nav that is hovered and make it underline.',
        solution: `nav a:hover { text-decoration: underline; }`,
        note: 'Descendant selector combined with :hover pseudo-class.'
      },
      misunderstandings: [
        { myth: 'Later rules always win.', truth: 'Only when specificity is tied. A higher-specificity earlier rule always beats a lower-specificity later rule.' },
        { myth: '!important is a good fix for styling bugs.', truth: 'It starts an unmaintainable specificity arms race. Fix selector specificity instead.' },
        { myth: 'Margin is inherited down to child elements.', truth: 'Box model properties are never inherited.' }
      ],
      cheatSheet: [
        'rule = selector { property: value; }',
        'class . , id # , child > , descendant space',
        'specificity: inline > ID > class > element; ties broken by later rule in source',
        'inherit: text properties yes, box properties no'
      ]
    },
    {
      id: 2,
      title: 'Box Model, Units & Typography',
      subtitle: 'Sizing, spacing, colour and text',
      sections: [
        {
          heading: '2.1 The Box Model',
          codeSnippet: {
            language: 'css',
            code: `*, *::before, *::after { box-sizing: border-box; } /* standard modern reset */

.card {
  width: 300px;
  padding: 16px;       /* inside space */
  border: 2px solid #333;
  margin: 24px auto;   /* outside space; auto centres block */
  border-radius: 12px;
}
/* content-box: total width = 300 + 32 + 4 = 336px
   border-box:  total width = 300px! */`
          },
          explanation: [
            'Every HTML element is a rectangular box: content + padding + border + margin.',
            'box-sizing: border-box ensures padding and border are included inside the declared width, avoiding layout blowout.',
            'Margin collapsing: vertical margins of adjacent sibling blocks collapse into the larger margin.'
          ]
        },
        {
          heading: '2.2 Units, Colours and Backgrounds',
          codeSnippet: {
            language: 'css',
            code: `color: rgb(230 57 70);
color: rgb(0 0 0 / 50%); /* slash opacity */
background: linear-gradient(135deg, #ff8c42, #e63946);
background: url(hero.jpg) center / cover no-repeat;
box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
width: clamp(280px, 90%, 960px); /* min, preferred, max */
font-size: 1.125rem;             /* respects user OS/browser font setting */
height: 100vh;                   /* viewport height (or 100dvh for mobile) */`
          },
          explanation: [
            'px: fixed device pixels; rem: relative to root font size (1rem = 16px by default); em: relative to parent font size.',
            'clamp(min, val, max) produces fluid typography and layouts without media queries.'
          ]
        },
        {
          heading: '2.3 Typography Essentials',
          codeSnippet: {
            language: 'css',
            code: `body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6; /* unitless line height scales proportionally */
  color: #222;
}
p { max-width: 65ch; } /* ~65 characters per line = optimal reading comfort */
@font-face {
  font-family: "Inter";
  src: url(inter.woff2) format("woff2");
  font-display: swap;
}`
          },
          explanation: [
            'Use unitless line-height (1.5 - 1.7) so child headings scale properly without overlap.',
            'Limit reading paragraphs to ~65ch to optimize readability.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c2-q1',
          question: 'With box-sizing: border-box, width includes...',
          options: [
            { label: 'A', text: 'content only' },
            { label: 'B', text: 'content + padding + border' },
            { label: 'C', text: 'margin too' },
            { label: 'D', text: 'nothing' }
          ],
          correct: 'B',
          explanation: 'border-box includes padding and border within the declared width.'
        },
        {
          id: 'css-c2-q2',
          question: 'Best unit for font sizes for accessibility:',
          options: [
            { label: 'A', text: 'px' },
            { label: 'B', text: 'rem' },
            { label: 'C', text: 'vh' },
            { label: 'D', text: 'pt' }
          ],
          correct: 'B',
          explanation: 'rem scales gracefully when the user alters browser zoom/font settings.'
        },
        {
          id: 'css-c2-q3',
          question: 'margin: 0 auto on a block with fixed width...',
          options: [
            { label: 'A', text: 'hides it' },
            { label: 'B', text: 'centres it horizontally' },
            { label: 'C', text: 'adds padding' },
            { label: 'D', text: 'floats it' }
          ],
          correct: 'B',
          explanation: 'auto margins split remaining horizontal space equally.'
        }
      ],
      codeLab: {
        task: 'Make a card 320px wide including padding (20px) and a 1px border, centred.',
        solution: `.card { box-sizing: border-box; width: 320px; padding: 20px; border: 1px solid #ccc; margin: 0 auto; }`,
        note: 'border-box guarantees exact 320px total rendered width.'
      },
      misunderstandings: [
        { myth: 'px is always the best unit for fonts.', truth: 'rem respects user accessibility preferences.' },
        { myth: 'width: 100% plus padding fits nicely.', truth: 'Without border-box it causes an horizontal scrollbar overflow.' }
      ]
    },
    {
      id: 3,
      title: 'Display, Position & Overflow',
      subtitle: 'Where elements sit on the page',
      sections: [
        {
          heading: '3.1 display and Position',
          codeSnippet: {
            language: 'css',
            code: `.box    { position: static; }   /* default, in flow */
.badge  { position: relative; top: 4px; left: 8px; } /* shifted, keeps space */
.parent { position: relative; } /* sets coordinate reference */
.child  { position: absolute; top: 0; right: 0; } /* relative to nearest positioned ancestor */
.navbar { position: fixed; top: 0; width: 100%; } /* pinned to viewport */
.header { position: sticky; top: 0; z-index: 10; } /* scrolls then pins */
.modal  { position: fixed; inset: 0; z-index: 100; }`
          },
          explanation: [
            'block: full line, accepts width/height. inline: flows in text, ignores width/height. inline-block: flows inline and accepts width/height.',
            'absolute position requires a parent with position: relative (or any non-static position) to anchor its coordinates.',
            'sticky position scrolls naturally until reaching its threshold (e.g. top: 0), then sticks.'
          ]
        },
        {
          heading: '3.2 Centring Cheatsheet',
          codeSnippet: {
            language: 'css',
            code: `/* Centring in 2026 */
/* 1. Grid (both axes in 2 lines): */
.center-grid { display: grid; place-items: center; min-height: 100vh; }

/* 2. Flexbox: */
.center-flex { display: flex; justify-content: center; align-items: center; }

/* 3. Text & inline: */
.center-text { text-align: center; }

/* 4. Block with fixed/max width: */
.center-block { margin-inline: auto; max-width: 600px; }`
          },
          explanation: [
            'display: grid; place-items: center; is the cleanest modern way to centre any content in both horizontal and vertical axes.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c3-q1',
          question: 'An absolutely positioned child is placed relative to...',
          options: [
            { label: 'A', text: 'the page always' },
            { label: 'B', text: 'nearest positioned ancestor' },
            { label: 'C', text: 'its parent always' },
            { label: 'D', text: 'the viewport' }
          ],
          correct: 'B',
          explanation: 'It looks up the tree for the nearest ancestor whose position is not static.'
        },
        {
          id: 'css-c3-q2',
          question: 'display: none vs visibility: hidden:',
          options: [
            { label: 'A', text: 'identical behavior' },
            { label: 'B', text: 'none removes space, hidden keeps empty space' },
            { label: 'C', text: 'hidden removes space' },
            { label: 'D', text: 'none keeps space' }
          ],
          correct: 'B',
          explanation: 'display: none removes the node from layout entirely; visibility: hidden maintains dimensions.'
        }
      ],
      codeLab: {
        task: 'Put a small "NEW" badge in the top-right corner of a card.',
        solution: `.card { position: relative; }
.card .badge { position: absolute; top: 8px; right: 8px; }`,
        note: 'Parent relative establishes coordinate container for child absolute.'
      },
      misunderstandings: [
        { myth: 'absolute positioning is meant for general page layouts.', truth: 'Use Flexbox/Grid for layout; absolute is meant for overlays, tooltips, and badges.' },
        { myth: 'z-index works on any element.', truth: 'z-index only applies to positioned elements (or flex/grid children) and respects stacking contexts.' }
      ]
    },
    {
      id: 4,
      title: 'Flexbox',
      subtitle: 'One-dimensional layout made easy',
      sections: [
        {
          heading: '4.1 Flex Container and Items',
          codeSnippet: {
            language: 'css',
            code: `.nav {
  display: flex;
  justify-content: space-between; /* along MAIN axis */
  align-items: center;            /* along CROSS axis */
  gap: 16px;
  flex-wrap: wrap;
}
/* flex-direction: row (default) | column (swaps main and cross axes!) */
.item { flex: 1; }              /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
.fixed { flex: 0 0 200px; }     /* locked 200px width */
.logo { margin-right: auto; }   /* auto margin pushes items to the far right! */`
          },
          explanation: [
            'Flexbox operates along one dimension at a time: main axis and cross axis.',
            'justify-content aligns along the main axis. align-items aligns along the cross axis.',
            'When flex-direction: column is set, the main axis becomes vertical, so justify-content controls vertical alignment!'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c4-q1',
          question: 'With flex-direction: column, justify-content works along...',
          options: [
            { label: 'A', text: 'horizontal' },
            { label: 'B', text: 'vertical (the new main axis)' },
            { label: 'C', text: 'z-axis' },
            { label: 'D', text: 'none' }
          ],
          correct: 'B',
          explanation: 'justify-content always follows the main axis, which column makes vertical.'
        },
        {
          id: 'css-c4-q2',
          question: 'flex: 1 on all children means...',
          options: [
            { label: 'A', text: 'equal share of free space' },
            { label: 'B', text: 'width 1px' },
            { label: 'C', text: 'order 1' },
            { label: 'D', text: 'disabled' }
          ],
          correct: 'A',
          explanation: 'flex: 1 expands each child equally to fill available space.'
        }
      ],
      codeLab: {
        task: 'Build a navbar: logo left, links right, vertically centred.',
        solution: `.nav { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }`,
        note: 'justify-content: space-between pushes logo and navigation apart.'
      },
      misunderstandings: [
        { myth: 'justify-content is always horizontal.', truth: 'It follows the main axis: vertical in column direction.' },
        { myth: 'Flexbox should be used for full 2D page grids.', truth: 'Flexbox is 1D (row or column). CSS Grid is designed for 2D.' }
      ]
    },
    {
      id: 5,
      title: 'CSS Grid',
      subtitle: 'Two-dimensional rows and columns layout',
      sections: [
        {
          heading: '5.1 Grid Essentials',
          codeSnippet: {
            language: 'css',
            code: `.layout {
  display: grid;
  grid-template-columns: 200px 1fr; /* sidebar + fluid column */
  gap: 20px;
}
/* Responsive columns without a single media query: */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.wide { grid-column: span 2; }
.hero { grid-column: 1 / -1; } /* spans from line 1 to the last grid line! */`
          },
          explanation: [
            'repeat(auto-fit, minmax(240px, 1fr)) automatically reflows cards into 1, 2, 3, or more columns depending on container width.',
            'fr is a flexible unit representing a fractional share of free grid space.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c5-q1',
          question: 'repeat(3, 1fr) creates...',
          options: [
            { label: 'A', text: '3 equal columns' },
            { label: 'B', text: '3 rows only' },
            { label: 'C', text: '3px columns' },
            { label: 'D', text: 'error' }
          ],
          correct: 'A',
          explanation: 'Creates three equal fractional columns.'
        },
        {
          id: 'css-c5-q2',
          question: 'auto-fit + minmax(240px, 1fr) gives...',
          options: [
            { label: 'A', text: 'fixed 240px columns' },
            { label: 'B', text: 'as many 240px+ columns as fit' },
            { label: 'C', text: 'one column' },
            { label: 'D', text: 'rows' }
          ],
          correct: 'B',
          explanation: 'Automatically fits responsive columns without media queries.'
        }
      ],
      codeLab: {
        task: 'Make a 12-photo gallery with columns at least 150px and equal gap.',
        solution: `.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; }`,
        note: 'aspect-ratio + object-fit: cover keeps thumbnails perfectly square.'
      },
      misunderstandings: [
        { myth: 'Grid is only for complex full-page layouts.', truth: 'Grid is fantastic for simple components too (e.g. 2-line perfect centring).' }
      ]
    },
    {
      id: 6,
      title: 'Responsive Design & Media Queries',
      subtitle: 'Mobile-first styling that adapts to any screen',
      sections: [
        {
          heading: '6.1 Mobile-First and Media Queries',
          codeSnippet: {
            language: 'css',
            code: `/* base styles target mobile */
.grid { display: grid; gap: 16px; grid-template-columns: 1fr; }

/* scale upward with min-width queries */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

/* User preference queries */
@media (prefers-color-scheme: dark) {
  :root { --bg: #111; --text: #eee; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
img { max-width: 100%; height: auto; } /* fluid images */`
          },
          explanation: [
            'Mobile-first architecture: write base CSS for mobile phones without media queries, then enhance with @media (min-width: ...).',
            'Fluid images: img { max-width: 100%; height: auto; } prevents images from overflowing small screens.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c6-q1',
          question: '"Mobile-first" means writing base styles for small screens and adding...',
          options: [
            { label: 'A', text: 'max-width queries' },
            { label: 'B', text: 'min-width queries' },
            { label: 'C', text: 'no queries' },
            { label: 'D', text: 'print styles' }
          ],
          correct: 'B',
          explanation: 'min-width queries layer enhancements on top of mobile defaults.'
        }
      ],
      misunderstandings: [
        { myth: 'Responsive design requires building separate mobile websites.', truth: 'One responsive codebase adapts via CSS media queries and fluid units.' }
      ]
    },
    {
      id: 7,
      title: 'Effects, Variables & Modern CSS',
      subtitle: 'Transitions, GPU animations, custom properties and modern selectors',
      sections: [
        {
          heading: '7.1 Transitions & GPU Animations',
          codeSnippet: {
            language: 'css',
            code: `.btn {
  background: #2a9df4;
  transition: transform .2s ease, background .2s;
}
.btn:hover {
  transform: translateY(-2px) scale(1.04);
  background: #1b7fd0;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
.heart { animation: pulse 1.2s ease-in-out infinite; }
/* Animate transform and opacity: they render on GPU without layout re-flow! */`
          },
          explanation: [
            'Only animate transform and opacity for buttery 60fps animations. Avoid animating width, height, top, left, or margin as they trigger costly layout repaints.'
          ]
        },
        {
          heading: '7.2 Custom Properties (:root variables) & :has()',
          codeSnippet: {
            language: 'css',
            code: `:root {
  --brand: #e63946;
  --radius: 12px;
  --space: 1rem;
}
.card {
  background: var(--bg, white);
  border: 2px solid var(--brand);
  border-radius: var(--radius);
}
.dark { --bg: #14213d; --text: #fff; }

/* The parent selector :has() */
.field:has(input:invalid) { border-color: red; }`
          },
          explanation: [
            'CSS custom properties (--var) cascade and can be updated locally in any class or dark mode selector.',
            ':has() is the native parent selector: targets an element based on its descendants!'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'css-c7-q1',
          question: 'CSS variables are declared as...',
          options: [
            { label: 'A', text: '$name' },
            { label: 'B', text: '--name' },
            { label: 'C', text: '@name' },
            { label: 'D', text: 'var-name' }
          ],
          correct: 'B',
          explanation: 'CSS variables begin with double-dash --.'
        },
        {
          id: 'css-c7-q2',
          question: 'Which CSS properties animate smoothest on GPU?',
          options: [
            { label: 'A', text: 'width' },
            { label: 'B', text: 'top' },
            { label: 'C', text: 'transform, opacity' },
            { label: 'D', text: 'margin' }
          ],
          correct: 'C',
          explanation: 'transform and opacity avoid CPU layout reflow.'
        }
      ],
      codeLab: {
        task: 'Create a theme switch using CSS variables: light and dark.',
        solution: `:root { --bg: #fff; --text: #111; }
[data-theme="dark"] { --bg: #111; --text: #eee; }
body { background: var(--bg); color: var(--text); }`,
        note: 'Toggle data-theme attribute on document root in JavaScript.'
      },
      misunderstandings: [
        { myth: 'Animating top and left is completely fine.', truth: 'It triggers geometry reflow on every frame. Use transform: translate() instead.' }
      ]
    }
  ],
  problems20: [
    { id: 1, title: 'Centre Div in Viewport', problem: 'Centre a div both ways in the viewport in 2 lines.', solution: 'body { min-height: 100vh; display: grid; place-items: center; }' },
    { id: 2, title: 'Universal Border-Box Reset', problem: 'Reset margins and make box sizing predictable.', solution: '*, *::before, *::after { box-sizing: border-box; margin: 0; }' },
    { id: 3, title: 'Style External Links Only', problem: 'Target external links with attribute selector.', solution: 'a[href^="http"] { color: crimson; }' },
    { id: 4, title: 'Zebra-Stripe Table Rows', problem: 'Alternate row background colors in a table.', solution: 'tr:nth-child(even) { background: #f2f2f2; }' },
    { id: 5, title: 'Round Avatar Image 80px', problem: 'Make a perfectly round avatar with aspect-fill.', solution: '.avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }' },
    { id: 6, title: 'Sticky Header with Shadow', problem: 'Navbar sticky to top with shadow.', solution: 'header { position: sticky; top: 0; background: #fff; box-shadow: 0 2px 6px rgb(0 0 0 / .1); }' },
    { id: 7, title: 'Truncate Long Text with Ellipsis', problem: 'Single-line text truncation with "...".', solution: '.t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' },
    { id: 8, title: 'Equal-Height Cards in Flex Row', problem: 'Cards in a flex row matching heights.', solution: '.row { display: flex; gap: 16px; }\n.row > .card { flex: 1; }' },
    { id: 9, title: 'Three-Column Grid with 20px Gap', problem: 'Grid with three equal columns and 20px spacing.', solution: '.g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }' },
    { id: 10, title: 'Sidebar + Fluid Main Layout', problem: 'Sidebar 250px and remaining fluid content.', solution: '.layout { display: grid; grid-template-columns: 250px 1fr; }' },
    { id: 11, title: 'Button Smooth Hover Lift', problem: 'Smooth hover translateY lift with transition.', solution: '.btn { transition: transform .2s; }\n.btn:hover { transform: translateY(-3px); }' },
    { id: 12, title: 'Hide Mobile, Show Desktop', problem: 'Hide sidebar on phone, display at 768px+.', solution: '.sidebar { display: none; }\n@media (min-width: 768px) { .sidebar { display: block; } }' },
    { id: 13, title: 'Gradient Text Colour', problem: 'Gradient text using background-clip.', solution: 'h1 { background: linear-gradient(90deg, #ff8c42, #e63946); -webkit-background-clip: text; background-clip: text; color: transparent; }' },
    { id: 14, title: 'Fixed 16:9 Video Box', problem: 'Responsive 16:9 container using aspect-ratio.', solution: '.video { aspect-ratio: 16 / 9; width: 100%; }' },
    { id: 15, title: 'Visible Keyboard Focus Indicator', problem: 'Outline visible only when tabbing by keyboard.', solution: ':focus-visible { outline: 3px solid #2a9df4; outline-offset: 2px; }' },
    { id: 16, title: 'Loading Spinner Animation', problem: 'Pure CSS spinning circle loader.', solution: '.spin { width: 32px; height: 32px; border: 4px solid #ddd; border-top-color: #2a9df4; border-radius: 50%; animation: s 1s linear infinite; }\n@keyframes s { to { transform: rotate(360deg); } }' },
    { id: 17, title: 'Sticky Footer on Short Pages', problem: 'Flexbox column body keeping footer stuck at bottom.', solution: 'body { min-height: 100vh; display: flex; flex-direction: column; }\nmain { flex: 1; }' },
    { id: 18, title: 'Card Hover Shadow Elevation', problem: 'Smooth transition from subtle to deep elevation shadow.', solution: '.card { box-shadow: 0 2px 6px rgb(0 0 0 / .1); transition: box-shadow .2s; }\n.card:hover { box-shadow: 0 10px 24px rgb(0 0 0 / .2); }' },
    { id: 19, title: 'Dark Mode Preference Query', problem: 'System-level dark mode media query.', solution: '@media (prefers-color-scheme: dark) { body { background: #111; color: #eee; } }' },
    { id: 20, title: 'Fluid Typography Scale', problem: 'Fluid heading scaling between 1.75rem and 3.5rem.', solution: 'h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }' }
  ],
  finalBoss: [
    {
      id: 1,
      question: 'Highest specificity selector:',
      options: [{ label: 'A', text: '.a .b' }, { label: 'B', text: '#x' }, { label: 'C', text: 'div p' }, { label: 'D', text: 'p' }],
      correct: 'B',
      explanation: '#x is an ID selector (0,1,0,0) which beats any number of classes.'
    },
    {
      id: 2,
      question: 'Default browser box-sizing is...',
      options: [{ label: 'A', text: 'border-box' }, { label: 'B', text: 'content-box' }, { label: 'C', text: 'padding-box' }, { label: 'D', text: 'margin-box' }],
      correct: 'B',
      explanation: 'HTML defaults to content-box where padding adds to declared width.'
    },
    {
      id: 3,
      question: 'Flexbox default main axis direction:',
      options: [{ label: 'A', text: 'vertical' }, { label: 'B', text: 'horizontal (row)' }, { label: 'C', text: 'diagonal' }, { label: 'D', text: 'none' }],
      correct: 'B',
      explanation: 'flex-direction defaults to row.'
    },
    {
      id: 4,
      question: 'Responsive grid columns without media queries:',
      options: [{ label: 'A', text: 'repeat(auto-fit, minmax(...))' }, { label: 'B', text: 'float' }, { label: 'C', text: 'table' }, { label: 'D', text: 'display: inline' }],
      correct: 'A',
      explanation: 'repeat(auto-fit, minmax(...)) automatically creates wrapping columns.'
    },
    {
      id: 5,
      question: 'Vertical margins between block siblings may...',
      options: [{ label: 'A', text: 'collapse' }, { label: 'B', text: 'double' }, { label: 'C', text: 'disappear always' }, { label: 'D', text: 'be negative only' }],
      correct: 'A',
      explanation: 'Adjacent vertical margins collapse into the maximum value.'
    },
    {
      id: 6,
      question: 'Which property is NOT inherited by child elements?',
      options: [{ label: 'A', text: 'color' }, { label: 'B', text: 'font-family' }, { label: 'C', text: 'border' }, { label: 'D', text: 'line-height' }],
      correct: 'C',
      explanation: 'border belongs to the box model and is never inherited.'
    },
    {
      id: 7,
      question: 'position: sticky requires at least one...',
      options: [{ label: 'A', text: 'top/bottom threshold offset' }, { label: 'B', text: 'display: none' }, { label: 'C', text: 'overflow: scroll' }, { label: 'D', text: 'float' }],
      correct: 'A',
      explanation: 'sticky requires a threshold like top: 0 to activate pinning.'
    },
    {
      id: 8,
      question: 'Unit relative to root font size:',
      options: [{ label: 'A', text: 'em' }, { label: 'B', text: 'rem' }, { label: 'C', text: 'vw' }, { label: 'D', text: 'ch' }],
      correct: 'B',
      explanation: 'rem = root em.'
    },
    {
      id: 9,
      question: 'Which is a pseudo-element?',
      options: [{ label: 'A', text: '::after' }, { label: 'B', text: ':hover' }, { label: 'C', text: ':focus' }, { label: 'D', text: ':checked' }],
      correct: 'A',
      explanation: '::after creates a virtual pseudo-element in the DOM.'
    },
    {
      id: 10,
      question: 'Best properties for high-performance 60fps animations:',
      options: [{ label: 'A', text: 'transform, opacity' }, { label: 'B', text: 'width, height' }, { label: 'C', text: 'left, top' }, { label: 'D', text: 'margin' }],
      correct: 'A',
      explanation: 'transform and opacity are composited directly on the GPU.'
    }
  ],
  bugDictionary: [
    { bug: 'My CSS style is ignored', causeAndFix: 'A higher-specificity rule overrides it, a typo in property name, or stylesheet is not linked. Inspect computed styles in DevTools.' },
    { bug: 'Horizontal scrollbar unexpectedly appears', causeAndFix: 'An element is wider than the viewport (e.g. width: 100% + padding without border-box, or 100vw including scrollbar width).' },
    { bug: 'z-index does nothing', causeAndFix: 'Element is static (needs position: relative/absolute/sticky/fixed) or is trapped within an ancestor stacking context.' },
    { bug: 'Child overflows flex parent', causeAndFix: 'Flex items have min-width: auto by default. Add min-width: 0 to the flex child.' },
    { bug: 'Parent collapses to 0 height', causeAndFix: 'Children are all floated or absolutely positioned. Use Flexbox/Grid or overflow: auto on parent.' },
    { bug: 'Vertical centring fails', causeAndFix: 'Parent container lacks height. Set min-height: 100vh or explicit height when using flex/grid centring.' }
  ]
};
