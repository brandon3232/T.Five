import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { JournalEntryCard } from "./JournalEntryCard";
import { uid } from "../../lib/utils";
import type { JournalEntry } from "../../types";

interface JournalProps {
  prompts: readonly string[];
  journal: JournalEntry[];
  setJournal: (
    journal: JournalEntry[] | ((prev: JournalEntry[]) => JournalEntry[])
  ) => void;
}

/**
 * Componente principal de Diario
 */
export function Journal({ prompts, journal, setJournal }: JournalProps) {
  const [text, setText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  const currentPrompt = prompts[promptIndex % prompts.length];

  const handleAddEntry = () => {
    if (!text.trim()) return;

    const entry: JournalEntry = {
      id: uid("jr"),
      type: "journal",
      createdAt: new Date().toISOString(),
      prompt: currentPrompt,
      text: text.trim(),
    };

    setJournal((prev) => [entry, ...prev]);
    setText("");
    setPromptIndex((prev) => prev + 1);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(journal, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tfive-journal-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!Array.isArray(data)) {
          throw new Error("Formato inválido");
        }
        setJournal(data);
        alert("Diario importado exitosamente");
      } catch (err) {
        alert(
          `No se pudo importar: ${
            err instanceof Error ? err.message : "Error desconocido"
          }`
        );
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Nueva entrada">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2 opacity-80">
              Pregunta de sondeo:
            </div>
            <blockquote className="text-sm border-l-2 border-zinc-900 dark:border-zinc-100 pl-4 py-2 italic opacity-90">
              {currentPrompt}
            </blockquote>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe con honestidad. No será evaluado ni compartido."
            rows={8}
          />

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleAddEntry} disabled={!text.trim()}>
              Guardar entrada
            </Button>
            <Button
              onClick={() => setPromptIndex((prev) => prev + 1)}
              variant="secondary"
            >
              Otra pregunta
            </Button>
          </div>

          <p className="text-xs opacity-60">
            💡 No hay respuestas correctas o incorrectas. Este es tu espacio
            privado para reflexionar.
          </p>
        </div>
      </Card>

      <Card
        title="Historial"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={handleExport} variant="ghost" size="sm">
              Exportar
            </Button>
            <label className="cursor-pointer">
              <span className="px-3 py-1.5 text-sm rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-block">
                Importar
              </span>
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={handleImport}
              />
            </label>
          </div>
        }
      >
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {journal.length === 0 && (
            <p className="text-sm opacity-70 text-center py-8">
              Aún no has escrito ninguna entrada.
              <br />
              Comienza respondiendo la pregunta de sondeo.
            </p>
          )}
          {journal.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </Card>
    </div>
  );
}
