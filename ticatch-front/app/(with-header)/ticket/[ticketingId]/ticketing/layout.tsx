export default function TicketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-100vdh">{children}</div>;
}
