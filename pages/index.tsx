// pages/index.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Image src="/logo.png" alt="Hora Certa" width={200} height={200} />
      <h1 className="text-4xl font-bold mt-4">Bem-vindo ao Hora Certa</h1>
      <p className="text-gray-500 mt-2">Agendamentos inteligentes para o seu negócio.</p>
      <Link href="/login" legacyBehavior>
        <a className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Entrar
        </a>
      </Link>
      <Link href="/register" legacyBehavior>
               <a className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
           Registrar-se
         </a>
      </Link>
    </div>
  );
}