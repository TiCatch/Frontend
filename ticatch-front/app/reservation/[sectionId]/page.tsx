import { notFound } from 'next/navigation';

interface SectionPageProps {
  params: { sectionId: string };
}

export default function SeatsPage({ params }: SectionPageProps) {
  const { sectionId } = params;

  return (
    <>
      <p>{sectionId}구역의 상세 페이지</p>
    </>
  );
}
