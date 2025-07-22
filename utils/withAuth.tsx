import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { ComponentType, FC } from 'react';

export function withAuth<P extends object>(Component: ComponentType<P>): FC<P> {
  const AuthenticatedComponent: FC<P> = (props: P) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) router.push('/login');
    }, [user]);

    if (!user) return null;
    return <Component {...props} />;
  };
  return AuthenticatedComponent;
}
