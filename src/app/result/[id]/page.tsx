export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-green-600 mr-2">{">"}</span>Resultado
          </h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="mb-6">
            <span className="text-gray-400 text-sm">Roast ID</span>
            <p className="text-white font-mono">{id}</p>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm">Score</span>
            <p className="text-4xl font-bold text-green-500 mt-1">85</p>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm">Código Analisado</span>
            <div className="mt-2 bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-300 text-sm overflow-x-auto">
                {`function badCode() {
  var x = 1;
  return x + 2;
}`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm">Feedback</span>
            <p className="text-white mt-1">
              Seu código está razoável, mas pode melhorar!
            </p>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm">Sugestões</span>
            <ul className="text-white mt-1 list-disc list-inside">
              <li>Use const/let em vez de var</li>
              <li>Adicione tipagem TypeScript</li>
              <li>Adicione comentários</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
