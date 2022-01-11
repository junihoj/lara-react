function generateData(value, i1, i2, step = 1) {
    for (let x = i1; x <= i2; x += step) {
      yValues.push(eval(value));
      xValues.push(x);
    }
  }


generateData("x * 2 + 7", 0, 10, 0.5);