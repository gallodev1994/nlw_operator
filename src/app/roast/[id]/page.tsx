import Link from "next/link";
import { AnalysisCard } from "@/components/ui/analysis-card";
import { Button } from "@/components/ui/button";
import { SuggestedFix } from "@/components/ui/diff-block";
import { createCaller } from "@/lib/trpc";
import { createTRPCContext } from "@/server/trpc";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const caller = createCaller();

  const roast = await caller.roast.getById({ id: parseInt(id) });

  if (!roast) {
    return (
      <main className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            Roast não encontrado
          </h1>
          <Link href="/">
            <Button variant="outline" size="sm" className="mt-4">
              Voltar
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const analysisItems = [
    {
      type: "critical" as const,
      title: "Variáveis mutáveis",
      description:
        "Uso de 'var' permite reatribuição, prefira 'const' ou 'let'",
    },
    {
      type: "warning" as const,
      title: "Sem tipagem",
      description: "Adicione tipos TypeScript para melhor manutenibilidade",
    },
    {
      type: "ok" as const,
      title: "Estrutura básica",
      description: "Função está bem estruturada e legível",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-green-600 mr-2">{"//"}</span>Resultado
          </h1>
        </div>

        <div className="mb-8">
          <AnalysisCard
            title="Score Total"
            score={roast.score}
            variant="ghost"
            label="Pontos"
            description="Avaliação geral do código"
            language={roast.language}
            lineCount={roast.lineCount}
          />
        </div>

        <h2 className="text-white text-2xl mb-4">
          <span className="text-green-600 mr-2">{"//"}</span>your_submision
        </h2>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-gray-400 text-sm">Roast ID</span>
              <p className="text-white font-mono">{roast.id}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Verdict</span>
              <p className="text-white font-mono">{roast.verdict}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="mt-2 bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                {roast.code}
              </pre>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="text-green-600 mr-2">{"//"}</span>detailed_analysis
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {analysisItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 border ${
                  item.type === "critical"
                    ? "bg-red-900/20 border-red-700"
                    : item.type === "warning"
                      ? "bg-yellow-900/20 border-yellow-700"
                      : "bg-green-900/20 border-green-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium ${
                      item.type === "critical"
                        ? "text-red-400"
                        : item.type === "warning"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {item.type === "critical"
                      ? "🔴 critical"
                      : item.type === "warning"
                        ? "🟡 warning"
                        : "🟢 OK"}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {roast.suggestedFix && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-green-600 mr-2">{"//"}</span>suggested_fix
            </h2>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <pre className="text-green-400 text-sm">{roast.suggestedFix}</pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
