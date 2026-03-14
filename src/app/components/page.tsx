import ComponentsClient from "./ComponentsClient";
import { CodeBlock } from "@/components/ui/code-block";

export default function Page() {
  return (
    <div className="space-y-16">
      <ComponentsClient />
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
