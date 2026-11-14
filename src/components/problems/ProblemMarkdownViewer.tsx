import React from 'react';

interface ProblemMarkdownViewerProps {
  content: string;
}

export const ProblemMarkdownViewer: React.FC<ProblemMarkdownViewerProps> = ({ content }) => {
  if (!content) return null;

  // Split content by lines and parse markdown elements
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let blockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block start / end
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div
            key={`code-${blockKey++}`}
            className="my-3 p-3.5 bg-slate-950/90 border border-slate-800 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre shadow-inner"
          >
            {codeBlockContent.join('\n')}
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Heading 2 (##)
    if (line.startsWith('## ')) {
      elements.push(
        <h3
          key={`h2-${blockKey++}`}
          className="text-base font-bold text-amber-300 mt-5 mb-2.5 flex items-center gap-2 border-b border-slate-800/80 pb-1.5"
        >
          <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
          {line.replace('## ', '')}
        </h3>
      );
      continue;
    }

    // Heading 3 (###)
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${blockKey++}`} className="text-sm font-semibold text-slate-200 mt-3 mb-1.5">
          {line.replace('### ', '')}
        </h4>
      );
      continue;
    }

    // Unordered List (- or *)
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().slice(2);
      elements.push(
        <li key={`li-${blockKey++}`} className="text-xs text-slate-300 ml-4 list-disc my-1 leading-relaxed">
          {renderFormattedText(itemText)}
        </li>
      );
      continue;
    }

    // Example header like **Example 1:**
    if (line.trim().startsWith('**Example') || line.trim().startsWith('**Note:')) {
      elements.push(
        <div key={`ex-${blockKey++}`} className="text-xs font-semibold text-sky-300 mt-3 mb-1">
          {renderFormattedText(line)}
        </div>
      );
      continue;
    }

    // Standard paragraph or empty line
    if (line.trim() === '') {
      continue;
    }

    elements.push(
      <p key={`p-${blockKey++}`} className="text-xs text-slate-300 leading-relaxed my-2">
        {renderFormattedText(line)}
      </p>
    );
  }

  // If code block remains open
  if (inCodeBlock && codeBlockContent.length > 0) {
    elements.push(
      <div
        key={`code-${blockKey++}`}
        className="my-3 p-3.5 bg-slate-950/90 border border-slate-800 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre shadow-inner"
      >
        {codeBlockContent.join('\n')}
      </div>
    );
  }

  return <div className="space-y-1 text-slate-300 text-xs">{elements}</div>;
};

/**
 * Parses inline **bold**, `code`, and plain text.
 */
function renderFormattedText(text: string): React.ReactNode {
  // Regex splitting by bold and backticks
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-800/80 text-amber-300 font-mono text-[11px] border border-slate-700/60"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
