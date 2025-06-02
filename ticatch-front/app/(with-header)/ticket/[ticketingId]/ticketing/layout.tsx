export default function TicketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-dvh p-4">{children}</div>;
}
