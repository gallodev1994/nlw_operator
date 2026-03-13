import { AnalysisCard } from "@/components/ui/analysis-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import { Switch } from "@/components/ui/switch";

export default function Components() {
  return (
    <div className="px-10 py-8 space-y-16">
      <section>
        <h1 className="text-3xl font-bold mb-2">UI Components</h1>
        <p className="text-gray-500">
          Showcase of all available components and their variants.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Button</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Full Width</h3>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Switch</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2">
              <Switch size="sm" defaultChecked />
              <span className="text-sm">Small</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="md" defaultChecked />
              <span className="text-sm">Medium</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch size="lg" defaultChecked />
              <span className="text-sm">Large</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">States</h3>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">Off</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">On</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch disabled />
              <span className="text-sm">Disabled</span>
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Badge</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge size="sm" variant="success">
              Small
            </Badge>
            <Badge size="md" variant="success">
              Medium
            </Badge>
            <Badge size="lg" variant="success">
              Large
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Usage Examples</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Failed</Badge>
            <Badge variant="info">Processing</Badge>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Card</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Default Card</h3>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content. You can put any content here.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Outline Card</h3>
          <Card variant="outline" className="max-w-md">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>A card with outline style</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content with outline variant.</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ghost Card</h3>
          <Card variant="ghost" className="max-w-md">
            <CardHeader>
              <CardTitle>Ghost Card</CardTitle>
              <CardDescription>A card without border or shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Minimal style card content.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Score Ring</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sizes</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <ScoreRing score={75} size="sm" />
              <p className="text-xs text-gray-500 mt-2">Small</p>
            </div>
            <div className="text-center">
              <ScoreRing score={85} size="md" label="Score" />
              <p className="text-xs text-gray-500 mt-2">Medium</p>
            </div>
            <div className="text-center">
              <ScoreRing score={92} size="lg" label="Points" />
              <p className="text-xs text-gray-500 mt-2">Large</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Score Colors</h3>
          <div className="flex flex-wrap items-end gap-6">
            <div className="text-center">
              <ScoreRing score={95} label="Excellent" />
              <p className="text-xs text-gray-500 mt-2">≥ 80% Green</p>
            </div>
            <div className="text-center">
              <ScoreRing score={65} label="Good" />
              <p className="text-xs text-gray-500 mt-2">≥ 60% Blue</p>
            </div>
            <div className="text-center">
              <ScoreRing score={45} label="Warning" />
              <p className="text-xs text-gray-500 mt-2">≥ 40% Yellow</p>
            </div>
            <div className="text-center">
              <ScoreRing score={25} label="Critical" />
              <p className="text-xs text-gray-500 mt-2">&lt; 40% Red</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Analysis Card</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard
              title="Performance Score"
              score={92}
              label="Score"
              description="Overall application performance"
            />
            <AnalysisCard
              title="Code Quality"
              score={78}
              label="Quality"
              description="Code maintainability index"
            />
            <AnalysisCard
              title="Test Coverage"
              score={85}
              label="Coverage"
              description="Unit and integration tests"
            />
            <AnalysisCard
              title="Security Score"
              score={65}
              label="Security"
              description="Vulnerability assessment"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Variants</h3>
          <div className="space-y-4">
            <AnalysisCard
              title="Default Variant"
              score={88}
              label="Score"
              description="Standard card with border and shadow"
              variant="default"
            />
            <AnalysisCard
              title="Outline Variant"
              score={72}
              label="Score"
              description="Card with visible border"
              variant="outline"
            />
            <AnalysisCard
              title="Ghost Variant"
              score={95}
              label="Score"
              description="Minimal card without border or shadow"
              variant="ghost"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">CodeBlock</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">TypeScript</h3>
          <CodeBlock
            code={`import { Button } from "@/components/ui/button";

export function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  );
}`}
            language="typescript"
            filename="example.tsx"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">JavaScript</h3>
          <CodeBlock
            code={`function greeting(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome, \${name}!\`;
}

greeting("World");`}
            language="javascript"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">JSON</h3>
          <CodeBlock
            code={`{
  "name": "nlw_operator",
  "version": "0.1.0",
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3"
  }
}`}
            language="json"
            filename="package.json"
          />
        </div>
      </section>
    </div>
  );
}
