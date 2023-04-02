export const randomIntFromInterval = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(6);

export const randomMinimum = () =>
  Number(randomIntFromInterval(0.00005, 0.0001));
export const randomMaximum = () => Number(randomIntFromInterval(15.5, 9.5));
export const randomNetworkFee = () =>
  Number(randomIntFromInterval(0.000008, 0.000001));
export const randomMargin = () =>
  Number(Math.random() * (10 - 6.7) + 6.7).toFixed(1);
export const randomBalans = () =>
  Number(Math.random() * (0.08 - 0.0000001) + 0.0000001).toFixed(7);
