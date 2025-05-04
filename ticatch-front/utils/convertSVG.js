const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const inputDir = path.join(__dirname, '../public/seat');
const outputDir = path.join(__dirname, '../public/modified-seats');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  const svgFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === '.svg',
  );

  svgFiles.forEach((file) => {
    const filePath = path.join(inputDir, file);

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;

      const dom = new JSDOM(data);
      const svg = dom.window.document.querySelector('svg');

      if (!svg) {
        console.error(`SVG 태그를 찾지 못했습니다: ${file}`);
        return;
      }

      svg.querySelectorAll('[id]').forEach((element) => {
        let idValue = element.getAttribute('id');

        idValue = idValue.replace(/_\d+$/, '');

        element.setAttribute('class', idValue);
        element.removeAttribute('id');
      });

      const serializedSvg = svg.outerHTML;

      const outputFilePath = path.join(outputDir, file);
      fs.writeFile(outputFilePath, serializedSvg, (err) => {
        if (err) throw err;
      });
    });
  });
});
