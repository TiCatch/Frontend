export default function TicketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen p-4">{children}</div>;
}
