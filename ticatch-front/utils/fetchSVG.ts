import DOMPurify from 'dompurify';

export const fetchSVG = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    let svgText = await response.text();

    svgText = svgText
      .replace(/width=".*?"/, 'width="100%"')
      .replace(/height=".*?"/, 'height="100%"')
      .replace(/<rect /g, '<rect style="cursor:pointer" fill="transparent" ');

    return DOMPurify.sanitize(svgText);
  } catch (error) {
    console.error('SVG 불러오기 실패:', error);
    return null;
  }
};
