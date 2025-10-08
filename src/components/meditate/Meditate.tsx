import { useState } from "react";
import { Card } from "../ui/Card";
import { MeditationTimer } from "./MeditationTimer";
import { MeditationList } from "./MeditationList";
import { RecentSessions } from "./RecentSessions";
import { GUIDED_MEDITATIONS } from "../../lib/constants";
import type { Meditation, MeditationSession } from "../../types";

interface MeditateProps {
  onFinish: (session: MeditationSession) => void;
  recent: MeditationSession[];
}

/**
 * Componente principal de Meditación
 */
export function Meditate({ onFinish, recent }: MeditateProps) {
  const [selectedMeditation, setSelectedMeditation] =
    useState<Meditation | null>(null);

  return (
    <div className="space-y-6">
      <Card title="Meditaciones guiadas">
        <div className="space-y-4">
          <p className="text-sm opacity-80">
            Elige una práctica que resuene contigo. No hay forma correcta o
            incorrecta de meditar.
          </p>
          <MeditationList
            meditations={GUIDED_MEDITATIONS}
            onSelect={setSelectedMeditation}
            selected={selectedMeditation}
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <MeditationTimer meditation={selectedMeditation} onFinish={onFinish} />
        <RecentSessions sessions={recent} />
      </div>
    </div>
  );
}
