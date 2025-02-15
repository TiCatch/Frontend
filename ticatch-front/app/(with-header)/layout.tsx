import Header from '@components/Header';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
