import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="px-10">
      <h1 className="mt-5 mb-5">Botões</h1>
      <div className="flex flex-row gap-5">
        <Button variant="primary">Clique aqui</Button>
        <Button variant="secondary">Clique aqui</Button>
        <Button variant="ghost"> Clique aqui</Button>
        <Button variant="outline"> Clique aqui</Button>
        <Button variant="destructive"> Clique aqui</Button>
      </div>
    </div>
  );
}
