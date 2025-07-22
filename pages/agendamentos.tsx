// pages/agendamentos.tsx
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../components/Calendar'), { ssr: false });

export default function Agendamentos() {
  // Tipagem explícita aqui:
  const events: any[] = [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agendamentos</h1>
      <Calendar events={events} />
    </div>
  );
}
