import Link from "next/link";
import type { BundledLanguage } from "shiki";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";

const leaderboardData: Array<{
  id: number;
  author: string;
  language: BundledLanguage;
  code: string;
}> = [
  {
    id: 1,
    author: "Maria Silva",
    language: "typescript",
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,
  },
  {
    id: 2,
    author: "João Santos",
    language: "javascript",
    code: `const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`,
  },
  {
    id: 3,
    author: "Ana Oliveira",
    language: "python",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  },
  {
    id: 4,
    author: "Pedro Costa",
    language: "go",
    code: `func worker(jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(jobs, results)
    }
}`,
  },
  {
    id: 5,
    author: "Lucas Lima",
    language: "rust",
    code: `fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    let avg = sum as f64 / numbers.len() as f64;
    println!("Sum: {}, Average: {}", sum, avg);
}`,
  },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-green-600 mr-2">{">"}</span>Leaderboard
          </h1>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="hover:text-black cursor-pointer"
            >
              ← Voltar
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {leaderboardData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">{item.author}</span>
                <span className="text-gray-400 text-sm">#{item.id}</span>
              </div>
              <CodeBlock code={item.code} language={item.language} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
