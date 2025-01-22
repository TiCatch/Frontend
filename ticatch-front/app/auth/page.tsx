import { redirect } from 'next/navigation';
import AuthPageClient from './AuthPageClient';

interface AuthPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const code = params?.code;

  if (!code) {
    redirect('/login');
  }

  return <AuthPageClient code={code} />;
}
