// components/Layout.tsx
import { ReactNode, useState } from 'react';
import { Menu, CalendarDays, Users, BarChart2, LogOut } from 'lucide-react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { label: 'Dashboard', icon: <BarChart2 className="w-5 h-5" />, path: '/dashboard' },
  { label: 'Agendamentos', icon: <CalendarDays className="w-5 h-5" />, path: '/agendamentos' },
  { label: 'Clientes', icon: <Users className="w-5 h-5" />, path: '/clientes' },
  { label: 'Estatísticas', icon: <BarChart2 className="w-5 h-5" />, path: '/estatisticas' },
];

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-white border-r p-4 ${open ? 'w-64' : 'w-16'} transition-all`}>
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <img src="/logo.png" alt="Hora Certa" className="h-8" />
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            Menu
          </button>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.path} legacyBehavior>
              <a className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                {item.icon}
                {open && <span>{item.label}</span>}
              </a>
            </Link>
          ))}
          <Link href="/login" legacyBehavior>
            <a className="flex items-center gap-2 px-3 py-2 mt-4 text-red-600 hover:bg-red-100">
              <LogOut className="w-5 h-5" />
              {open && <span>Sair</span>}
            </a>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 border-b">
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Hora Certa" className="h-8 hidden md:block" />
            <span className="text-sm font-medium text-gray-600">Bem-vindo(a)!</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}