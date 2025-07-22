import { ReactNode, useState } from 'react';
import { Menu, CalendarDays, Users, BarChart2, LogOut } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', icon: <BarChart2 className="w-5 h-5" />, path: '/dashboard' },
  { label: 'Agendamentos', icon: <CalendarDays className="w-5 h-5" />, path: '/agendamentos' },
  { label: 'Clientes', icon: <Users className="w-5 h-5" />, path: '/clientes' },
  { label: 'Estatísticas', icon: <BarChart2 className="w-5 h-5" />, path: '/estatisticas' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen">
      <aside className={`bg-white border-r p-4 ${open ? 'w-64' : 'w-16'} transition-all`}>
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <img src="/logo.png" alt="Hora Certa" className="h-8" />
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>Menu</button>
        </div>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <Link key={item.label} href={item.path}>
              <a className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                {item.icon}
                <span className={`${open ? 'inline' : 'hidden'}`}>{item.label}</span>
              </a>
            </Link>
          ))}
          <Link href="/login" className="flex items-center gap-2 px-3 py-2 mt-4 text-red-600 hover:bg-red-100">
            <LogOut className="w-5 h-5" />
            <span className={`${open ? 'inline' : 'hidden'}`}>Sair</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
    </div>
}
