import {
  LinearAlgebraChapter,
  LinearAlgebraMCQ,
  LinearAlgebraBrainGym,
  LinearAlgebraClassicalProblem,
  MythBusterItem,
  GlossaryItem,
} from '../types/linearAlgebraTypes';

export const linearAlgebraChapters: LinearAlgebraChapter[] = [
  {
    id: 1,
    title: 'Systems of Linear Equations',
    subtitle: 'Several equations, one big question: which numbers make ALL of them true?',
    comicDialogue: [
      { speaker: 'vee', text: 'Prof! 2 chai + 1 samosa cost ₹40. 1 chai + 2 samosas cost ₹35. What does ONE chai cost?' },
      { speaker: 'pivot', text: 'Ah! You have just met a SYSTEM of linear equations.' },
      { speaker: 'vee', text: 'A system = several equations that must be true AT THE SAME TIME. Sounds scary…' },
      { speaker: 'pivot', text: 'Only 3 endings: ONE solution, NONE, or INFINITELY many!' },
      { speaker: 'vee', text: 'Never exactly two?!', subtext: 'POW!' },
    ],
    theory: [
      {
        heading: '1.1 What is a linear equation?',
        paragraphs: [
          'A linear equation is an equation where every unknown appears only to the first power, is never multiplied by another unknown, and is never inside sin, log, square-root, etc. It looks like a₁x₁ + a₂x₂ + ... + aₙxₙ = b.',
          'Linear: 2x + 3y = 7, x - y/2 + 4z = 0, 0.5x = 4.',
          'NOT linear: xy = 4 (two unknowns multiplied), x² + y = 1 (a square), sin(x) = y.',
          'Why "linear"? In two unknowns the graph is a straight line; in three unknowns it is a flat plane.',
        ],
      },
      {
        heading: '1.2 What is a system and what is a solution?',
        paragraphs: [
          'A system of linear equations is a collection of linear equations in the same unknowns. A solution is a list of numbers that satisfies every equation at once. The solution set is the collection of all solutions.',
        ],
        bullets: [
          'x + y = 5 and x - y = 1 ⇒ (x, y) = (3, 2)',
          'Check: 3 + 2 = 5 and 3 - 2 = 1. Both are true, so (3, 2) is a solution.',
        ],
      },
      {
        heading: '1.3 The three possible outcomes',
        paragraphs: [
          'Two equations in two unknowns = two lines. They can cross once, never cross, or lie on top of each other.',
        ],
        bullets: [
          'Exactly one solution — "consistent and unique" (lines cross).',
          'No solution — "inconsistent" (parallel lines; equations contradict each other).',
          'Infinitely many solutions — "consistent but not unique" (one equation is a disguised copy of another).',
        ],
      },
    ],
    bigIdea: {
      title: 'A linear system has 0, 1, or infinitely many solutions — never exactly 2, 3, or 10.',
      content: 'Why? If p and q are two different solutions, then every point on the line through them, p + t(q - p), is also a solution. Two solutions force infinitely many!',
    },
    workedExample: {
      title: 'The Chai Problem',
      steps: [
        'Step 1. Let c = price of chai, s = price of samosa. Equations: 2c + s = 40 and c + 2s = 35.',
        'Step 2. From the first: s = 40 - 2c. Put into the second: c + 2(40 - 2c) = 35 ⇒ c + 80 - 4c = 35 ⇒ -3c = -45 ⇒ c = 15.',
        'Step 3. Then s = 40 - 30 = 10. Check: 2(15) + 10 = 40 ✓, 15 + 2(10) = 35 ✓.',
      ],
      result: 'Chai = ₹15, Samosa = ₹10.',
    },
    oopsCorner: [
      {
        myth: '"No solution" means the answer is x = y = 0.',
        truth: 'x = y = 0 is a perfectly good solution (of x + y = 0, for instance). "No solution" means the solution set is empty — there is no answer at all.',
      },
      {
        myth: '"More unknowns than equations ⇒ infinitely many solutions."',
        truth: 'Only if the system is consistent! x + y + z = 1 and x + y + z = 2 has 3 unknowns, 2 equations and zero solutions.',
      },
    ],
    iCanList: [
      'Tell linear from non-linear equations.',
      'Explain the three possible outcomes and why there is never exactly two.',
      'Decide how many solutions a 2-equation system has by looking at the lines.',
    ],
  },
  {
    id: 2,
    title: 'Matrix Form of a System: Ax = b',
    subtitle: 'Pack the whole system into one compact equation.',
    comicDialogue: [
      { speaker: 'vee', text: 'Writing x, y, z in every line hurts my hand!' },
      { speaker: 'pivot', text: 'Then let us store only the NUMBERS in a table — a MATRIX!' },
      { speaker: 'gaussbot', text: 'BEEP! Coefficients → matrix A. Unknowns → vector x. Right side → vector b.' },
      { speaker: 'vee', text: 'So… A x = b?' },
      { speaker: 'pivot', text: 'Exactly! A whole system in four letters. One tiny equation for ANY size of system!' },
    ],
    theory: [
      {
        heading: '2.1 From equations to a matrix',
        paragraphs: [
          'Line up the unknowns in columns. A missing unknown has coefficient 0. A = coefficient matrix. x = vector of unknowns. b = right-hand side vector.',
          'The augmented matrix [A | b] glues b on as an extra column.',
        ],
      },
      {
        heading: '2.2 Sizes: "m by n"',
        paragraphs: [
          'A matrix with m rows and n columns is an m × n matrix (rows first!). For a system, m = number of equations and n = number of unknowns. x has n entries and b has m entries.',
        ],
      },
      {
        heading: '2.3 Two ways to read Ax',
        paragraphs: [
          'Row way: each entry of Ax is (a row of A) dotted with x — this recreates each equation.',
          'Column way: Ax is x₁(column 1) + x₂(column 2) + ... — a linear combination of columns!',
        ],
      },
    ],
    bigIdea: {
      title: 'Ax = b packs m equations and n unknowns into 4 letters.',
      content: 'A is m × n, x is n × 1, and b is m × 1. The inner sizes match (n = n), and the outer sizes give the product size (m × 1).',
    },
    workedExample: {
      title: 'Read Ax in Row and Column ways',
      steps: [
        'Step 1. System: x + 2y = 5, 3y - z = 1, 2x + z = 4.',
        'Step 2. Matrix A has row 1 = [1, 2, 0], row 2 = [0, 3, -1], row 3 = [2, 0, 1].',
        'Step 3. Read back row 2: 0·x + 3·y + (-1)·z = 1, which is 3y - z = 1 ✓. Size is 3 × 3 with 3 zeros.',
      ],
      result: 'A has size 3 × 3, x is 3 × 1, b is 3 × 1.',
    },
    oopsCorner: [
      {
        myth: 'Forgetting the zero coefficient of a missing unknown and shifting numbers left.',
        truth: 'Always align unknowns in the exact same column order (x, y, z) before writing A!',
      },
      {
        myth: 'Mixing up "3×2" and "2×3".',
        truth: 'The first number counts rows (equations); the second counts columns (unknowns).',
      },
    ],
    iCanList: [
      'Convert any system into Ax = b and back.',
      'State the size of A, x, b.',
      'Write the augmented matrix [A | b].',
    ],
  },
  {
    id: 3,
    title: 'Row Picture and Column Picture',
    subtitle: 'The same system seen through two different pairs of glasses.',
    comicDialogue: [
      { speaker: 'vee', text: 'Same system… two different stories?' },
      { speaker: 'pivot', text: 'Yes! Row picture = LINES meeting. Column picture = ARROWS adding up.' },
      { speaker: 'pivot', text: 'Row picture: every equation is a line (or plane). The solution is where they all meet.' },
      { speaker: 'vee', text: 'Like crossing roads!' },
      { speaker: 'pivot', text: 'Column picture: can we mix the columns to build b? Like a recipe!' },
    ],
    theory: [
      {
        heading: '3.1 The row picture',
        paragraphs: [
          'Each row of Ax = b is one equation = one line (in 2D) or plane (in 3D). Draw both lines; the solution is the single intersection point.',
          'Example: 2x - y = 0 and -x + 2y = 3. Line 1: y = 2x. Line 2: y = (x + 3)/2. They cross at (1, 2).',
        ],
      },
      {
        heading: '3.2 The column picture',
        paragraphs: [
          'Read the columns: x·[2, -1]ᵀ + y·[-1, 2]ᵀ = [0, 3]ᵀ.',
          'The question changes to: how much of each column arrow do I add to land exactly on b?',
          '1 × (2, -1) + 2 × (-1, 2) = (0, 3). Walk along column 1 once, then column 2 twice!',
        ],
      },
      {
        heading: '3.3 Bad news in both pictures',
        paragraphs: [
          'Row picture: parallel lines (no meeting point) or identical lines (whole line of solutions).',
          'Column picture: the two columns point along the same line! Then every combination stays on that line — if b is off the line there is no solution; if b is on it there are infinitely many.',
        ],
      },
    ],
    bigIdea: {
      title: 'Row picture = intersection of surfaces. Column picture = combination of vectors.',
      content: 'Both pictures give the SAME answer (x, y) = (1, 2), but the column picture generalises to span, column space, and rank!',
    },
    workedExample: {
      title: 'Same system in 3D language',
      steps: [
        'Step 1. Three equations in three unknowns ⇒ three planes in space.',
        'Step 2. Typically they meet at one single point.',
        'Step 3. Column picture: three arrows in space; we ask whether b lies in the set of all combinations of those arrows.',
      ],
      result: 'Row = intersection of 3 planes. Column = combination of 3 vectors.',
    },
    oopsCorner: [
      {
        myth: 'Trying to find the "intersection" in the column picture.',
        truth: 'There are no intersecting lines in the column picture! You add scaled vector arrows head-to-tail.',
      },
    ],
    iCanList: [
      'Draw the row picture of a 2×2 system.',
      'Redraw the same system as a column picture.',
      'Explain what "parallel lines" look like in the column picture.',
    ],
  },
  {
    id: 4,
    title: 'Row Way and Column Way of Multiplication',
    subtitle: 'Five different views of the same product — pick the one that helps!',
    comicDialogue: [
      { speaker: 'vee', text: 'Matrix multiplication! Rows times columns… I always lose track.' },
      { speaker: 'pivot', text: 'Because you know only ONE way. There are FIVE!' },
      { speaker: 'gaussbot', text: 'BEEP! Rows of AB = combos of rows of B.' },
      { speaker: 'vee', text: 'Ohh, so AB ≠ BA because the order changes the recipe!' },
      { speaker: 'pivot', text: 'Now you speak matrix! AHA!' },
    ],
    theory: [
      {
        heading: '4.1 Matrix times vector — two ways',
        paragraphs: [
          'Row way: every entry of b is a (row of A)·(x). Dot products give numbers.',
          'Column way: b is a linear combination of the columns of A with weights from x.',
        ],
      },
      {
        heading: '4.2 Matrix times matrix — 5 views',
        paragraphs: [
          '1. Entry view: (AB)ᵢⱼ = (row i of A) · (col j of B).',
          '2. Column view: Each column of AB is A times a column of B (combination of columns of A).',
          '3. Row view: Each row of AB is a row of A times B (combination of rows of B).',
          '4. Column × Row view: AB = sum of (col k of A)(row k of B) — sum of rank-1 matrices!',
          '5. Block view: Cut matrices into blocks and multiply blocks like numbers.',
        ],
      },
    ],
    bigIdea: {
      title: 'Matrix multiplication is associative (AB)C = A(BC), but NOT commutative (AB ≠ BA).',
      content: 'Left-multiplying by a matrix works on rows; right-multiplying works on columns. Also (AB)ᵀ = BᵀAᵀ.',
    },
    workedExample: {
      title: 'Compute Ax with A = [1 2; 3 4; 5 6] and x = [2; -1]',
      steps: [
        'Step 1. Row way: row 1: 1(2)+2(-1) = 0; row 2: 3(2)+4(-1) = 2; row 3: 5(2)+6(-1) = 4.',
        'Step 2. Column way: 2·[1, 3, 5]ᵀ - 1·[2, 4, 6]ᵀ = [2-2, 6-4, 10-6]ᵀ = [0, 2, 4]ᵀ.',
      ],
      result: 'Both give the exact same vector b = [0, 2, 4]ᵀ.',
    },
    oopsCorner: [
      {
        myth: 'Multiplying entry-by-entry ("aᵢⱼ · bᵢⱼ").',
        truth: 'That is the Hadamard product, NOT matrix multiplication! Rows must dot into columns.',
      },
      {
        myth: 'Assuming (A + B)² = A² + 2AB + B².',
        truth: 'Since AB ≠ BA, (A + B)² = A² + AB + BA + B².',
      },
    ],
    iCanList: [
      'Multiply matrices in at least 3 different ways.',
      'Predict the size of a product (m×n)(n×p) = m×p.',
      'Explain why AB ≠ BA in general.',
    ],
  },
  {
    id: 5,
    title: 'Vectors',
    subtitle: 'Arrows with direction and length — the atoms of linear algebra.',
    comicDialogue: [
      { speaker: 'vee', text: 'A vector is a list of numbers — OR an arrow from the origin. Both are the same?' },
      { speaker: 'pivot', text: 'Yes! Numbers are coordinates, arrows are geometry.' },
      { speaker: 'vee', text: 'How do I know if two arrows are perpendicular?' },
      { speaker: 'pivot', text: 'Dot product zero!' },
      { speaker: 'gaussbot', text: 'Length = √(v·v). Pythagoras in disguise! ZAP!' },
    ],
    theory: [
      {
        heading: '5.1 Vectors, addition and scaling',
        paragraphs: [
          'A vector in ℝⁿ is an ordered list of n real numbers: v = (v₁, v₂, ..., vₙ).',
          'Addition: add matching entries. Geometrically: tip-to-tail.',
          'Scalar multiplication: cv stretches (|c| > 1), shrinks (|c| < 1), or flips (c < 0) the arrow.',
        ],
      },
      {
        heading: '5.2 Dot product, length, angle',
        paragraphs: [
          'u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ.',
          'Length: ||v|| = √(v · v). Unit vector: u = v / ||v||.',
          'Angle: cos θ = (u · v) / (||u|| ||v||).',
          'Perpendicular (orthogonal): u · v = 0 ⟺ cos θ = 0 ⟺ θ = 90°.',
        ],
      },
    ],
    bigIdea: {
      title: 'Orthogonal vectors have u · v = 0.',
      content: 'A unit vector has length 1. To make one, divide any vector by its length. The fact that rows are perpendicular to the null space will power all fundamental subspaces!',
    },
    workedExample: {
      title: 'Length, unit vector, and angle',
      steps: [
        'Step 1. u = (3, 4): ||u|| = √(9 + 16) = 5. Unit vector: (3/5, 4/5).',
        'Step 2. v = (4, -3): u · v = 12 - 12 = 0 ⇒ u ⊥ v.',
        'Step 3. Angle between (1, 0) and (1, 1): cos θ = 1 / (1 · √2) ⇒ θ = 45°.',
      ],
      result: '||u|| = 5, u ⊥ v, angle is 45°.',
    },
    oopsCorner: [
      {
        myth: 'Thinking the dot product is a vector.',
        truth: 'The dot product produces a SINGLE NUMBER (a scalar), never a vector!',
      },
      {
        myth: 'Adding vectors of different sizes.',
        truth: '(1, 2) + (3, 4, 5) is completely undefined.',
      },
    ],
    iCanList: [
      'Add/scale vectors and picture them.',
      'Compute dot product, length, unit vector, angle.',
      'Test perpendicularity with the dot product.',
    ],
  },
  {
    id: 6,
    title: 'Linear Combinations',
    subtitle: 'Mix vectors like ingredients: scale each one, then add.',
    comicDialogue: [
      { speaker: 'pivot', text: 'Take vectors v1, v2. A linear combination is c1·v1 + c2·v2.' },
      { speaker: 'vee', text: 'Like a recipe — c1 spoons of v1, c2 spoons of v2?' },
      { speaker: 'vee', text: 'Can I use negative spoons?' },
      { speaker: 'pivot', text: 'In math, yes! Even zero spoons.' },
      { speaker: 'gaussbot', text: 'And every product Ax is a combination of the columns of A! KEY!' },
    ],
    theory: [
      {
        heading: '6.1 Definition',
        paragraphs: [
          'A linear combination of vectors v₁, ..., vₖ is any vector c₁v₁ + c₂v₂ + ... + cₖvₖ where cᵢ are real numbers (the coefficients, or weights).',
          'Coefficients may be negative, fractional, or zero.',
        ],
      },
      {
        heading: '6.2 The central question',
        paragraphs: [
          'Is b a linear combination of v₁, ..., vₖ? ⟺ Does Ax = b have a solution, where the columns of A are v₁, ..., vₖ?',
          'The zero vector is always a combination (set all cᵢ = 0). Each vᵢ itself is a combination (cᵢ = 1, others 0).',
        ],
      },
    ],
    bigIdea: {
      title: 'Ax = b means: Can the columns of A be combined to reach b?',
      content: 'Matrix multiplication Ax is not some mystical operation — it is literally taking a linear combination of the columns of A!',
    },
    workedExample: {
      title: 'Is (5, 0) a combination of (1, 2) and (2, -1)?',
      steps: [
        'Step 1. Solve a(1, 2) + b(2, -1) = (5, 0): a + 2b = 5, 2a - b = 0.',
        'Step 2. From the second, b = 2a. Then a + 4a = 5 ⇒ a = 1, b = 2.',
        'Step 3. Check: 1·(1, 2) + 2·(2, -1) = (1 + 4, 2 - 2) = (5, 0) ✓.',
      ],
      result: 'Yes! 1·v₁ + 2·v₂ = (5, 0).',
    },
    oopsCorner: [
      {
        myth: 'Thinking coefficients must be positive or whole numbers.',
        truth: 'Weights can be any real numbers: negative, irrational, or zero!',
      },
      {
        myth: 'Thinking a combination needs all vectors.',
        truth: 'Setting a coefficient to 0 simply leaves that vector ingredient out.',
      },
    ],
    iCanList: [
      'Define a linear combination.',
      'Decide whether a vector is a combination of given vectors by solving a system.',
      'See Ax as a combination of columns.',
    ],
  },
  {
    id: 7,
    title: 'Span',
    subtitle: 'All the places you can reach using combinations.',
    comicDialogue: [
      { speaker: 'pivot', text: 'The SPAN of some vectors is the set of ALL their linear combinations.' },
      { speaker: 'vee', text: 'So… everywhere I can reach?' },
      { speaker: 'vee', text: 'One arrow gives a line, two arrows give a plane?' },
      { speaker: 'pivot', text: 'Careful: only if they point in different directions!' },
      { speaker: 'gaussbot', text: 'Span always passes through the origin. Because zero spoons of everything! REACH!' },
    ],
    theory: [
      {
        heading: '7.1 Definition and geometry',
        paragraphs: [
          'span{v₁, ..., vₖ} = the set of all linear combinations c₁v₁ + ... + cₖvₖ.',
          'One nonzero vector ⇒ a line through the origin.',
          'Two non-parallel vectors in ℝ² ⇒ the whole plane ℝ².',
          'Two non-parallel vectors in ℝ³ ⇒ a plane through the origin (a thin 2D sheet in 3D).',
          'The zero vector alone spans just {0}.',
        ],
      },
      {
        heading: '7.2 How to test things about span',
        paragraphs: [
          'Put the vectors as columns of A. Then:',
          '• b ∈ span ⟺ Ax = b is solvable.',
          '• The vectors span all of ℝᵐ ⟺ Ax = b is solvable for EVERY b ⟺ every row has a pivot (rank = m).',
          '• You need at least m vectors to span ℝᵐ (but m is not always enough if they are parallel!).',
        ],
      },
    ],
    bigIdea: {
      title: 'Span = the reach of your vectors. Spanning ℝᵐ requires a pivot in every row.',
      content: 'A span is always a flat space passing through the origin. You cannot span ℝ³ with only 2 vectors.',
    },
    workedExample: {
      title: 'Do (1, 1, 0), (0, 1, 1), (1, 0, 1) span ℝ³?',
      steps: [
        'Step 1. Put them as columns of A = [1 0 1; 1 1 0; 0 1 1].',
        'Step 2. Eliminate: R₂ - R₁ gives (0, 1, -1); then R₃ - R₂ gives (0, 0, 2). Three pivots: 1, 1, 2.',
        'Step 3. Every row has a pivot ⇒ rank = 3 = m ⇒ they span all of ℝ³!',
      ],
      result: 'Yes, they span ℝ³ (3 independent vectors).',
    },
    oopsCorner: [
      {
        myth: '"Two vectors always span a plane."',
        truth: 'Only if they are not multiples of each other! (1, 1) and (2, 2) span only a 1D line.',
      },
      {
        myth: '"A span can be a line that misses the origin."',
        truth: 'Never! Setting every weight to 0 always puts 0 in every span.',
      },
    ],
    iCanList: [
      'Describe the span of 1, 2, 3 vectors geometrically.',
      'Test if b is in a span by solving Ax = b.',
      'State when vectors span ℝᵐ (pivot in every row).',
    ],
  },
  {
    id: 8,
    title: 'Gaussian Elimination',
    subtitle: 'Turn a tangled system into a staircase you can climb down.',
    comicDialogue: [
      { speaker: 'gaussbot', text: 'BEEP! Pick a pivot. Clear everything BELOW it. Move on.' },
      { speaker: 'vee', text: 'Like cleaning a staircase, step by step?' },
      { speaker: 'vee', text: 'The pivot is ZERO! What now?!' },
      { speaker: 'gaussbot', text: 'ERROR… swap rows!' },
      { speaker: 'pivot', text: 'Upper triangular at last. Now back-substitute from the bottom! CLEAN!' },
    ],
    theory: [
      {
        heading: '8.1 The idea',
        paragraphs: [
          'Gaussian elimination uses row operations to turn Ax = b into Ux = c where U is upper triangular (zeros below diagonal). Then solve by back substitution.',
          'Pivot = the first nonzero entry in its row used to clear entries below.',
          'Multiplier lᵢⱼ = (entry to eliminate) / (pivot). Operation: new row i = row i - lᵢⱼ × (pivot row).',
          'If a pivot is 0, swap with a lower row that has a nonzero entry.',
        ],
      },
      {
        heading: '8.2 What can go wrong — and what it tells you',
        paragraphs: [
          '• A pivot in every column ⇒ Unique solution (if consistent).',
          '• A row like [0 0 0 | 0] ⇒ Redundant equation ⇒ free variable ⇒ infinitely many solutions.',
          '• A row like [0 0 0 | 5] ⇒ 0 = 5 is impossible ⇒ NO SOLUTION (inconsistent).',
        ],
      },
    ],
    bigIdea: {
      title: 'Elimination converts Ax = b to Ux = c with triangular back substitution.',
      content: 'Always operate on the augmented matrix [A | b]. 0 = 0 means free variable; 0 = nonzero means no solution!',
    },
    workedExample: {
      title: 'Solve 2x + y + z = 5, 4x - 6y = -2, -2x + 7y + 2z = 9',
      steps: [
        'Step 1. Augmented matrix: [2 1 1 | 5; 4 -6 0 | -2; -2 7 2 | 9]. Pivot 1 is 2.',
        'Step 2. Multipliers: l₂₁ = 4/2 = 2, l₃₁ = -2/2 = -1. Do R₂ - 2R₁ and R₃ + R₁ ⇒ [0 -8 -2 | -12] and [0 8 3 | 14].',
        'Step 3. Second pivot is -8. l₃₂ = 8/(-8) = -1. Do R₃ + R₂ ⇒ [0 0 1 | 2]. Upper triangular!',
        'Step 4. Back substitution: z = 2. -8y - 2(2) = -12 ⇒ y = 1. 2x + 1 + 2 = 5 ⇒ x = 1.',
      ],
      result: '(x, y, z) = (1, 1, 2).',
    },
    oopsCorner: [
      {
        myth: 'Forgetting to apply the row operation to the right-hand side b.',
        truth: 'Always work on the augmented matrix [A | b] so both sides stay equal!',
      },
      {
        myth: 'Using the wrong sign: adding instead of subtracting.',
        truth: 'To eliminate an entry, subtract l × (pivot row), so entry - l·(pivot) = 0.',
      },
    ],
    iCanList: [
      'Perform elimination and back substitution.',
      'Find multipliers and pivots.',
      'Read off no/one/infinite solutions from the final rows.',
    ],
  },
  {
    id: 9,
    title: 'Row Operations and Row-Reduced Form (RREF)',
    subtitle: 'Three safe moves that never change the answer.',
    comicDialogue: [
      { speaker: 'pivot', text: 'Only three moves are allowed: SWAP rows, SCALE a row, ADD a multiple of a row to another.' },
      { speaker: 'vee', text: 'Why only these?' },
      { speaker: 'pivot', text: 'Because each can be UNDONE. Nothing is lost! Multiply a row by 0 is banned — that cannot be undone!' },
      { speaker: 'gaussbot', text: 'BEEP! Gauss–Jordan gives 1s and clean columns! RREF!' },
    ],
    theory: [
      {
        heading: '9.1 The three row operations',
        paragraphs: [
          '1. Swap two rows (undo with swap again).',
          '2. Multiply a row by a nonzero number c (undo with multiply by 1/c).',
          '3. Add a multiple of one row to another (undo with subtract the same multiple).',
        ],
      },
      {
        heading: '9.2 Echelon form vs RREF',
        paragraphs: [
          'Echelon form: pivots step to the right; zero rows at the bottom.',
          'RREF (Reduced Row Echelon Form): echelon form, plus every pivot is 1, and every pivot is the ONLY nonzero entry in its column (zeros above and below!).',
          'Gauss-Jordan elimination = eliminate below AND above to reach RREF.',
        ],
      },
    ],
    bigIdea: {
      title: 'Row operations preserve the null space, row space, and rank. They CHANGE the column space!',
      content: 'RREF is unique for every matrix. Column dependencies in RREF match the original matrix exactly!',
    },
    workedExample: {
      title: 'Gauss–Jordan on x + 2y = 4, 3x + 5y = 11',
      steps: [
        'Step 1. [1 2 | 4; 3 5 | 11]. R₂ - 3R₁ ⇒ [1 2 | 4; 0 -1 | -1].',
        'Step 2. Scale row 2 by -1: (-R₂) ⇒ [1 2 | 4; 0 1 | 1].',
        'Step 3. Eliminate above pivot: R₁ - 2R₂ ⇒ [1 0 | 2; 0 1 | 1].',
      ],
      result: 'RREF is [1 0 | 2; 0 1 | 1]. Read straight off: x = 2, y = 1.',
    },
    oopsCorner: [
      {
        myth: '"Multiply a row by 0" or "add a row to itself".',
        truth: 'Neither is reversible! Multiplying by 0 destroys equations forever.',
      },
      {
        myth: 'Believing row operations leave the column space unchanged.',
        truth: 'They preserve row space and null space, but they CHANGE the column space as vectors!',
      },
    ],
    iCanList: [
      'Name the 3 legal row operations and why they are reversible.',
      'Reduce any matrix to RREF.',
      'State what row ops do and do not preserve.',
    ],
  },
  {
    id: 10,
    title: 'Elementary Matrices',
    subtitle: 'Every row operation is secretly a matrix multiplication.',
    comicDialogue: [
      { speaker: 'pivot', text: 'A row operation on A equals E times A for a special matrix E.' },
      { speaker: 'vee', text: 'How do I build E?' },
      { speaker: 'pivot', text: 'Apply the SAME row operation to the identity matrix! E is "the identity, slightly disturbed".' },
      { speaker: 'gaussbot', text: 'BEEP! Elimination = E32·E31·E21·A = U. The whole algorithm in one line! SNAP!' },
    ],
    theory: [
      {
        heading: '10.1 What is an elementary matrix?',
        paragraphs: [
          'An elementary matrix E is what you get by applying ONE row operation to the identity matrix I. Multiplying EA performs that same row operation on A.',
          'E₂₁: "row 2 - 2×row 1" has -2 in position (2, 1).',
          'P₁₃: swaps rows 1 and 3 (permutation matrix).',
          'D: multiplies row 2 by 5 (diagonal matrix with 5 on entry (2, 2)).',
        ],
      },
      {
        heading: '10.2 Inverses and order',
        paragraphs: [
          'Each elementary matrix has an inverse that is also elementary: E₂₁⁻¹ adds 2×row 1 back (flip sign of multiplier!).',
          'P⁻¹ = P for a row swap.',
          'Order matters: operations stand from right to left in order of execution: E₃₂E₃₁E₂₁A = U.',
        ],
      },
    ],
    bigIdea: {
      title: 'EA acts on ROWS of A; AE acts on COLUMNS of A.',
      content: 'Left-multiplication modifies rows. Right-multiplication modifies columns. Elimination is entirely left-multiplication by elementary matrices.',
    },
    workedExample: {
      title: 'Difference between EA and AE',
      steps: [
        'Step 1. Let A = [1 2; 3 4] and E = [1 0; -3 1] (row 2 - 3×row 1).',
        'Step 2. EA = [1 2; 3-3, 4-6] = [1 2; 0 -2]. Rows changed!',
        'Step 3. AE = [1·1+2(-3), 2; 3·1+4(-3), 4] = [-5 2; -9 4]. Columns changed!',
      ],
      result: 'EA ≠ AE: EA operates on rows, AE operates on columns.',
    },
    oopsCorner: [
      {
        myth: 'Writing elementary matrices in chronological left-to-right order.',
        truth: 'Later operations stand further left! First E₂₁, then E₃₁ ⇒ product is E₃₁E₂₁A.',
      },
      {
        myth: 'Putting the multiplier in the wrong matrix position.',
        truth: 'To subtract l × row j from row i, place -l in row i, column j.',
      },
    ],
    iCanList: [
      'Build an elementary matrix from a row operation.',
      'Write its inverse by flipping the multiplier sign.',
      'Explain why EA and AE differ.',
    ],
  },
  {
    id: 11,
    title: 'LU Factorization',
    subtitle: 'Split A into a Lower triangle times an Upper triangle — then solve fast.',
    comicDialogue: [
      { speaker: 'vee', text: 'Elimination again and again for each new b? Tiring!' },
      { speaker: 'pivot', text: 'Save your work! Store the multipliers in L and the result in U.' },
      { speaker: 'gaussbot', text: 'BEEP! A = L U. Solve L c = b forward, then U x = c backward. Two easy triangular systems!' },
      { speaker: 'pivot', text: 'The expensive step is done ONCE, for every b! Like pre-chopping vegetables for the week. FAST!' },
    ],
    theory: [
      {
        heading: '11.1 Where L and U come from',
        paragraphs: [
          'If elimination needs no row swaps: E₃₂E₃₁E₂₁A = U ⇒ A = (E₂₁⁻¹E₃₁⁻¹E₃₂⁻¹)U = LU.',
          'A beautiful miracle: the inverse elementary matrices multiply without mixing! The multipliers lᵢⱼ drop directly into their positions in L with POSITIVE signs.',
          'L is unit lower triangular (1s on diagonal, multipliers below). U is upper triangular (pivots on diagonal).',
        ],
      },
      {
        heading: '11.2 Solving with LU',
        paragraphs: [
          'To solve Ax = b: (1) Forward substitution Lc = b. (2) Back substitution Ux = c.',
          'Factoring A costs ~n³/3 multiplications (done once). Solving Lc = b and Ux = c costs only ~n² multiplications per right-hand side b!',
        ],
      },
    ],
    bigIdea: {
      title: 'A = LU: Multipliers go directly into L with plus signs; pivots sit on diagonal of U.',
      content: 'When row swaps are required, PA = LU where P is a permutation matrix recording the row exchanges.',
    },
    workedExample: {
      title: 'Factor A = [2 1; 6 8]',
      steps: [
        'Step 1. Pivot 1 is 2. Multiplier l₂₁ = 6/2 = 3.',
        'Step 2. R₂ - 3R₁: row 2 becomes [6-6, 8-3] = [0, 5]. This is U = [2 1; 0 5].',
        'Step 3. Multiplier 3 goes into L: L = [1 0; 3 1]. Check: LU = [1 0; 3 1][2 1; 0 5] = [2 1; 6 8] = A ✓.',
      ],
      result: 'L = [1 0; 3 1], U = [2 1; 0 5].',
    },
    oopsCorner: [
      {
        myth: 'Putting -l in L.',
        truth: 'Since L is the inverse of elimination, L holds +l in position (i, j)!',
      },
      {
        myth: 'Forgetting that L has 1s on its diagonal while U has the pivots.',
        truth: 'L is unit lower triangular (diagonal is strictly 1, 1, ...). Pivots belong to U.',
      },
    ],
    iCanList: [
      'Compute L and U for a 3×3 matrix.',
      'Solve Ax = b via Lc = b, Ux = c.',
      'Explain when PA = LU is needed.',
    ],
  },
  {
    id: 12,
    title: 'Linear Dependence and Independence',
    subtitle: 'Is any vector redundant? Does a recipe carry a "spare" ingredient?',
    comicDialogue: [
      { speaker: 'vee', text: 'Vectors v1, v2, v3. How do I know none is wasted?' },
      { speaker: 'pivot', text: 'Ask: can a non-trivial combination give ZERO?' },
      { speaker: 'pivot', text: 'If c1·v1 + c2·v2 + c3·v3 = 0 forces all c = 0, they are INDEPENDENT. Otherwise one is redundant!' },
      { speaker: 'gaussbot', text: 'BEEP! Solve Ax = 0. Only x = 0? Independent! A simple null-space test! TEST!' },
    ],
    theory: [
      {
        heading: '12.1 Definitions',
        paragraphs: [
          'Vectors v₁, ..., vₖ are linearly independent if c₁v₁ + ... + cₖvₖ = 0 is ONLY satisfied by c₁ = ... = cₖ = 0.',
          'They are linearly dependent if some non-trivial combination (not all cᵢ = 0) gives 0 — equivalently, at least one vector is a combination of the others.',
        ],
      },
      {
        heading: '12.2 The matrix test',
        paragraphs: [
          'Put vectors as columns of A and solve Ax = 0.',
          '• Only x = 0 ⟺ independent ⟺ every column has a pivot ⟺ rank = k.',
          '• Non-zero x exists ⟺ dependent ⟺ at least one free column.',
          'Rule: any k > m vectors in ℝᵐ are ALWAYS dependent (more unknowns than equations!).',
        ],
      },
    ],
    bigIdea: {
      title: 'Columns are independent ⟺ Ax = 0 has only the zero solution x = 0.',
      content: 'Any set containing the zero vector is automatically dependent (1·0 = 0). Two vectors are dependent ⟺ they are parallel.',
    },
    workedExample: {
      title: 'Test (1, 2, 1), (2, 5, 3), (0, 1, 1) for independence',
      steps: [
        'Step 1. Put as columns of A = [1 2 0; 2 5 1; 1 3 1].',
        'Step 2. Eliminate: R₂ - 2R₁ and R₃ - R₁ give [1 2 0; 0 1 1; 0 1 1]; then R₃ - R₂ gives [0 0 0].',
        'Step 3. Only 2 pivots for 3 columns ⇒ column 3 is free ⇒ DEPENDENT!',
      ],
      result: 'Dependent. Relation: 2·v₁ - v₂ + v₃ = 0.',
    },
    oopsCorner: [
      {
        myth: '"Pairwise different vectors are always independent."',
        truth: '(1, 0), (0, 1), (1, 1) are all pairwise different, yet dependent: (1,0)+(0,1)-(1,1)=0.',
      },
      {
        myth: 'Checking only if vectors are parallel for 3 or more vectors.',
        truth: 'Three vectors in a plane are dependent even if no two are parallel!',
      },
    ],
    iCanList: [
      'Define independence and dependence.',
      'Test vectors by row reducing A.',
      'Spot automatic dependence (too many vectors, zero vector).',
    ],
  },
  {
    id: 13,
    title: 'Column Space C(A)',
    subtitle: 'Which right-hand sides b can the matrix actually produce?',
    comicDialogue: [
      { speaker: 'pivot', text: 'The COLUMN SPACE C(A) = all combinations of the columns of A.' },
      { speaker: 'vee', text: 'Equal to all vectors of the form Ax?' },
      { speaker: 'pivot', text: 'Yes! Ax = b is solvable exactly when b is in C(A). So bad b = unreachable b!' },
      { speaker: 'gaussbot', text: 'BEEP! Basis = PIVOT columns of the ORIGINAL A. Original, not the reduced one! PIVOT!' },
    ],
    theory: [
      {
        heading: '13.1 Definition',
        paragraphs: [
          'The column space C(A) is the span of the columns of A. For an m × n matrix, C(A) is a subspace of ℝᵐ.',
          'C(A) = {Ax : x ∈ ℝⁿ}. Ax = b has a solution ⟺ b ∈ C(A).',
        ],
      },
      {
        heading: '13.2 Finding a basis for C(A)',
        paragraphs: [
          'Row-reduce A to echelon form to find which columns contain pivots.',
          'The pivot columns of the ORIGINAL matrix A form a basis for C(A)!',
          'Dimension of C(A) = rank r.',
        ],
      },
    ],
    bigIdea: {
      title: 'Ax = b is solvable ⟺ b lies in C(A). Basis = pivot columns of original A.',
      content: 'Never take columns from RREF to build C(A)! Row operations change column spaces; always go back to the original matrix A.',
    },
    workedExample: {
      title: 'Column space of A = [1 2 3; 2 5 7; 1 1 2]',
      steps: [
        'Step 1. RREF has pivots in columns 1 and 2. Rank = 2.',
        'Step 2. Basis for C(A) = original columns 1 and 2: (1, 2, 1) and (2, 5, 1).',
        'Step 3. C(A) is a 2D plane in ℝ³. Normal vector is (1, 2, 1) × (2, 5, 1) = (-3, 1, 1). Plane equation: -3b₁ + b₂ + b₃ = 0.',
      ],
      result: 'C(A) is the plane -3b₁ + b₂ + b₃ = 0 in ℝ³.',
    },
    oopsCorner: [
      {
        myth: 'Taking the pivot columns from the reduced matrix RREF.',
        truth: 'Row operations alter columns! Use pivot positions from RREF, but take columns from original A.',
      },
      {
        myth: 'Thinking C(A) lives in ℝⁿ.',
        truth: 'C(A) lives in ℝᵐ (the number of rows / components in b).',
      },
    ],
    iCanList: [
      'Define C(A) and place it in the right space (ℝᵐ).',
      'Find a basis from pivot columns of original A.',
      'Decide whether b is in C(A).',
    ],
  },
  {
    id: 14,
    title: 'Rank',
    subtitle: 'One number that tells you almost everything about a matrix.',
    comicDialogue: [
      { speaker: 'gaussbot', text: 'RANK r = number of pivots.' },
      { speaker: 'vee', text: 'Just counting pivots?' },
      { speaker: 'pivot', text: 'r = dim C(A) = dim of row space. Rows and columns agree! Rank of A = rank of Aᵀ!' },
      { speaker: 'gaussbot', text: 'BEEP! r ≤ min(m, n). Four cases decide the solutions. RANK!' },
      { speaker: 'vee', text: 'Then I can predict outcomes without solving!' },
    ],
    theory: [
      {
        heading: '14.1 Definition and meaning',
        paragraphs: [
          'Rank r = number of pivots after elimination.',
          'r = dimension of column space = dimension of row space.',
          'rank(A) = rank(Aᵀ) and r ≤ min(m, n).',
        ],
      },
      {
        heading: '14.2 The four rank cases for Ax = b',
        paragraphs: [
          '1. r = m = n (Square, full rank): RREF = I. Exactly 1 solution for every b (A invertible).',
          '2. r = n < m (Tall, full column rank): RREF = [I; 0]. 0 or 1 solution (independent columns, no free variables).',
          '3. r = m < n (Wide, full row rank): RREF = [I F]. Infinitely many solutions for every b (pivot in every row).',
          '4. r < m and r < n: RREF = [I F; 0 0]. 0 or infinitely many solutions.',
        ],
      },
    ],
    bigIdea: {
      title: 'Rank r determines uniqueness (r = n) and existence (r = m).',
      content: 'Full column rank (r = n) ⇒ at most 1 solution. Full row rank (r = m) ⇒ at least 1 solution. Both (r = m = n) ⇒ exactly 1 solution.',
    },
    workedExample: {
      title: 'Rank of A = [1 2 0 1; 0 1 1 2; 1 2 1 3]',
      steps: [
        'Step 1. R₃ - R₁ = (0, 0, 1, 2). Second row is (0, 1, 1, 2).',
        'Step 2. Echelon form has pivots in columns 1, 2, and 3. Row 3 has pivot 1.',
        'Step 3. Number of pivots = 3 ⇒ rank = 3.',
      ],
      result: 'Rank = 3. Matrix is 3 × 4 with full row rank (r = m = 3).',
    },
    oopsCorner: [
      {
        myth: '"Rank = number of non-zero rows of A before elimination."',
        truth: 'Rank counts INDEPENDENT rows. [1 2; 2 4] has 2 non-zero rows but rank is only 1.',
      },
      {
        myth: '"A 3 × 5 matrix can have rank 4."',
        truth: 'Never! Rank r cannot exceed min(m, n) = min(3, 5) = 3.',
      },
    ],
    iCanList: [
      'Compute rank by elimination.',
      'Use r vs m, n to predict solution counts.',
      'State r ≤ min(m, n) and rank(A) = rank(Aᵀ).',
    ],
  },
  {
    id: 15,
    title: 'Null Space N(A)',
    subtitle: 'All the vectors that the matrix squashes down to zero.',
    comicDialogue: [
      { speaker: 'pivot', text: 'The NULL SPACE N(A) = all x with Ax = 0.' },
      { speaker: 'vee', text: 'But x = 0 always works…' },
      { speaker: 'pivot', text: 'Right! The question is whether anything ELSE works. Free variables are the secret!' },
      { speaker: 'gaussbot', text: 'BEEP! One special solution per free variable. Set a free variable to 1, others to 0! ZERO!' },
    ],
    theory: [
      {
        heading: '15.1 Definition and dimension',
        paragraphs: [
          'N(A) = {x ∈ ℝⁿ : Ax = 0}.',
          'It is always a subspace of ℝⁿ (closed under addition and scaling).',
          'Dimension of N(A) = number of free variables = n - r.',
        ],
      },
      {
        heading: '15.2 Special solutions',
        paragraphs: [
          'For each free variable, set it to 1 and all other free variables to 0, then solve for the pivot variables.',
          'These special solutions form a basis for N(A).',
          'Meaning: each special solution is a recipe for combining columns of A to produce 0.',
        ],
      },
    ],
    bigIdea: {
      title: 'dim N(A) = n - r (number of free variables). Special solutions form its basis.',
      content: 'N(A) = {0} ⟺ no free variables ⟺ columns of A are linearly independent ⟺ rank r = n.',
    },
    workedExample: {
      title: 'Null space of A = [1 2 0 1; 0 0 1 2]',
      steps: [
        'Step 1. Pivot columns: 1 and 3. Free columns: 2 and 4. n - r = 4 - 2 = 2.',
        'Step 2. Pivot equations: x₁ + 2x₂ + x₄ = 0 ⇒ x₁ = -2x₂ - x₄. x₃ + 2x₄ = 0 ⇒ x₃ = -2x₄.',
        'Step 3. Free (x₂, x₄) = (1, 0) ⇒ s₁ = (-2, 1, 0, 0). Free (x₂, x₄) = (0, 1) ⇒ s₂ = (-1, 0, -2, 1).',
      ],
      result: 'N(A) = {c₁(-2, 1, 0, 0) + c₂(-1, 0, -2, 1)}.',
    },
    oopsCorner: [
      {
        myth: '"The null space is the set of zero vectors in A" or "N(A) = {0} always".',
        truth: 'It is the set of x vectors that A maps to 0 — it can be a large line, plane, or higher space!',
      },
      {
        myth: 'Forgetting that N(A) lives in ℝⁿ (number of columns), not ℝᵐ.',
        truth: 'A acts on x ∈ ℝⁿ, so N(A) strictly lives in ℝⁿ.',
      },
    ],
    iCanList: [
      'Compute a basis for N(A) with special solutions.',
      'Find dim N(A) = n - r.',
      'Interpret N(A) as dependencies among the columns.',
    ],
  },
  {
    id: 16,
    title: 'The Complete Solution of Ax = b',
    subtitle: 'One particular solution plus the whole null space.',
    comicDialogue: [
      { speaker: 'pivot', text: 'Every solution looks like: x = (one particular solution) + (anything from the null space).' },
      { speaker: 'vee', text: 'Why the null space?' },
      { speaker: 'pivot', text: 'Because A(x - xₚ) = b - b = 0. So the difference lives in N(A)!' },
      { speaker: 'gaussbot', text: 'BEEP! Shifted line or plane — not through the origin. A null space moved away from 0! SOLVED!' },
    ],
    theory: [
      {
        heading: '16.1 The complete recipe',
        paragraphs: [
          'x_complete = xₚ + xₙ, where xₚ is any ONE solution of Ax = b, and xₙ is any vector in N(A).',
          'Steps:',
          '1. Row reduce [A | b]. If a row reads [0 0 ... 0 | nonzero], STOP: no solution.',
          '2. Set all free variables to 0 to find the particular solution xₚ.',
          '3. Find the special solutions of Ax = 0 for N(A).',
          '4. Complete solution: x = xₚ + c₁s₁ + c₂s₂ + ...',
        ],
      },
      {
        heading: '16.2 Geometry',
        paragraphs: [
          'The solution set is the null space shifted by xₚ.',
          'It is a point (if r = n), a line, or a plane that does NOT pass through the origin (unless b = 0).',
        ],
      },
    ],
    bigIdea: {
      title: 'x_complete = xₚ + xₙ (Particular solution + Null space).',
      content: 'The solution set of Ax = b (b ≠ 0) is NOT a subspace because 0 is not inside! It is a flat affine space parallel to N(A).',
    },
    workedExample: {
      title: 'Complete solution of x + 2y + z = 3, 2x + 4y + 3z = 8',
      steps: [
        'Step 1. R₂ - 2R₁ gives z = 2. Then x + 2y = 1. Free variable: y.',
        'Step 2. Set free y = 0 ⇒ xₚ = (1, 0, 2).',
        'Step 3. Null space: x + 2y + z = 0, z = 0 ⇒ x = -2y ⇒ s₁ = (-2, 1, 0).',
      ],
      result: 'x = (1, 0, 2) + c(-2, 1, 0). A line shifted away from origin.',
    },
    oopsCorner: [
      {
        myth: 'Believing the solution set of Ax = b (b ≠ 0) is a subspace.',
        truth: 'A(0) = 0 ≠ b, so 0 is not in the set! Subspaces must contain 0.',
      },
      {
        myth: 'Giving only the particular solution when free variables exist.',
        truth: 'You must add the null space part (+ c₁s₁ + ...) to capture ALL infinitely many solutions.',
      },
    ],
    iCanList: [
      'Write the complete solution xₚ + xₙ.',
      'Detect inconsistency from a row [0 ... 0 | nonzero].',
      'Explain the geometry: a shifted null space.',
    ],
  },
  {
    id: 17,
    title: 'Subspaces',
    subtitle: 'Flat spaces through the origin that are closed under mixing.',
    comicDialogue: [
      { speaker: 'pivot', text: 'A SUBSPACE is a set of vectors where adding and scaling never leave the set.' },
      { speaker: 'vee', text: 'Like a closed room?' },
      { speaker: 'vee', text: 'Is a line NOT through the origin a subspace?' },
      { speaker: 'pivot', text: 'No! 0×v is zero, so 0 must be inside. In R³: only the origin, lines through 0, planes through 0, and R³.' },
      { speaker: 'gaussbot', text: 'Nothing curved allowed! FLAT!' },
    ],
    theory: [
      {
        heading: '17.1 The three-rule test',
        paragraphs: [
          'A set S ⊆ ℝⁿ is a subspace if and only if:',
          '(1) 0 ∈ S (contains zero vector).',
          '(2) u, v ∈ S ⇒ u + v ∈ S (closed under addition).',
          '(3) v ∈ S, c ∈ ℝ ⇒ cv ∈ S (closed under scalar multiplication).',
          'Compact: S is closed under all linear combinations. Every subspace is a span, and every span is a subspace.',
        ],
      },
      {
        heading: '17.2 Subspaces of ℝ² and ℝ³',
        paragraphs: [
          'In ℝ²: {0}, any straight line through (0, 0), and ℝ² itself.',
          'In ℝ³: {0}, any line through (0, 0, 0), any plane through (0, 0, 0), and ℝ³ itself.',
          'Intersection of two subspaces is always a subspace. Union of two subspaces is usually NOT a subspace.',
        ],
      },
    ],
    bigIdea: {
      title: 'A subspace must pass through the origin and be flat.',
      content: 'C(A) and N(A) are always subspaces. A line or plane missing 0 is NEVER a subspace.',
    },
    workedExample: {
      title: 'Is S = {(x, y, z) : x + y + z = 0} a subspace? And T = {x + y + z = 1}?',
      steps: [
        'Step 1. For S: (0,0,0) satisfies 0+0+0 = 0 ✓. If u, v have sum 0, (u+v) and cu have sum 0 ✓. S is a subspace (a plane through 0; it is N([1 1 1])).',
        'Step 2. For T: (0,0,0) gives 0 ≠ 1 ✗. Not a subspace!',
      ],
      result: 'S is a subspace; T is not.',
    },
    oopsCorner: [
      {
        myth: 'Checking only addition closure and forgetting 0 or scalar multiples.',
        truth: 'The first quadrant {x ≥ 0, y ≥ 0} is closed under addition, but multiplying by -1 escapes it!',
      },
      {
        myth: 'Thinking {xy = 0} (the two axes together) is a subspace.',
        truth: '(1, 0) and (0, 1) are in the set, but (1, 0) + (0, 1) = (1, 1) has xy = 1 ≠ 0. Fails closure!',
      },
    ],
    iCanList: [
      'Apply the 3-rule test to any set.',
      'List all subspaces of ℝ² and ℝ³.',
      'Explain why C(A) and N(A) are subspaces.',
    ],
  },
  {
    id: 18,
    title: 'Basis',
    subtitle: 'The smallest possible set of vectors that still builds the whole space.',
    comicDialogue: [
      { speaker: 'pivot', text: 'A BASIS = independent vectors that span the space.' },
      { speaker: 'vee', text: 'No waste, nothing missing!' },
      { speaker: 'vee', text: 'Is the basis of R² unique?' },
      { speaker: 'pivot', text: 'No! But every vector gets UNIQUE coordinates in a given basis.' },
      { speaker: 'gaussbot', text: 'BEEP! n vectors in R^n: basis ⟺ matrix invertible. Square test is enough! BASIS!' },
    ],
    theory: [
      {
        heading: '18.1 Definition and coordinates',
        paragraphs: [
          'A basis of a subspace S is a set of vectors that is: (1) linearly independent, and (2) spans S.',
          'Independence = no redundancy. Spanning = nothing missing.',
          'If {b₁, ..., bₖ} is a basis, every v ∈ S can be written as v = c₁b₁ + ... + cₖbₖ in EXACTLY ONE WAY. The cᵢ are the coordinates of v in that basis.',
        ],
      },
      {
        heading: '18.2 How to find bases for subspaces',
        paragraphs: [
          '• Column space C(A): pivot columns of the ORIGINAL matrix A.',
          '• Row space C(Aᵀ): non-zero rows of echelon form or RREF.',
          '• Null space N(A): the special solutions.',
          '• ℝⁿ: standard basis e₁, ..., eₙ, or any n independent vectors in ℝⁿ.',
        ],
      },
    ],
    bigIdea: {
      title: 'Basis = Spanning without redundancy. Coordinates in a basis are UNIQUE.',
      content: 'A space has infinitely many different bases, but EVERY basis has the EXACT SAME number of vectors — the dimension!',
    },
    workedExample: {
      title: 'Basis for the plane x + y + z = 0 and coordinates of (3, -1, -2)',
      steps: [
        'Step 1. Free y, z: x = -y - z. Take b₁ = (-1, 1, 0), b₂ = (-1, 0, 1). They are independent and span the plane.',
        'Step 2. For (3, -1, -2): y = -1, z = -2 ⇒ c₁ = -1, c₂ = -2.',
        'Step 3. Check: -1(-1, 1, 0) - 2(-1, 0, 1) = (1 + 2, -1, -2) = (3, -1, -2) ✓.',
      ],
      result: 'Basis: {(-1, 1, 0), (-1, 0, 1)}. Coordinates: c = (-1, -2).',
    },
    oopsCorner: [
      {
        myth: '"{(1, 2), (2, 4)} is a basis of ℝ² since there are two vectors."',
        truth: 'They are dependent! A basis must be independent AND span.',
      },
      {
        myth: '"The basis of a space is unique."',
        truth: 'Infinitely many bases exist. Only the NUMBER of vectors in the basis is fixed.',
      },
    ],
    iCanList: [
      'State the two conditions for a basis.',
      'Find bases for C(A), N(A), and row space.',
      'Compute coordinates of a vector in a given basis.',
    ],
  },
  {
    id: 19,
    title: 'Dimension',
    subtitle: 'How many independent directions does a space really have?',
    comicDialogue: [
      { speaker: 'pivot', text: 'DIMENSION = number of vectors in ANY basis of the space.' },
      { speaker: 'vee', text: 'Even if bases look different?' },
      { speaker: 'pivot', text: 'Yes! Every basis has the same size. So a plane in R³ has dimension 2, even though vectors have 3 numbers!' },
      { speaker: 'gaussbot', text: 'BEEP! dim C(A) = r, dim N(A) = n − r. Rank–nullity theorem! COUNT!' },
    ],
    theory: [
      {
        heading: '19.1 Definition and rules',
        paragraphs: [
          'dim S = the number of vectors in any basis of S.',
          'dim ℝⁿ = n. A line has dimension 1, a plane 2, {0} has dimension 0.',
          'In an n-dimensional space:',
          '• More than n vectors are ALWAYS dependent.',
          '• Fewer than n vectors CANNOT span.',
          '• Any n independent vectors are a basis.',
          '• Any n spanning vectors are a basis.',
        ],
      },
      {
        heading: '19.2 The Rank–Nullity Theorem',
        paragraphs: [
          'dim C(A) + dim N(A) = r + (n - r) = n (the number of columns).',
          'Matrix spaces also have dimension: 2×2 matrices have dim 4; symmetric 2×2 matrices have dim 3.',
        ],
      },
    ],
    bigIdea: {
      title: 'Rank–Nullity Theorem: dim C(A) + dim N(A) = n.',
      content: 'Do not confuse dimension with ambient space! A 2D plane living inside ℝ³ has dimension 2, even though its vectors have 3 coordinates.',
    },
    workedExample: {
      title: 'Dimensions for a 4 × 6 matrix of rank 3',
      steps: [
        'Step 1. dim C(A) = r = 3 (inside ℝ⁴).',
        'Step 2. dim N(A) = n - r = 6 - 3 = 3 (inside ℝ⁶).',
        'Step 3. dim C(Aᵀ) = r = 3 (inside ℝ⁶).',
        'Step 4. dim N(Aᵀ) = m - r = 4 - 3 = 1 (inside ℝ⁴).',
      ],
      result: 'Rank–nullity holds: 3 + 3 = 6 (in ℝ⁶), and 3 + 1 = 4 (in ℝ⁴).',
    },
    oopsCorner: [
      {
        myth: '"Dimension = number of components in the vector."',
        truth: 'A plane in ℝ³ has vectors with 3 components, but its dimension is 2!',
      },
      {
        myth: 'Confusing dimension with ambient space (m or n).',
        truth: 'Ambient space is where it lives; dimension is its degrees of freedom.',
      },
    ],
    iCanList: [
      'Compute dimensions of C(A), N(A) from the rank.',
      'Use "more than n vectors in n-space are dependent".',
      'Explain why a plane in ℝ³ is 2-dimensional.',
    ],
  },
  {
    id: 20,
    title: 'The Four Fundamental Subspaces',
    subtitle: 'The grand finale: the complete geometry of a matrix on one page.',
    comicDialogue: [
      { speaker: 'pivot', text: 'The final level… Every matrix A (m×n) carries FOUR subspaces.' },
      { speaker: 'vee', text: 'Column space, null space… what else?' },
      { speaker: 'pivot', text: 'Row space C(Aᵀ) and left null space N(Aᵀ)! And they come in perpendicular pairs?!' },
      { speaker: 'gaussbot', text: 'BEEP! r + (n − r) = n and r + (m − r) = m. Everything fits together! BOOM!' },
    ],
    theory: [
      {
        heading: '20.1 The Big Picture of Linear Algebra',
        paragraphs: [
          'In input space ℝⁿ:',
          '• Row space C(Aᵀ): dimension r.',
          '• Null space N(A): dimension n - r.',
          '• They are orthogonal complements: Row Space ⊥ Null Space in ℝⁿ! (r + n - r = n).',
          'In output space ℝᵐ:',
          '• Column space C(A): dimension r.',
          '• Left null space N(Aᵀ): dimension m - r.',
          '• They are orthogonal complements: Column Space ⊥ Left Null Space in ℝᵐ! (r + m - r = m).',
        ],
      },
      {
        heading: '20.2 Why orthogonality holds',
        paragraphs: [
          'Ax = 0 means every row of A has dot product 0 with x ⇒ rows are perpendicular to x ⇒ C(Aᵀ) ⊥ N(A).',
          'Aᵀy = 0 means yᵀA = 0 ⇒ every column of A has dot product 0 with y ⇒ C(A) ⊥ N(Aᵀ).',
        ],
      },
    ],
    bigIdea: {
      title: 'Row Space ⊥ Null Space (in ℝⁿ) and Column Space ⊥ Left Null Space (in ℝᵐ).',
      content: 'This single geometric diagram brings together every single concept: equations, matrices, pivots, rank, basis, span, and dimension!',
    },
    workedExample: {
      title: 'All four subspaces for A = [1 2 0 1; 0 0 1 2; 1 2 1 3] (m=3, n=4, r=2)',
      steps: [
        'Step 1. C(A): dim 2 in ℝ³. Basis = original cols 1, 3: (1, 0, 1) and (0, 1, 1).',
        'Step 2. C(Aᵀ): dim 2 in ℝ⁴. Basis = non-zero rows of RREF: (1, 2, 0, 1) and (0, 0, 1, 2).',
        'Step 3. N(A): dim 4 - 2 = 2 in ℝ⁴. Special solutions: (-2, 1, 0, 0) and (-1, 0, -2, 1). Row 1 · s₁ = -2 + 2 = 0 ✓.',
        'Step 4. N(Aᵀ): dim 3 - 2 = 1 in ℝ³. Solve Aᵀy = 0 ⇒ y = (1, 1, -1). Col 1 · y = 1 - 1 = 0 ✓. Row 1 + Row 2 - Row 3 = 0!',
      ],
      result: 'All 4 subspaces verified with exact orthogonality and dimensions.',
    },
    oopsCorner: [
      {
        myth: 'Placing N(A) in ℝᵐ.',
        truth: 'Memory trick: A acts on x ∈ ℝⁿ, so N(A) and row space live in ℝⁿ; outputs live in ℝᵐ.',
      },
      {
        myth: 'Comparing orthogonality across different spaces.',
        truth: 'Orthogonality is strictly checked inside ℝⁿ (row ⊥ null) and inside ℝᵐ (column ⊥ left null).',
      },
    ],
    iCanList: [
      'Name the four subspaces, their locations (ℝⁿ, ℝᵐ) and dimensions.',
      'Find a basis for each from RREF.',
      'State and explain the two fundamental orthogonality relations.',
    ],
  },
];

export const linearAlgebraMCQs: LinearAlgebraMCQ[] = [
  // Chapter 1
  {
    id: 'mcq-1-1',
    chapterId: 1,
    question: 'Which of these is NOT a linear equation?',
    options: [
      { label: 'A', text: '3x - y = 2' },
      { label: 'B', text: 'x + y/2 = 5' },
      { label: 'C', text: 'xy + z = 1' },
      { label: 'D', text: '0.5x = 4' },
    ],
    correctOption: 'C',
    explanation: 'xy multiplies two unknowns together, which makes it non-linear (degree 2).',
  },
  {
    id: 'mcq-1-2',
    chapterId: 1,
    question: 'A system of linear equations can never have exactly…',
    options: [
      { label: 'A', text: 'no solution' },
      { label: 'B', text: 'one solution' },
      { label: 'C', text: 'two solutions' },
      { label: 'D', text: 'infinitely many solutions' },
    ],
    correctOption: 'C',
    explanation: 'Two distinct solutions force the entire straight line connecting them to be solutions, so the count jumps straight from 1 to infinity.',
  },
  {
    id: 'mcq-1-3',
    chapterId: 1,
    question: 'The system x + y = 2, 2x + 2y = 5 has…',
    options: [
      { label: 'A', text: 'one solution' },
      { label: 'B', text: 'no solution' },
      { label: 'C', text: 'infinitely many solutions' },
      { label: 'D', text: 'exactly two solutions' },
    ],
    correctOption: 'B',
    explanation: 'Doubling the first equation gives 2x + 2y = 4, which directly contradicts 2x + 2y = 5. Parallel lines never meet.',
  },

  // Chapter 2
  {
    id: 'mcq-2-1',
    chapterId: 2,
    question: 'For x + 2y = 5, 3y - z = 1, 2x + z = 4, how many zeros does coefficient matrix A contain?',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '5' },
    ],
    correctOption: 'B',
    explanation: 'A has zeros in entries (1, 3), (2, 1), and (3, 2): exactly 3 zeros.',
  },
  {
    id: 'mcq-2-2',
    chapterId: 2,
    question: 'A is a 4 × 3 matrix in Ax = b. How many equations and unknowns?',
    options: [
      { label: 'A', text: '4 equations, 3 unknowns' },
      { label: 'B', text: '3 equations, 4 unknowns' },
      { label: 'C', text: '4 equations, 4 unknowns' },
      { label: 'D', text: '3 equations, 3 unknowns' },
    ],
    correctOption: 'A',
    explanation: 'm = 4 rows = 4 equations; n = 3 columns = 3 unknowns.',
  },
  {
    id: 'mcq-2-3',
    chapterId: 2,
    question: 'If A is 2 × 3, then x and b have how many components?',
    options: [
      { label: 'A', text: '2 and 3' },
      { label: 'B', text: '3 and 2' },
      { label: 'C', text: '3 and 3' },
      { label: 'D', text: '2 and 2' },
    ],
    correctOption: 'B',
    explanation: 'x has n = 3 entries (one per column); b has m = 2 entries (one per row).',
  },

  // Chapter 3
  {
    id: 'mcq-3-1',
    chapterId: 3,
    question: 'In the row picture of 3 equations in 3 unknowns, the solution is where three ______ meet.',
    options: [
      { label: 'A', text: 'lines' },
      { label: 'B', text: 'planes' },
      { label: 'C', text: 'points' },
      { label: 'D', text: 'vectors' },
    ],
    correctOption: 'B',
    explanation: 'Each linear equation in 3 variables defines a 2D flat plane in 3D space.',
  },
  {
    id: 'mcq-3-2',
    chapterId: 3,
    question: 'In the column picture, solving Ax = b means finding…',
    options: [
      { label: 'A', text: 'the intersection of columns' },
      { label: 'B', text: 'the linear combination of columns that equals b' },
      { label: 'C', text: 'the inverse of b' },
      { label: 'D', text: 'the rows of A' },
    ],
    correctOption: 'B',
    explanation: 'Ax = x₁(col 1) + ... + xₙ(col n) = b: we are scaling column arrows to build target b.',
  },
  {
    id: 'mcq-3-3',
    chapterId: 3,
    question: 'x + y = 1 and x + y = 3 are parallel lines. In the column picture this means…',
    options: [
      { label: 'A', text: 'both columns are zero' },
      { label: 'B', text: 'b = (1, 3) is not on the line spanned by the columns' },
      { label: 'C', text: 'the columns are perpendicular' },
      { label: 'D', text: 'b equals a column' },
    ],
    correctOption: 'B',
    explanation: 'Both columns are (1, 1), so their combinations only span the line y = x. Vector (1, 3) is off this line, so unreachable.',
  },

  // Chapter 4
  {
    id: 'mcq-4-1',
    chapterId: 4,
    question: 'If A is 3 × 2 and B is 2 × 4, then AB is…',
    options: [
      { label: 'A', text: '3 × 4' },
      { label: 'B', text: '2 × 2' },
      { label: 'C', text: '4 × 3' },
      { label: 'D', text: 'not defined' },
    ],
    correctOption: 'A',
    explanation: 'Inner sizes match (2 = 2); outer sizes survive: 3 × 4.',
  },
  {
    id: 'mcq-4-2',
    chapterId: 4,
    question: 'The columns of AB are…',
    options: [
      { label: 'A', text: 'combinations of the columns of A' },
      { label: 'B', text: 'combinations of the rows of A' },
      { label: 'C', text: 'combinations of the columns of B only' },
      { label: 'D', text: 'always equal to the columns of B' },
    ],
    correctOption: 'A',
    explanation: 'Column j of AB = A × (column j of B), which is a combination of columns of A.',
  },
  {
    id: 'mcq-4-3',
    chapterId: 4,
    question: 'Which statement is ALWAYS true for compatible matrices?',
    options: [
      { label: 'A', text: 'AB = BA' },
      { label: 'B', text: '(AB)C = A(BC)' },
      { label: 'C', text: '(A + B)² = A² + 2AB + B²' },
      { label: 'D', text: 'AB = 0 implies A = 0 or B = 0' },
    ],
    correctOption: 'B',
    explanation: 'Matrix multiplication is strictly associative: (AB)C = A(BC). Commutativity and zero-product properties fail.',
  },

  // Chapter 5
  {
    id: 'mcq-5-1',
    chapterId: 5,
    question: '||(2, -2, 1)|| =',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '9' },
    ],
    correctOption: 'B',
    explanation: '√(2² + (-2)² + 1²) = √(4 + 4 + 1) = √9 = 3.',
  },
  {
    id: 'mcq-5-2',
    chapterId: 5,
    question: 'If u · v = 0 (both nonzero), the vectors are…',
    options: [
      { label: 'A', text: 'parallel' },
      { label: 'B', text: 'equal' },
      { label: 'C', text: 'perpendicular' },
      { label: 'D', text: 'opposite' },
    ],
    correctOption: 'C',
    explanation: 'Dot product zero implies cos θ = 0 ⇒ angle θ = 90° (perpendicular / orthogonal).',
  },
  {
    id: 'mcq-5-3',
    chapterId: 5,
    question: '(1, 2) + 3(0, -1) =',
    options: [
      { label: 'A', text: '(1, -1)' },
      { label: 'B', text: '(3, -3)' },
      { label: 'C', text: '(1, 5)' },
      { label: 'D', text: '(4, -1)' },
    ],
    correctOption: 'A',
    explanation: '(1 + 3·0, 2 + 3·(-1)) = (1, 2 - 3) = (1, -1).',
  },

  // Chapter 6
  {
    id: 'mcq-6-1',
    chapterId: 6,
    question: 'Write (4, 5) as a(1, 1) + b(0, 1). Then (a, b) =',
    options: [
      { label: 'A', text: '(4, 1)' },
      { label: 'B', text: '(1, 4)' },
      { label: 'C', text: '(4, 5)' },
      { label: 'D', text: '(5, 4)' },
    ],
    correctOption: 'A',
    explanation: 'a = 4 from the first component; a + b = 5 ⇒ 4 + b = 5 ⇒ b = 1.',
  },
  {
    id: 'mcq-6-2',
    chapterId: 6,
    question: 'Which vector is NOT a linear combination of (1, 2) and (2, 4)?',
    options: [
      { label: 'A', text: '(3, 6)' },
      { label: 'B', text: '(-1, -2)' },
      { label: 'C', text: '(0, 0)' },
      { label: 'D', text: '(3, 5)' },
    ],
    correctOption: 'D',
    explanation: 'Both vectors lie on y = 2x. (3, 5) has y ≠ 2x, so it is outside their span.',
  },
  {
    id: 'mcq-6-3',
    chapterId: 6,
    question: 'The zero vector is a linear combination of any set of vectors.',
    options: [
      { label: 'A', text: 'True' },
      { label: 'B', text: 'False' },
      { label: 'C', text: 'Only if they are independent' },
      { label: 'D', text: 'Only if there are two vectors' },
    ],
    correctOption: 'A',
    explanation: 'True: simply choose all scalar weights equal to 0.',
  },

  // Chapter 7
  {
    id: 'mcq-7-1',
    chapterId: 7,
    question: 'The span of one nonzero vector in ℝ³ is…',
    options: [
      { label: 'A', text: 'a point' },
      { label: 'B', text: 'a line through the origin' },
      { label: 'C', text: 'a plane' },
      { label: 'D', text: 'all of ℝ³' },
    ],
    correctOption: 'B',
    explanation: 'All scalar multiples c·v form an infinite straight line passing through the origin (0, 0, 0).',
  },
  {
    id: 'mcq-7-2',
    chapterId: 7,
    question: 'Do (1, 0), (0, 1), (1, 1) span ℝ²?',
    options: [
      { label: 'A', text: 'Yes' },
      { label: 'B', text: 'No' },
      { label: 'C', text: 'Only two of them do not' },
      { label: 'D', text: 'Cannot say' },
    ],
    correctOption: 'A',
    explanation: 'Yes: (1, 0) and (0, 1) already span ℝ²; adding extra vectors cannot reduce the span.',
  },
  {
    id: 'mcq-7-3',
    chapterId: 7,
    question: 'Can two vectors span ℝ³?',
    options: [
      { label: 'A', text: 'Yes, always' },
      { label: 'B', text: 'Yes, if they are independent' },
      { label: 'C', text: 'No, never' },
      { label: 'D', text: 'Only if one is zero' },
    ],
    correctOption: 'C',
    explanation: 'Never! Two vectors can at most span a 2D plane. Spanning 3D ℝ³ requires at least 3 vectors.',
  },

  // Chapter 8
  {
    id: 'mcq-8-1',
    chapterId: 8,
    question: 'To clear entry 6 below pivot 2, the multiplier l is…',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '12' },
    ],
    correctOption: 'B',
    explanation: 'l = entry / pivot = 6 / 2 = 3. Then subtract 3 × pivot row.',
  },
  {
    id: 'mcq-8-2',
    chapterId: 8,
    question: 'After elimination a row reads [0 0 0 | 5]. The system has…',
    options: [
      { label: 'A', text: 'one solution' },
      { label: 'B', text: 'no solution' },
      { label: 'C', text: 'infinitely many solutions' },
      { label: 'D', text: 'two solutions' },
    ],
    correctOption: 'B',
    explanation: '0·x + 0·y + 0·z = 5 is impossible (contradiction), meaning the system has no solution.',
  },
  {
    id: 'mcq-8-3',
    chapterId: 8,
    question: 'A pivot position holds 0 and the entry below is nonzero. You should…',
    options: [
      { label: 'A', text: 'stop: no solution' },
      { label: 'B', text: 'swap the two rows' },
      { label: 'C', text: 'divide by zero' },
      { label: 'D', text: 'delete the column' },
    ],
    correctOption: 'B',
    explanation: 'Perform a row exchange (P) to bring a nonzero number into the pivot position.',
  },

  // Chapter 9
  {
    id: 'mcq-9-1',
    chapterId: 9,
    question: 'Which is NOT a legal row operation?',
    options: [
      { label: 'A', text: 'swap two rows' },
      { label: 'B', text: 'multiply a row by 5' },
      { label: 'C', text: 'multiply a row by 0' },
      { label: 'D', text: 'add 3×row 1 to row 2' },
    ],
    correctOption: 'C',
    explanation: 'Multiplying by 0 erases the equation and cannot be undone (irreversible).',
  },
  {
    id: 'mcq-9-2',
    chapterId: 9,
    question: 'In RREF each pivot is…',
    options: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1, with zeros above and below' },
      { label: 'C', text: 'the largest entry' },
      { label: 'D', text: 'negative' },
    ],
    correctOption: 'B',
    explanation: 'By definition of RREF, each leading entry is normalized to 1 with zeros in the rest of its column.',
  },
  {
    id: 'mcq-9-3',
    chapterId: 9,
    question: 'Row operations always preserve the…',
    options: [
      { label: 'A', text: 'column space' },
      { label: 'B', text: 'null space' },
      { label: 'C', text: 'determinant' },
      { label: 'D', text: 'individual entries of the matrix' },
    ],
    correctOption: 'B',
    explanation: 'Row operations preserve the solutions to Ax = 0, so the null space (and row space) are invariant.',
  },

  // Chapter 10
  {
    id: 'mcq-10-1',
    chapterId: 10,
    question: 'The matrix that adds 4×(row 1) to row 3 in a 3×3 system is I with…',
    options: [
      { label: 'A', text: '4 in position (1, 3)' },
      { label: 'B', text: '4 in position (3, 1)' },
      { label: 'C', text: '4 in position (3, 3)' },
      { label: 'D', text: '-4 in position (1, 3)' },
    ],
    correctOption: 'B',
    explanation: 'To modify row 3 using row 1, the entry sits in row 3, column 1.',
  },
  {
    id: 'mcq-10-2',
    chapterId: 10,
    question: 'The inverse of a row-swap matrix P is…',
    options: [
      { label: 'A', text: 'itself (P⁻¹ = P)' },
      { label: 'B', text: 'its negative' },
      { label: 'C', text: 'the zero matrix' },
      { label: 'D', text: 'not defined' },
    ],
    correctOption: 'A',
    explanation: 'Swapping rows twice returns the matrix back to the original order, so P² = I and P⁻¹ = P.',
  },
  {
    id: 'mcq-10-3',
    chapterId: 10,
    question: 'EA (with E elementary) means…',
    options: [
      { label: 'A', text: 'do the row operation to A' },
      { label: 'B', text: 'do the column operation to A' },
      { label: 'C', text: 'transpose A' },
      { label: 'D', text: 'invert A' },
    ],
    correctOption: 'A',
    explanation: 'Left-multiplying by an elementary matrix applies that operation to the ROWS of A.',
  },

  // Chapter 11
  {
    id: 'mcq-11-1',
    chapterId: 11,
    question: 'In A = LU, the matrix L has…',
    options: [
      { label: 'A', text: '1s on the diagonal and multipliers below' },
      { label: 'B', text: 'pivots on the diagonal' },
      { label: 'C', text: 'zeros below the diagonal' },
      { label: 'D', text: 'all entries equal to 1' },
    ],
    correctOption: 'A',
    explanation: 'L is unit lower triangular: exactly 1s on diagonal, zeros above, and positive multipliers below.',
  },
  {
    id: 'mcq-11-2',
    chapterId: 11,
    question: 'To solve Ax = b with A = LU, we first solve…',
    options: [
      { label: 'A', text: 'Ux = b' },
      { label: 'B', text: 'Lc = b' },
      { label: 'C', text: 'Ac = b' },
      { label: 'D', text: 'LUc = 0' },
    ],
    correctOption: 'B',
    explanation: 'First solve Lc = b for c by forward substitution, then solve Ux = c for x by back substitution.',
  },
  {
    id: 'mcq-11-3',
    chapterId: 11,
    question: 'Why is LU efficient when we have many right-hand sides b?',
    options: [
      { label: 'A', text: 'L is symmetric' },
      { label: 'B', text: 'Factorisation is done once; each new b needs only triangular solves' },
      { label: 'C', text: 'It avoids pivots' },
      { label: 'D', text: 'It makes A diagonal' },
    ],
    correctOption: 'B',
    explanation: 'The O(n³/3) elimination cost is paid once. Each additional b costs only O(n²) triangular solves.',
  },

  // Chapter 12
  {
    id: 'mcq-12-1',
    chapterId: 12,
    question: 'Are (1, 2) and (2, 4) independent?',
    options: [
      { label: 'A', text: 'Yes' },
      { label: 'B', text: 'No — the second is twice the first' },
      { label: 'C', text: 'Only in ℝ³' },
      { label: 'D', text: 'Cannot be decided' },
    ],
    correctOption: 'B',
    explanation: '2·(1, 2) - 1·(2, 4) = (0, 0) is a non-trivial dependency relation, so they are dependent.',
  },
  {
    id: 'mcq-12-2',
    chapterId: 12,
    question: 'Four vectors in ℝ³ are always…',
    options: [
      { label: 'A', text: 'independent' },
      { label: 'B', text: 'dependent' },
      { label: 'C', text: 'orthogonal' },
      { label: 'D', text: 'a basis' },
    ],
    correctOption: 'B',
    explanation: 'Any k > m vectors in ℝᵐ are always linearly dependent (4 > 3).',
  },
  {
    id: 'mcq-12-3',
    chapterId: 12,
    question: 'The columns of A are independent exactly when…',
    options: [
      { label: 'A', text: 'Ax = 0 has only x = 0' },
      { label: 'B', text: 'A has a zero row' },
      { label: 'C', text: 'A is symmetric' },
      { label: 'D', text: 'A is square' },
    ],
    correctOption: 'A',
    explanation: 'By definition, independence means no non-trivial combination gives 0, so N(A) = {0}.',
  },

  // Chapter 13
  {
    id: 'mcq-13-1',
    chapterId: 13,
    question: 'If A is 5 × 3, then C(A) is a subspace of…',
    options: [
      { label: 'A', text: 'ℝ³' },
      { label: 'B', text: 'ℝ⁵' },
      { label: 'C', text: 'ℝ⁸' },
      { label: 'D', text: 'ℝ¹⁵' },
    ],
    correctOption: 'B',
    explanation: 'Each column has m = 5 entries, so the column vectors live inside ℝ⁵.',
  },
  {
    id: 'mcq-13-2',
    chapterId: 13,
    question: 'Ax = b is solvable exactly when…',
    options: [
      { label: 'A', text: 'b is in C(A)' },
      { label: 'B', text: 'b = 0' },
      { label: 'C', text: 'A is square' },
      { label: 'D', text: 'b is a row of A' },
    ],
    correctOption: 'A',
    explanation: 'Ax is a combination of columns of A, so b can only be reached if b lies in C(A).',
  },
  {
    id: 'mcq-13-3',
    chapterId: 13,
    question: 'A basis for C(A) is given by…',
    options: [
      { label: 'A', text: 'pivot columns of the original A' },
      { label: 'B', text: 'pivot columns of RREF' },
      { label: 'C', text: 'pivot rows of A' },
      { label: 'D', text: 'free columns' },
    ],
    correctOption: 'A',
    explanation: 'Pivot columns identified in RREF must be extracted from the ORIGINAL matrix A.',
  },

  // Chapter 14
  {
    id: 'mcq-14-1',
    chapterId: 14,
    question: 'The rank of [1 2; 2 4] is…',
    options: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '4' },
    ],
    correctOption: 'B',
    explanation: 'Row 2 is twice row 1; elimination produces a row of zeros. There is only 1 pivot, so rank = 1.',
  },
  {
    id: 'mcq-14-2',
    chapterId: 14,
    question: 'The largest possible rank of a 3 × 5 matrix is…',
    options: [
      { label: 'A', text: '3' },
      { label: 'B', text: '5' },
      { label: 'C', text: '8' },
      { label: 'D', text: '15' },
    ],
    correctOption: 'A',
    explanation: 'Rank r ≤ min(m, n) = min(3, 5) = 3.',
  },
  {
    id: 'mcq-14-3',
    chapterId: 14,
    question: 'If r = m < n, then Ax = b has…',
    options: [
      { label: 'A', text: 'no solution for some b' },
      { label: 'B', text: 'exactly one solution for every b' },
      { label: 'C', text: 'infinitely many solutions for every b' },
      { label: 'D', text: 'exactly two solutions' },
    ],
    correctOption: 'C',
    explanation: 'Full row rank (r = m) guarantees existence for every b. n > r gives free variables, yielding infinitely many solutions.',
  },

  // Chapter 15
  {
    id: 'mcq-15-1',
    chapterId: 15,
    question: 'A is 3 × 5 with rank 2. dim N(A) =',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '5' },
      { label: 'D', text: '1' },
    ],
    correctOption: 'B',
    explanation: 'dim N(A) = n - r = 5 - 2 = 3.',
  },
  {
    id: 'mcq-15-2',
    chapterId: 15,
    question: 'The number of special solutions equals…',
    options: [
      { label: 'A', text: 'the rank' },
      { label: 'B', text: 'the number of pivots' },
      { label: 'C', text: 'the number of free variables' },
      { label: 'D', text: 'the number of rows' },
    ],
    correctOption: 'C',
    explanation: 'Each free variable produces exactly one special solution when set to 1 (with other free variables 0).',
  },
  {
    id: 'mcq-15-3',
    chapterId: 15,
    question: 'N(A) = {0} exactly when the columns of A are…',
    options: [
      { label: 'A', text: 'dependent' },
      { label: 'B', text: 'independent' },
      { label: 'C', text: 'zero' },
      { label: 'D', text: 'equal' },
    ],
    correctOption: 'B',
    explanation: 'If only x = 0 gives Ax = 0, no non-trivial column combination can make zero, so columns are linearly independent.',
  },

  // Chapter 16
  {
    id: 'mcq-16-1',
    chapterId: 16,
    question: 'The complete solution of Ax = b is…',
    options: [
      { label: 'A', text: 'xₚ only' },
      { label: 'B', text: 'xₚ + xₙ' },
      { label: 'C', text: 'xₙ only' },
      { label: 'D', text: 'xₚ · xₙ' },
    ],
    correctOption: 'B',
    explanation: 'One particular solution plus any vector in the null space: x = xₚ + xₙ.',
  },
  {
    id: 'mcq-16-2',
    chapterId: 16,
    question: 'If A is 3 × 3 and invertible, Ax = b has…',
    options: [
      { label: 'A', text: 'no solution' },
      { label: 'B', text: 'exactly one solution' },
      { label: 'C', text: 'infinitely many solutions' },
      { label: 'D', text: 'exactly three solutions' },
    ],
    correctOption: 'B',
    explanation: 'x = A⁻¹b is the unique solution.',
  },
  {
    id: 'mcq-16-3',
    chapterId: 16,
    question: 'If N(A) = {0} and Ax = b is consistent, the number of solutions is…',
    options: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: 'infinite' },
    ],
    correctOption: 'B',
    explanation: 'No free variables means no null space freedom; the solution is unique.',
  },

  // Chapter 17
  {
    id: 'mcq-17-1',
    chapterId: 17,
    question: 'Which is a subspace of ℝ²?',
    options: [
      { label: 'A', text: '{x ≥ 0}' },
      { label: 'B', text: '{y = 3x}' },
      { label: 'C', text: '{y = 3x + 1}' },
      { label: 'D', text: '{xy = 0}' },
    ],
    correctOption: 'B',
    explanation: 'y = 3x passes through (0, 0) and is closed under both addition and scalar multiplication.',
  },
  {
    id: 'mcq-17-2',
    chapterId: 17,
    question: 'Every subspace must contain…',
    options: [
      { label: 'A', text: 'the vector (1, 1, ..., 1)' },
      { label: 'B', text: 'the zero vector 0' },
      { label: 'C', text: 'a basis of ℝⁿ' },
      { label: 'D', text: 'an infinite set of unit vectors' },
    ],
    correctOption: 'B',
    explanation: '0·v = 0, so closure under scalar multiplication forces 0 to be in every subspace.',
  },
  {
    id: 'mcq-17-3',
    chapterId: 17,
    question: 'The union of two different lines through the origin in ℝ² is…',
    options: [
      { label: 'A', text: 'a subspace' },
      { label: 'B', text: 'not a subspace' },
      { label: 'C', text: 'the whole plane' },
      { label: 'D', text: 'empty' },
    ],
    correctOption: 'B',
    explanation: 'Taking one vector from line 1 and one from line 2 adds to a vector off both lines (fails addition closure).',
  },

  // Chapter 18
  {
    id: 'mcq-18-1',
    chapterId: 18,
    question: 'Which is a basis of ℝ²?',
    options: [
      { label: 'A', text: '(1, 2), (2, 4)' },
      { label: 'B', text: '(1, 0), (1, 1)' },
      { label: 'C', text: '(0, 0), (1, 1)' },
      { label: 'D', text: '(1, 1), (2, 2), (3, 3)' },
    ],
    correctOption: 'B',
    explanation: '(1, 0) and (1, 1) are linearly independent and span ℝ².',
  },
  {
    id: 'mcq-18-2',
    chapterId: 18,
    question: 'A basis for N(A) is obtained from…',
    options: [
      { label: 'A', text: 'pivot columns' },
      { label: 'B', text: 'the special solutions' },
      { label: 'C', text: 'the rows of A' },
      { label: 'D', text: 'the identity matrix' },
    ],
    correctOption: 'B',
    explanation: 'Setting each free variable to 1 produces the special solutions, which form a basis for N(A).',
  },
  {
    id: 'mcq-18-3',
    chapterId: 18,
    question: 'In a basis, each vector’s coordinates are…',
    options: [
      { label: 'A', text: 'not unique' },
      { label: 'B', text: 'unique' },
      { label: 'C', text: 'always integers' },
      { label: 'D', text: 'always positive' },
    ],
    correctOption: 'B',
    explanation: 'Linear independence guarantees that every vector in the span has a UNIQUE combination recipe.',
  },

  // Chapter 19
  {
    id: 'mcq-19-1',
    chapterId: 19,
    question: 'The dimension of the plane x + y + z = 0 in ℝ³ is…',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '2' },
      { label: 'C', text: '3' },
      { label: 'D', text: '0' },
    ],
    correctOption: 'B',
    explanation: 'One constraint removes one degree of freedom from 3D space: 3 - 1 = 2.',
  },
  {
    id: 'mcq-19-2',
    chapterId: 19,
    question: 'A is 6 × 9 with rank 4. dim N(A) =',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '9' },
    ],
    correctOption: 'C',
    explanation: 'dim N(A) = n - r = 9 - 4 = 5.',
  },
  {
    id: 'mcq-19-3',
    chapterId: 19,
    question: 'Five vectors in a 4-dimensional space are always…',
    options: [
      { label: 'A', text: 'independent' },
      { label: 'B', text: 'dependent' },
      { label: 'C', text: 'a basis' },
      { label: 'D', text: 'orthogonal' },
    ],
    correctOption: 'B',
    explanation: 'Any set of more than n vectors in an n-dimensional space is always linearly dependent (5 > 4).',
  },

  // Chapter 20
  {
    id: 'mcq-20-1',
    chapterId: 20,
    question: 'For a 4 × 7 matrix of rank 3, dim N(Aᵀ) =',
    options: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '4' },
      { label: 'D', text: '7' },
    ],
    correctOption: 'A',
    explanation: 'dim N(Aᵀ) = m - r = 4 - 3 = 1.',
  },
  {
    id: 'mcq-20-2',
    chapterId: 20,
    question: 'The row space is orthogonal to…',
    options: [
      { label: 'A', text: 'the column space' },
      { label: 'B', text: 'the null space' },
      { label: 'C', text: 'the left null space' },
      { label: 'D', text: 'itself' },
    ],
    correctOption: 'B',
    explanation: 'Ax = 0 means every row of A has dot product 0 with every vector in the null space: C(Aᵀ) ⊥ N(A).',
  },
  {
    id: 'mcq-20-3',
    chapterId: 20,
    question: 'Which two fundamental subspaces live in ℝᵐ?',
    options: [
      { label: 'A', text: 'C(A) and N(Aᵀ)' },
      { label: 'B', text: 'C(A) and N(A)' },
      { label: 'C', text: 'C(Aᵀ) and N(A)' },
      { label: 'D', text: 'C(Aᵀ) and N(Aᵀ)' },
    ],
    correctOption: 'A',
    explanation: 'Column space C(A) and Left Null space N(Aᵀ) live in ℝᵐ; Row space C(Aᵀ) and Null space N(A) live in ℝⁿ.',
  },
];

export const linearAlgebraBrainGym: LinearAlgebraBrainGym[] = [
  {
    id: 1,
    title: 'The Pune Stationery Shop',
    scenario: 'A shop sells 3 pens + 2 notebooks for ₹70 and 2 pens + 3 notebooks for ₹80. (a) Find the price of a pen and a notebook. (b) Next day the owner records a sale of 6 pens + 4 notebooks for ₹150. Is this record consistent with earlier prices? What does the algebra say?',
    solutionSteps: [
      'Step 1. Equations: 3p + 2n = 70 and 2p + 3n = 80.',
      'Step 2. Multiply eq 1 by 3 and eq 2 by 2: 9p + 6n = 210, 4p + 6n = 160.',
      'Step 3. Subtract: 5p = 50 ⇒ p = ₹10. Then 2(10) + 3n = 80 ⇒ 3n = 60 ⇒ n = ₹20.',
      'Step 4. Part (b): 6 pens + 4 notebooks = 2 × (3p + 2n) = 2 × 70 = ₹140.',
    ],
    finalAnswer: '(a) Pen = ₹10, Notebook = ₹20. (b) Inconsistent! 6p + 4n must equal ₹140, not ₹150. The shopkeeper made a ₹10 billing error.',
  },
  {
    id: 2,
    title: 'The Gym-Trainer Meal Plan',
    scenario: 'Food 1 gives 10g protein and 5g carbs per serving; Food 2 gives 5g protein and 15g carbs. A trainer wants exactly 40g protein and 45g carbs. (a) Write the problem as Ax = b. (b) How many servings of each food are needed?',
    solutionSteps: [
      'Step 1. Let x₁ = servings Food 1, x₂ = servings Food 2. A = [10 5; 5 15], x = [x₁; x₂], b = [40; 45].',
      'Step 2. 10x₁ + 5x₂ = 40 ⇒ 2x₁ + x₂ = 8 ⇒ x₂ = 8 - 2x₁.',
      'Step 3. Substitute into 5x₁ + 15x₂ = 45 ⇒ x₁ + 3x₂ = 9 ⇒ x₁ + 3(8 - 2x₁) = 9 ⇒ -5x₁ = -15 ⇒ x₁ = 3.',
      'Step 4. x₂ = 8 - 2(3) = 2. Check: 10(3) + 5(2) = 40 ✓, 5(3) + 15(2) = 45 ✓.',
    ],
    finalAnswer: '(a) A = [10 5; 5 15], x = [x₁; x₂], b = [40; 45]. (b) 3 servings of Food 1 and 2 servings of Food 2.',
  },
  {
    id: 3,
    title: 'The Juice-Stall Recipe',
    scenario: 'Syrup A gives 2 units orange and 1 unit sugar; Syrup B gives 1 unit orange and 2 units sugar per scoop. A customer wants 4 units orange and 5 units sugar. Use the column picture: how many scoops of A and B? Can the stall make every possible (orange, sugar) combination?',
    solutionSteps: [
      'Step 1. Column equation: a·[2, 1]ᵀ + b·[1, 2]ᵀ = [4, 5]ᵀ.',
      'Step 2. 2a + b = 4 ⇒ b = 4 - 2a. Second equation: a + 2b = 5 ⇒ a + 2(4 - 2a) = 5 ⇒ -3a = -3 ⇒ a = 1.',
      'Step 3. b = 4 - 2(1) = 2 scoops of B.',
      'Step 4. The column vectors (2, 1) and (1, 2) are not parallel, so their combinations fill the entire 2D plane ℝ².',
    ],
    finalAnswer: '1 scoop of Syrup A and 2 scoops of Syrup B. Yes: any (orange, sugar) combination can be produced mathematically.',
  },
  {
    id: 4,
    title: 'Canteen Revenue',
    scenario: 'On Monday a canteen sells 10 vada-pav and 5 chai; on Tuesday 8 vada-pav and 12 chai. Normal prices: ₹15 and ₹10. Festival prices: ₹18 and ₹12. Use ONE matrix product to get revenue for both days at both price lists.',
    solutionSteps: [
      'Step 1. Sales matrix A (days × items): A = [10 5; 8 12] (2 × 2).',
      'Step 2. Price matrix B (items × price-lists): B = [15 18; 10 12] (2 × 2).',
      'Step 3. Multiply AB: Monday Normal = 10(15)+5(10) = 200; Monday Festival = 10(18)+5(12) = 240.',
      'Step 4. Tuesday Normal = 8(15)+12(10) = 240; Tuesday Festival = 8(18)+12(12) = 288.',
    ],
    finalAnswer: 'AB = [200 240; 240 288]. Monday earns ₹200 (Normal) / ₹240 (Festival); Tuesday earns ₹240 (Normal) / ₹288 (Festival).',
  },
  {
    id: 5,
    title: 'The Drone Delivery',
    scenario: 'A drone flies 3 km east, then 4 km north, then a wind pushes it 1 km west. (a) Write its final displacement as a vector. (b) How far is it from the start in a straight line? (c) Is the first flight leg perpendicular to the wind push?',
    solutionSteps: [
      'Step 1. Displacement: v = (3, 0) + (0, 4) + (-1, 0) = (2, 4) km.',
      'Step 2. Distance from start: ||v|| = √(2² + 4²) = √20 ≈ 4.47 km.',
      'Step 3. Dot product of leg 1 (3, 0) and wind (-1, 0) is 3(-1) + 0(0) = -3 ≠ 0.',
    ],
    finalAnswer: '(a) v = (2, 4) km. (b) 4.47 km. (c) No, dot product is -3 (they are collinear in opposite directions). Leg 2 (north) is perpendicular to the wind.',
  },
  {
    id: 6,
    title: 'The Dal–Rice Mix',
    scenario: 'Packet A has 2 units rice, 1 unit dal. Packet B has 1 unit rice, 3 units dal. (a) How many packets of each make exactly 5 rice and 5 dal? (b) Can you also make 5 rice and 10 dal using whole packets?',
    solutionSteps: [
      'Step 1. a(2, 1) + b(1, 3) = (5, 5) ⇒ 2a + b = 5, a + 3b = 5.',
      'Step 2. b = 5 - 2a ⇒ a + 3(5 - 2a) = 5 ⇒ -5a = -10 ⇒ a = 2, b = 1.',
      'Step 3. Part (b): 2a + b = 5, a + 3b = 10 ⇒ b = 5 - 2a ⇒ a + 3(5 - 2a) = 10 ⇒ -5a = -5 ⇒ a = 1, b = 3.',
    ],
    finalAnswer: '(a) 2 packets of A and 1 packet of B. (b) Yes! Exactly 1 packet of A and 3 packets of B.',
  },
  {
    id: 7,
    title: 'The Grid Robot',
    scenario: 'A robot on a floor grid can move only along direction (3, 1) or (1, 2) (any distance, forward or backward, in any mix). (a) Can it reach the point (7, 4)? (b) Can it reach any point?',
    solutionSteps: [
      'Step 1. a(3, 1) + b(1, 2) = (7, 4) ⇒ 3a + b = 7, a + 2b = 4.',
      'Step 2. b = 7 - 3a ⇒ a + 2(7 - 3a) = 4 ⇒ -5a = -10 ⇒ a = 2, b = 1.',
      'Step 3. Vectors (3, 1) and (1, 2) are not parallel (det = 3·2 - 1·1 = 5 ≠ 0).',
    ],
    finalAnswer: '(a) Yes: 2 steps along (3, 1) and 1 step along (1, 2). (b) Yes: their span is the entire 2D plane ℝ².',
  },
  {
    id: 8,
    title: 'Metro Ticket Counter',
    scenario: 'At a metro station 10 passengers buy tickets: adults (a), children (c), seniors (s). Adult fare ₹20, child fare ₹10, senior fare ₹10; total collected ₹140. There is exactly 1 more adult than children. Find a, c, s by elimination.',
    solutionSteps: [
      'Step 1. Equations: a + c + s = 10; 20a + 10c + 10s = 140; a - c = 1.',
      'Step 2. Divide eq 2 by 10: 2a + c + s = 14.',
      'Step 3. Subtract eq 1 from eq 2: (2a + c + s) - (a + c + s) = 14 - 10 ⇒ a = 4.',
      'Step 4. Since a - c = 1 ⇒ c = 3. From eq 1: 4 + 3 + s = 10 ⇒ s = 3.',
    ],
    finalAnswer: '4 adults, 3 children, and 3 seniors. Check fare: 4(20) + 3(10) + 3(10) = 80 + 30 + 30 = ₹140 ✓.',
  },
  {
    id: 9,
    title: 'Balancing a Chemical Equation',
    scenario: 'Propane combustion: x₁ C₃H₈ + x₂ O₂ → x₃ CO₂ + x₄ H₂O. Balancing C, H, O gives a homogeneous linear system. Find the smallest whole-number coefficients.',
    solutionSteps: [
      'Step 1. Carbon balance: 3x₁ = x₃ ⇒ 3x₁ - x₃ = 0.',
      'Step 2. Hydrogen balance: 8x₁ = 2x₄ ⇒ 4x₁ - x₄ = 0 ⇒ x₄ = 4x₁.',
      'Step 3. Oxygen balance: 2x₂ = 2x₃ + x₄ ⇒ 2x₂ = 2(3x₁) + 4x₁ = 10x₁ ⇒ x₂ = 5x₁.',
      'Step 4. Let x₁ = 1 (free variable) ⇒ x₁ = 1, x₂ = 5, x₃ = 3, x₄ = 4.',
    ],
    finalAnswer: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. The balanced coefficients are (1, 5, 3, 4) — you just found a null space vector!',
  },
  {
    id: 10,
    title: 'The Spreadsheet Undo Button',
    scenario: 'A spreadsheet macro replaces row 3 by row 3 - 4×row 1, then swaps rows 1 and 2. (a) Write elementary matrices E and P (3×3). (b) Write M = PE. (c) Find M⁻¹ and check it undoes the changes.',
    solutionSteps: [
      'Step 1. E = [1 0 0; 0 1 0; -4 0 1]. P = [0 1 0; 1 0 0; 0 0 1].',
      'Step 2. M = PE = [0 1 0; 1 0 0; -4 0 1].',
      'Step 3. M⁻¹ = (PE)⁻¹ = E⁻¹P⁻¹ = E⁻¹P = [1 0 0; 0 1 0; 4 0 1][0 1 0; 1 0 0; 0 0 1] = [0 1 0; 1 0 0; 0 4 1].',
    ],
    finalAnswer: '(a) E = [1 0 0; 0 1 0; -4 0 1], P = [0 1 0; 1 0 0; 0 0 1]. (b) M = [0 1 0; 1 0 0; -4 0 1]. (c) M⁻¹ = [0 1 0; 1 0 0; 0 4 1].',
  },
  {
    id: 11,
    title: 'Factory Conversions (LU in Action)',
    scenario: 'A factory turns inputs (x, y) into outputs (3x + y, 6x + 5y). Day 1 target: (7, 17); Day 2 target: (8, 22). Factor the conversion matrix once, then solve for both days.',
    solutionSteps: [
      'Step 1. A = [3 1; 6 5]. Multiplier l₂₁ = 6/3 = 2. U = [3 1; 0 3]. L = [1 0; 2 1].',
      'Step 2. Day 1: Lc = [7; 17] ⇒ c₁ = 7, 2(7) + c₂ = 17 ⇒ c₂ = 3. Ux = [7; 3] ⇒ 3y = 3 ⇒ y = 1; 3x + 1 = 7 ⇒ x = 2.',
      'Step 3. Day 2: Lc = [8; 22] ⇒ c₁ = 8, 2(8) + c₂ = 22 ⇒ c₂ = 6. Ux = [8; 6] ⇒ 3y = 6 ⇒ y = 2; 3x + 2 = 8 ⇒ x = 2.',
    ],
    finalAnswer: 'A = [1 0; 2 1][3 1; 0 3]. Day 1 input: (2, 1). Day 2 input: (2, 2).',
  },
  {
    id: 12,
    title: 'Redundant Meal Plans',
    scenario: 'Three weekly meal plans (protein, carbs, fat in grams): Plan 1 = (20, 30, 10), Plan 2 = (10, 40, 20), Plan 3 = (30, 70, 30). (a) Are they independent? (b) Is target (10, 10, 10) reachable?',
    solutionSteps: [
      'Step 1. Notice: Plan 1 + Plan 2 = (20+10, 30+40, 10+20) = (30, 70, 30) = Plan 3.',
      'Step 2. Plan 3 is a direct sum of Plans 1 and 2, so they are linearly dependent.',
      'Step 3. Solve a(20, 30, 10) + b(10, 40, 20) = (10, 10, 10): 20a + 10b = 10, 30a + 40b = 10 ⇒ a = 3/5, b = -1/5.',
      'Step 4. Third coordinate check: 10(3/5) + 20(-1/5) = 6 - 4 = 2 ≠ 10.',
    ],
    finalAnswer: '(a) Dependent: Plan 3 = Plan 1 + Plan 2. (b) Not reachable! The three plans only span a 2D plane in ℝ³, and (10, 10, 10) is off that plane.',
  },
  {
    id: 13,
    title: 'The 3-Output Machine',
    scenario: 'A machine takes inputs (x, y) and outputs (x + 2y, 2x + 5y, x + y). (a) Describe all achievable outputs C(A). (b) Can it output (3, 7, 4)? (c) Can it output (3, 7, 2)?',
    solutionSteps: [
      'Step 1. A = [1 2; 2 5; 1 1]. Columns v₁ = (1, 2, 1), v₂ = (2, 5, 1).',
      'Step 2. Normal vector n = v₁ × v₂ = (-3, 1, 1). C(A) is the plane -3b₁ + b₂ + b₃ = 0.',
      'Step 3. Test (3, 7, 4): -3(3) + 7 + 4 = 2 ≠ 0 ✗ (Unreachable).',
      'Step 4. Test (3, 7, 2): -3(3) + 7 + 2 = 0 ✓. Solvable with x = 1, y = 1.',
    ],
    finalAnswer: '(a) C(A) is the 2D plane -3b₁ + b₂ + b₃ = 0 in ℝ³. (b) (3, 7, 4) is impossible. (c) (3, 7, 2) is achievable with input (1, 1).',
  },
  {
    id: 14,
    title: 'The Offer Matrix',
    scenario: 'Supermarket combo offers on items: O₁ = (1, 1, 0), O₂ = (0, 1, 1), O₃ = (1, 2, 1), O₄ = (1, 0, -1). (a) Find rank. (b) How many offers are redundant? (c) Find a non-zero vector x with Oᵢ · x = 0 for all four.',
    solutionSteps: [
      'Step 1. Notice O₃ = O₁ + O₂ and O₄ = O₁ - O₂.',
      'Step 2. Only O₁ and O₂ are independent, so rank = 2.',
      'Step 3. Redundant offers: 4 - 2 = 2 offers are redundant.',
      'Step 4. Solve Ax = 0: x₁ + x₂ = 0 and x₂ + x₃ = 0 ⇒ x₁ = 1, x₂ = -1, x₃ = 1 ⇒ x = (1, -1, 1).',
    ],
    finalAnswer: '(a) Rank = 2. (b) 2 offers are redundant. (c) x = (1, -1, 1) spans the null space (perpendicular to all 4 offers).',
  },
  {
    id: 15,
    title: 'Traffic Circle Flows',
    scenario: 'At 3 junctions, vehicle flows must balance: x₁ - x₂ - x₃ = 0, x₂ - x₄ = 0, x₃ + x₄ - x₅ = 0. (a) Find a basis of N(A). (b) If roads 2 and 3 carry 300 and 500 vehicles/hr, what do the others carry?',
    solutionSteps: [
      'Step 1. 3 equations, 5 unknowns. Free variables: x₂ and x₃.',
      'Step 2. Express pivots in free variables: x₄ = x₂, x₅ = x₂ + x₃, x₁ = x₂ + x₃.',
      'Step 3. Special solution 1 (x₂=1, x₃=0): s₁ = (1, 1, 0, 1, 1). Special solution 2 (x₂=0, x₃=1): s₂ = (1, 0, 1, 0, 1).',
      'Step 4. Part (b): x = 300·s₁ + 500·s₂ ⇒ x₁ = 800, x₂ = 300, x₃ = 500, x₄ = 300, x₅ = 800.',
    ],
    finalAnswer: '(a) Basis for N(A): {(1, 1, 0, 1, 1), (1, 0, 1, 0, 1)}. Dimension = 2. (b) x₁ = 800, x₄ = 300, x₅ = 800 vehicles/hr.',
  },
  {
    id: 16,
    title: 'The Fertilizer Blend',
    scenario: 'A farmer mixes three fertilizers a, b, c (kg). Total weight = 10 kg, nutrient score a + 2b + 3c = 18. (a) Give the complete solution. (b) Which solutions are physically valid (all ≥ 0)? (c) Costs are ₹20, ₹30, ₹10 per kg: find the cheapest valid blend.',
    solutionSteps: [
      'Step 1. a + b + c = 10, a + 2b + 3c = 18. Subtract: b + 2c = 8 ⇒ b = 8 - 2c. Then a = 10 - b - c = 2 + c.',
      'Step 2. Complete solution with free c = t: (a, b, c) = (2, 8, 0) + t(1, -2, 1).',
      'Step 3. Physical validity: a = 2 + t ≥ 0, b = 8 - 2t ≥ 0 ⇒ t ≤ 4, c = t ≥ 0. Range: 0 ≤ t ≤ 4.',
      'Step 4. Cost C = 20(2 + t) + 30(8 - 2t) + 10t = 40 + 240 + t(20 - 60 + 10) = 280 - 30t.',
      'Step 5. To minimize cost, pick largest t = 4: Cost = 280 - 30(4) = ₹160.',
    ],
    finalAnswer: '(a) (a, b, c) = (2, 8, 0) + t(1, -2, 1). (b) Valid for 0 ≤ t ≤ 4. (c) Cheapest blend at t = 4: 6 kg of a, 0 kg of b, 4 kg of c costing ₹160.',
  },
  {
    id: 17,
    title: 'Net-Zero Staffing',
    scenario: 'Headcount reallocation among 3 branches: (x, y, z) = change in staff, must satisfy x + y + z = 0. (a) Show valid plans can be added and scaled. (b) Is "net change exactly +5" a subspace? (c) Find a basis of valid plans.',
    solutionSteps: [
      'Step 1. If x₁ + y₁ + z₁ = 0 and x₂ + y₂ + z₂ = 0, their sum has sum 0 + 0 = 0, and c·(sum) = c·0 = 0. Zero plan (0,0,0) is valid.',
      'Step 2. "Net change = 5" excludes (0,0,0) and doubling gives net change 10 ≠ 5 (fails closure). Not a subspace.',
      'Step 3. Basis for x + y + z = 0: x = -y - z ⇒ b₁ = (-1, 1, 0) and b₂ = (-1, 0, 1).',
    ],
    finalAnswer: '(a) Valid plans form a true subspace (plane through origin). (b) "Net change = 5" is NOT a subspace. (c) Basis: {(-1, 1, 0), (-1, 0, 1)}, dimension = 2.',
  },
  {
    id: 18,
    title: 'Designer Colors',
    scenario: 'A designer defines basis colors Warm = (1, 1, 0), Cool = (0, 1, 1), Light = (1, 0, 1). (a) Show they form a basis of ℝ³. (b) Express color (4, 2, 2) in this basis.',
    solutionSteps: [
      'Step 1. Put into matrix A = [1 0 1; 1 1 0; 0 1 1]. Determinant = 1(1) + 1(1) = 2 ≠ 0 ⇒ 3 pivots ⇒ basis of ℝ³.',
      'Step 2. Solve a(1, 1, 0) + b(0, 1, 1) + c(1, 0, 1) = (4, 2, 2).',
      'Step 3. a + c = 4, a + b = 2, b + c = 2. Adding all three: 2(a + b + c) = 8 ⇒ a + b + c = 4.',
      'Step 4. b = 4 - (a + c) = 0; c = 4 - (a + b) = 2; a = 4 - (b + c) = 2.',
    ],
    finalAnswer: '(a) They are linearly independent and span ℝ³, so they form a basis. (b) (4, 2, 2) = 2 Warm + 0 Cool + 2 Light.',
  },
  {
    id: 19,
    title: 'Compressing a Sales Table',
    scenario: 'A shop records 6 days × 5 products. Analysis reveals Product 4 = Product 1 + Product 2, and Product 5 = 2 × Product 3. (a) What is the rank? (b) What are dim C(A) and dim N(A)? (c) How many numbers must you store to recover the entire 30-entry table?',
    solutionSteps: [
      'Step 1. Columns 4 and 5 are linear combinations of columns 1, 2, and 3. Rank = 3.',
      'Step 2. dim C(A) = rank = 3. dim N(A) = n - r = 5 - 3 = 2.',
      'Step 3. To reconstruct table: store columns 1, 2, 3 (6 × 3 = 18 numbers) plus the two reconstruction rules.',
    ],
    finalAnswer: '(a) Rank = 3. (b) dim C(A) = 3, dim N(A) = 2. (c) Store 18 numbers + 2 rules instead of 30 numbers (40% compression!).',
  },
  {
    id: 20,
    title: 'The Surveyor’s Check',
    scenario: 'Surveyor measures altitude differences between 3 towns: d₁ = x_B - x_A, d₂ = x_C - x_B, d₃ = x_C - x_A. Measurements: d = (5, 3, 9). (a) Find N(A) and its physical meaning. (b) Find N(Aᵀ) and use it to check the data consistency.',
    solutionSteps: [
      'Step 1. A = [-1 1 0; 0 -1 1; -1 0 1]. Ax = 0 has solution x_A = x_B = x_C ⇒ N(A) = span{(1, 1, 1)}.',
      'Step 2. Physical meaning of N(A): adding a constant altitude to all towns leaves differences unchanged (cannot determine absolute sea-level height).',
      'Step 3. N(Aᵀ): solve yᵀA = 0 ⇒ y₁ + y₂ - y₃ = 0 ⇒ y = (1, 1, -1).',
      'Step 4. Consistency check: d must be orthogonal to N(Aᵀ): y · d = 1(5) + 1(3) - 1(9) = 5 + 3 - 9 = -1 ≠ 0!',
    ],
    finalAnswer: '(a) N(A) = span{(1, 1, 1)} (absolute heights cannot be resolved). (b) N(Aᵀ) = span{(1, 1, -1)}. Since y · d = -1 ≠ 0, the survey data is INCONSISTENT (a 1-meter measuring error exists).',
  },
];

export const linearAlgebra80Problems: LinearAlgebraClassicalProblem[] = [
  // Section A
  { id: 1, section: 'A. Systems and their solutions', difficulty: 1, problem: 'Solve x + y = 5, x - y = 1.', solution: 'Add the two equations: 2x = 6 ⇒ x = 3. Then y = 5 - 3 = 2. Solution: (x, y) = (3, 2).' },
  { id: 2, section: 'A. Systems and their solutions', difficulty: 2, problem: 'For which k does x + 2y = 3, 2x + 4y = k have (a) no solution, (b) infinitely many solutions?', solution: 'Row 2 - 2×Row 1 gives 0 = k - 6. (a) k ≠ 6: no solution (parallel lines). (b) k = 6: infinitely many solutions (coincident lines).' },
  { id: 3, section: 'A. Systems and their solutions', difficulty: 1, problem: 'Write 2x + y - z = 1, x - 3y + 2z = 0, 4x + z = 7 as Ax = b.', solution: 'A = [2 1 -1; 1 -3 2; 4 0 1], x = (x, y, z)ᵀ, b = (1, 0, 7)ᵀ. (Notice the 0 for the missing y in equation 3).' },
  { id: 4, section: 'A. Systems and their solutions', difficulty: 2, problem: 'Can a system of 2 equations in 3 unknowns have exactly one solution? Explain.', solution: 'Never. At most 2 pivots for 3 columns, so there is at least one free variable (3 - 2 = 1). If consistent, the free variable produces infinitely many solutions; otherwise none.' },
  { id: 5, section: 'A. Systems and their solutions', difficulty: 3, problem: 'For which a does x + y = 2, x + ay = 2 have exactly one solution? What happens otherwise?', solution: 'R₂ - R₁: (a - 1)y = 0. If a ≠ 1, y = 0, x = 2 (unique solution (2, 0)). If a = 1, the equations are identical, yielding infinitely many solutions (2 - t, t).' },
  { id: 6, section: 'A. Systems and their solutions', difficulty: 2, problem: 'Find c so that the three lines x + y = 2, x - y = 0, 2x + y = c pass through one common point.', solution: 'The first two lines intersect at (1, 1). The third line must pass through (1, 1): 2(1) + 1 = c ⇒ c = 3.' },
  { id: 7, section: 'A. Systems and their solutions', difficulty: 2, problem: 'Construct a 3 × 3 system, not simply "x = 1, y = 2, z = 3", whose only solution is (1, 2, 3).', solution: 'E.g., x + y + z = 6, y + z = 5, z = 3. Check: 1 + 2 + 3 = 6 ✓, 2 + 3 = 5 ✓, 3 = 3 ✓. Any upper-triangular system with nonzero pivots built around (1, 2, 3) works.' },
  { id: 8, section: 'A. Systems and their solutions', difficulty: 1, problem: 'Why does Ax = 0 always have at least one solution? When does it have more?', solution: 'x = 0 (the trivial solution) always works because A(0) = 0. More solutions exist if and only if there is at least one free variable, i.e., rank r < n.' },

  // Section B
  { id: 9, section: 'B. Row picture and column picture', difficulty: 2, problem: 'Draw the row picture of 2x - y = 0, -x + 2y = 3 and find the column-picture combination.', solution: 'Row picture: lines y = 2x and y = (x + 3)/2 cross at (1, 2). Column picture: 1·(2, -1) + 2·(-1, 2) = (0, 3) ✓.' },
  { id: 10, section: 'B. Row picture and column picture', difficulty: 2, problem: 'Is (4, 5) a combination of (1, 2) and (3, 1)?', solution: 'Solve a(1, 2) + b(3, 1) = (4, 5): a + 3b = 4, 2a + b = 5 ⇒ a = 4 - 3b ⇒ 2(4 - 3b) + b = 5 ⇒ -5b = -3 ⇒ b = 3/5, a = 11/5. Yes, with fractional weights.' },
  { id: 11, section: 'B. Row picture and column picture', difficulty: 2, problem: 'Three equations in 3 unknowns give three planes. Name the geometric picture for (i) one solution, (ii) infinitely many, (iii) none.', solution: '(i) The three planes meet at a single point. (ii) The three planes intersect in a common line (or coincide). (iii) No common point: two parallel planes, or three planes forming a triangular prism tunnel.' },
  { id: 12, section: 'B. Row picture and column picture', difficulty: 2, problem: 'For which c is (1, 2, c) in the span of (1, 0, 1) and (0, 1, 1)?', solution: 'a(1, 0, 1) + b(0, 1, 1) = (a, b, a + b) = (1, 2, c). Thus a = 1, b = 2, which forces c = a + b = 1 + 2 = 3.' },
  { id: 13, section: 'B. Row picture and column picture', difficulty: 1, problem: 'Compute Ax with A = [1 2; 3 4; 5 6], x = (2, -1)ᵀ by both row and column ways.', solution: 'Row way: [1(2)+2(-1), 3(2)+4(-1), 5(2)+6(-1)]ᵀ = (0, 2, 4)ᵀ. Column way: 2·(1, 3, 5) - 1·(2, 4, 6) = (0, 2, 4)ᵀ ✓.' },
  { id: 14, section: 'B. Row picture and column picture', difficulty: 2, problem: 'Which x makes Ax equal the 2nd column of any 2 × 3 matrix A? What does Ax equal for x = (1, 1, 1)ᵀ?', solution: 'x = (0, 1, 0)ᵀ picks column 2. For x = (1, 1, 1)ᵀ, Ax = (col 1) + (col 2) + (col 3) = sum of all three columns.' },

  // Section C
  { id: 15, section: 'C. Matrix multiplication', difficulty: 2, problem: 'With A = [1 2; 3 4] and B = [0 1; 1 0], find AB and BA. What does each do to A?', solution: 'AB = [2 1; 4 3] (swaps columns of A). BA = [3 4; 1 2] (swaps rows of A). Thus AB ≠ BA.' },
  { id: 16, section: 'C. Matrix multiplication', difficulty: 2, problem: 'Compute AB for A = [1 0 2; -1 3 1] and B = [3 1; 2 1; 1 0].', solution: 'Row 1: [1·3+0·2+2·1, 1·1+0·1+2·0] = [5, 1]. Row 2: [-1·3+3·2+1·1, -1·1+3·1+1·0] = [4, 2]. AB = [5 1; 4 2].' },
  { id: 17, section: 'C. Matrix multiplication', difficulty: 3, problem: 'Verify problem 16 using outer products (column × row sums).', solution: 'col 1 × row 1: [1; -1][3 1] = [3 1; -3 -1]. col 2 × row 2: [0; 3][2 1] = [0 0; 6 3]. col 3 × row 3: [2; 1][1 0] = [2 0; 1 0]. Sum: [3+0+2, 1+0+0; -3+6+1, -1+3+0] = [5 1; 4 2] ✓.' },
  { id: 18, section: 'C. Matrix multiplication', difficulty: 2, problem: 'How many scalar multiplications are needed to compute AB for A of size 3 × 4 and B of size 4 × 5?', solution: 'AB has size 3 × 5 = 15 entries. Each entry requires a dot product of length 4. Total = 3 × 4 × 5 = 60 multiplications.' },
  { id: 19, section: 'C. Matrix multiplication', difficulty: 2, problem: 'Show by an example that (A + B)² ≠ A² + 2AB + B² in general.', solution: '(A + B)² = A² + AB + BA + B². Since AB ≠ BA in general, AB + BA ≠ 2AB. Using A, B from problem 15 confirms the inequality.' },
  { id: 20, section: 'C. Matrix multiplication', difficulty: 3, problem: 'Find a non-zero 2 × 2 matrix A with A² = 0.', solution: 'A = [0 1; 0 0]. A² = [0 1; 0 0][0 1; 0 0] = [0 0; 0 0]. (Proves AB = 0 does NOT imply A = 0 or B = 0).' },

  // Section D
  { id: 21, section: 'D. Vectors', difficulty: 1, problem: 'Find the length and a unit vector of u = (1, 2, 2).', solution: '||u|| = √(1 + 4 + 4) = √9 = 3. Unit vector = u / ||u|| = (1/3, 2/3, 2/3).' },
  { id: 22, section: 'D. Vectors', difficulty: 1, problem: 'Show (1, 2, 3) and (2, -1, 0) are perpendicular.', solution: 'Dot product: 1(2) + 2(-1) + 3(0) = 2 - 2 + 0 = 0. Since the dot product is 0, they are perpendicular.' },
  { id: 23, section: 'D. Vectors', difficulty: 2, problem: 'Find the angle between (1, 0) and (1, 1).', solution: 'cos θ = u · v / (||u|| ||v||) = 1 / (1 · √2) = 1/√2 ⇒ θ = 45° (π/4 radians).' },
  { id: 24, section: 'D. Vectors', difficulty: 2, problem: 'Find k so that (1, k, 2) ⊥ (2, -1, 3).', solution: 'Dot product = 1(2) + k(-1) + 2(3) = 2 - k + 6 = 8 - k = 0 ⇒ k = 8.' },
  { id: 25, section: 'D. Vectors', difficulty: 2, problem: 'Prove ||u + v||² = ||u||² + ||v||² if and only if u · v = 0.', solution: '||u + v||² = (u + v) · (u + v) = ||u||² + 2(u · v) + ||v||². This equals ||u||² + ||v||² if and only if 2(u · v) = 0 ⟺ u · v = 0 (Pythagorean Theorem).' },

  // Section E
  { id: 26, section: 'E. Linear combinations and span', difficulty: 1, problem: 'Write (5, 7) as a(1, 1) + b(1, -1).', solution: 'a + b = 5 and a - b = 7. Add equations: 2a = 12 ⇒ a = 6, b = -1. Check: 6(1, 1) - 1(1, -1) = (5, 7) ✓.' },
  { id: 27, section: 'E. Linear combinations and span', difficulty: 2, problem: 'Is (1, 1, 1) in the span of (1, 0, 1) and (0, 1, 1)?', solution: 'a(1, 0, 1) + b(0, 1, 1) = (a, b, a + b) = (1, 1, 1). First two entries require a = 1, b = 1, forcing third entry a + b = 2 ≠ 1. No!' },
  { id: 28, section: 'E. Linear combinations and span', difficulty: 1, problem: 'Describe span{(1, 2), (2, 4)}.', solution: '(2, 4) = 2·(1, 2). Since they are collinear multiples, their span is strictly the 1D line y = 2x through the origin.' },
  { id: 29, section: 'E. Linear combinations and span', difficulty: 2, problem: 'Do (1, 1, 0), (0, 1, 1), (1, 0, 1) span ℝ³?', solution: 'Matrix determinant = 1(1) + 1(1) = 2 ≠ 0. The 3 vectors are independent, so their span is all of ℝ³.' },
  { id: 30, section: 'E. Linear combinations and span', difficulty: 2, problem: 'Find the condition on b = (b₁, b₂, b₃) for b to be in span{(1, 0, 1), (0, 1, 1)}.', solution: 'Linear combinations are (a, b, a + b). Thus b₁ = a, b₂ = b, and b₃ = a + b = b₁ + b₂. Condition: b₁ + b₂ - b₃ = 0 (a plane through 0).' },
  { id: 31, section: 'E. Linear combinations and span', difficulty: 1, problem: 'What is the minimum number of vectors needed to span ℝ⁴?', solution: 'Four. Fewer than 4 vectors cannot span ℝ⁴. Exactly 4 independent vectors will span ℝ⁴.' },
  { id: 32, section: 'E. Linear combinations and span', difficulty: 1, problem: 'True or false: the span of a single vector v is always a line.', solution: 'False. If v ≠ 0, it is a line through 0; but if v = 0, span{0} is only the single point {0}.' },
  { id: 33, section: 'E. Linear combinations and span', difficulty: 1, problem: 'Show (1, 2) and (3, 4) span ℝ².', solution: 'Determinant = 1(4) - 2(3) = 4 - 6 = -2 ≠ 0. Since the 2 vectors in ℝ² are independent, they span all of ℝ².' },

  // Section F
  { id: 34, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Solve x + 2y + z = 2, 3x + 8y + z = 12, 4y + z = 2 by elimination.', solution: 'R₂ - 3R₁: 2y - 2z = 6. Next pivot row is 4y + z = 2. R₃ - 2R₂: 5z = -10 ⇒ z = -2. Then y = 1, x = 2. Solution: (2, 1, -2).' },
  { id: 35, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Solve x + y + z = 6, 2x - y + z = 3, x + 2y - z = 2.', solution: 'R₂ - 2R₁: -3y - z = -9. R₃ - R₁: y - 2z = -4. From latter y = 2z - 4 ⇒ -3(2z - 4) - z = -9 ⇒ z = 3, y = 2, x = 1. Solution: (1, 2, 3).' },
  { id: 36, section: 'F. Elimination & Row Operations', difficulty: 1, problem: 'What does elimination show for x + y = 2, 2x + 2y = 5?', solution: 'R₂ - 2R₁ gives 0·x + 0·y = 1 (0 = 1). Contradiction ⇒ no solution.' },
  { id: 37, section: 'F. Elimination & Row Operations', difficulty: 1, problem: 'The pivot position holds 0 in [0 2; 3 4]. What is the fix?', solution: 'Row exchange: swap row 1 and row 2 ⇒ [3 4; 0 2]. Already upper triangular with pivots 3 and 2.' },
  { id: 38, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Write the 3 × 3 elementary matrix E₂₁ that subtracts 3×row 1 from row 2, and its inverse.', solution: 'E₂₁ = [1 0 0; -3 1 0; 0 0 1]. Its inverse adds 3×row 1 back: E₂₁⁻¹ = [1 0 0; 3 1 0; 0 0 1].' },
  { id: 39, section: 'F. Elimination & Row Operations', difficulty: 1, problem: 'Write the permutation matrix P that swaps rows 1 and 3 of a 3 × 3 matrix. What is P²?', solution: 'P = [0 0 1; 0 1 0; 1 0 0]. Swapping twice returns rows to their original order: P² = I.' },
  { id: 40, section: 'F. Elimination & Row Operations', difficulty: 1, problem: 'Compute EA for E = [1 0; -2 1] and A = [1 2; 2 5].', solution: 'EA performs row 2 - 2×row 1 on A: EA = [1 2; 2-2, 5-4] = [1 2; 0 1].' },
  { id: 41, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Find the inverse of E = [1 0 0; 0 1 0; 4 0 1].', solution: 'E adds 4×row 1 to row 3. The inverse subtracts 4×row 1 from row 3: E⁻¹ = [1 0 0; 0 1 0; -4 0 1].' },
  { id: 42, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Reduce [1 2 3; 2 4 7; 3 6 10] to echelon form. State rank and pivot columns.', solution: 'R₂ - 2R₁ = (0, 0, 1), R₃ - 3R₁ = (0, 0, 1). Then R₃ - R₂ = (0, 0, 0). Echelon form: [1 2 3; 0 0 1; 0 0 0]. Rank = 2, pivots in columns 1 and 3.' },
  { id: 43, section: 'F. Elimination & Row Operations', difficulty: 3, problem: 'Use Gauss–Jordan to find A⁻¹ for A = [1 2; 3 7].', solution: '[A | I] = [1 2 | 1 0; 3 7 | 0 1]. R₂ - 3R₁ ⇒ [1 2 | 1 0; 0 1 | -3 1]. R₁ - 2R₂ ⇒ [1 0 | 7 -2; 0 1 | -3 1]. A⁻¹ = [7 -2; -3 1].' },
  { id: 44, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'For which c does elimination on [1 2; 3 c] break down permanently (singular matrix)?', solution: 'R₂ - 3R₁ gives second row [0, c - 6]. The second pivot is c - 6. It breaks down permanently when c - 6 = 0 ⇒ c = 6 (rank 1).' },
  { id: 45, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'Do row operations change the column space? Test on [1 1; 1 1].', solution: 'Yes! Original C(A) = span{(1, 1)}. After R₂ - R₁ we get [1 1; 0 0] with column space span{(1, 0)}. Different lines!' },
  { id: 46, section: 'F. Elimination & Row Operations', difficulty: 2, problem: 'For problem 35 matrix [1 1 1; 2 -1 1; 1 2 -1], list multipliers l₂₁, l₃₁, l₃₂ and final U.', solution: 'l₂₁ = 2, l₃₁ = 1. Intermediate rows: (0, -3, -1) and (0, 1, -2). l₃₂ = 1/(-3) = -1/3. U = [1 1 1; 0 -3 -1; 0 0 -7/3].' },

  // Section G
  { id: 47, section: 'G. LU Factorisation', difficulty: 2, problem: 'Find L and U for A = [2 1; 6 8].', solution: 'l₂₁ = 6/2 = 3. U = [2 1; 0 5]. L = [1 0; 3 1]. Check: LU = [2 1; 6 8] ✓.' },
  { id: 48, section: 'G. LU Factorisation', difficulty: 2, problem: 'Find L and U for A = [1 2 1; 3 8 1; 0 4 1].', solution: 'l₂₁ = 3, l₃₁ = 0. Row 2 becomes (0, 2, -2). Next l₃₂ = 4/2 = 2. Row 3 becomes (0, 0, 5). L = [1 0 0; 3 1 0; 0 2 1], U = [1 2 1; 0 2 -2; 0 0 5].' },
  { id: 49, section: 'G. LU Factorisation', difficulty: 2, problem: 'Use LU from problem 47 to solve Ax = (3, 14)ᵀ.', solution: 'Lc = [3; 14] ⇒ c₁ = 3, 3(3) + c₂ = 14 ⇒ c₂ = 5. Ux = [3; 5] ⇒ 5y = 5 ⇒ y = 1; 2x + 1 = 3 ⇒ x = 1. Solution: (1, 1).' },
  { id: 50, section: 'G. LU Factorisation', difficulty: 2, problem: 'Why does L contain multipliers with a plus sign although we subtract in elimination?', solution: 'Elimination left-multiplies by Eᵢⱼ (with entry -lᵢⱼ). L is the product of their inverses Eᵢⱼ⁻¹, which have +lᵢⱼ.' },
  { id: 51, section: 'G. LU Factorisation', difficulty: 2, problem: 'About how many multiplications does elimination take on a 100 × 100 matrix, and for each extra right-hand side?', solution: 'Elimination: n³/3 = 100³/3 ≈ 333,333 operations. Each extra right-hand side b: n² = 100² = 10,000 operations.' },
  { id: 52, section: 'G. LU Factorisation', difficulty: 2, problem: 'Why can A = [0 1; 1 0] not be written as LU? What do we do instead?', solution: 'The first pivot is 0, so elimination cannot start without a row exchange. We use PA = LU instead, where P = [0 1; 1 0] swaps rows so PA = I = I·I.' },

  // Section H
  { id: 53, section: 'H. Linear Dependence', difficulty: 1, problem: 'Are (1, 2) and (2, 4) independent?', solution: 'No: 2·(1, 2) - (2, 4) = 0.' },
  { id: 54, section: 'H. Linear Dependence', difficulty: 1, problem: 'Are (1, 0, 0), (1, 1, 0), (1, 1, 1) independent?', solution: 'Yes. The matrix with these columns is triangular with 3 nonzero pivots (1, 1, 1), so Ax = 0 forces x = 0.' },
  { id: 55, section: 'H. Linear Dependence', difficulty: 2, problem: 'Show (1, 2, 3), (4, 5, 6), (7, 8, 9) are dependent. Find a relation.', solution: 'Notice arithmetic progressions: v₁ + v₃ = (1+7, 2+8, 3+9) = (8, 10, 12) = 2·(4, 5, 6) = 2v₂. Relation: v₁ - 2v₂ + v₃ = 0.' },
  { id: 56, section: 'H. Linear Dependence', difficulty: 2, problem: 'For which k are (1, 1, 1), (1, 2, 3), (1, 3, k) dependent?', solution: 'det [1 1 1; 1 2 3; 1 3 k] = k - 5. Dependent exactly when determinant = 0 ⇒ k = 5 (then v₃ = 2v₂ - v₁).' },
  { id: 57, section: 'H. Linear Dependence', difficulty: 1, problem: 'Why are any 4 vectors in ℝ³ dependent?', solution: 'Putting them as columns gives a 3 × 4 matrix with 4 unknowns and 3 equations in Ax = 0. At most 3 pivots ⇒ at least 1 free variable ⇒ non-trivial solution exists.' },
  { id: 58, section: 'H. Linear Dependence', difficulty: 3, problem: 'If v₁, v₂, v₃ are independent, are v₁ + v₂, v₂ + v₃, v₃ + v₁ independent?', solution: 'Yes. If c₁(v₁+v₂) + c₂(v₂+v₃) + c₃(v₃+v₁) = 0, regroup: (c₁+c₃)v₁ + (c₁+c₂)v₂ + (c₂+c₃)v₃ = 0. Independence gives c₁+c₃=0, c₁+c₂=0, c₂+c₃=0 ⇒ c₁=c₂=c₃=0.' },
  { id: 59, section: 'H. Linear Dependence', difficulty: 1, problem: 'Why is any set containing the zero vector dependent?', solution: '1·0 + 0·v₁ + ... = 0 is a non-trivial linear combination producing zero with nonzero coefficient 1 on the zero vector.' },
  { id: 60, section: 'H. Linear Dependence', difficulty: 2, problem: 'Find a dependency among columns of [1 2 1; 0 1 1; 1 3 2].', solution: 'Notice: col 2 - col 1 = (2-1, 1-0, 3-1) = (1, 1, 2) = col 3. Dependency: col 1 - col 2 + col 3 = 0.' },

  // Section I
  { id: 61, section: 'I. Column Space & Rank', difficulty: 1, problem: 'Describe the column space of [1 2; 2 4; 3 6].', solution: 'Column 2 is 2×Column 1. C(A) is the 1D line spanned by (1, 2, 3) in ℝ³; rank = 1.' },
  { id: 62, section: 'I. Column Space & Rank', difficulty: 1, problem: 'Is (1, 2, 4) in C(A) for the matrix of problem 61?', solution: 'No: (1, 2, 4) is not a scalar multiple of (1, 2, 3) (third entry 4 ≠ 3).' },
  { id: 63, section: 'I. Column Space & Rank', difficulty: 2, problem: 'Find the rank of [1 2 3; 2 4 6; 1 1 1].', solution: 'Row 2 = 2×Row 1 (redundant). Rows 1 and 3 are independent. Rank = 2.' },
  { id: 64, section: 'I. Column Space & Rank', difficulty: 2, problem: 'Find the rank of [1 2 0 1; 0 0 1 2; 1 2 1 3].', solution: 'R₃ - R₁ = (0, 0, 1, 2) = R₂. Two pivot rows remain. Rank = 2 (pivots in columns 1 and 3).' },
  { id: 65, section: 'I. Column Space & Rank', difficulty: 2, problem: 'Find N(A) for A = [1 2; 3 6].', solution: 'Row 2 is redundant: x + 2y = 0 ⇒ x = -2y. N(A) = span{(-2, 1)}, dimension = 1.' },
  { id: 66, section: 'I. Column Space & Rank', difficulty: 3, problem: 'Find a basis of N(A) for the matrix of problem 64.', solution: 'RREF: x₁ + 2x₂ + x₄ = 0, x₃ + 2x₄ = 0. Free: x₂, x₄. Special solutions: (-2, 1, 0, 0) and (-1, 0, -2, 1).' },
  { id: 67, section: 'I. Column Space & Rank', difficulty: 2, problem: 'A is 5 × 8 with rank 3. Find dim N(A) and dim N(Aᵀ).', solution: 'dim N(A) = n - r = 8 - 3 = 5. dim N(Aᵀ) = m - r = 5 - 3 = 2.' },
  { id: 68, section: 'I. Column Space & Rank', difficulty: 1, problem: 'Can a 3 × 5 matrix have rank 4?', solution: 'No. Rank r ≤ min(m, n) = min(3, 5) = 3.' },
  { id: 69, section: 'I. Column Space & Rank', difficulty: 2, problem: 'Write [1 2 3; 2 4 6; 3 6 9] as (column)×(row) and state the rank.', solution: 'A = [1; 2; 3][1 2 3] = (column)×(row). Every row is a multiple of (1, 2, 3), so rank = 1.' },
  { id: 70, section: 'I. Column Space & Rank', difficulty: 1, problem: 'If Ax = b has a solution and N(A) = {0}, how many solutions are there?', solution: 'Exactly one. The complete solution is x = xₚ + 0 = xₚ.' },

  // Section J
  { id: 71, section: 'J. Complete Solutions', difficulty: 2, problem: 'Solve x + 2y + z = 3, 2x + 4y + 3z = 8 completely.', solution: 'R₂ - 2R₁ gives z = 2. Then x + 2y = 1. Free y = t: x = 1 - 2t. x = (1, 0, 2) + t(-2, 1, 0).' },
  { id: 72, section: 'J. Complete Solutions', difficulty: 2, problem: 'Solve x + y + z = 3, x + 2y + 3z = 6 completely.', solution: 'Subtract: y + 2z = 3 ⇒ y = 3 - 2z. Then x = 3 - y - z = z. Free z = t: x = (0, 3, 0) + t(1, -2, 1).' },
  { id: 73, section: 'J. Complete Solutions', difficulty: 2, problem: 'For A = [1 2; 2 4; 3 6], for which b is Ax = b solvable? Solve it for b = (2, 4, 6)ᵀ.', solution: 'Solvable iff b is a multiple of (1, 2, 3). For (2, 4, 6): x + 2y = 2 ⇒ x = (2, 0) + t(-2, 1).' },
  { id: 74, section: 'J. Complete Solutions', difficulty: 3, problem: 'A system of 3 equations in 5 unknowns has rank 3. Always solvable? Free variables? Shape of solution set?', solution: 'r = m = 3 ⇒ always solvable for every b. Free variables: n - r = 5 - 3 = 2. Shape: a 2-dimensional plane shifted away from origin.' },

  // Section K
  { id: 75, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 1, problem: 'Is {(x, y) : x + y = 1} a subspace of ℝ²?', solution: 'No: (0, 0) gives 0 + 0 = 0 ≠ 1. It misses the origin, so it cannot be a subspace.' },
  { id: 76, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 2, problem: 'Is {(x, y, z) : x = y} a subspace? Find a basis.', solution: 'Yes (closed under sums and scalars; contains 0). Free y, z: basis = (1, 1, 0) and (0, 0, 1); dimension = 2.' },
  { id: 77, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 2, problem: 'Is the set of all symmetric 2 × 2 matrices a subspace? Find its dimension.', solution: 'Yes: sums and multiples of symmetric matrices remain symmetric; zero matrix included. Free entries a, b, d in [a b; b d] ⇒ dimension = 3.' },
  { id: 78, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 3, problem: 'Find a basis for C(A) and N(A) for A = [1 2 0 1; 0 0 1 2; 1 2 1 3].', solution: 'C(A): pivot columns of original A: (1, 0, 1) and (0, 1, 1) (dim 2). N(A): special solutions (-2, 1, 0, 0) and (-1, 0, -2, 1) (dim 2).' },
  { id: 79, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 3, problem: 'Find all four fundamental subspaces of A = [1 2; 2 4] and verify orthogonality.', solution: 'r = 1. C(A) = span{(1, 2)}. C(Aᵀ) = span{(1, 2)}. N(A) = span{(-2, 1)}. N(Aᵀ) = span{(-2, 1)}. Check: (1, 2) · (-2, 1) = -2 + 2 = 0 ✓.' },
  { id: 80, section: 'K. Subspaces & Four Fundamental Subspaces', difficulty: 2, problem: 'A 4 × 6 matrix has rank 3. Give dimension and ambient space of each fundamental subspace.', solution: 'C(A): dim 3 in ℝ⁴. N(Aᵀ): dim 4 - 3 = 1 in ℝ⁴. C(Aᵀ): dim 3 in ℝ⁶. N(A): dim 6 - 3 = 3 in ℝ⁶.' },
];

export const linearAlgebraMythBusters: MythBusterItem[] = [
  { myth: '"More unknowns than equations ⇒ infinitely many solutions."', truth: 'Only if the system is consistent! Otherwise there are zero solutions (e.g. x + y + z = 1 and x + y + z = 2).' },
  { myth: '"AB = BA always."', truth: 'Almost never! Matrix multiplication changes the recipe when order is reversed.' },
  { myth: '"Two vectors always span a plane."', truth: 'Not if one is a scalar multiple of the other! Then they span only a 1D line.' },
  { myth: '"Row operations do not change the column space."', truth: 'They do! Row operations preserve the null space and row space, but alter the column space as vectors.' },
  { myth: '"Take pivot columns from the reduced matrix RREF."', truth: 'Never! Always extract the pivot columns from the ORIGINAL matrix A.' },
  { myth: '"A basis is unique."', truth: 'Only its size (the dimension) is unique. There are infinitely many different bases for the same space.' },
  { myth: '"Rank = number of non-zero rows before elimination."', truth: 'Rank counts INDEPENDENT rows = number of pivots after elimination.' },
  { myth: '"The solution set of Ax = b is a subspace."', truth: 'Only when b = 0. When b ≠ 0, the zero vector 0 is not inside.' },
  { myth: '"N(A) lives in ℝᵐ."', truth: 'N(A) lives in ℝⁿ (the number of columns / variables).' },
  { myth: '"The dimension of a plane in ℝ³ is 3."', truth: 'It is 2! Ambient space ℝ³ is where it lives; dimension is its 2 degrees of freedom.' },
];

export const linearAlgebraGlossary: GlossaryItem[] = [
  { term: 'Augmented matrix', meaning: 'A matrix with vector b attached as an extra rightmost column: [A | b].' },
  { term: 'Basis', meaning: 'An independent set of vectors that spans a subspace. Coordinates in a basis are unique.' },
  { term: 'Column space C(A)', meaning: 'The span of the columns of A; all achievable outputs Ax.' },
  { term: 'Consistent', meaning: 'A system that has at least one solution (0 = nonzero never appears).' },
  { term: 'Dependent', meaning: 'A set of vectors where some non-trivial combination equals 0; at least one vector is redundant.' },
  { term: 'Dimension', meaning: 'The number of vectors in any basis of a subspace.' },
  { term: 'Echelon form', meaning: 'Staircase form where each pivot is strictly to the right of the pivot above.' },
  { term: 'Elementary matrix', meaning: 'The matrix obtained by applying ONE row operation to the identity matrix I.' },
  { term: 'Free variable', meaning: 'An unknown corresponding to a column with no pivot in echelon form.' },
  { term: 'Homogeneous', meaning: 'A system with right-hand side zero: Ax = 0. Always consistent (x = 0).' },
  { term: 'Inconsistent', meaning: 'A system with no solution (parallel lines/planes, 0 = 5).' },
  { term: 'Independent', meaning: 'Vectors where the only combination giving zero is the trivial one (all weights = 0).' },
  { term: 'Left null space N(Aᵀ)', meaning: 'All vectors y with Aᵀy = 0 (or yᵀA = 0); orthogonal to C(A) in ℝᵐ.' },
  { term: 'Linear combination', meaning: 'c₁v₁ + c₂v₂ + ... + cₖvₖ with scalar weights cᵢ.' },
  { term: 'LU factorisation', meaning: 'Splitting A into unit lower triangular L and upper triangular U.' },
  { term: 'Multiplier', meaning: 'The ratio lᵢⱼ = (entry to clear) / (pivot) used in elimination.' },
  { term: 'Null space N(A)', meaning: 'The set of all vectors x satisfying Ax = 0; dimension = n - r.' },
  { term: 'Pivot', meaning: 'The leading nonzero entry used to clear entries in its column during elimination.' },
  { term: 'Rank', meaning: 'The number of pivots in echelon form; equals dim C(A) and dim C(Aᵀ).' },
  { term: 'RREF', meaning: 'Reduced Row Echelon Form: pivots are 1 with zeros above and below.' },
  { term: 'Row space C(Aᵀ)', meaning: 'The span of the rows of A; orthogonal to N(A) in ℝⁿ.' },
  { term: 'Span', meaning: 'The set of all linear combinations of a collection of vectors.' },
  { term: 'Special solution', meaning: 'A null-space vector obtained by setting one free variable to 1 and all others to 0.' },
  { term: 'Subspace', meaning: 'A flat subset containing 0 that is closed under addition and scalar multiplication.' },
  { term: 'Unit vector', meaning: 'A vector of length exactly 1: u = v / ||v||.' },
];
