export function remToPixels(remValue) {
  // Get the root font size in pixels
  var rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  // Calculate the pixel value
  var pixelValue = remValue * rootFontSize;

  return pixelValue;
}

export function vwToPixels(vwValue) {
  // Calculate the pixel value
  var pixelValue = (vwValue * window.innerWidth) / 100;

  return pixelValue;
}
