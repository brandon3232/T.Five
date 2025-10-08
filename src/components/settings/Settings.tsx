import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import type { Theme, AppData } from "../../types";

interface SettingsProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onReset: () => void;
  data: Omit<AppData, "theme">;
  setData: (data: Partial<AppData>) => void;
}

/**
 * Componente de Ajustes / Configuración
 */
export function Settings({
  theme,
  setTheme,
  onReset,
  data,
  setData,
}: SettingsProps) {
  const handleExportAll = () => {
    const exportData: AppData = { ...data, theme };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tfive-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedData = JSON.parse(
          reader.result as string
        ) as Partial<AppData>;
        setData(importedData);
        alert("Datos importados exitosamente");
      } catch (err) {
        alert(
          `Error al importar: ${
            err instanceof Error ? err.message : "Desconocido"
          }`
        );
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-5">
      <Card title="Apariencia">
        <div className="space-y-5">
          <p className="text-sm opacity-70">
            Elige el tema que te resulte más cómodo para tus ojos y tu momento
            del día.
          </p>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
                className="w-4 h-4"
              />
              <span>☀️ Claro</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
                className="w-4 h-4"
              />
              <span>🌙 Oscuro</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={theme === "system"}
                onChange={() => setTheme("system")}
                className="w-4 h-4"
              />
              <span>💻 Sistema</span>
            </label>
          </div>
        </div>
      </Card>

      <Card title="Respaldo y datos">
        <div className="space-y-5">
          <p className="text-sm opacity-70">
            Exporta todos tus datos (playlists, diario, sesiones) para
            guardarlos de forma segura o importa un respaldo previo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportAll} variant="secondary">
              📥 Exportar todo
            </Button>
            <label className="cursor-pointer">
              <span className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-block text-base font-medium">
                📤 Importar respaldo
              </span>
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={handleImport}
              />
            </label>
          </div>
          <p className="text-xs opacity-60">
            Los datos se guardan localmente en tu navegador. Exportarlos te
            permite hacer copias de seguridad.
          </p>
        </div>
      </Card>

      <Card title="Zona de peligro">
        <div className="space-y-5">
          <p className="text-sm opacity-70">
            Esto eliminará permanentemente todos tus datos locales: playlists,
            diario, sesiones de meditación y configuración.
          </p>
          <Button onClick={onReset} variant="danger">
            🗑️ Borrar todos los datos
          </Button>
          <p className="text-xs opacity-60">
            Esta acción no se puede deshacer. Asegúrate de haber exportado tus
            datos si los quieres conservar.
          </p>
        </div>
      </Card>

      <Card title="Sobre T.Five">
        <div className="space-y-3 text-sm opacity-80 leading-relaxed">
          <p>
            <strong>T.Five</strong> es una aplicación para el descanso mental y
            emocional a través de la música, la meditación y la introspección.
          </p>
          <p>
            Inspirada en el concepto taoísta de <em>Wu-Wei</em> (no acción),
            T.Five te invita a fluir con el presente, a descansar sin culpa, y a
            reconectar contigo mismo.
          </p>
          <p className="text-xs">
            Demo académico · Sin fines comerciales · Creado con React,
            TypeScript y Tailwind CSS
          </p>
        </div>
      </Card>
    </div>
  );
}
