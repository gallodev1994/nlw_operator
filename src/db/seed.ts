import { faker } from "@faker-js/faker";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://devroast:devroast@localhost:5432/devroast",
});

const verdictEnum = [
  "need_serious_help",
  "rough_around_edges",
  "decent_code",
  "solid_work",
  "exceptional",
];
const severityEnum = ["critical", "warning", "good"];

const roastQuotes = [
  "This code is so bad it makes me want to cry",
  "I've seen better code in a fortune cookie",
  "This is why we can't have nice things",
  "Please, for the love of all that is holy, refactor this",
  "The indentation is a crime against humanity",
  "Even my cat could write better code",
  "This deserves its own place in the hall of shame",
  "Stack Overflow would reject this question",
  "I'm in pain looking at this",
  "This is a masterclass in how NOT to code",
  "Your variable names are a personal attack on me",
  "This function has more bugs than a summer picnic",
  "I've seen cleaner code in a garbage disposal",
  "This is giving me existential crisis as a developer",
  "Please submit this to a museum of bad code",
];

const suggestedFixes = [
  "const betterCode = refactor(this);",
  "// TODO: Rewrite this mess properly",
  "await this.rewriteWithAI();",
  "git revert HEAD --force",
  "// Please, use proper naming conventions",
  "return null; // Just give up",
  "// This needs serious attention ASAP",
  "// Rewrite with proper error handling",
  "// Add type annotations please",
  "// Split this into smaller functions",
];

const codeSamples = {
  javascript: [
    `const x = 10;
function foo() {
  return x + 1;
}
console.log(foo());`,
    `let data = [];
for(let i=0; i<100; i++) {
  data.push(i);
}
console.log(data);`,
    `function add(a,b) { return a+b }
console.log(add(1,2))`,
    `var foo = "bar";
var baz = foo.toUpperCase();
console.log(baz);`,
  ],
  typescript: [
    `interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = { name: "John", age: 25 };`,
    `type Result<T> = { success: true; data: T } | { success: false; error: string };

function parseResult(input: string): Result<number> {
  const num = parseInt(input);
  if (isNaN(num)) return { success: false, error: "Invalid" };
  return { success: true, data: num };
}`,
    `const greet = (name: string): string => \`Hello, \${name}!\`;`,
    `enum Status {
  Pending = "pending",
  Active = "active",
  Done = "done"
}`,
  ],
  python: [
    `def hello():
    print("world")
    return 42`,
    `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    `data = [x for x in range(10) if x % 2 == 0]`,
    `class User:
    def __init__(self, name):
        self.name = name`,
  ],
  rust: [
    `fn main() {
    let x = 10;
    println!("{}", x);
}`,
    `fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
    `let mut counter = 0;
counter += 1;`,
    `struct User {
    name: String,
    age: u32,
}`,
  ],
  go: [
    `package main

import "fmt"

func main() {
    fmt.Println("Hello")
}`,
    `func add(a, b int) int {
    return a + b
}`,
    `var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
}()
wg.Wait()`,
  ],
  java: [
    `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    `public int add(int a, int b) {
    return a + b;
}`,
    `List<String> names = new ArrayList<>();
names.add("John");`,
  ],
  cpp: [
    `#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    return 0;
}`,
    `int add(int a, int b) {
    return a + b;
}`,
    `vector<int> nums = {1, 2, 3, 4, 5};`,
  ],
};

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedUsers(count: number): Promise<number[]> {
  console.log(`Seeding ${count} users...`);
  const ids: number[] = [];

  for (let i = 0; i < count; i++) {
    const anonymousId = faker.string.uuid();
    const displayName = faker.internet.username();
    const avatarUrl = faker.image.avatar();

    const result = await pool.query(
      `INSERT INTO users (anonymous_id, display_name, avatar_url, is_anonymous, created_at, updated_at)
       VALUES ($1, $2, $3, true, NOW(), NOW())
       RETURNING id`,
      [anonymousId, displayName, avatarUrl],
    );
    ids.push(result.rows[0].id);
  }

  console.log(`Created ${ids.length} users`);
  return ids;
}

async function seedSessions(
  userIds: number[],
  countPerUser: number,
): Promise<void> {
  console.log("Seeding sessions...");

  for (const userId of userIds) {
    for (let i = 0; i < countPerUser; i++) {
      const sessionId = faker.string.alphanumeric(32);
      const expiresAt = faker.date.future({ years: 1 });

      await pool.query(
        `INSERT INTO sessions (id, user_id, expires_at, ip_address, user_agent, is_valid, created_at)
         VALUES ($1, $2, $3, $4, $5, true, NOW())`,
        [
          sessionId,
          userId,
          expiresAt,
          faker.internet.ip(),
          faker.internet.userAgent(),
        ],
      );
    }
  }

  console.log("Created sessions");
}

async function seedRoasts(userIds: number[], count: number): Promise<number[]> {
  console.log(`Seeding ${count} roasts...`);
  const ids: number[] = [];
  const languages = Object.keys(codeSamples);

  for (let i = 0; i < count; i++) {
    const userId = randomElement(userIds);
    const lang = randomElement(languages);
    const sample = randomElement(codeSamples[lang as keyof typeof codeSamples]);
    const lineCount = sample.split("\n").length;
    const roastMode = Math.random() > 0.3;
    const score = randomInt(5, 95);
    const verdict =
      score <= 20
        ? "need_serious_help"
        : score <= 40
          ? "rough_around_edges"
          : score <= 60
            ? "decent_code"
            : score <= 80
              ? "solid_work"
              : "exceptional";
    const roastQuote = randomElement(roastQuotes);
    const suggestedFix = randomElement(suggestedFixes);
    const modelUsed = randomElement([
      "gpt-4o",
      "claude-opus-4-20250514",
      "gemini-pro",
      "gpt-4-turbo",
    ]);
    const tokensUsed = randomInt(500, 3000);
    const processingTime = randomInt(1000, 5000);
    const isPublic = Math.random() > 0.2;
    const viewCount = randomInt(0, 500);
    const daysAgo = randomInt(1, 30);

    const result = await pool.query(
      `INSERT INTO roasts (user_id, code, language, line_count, roast_mode, score, verdict, roast_quote, suggested_fix, model_used, tokens_used, processing_time, is_public, view_count, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW() - INTERVAL '${daysAgo} days')
       RETURNING id`,
      [
        userId,
        sample,
        lang,
        lineCount,
        roastMode,
        score,
        verdict,
        roastQuote,
        suggestedFix,
        modelUsed,
        tokensUsed,
        processingTime,
        isPublic,
        viewCount,
      ],
    );
    ids.push(result.rows[0].id);
  }

  console.log(`Created ${ids.length} roasts`);
  return ids;
}

async function seedRoastScores(roastIds: number[]): Promise<void> {
  console.log("Seeding roast scores...");

  const categories = [
    "codeQuality",
    "security",
    "performance",
    "readability",
    "bestPractices",
  ] as const;

  for (const roastId of roastIds) {
    const overallScore = randomInt(0, 100);
    const issues = [];

    const issueCount = randomInt(1, 5);
    for (let i = 0; i < issueCount; i++) {
      issues.push({
        severity: randomElement(severityEnum),
        category: randomElement([
          "security",
          "performance",
          "style",
          "best-practice",
          "error",
        ]),
        line: randomInt(1, 50),
        message: faker.lorem.sentence(),
        suggestion: faker.lorem.sentence(),
      });
    }

    await pool.query(
      `INSERT INTO roast_scores (roast_id, overall_score, code_quality, code_quality_severity, security, security_severity, performance, performance_severity, readability, readability_severity, best_practices, best_practices_severity, issues, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())`,
      [
        roastId,
        overallScore,
        randomInt(0, 100),
        randomElement(severityEnum),
        randomInt(0, 100),
        randomElement(severityEnum),
        randomInt(0, 100),
        randomElement(severityEnum),
        randomInt(0, 100),
        randomElement(severityEnum),
        randomInt(0, 100),
        randomElement(severityEnum),
        JSON.stringify(issues),
      ],
    );
  }

  console.log("Created roast scores");
}

async function seedLeaderboard(): Promise<void> {
  console.log("Seeding leaderboard...");

  const scores = await pool.query(
    "SELECT id, score FROM roasts WHERE is_public = true",
  );
  const sortedByScore = [...scores.rows].sort((a, b) => a.score - b.score);

  for (let i = 0; i < sortedByScore.length; i++) {
    const daysAgo = randomInt(1, 30);
    await pool.query(
      `INSERT INTO leaderboard (roast_id, rank_type, rank, period, score, ranked_at, is_active)
       VALUES ($1, 'worst', $2, 'all_time', $3, NOW() - INTERVAL '${daysAgo} days', true)`,
      [sortedByScore[i].id, i + 1, sortedByScore[i].score],
    );
  }

  for (let i = 0; i < sortedByScore.length; i++) {
    const daysAgo = randomInt(1, 30);
    await pool.query(
      `INSERT INTO leaderboard (roast_id, rank_type, rank, period, score, ranked_at, is_active)
       VALUES ($1, 'best', $2, 'all_time', $3, NOW() - INTERVAL '${daysAgo} days', true)`,
      [
        sortedByScore[sortedByScore.length - 1 - i].id,
        i + 1,
        sortedByScore[sortedByScore.length - 1 - i].score,
      ],
    );
  }

  const viewCounts = await pool.query(
    "SELECT id, view_count FROM roasts WHERE is_public = true",
  );
  const sortedByViews = [...viewCounts.rows].sort(
    (a, b) => b.view_count - a.view_count,
  );

  for (let i = 0; i < Math.min(sortedByViews.length, 20); i++) {
    const daysAgo = randomInt(1, 30);
    await pool.query(
      `INSERT INTO leaderboard (roast_id, rank_type, rank, period, score, ranked_at, is_active)
       VALUES ($1, 'most_roasted', $2, 'all_time', $3, NOW() - INTERVAL '${daysAgo} days', true)`,
      [sortedByViews[i].id, i + 1, sortedByViews[i].view_count],
    );
  }

  const recents = await pool.query(
    "SELECT id FROM roasts WHERE is_public = true ORDER BY created_at DESC LIMIT 20",
  );
  for (let i = 0; i < recents.rows.length; i++) {
    await pool.query(
      `INSERT INTO leaderboard (roast_id, rank_type, rank, period, score, ranked_at, is_active)
       VALUES ($1, 'recent', $2, 'all_time', $3, NOW(), true)`,
      [recents.rows[i].id, i + 1, 100 - i * 5],
    );
  }

  console.log("Created leaderboard entries");
}

async function seedAiConfigs(): Promise<void> {
  console.log("Seeding AI configs...");

  const configs = [
    { name: "GPT-4o", provider: "openai", model: "gpt-4o", isDefault: true },
    {
      name: "Claude Opus 4",
      provider: "anthropic",
      model: "claude-opus-4-20250514",
      isDefault: false,
    },
    {
      name: "Gemini Pro",
      provider: "google",
      model: "gemini-pro",
      isDefault: false,
    },
    {
      name: "AI Gateway",
      provider: "ai-gateway",
      model: "gpt-4o",
      isDefault: false,
    },
  ];

  for (const config of configs) {
    await pool.query(
      `INSERT INTO ai_configs (name, provider, model, max_tokens, temperature, is_active, is_default, created_at, updated_at)
       VALUES ($1, $2, $3, 4096, 1, true, $4, NOW(), NOW())`,
      [config.name, config.provider, config.model, config.isDefault],
    );
  }

  console.log("Created AI configs");
}

async function seedAnalytics(): Promise<void> {
  console.log("Seeding analytics...");

  const totalRoasts = randomInt(1000, 5000);
  const totalUsers = randomInt(100, 1000);
  const totalTokens = randomInt(100000, 1000000);
  const averageScore = randomInt(30, 70);

  await pool.query(
    `INSERT INTO analytics (date, total_roasts, total_users, total_tokens_used, average_score, created_at)
     VALUES (NOW(), $1, $2, $3, $4, NOW())`,
    [totalRoasts, totalUsers, totalTokens, averageScore],
  );

  console.log("Created analytics");
}

async function main() {
  console.log("Starting seed...\n");

  try {
    await seedAiConfigs();

    const userIds = await seedUsers(50);
    await seedSessions(userIds, 1);

    const roastIds = await seedRoasts(userIds, 100);
    await seedRoastScores(roastIds);
    await seedLeaderboard();
    await seedAnalytics();

    console.log("\nSeed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

main();
