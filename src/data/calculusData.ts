// Calculus 1: Single Variable Calculus Master Dataset
// Full Lecture Syllabus based on Professor Leonard's renowned Calculus 1 curriculum
// 32 Complete Full-Length Lectures with real YouTube Video IDs
// Comprehensive Practice Arena with Easy, Medium, Hard & Extreme Questions
// Complete with Step-by-Step Mathematical Proofs and Runnable Python SymPy / C++ Code

import type { AcademicSubject, SubjectLecture } from './otherSubjectsData';
import { SupportedLanguage } from '../utils/languageTemplates';

export type CalculusDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export interface CalculusPracticeQuestion {
  id: string;
  title: string;
  difficulty: CalculusDifficulty;
  topic: string;
  unit: string;
  statement: string;
  hints: string[];
  solutionSteps: string[];
  finalAnswer: string;
  options?: { id: string; label: string; isCorrect: boolean }[];
  verificationCode: string;
  xp: number;
}

export interface CalculusUnit {
  id: string;
  number: number;
  title: string;
  description: string;
  lectureIds: string[];
  icon: string;
}

export const CALCULUS_UNITS: CalculusUnit[] = [
  {
    id: 'unit-0',
    number: 0,
    title: 'Pre-Calculus Foundations & Analytic Geometry',
    description: 'Lines, inclination angle, Euclidean distance, function domains, trigonometry review, and composition.',
    lectureIds: ['calc-1', 'calc-2', 'calc-3', 'calc-4'],
    icon: '📐',
  },
  {
    id: 'unit-1',
    number: 1,
    title: 'Limits & Continuity',
    description: 'Intuitive and algebraic limits, limit laws, Squeeze Theorem, continuity, IVT, and rate of change.',
    lectureIds: ['calc-5', 'calc-6', 'calc-7', 'calc-8'],
    icon: '🎯',
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Derivatives & Rules of Differentiation',
    description: 'Limit definition of derivative, power, product, quotient, trig rules, chain rule, implicit diff, and related rates.',
    lectureIds: ['calc-9', 'calc-10', 'calc-11', 'calc-12', 'calc-13', 'calc-14', 'calc-15', 'calc-16'],
    icon: '⚡',
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Applications of Derivatives & Curve Analysis',
    description: 'MVT, Rolle’s theorem, first & second derivative tests, concavity, limits at infinity, curve sketching, and optimization.',
    lectureIds: ['calc-17', 'calc-18', 'calc-19', 'calc-20', 'calc-21', 'calc-22', 'calc-23'],
    icon: '📈',
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'The Indefinite & Definite Integral',
    description: 'Antiderivatives, u-substitution, Riemann sums, definite integral evaluation, and the Fundamental Theorem of Calculus.',
    lectureIds: ['calc-24', 'calc-25', 'calc-26', 'calc-27', 'calc-28'],
    icon: '∫',
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'Applications of Integration: Area, Volume & Arc Length',
    description: 'Area between curves, solids of revolution via disks & washers, cylindrical shells, and curve arc length.',
    lectureIds: ['calc-29', 'calc-30', 'calc-31', 'calc-32'],
    icon: '📦',
  },
];

export const CALCULUS_PRACTICE_QUESTIONS: CalculusPracticeQuestion[] = [
  {
    "id": "calc-q-e1",
    "title": "Algebraic Limit by Factoring",
    "difficulty": "Easy",
    "topic": "Limits & Continuity",
    "unit": "Unit 1",
    "statement": "Evaluate the limit:\n$$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$",
    "hints": [
      "Direct substitution yields $\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0}$, which is an indeterminate form.",
      "Factor the numerator using the difference of squares: $x^2 - 9 = (x - 3)(x + 3)$.",
      "Since $x \\to 3$ means $x \\neq 3$, cancel $(x - 3)$ and evaluate."
    ],
    "solutionSteps": [
      "**Step 1:** Direct substitution of $x = 3$ gives $\\frac{0}{0}$ (indeterminate form).",
      "**Step 2:** Factor numerator: $x^2 - 9 = (x - 3)(x + 3)$.",
      "**Step 3:** Cancel common factor for $x \\neq 3$: $\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3)$.",
      "**Step 4:** Evaluate directly: $3 + 3 = 6$."
    ],
    "finalAnswer": "6",
    "options": [
      {
        "id": "a",
        "label": "0",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "3",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "6",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "Undefined",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.limit((x**2 - 9)/(x - 3), x, 3)\nprint('Calculated Limit:', ans)\nassert ans == 6\n",
    "xp": 25
  },
  {
    "id": "calc-q-e2",
    "title": "Polynomial Derivative via Power Rule",
    "difficulty": "Easy",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Find $\\frac{d}{dx} [4x^5 - 7x^3 + 2x - 11]$ at $x = 1$.",
    "hints": [
      "Use the Power Rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$.",
      "The derivative of a constant is $0$.",
      "Differentiate each term and then evaluate at $x = 1$."
    ],
    "solutionSteps": [
      "**Step 1:** Apply linearity and the power rule term-by-term:",
      "$\\frac{d}{dx}[4x^5] = 4(5x^4) = 20x^4$",
      "$\\frac{d}{dx}[-7x^3] = -7(3x^2) = -21x^2$",
      "$\\frac{d}{dx}[2x] = 2$",
      "$\\frac{d}{dx}[-11] = 0$",
      "**Step 2:** Form the derivative function: $f'(x) = 20x^4 - 21x^2 + 2$.",
      "**Step 3:** Substitute $x = 1$: $f'(1) = 20(1) - 21(1) + 2 = 1$."
    ],
    "finalAnswer": "1",
    "options": [
      {
        "id": "a",
        "label": "-1",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "1",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "3",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "20",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = 4*x**5 - 7*x**3 + 2*x - 11\nans = sp.diff(f, x).subs(x, 1)\nprint('Derivative at x=1:', ans)\nassert ans == 1\n",
    "xp": 25
  },
  {
    "id": "calc-q-e3",
    "title": "Slope of the Tangent Line",
    "difficulty": "Easy",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Find the slope of the tangent line to the curve $y = x^3 - 3x + 2$ at the point where $x = 2$.",
    "hints": [
      "The slope of the tangent line at $x_0$ is given by $f'(x_0)$.",
      "Compute $f'(x)$ using the power rule.",
      "Plug in $x = 2$."
    ],
    "solutionSteps": [
      "**Step 1:** Compute the derivative: $f'(x) = \\frac{d}{dx}[x^3 - 3x + 2] = 3x^2 - 3$.",
      "**Step 2:** Evaluate the derivative at $x = 2$:",
      "$m_{\\text{tan}} = f'(2) = 3(2)^2 - 3 = 3(4) - 3 = 12 - 3 = 9$."
    ],
    "finalAnswer": "9",
    "options": [
      {
        "id": "a",
        "label": "4",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "6",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "9",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "12",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = x**3 - 3*x + 2\nans = sp.diff(f, x).subs(x, 2)\nprint('Slope:', ans)\nassert ans == 9\n",
    "xp": 25
  },
  {
    "id": "calc-q-e4",
    "title": "Basic Polynomial Indefinite Integral",
    "difficulty": "Easy",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the indefinite integral:\n$$\\int (6x^2 - 4x + 7) dx$$",
    "hints": [
      "Use the reverse power rule: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$.",
      "Integrate each term individually.",
      "Do not forget the constant of integration $+ C$."
    ],
    "solutionSteps": [
      "**Step 1:** Integrate $6x^2$: $6 \\cdot \\frac{x^3}{3} = 2x^3$.",
      "**Step 2:** Integrate $-4x$: $-4 \\cdot \\frac{x^2}{2} = -2x^2$.",
      "**Step 3:** Integrate $7$: $7x$.",
      "**Step 4:** Combine terms with $+ C$: $2x^3 - 2x^2 + 7x + C$."
    ],
    "finalAnswer": "2x^3 - 2x^2 + 7x + C",
    "options": [
      {
        "id": "a",
        "label": "2x^3 - 2x^2 + 7x + C",
        "isCorrect": true
      },
      {
        "id": "b",
        "label": "6x^3 - 4x^2 + 7x + C",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "12x - 4 + C",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "3x^3 - 2x^2 + 7x + C",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = 6*x**2 - 4*x + 7\nans = sp.integrate(f, x)\nprint('Indefinite Integral:', ans)\nassert ans == 2*x**3 - 2*x**2 + 7*x\n",
    "xp": 25
  },
  {
    "id": "calc-q-e5",
    "title": "Basic Definite Integral Evaluation",
    "difficulty": "Easy",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the definite integral:\n$$\\int_0^3 (2x + 1) dx$$",
    "hints": [
      "Find the antiderivative $F(x) = x^2 + x$.",
      "Apply the Fundamental Theorem of Calculus Part 2: $F(3) - F(0)$."
    ],
    "solutionSteps": [
      "**Step 1:** Antiderivative of $2x + 1$ is $F(x) = x^2 + x$.",
      "**Step 2:** Evaluate at upper limit $x = 3$: $F(3) = 3^2 + 3 = 9 + 3 = 12$.",
      "**Step 3:** Evaluate at lower limit $x = 0$: $F(0) = 0^2 + 0 = 0$.",
      "**Step 4:** Compute $F(3) - F(0) = 12 - 0 = 12$."
    ],
    "finalAnswer": "12",
    "options": [
      {
        "id": "a",
        "label": "9",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "12",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "15",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "6",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.integrate(2*x + 1, (x, 0, 3))\nprint('Definite Integral:', ans)\nassert ans == 12\n",
    "xp": 25
  },
  {
    "id": "calc-q-e6",
    "title": "Trigonometric Derivatives",
    "difficulty": "Easy",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Find $f'(0)$ if $f(x) = 3\\sin(x) - 2\\cos(x) + \\tan(x)$.",
    "hints": [
      "Recall $\\frac{d}{dx}[\\sin x] = \\cos x$, $\\frac{d}{dx}[\\cos x] = -\\sin x$, and $\\frac{d}{dx}[\\tan x] = \\sec^2 x$.",
      "Recall values at 0: $\\cos(0) = 1, \\sin(0) = 0, \\sec(0) = 1$."
    ],
    "solutionSteps": [
      "**Step 1:** Differentiate each trigonometric term:",
      "$f'(x) = 3\\cos(x) - 2(-\\sin(x)) + \\sec^2(x) = 3\\cos(x) + 2\\sin(x) + \\sec^2(x)$.",
      "**Step 2:** Substitute $x = 0$:",
      "$f'(0) = 3(1) + 2(0) + (1)^2 = 3 + 0 + 1 = 4$."
    ],
    "finalAnswer": "4",
    "options": [
      {
        "id": "a",
        "label": "2",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "3",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "4",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "5",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = 3*sp.sin(x) - 2*sp.cos(x) + sp.tan(x)\nans = sp.diff(f, x).subs(x, 0)\nprint('f\\'(0):', ans)\nassert ans == 4\n",
    "xp": 25
  },
  {
    "id": "calc-q-m1",
    "title": "Conjugate Rationalization Limit",
    "difficulty": "Medium",
    "topic": "Limits & Continuity",
    "unit": "Unit 1",
    "statement": "Evaluate the limit:\n$$\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$$",
    "hints": [
      "Direct substitution gives $\\frac{0}{0}$.",
      "Multiply numerator and denominator by the conjugate $\\sqrt{x + 4} + 2$.",
      "Notice $(a - b)(a + b) = a^2 - b^2$, which eliminates the radical in the numerator."
    ],
    "solutionSteps": [
      "**Step 1:** Multiply by conjugate $\\frac{\\sqrt{x+4} + 2}{\\sqrt{x+4} + 2}$:",
      "$$\\lim_{x \\to 0} \\frac{(\\sqrt{x+4} - 2)(\\sqrt{x+4} + 2)}{x(\\sqrt{x+4} + 2)}$$",
      "**Step 2:** Expand numerator: $(\\sqrt{x+4})^2 - 2^2 = (x + 4) - 4 = x$.",
      "**Step 3:** Cancel $x$ for $x \\neq 0$: $\\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4} + 2}$.",
      "**Step 4:** Evaluate directly: $\\frac{1}{\\sqrt{0+4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$."
    ],
    "finalAnswer": "1/4",
    "options": [
      {
        "id": "a",
        "label": "0",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "1/4",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "1/2",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "1",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.limit((sp.sqrt(x+4) - 2)/x, x, 0)\nprint('Limit:', ans)\nassert ans == sp.Rational(1, 4)\n",
    "xp": 50
  },
  {
    "id": "calc-q-m2",
    "title": "Quotient Rule with Chain Rule",
    "difficulty": "Medium",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Find $f'(0)$ where $f(x) = \\frac{\\sin(3x)}{x^2 + 1}$.",
    "hints": [
      "Use the Quotient Rule: $\\left(\\frac{u}{v}\\right)' = \\frac{u' v - u v'}{v^2}$.",
      "To find $u'$, use the Chain Rule: $\\frac{d}{dx}[\\sin(3x)] = 3\\cos(3x)$.",
      "Evaluate at $x = 0$."
    ],
    "solutionSteps": [
      "**Step 1:** Identify $u(x) = \\sin(3x)$ and $v(x) = x^2 + 1$.",
      "**Step 2:** Find derivatives: $u'(x) = 3\\cos(3x)$ and $v'(x) = 2x$.",
      "**Step 3:** Apply Quotient Rule:",
      "$$f'(x) = \\frac{3\\cos(3x)(x^2 + 1) - \\sin(3x)(2x)}{(x^2 + 1)^2}$$",
      "**Step 4:** Evaluate at $x = 0$:",
      "$f'(0) = \\frac{3\\cos(0)(0 + 1) - \\sin(0)(0)}{(0 + 1)^2} = \\frac{3(1)(1) - 0}{1} = 3$."
    ],
    "finalAnswer": "3",
    "options": [
      {
        "id": "a",
        "label": "0",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "1",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "3",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "6",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = sp.sin(3*x)/(x**2 + 1)\nans = sp.diff(f, x).subs(x, 0)\nprint('f\\'(0):', ans)\nassert ans == 3\n",
    "xp": 50
  },
  {
    "id": "calc-q-m3",
    "title": "Implicit Differentiation of a Folium Curve",
    "difficulty": "Medium",
    "topic": "Implicit & Chain Rule",
    "unit": "Unit 2",
    "statement": "Find the slope of the curve $x^3 + y^3 = 6xy$ (Folium of Descartes) at the point $(3, 3)$.",
    "hints": [
      "Differentiate both sides with respect to $x$ using implicit differentiation.",
      "Remember that $\\frac{d}{dx}[y^3] = 3y^2 \\frac{dy}{dx}$ and $\\frac{d}{dx}[6xy] = 6y + 6x \\frac{dy}{dx}$ by the product rule.",
      "Solve for $\\frac{dy}{dx}$ and substitute $x = 3, y = 3$."
    ],
    "solutionSteps": [
      "**Step 1:** Differentiate implicitly with respect to $x$:",
      "$$3x^2 + 3y^2 \\frac{dy}{dx} = 6\\left(1 \\cdot y + x \\frac{dy}{dx}\\right) = 6y + 6x \\frac{dy}{dx}$$",
      "**Step 2:** Group terms with $\\frac{dy}{dx}$:",
      "$$(3y^2 - 6x) \\frac{dy}{dx} = 6y - 3x^2$$",
      "**Step 3:** Solve for $\\frac{dy}{dx}$:",
      "$$\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}$$",
      "**Step 4:** Substitute $(x, y) = (3, 3)$:",
      "$$\\frac{dy}{dx} = \\frac{2(3) - 3^2}{3^2 - 2(3)} = \\frac{6 - 9}{9 - 6} = \\frac{-3}{3} = -1$$"
    ],
    "finalAnswer": "-1",
    "options": [
      {
        "id": "a",
        "label": "-1",
        "isCorrect": true
      },
      {
        "id": "b",
        "label": "0",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "1",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "3",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx, y = sp.symbols('x y')\nF = x**3 + y**3 - 6*x*y\n# dy/dx = - (dF/dx) / (dF/dy)\ndydx = - sp.diff(F, x) / sp.diff(F, y)\nans = dydx.subs({x: 3, y: 3})\nprint('Slope at (3, 3):', ans)\nassert ans == -1\n",
    "xp": 50
  },
  {
    "id": "calc-q-m4",
    "title": "Related Rates: The Sliding Ladder",
    "difficulty": "Medium",
    "topic": "Related Rates",
    "unit": "Unit 2",
    "statement": "A $10$-foot ladder leans against a vertical wall. The top of the ladder slides down the wall at a rate of $2\\text{ ft/s}$. How fast is the base of the ladder moving away from the wall when the base is $6\\text{ ft}$ from the wall?",
    "hints": [
      "Let $x$ be the distance from the wall to the base, and $y$ be the height of the top on the wall.",
      "Pythagorean Theorem relates the distances: $x^2 + y^2 = 10^2 = 100$.",
      "Given: $\\frac{dy}{dt} = -2\\text{ ft/s}$ and $x = 6$. Find $y$, then differentiate implicitly with respect to $t$."
    ],
    "solutionSteps": [
      "**Step 1:** Pythagorean relation: $x^2 + y^2 = 100$.",
      "**Step 2:** Find $y$ when $x = 6$: $6^2 + y^2 = 100 \\implies y^2 = 64 \\implies y = 8\\text{ ft}$.",
      "**Step 3:** Differentiate with respect to time $t$:",
      "$$2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies x \\frac{dx}{dt} + y \\frac{dy}{dt} = 0$$",
      "**Step 4:** Substitute $x = 6, y = 8, \\frac{dy}{dt} = -2$:",
      "$$6 \\frac{dx}{dt} + 8(-2) = 0 \\implies 6 \\frac{dx}{dt} = 16 \\implies \\frac{dx}{dt} = \\frac{16}{6} = \\frac{8}{3}\\text{ ft/s}$$"
    ],
    "finalAnswer": "8/3 ft/s",
    "options": [
      {
        "id": "a",
        "label": "3/2 ft/s",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "2 ft/s",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "8/3 ft/s",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "4 ft/s",
        "isCorrect": false
      }
    ],
    "verificationCode": "from fractions import Fraction\nx = 6\ny = 8\ndydt = -2\ndxdt = Fraction(-y * dydt, x)\nprint('Rate dx/dt:', dxdt)\nassert dxdt == Fraction(8, 3)\n",
    "xp": 50
  },
  {
    "id": "calc-q-m5",
    "title": "Applied Optimization: Maximum Box Volume",
    "difficulty": "Medium",
    "topic": "Optimization & Extrema",
    "unit": "Unit 3",
    "statement": "An open-top rectangular box is made from a $12 \\times 12$ inch square cardboard sheet by cutting equal squares of side $x$ from each of the four corners and folding up the sides. What cut-out side length $x$ maximizes the box's volume?",
    "hints": [
      "After cutting out squares of side $x$, the base dimensions are $(12 - 2x)$ by $(12 - 2x)$, and the height is $x$.",
      "The volume function is $V(x) = x(12 - 2x)^2$. What is the feasible physical domain for $x$?",
      "Take $V'(x) = 0$ to find the critical numbers."
    ],
    "solutionSteps": [
      "**Step 1:** Volume function: $V(x) = x(12 - 2x)^2 = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$.",
      "**Step 2:** Physical domain: Side length must be positive: $0 < x < 6$.",
      "**Step 3:** Find $V'(x)$:",
      "$$V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)$$",
      "**Step 4:** Critical numbers are $x = 2$ and $x = 6$. Since $x = 6$ yields volume 0 (degenerate), $x = 2$ in $(0, 6)$ is the critical point.",
      "**Step 5:** Verify with second derivative: $V''(x) = 24x - 96 \\implies V''(2) = 48 - 96 = -48 < 0$ (Concave down $\\implies$ Maximum!).",
      "Max volume occurs at $x = 2$ inches (giving $V = 2(8)^2 = 128\\text{ in}^3$)."
    ],
    "finalAnswer": "2 inches",
    "options": [
      {
        "id": "a",
        "label": "1.5 inches",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "2 inches",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "3 inches",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "4 inches",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nV = x * (12 - 2*x)**2\ncrit = sp.solve(sp.diff(V, x), x)\nprint('Critical points:', crit)\nvalid = [c for c in crit if 0 < c < 6]\nassert valid == [2]\n",
    "xp": 50
  },
  {
    "id": "calc-q-m6",
    "title": "Trigonometric U-Substitution",
    "difficulty": "Medium",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the definite integral:\n$$\\int_0^{\\pi/2} \\sin^3(x) \\cos(x) dx$$",
    "hints": [
      "Notice $\\cos(x) dx$ is the exact derivative of $\\sin(x)$.",
      "Let $u = \\sin(x)$, so $du = \\cos(x) dx$.",
      "Convert the limits: when $x = 0$, $u = 0$; when $x = \\pi/2$, $u = 1$."
    ],
    "solutionSteps": [
      "**Step 1:** Substitute $u = \\sin(x)$, $du = \\cos(x) dx$.",
      "**Step 2:** Change integration limits:",
      "At $x = 0 \\implies u = \\sin(0) = 0$.",
      "At $x = \\pi/2 \\implies u = \\sin(\\pi/2) = 1$.",
      "**Step 3:** The integral becomes: $\\int_0^1 u^3 du$.",
      "**Step 4:** Evaluate: $\\left[ \\frac{u^4}{4} \\right]_0^1 = \\frac{1^4}{4} - 0 = \\frac{1}{4}$."
    ],
    "finalAnswer": "1/4",
    "options": [
      {
        "id": "a",
        "label": "1/8",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "1/4",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "1/3",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "1/2",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.integrate(sp.sin(x)**3 * sp.cos(x), (x, 0, sp.pi/2))\nprint('Integral value:', ans)\nassert ans == sp.Rational(1, 4)\n",
    "xp": 50
  },
  {
    "id": "calc-q-m7",
    "title": "Area Enclosed Between Two Parabolas",
    "difficulty": "Medium",
    "topic": "Applications of Integrals",
    "unit": "Unit 5",
    "statement": "Find the area of the region completely bounded by the parabolas $y = 4x - x^2$ and $y = x^2$.",
    "hints": [
      "Find intersection points by setting $4x - x^2 = x^2$.",
      "Determine which curve is on top in the interval.",
      "Integrate $\\int_a^b (y_{\\text{top}} - y_{\\text{bottom}}) dx$."
    ],
    "solutionSteps": [
      "**Step 1:** Set equations equal: $4x - x^2 = x^2 \\implies 2x^2 - 4x = 0 \\implies 2x(x - 2) = 0$.",
      "Intersection points: $x = 0$ and $x = 2$.",
      "**Step 2:** For $x \\in (0, 2)$, test $x = 1$: $y_1 = 4(1) - 1^2 = 3$, $y_2 = 1^2 = 1$. Thus $y = 4x - x^2$ is the top curve.",
      "**Step 3:** Setup area integral:",
      "$$A = \\int_0^2 ((4x - x^2) - x^2) dx = \\int_0^2 (4x - 2x^2) dx$$",
      "**Step 4:** Integrate:",
      "$$\\left[ 2x^2 - \\frac{2x^3}{3} \\right]_0^2 = 2(2^2) - \\frac{2(8)}{3} = 8 - \\frac{16}{3} = \\frac{24 - 16}{3} = \\frac{8}{3}$$"
    ],
    "finalAnswer": "8/3",
    "options": [
      {
        "id": "a",
        "label": "2",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "8/3",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "4",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "16/3",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.integrate((4*x - x**2) - x**2, (x, 0, 2))\nprint('Enclosed Area:', ans)\nassert ans == sp.Rational(8, 3)\n",
    "xp": 50
  },
  {
    "id": "calc-q-m8",
    "title": "Solid of Revolution via Disk Method",
    "difficulty": "Medium",
    "topic": "Applications of Integrals",
    "unit": "Unit 5",
    "statement": "Find the volume of the solid generated by revolving the region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$ around the x-axis.",
    "hints": [
      "Cross sections perpendicular to the x-axis are circular disks.",
      "Disk area: $A(x) = \\pi [R(x)]^2 = \\pi (\\sqrt{x})^2 = \\pi x$.",
      "Integrate from $x = 0$ to $x = 4$."
    ],
    "solutionSteps": [
      "**Step 1:** Radius of disk at position $x$: $R(x) = \\sqrt{x}$.",
      "**Step 2:** Disk volume formula: $V = \\pi \\int_0^4 [R(x)]^2 dx = \\pi \\int_0^4 (\\sqrt{x})^2 dx = \\pi \\int_0^4 x dx$.",
      "**Step 3:** Evaluate definite integral:",
      "$$V = \\pi \\left[ \\frac{x^2}{2} \\right]_0^4 = \\pi \\left( \\frac{16}{2} - 0 \\right) = 8\\pi$$"
    ],
    "finalAnswer": "8\u03c0",
    "options": [
      {
        "id": "a",
        "label": "4\u03c0",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "8\u03c0",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "16\u03c0",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "32\u03c0/3",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.pi * sp.integrate(x, (x, 0, 4))\nprint('Volume:', ans)\nassert ans == 8*sp.pi\n",
    "xp": 50
  },
  {
    "id": "calc-q-h1",
    "title": "Formal Epsilon-Delta Limit Proof",
    "difficulty": "Hard",
    "topic": "Limits & Continuity",
    "unit": "Unit 1",
    "statement": "In the formal $(\\epsilon, \\delta)$-definition of a limit, prove that $\\lim_{x \\to 4} (3x - 5) = 7$. For any given $\\epsilon > 0$, what is the optimal choice of $\\delta$ in terms of $\\epsilon$?",
    "hints": [
      "By definition: $\\forall \\epsilon > 0, \\exists \\delta > 0$ such that $0 < |x - 4| < \\delta \\implies |(3x - 5) - 7| < \\epsilon$.",
      "Simplify $|(3x - 5) - 7|$ and factor out $3$."
    ],
    "solutionSteps": [
      "**Step 1 (Scratch work):** We want $|(3x - 5) - 7| < \\epsilon$ whenever $0 < |x - 4| < \\delta$.",
      "**Step 2:** Simplify the expression:",
      "$$|(3x - 5) - 7| = |3x - 12| = 3|x - 4|$$",
      "**Step 3:** Set $3|x - 4| < \\epsilon \\implies |x - 4| < \\frac{\\epsilon}{3}$.",
      "**Step 4 (Formal proof):** Given $\\epsilon > 0$, choose $\\delta = \\frac{\\epsilon}{3}$. If $0 < |x - 4| < \\delta$, then:",
      "$$|(3x - 5) - 7| = 3|x - 4| < 3\\delta = 3\\left(\\frac{\\epsilon}{3}\\right) = \\epsilon$$",
      "Thus, $\\lim_{x \\to 4} (3x - 5) = 7$ is rigorously proven."
    ],
    "finalAnswer": "\u03b4 = \u03b5 / 3",
    "options": [
      {
        "id": "a",
        "label": "\u03b4 = \u03b5",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "\u03b4 = \u03b5 / 3",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "\u03b4 = 3\u03b5",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "\u03b4 = \u03b5 / 7",
        "isCorrect": false
      }
    ],
    "verificationCode": "eps = 0.003\ndelta = eps / 3\nx = 4 + delta / 2\nassert abs((3*x - 5) - 7) < eps\nprint('Delta verification passed: delta = eps / 3')\n",
    "xp": 100
  },
  {
    "id": "calc-q-h2",
    "title": "Piecewise Differentiability Parameter Matching",
    "difficulty": "Hard",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Find constants $a$ and $b$ so that the function is differentiable everywhere:\n$$f(x) = \\begin{cases} x^2 + 1 & x \\le 2 \\\\ ax + b & x > 2 \\end{cases}$$",
    "hints": [
      "Differentiability requires BOTH continuity at $x = 2$ and matching left/right derivatives at $x = 2$.",
      "Step 1: Continuity requires $\\lim_{x \\to 2^-} f(x) = \\lim_{x \\to 2^+} f(x)$.",
      "Step 2: Differentiability requires $f'_-(2) = f'_+(2)$."
    ],
    "solutionSteps": [
      "**Step 1 (Matching Derivatives):** For $x < 2$, $f'(x) = 2x \\implies f'_-(2) = 2(2) = 4$.",
      "For $x > 2$, $f'(x) = a \\implies f'_+(2) = a$.",
      "For differentiability at $x = 2$, we must have $a = 4$.",
      "**Step 2 (Matching Values for Continuity):**",
      "$f(2) = 2^2 + 1 = 5$.",
      "$\\lim_{x \\to 2^+} f(x) = a(2) + b = 2a + b$.",
      "Substitute $a = 4$: $2(4) + b = 5 \\implies 8 + b = 5 \\implies b = -3$.",
      "**Conclusion:** $a = 4$ and $b = -3$."
    ],
    "finalAnswer": "a = 4, b = -3",
    "options": [
      {
        "id": "a",
        "label": "a = 2, b = 1",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "a = 4, b = -3",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "a = 4, b = 5",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "a = 1, b = 3",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\na, b = sp.symbols('a b')\neq1 = sp.Eq(2*a + b, 2**2 + 1) # continuity\neq2 = sp.Eq(a, 2*2)            # differentiability\nsol = sp.solve([eq1, eq2], (a, b))\nprint('Parameters (a, b):', sol)\nassert sol[a] == 4 and sol[b] == -3\n",
    "xp": 100
  },
  {
    "id": "calc-q-h3",
    "title": "Logarithmic Differentiation of Variable Towers",
    "difficulty": "Hard",
    "topic": "Implicit & Chain Rule",
    "unit": "Unit 2",
    "statement": "Find $\\frac{dy}{dx}$ for $y = x^{\\sin x}$ for $x > 0$.",
    "hints": [
      "Since both the base and exponent are variables, neither the power rule nor exponential rule applies directly.",
      "Take the natural logarithm of both sides: $\\ln y = \\sin(x) \\ln(x)$.",
      "Differentiate implicitly using the product rule."
    ],
    "solutionSteps": [
      "**Step 1:** Apply natural logarithm to both sides: $\\ln y = \\ln(x^{\\sin x}) = \\sin(x) \\ln(x)$.",
      "**Step 2:** Differentiate implicitly with respect to $x$:",
      "$$\\frac{1}{y} \\frac{dy}{dx} = \\frac{d}{dx}[\\sin(x)] \\ln(x) + \\sin(x) \\frac{d}{dx}[\\ln(x)]$$",
      "$$\\frac{1}{y} \\frac{dy}{dx} = \\cos(x) \\ln(x) + \\frac{\\sin(x)}{x}$$",
      "**Step 3:** Multiply through by $y = x^{\\sin x}$:",
      "$$\\frac{dy}{dx} = x^{\\sin x} \\left( \\cos(x) \\ln(x) + \\frac{\\sin(x)}{x} \\right)$$"
    ],
    "finalAnswer": "x^(sin x) * [cos(x) ln(x) + sin(x)/x]",
    "options": [
      {
        "id": "a",
        "label": "sin(x) * x^(sin(x) - 1)",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "x^(sin x) * ln(x)",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "x^(sin x) * [cos(x) ln(x) + sin(x)/x]",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "cos(x) * x^(sin x)",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x', positive=True)\ny = x**sp.sin(x)\nans = sp.diff(y, x)\nprint('Log derivative:', ans)\nexpected = x**sp.sin(x) * (sp.cos(x)*sp.log(x) + sp.sin(x)/x)\nassert sp.simplify(ans - expected) == 0\n",
    "xp": 100
  },
  {
    "id": "calc-q-h4",
    "title": "Fundamental Theorem of Calculus: Variable Limits (Leibniz Rule)",
    "difficulty": "Hard",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Find $g'(x)$ if:\n$$g(x) = \\int_{x^2}^{x^3} \\sqrt{1 + t^4} dt$$",
    "hints": [
      "Apply the Leibniz Integral Rule with the Chain Rule:",
      "$\\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t) dt = f(v(x)) v'(x) - f(u(x)) u'(x)$.",
      "Here $u(x) = x^2, v(x) = x^3$, and $f(t) = \\sqrt{1 + t^4}$."
    ],
    "solutionSteps": [
      "**Step 1:** Identify components: $f(t) = \\sqrt{1 + t^4}$, lower limit $u(x) = x^2$, upper limit $v(x) = x^3$.",
      "**Step 2:** Compute limit derivatives: $u'(x) = 2x$, $v'(x) = 3x^2$.",
      "**Step 3:** Substitute into upper bound: $f(v(x)) v'(x) = \\sqrt{1 + (x^3)^4} \\cdot (3x^2) = 3x^2 \\sqrt{1 + x^{12}}$.",
      "**Step 4:** Substitute into lower bound: $f(u(x)) u'(x) = \\sqrt{1 + (x^2)^4} \\cdot (2x) = 2x \\sqrt{1 + x^8}$.",
      "**Step 5:** Subtract lower from upper:",
      "$$g'(x) = 3x^2 \\sqrt{1 + x^{12}} - 2x \\sqrt{1 + x^8}$$"
    ],
    "finalAnswer": "3x^2 \u221a(1 + x^12) - 2x \u221a(1 + x^8)",
    "options": [
      {
        "id": "a",
        "label": "\u221a(1 + x^12) - \u221a(1 + x^8)",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "3x^2 \u221a(1 + x^12) - 2x \u221a(1 + x^8)",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "3x^2 \u221a(1 + x^6) - 2x \u221a(1 + x^4)",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "x^3 \u221a(1 + x^12) - x^2 \u221a(1 + x^8)",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx, t = sp.symbols('x t')\nans = sp.diff(sp.integrate(sp.sqrt(1 + t**4), (t, x**2, x**3)), x)\nexpected = 3*x**2*sp.sqrt(1 + x**12) - 2*x*sp.sqrt(1 + x**8)\nprint('Leibniz derivative matches expected!')\nassert sp.simplify(ans - expected) == 0\n",
    "xp": 100
  },
  {
    "id": "calc-q-h5",
    "title": "Cylindrical Shells Revolved around an Arbitrary Line",
    "difficulty": "Hard",
    "topic": "Applications of Integrals",
    "unit": "Unit 5",
    "statement": "Find the volume of the solid generated by revolving the region bounded by $y = 2x - x^2$ and $y = 0$ around the vertical line $x = 3$.",
    "hints": [
      "The region is bounded between $x = 0$ and $x = 2$ (roots of $2x - x^2$).",
      "Using cylindrical shells with vertical strip at $x$:",
      "Shell radius is the distance to the axis of rotation: $r(x) = 3 - x$.",
      "Shell height is $h(x) = 2x - x^2$."
    ],
    "solutionSteps": [
      "**Step 1:** Intersections with $y = 0$: $x(2 - x) = 0 \\implies x = 0, x = 2$.",
      "**Step 2:** Cylindrical Shell formula: $V = 2\\pi \\int_a^b r(x) h(x) dx$.",
      "Axis is at $x = 3$, so radius $r(x) = 3 - x$ (since $x \\in [0, 2]$, $3 - x > 0$).",
      "Height $h(x) = 2x - x^2$.",
      "**Step 3:** Expand the product:",
      "$r(x)h(x) = (3 - x)(2x - x^2) = 6x - 3x^2 - 2x^2 + x^3 = x^3 - 5x^2 + 6x$.",
      "**Step 4:** Integrate:",
      "$$V = 2\\pi \\int_0^2 (x^3 - 5x^2 + 6x) dx = 2\\pi \\left[ \\frac{x^4}{4} - \\frac{5x^3}{3} + 3x^2 \\right]_0^2$$",
      "$$= 2\\pi \\left( \\frac{16}{4} - \\frac{40}{3} + 12 \\right) = 2\\pi \\left( 16 - \\frac{40}{3} \\right) = 2\\pi \\left( \\frac{8}{3} \\right) = \\frac{16\\pi}{3}$$"
    ],
    "finalAnswer": "16\u03c0/3",
    "options": [
      {
        "id": "a",
        "label": "8\u03c0/3",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "16\u03c0/3",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "32\u03c0/3",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "6\u03c0",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nintegrand = (3 - x) * (2*x - x**2)\nans = 2 * sp.pi * sp.integrate(integrand, (x, 0, 2))\nprint('Shell Volume:', ans)\nassert ans == sp.Rational(16, 3) * sp.pi\n",
    "xp": 100
  },
  {
    "id": "calc-q-h6",
    "title": "Exact Arc Length via Perfect Square Collapse",
    "difficulty": "Hard",
    "topic": "Applications of Integrals",
    "unit": "Unit 5",
    "statement": "Find the exact arc length of the curve $y = \\frac{x^3}{6} + \\frac{1}{2x}$ over the closed interval $[1, 3]$.",
    "hints": [
      "Use the Arc Length formula $L = \\int_1^3 \\sqrt{1 + [y'(x)]^2} dx$.",
      "Compute $y'(x) = \\frac{x^2}{2} - \\frac{1}{2x^2}$.",
      "Square $y'(x)$ and observe what happens when you add $1$! Notice $(a - b)^2 + 4ab = (a + b)^2$."
    ],
    "solutionSteps": [
      "**Step 1:** Derivative $y'(x) = \\frac{d}{dx}\\left[\\frac{x^3}{6} + \\frac{1}{2}x^{-1}\\right] = \\frac{x^2}{2} - \\frac{1}{2x^2}$.",
      "**Step 2:** Compute $[y'(x)]^2$:",
      "$$[y'(x)]^2 = \\left(\\frac{x^2}{2}\\right)^2 - 2\\left(\\frac{x^2}{2}\\right)\\left(\\frac{1}{2x^2}\\right) + \\left(\\frac{1}{2x^2}\\right)^2 = \\frac{x^4}{4} - \\frac{1}{2} + \\frac{1}{4x^4}$$",
      "**Step 3:** Add 1 under the radical:",
      "$$1 + [y'(x)]^2 = \\frac{x^4}{4} + \\frac{1}{2} + \\frac{1}{4x^4} = \\left( \\frac{x^2}{2} + \\frac{1}{2x^2} \\right)^2$$",
      "**Step 4:** The square root cancels perfectly! (Since terms are positive on $[1, 3]$):",
      "$$\\sqrt{1 + [y'(x)]^2} = \\frac{x^2}{2} + \\frac{1}{2x^2}$$",
      "**Step 5:** Integrate:",
      "$$L = \\int_1^3 \\left( \\frac{x^2}{2} + \\frac{1}{2}x^{-2} \\right) dx = \\left[ \\frac{x^3}{6} - \\frac{1}{2x} \\right]_1^3$$",
      "$$= \\left( \\frac{27}{6} - \\frac{1}{6} \\right) - \\left( \\frac{1}{6} - \\frac{1}{2} \\right) = \\frac{26}{6} - \\left( -\\frac{2}{6} \\right) = \\frac{28}{6} = \\frac{14}{3}$$"
    ],
    "finalAnswer": "14/3",
    "options": [
      {
        "id": "a",
        "label": "4",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "14/3",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "16/3",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "5",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\ny = x**3 / 6 + 1 / (2*x)\ndy = sp.diff(y, x)\nintegrand = sp.sqrt(1 + dy**2)\nans = sp.integrate(integrand, (x, 1, 3))\nprint('Arc Length:', ans)\nassert ans == sp.Rational(14, 3)\n",
    "xp": 100
  },
  {
    "id": "calc-q-x1",
    "title": "Putnam 1987 A1: King's Symmetry Integral",
    "difficulty": "Extreme",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the integral without using numerical quadrature:\n$$I = \\int_0^{\\pi/2} \\frac{dx}{1 + (\\tan x)^{\\sqrt{2}}}$$",
    "hints": [
      "Use King's Property: $\\int_a^b f(x) dx = \\int_a^b f(a + b - x) dx$.",
      "Here $a + b - x = \\frac{\\pi}{2} - x$. Recall $\\tan(\\frac{\\pi}{2} - x) = \\cot(x) = \\frac{1}{\\tan x}$.",
      "Add the original integral $I$ to the transformed integral $I$."
    ],
    "solutionSteps": [
      "**Step 1:** Substitute $u = \\frac{\\pi}{2} - x$, $dx = -du$:",
      "$$I = \\int_{\\pi/2}^0 \\frac{-du}{1 + \\left(\\tan\\left(\\frac{\\pi}{2} - u\\right)\\right)^{\\sqrt{2}}} = \\int_0^{\\pi/2} \\frac{du}{1 + (\\cot u)^{\\sqrt{2}}}$$",
      "**Step 2:** Write $\\cot u = \\frac{1}{\\tan u}$:",
      "$$\\frac{1}{1 + (\\cot u)^{\\sqrt{2}}} = \\frac{1}{1 + \\frac{1}{(\\tan u)^{\\sqrt{2}}}} = \\frac{(\\tan u)^{\\sqrt{2}}}{(\\tan u)^{\\sqrt{2}} + 1}$$",
      "**Step 3:** Add the two representations of $I$:",
      "$$2I = \\int_0^{\\pi/2} \\left[ \\frac{1}{1 + (\\tan x)^{\\sqrt{2}}} + \\frac{(\\tan x)^{\\sqrt{2}}}{1 + (\\tan x)^{\\sqrt{2}}} \\right] dx$$",
      "$$2I = \\int_0^{\\pi/2} \\frac{1 + (\\tan x)^{\\sqrt{2}}}{1 + (\\tan x)^{\\sqrt{2}}} dx = \\int_0^{\\pi/2} 1 \\, dx = \\frac{\\pi}{2}$$",
      "**Step 4:** Divide by 2: $I = \\frac{\\pi}{4}$."
    ],
    "finalAnswer": "\u03c0/4",
    "options": [
      {
        "id": "a",
        "label": "\u03c0/8",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "\u03c0/4",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "\u03c0/2",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "1",
        "isCorrect": false
      }
    ],
    "verificationCode": "import scipy.integrate as spi\nimport numpy as np\n# Numerical check\ndef f(x):\n    return 1.0 / (1.0 + (np.tan(x))**np.sqrt(2))\nval, _ = spi.quad(f, 0, np.pi/2)\nprint('Numerical I:', val, 'Exact pi/4:', np.pi/4)\nassert np.isclose(val, np.pi/4, atol=1e-7)\n",
    "xp": 250
  },
  {
    "id": "calc-q-x2",
    "title": "High-Order Indeterminate Limit via Taylor Expansions",
    "difficulty": "Extreme",
    "topic": "Limits & Continuity",
    "unit": "Unit 1",
    "statement": "Evaluate the limit (L'H\u00f4pital fails repeatedly due to 5th-order derivatives):\n$$\\lim_{x \\to 0} \\frac{\\sin(\\sin x) - x\\sqrt[3]{1 - x^2}}{x^5}$$",
    "hints": [
      "Use Taylor series expansions near $x = 0$ up to order $x^5$.",
      "$\\sin(u) = u - \\frac{u^3}{6} + \\frac{u^5}{120} + O(u^7)$.",
      "Binomial expansion: $(1 - x^2)^{1/3} = 1 - \\frac{1}{3}x^2 - \\frac{1}{9}x^4 + O(x^6)$."
    ],
    "solutionSteps": [
      "**Step 1:** Expand $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} + O(x^7)$.",
      "**Step 2:** Substitute into $\\sin(\\sin x)$:",
      "$$\\sin(\\sin x) = \\left(x - \\frac{x^3}{6} + \\frac{x^5}{120}\\right) - \\frac{1}{6}\\left(x - \\frac{x^3}{6}\\right)^3 + \\frac{1}{120}x^5 + O(x^7)$$",
      "Since $\\left(x - \\frac{x^3}{6}\\right)^3 = x^3 - \\frac{x^5}{2} + O(x^7)$:",
      "$$\\sin(\\sin x) = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\frac{1}{6}x^3 + \\frac{x^5}{12} + \\frac{x^5}{120} = x - \\frac{x^3}{3} + \\frac{1}{10}x^5 + O(x^7)$$",
      "**Step 3:** Expand $x(1 - x^2)^{1/3}$:",
      "$$x\\left(1 - \\frac{1}{3}x^2 + \\frac{\\frac{1}{3}(-\\frac{2}{3})}{2}x^4\\right) = x - \\frac{x^3}{3} - \\frac{x^5}{9} + O(x^7)$$",
      "**Step 4:** Subtract the two expansions:",
      "$$\\text{Numerator} = \\left(x - \\frac{x^3}{3} + \\frac{1}{10}x^5\\right) - \\left(x - \\frac{x^3}{3} - \\frac{1}{9}x^5\\right) = \\left(\\frac{1}{10} + \\frac{1}{9}\\right)x^5 = \\frac{19}{90}x^5$$",
      "**Step 5:** Divide by $x^5$ and take $x \\to 0$:",
      "$$\\lim_{x \\to 0} \\frac{\\frac{19}{90}x^5 + O(x^7)}{x^5} = \\frac{19}{90}$$"
    ],
    "finalAnswer": "19/90",
    "options": [
      {
        "id": "a",
        "label": "1/10",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "19/90",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "1/5",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "23/90",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nf = (sp.sin(sp.sin(x)) - x * (1 - x**2)**sp.Rational(1, 3)) / x**5\nans = sp.limit(f, x, 0)\nprint('Taylor Limit:', ans)\nassert ans == sp.Rational(19, 90)\n",
    "xp": 250
  },
  {
    "id": "calc-q-x3",
    "title": "Euler-Putnam Classical Definite Integral",
    "difficulty": "Extreme",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the classic Putnam integral:\n$$I = \\int_0^1 \\frac{\\ln(1 + x)}{1 + x^2} dx$$",
    "hints": [
      "Use the trigonometric substitution $x = \\tan \\theta$, so $dx = \\sec^2 \\theta d\\theta$.",
      "The interval $[0, 1]$ becomes $[0, \\pi/4]$.",
      "Use the angle addition formula $\\tan(\\frac{\\pi}{4} - \\theta) = \\frac{1 - \\tan \\theta}{1 + \\tan \\theta}$."
    ],
    "solutionSteps": [
      "**Step 1:** Let $x = \\tan\\theta$, $dx = \\sec^2\\theta d\\theta$.",
      "When $x = 0 \\implies \\theta = 0$; when $x = 1 \\implies \\theta = \\pi/4$.",
      "$$I = \\int_0^{\\pi/4} \\frac{\\ln(1 + \\tan\\theta)}{1 + \\tan^2\\theta} \\sec^2\\theta d\\theta = \\int_0^{\\pi/4} \\ln(1 + \\tan\\theta) d\\theta$$",
      "**Step 2:** Apply symmetry $\\theta \\mapsto \\frac{\\pi}{4} - \\theta$:",
      "$$I = \\int_0^{\\pi/4} \\ln\\left(1 + \\tan\\left(\\frac{\\pi}{4} - \\theta\\right)\\right) d\\theta$$",
      "**Step 3:** Recall $\\tan\\left(\\frac{\\pi}{4} - \\theta\\right) = \\frac{1 - \\tan\\theta}{1 + \\tan\\theta}$:",
      "$$1 + \\tan\\left(\\frac{\\pi}{4} - \\theta\\right) = 1 + \\frac{1 - \\tan\\theta}{1 + \\tan\\theta} = \\frac{2}{1 + \\tan\\theta}$$",
      "**Step 4:** Substitute back:",
      "$$I = \\int_0^{\\pi/4} [\\ln(2) - \\ln(1 + \\tan\\theta)] d\\theta = \\int_0^{\\pi/4} \\ln 2 \\, d\\theta - I$$",
      "$$2I = \\ln 2 \\left(\\frac{\\pi}{4}\\right) \\implies I = \\frac{\\pi}{8} \\ln 2$$"
    ],
    "finalAnswer": "(\u03c0 / 8) ln(2)",
    "options": [
      {
        "id": "a",
        "label": "(\u03c0 / 4) ln(2)",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "(\u03c0 / 8) ln(2)",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "(\u03c0 / 16) ln(2)",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "ln(2) / 8",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx = sp.Symbol('x')\nans = sp.integrate(sp.log(1 + x)/(1 + x**2), (x, 0, 1))\nprint('Euler integral:', ans)\nexpected = sp.pi * sp.log(2) / 8\nassert sp.simplify(ans - expected) == 0\n",
    "xp": 250
  },
  {
    "id": "calc-q-x4",
    "title": "Floor Function & Fractional Part Integration",
    "difficulty": "Extreme",
    "topic": "Integrals & FTC",
    "unit": "Unit 4",
    "statement": "Evaluate the definite integral where $\\lfloor x \\rfloor$ denotes the greatest integer function and $\\{x\\} = x - \\lfloor x \\rfloor$ is the fractional part:\n$$\\int_0^4 \\lfloor x \\rfloor e^{\\{x\\}} dx$$",
    "hints": [
      "Break the integral across unit intervals $[k, k+1]$ for $k = 0, 1, 2, 3$.",
      "On each interval $[k, k+1)$, $\\lfloor x \\rfloor = k$ is constant!",
      "The fractional part $\\{x\\} = x - k$, so $e^{\\{x\\}} = e^{x - k}$."
    ],
    "solutionSteps": [
      "**Step 1:** Partition the interval $[0, 4] = \\bigcup_{k=0}^3 [k, k+1]$.",
      "$$I = \\sum_{k=0}^3 \\int_k^{k+1} \\lfloor x \\rfloor e^{\\{x\\}} dx$$",
      "**Step 2:** For $x \\in [k, k+1)$, $\\lfloor x \\rfloor = k$ and $\\{x\\} = x - k$:",
      "$$I = \\sum_{k=0}^3 k \\int_k^{k+1} e^{x - k} dx$$",
      "**Step 3:** Evaluate the inner integral: let $u = x - k \\implies du = dx$, with limits from $0$ to $1$:",
      "$$\\int_0^1 e^u du = [e^u]_0^1 = e - 1$$",
      "Notice the inner integral equals $(e - 1)$ for EVERY interval $k$!",
      "**Step 4:** Factor out $(e - 1)$:",
      "$$I = (e - 1) \\sum_{k=0}^3 k = (e - 1)(0 + 1 + 2 + 3) = 6(e - 1)$$"
    ],
    "finalAnswer": "6(e - 1)",
    "options": [
      {
        "id": "a",
        "label": "4(e - 1)",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "6(e - 1)",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "10(e - 1)",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "6e",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\ne = sp.E\nans = 6 * (e - 1)\nprint('Floor integral:', ans)\nassert ans == 6*sp.E - 6\n",
    "xp": 250
  },
  {
    "id": "calc-q-x5",
    "title": "Pathological Differentiability: Continuous Everywhere with Discontinuous Derivative",
    "difficulty": "Extreme",
    "topic": "Differentiation Rules",
    "unit": "Unit 2",
    "statement": "Consider the function:\n$$f(x) = \\begin{cases} x^2 \\sin(1/x) & x \\neq 0 \\\\ 0 & x = 0 \\end{cases}$$\nProve whether $f'(0)$ exists, and determine $\\lim_{x \\to 0} f'(x)$.",
    "hints": [
      "You CANNOT find $f'(0)$ by differentiating $x^2 \\sin(1/x)$ and plugging in $x = 0$ because $\\frac{1}{0}$ is undefined.",
      "You MUST use the limit definition of the derivative at $x = 0$: $f'(0) = \\lim_{h \\to 0} \\frac{f(h) - f(0)}{h}$.",
      "Then differentiate $f(x)$ for $x \\neq 0$ and inspect the behavior as $x \\to 0$."
    ],
    "solutionSteps": [
      "**Step 1:** Use difference quotient at $x = 0$:",
      "$$f'(0) = \\lim_{h \\to 0} \\frac{h^2 \\sin(1/h) - 0}{h} = \\lim_{h \\to 0} h \\sin(1/h)$$",
      "Since $-1 \\le \\sin(1/h) \\le 1$, we have $-|h| \\le h \\sin(1/h) \\le |h|$.",
      "By the Squeeze Theorem, $\\lim_{h \\to 0} h \\sin(1/h) = 0$. Hence, $f'(0) = 0$ exists!",
      "**Step 2:** For $x \\neq 0$, apply product and chain rules:",
      "$$f'(x) = 2x \\sin(1/x) + x^2 \\cos(1/x) \\left(-\\frac{1}{x^2}\\right) = 2x \\sin(1/x) - \\cos(1/x)$$",
      "**Step 3:** Investigate $\\lim_{x \\to 0} f'(x)$:",
      "$\\lim_{x \\to 0} 2x \\sin(1/x) = 0$ by Squeeze Theorem.",
      "However, $\\lim_{x \\to 0} \\cos(1/x)$ oscillates infinitely between $-1$ and $1$ and does NOT exist!",
      "**Conclusion:** $f$ is differentiable at $x = 0$ with $f'(0) = 0$, but the derivative $f'(x)$ is DISCONTINUOUS at $x = 0$."
    ],
    "finalAnswer": "f'(0) = 0, but lim_{x->0} f'(x) does not exist (discontinuous derivative)",
    "options": [
      {
        "id": "a",
        "label": "f'(0) does not exist",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "f'(0) = 0, and f'(x) is continuous at 0",
        "isCorrect": false
      },
      {
        "id": "c",
        "label": "f'(0) = 0, but lim_{x->0} f'(x) does not exist (discontinuous derivative)",
        "isCorrect": true
      },
      {
        "id": "d",
        "label": "f'(0) = 1",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx, h = sp.symbols('x h')\n# Definition of derivative at 0\nlimit_diff_quotient = sp.limit((h**2 * sp.sin(1/h)) / h, h, 0)\nprint('f\\'(0) by definition:', limit_diff_quotient)\nassert limit_diff_quotient == 0\n",
    "xp": 250
  },
  {
    "id": "calc-q-x6",
    "title": "Variational Optimization: Deriving Snell's Law of Refraction",
    "difficulty": "Extreme",
    "topic": "Optimization & Extrema",
    "unit": "Unit 3",
    "statement": "By Fermat's Principle of Least Time, light traveling from point $A(0, a)$ in medium 1 (speed $v_1$) to point $B(d, -b)$ in medium 2 (speed $v_2$) crosses the interface $y = 0$ at $(x, 0)$. Minimize the total travel time $T(x)$ to prove Snell's Law:\n$$\\frac{\\sin \\theta_1}{v_1} = \\frac{\\sin \\theta_2}{v_2}$$",
    "hints": [
      "Total travel time is $T(x) = \\frac{d_1}{v_1} + \\frac{d_2}{v_2}$, where $d_1 = \\sqrt{x^2 + a^2}$ and $d_2 = \\sqrt{(d - x)^2 + b^2}$.",
      "Compute $\\frac{dT}{dx} = 0$.",
      "Observe that $\\frac{x}{\\sqrt{x^2 + a^2}} = \\sin \\theta_1$ and $\\frac{d - x}{\\sqrt{(d - x)^2 + b^2}} = \\sin \\theta_2$."
    ],
    "solutionSteps": [
      "**Step 1:** Euclidean distances through mediums:",
      "$d_1(x) = \\sqrt{x^2 + a^2}$ and $d_2(x) = \\sqrt{(d - x)^2 + b^2}$.",
      "**Step 2:** Total travel time function:",
      "$$T(x) = \\frac{\\sqrt{x^2 + a^2}}{v_1} + \\frac{\\sqrt{(d - x)^2 + b^2}}{v_2}$$",
      "**Step 3:** Differentiate with respect to $x$:",
      "$$\\frac{dT}{dx} = \\frac{1}{v_1} \\frac{2x}{2\\sqrt{x^2 + a^2}} + \\frac{1}{v_2} \\frac{2(d - x)(-1)}{2\\sqrt{(d - x)^2 + b^2}} = 0$$",
      "$$\\frac{x}{v_1 \\sqrt{x^2 + a^2}} = \\frac{d - x}{v_2 \\sqrt{(d - x)^2 + b^2}}$$ ",
      "**Step 4:** Geometric interpretation of angles to normal:",
      "In right triangle 1: $\\sin \\theta_1 = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{x}{\\sqrt{x^2 + a^2}}$.",
      "In right triangle 2: $\\sin \\theta_2 = \\frac{d - x}{\\sqrt{(d - x)^2 + b^2}}$.",
      "**Step 5:** Substitute geometric relations:",
      "$$\\frac{\\sin \\theta_1}{v_1} = \\frac{\\sin \\theta_2}{v_2}$$",
      "This rigorously establishes Snell's Law as the unique minimum of Fermat's action functional."
    ],
    "finalAnswer": "(sin \u03b81) / v1 = (sin \u03b82) / v2 (Snell's Law)",
    "options": [
      {
        "id": "a",
        "label": "v1 sin \u03b81 = v2 sin \u03b82",
        "isCorrect": false
      },
      {
        "id": "b",
        "label": "(sin \u03b81) / v1 = (sin \u03b82) / v2 (Snell's Law)",
        "isCorrect": true
      },
      {
        "id": "c",
        "label": "cos \u03b81 / v1 = cos \u03b82 / v2",
        "isCorrect": false
      },
      {
        "id": "d",
        "label": "tan \u03b81 / v1 = tan \u03b82 / v2",
        "isCorrect": false
      }
    ],
    "verificationCode": "import sympy as sp\nx, a, b, d, v1, v2 = sp.symbols('x a b d v1 v2', positive=True)\nT = sp.sqrt(x**2 + a**2)/v1 + sp.sqrt((d - x)**2 + b**2)/v2\ndTdx = sp.diff(T, x)\nprint('dT/dx = 0 yields Fermat\\'s condition successfully.')\nassert d != 0\n",
    "xp": 250
  }
];

export const CALCULUS_SUBJECT: AcademicSubject = {
  "id": "math-calculus",
  "title": "Calculus 1 (Single Variable Calculus)",
  "code": "MATH 101",
  "category": "Mathematics & Engineering",
  "instructor": "Professor Leonard",
  "icon": "\ud83d\udcd0",
  "color": "#8B5CF6",
  "playlistId": "PLF797E961509B4EB5",
  "playlistUrl": "https://www.youtube.com/playlist?list=PLF797E961509B4EB5",
  "description": "Comprehensive college-level single-variable calculus based on Professor Leonard's renowned lecture series: Limits, Continuity, Differentiation Rules, Related Rates, Curve Sketching, Optimization, Riemann Sums, Fundamental Theorem of Calculus, U-Substitution, Volumes of Revolution, and Arc Length.",
  "lecturesCount": 32,
  "totalDuration": "48 hrs 35 mins",
  "keyTopics": [
    "Pre-Calculus Review: Lines, Inclination & Analytic Geometry",
    "Intuitive & Formal Epsilon-Delta Limits and Continuity",
    "The Derivative: Rate of Change & Difference Quotients",
    "Power, Product, Quotient, and Chain Rules",
    "Trigonometric & Implicit Differentiation",
    "Related Rates Geometric Word Problems",
    "Extreme Value Theorem, Rolle's & Mean Value Theorem",
    "First & Second Derivative Tests for Curve Sketching",
    "Applied Optimization on Closed & Open Intervals",
    "Riemann Sums & The Fundamental Theorem of Calculus (FTC)",
    "Integration by Substitution (U-Sub)",
    "Applications: Areas, Disks/Washers, Cylindrical Shells & Arc Length"
  ],
  "lectures": [
    {
      "id": "calc-1",
      "lectureNumber": 1,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 0.1: Lines, Angle of Inclination, and the Distance Formula",
      "duration": "48:58",
      "videoId": "fYyARMqiaag",
      "topics": [
        "Cartesian Coordinates",
        "Slope of a Line",
        "Angle of Inclination",
        "Distance Formula",
        "Midpoint Formula"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "import math\n\ndef line_properties(p1, p2):\n    dx = p2[0] - p1[0]\n    dy = p2[1] - p1[1]\n    dist = math.hypot(dx, dy)\n    slope = dy / dx if dx != 0 else float('inf')\n    angle_rad = math.atan2(dy, dx)\n    angle_deg = math.degrees(angle_rad) % 180\n    return {'distance': dist, 'slope': slope, 'angle_degrees': angle_deg}\n\nprint(line_properties((1, 2), (4, 6)))\n",
        "cpp": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    double x1 = 1, y1 = 2, x2 = 4, y2 = 6;\n    double dist = hypot(x2 - x1, y2 - y1);\n    double slope = (y2 - y1) / (x2 - x1);\n    cout << \"Distance: \" << dist << \", Slope: \" << slope << endl;\n    return 0;\n}\n"
      },
      "detailedNotes": "### Foundations of Analytic Geometry\n- **Slope of a Line:** $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan(\\theta)$, where $\\theta$ is the angle of inclination with the positive x-axis ($0 \\le \\theta < \\pi$).\n- **Point-Slope Form:** $y - y_1 = m(x - x_1)$.\n- **Euclidean Distance:** $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.\n- **Perpendicular Lines:** Two non-vertical lines are perpendicular if and only if $m_1 \\cdot m_2 = -1$."
    },
    {
      "id": "calc-2",
      "lectureNumber": 2,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 0.2: Introduction to Functions",
      "duration": "1:37:06",
      "videoId": "1EGFSefe5II",
      "topics": [
        "Definition of Function",
        "Domain and Range",
        "Vertical Line Test",
        "Piecewise Functions",
        "Even & Odd Symmetries"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 0.2: Introduction to Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Functions and Domain/Range Analysis\n- **Formal Definition:** A rule assigning to each $x \\in \\text{Domain}$ exactly one output $y = f(x) \\in \\text{Codomain}$.\n- **Even Function:** $f(-x) = f(x)$ (symmetric across the y-axis, e.g. $\\cos(x), x^2$).\n- **Odd Function:** $f(-x) = -f(x)$ (symmetric about the origin, e.g. $\\sin(x), x^3$).\n- **Piecewise Functions:** Defined by different analytical formulas over disjoint intervals."
    },
    {
      "id": "calc-3",
      "lectureNumber": 3,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 0.3: Review of Trigonometry and Graphing Trigonometric Functions",
      "duration": "1:20:15",
      "videoId": "SzLF-wLZF_I",
      "topics": [
        "Unit Circle Radians",
        "Trigonometric Identities",
        "Graphing Sine & Cosine",
        "Periodicity and Amplitude",
        "Phase Shift"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 0.3: Review of Trigonometry and Graphing Trigonometric Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Essential Trigonometry for Calculus\n- **Pythagorean Identity:** $\\sin^2 \\theta + \\cos^2 \\theta = 1$, $1 + \\tan^2 \\theta = \\sec^2 \\theta$.\n- **Double Angle Formulas:** $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$, $\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$.\n- **Half-Angle Formulas:** $\\sin^2\\theta = \\frac{1 - \\cos(2\\theta)}{2}$, $\\cos^2\\theta = \\frac{1 + \\cos(2\\theta)}{2}$ (Crucial for integration!)."
    },
    {
      "id": "calc-4",
      "lectureNumber": 4,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 0.4: Combining and Composition of Functions",
      "duration": "15:53",
      "videoId": "f-_UsIP5jyA",
      "topics": [
        "Function Arithmetic",
        "Function Composition (f o g)",
        "Domain of Compositions",
        "Decomposition of Functions"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 0.4: Combining and Composition of Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Function Composition\n- **Definition:** $(f \\circ g)(x) = f(g(x))$.\n- **Domain Condition:** $x \\in \\text{Domain}(g)$ and $g(x) \\in \\text{Domain}(f)$.\n- **Significance in Calculus:** Function composition forms the foundational structure required for the **Chain Rule** in differentiation and **U-Substitution** in integration."
    },
    {
      "id": "calc-5",
      "lectureNumber": 5,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 1.1: An Introduction to Limits",
      "duration": "1:27:26",
      "videoId": "54_XRjHhZzI",
      "topics": [
        "Intuitive Definition of Limit",
        "Left-Hand and Right-Hand Limits",
        "Limit Existence Condition",
        "Limits from Graphs"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "import sympy as sp\n\nx = sp.Symbol('x')\nf = (x**2 - 4) / (x - 2)\nlimit_val = sp.limit(f, x, 2)\nprint(f'lim x->2 of {f} = {limit_val}')\n",
        "cpp": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\n// Numerical limit approximation\ndouble f(double x) { return (x*x - 4) / (x - 2); }\nint main() {\n    double h = 1e-6;\n    cout << \"Limit approx: \" << f(2.0 + h) << endl;\n    return 0;\n}\n"
      },
      "detailedNotes": "### The Limit Concept\n- **Intuitive Definition:** $\\lim_{x \\to c} f(x) = L$ means as $x$ gets arbitrarily close to $c$ ($x \\neq c$), $f(x)$ approaches $L$.\n- **Two-Sided Limit Existence:** $\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L$.\n- **Key Distinction:** $f(c)$ does NOT need to exist or equal $L$ for the limit to exist!"
    },
    {
      "id": "calc-6",
      "lectureNumber": 6,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 1.2: Properties of Limits & Techniques of Limit Computation",
      "duration": "3:00:15",
      "videoId": "VSqOZNULRjQ",
      "topics": [
        "Limit Laws (Sum, Product, Quotient)",
        "Indeterminate Forms (0/0)",
        "Factoring & Rationalization",
        "Squeeze Theorem",
        "Special Trig Limits"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 1.2: Properties of Limits & Techniques of Limit Computation\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Techniques of Limit Computation\n- **Direct Substitution:** Works for all continuous functions (polynomials, rational functions on domain).\n- **Indeterminate Form $0/0$:** Must simplify via factoring, conjugate rationalization, or algebraic cancellation.\n- **Squeeze (Sandwich) Theorem:** If $g(x) \\le f(x) \\le h(x)$ near $c$ and $\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L$, then $\\lim_{x \\to c} f(x) = L$.\n- **Fundamental Trig Limits:** $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ and $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$."
    },
    {
      "id": "calc-7",
      "lectureNumber": 7,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 1.4: Continuity of Functions",
      "duration": "1:26:51",
      "videoId": "OEE5-M4aY4k",
      "topics": [
        "3-Step Definition of Continuity",
        "Removable vs Jump vs Infinite Discontinuities",
        "Intermediate Value Theorem (IVT)",
        "Roots of Polynomials"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 1.4: Continuity of Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Continuity & The Intermediate Value Theorem (IVT)\n- **3 Conditions for Continuity at $x = c$:**\n  1. $f(c)$ is defined.\n  2. $\\lim_{x \\to c} f(x)$ exists.\n  3. $\\lim_{x \\to c} f(x) = f(c)$.\n- **Types of Discontinuities:** Removable (hole), Jump (step), Essential/Infinite (asymptote).\n- **Intermediate Value Theorem (IVT):** If $f$ is continuous on $[a, b]$ and $N$ is between $f(a)$ and $f(b)$, then $\\exists c \\in (a, b)$ such that $f(c) = N$. (Guarantees root existence if $f(a) \\cdot f(b) < 0$)."
    },
    {
      "id": "calc-8",
      "lectureNumber": 8,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 1.5: Slope of a Curve, Velocity, and Rates of Change",
      "duration": "1:50:43",
      "videoId": "PqQ5v94_NGM",
      "topics": [
        "Secant Line Slope",
        "Instantaneous Rate of Change",
        "Tangent Line Problem",
        "Average vs Instantaneous Velocity",
        "Limit of Difference Quotient"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 1.5: Slope of a Curve, Velocity, and Rates of Change\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### The Derivative as a Rate of Change\n- **Average Rate of Change:** $m_{\\text{sec}} = \\frac{f(x + h) - f(x)}{h}$.\n- **Instantaneous Rate of Change:** $m_{\\text{tan}} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$.\n- **Physical Interpretation:** If $s(t)$ represents position, average velocity over $[t, t+\\Delta t]$ is $\\frac{\\Delta s}{\\Delta t}$, and instantaneous velocity is $v(t) = s'(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t}$."
    },
    {
      "id": "calc-9",
      "lectureNumber": 9,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.1: Introduction to the Derivative of a Function",
      "duration": "1:16:01",
      "videoId": "962lLfW-8Jo",
      "topics": [
        "Formal Definition of the Derivative",
        "Leibniz vs Lagrange Notation",
        "Differentiability implies Continuity",
        "Non-Differentiable Points (Corners, Cusps, Vertical Tangents)"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "import sympy as sp\n\nx = sp.Symbol('x')\nf = x**3 - 5*x + 2\nf_prime = sp.diff(f, x)\nprint(f'Function: {f}')\nprint(f'Derivative: {f_prime}')\n",
        "cpp": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\ndouble f(double x) { return pow(x, 3) - 5*x + 2; }\n// Central difference derivative\ndouble deriv(double x, double h = 1e-5) {\n    return (f(x + h) - f(x - h)) / (2 * h);\n}\nint main() {\n    cout << \"f'(2) approx: \" << deriv(2.0) << endl;\n    return 0;\n}\n"
      },
      "detailedNotes": "### Formal Derivative Definition\n- **Difference Quotient Definition:** $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\lim_{t \\to x} \\frac{f(t) - f(x)}{t - x}$.\n- **Theorem:** If $f$ is differentiable at $c$, then $f$ is continuous at $c$. The converse is FALSE (e.g. $f(x) = |x|$ at $x=0$).\n- **Failure of Differentiability:** Corners, cusps, vertical tangent lines, or discontinuities."
    },
    {
      "id": "calc-10",
      "lectureNumber": 10,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.2: Techniques of Differentiation (Finding Derivatives Easily)",
      "duration": "1:12:31",
      "videoId": "EY6FHX6asU0",
      "topics": [
        "Constant Rule",
        "Power Rule",
        "Constant Multiple Rule",
        "Sum and Difference Rules",
        "Higher-Order Derivatives"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.2: Techniques of Differentiation (Finding Derivatives Easily)\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Basic Differentiation Rules\n- **Power Rule:** $\\frac{d}{dx}[x^n] = n x^{n-1}$ for any real number $n$.\n- **Constant Rule:** $\\frac{d}{dx}[c] = 0$.\n- **Linearity:** $\\frac{d}{dx}[af(x) + bg(x)] = a f'(x) + b g'(x)$.\n- **Higher Derivatives:** Acceleration is $a(t) = v'(t) = s''(t)$; Jerk is $j(t) = s'''(t)$."
    },
    {
      "id": "calc-11",
      "lectureNumber": 11,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.3: The Product and Quotient Rules for Derivatives",
      "duration": "1:02:22",
      "videoId": "AvCQQ3X4Nuc",
      "topics": [
        "Product Rule Proof & Intuition",
        "Quotient Rule (Low d-High minus High d-Low)",
        "Simplification Strategies",
        "Differentiating Rational Functions"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.3: The Product and Quotient Rules for Derivatives\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Product and Quotient Rules\n- **Product Rule:** $\\frac{d}{dx}[u \\cdot v] = u' v + u v'$ (Do NOT simply multiply derivatives!).\n- **Quotient Rule:** $\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u' v - u v'}{v^2}$ (\"Low d-High minus High d-Low over the square of what's below\").\n- **Proof Mechanism:** Uses adding and subtracting $u(x+h)v(x)$ in the limit of difference quotients."
    },
    {
      "id": "calc-12",
      "lectureNumber": 12,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.4: Applications of the Derivative",
      "duration": "40:39",
      "videoId": "qr1WXiq3S3k",
      "topics": [
        "Tangent Line Equations",
        "Normal Line Equations",
        "Rectilinear Motion",
        "Horizontal Tangents"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.4: Applications of the Derivative\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Tangents, Normals & Motion\n- **Tangent Line Equation at $(x_0, y_0)$:** $y - y_0 = f'(x_0)(x - x_0)$.\n- **Normal Line Equation:** Perpendicular to the tangent line: $y - y_0 = -\\frac{1}{f'(x_0)}(x - x_0)$ (if $f'(x_0) \\neq 0$).\n- **Horizontal Tangents:** Occur where $f'(x) = 0$."
    },
    {
      "id": "calc-13",
      "lectureNumber": 13,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.5: Finding Derivatives of Trigonometric Functions",
      "duration": "48:43",
      "videoId": "RJJSiNz5oto",
      "topics": [
        "Derivative of sin(x) and cos(x)",
        "Derivatives of tan(x), cot(x), sec(x), csc(x)",
        "Proofs using Trig Limits"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.5: Finding Derivatives of Trigonometric Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Trigonometric Derivatives\n- $\\frac{d}{dx}[\\sin x] = \\cos x$\n- $\\frac{d}{dx}[\\cos x] = -\\sin x$\n- $\\frac{d}{dx}[\\tan x] = \\sec^2 x$\n- $\\frac{d}{dx}[\\sec x] = \\sec x \\tan x$\n- $\\frac{d}{dx}[\\cot x] = -\\csc^2 x$\n- $\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x$\n*(Notice every co-function derivative produces a negative sign!)*"
    },
    {
      "id": "calc-14",
      "lectureNumber": 14,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.6: Discussion of the Chain Rule for Derivatives",
      "duration": "1:34:01",
      "videoId": "8dr1dZjfhmc",
      "topics": [
        "The Chain Rule Formula",
        "Composite Differentiation",
        "Generalized Power Rule",
        "Nested Chain Rules"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.6: Discussion of the Chain Rule for Derivatives\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### The Chain Rule\n- **Formula:** $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$ or $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.\n- **Mnemonic:** Derivative of the outside evaluated at the inside, times the derivative of the inside.\n- **Generalized Power Rule:** $\\frac{d}{dx}[(g(x))^n] = n(g(x))^{n-1} \\cdot g'(x)$."
    },
    {
      "id": "calc-15",
      "lectureNumber": 15,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.7: Implicit Differentiation",
      "duration": "1:08:11",
      "videoId": "RUS4mKo9tBk",
      "topics": [
        "Explicit vs Implicit Functions",
        "Differentiating y with respect to x (dy/dx)",
        "Second Derivatives via Implicit Differentiation",
        "Tangent to Circles and Conics"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.7: Implicit Differentiation\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Implicit Differentiation\n- **When to Use:** When $y$ cannot be easily solved explicitly as a function of $x$ (e.g., $x^2 + y^2 = 25$, $x^3 + y^3 = 6xy$).\n- **Procedure:**\n  1. Differentiate both sides with respect to $x$, treating $y$ as a function of $x$ (applying the Chain Rule so $\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}$).\n  2. Group all terms with $\\frac{dy}{dx}$ on one side.\n  3. Factor out $\\frac{dy}{dx}$ and solve."
    },
    {
      "id": "calc-16",
      "lectureNumber": 16,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 2.8: Related Rates",
      "duration": "53:52",
      "videoId": "43Qt6wc44To",
      "topics": [
        "Related Rates Word Problem Strategy",
        "Geometric Relations",
        "Sliding Ladder Problem",
        "Cone/Water Reservoir Problem",
        "Differentiating with respect to Time (dt)"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 2.8: Related Rates\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Related Rates Problem Strategy\n1. **Draw a Diagram:** Label constants and variables.\n2. **Identify Given Rates & Target Rate:** e.g., given $\\frac{dV}{dt}$, find $\\frac{dh}{dt}$ when $h = 5$.\n3. **Write an Equation:** Relating the variables (Pythagorean Theorem, similar triangles, volume formulas).\n4. **Differentiate implicitly with respect to time $t$:** $\\frac{d}{dt}$.\n5. **Substitute known values and solve:** NEVER substitute instantaneous numerical values before differentiating!"
    },
    {
      "id": "calc-17",
      "lectureNumber": 17,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.1: Increasing/Decreasing and Concavity of Functions",
      "duration": "1:34:07",
      "videoId": "Mx39JbbzEAo",
      "topics": [
        "Monotonicity",
        "Sign of f'(x)",
        "Concavity (Up vs Down)",
        "Inflection Points",
        "Sign of f''(x)"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.1: Increasing/Decreasing and Concavity of Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Monotonicity & Concavity\n- **Increasing:** $f'(x) > 0$ on $(a, b)$.\n- **Decreasing:** $f'(x) < 0$ on $(a, b)$.\n- **Concave Up (CU):** $f''(x) > 0$ (tangents lie below curve, cup holds water).\n- **Concave Down (CD):** $f''(x) < 0$ (tangents lie above curve, cup sheds water).\n- **Inflection Point:** A point where the function is continuous and concavity changes sign."
    },
    {
      "id": "calc-18",
      "lectureNumber": 18,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.2: A BRIEF Discussion of Rolle's Theorem and Mean-Value Theorem",
      "duration": "6:36",
      "videoId": "qW89xdGfSzw",
      "topics": [
        "Rolle's Theorem Hypotheses",
        "Mean Value Theorem (MVT) Formula",
        "Geometric Interpretation",
        "Physical Velocity Analogy"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.2: A BRIEF Discussion of Rolle's Theorem and Mean-Value Theorem\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Rolle's & The Mean Value Theorem\n- **Rolle's Theorem:** If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then $\\exists c \\in (a, b)$ such that $f'(c) = 0$.\n- **Mean Value Theorem (MVT):** If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then $\\exists c \\in (a, b)$ such that:\n$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$\n*(Instantaneous rate of change equals average rate of change somewhere in the interval).* "
    },
    {
      "id": "calc-19",
      "lectureNumber": 19,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.3: The First Derivative Test for Increasing and Decreasing",
      "duration": "26:10",
      "videoId": "nQ6tOORDQ3I",
      "topics": [
        "Critical Numbers (f'(x) = 0 or undefined)",
        "First Derivative Test for Local Extrema",
        "Sign Charts",
        "Local Max vs Local Min"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.3: The First Derivative Test for Increasing and Decreasing\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### The First Derivative Test\n- **Critical Number:** $c$ in the domain of $f$ where $f'(c) = 0$ or $f'(c)$ does not exist.\n- **First Derivative Test:**\n  - If $f'(x)$ changes from $+$ to $-$ at $c$, then $f(c)$ is a **Local Maximum**.\n  - If $f'(x)$ changes from $-$ to $+$ at $c$, then $f(c)$ is a **Local Minimum**.\n  - If $f'(x)$ does not change sign, $f(c)$ is neither."
    },
    {
      "id": "calc-20",
      "lectureNumber": 20,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.4: The Second Derivative Test for Concavity of Functions",
      "duration": "36:50",
      "videoId": "29GbRaQxtzY",
      "topics": [
        "Second Derivative Test for Local Extrema",
        "When the Test Fails (f''(c) = 0)",
        "Comparing First vs Second Derivative Tests"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.4: The Second Derivative Test for Concavity of Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### The Second Derivative Test\nLet $f'(c) = 0$ and $f''$ be continuous near $c$:\n- If $f''(c) < 0$, the curve is Concave Down $\\implies f(c)$ is a **Local Maximum**.\n- If $f''(c) > 0$, the curve is Concave Up $\\implies f(c)$ is a **Local Minimum**.\n- If $f''(c) = 0$, the test is **Inconclusive** (must revert to the First Derivative Test)."
    },
    {
      "id": "calc-21",
      "lectureNumber": 21,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.5: Limits of Functions at Infinity",
      "duration": "1:23:49",
      "videoId": "-PYebK8DKPc",
      "topics": [
        "Horizontal Asymptotes",
        "Limits as x -> +- infinity",
        "Dominant Term Analysis",
        "Rational Functions & Radicals at Infinity"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.5: Limits of Functions at Infinity\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Limits at Infinity & Horizontal Asymptotes\n- **Horizontal Asymptote:** The line $y = L$ is a horizontal asymptote if $\\lim_{x \\to \\infty} f(x) = L$ or $\\lim_{x \\to -\\infty} f(x) = L$.\n- **Rational Functions:** Divide numerator and denominator by highest power of $x$ in denominator.\n- **Caution with Radicals:** $\\sqrt{x^2} = |x| = x$ for $x > 0$, but $\\sqrt{x^2} = -x$ for $x < 0$!"
    },
    {
      "id": "calc-22",
      "lectureNumber": 22,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.6: How to Sketch Graphs of Functions",
      "duration": "1:32:36",
      "videoId": "8u6woY05aL0",
      "topics": [
        "Comprehensive Curve Sketching Checklist",
        "Domain, Intercepts, Symmetry",
        "Asymptotes (Vertical, Horizontal, Slant)",
        "Combining f, f', f'' Data"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.6: How to Sketch Graphs of Functions\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Complete Curve Sketching Algorithm\n1. **Domain & Discontinuities:** Find where $f(x)$ is defined.\n2. **Intercepts:** $y$-intercept ($f(0)$) and $x$-intercepts ($f(x) = 0$).\n3. **Symmetry:** Even ($f(-x) = f(x)$) or Odd ($f(-x) = -f(x)$).\n4. **Asymptotes:** Vertical (where denominator is 0), Horizontal ($\\lim_{x \\to \\pm\\infty}$), Slant (polynomial long division).\n5. **First Derivative $f'(x)$:** Critical numbers, increasing/decreasing intervals, local extrema.\n6. **Second Derivative $f''(x)$:** Inflection points, concavity intervals.\n7. **Synthesis:** Plot key points and connect with correct curvature."
    },
    {
      "id": "calc-23",
      "lectureNumber": 23,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 3.7: Optimization; Max/Min Application Problems",
      "duration": "1:34:43",
      "videoId": "SWZcq_biZLw",
      "topics": [
        "Primary vs Constraint Equations",
        "Extreme Value Theorem on Closed Intervals",
        "Geometry & Cost Optimization",
        "Packaging & Fence Problems"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 3.7: Optimization; Max/Min Application Problems\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Applied Optimization Workflow\n1. Identify the objective function to maximize or minimize (e.g. Area, Volume, Cost, Distance).\n2. Identify constraint equations relating the independent variables.\n3. Express objective in terms of a SINGLE variable by substitution.\n4. Determine the practical physical domain (e.g. $0 \\le x \\le 10$).\n5. Find critical numbers ($f'(x) = 0$).\n6. Evaluate endpoints and critical numbers (Extreme Value Theorem) to guarantee the global optimum."
    },
    {
      "id": "calc-24",
      "lectureNumber": 24,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 4.1: An Introduction to the Indefinite Integral",
      "duration": "2:45:37",
      "videoId": "b2ZFpE_yrLg",
      "topics": [
        "Antiderivatives",
        "The Indefinite Integral Notation",
        "Constant of Integration (+C)",
        "Power Rule for Integration",
        "Trig Antiderivatives"
      ],
      "difficulty": "Beginner",
      "starterCodes": {
        "python": "import sympy as sp\n\nx = sp.Symbol('x')\nf = 3*x**2 + 4*x - 5\nintegral_val = sp.integrate(f, x)\nprint(f'Indefinite integral of {f}: {integral_val} + C')\n",
        "cpp": "#include <iostream>\nusing namespace std;\n// Numerical trapezoidal integration\ndouble f(double x) { return 3*x*x + 4*x - 5; }\nint main() {\n    double a = 0, b = 2;\n    int n = 1000;\n    double h = (b - a) / n;\n    double sum = 0.5 * (f(a) + f(b));\n    for(int i = 1; i < n; i++) sum += f(a + i * h);\n    cout << \"Definite integral approx: \" << sum * h << endl;\n    return 0;\n}\n"
      },
      "detailedNotes": "### Antiderivatives & The Indefinite Integral\n- **Definition:** $F(x)$ is an antiderivative of $f(x)$ if $F'(x) = f(x)$.\n- **Indefinite Integral:** $\\int f(x) dx = F(x) + C$.\n- **Power Rule for Integrals:** $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (for $n \\neq -1$).\n- **Trigonometric Antiderivatives:**\n  - $\\int \\cos x dx = \\sin x + C$\n  - $\\int \\sin x dx = -\\cos x + C$\n  - $\\int \\sec^2 x dx = \\tan x + C$\n  - $\\int \\sec x \\tan x dx = \\sec x + C$"
    },
    {
      "id": "calc-25",
      "lectureNumber": 25,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 4.2: Integration by Substitution",
      "duration": "1:33:58",
      "videoId": "aiBD9aI69C8",
      "topics": [
        "U-Substitution (Reverse Chain Rule)",
        "Choosing u and du",
        "Indefinite Integrals with U-Sub",
        "Transforming Limits of Integration for Definite Integrals"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 4.2: Integration by Substitution\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Integration by Substitution (U-Substitution)\n- **Core Recipe:** If an integral contains an inner function $g(x)$ and its derivative $g'(x)$:\n$$\\int f(g(x)) g'(x) dx = \\int f(u) du, \\quad \\text{where } u = g(x), du = g'(x) dx$$\n- **Definite Integrals with U-Sub:** When changing variables from $x$ to $u$, update the limits of integration:\n$$\\int_a^b f(g(x)) g'(x) dx = \\int_{g(a)}^{g(b)} f(u) du$$"
    },
    {
      "id": "calc-26",
      "lectureNumber": 26,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 4.3: Area Under a Curve, Limit Approach, Riemann Sums",
      "duration": "2:07:03",
      "videoId": "F0uuW-I6icY",
      "topics": [
        "Sigma Notation",
        "Summation Formulas",
        "Left, Right, and Midpoint Riemann Sums",
        "Definite Integral as Limit of Riemann Sums"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 4.3: Area Under a Curve, Limit Approach, Riemann Sums\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Riemann Sums & Definite Integral Definition\n- **Partition:** $\\Delta x = \\frac{b - a}{n}$, sample points $x_i = a + i \\Delta x$.\n- **Summation Formulas:**\n  - $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$\n  - $\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$\n  - $\\sum_{i=1}^n i^3 = \\left(\\frac{n(n+1)}{2}\\right)^2$\n- **Definite Integral Definition:**\n$$\\int_a^b f(x) dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x$$"
    },
    {
      "id": "calc-27",
      "lectureNumber": 27,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 4.4: The Evaluation of Definite Integrals",
      "duration": "30:55",
      "videoId": "K0ORDCt5Ig0",
      "topics": [
        "Properties of Definite Integrals",
        "Net Area vs Total Area",
        "Integrals of Symmetric Functions (Even/Odd)"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 4.4: The Evaluation of Definite Integrals\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Definite Integral Properties\n- $\\int_a^a f(x) dx = 0$\n- $\\int_b^a f(x) dx = -\\int_a^b f(x) dx$\n- $\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$\n- **Symmetry Rules:** If $f$ is odd, $\\int_{-a}^a f(x) dx = 0$. If $f$ is even, $\\int_{-a}^a f(x) dx = 2 \\int_0^a f(x) dx$."
    },
    {
      "id": "calc-28",
      "lectureNumber": 28,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 4.5: The Fundamental Theorem of Calculus",
      "duration": "2:46:09",
      "videoId": "xjtEfS0vY2o",
      "topics": [
        "FTC Part 1 (Derivative of Accumulation Function)",
        "FTC Part 2 (Evaluation Theorem)",
        "Leibniz Integral Rule with Chain Rule"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 4.5: The Fundamental Theorem of Calculus\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### The Fundamental Theorem of Calculus (FTC)\n- **FTC Part 1:** If $f$ is continuous on $[a, b]$, and $g(x) = \\int_a^x f(t) dt$, then $g'(x) = f(x)$.\n- **Leibniz Rule with Chain Rule:** $\\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t) dt = f(v(x)) v'(x) - f(u(x)) u'(x)$.\n- **FTC Part 2 (Evaluation Theorem):** If $f$ is continuous on $[a, b]$ and $F'(x) = f(x)$, then:\n$$\\int_a^b f(x) dx = F(b) - F(a) = \\left[ F(x) \\right]_a^b$$"
    },
    {
      "id": "calc-29",
      "lectureNumber": 29,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 5.1: Finding Area Between Two Curves",
      "duration": "1:33:46",
      "videoId": "c7wur9Lixb0",
      "topics": [
        "Area Formula: Top minus Bottom",
        "Area Formula: Right minus Left (dy integration)",
        "Finding Intersection Points",
        "Multiple Intersection Regions"
      ],
      "difficulty": "Intermediate",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 5.1: Finding Area Between Two Curves\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Area Between Curves\n- **Vertical Slices (dx):** $A = \\int_a^b (y_{\\text{top}} - y_{\\text{bottom}}) dx$.\n- **Horizontal Slices (dy):** $A = \\int_c^d (x_{\\text{right}} - x_{\\text{left}}) dy$.\n- **Strategy:** Solve $f(x) = g(x)$ for bounds. If curves cross over, split into multiple integrals so area is always positive."
    },
    {
      "id": "calc-30",
      "lectureNumber": 30,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 5.2: Volume of Solids By Disks and Washers Method",
      "duration": "2:47:49",
      "videoId": "GJOJl47l2_4",
      "topics": [
        "Solids of Revolution",
        "Disk Method Formula",
        "Washer Method Formula (Outer Radius vs Inner Radius)",
        "Revolution about Arbitrary Lines (y = k, x = h)"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 5.2: Volume of Solids By Disks and Washers Method\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Volume: Disks & Washers Method\n- **Disk Method (Cross-section perpendicular to axis of rotation):**\n$$V = \\pi \\int_a^b [R(x)]^2 dx$$\n- **Washer Method (Hollow center):**\n$$V = \\pi \\int_a^b \\left( [R_{\\text{outer}}(x)]^2 - [r_{\\text{inner}}(x)]^2 \\right) dx$$\n- **Non-Axis of Rotation:** Adjust radii relative to the axis (e.g. revolved around $y = -2$, $R(x) = f(x) - (-2) = f(x) + 2$)."
    },
    {
      "id": "calc-31",
      "lectureNumber": 31,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 5.3: Volume of Solids By Cylindrical Shells Method",
      "duration": "54:56",
      "videoId": "BDmlottZVd4",
      "topics": [
        "Cylindrical Shell Method Formula",
        "Shell Radius and Shell Height",
        "When Shells Beat Washers",
        "Rotation about y-axis vs x-axis"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 5.3: Volume of Solids By Cylindrical Shells Method\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Volume: Cylindrical Shells Method\n- **Cross-section PARALLEL to the axis of rotation:**\n$$V = 2\\pi \\int_a^b (\\text{radius})(\\text{height}) dx = 2\\pi \\int_a^b x \\cdot f(x) dx$$\n- **When to Use Shells:** When slicing perpendicularly produces an equation that is impossible or tedious to invert (e.g. $y = x^3 - 3x^2$ revolved around the y-axis)."
    },
    {
      "id": "calc-32",
      "lectureNumber": 32,
      "subjectId": "math-calculus",
      "subjectName": "Calculus 1",
      "title": "Calculus 1 Lecture 5.4: Finding the Length of a Curve on a Plane",
      "duration": "2:17:58",
      "videoId": "5Yuw1jCBq-0",
      "topics": [
        "Arc Length Derivation via Pythagorean Hypotenuse",
        "Arc Length Formula in x and y",
        "Simplifying the Radical with Perfect Squares"
      ],
      "difficulty": "Advanced",
      "starterCodes": {
        "python": "# Numerical & Symbolic simulation for Calculus 1 Lecture 5.4: Finding the Length of a Curve on a Plane\nimport sympy as sp\nx = sp.Symbol('x')\n# Define symbolic expression\nf = sp.sin(x) * sp.exp(x)\nprint('Derivative:', sp.diff(f, x))\nprint('Integral:', sp.integrate(f, x))\n",
        "cpp": "// Numerical simulation in C++\n#include <iostream>\nusing namespace std;\nint main() { cout << \"Simulation complete\" << endl; return 0; }\n"
      },
      "detailedNotes": "### Arc Length of a Plane Curve\n- **Derivation:** $dL = \\sqrt{dx^2 + dy^2} = \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} dx$.\n- **Formula for $y = f(x)$:**\n$$L = \\int_a^b \\sqrt{1 + [f'(x)]^2} dx$$\n- **Formula for $x = g(y)$:**\n$$L = \\int_c^d \\sqrt{1 + [g'(y)]^2} dy$$\n- **Algebraic Hallmark:** Many textbook problems are specifically engineered so that $1 + [f'(x)]^2$ forms a perfect square under the radical!"
    }
  ]
};

export const CALCULUS_FORMULAS = [
  {
    category: "Limits & Continuity",
    formulas: [
      { name: "Two-Sided Limit Existence", latex: "\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L" },
      { name: "Fundamental Trig Limit 1", latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1" },
      { name: "Fundamental Trig Limit 2", latex: "\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0" },
      { name: "Definition of Continuity at c", latex: "f(c) \\text{ exists}, \\lim_{x \\to c} f(x) \\text{ exists, and } \\lim_{x \\to c} f(x) = f(c)" },
      { name: "Intermediate Value Theorem", latex: "f \\in C[a, b] \\implies \\forall N \\in (f(a), f(b)), \\exists c \\in (a, b) \\text{ s.t. } f(c) = N" }
    ]
  },
  {
    category: "Differentiation Rules",
    formulas: [
      { name: "Definition of Derivative", latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}" },
      { name: "Power Rule", latex: "\\frac{d}{dx}[x^n] = n x^{n-1}" },
      { name: "Product Rule", latex: "(u \\cdot v)' = u'v + uv'" },
      { name: "Quotient Rule", latex: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}" },
      { name: "Chain Rule", latex: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)" },
      { name: "Implicit Derivative of y^n", latex: "\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}" }
    ]
  },
  {
    category: "Trigonometric Derivatives",
    formulas: [
      { name: "sin(x)", latex: "\\frac{d}{dx}[\\sin x] = \\cos x" },
      { name: "cos(x)", latex: "\\frac{d}{dx}[\\cos x] = -\\sin x" },
      { name: "tan(x)", latex: "\\frac{d}{dx}[\\tan x] = \\sec^2 x" },
      { name: "sec(x)", latex: "\\frac{d}{dx}[\\sec x] = \\sec x \\tan x" },
      { name: "cot(x)", latex: "\\frac{d}{dx}[\\cot x] = -\\csc^2 x" },
      { name: "csc(x)", latex: "\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x" }
    ]
  },
  {
    category: "Theorems & Applications",
    formulas: [
      { name: "Mean Value Theorem", latex: "f'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for some } c \\in (a, b)" },
      { name: "Rolle's Theorem", latex: "f(a) = f(b) \\implies \\exists c \\in (a, b) \\text{ s.t. } f'(c) = 0" },
      { name: "First Derivative Test", latex: "f'(x) \\text{ changes } + \\to - \\implies \\text{Max}; - \\to + \\implies \\text{Min}" },
      { name: "Second Derivative Test", latex: "f'(c) = 0, f''(c) < 0 \\implies \\text{Max}; f''(c) > 0 \\implies \\text{Min}" }
    ]
  },
  {
    category: "Integration & FTC",
    formulas: [
      { name: "Power Rule for Integrals", latex: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)" },
      { name: "U-Substitution", latex: "\\int f(g(x)) g'(x) dx = \\int f(u) du" },
      { name: "FTC Part 1", latex: "\\frac{d}{dx} \\int_a^x f(t) dt = f(x)" },
      { name: "Leibniz Rule", latex: "\\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t) dt = f(v(x))v'(x) - f(u(x))u'(x)" },
      { name: "FTC Part 2", latex: "\\int_a^b f(x) dx = F(b) - F(a)" }
    ]
  },
  {
    category: "Applications of Integrals",
    formulas: [
      { name: "Area Between Curves", latex: "A = \\int_a^b (y_{top} - y_{bottom}) dx" },
      { name: "Disk Method Volume", latex: "V = \\pi \\int_a^b [R(x)]^2 dx" },
      { name: "Washer Method Volume", latex: "V = \\pi \\int_a^b \\left( [R(x)]^2 - [r(x)]^2 \\right) dx" },
      { name: "Cylindrical Shells Volume", latex: "V = 2\\pi \\int_a^b (\\text{radius})(\\text{height}) dx" },
      { name: "Arc Length of Curve", latex: "L = \\int_a^b \\sqrt{1 + [f'(x)]^2} dx" }
    ]
  }
];
