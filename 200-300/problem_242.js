function minimumPasses(m, w, p, n) {
  let passes = 0;
  let products = 0;

  while (products < n) {
    passes++;
    products += m * w;

    if (products >= n) {
      break;
    }

    if (products >= p) {
      let buy = Math.floor(products / p);
      products %= p;

      if (m > w) {
        w += buy;
      } else {
        m += buy;
      }

      if (m < w) {
        let temp = m;
        m = w;
        w = temp;
      }
    }
  }

  return passes;
}
