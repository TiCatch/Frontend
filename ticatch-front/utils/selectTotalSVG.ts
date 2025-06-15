function selectTotalSVG(svg: string, activeId: string): string {
  const container = document.createElement('div');
  container.innerHTML = svg;
  const paths = container.querySelectorAll('path');

  paths.forEach((path) => {
    const cls = path.getAttribute('class');
    if (!cls) return;

    if (cls === 'STAGE') {
      path.setAttribute('style', 'cursor: default;');
      path.setAttribute('fill', '#A5A5A5');
      return;
    }

    if (cls !== activeId) {
      path.setAttribute('fill', 'white');
      path.setAttribute('stroke', '#D5D5D5');
    }
  });

  return container.innerHTML;
}

export default selectTotalSVG;
