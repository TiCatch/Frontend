import { TicketingProvider } from './TicketingContext';

export default function TicketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TicketingProvider>
      <div className="h-dvh p-4">{children}</div>
    </TicketingProvider>
  );
}
