






export function recolorSvg(svgText, targetColor) {
  if (!svgText || !targetColor) return svgText;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');


    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      console.warn('SVG parse error during recolor, returning original');
      return svgText;
    }

    const svgEl = doc.querySelector('svg');
    if (!svgEl) return svgText;


    svgEl.setAttribute('color', targetColor);
    svgEl.style.color = targetColor;


    const protectedElements = new Set();
    const containers = doc.querySelectorAll('defs, clipPath, mask, filter, linearGradient, radialGradient, pattern');
    containers.forEach((container) => {
      protectedElements.add(container);
      container.querySelectorAll('*').forEach((child) => protectedElements.add(child));
    });


    const hasGradients = doc.querySelectorAll('linearGradient, radialGradient').length > 0;


    const renderable = svgEl.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon, text');

    renderable.forEach((el) => {

      if (protectedElements.has(el)) return;

      const fill = el.getAttribute('fill');
      const stroke = el.getAttribute('stroke');
      const style = el.getAttribute('style');


      if (fill) {
        const cleanFill = fill.trim().toLowerCase();

        if (!cleanFill.startsWith('url(') && cleanFill !== 'none' && cleanFill !== 'transparent') {
          el.setAttribute('fill', targetColor);
        }
      } else if (!hasGradients && !stroke && (!style || !style.includes('fill:none'))) {


        if (!el.getAttribute('stroke-width') || stroke) {
          el.setAttribute('fill', targetColor);
        }
      }


      if (stroke) {
        const cleanStroke = stroke.trim().toLowerCase();
        if (!cleanStroke.startsWith('url(') && cleanStroke !== 'none' && cleanStroke !== 'transparent') {
          el.setAttribute('stroke', targetColor);
        }
      }


      if (style) {
        let newStyle = style;

        newStyle = newStyle.replace(/fill:\s*(?!none|transparent|url\()[^;]+/gi, `fill: ${targetColor}`);

        newStyle = newStyle.replace(/stroke:\s*(?!none|transparent|url\()[^;]+/gi, `stroke: ${targetColor}`);
        el.setAttribute('style', newStyle);
      }
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  } catch (err) {
    console.warn('recolorSvg error:', err);
    return svgText;
  }
}

export default recolorSvg;