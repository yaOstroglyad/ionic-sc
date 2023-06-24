export const rgbHex = (red, green, blue, alpha) => {
  const isPercent = (red + (alpha || '')).toString().includes('%');

  if (typeof red === 'string') {
    [red, green, blue, alpha] = red.match(/(0?\.?\d+)%?\b/g).map(component => Number(component));
  } else if (alpha !== undefined) {
    alpha = Number.parseFloat(alpha);
  }

  if (typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255
  ) {
    throw new TypeError('Expected three numbers below 256');
  }

  if (typeof alpha === 'number') {
    if (!isPercent && alpha >= 0 && alpha <= 1) {
      alpha = Math.round(255 * alpha);
    } else if (isPercent && alpha >= 0 && alpha <= 100) {
      alpha = Math.round(255 * alpha / 100);
    } else {
      throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
    }

    alpha = (alpha | 1 << 8).toString(16).slice(1); // eslint-disable-line no-mixed-operators
  } else {
    alpha = '';
  }

  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
}

export const hexRgb = (hex) => {
  let red, green, blue, alpha;

  hex = hex.trim();

  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    throw new TypeError('Invalid HEX color format');
  }

  if (hex.length === 4 || hex.length === 7) {
    if (hex.length === 4) {
      hex = hex.replace(/([A-Fa-f0-9])/g, '$1$1');
    }

    red = parseInt(hex.slice(1, 3), 16);
    green = parseInt(hex.slice(3, 5), 16);
    blue = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 9) {
    red = parseInt(hex.slice(1, 3), 16);
    green = parseInt(hex.slice(3, 5), 16);
    blue = parseInt(hex.slice(5, 7), 16);
    alpha = parseInt(hex.slice(7, 9), 16);
  } else {
    throw new TypeError('Invalid HEX color format');
  }

  return {
    red,
    green,
    blue,
    alpha
  };
}
