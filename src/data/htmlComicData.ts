import { WebDevBook } from '../types/webDevComicTypes';

export const htmlComicData: WebDevBook = {
  id: 'html',
  title: 'HTML: The Structure of the Web',
  badge: 'Comic Classic',
  color: '#EA580C',
  accentBg: 'bg-orange-500/10',
  accentBorder: 'border-orange-500',
  tagline: 'From first tag to accessible, semantic pages',
  description: 'The skeleton of every web page. Master modern HTML5, DOM anatomy, forms, semantic layout, SEO head tags, accessibility (a11y), and 20 classic build challenges.',
  gangNotes: {
    tuple: 'HTML is the skeleton of every web page. By the end you will build clean, accessible pages.',
    sam: 'I ask the "dumb" questions so you don’t have to. They are never dumb!',
    nully: 'Boo! In HTML I appear as the empty alt text, the missing label, the page with no title... things you forgot!',
    bugsy: 'Unclosed tags, missing alt text, divs everywhere: that is my snack. Learn semantics and I starve!'
  },
  chapters: [
    {
      id: 1,
      title: 'How the Web Works & HTML Basics',
      subtitle: 'Browsers, tags, attributes, the DOM and text elements',
      sections: [
        {
          heading: '1.1 The Web in 60 Seconds',
          explanation: [
            'Your browser (client) sends an HTTP request to a server. The server replies with an HTML file. The browser reads it, asks for the CSS, JavaScript and images it mentions, builds the DOM tree, and paints the page.',
            'HTML (HyperText Markup Language) = the structure and meaning of content.',
            'CSS = how it looks. JavaScript = how it behaves. Think: skeleton, clothes, muscles.',
            'URL = address: https://example.com:443/path?x=1#top (scheme, host, port, path, query, fragment).',
            'HTML is markup, not a programming language: it describes, it does not calculate.'
          ]
        },
        {
          heading: '1.2 Anatomy: Tags, Elements, Attributes and the DOM',
          codeSnippet: {
            language: 'html',
            code: `<!DOCTYPE html> <!-- tells the browser: modern HTML5 -->
<html lang="en"> <!-- root element; lang helps screen readers -->
<head>
  <meta charset="UTF-8"> <!-- character encoding -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My First Page</title> <!-- shown in browser tab -->
</head>
<body>
  <h1>Hello, web!</h1>
  <p>This is a <strong>paragraph</strong>.</p>
  <img src="cat.jpg" alt="A grey cat sleeping on a sofa">
</body>
</html>`
          },
          explanation: [
            'Opening tag starts the element (<p>), closing tag ends it with a slash (</p>).',
            'Element = opening tag + content + closing tag.',
            'Attribute = extra info as name="value" (e.g. class="intro").',
            'Void element = <img>, <br>, <hr>, <input> - no content, no closing tag.',
            'Nesting = close inner tags first before outer tags.'
          ],
          bullets: [
            'The DOM (Document Object Model) is the live tree the browser builds from your HTML. JavaScript and CSS work on this tree, not on the text file.',
            'Browsers forgive mistakes (they guess and repair), so a broken page may "work" and then break elsewhere. Always close tags and validate with the W3C validator.'
          ]
        },
        {
          heading: '1.3 Text Content Elements',
          codeSnippet: {
            language: 'html',
            code: `<h1>Main heading (one per page)</h1>
<h2>Section heading</h2> <h3>Sub-section</h3> <!-- h1 to h6, never skip levels for looks -->
<p>A paragraph. <strong>Important</strong> and <em>emphasised</em> text,
  <mark>highlighted</mark>, <small>fine print</small>, H<sub>2</sub>O, x<sup>2</sup>, <code>code()</code>.</p>
<br> <!-- line break -->
<hr> <!-- thematic break -->
<blockquote cite="https://example.com">A quotation block.</blockquote>
<pre>  preformatted
  text keeps spaces</pre>
<p>Use &lt; &gt; &amp; &copy; for special characters.</p>`
          },
          explanation: [
            'Meaning over looks: strong = important meaning (not just bold); em = stress emphasis (not just italic).',
            'h1 through h6 build the outline for screen readers and search engines. Never use headings just to make text bigger!'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'html-c1-q1',
          question: 'HTML mainly describes a page’s...',
          options: [
            { label: 'A', text: 'behaviour' },
            { label: 'B', text: 'structure and meaning' },
            { label: 'C', text: 'colours only' },
            { label: 'D', text: 'database' }
          ],
          correct: 'B',
          explanation: 'Structure/meaning; CSS styles; JS adds behaviour.'
        },
        {
          id: 'html-c1-q2',
          question: 'The browser receives HTML from the...',
          options: [
            { label: 'A', text: 'client' },
            { label: 'B', text: 'server' },
            { label: 'C', text: 'compiler' },
            { label: 'D', text: 'router only' }
          ],
          correct: 'B',
          explanation: 'The server answers the HTTP GET request.'
        },
        {
          id: 'html-c1-q3',
          question: 'In https://a.com/x?id=5#top, "id=5" is the...',
          options: [
            { label: 'A', text: 'fragment' },
            { label: 'B', text: 'query string' },
            { label: 'C', text: 'host' },
            { label: 'D', text: 'scheme' }
          ],
          correct: 'B',
          explanation: 'After ? comes the query string; #top is the fragment.'
        },
        {
          id: 'html-c1-q4',
          question: 'Which is a void (self-contained) element?',
          options: [
            { label: 'A', text: '<p>' },
            { label: 'B', text: '<div>' },
            { label: 'C', text: '<br>' },
            { label: 'D', text: '<ul>' }
          ],
          correct: 'C',
          explanation: '<br> has no content or closing tag.'
        },
        {
          id: 'html-c1-q5',
          question: '<!DOCTYPE html> is...',
          options: [
            { label: 'A', text: 'an HTML tag with children' },
            { label: 'B', text: 'a declaration choosing HTML5 mode' },
            { label: 'C', text: 'a comment' },
            { label: 'D', text: 'a script' }
          ],
          correct: 'B',
          explanation: 'It selects HTML5 standards mode in modern browsers.'
        },
        {
          id: 'html-c1-q6',
          question: 'How many <h1> should a page normally have?',
          options: [
            { label: 'A', text: '0' },
            { label: 'B', text: '1' },
            { label: 'C', text: '6' },
            { label: 'D', text: 'unlimited' }
          ],
          correct: 'B',
          explanation: 'One main heading per document is the accessibility best practice.'
        }
      ],
      codeLab: {
        task: 'Write a minimal valid page titled "Profile" with an h1 of your name.',
        solution: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Profile</title></head>
<body><h1>Asha Patil</h1></body>
</html>`,
        note: 'DOCTYPE, html, head (charset + title), body: the four essentials.'
      },
      misunderstandings: [
        { myth: 'HTML is a programming language.', truth: 'It is a markup language: no logic, loops or variables.' },
        { myth: 'I can use h1 to h6 to make text bigger.', truth: 'Headings are for semantic document structure. Use CSS for size.' },
        { myth: 'Browsers show errors for bad HTML.', truth: 'Browsers silently repair bad HTML, hiding bugs that break accessibility.' },
        { myth: 'Extra spaces and line breaks show on page.', truth: 'Whitespace collapses to one space. Use <br>, CSS or <pre>.' }
      ],
      cheatSheet: [
        'Page = DOCTYPE + html + head + body.',
        'Element = tag + attributes + content; void elements have no closing tag.',
        'DOM = tree built from HTML.',
        'One h1; headings in hierarchical order.',
        'strong/em carry meaning, b/i are visual styles.'
      ]
    },
    {
      id: 2,
      title: 'Links, Images, Lists, Tables & Media',
      subtitle: 'Connecting pages and presenting structured media',
      sections: [
        {
          heading: '2.1 Links and Images',
          codeSnippet: {
            language: 'html',
            code: `<a href="about.html">Relative link (same site)</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External, new tab</a>
<a href="#contact">Jump to element with id="contact"</a>
<a href="mailto:hi@example.com">Email</a> <a href="tel:+911234567890">Call</a>
<a href="report.pdf" download>Download</a>

<img src="images/cat.jpg" alt="Grey cat on a sofa" width="400" height="300" loading="lazy">
<img src="decor.svg" alt=""> <!-- purely decorative: EMPTY alt -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Mountain at sunrise">
</picture>
<figure><img src="chart.png" alt="Sales rose 20% in March"><figcaption>Sales, Q1</figcaption></figure>`
          },
          explanation: [
            'Relative paths: img/cat.jpg (from folder), ../img/cat.jpg (up one), /img/cat.jpg (from root).',
            'Always write alt: read by screen readers, displayed if image fails, indexed by search engines.',
            'Decorative images get alt="", never a missing attribute. Add rel="noopener" with target="_blank" for security.'
          ]
        },
        {
          heading: '2.2 Lists and Tables',
          codeSnippet: {
            language: 'html',
            code: `<ul><li>Apples</li><li>Bananas</li></ul> <!-- unordered -->
<ol start="3" reversed><li>Third</li><li>Second</li></ol>
<dl><dt>HTML</dt><dd>HyperText Markup Language</dd></dl> <!-- description list -->

<table>
  <caption>Marks, Term 1</caption>
  <thead><tr><th scope="col">Name</th><th scope="col">Maths</th><th scope="col">Science</th></tr></thead>
  <tbody>
    <tr><td>Anu</td><td>92</td><td>88</td></tr>
    <tr><td>Bala</td><td colspan="2">Absent</td></tr>
  </tbody>
  <tfoot><tr><td>Average</td><td>92</td><td>88</td></tr></tfoot>
</table>`
          },
          explanation: [
            'Do not use tables for page layout (that was the 1990s). Tables are for data; layout belongs in CSS Flexbox/Grid.',
            'Use <caption>, <thead>, <tbody>, <tfoot>, and <th scope="col"> so screen readers can interpret tabular data.'
          ]
        },
        {
          heading: '2.3 Audio, Video and Embeds',
          codeSnippet: {
            language: 'html',
            code: `<video controls width="480" poster="thumb.jpg" preload="metadata">
  <source src="clip.mp4" type="video/mp4">
  <source src="clip.webm" type="video/webm">
  <track kind="captions" src="en.vtt" srclang="en" label="English">
  Your browser does not support video.
</video>
<audio controls src="song.mp3"></audio>
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Course intro video" loading="lazy" allowfullscreen></iframe>`
          },
          explanation: [
            'controls attribute shows play, pause, and volume buttons.',
            '<iframe> requires a descriptive title attribute for screen readers to announce its purpose.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'html-c2-q1',
          question: 'Which attribute gives alternative text for images?',
          options: [
            { label: 'A', text: 'title' },
            { label: 'B', text: 'alt' },
            { label: 'C', text: 'src' },
            { label: 'D', text: 'name' }
          ],
          correct: 'B',
          explanation: 'alt attribute provides accessible alternative text.'
        },
        {
          id: 'html-c2-q2',
          question: 'href="#top" links to...',
          options: [
            { label: 'A', text: 'another site' },
            { label: 'B', text: 'an element with id="top" on this page' },
            { label: 'C', text: 'a file' },
            { label: 'D', text: 'email' }
          ],
          correct: 'B',
          explanation: '# denotes a fragment identifier pointing to an element id.'
        },
        {
          id: 'html-c2-q3',
          question: 'Best alt for a purely decorative border image:',
          options: [
            { label: 'A', text: 'alt="image"' },
            { label: 'B', text: 'alt="border"' },
            { label: 'C', text: 'alt=""' },
            { label: 'D', text: 'no alt' }
          ],
          correct: 'C',
          explanation: 'Empty alt="" tells screen readers to gracefully skip decorative graphics.'
        },
        {
          id: 'html-c2-q4',
          question: 'To merge two columns in a table cell use...',
          options: [
            { label: 'A', text: 'rowspan' },
            { label: 'B', text: 'colspan' },
            { label: 'C', text: 'merge' },
            { label: 'D', text: 'span' }
          ],
          correct: 'B',
          explanation: 'colspan merges horizontal columns.'
        }
      ],
      codeLab: {
        task: 'Make a clickable logo image that goes to the homepage.',
        solution: `<a href="/"><img src="logo.svg" alt="Acme home" width="120" height="40"></a>`,
        note: 'The alt text becomes the link’s accessible name.'
      },
      misunderstandings: [
        { myth: 'Links always open in a new tab with target.', truth: 'Default is the same tab (_self); target="_blank" opens a new tab.' },
        { myth: 'A missing alt is the same as alt="".', truth: 'Missing alt causes screen readers to read the full file path; empty alt skips it cleanly.' },
        { myth: 'Use <br> for spacing between sections.', truth: 'Never use <br> for layout; use CSS margin and padding.' }
      ],
      cheatSheet: [
        'a href: relative, absolute, #id, mailto, tel.',
        'img src + alt (+ width/height for layout stability).',
        'ul/ol/li, dl/dt/dd for lists.',
        'table: caption, thead, tbody, th, td, colspan.',
        'video controls + track captions.'
      ]
    },
    {
      id: 3,
      title: 'Forms & User Input',
      subtitle: 'Collecting user data the accessible and robust way',
      sections: [
        {
          heading: '3.1 Form Basics and Input Types',
          codeSnippet: {
            language: 'html',
            code: `<form action="/signup" method="post">
  <label for="name">Full name</label>
  <input type="text" id="name" name="name" required minlength="2" placeholder="Asha Patil">

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="pw">Password</label>
  <input type="password" id="pw" name="pw" minlength="8" required autocomplete="new-password">

  <fieldset><legend>Plan</legend>
    <label><input type="radio" name="plan" value="free" checked> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
  </fieldset>

  <label><input type="checkbox" name="terms" required> I accept the terms</label>
  <select id="city" name="city">
    <option value="">Choose...</option>
    <option>Pune</option><option>Delhi</option>
  </select>
  <button type="submit">Create account</button>
</form>`
          },
          explanation: [
            'name: the key sent to the server. No name attribute = data is not submitted!',
            'id + <label for>: connects the label so clicking the text focuses the input.',
            'method="get" puts data in URL query parameters (searches); method="post" puts data in request body (passwords, mutating data).',
            'Always validate on the server: HTML client-side validation can easily be bypassed by users.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'html-c3-q1',
          question: 'An input without a name attribute...',
          options: [
            { label: 'A', text: 'is sent normally' },
            { label: 'B', text: 'is not submitted' },
            { label: 'C', text: 'is invalid' },
            { label: 'D', text: 'is hidden' }
          ],
          correct: 'B',
          explanation: 'Only named form controls are submitted in the form payload.'
        },
        {
          id: 'html-c3-q2',
          question: 'Radio buttons in one group share the same...',
          options: [
            { label: 'A', text: 'id' },
            { label: 'B', text: 'name' },
            { label: 'C', text: 'value' },
            { label: 'D', text: 'type' }
          ],
          correct: 'B',
          explanation: 'Same name groups radio buttons so only one can be checked at a time.'
        },
        {
          id: 'html-c3-q3',
          question: '<label for="x"> links to the element with...',
          options: [
            { label: 'A', text: 'name="x"' },
            { label: 'B', text: 'id="x"' },
            { label: 'C', text: 'class="x"' },
            { label: 'D', text: 'type="x"' }
          ],
          correct: 'B',
          explanation: 'The for attribute matches the target input id.'
        }
      ],
      codeLab: {
        task: 'Build a login form with email, password and a "remember me" checkbox, POSTing to /login.',
        solution: `<form action="/login" method="post">
  <label for="e">Email</label><input type="email" id="e" name="email" required>
  <label for="p">Password</label><input type="password" id="p" name="password" required>
  <label><input type="checkbox" name="remember"> Remember me</label>
  <button>Log in</button>
</form>`,
        note: 'Every field has a label and a name.'
      },
      misunderstandings: [
        { myth: 'Placeholder can replace a label.', truth: 'Placeholders disappear when typing and fail accessibility requirements. Always use <label>.' },
        { myth: 'HTML validation makes my form secure.', truth: 'Client checks can be bypassed in DevTools; always re-validate on the server.' },
        { myth: 'Use GET for passwords.', truth: 'GET logs passwords in browser history and server access logs. Always use POST.' }
      ]
    },
    {
      id: 4,
      title: 'Semantic HTML & Accessibility',
      subtitle: 'Meaningful tags and pages everyone can use',
      sections: [
        {
          heading: '4.1 Semantic Layout',
          codeSnippet: {
            language: 'html',
            code: `<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <h1>Daily Bytes</h1>
    <nav aria-label="Main"><ul><li><a href="/">Home</a></li><li><a href="/blog" aria-current="page">Blog</a></li></ul></nav>
  </header>
  <main id="main">
    <article>
      <h2>Why semantics matter</h2>
      <p>Posted <time datetime="2025-03-15">15 March 2025</time></p>
      <section><h3>Reason one</h3><p>...</p></section>
    </article>
    <aside><h2>Related Articles</h2></aside>
  </main>
  <footer><p>&copy; 2025 Daily Bytes</p></footer>
</body>`
          },
          explanation: [
            'header / footer: introductory or closing content.',
            'nav: major site navigation links.',
            'main: unique primary content (one per page).',
            'article: self-contained piece (blog post, product card).',
            'section: thematic grouping with a heading.',
            'aside: complementary secondary information.',
            'div / span: non-semantic fallback containers solely for CSS styling.'
          ]
        },
        {
          heading: '4.2 Accessibility (a11y) Essentials',
          codeSnippet: {
            language: 'html',
            code: `<button aria-expanded="false" aria-controls="menu">Menu</button> <!-- state for assistive tech -->
<div role="alert">Saved successfully</div> <!-- announced immediately -->
<button aria-label="Close dialog">✕</button> <!-- name for icon-only button -->

<!-- BAD: not keyboard focusable, no button role -->
<div onclick="go()">Click me</div>

<!-- GOOD: natively accessible -->
<button onclick="go()">Click me</button>`
          },
          explanation: [
            'Keyboard accessibility: everything actionable must be usable by Tab / Enter / Space. Use real <button> and <a> tags.',
            'Contrast: WCAG AA requires at least 4.5:1 for standard text.',
            'First rule of ARIA: Do NOT use ARIA when native HTML tags already provide the semantic behavior!'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'html-c4-q1',
          question: 'Which element should appear only once per page?',
          options: [
            { label: 'A', text: '<section>' },
            { label: 'B', text: '<main>' },
            { label: 'C', text: '<article>' },
            { label: 'D', text: '<div>' }
          ],
          correct: 'B',
          explanation: '<main> represents the unique central content of the document.'
        },
        {
          id: 'html-c4-q2',
          question: 'Minimum normal-text contrast under WCAG AA is...',
          options: [
            { label: 'A', text: '2:1' },
            { label: 'B', text: '3:1' },
            { label: 'C', text: '4.5:1' },
            { label: 'D', text: '10:1' }
          ],
          correct: 'C',
          explanation: 'WCAG AA requires 4.5:1 contrast for regular body text.'
        },
        {
          id: 'html-c4-q3',
          question: 'aria-label is used for...',
          options: [
            { label: 'A', text: 'styling' },
            { label: 'B', text: 'giving an accessible name to screen readers' },
            { label: 'C', text: 'SEO' },
            { label: 'D', text: 'speed' }
          ],
          correct: 'B',
          explanation: 'aria-label gives accessible names to controls lacking visible text.'
        }
      ],
      codeLab: {
        task: 'Fix: <div class="btn" onclick="save()">Save</div>',
        solution: `<button type="button" class="btn" onclick="save()">Save</button>`,
        note: 'Focusable, Enter/Space keybindings work out-of-the-box, announced as a button to screen readers.'
      },
      misunderstandings: [
        { myth: 'ARIA makes any element accessible.', truth: 'ARIA only adds labels/roles; it adds NO keyboard behavior. Prefer native elements.' },
        { myth: 'Accessibility is only for blind users.', truth: 'It helps keyboard navigators, motor impaired, temporary injuries, and users in direct sunlight.' },
        { myth: 'div and span are forbidden.', truth: 'They are completely fine when no semantic landmark tag fits.' }
      ]
    },
    {
      id: 5,
      title: 'Head, SEO & Modern Best Practices',
      subtitle: 'Metadata, social cards, scripts and HTML5 interactive elements',
      sections: [
        {
          heading: '5.1 The head: Metadata, SEO and Sharing',
          codeSnippet: {
            language: 'html',
            code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HTML Comic Classic | Learn Web Basics</title>
  <meta name="description" content="A friendly guide to HTML with diagrams and quizzes.">
  <link rel="canonical" href="https://example.com/html-guide">
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="styles.css">
  <meta property="og:title" content="HTML Comic Classic"> <!-- OpenGraph social card -->
  <meta property="og:image" content="https://example.com/cover.png">
  <script src="app.js" defer></script> <!-- defer: run after HTML is parsed -->
</head>`
          },
          explanation: [
            'viewport meta tag is critical for responsive mobile rendering.',
            'defer downloads scripts in parallel and executes them in order after DOM parsing completes without blocking rendering.'
          ]
        },
        {
          heading: '5.2 Handy Modern Elements',
          codeSnippet: {
            language: 'html',
            code: `<details><summary>Click to expand</summary><p>Hidden content, no JavaScript needed!</p></details>
<dialog id="dlg"><p>Hello!</p><form method="dialog"><button>Close</button></form></dialog>
<progress value="70" max="100">70%</progress>
<meter value="0.6">60%</meter>
<div data-user-id="42" data-role="admin"></div>
<input list="langs"><datalist id="langs"><option value="HTML"><option value="CSS"></datalist>`
          },
          explanation: [
            '<details> & <summary> create native collapsible accordion panels without a single line of JavaScript.',
            '<dialog> provides accessible modal dialogs with backdrop support.',
            'data-* custom attributes can be easily read in JavaScript via element.dataset.'
          ]
        }
      ],
      mcqZone: [
        {
          id: 'html-c5-q1',
          question: 'The viewport meta tag is essential for...',
          options: [
            { label: 'A', text: 'colours' },
            { label: 'B', text: 'responsive mobile layout' },
            { label: 'C', text: 'fonts' },
            { label: 'D', text: 'forms' }
          ],
          correct: 'B',
          explanation: 'It configures mobile screen scaling to width=device-width.'
        },
        {
          id: 'html-c5-q2',
          question: 'Script attribute that runs after parsing without blocking:',
          options: [
            { label: 'A', text: 'async only' },
            { label: 'B', text: 'defer' },
            { label: 'C', text: 'lazy' },
            { label: 'D', text: 'wait' }
          ],
          correct: 'B',
          explanation: 'defer executes scripts in order after DOM parsing finishes.'
        }
      ],
      misunderstandings: [
        { myth: 'Meta keywords boost modern SEO.', truth: 'Major search engines completely ignore meta keywords.' },
        { myth: 'id attribute can repeat across elements.', truth: 'IDs must be globally unique per page.' },
        { myth: 'async and defer are identical.', truth: 'async executes immediately upon download; defer waits for parsing and preserves order.' }
      ]
    }
  ],
  problems20: [
    { id: 1, title: 'Create Page Skeleton', problem: 'Create a page with title "Hello" and one heading.', solution: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Hello</title></head><body><h1>Hello</h1></body></html>' },
    { id: 2, title: 'Bold & Italic Text', problem: 'Make a paragraph with bold and italic words.', solution: '<p>This is <strong>bold</strong> and <em>italic</em>.</p>' },
    { id: 3, title: 'Safe External Link', problem: 'Link to https://example.com that opens in a new tab safely.', solution: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a>' },
    { id: 4, title: 'Lazy Image with Alt', problem: 'Insert an image with correct alt, dimensions and lazy loading.', solution: '<img src="dog.jpg" alt="Brown dog catching a ball" width="300" height="200" loading="lazy">' },
    { id: 5, title: 'Unordered List', problem: 'Unordered list of three fruits.', solution: '<ul><li>Apple</li><li>Mango</li><li>Banana</li></ul>' },
    { id: 6, title: 'Ordered Steps from 5', problem: 'Ordered list of steps starting at 5.', solution: '<ol start="5"><li>Mix</li><li>Bake</li></ol>' },
    { id: 7, title: 'Section Jump Anchor', problem: 'A link that jumps to a section further down.', solution: '<a href="#faq">FAQ</a> ... <h2 id="faq">FAQ</h2>' },
    { id: 8, title: 'Data Table with Header', problem: 'Table with header row and 2 data rows.', solution: '<table><tr><th>Item</th><th>Qty</th></tr><tr><td>Pen</td><td>3</td></tr><tr><td>Book</td><td>1</td></tr></table>' },
    { id: 9, title: 'Column Span Cell', problem: 'Cell spanning two columns in a table.', solution: '<td colspan="2">Total</td>' },
    { id: 10, title: 'Labeled Input with Placeholder', problem: 'Text input with an associated label and placeholder.', solution: '<label for="u">User</label><input id="u" name="user" placeholder="asha01">' },
    { id: 11, title: 'Radio Size Selector', problem: 'Radio group for size choice S/M/L sharing one name.', solution: '<label><input type="radio" name="size" value="S"> S</label>\n<label><input type="radio" name="size" value="M"> M</label>\n<label><input type="radio" name="size" value="L"> L</label>' },
    { id: 12, title: 'City Dropdown', problem: 'Dropdown with three cities.', solution: '<select name="city"><option>Pune</option><option>Delhi</option><option>Goa</option></select>' },
    { id: 13, title: 'Required Email Input', problem: 'An email input required before submission.', solution: '<input type="email" name="email" required>' },
    { id: 14, title: 'Multi-line Textarea', problem: 'Textarea of 5 rows with name.', solution: '<textarea name="note" rows="5"></textarea>' },
    { id: 15, title: 'Semantic Page Skeleton', problem: 'Semantic page skeleton with landmark tags.', solution: '<header></header><nav></nav><main><article></article></main><footer></footer>' },
    { id: 16, title: 'Accessible Video Embed', problem: 'Embed a YouTube video accessibly with title.', solution: '<iframe src="https://www.youtube.com/embed/ID" title="Intro video" allowfullscreen></iframe>' },
    { id: 17, title: 'Video with Captions Track', problem: 'HTML5 video element with caption subtitles.', solution: '<video controls><source src="a.mp4" type="video/mp4"><track kind="captions" src="en.vtt" srclang="en"></video>' },
    { id: 18, title: 'Accordion FAQ Item', problem: 'Collapsible FAQ accordion with native HTML5.', solution: '<details><summary>What is HTML?</summary><p>A markup language.</p></details>' },
    { id: 19, title: 'Accessible Icon Button', problem: 'Icon-only close button accessible to screen readers.', solution: '<button type="button" aria-label="Close">✕</button>' },
    { id: 20, title: 'Mobile-Ready Viewport Meta', problem: 'Mobile responsive meta viewport header tag.', solution: '<meta name="viewport" content="width=device-width, initial-scale=1">' }
  ],
  finalBoss: [
    {
      id: 1,
      question: 'Which is NOT a semantic element?',
      options: [{ label: 'A', text: '<nav>' }, { label: 'B', text: '<footer>' }, { label: 'C', text: '<div>' }, { label: 'D', text: '<article>' }],
      correct: 'C',
      explanation: '<div> is a non-semantic generic container.'
    },
    {
      id: 2,
      question: 'Attribute that makes a field mandatory:',
      options: [{ label: 'A', text: 'must' }, { label: 'B', text: 'required' }, { label: 'C', text: 'needed' }, { label: 'D', text: 'validate' }],
      correct: 'B',
      explanation: 'required attribute enforces client form validation.'
    },
    {
      id: 3,
      question: 'Unique identifier attribute across the DOM:',
      options: [{ label: 'A', text: 'class' }, { label: 'B', text: 'id' }, { label: 'C', text: 'name' }, { label: 'D', text: 'key' }],
      correct: 'B',
      explanation: 'id must be unique across the document.'
    },
    {
      id: 4,
      question: 'Which is a void element with no closing tag?',
      options: [{ label: 'A', text: '<img>' }, { label: 'B', text: '<p>' }, { label: 'C', text: '<li>' }, { label: 'D', text: '<table>' }],
      correct: 'A',
      explanation: '<img> is self-closing/void.'
    },
    {
      id: 5,
      question: 'Correct modern HTML5 doctype declaration:',
      options: [{ label: 'A', text: '<!DOCTYPE html>' }, { label: 'B', text: '<!DOCTYPE HTML5>' }, { label: 'C', text: '<html5>' }, { label: 'D', text: '<doctype>' }],
      correct: 'A',
      explanation: '<!DOCTYPE html> is the universal HTML5 doctype.'
    },
    {
      id: 6,
      question: 'Where does visible page content live?',
      options: [{ label: 'A', text: '<head>' }, { label: 'B', text: '<body>' }, { label: 'C', text: '<meta>' }, { label: 'D', text: '<title>' }],
      correct: 'B',
      explanation: 'Visible user content lives exclusively inside <body>.'
    },
    {
      id: 7,
      question: 'Best semantic element for site navigation links:',
      options: [{ label: 'A', text: '<nav>' }, { label: 'B', text: '<menu>' }, { label: 'C', text: '<aside>' }, { label: 'D', text: '<ul> only' }],
      correct: 'A',
      explanation: '<nav> creates the accessibility navigation landmark.'
    },
    {
      id: 8,
      question: 'A GET form method is best for...',
      options: [{ label: 'A', text: 'passwords' }, { label: 'B', text: 'search queries' }, { label: 'C', text: 'file upload' }, { label: 'D', text: 'payments' }],
      correct: 'B',
      explanation: 'GET is idempotent and safe for bookmarks and searches.'
    },
    {
      id: 9,
      question: 'Why wrap input in label or use for="id"?',
      options: [{ label: 'A', text: 'colour' }, { label: 'B', text: 'clicking text focuses input and screen readers announce it' }, { label: 'C', text: 'speed' }, { label: 'D', text: 'validation' }],
      correct: 'B',
      explanation: 'Enlarges clickable hit target and delivers accessible name to screen readers.'
    },
    {
      id: 10,
      question: 'HTML entity for the copyright symbol (©):',
      options: [{ label: 'A', text: '&copy;' }, { label: 'B', text: '&c;' }, { label: 'C', text: '&cr;' }, { label: 'D', text: '(c)' }],
      correct: 'A',
      explanation: '&copy; produces the © copyright glyph.'
    }
  ],
  bugDictionary: [
    { bug: 'Layout broke after closing tag', causeAndFix: 'A tag was left unclosed or mis-nested. Validate markup at validator.w3.org.' },
    { bug: 'Image shows broken icon', causeAndFix: 'Wrong path or case sensitivity mismatch (cat.JPG vs cat.jpg on Linux/production). Check file path in src.' },
    { bug: 'Form sends nothing to server', causeAndFix: 'Inputs lack name attributes or are placed outside the <form> tags.' },
    { bug: 'Link reloads page to top', causeAndFix: 'href="#" jumps to page top. Use <button type="button"> for JavaScript actions.' },
    { bug: 'Clicking label does not focus input', causeAndFix: 'The label for attribute does not match the input id attribute.' },
    { bug: 'External styles not applied', causeAndFix: 'link href path is broken or <link> is not placed inside the <head> element.' }
  ]
};
