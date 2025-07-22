import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const { access_token } = await res.json();
      localStorage.setItem('token', access_token);
      router.push('/dashboard');
    } else {
      const err = await res.json();
      setError(err.detail || 'Erro ao autenticar');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" required/>
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" required/>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Entrar</button>
      </form>
    </div>
}
