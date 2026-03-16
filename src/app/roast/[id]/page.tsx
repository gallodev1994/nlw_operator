import { AnalysisCard } from "@/components/ui/analysis-card";

function getScoreGradient(score: number): string {
  if (score < 40) {
    return "from-red-500 to-red-700";
  } else if (score < 70) {
    return "from-yellow-500 to-yellow-700";
  }
  return "from-green-500 to-green-700";
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const score = 85;
  const language = "TypeScript";
  const lineCount = 4;
  const gradient = getScoreGradient(score);

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
            <span className="text-green-600 mr-2">{">"}</span>Resultado
          </h1>
        </div>

        <div className="mb-8">
          <div
            className={`rounded-lg border border-gray-700 bg-gradient-to-r ${gradient} p-6 shadow-lg`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 rounded-full p-4">
                <span className="text-4xl font-bold text-white">{score}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Score Total
                </h3>
                <p className="text-white/80 text-sm">
                  Avaliação geral do código
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-gray-400 text-sm">Roast ID</span>
              <p className="text-white font-mono">{id}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Linguagem</span>
              <p className="text-white">{language}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Linhas</span>
              <p className="text-white">{lineCount} linhas</p>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm">your_submision</span>
            <div className="mt-2 bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                {`function badCode() {
  var x = 1;
  return x + 2;
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="text-green-600 mr-2">{">"}</span>detailed_analysis
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
      </div>
    </main>
  );
}
