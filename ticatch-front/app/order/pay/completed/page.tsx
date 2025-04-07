import PaymentPageClient from './PaymentPageClient';

interface PaymentPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;
  const pg_token = params?.pg_token;
  if (!pg_token) return;
  return <PaymentPageClient pg_token={pg_token} />;
}
