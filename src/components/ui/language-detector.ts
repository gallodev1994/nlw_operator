export const SUPPORTED_LANGUAGES = [
  { id: "typescript", name: "TypeScript", aliases: ["ts"] },
  { id: "javascript", name: "JavaScript", aliases: ["js"] },
  { id: "python", name: "Python", aliases: ["py"] },
  { id: "go", name: "Go", aliases: ["golang"] },
  { id: "rust", name: "Rust", aliases: ["rs"] },
  { id: "java", name: "Java", aliases: [] },
  { id: "cpp", name: "C++", aliases: ["c++"] },
  { id: "html", name: "HTML", aliases: [] },
  { id: "css", name: "CSS", aliases: [] },
  { id: "json", name: "JSON", aliases: [] },
  { id: "sql", name: "SQL", aliases: [] },
  { id: "ruby", name: "Ruby", aliases: ["rb"] },
  { id: "php", name: "PHP", aliases: [] },
  { id: "swift", name: "Swift", aliases: [] },
  { id: "kotlin", name: "Kotlin", aliases: ["kt"] },
  { id: "markdown", name: "Markdown", aliases: ["md"] },
  { id: "yaml", name: "YAML", aliases: ["yml"] },
  { id: "shell", name: "Shell", aliases: ["bash", "sh", "zsh"] },
  { id: "dockerfile", name: "Dockerfile", aliases: ["docker"] },
  { id: "csharp", name: "C#", aliases: ["cs", "c#"] },
  { id: "plaintext", name: "Plain Text", aliases: ["text", "txt"] },
] as const;

export type LanguageId = (typeof SUPPORTED_LANGUAGES)[number]["id"];

export const languageMap: Record<string, LanguageId> = {};
SUPPORTED_LANGUAGES.forEach((lang) => {
  languageMap[lang.id] = lang.id;
  lang.aliases.forEach((alias) => {
    languageMap[alias] = lang.id;
  });
});

const PATTERNS: Array<{ pattern: RegExp; language: LanguageId }> = [
  { pattern: /^import\s+.*\s+from\s+['"]/, language: "typescript" },
  {
    pattern: /^export\s+(default\s+)?(function|class|const)/,
    language: "typescript",
  },
  { pattern: /^interface\s+\w+/m, language: "typescript" },
  { pattern: /^type\s+\w+\s*=/m, language: "typescript" },
  {
    pattern: /:\s*(string|number|boolean|any|void|never)\s*[;=)]/m,
    language: "typescript",
  },
  { pattern: /<\w+>/m, language: "typescript" },
  { pattern: /const\s+\w+\s*=\s*\(.*\)\s*=>/m, language: "typescript" },
  { pattern: /async\s+function/m, language: "typescript" },
  { pattern: /function\s+\w+\s*\([^)]*\)\s*[:{]/m, language: "typescript" },

  { pattern: /^import\s+['"][^'"]+['"]/m, language: "javascript" },
  { pattern: /^const\s+\w+\s*=\s*require/m, language: "javascript" },
  { pattern: /^module\.exports/m, language: "javascript" },
  { pattern: /^export\s+(default\s+)?/m, language: "javascript" },
  { pattern: /console\.(log|error|warn)/m, language: "javascript" },
  { pattern: /document\.\w+/m, language: "javascript" },
  { pattern: /window\.\w+/m, language: "javascript" },

  { pattern: /^def\s+\w+\s*\(/m, language: "python" },
  { pattern: /^class\s+\w+.*:/m, language: "python" },
  { pattern: /^import\s+\w+$/m, language: "python" },
  { pattern: /^from\s+\w+\s+import/m, language: "python" },
  { pattern: /print\s*\(/m, language: "python" },
  { pattern: /if\s+__name__\s*==\s*['"]__main__['"]/m, language: "python" },
  { pattern: /self\.\w+/m, language: "python" },
  { pattern: /:\s*$/m, language: "python" },

  { pattern: /^package\s+main/m, language: "go" },
  { pattern: /^import\s+\(/m, language: "go" },
  { pattern: /^func\s+(\(\w+\s+\*?\w+\)\s+)?\w+\s*\(/m, language: "go" },
  { pattern: /fmt\.(Print|Sprintf|Errorf)/m, language: "go" },
  { pattern: /:=\s*/m, language: "go" },
  { pattern: /^func\s+main\s*\(\)/m, language: "go" },

  { pattern: /^fn\s+\w+/m, language: "rust" },
  { pattern: /^use\s+\w+::/m, language: "rust" },
  { pattern: /^impl\s+\w+/m, language: "rust" },
  { pattern: /^struct\s+\w+/m, language: "rust" },
  { pattern: /^enum\s+\w+/m, language: "rust" },
  { pattern: /let\s+mut\s+/m, language: "rust" },
  { pattern: /println!\s*\(/m, language: "rust" },
  { pattern: /::\w+/m, language: "rust" },

  { pattern: /^public\s+class\s+\w+/m, language: "java" },
  { pattern: /^private\s+(static\s+)?/m, language: "java" },
  { pattern: /System\.out\.print/m, language: "java" },
  { pattern: /public\s+static\s+void\s+main/m, language: "java" },
  { pattern: /import\s+java\./m, language: "java" },

  { pattern: /^#include\s*</m, language: "cpp" },
  { pattern: /^using\s+namespace\s+std/m, language: "cpp" },
  { pattern: /std::\w+/m, language: "cpp" },
  { pattern: /cout\s*<</m, language: "cpp" },
  { pattern: /cin\s*>>/m, language: "cpp" },
  { pattern: /nullptr/m, language: "cpp" },

  { pattern: /^<!DOCTYPE\s+html>/im, language: "html" },
  { pattern: /<html[^>]*>/im, language: "html" },
  { pattern: /<head[^>]*>/im, language: "html" },
  { pattern: /<body[^>]*>/im, language: "html" },
  { pattern: /<div[^>]*>/im, language: "html" },
  { pattern: /<\/\w+>/m, language: "html" },

  { pattern: /^[\w-]+:\s*[\w#.]+;/m, language: "css" },
  { pattern: /@media\s+/m, language: "css" },
  { pattern: /@import\s+/m, language: "css" },
  { pattern: /\{\s*[\w-]+\s*:/m, language: "css" },
  { pattern: /\.\w+\s*\{/m, language: "css" },
  { pattern: /#\w+\s*\{/m, language: "css" },

  { pattern: /^\s*\{[\s\S]*"[\w]+":\s*/m, language: "json" },
  { pattern: /^\s*\[[\s\S]*\{/m, language: "json" },
  { pattern: /"[\w]+":\s*[[{]/m, language: "json" },

  {
    pattern: /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/im,
    language: "sql",
  },
  { pattern: /^\s*FROM\s+\w+/im, language: "sql" },
  { pattern: /^\s*WHERE\s+\w+/im, language: "sql" },
  { pattern: /\s+JOIN\s+\w+\s+ON/im, language: "sql" },

  { pattern: /^require\s+['"][^'"]+['"]/m, language: "ruby" },
  { pattern: /^class\s+\w+\s*</m, language: "ruby" },
  { pattern: /^def\s+\w+/m, language: "ruby" },
  { pattern: /^end$/m, language: "ruby" },
  { pattern: /puts\s+/m, language: "ruby" },

  { pattern: /^\s*<\?php/m, language: "php" },
  { pattern: /\$\w+\s*=/m, language: "php" },
  { pattern: /function\s+\w+\s*\(/m, language: "php" },
  { pattern: /->\w+/m, language: "php" },

  { pattern: /^import\s+Foundation/m, language: "swift" },
  { pattern: /^import\s+UIKit/m, language: "swift" },
  { pattern: /^func\s+\w+\s*\(/m, language: "swift" },
  { pattern: /var\s+\w+:\s*\w+/m, language: "swift" },
  { pattern: /let\s+\w+:\s*\w+/m, language: "swift" },
  { pattern: /guard\s+let/m, language: "swift" },
  { pattern: /if\s+let\s+/m, language: "swift" },

  { pattern: /^package\s+\w+/m, language: "kotlin" },
  { pattern: /^fun\s+\w+/m, language: "kotlin" },
  { pattern: /val\s+\w+\s*=/m, language: "kotlin" },
  { pattern: /var\s+\w+\s*=/m, language: "kotlin" },
  { pattern: /println\s*\(/m, language: "kotlin" },

  { pattern: /^#{1,6}\s+/m, language: "markdown" },
  { pattern: /^\[[\w\s]+\]\(http/m, language: "markdown" },
  { pattern: /```\w*/m, language: "markdown" },
  { pattern: /\*\w+\*/m, language: "markdown" },

  { pattern: /^[\w-]+:\s+/m, language: "yaml" },
  { pattern: /^-\s+\w+/m, language: "yaml" },

  { pattern: /^#!\/bin\/(bash|sh|zsh)/m, language: "shell" },
  { pattern: /^#!/m, language: "shell" },
  { pattern: /\$\(\w+\)/m, language: "shell" },
  { pattern: /\$\w+/m, language: "shell" },
  { pattern: /echo\s+/m, language: "shell" },
  { pattern: /if\s+\[\s+/m, language: "shell" },

  { pattern: /^FROM\s+\w+/m, language: "dockerfile" },
  { pattern: /^RUN\s+/m, language: "dockerfile" },
  { pattern: /^CMD\s+/m, language: "dockerfile" },
  { pattern: /^COPY\s+/m, language: "dockerfile" },
  { pattern: /^WORKDIR\s+/m, language: "dockerfile" },
  { pattern: /^EXPOSE\s+/m, language: "dockerfile" },

  { pattern: /^using\s+System/m, language: "csharp" },
  { pattern: /^namespace\s+\w+/m, language: "csharp" },
  {
    pattern: /^(public|private|protected|internal)\s+(class|interface|struct)/m,
    language: "csharp",
  },
  { pattern: /Console\.Write/m, language: "csharp" },
  { pattern: /async\s+Task/m, language: "csharp" },
];

export function detectLanguage(code: string): LanguageId {
  if (!code || code.trim().length < 10) {
    return "typescript";
  }

  const scores: Record<LanguageId, number> = {} as Record<LanguageId, number>;
  SUPPORTED_LANGUAGES.forEach((lang) => {
    scores[lang.id] = 0;
  });

  for (const { pattern, language } of PATTERNS) {
    const matches = code.match(pattern);
    if (matches) {
      scores[language] += matches.length * 5;
    }
  }

  const lines = code.split("\n");
  const codeLength = code.length;

  if (code.includes("{")) {
    scores.javascript += code.split("{").length * 0.1;
    scores.typescript += code.split("{").length * 0.1;
  }
  if (code.includes("(")) {
    scores.javascript += code.split("(").length * 0.1;
    scores.typescript += code.split("(").length * 0.1;
  }
  if (code.includes("=")) {
    scores.javascript += code.split("=").length * 0.05;
    scores.typescript += code.split("=").length * 0.05;
  }

  let maxScore = 0;
  let detectedLanguage: LanguageId = "typescript";

  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLanguage = lang as LanguageId;
    }
  }

  if (maxScore === 0) {
    if (codeLength < 50) {
      return "javascript";
    }
    return "plaintext";
  }

  return detectedLanguage;
}

export function getLanguageName(id: LanguageId): string {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === id);
  console.log(lang);
  return lang?.name ?? id;
}
