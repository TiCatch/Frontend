import Header from '@components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
