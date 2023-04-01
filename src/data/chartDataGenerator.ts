import { listOfCurrency } from "./currencies";

export type ChartData = {
  time: string;
  value: number;
};

export interface listOfCurrencyProps {
  id: number;
  fullLabel: string;
  shortLabel: string;
  iconUrl: string;
  margin: string;
  leverage: string;
  limits: {
    minimum: number;
    maximum: number;
    networkFee: number;
  };
  data: {
    day: ChartData[];
    week: ChartData[];
    month: ChartData[];
    threemonths: ChartData[];
  };
}

const randomIntFromInterval = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(6);

const randomMinimum = () => Number(randomIntFromInterval(0.00005, 0.0001));
const randomMaximum = () => Number(randomIntFromInterval(15.5, 9.5));
const randomNetworkFee = () =>
  Number(randomIntFromInterval(0.000008, 0.000001));

const generateData = () => {
  const arr = [];
  const startDate = new Date();

  let prevValue = 0;

  for (var i = 0; i < 100; ++i) {
    let newValue = prevValue + Math.floor(Math.random()) + 1;
    let sign = Math.random() < 0.5 ? -1 : 1;
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    newValue += sign * (Math.floor(Math.random() * 10) + 1);

    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    arr.push({
      time: formattedDate,
      value: newValue,
    });

    prevValue = newValue;
  }

  return arr;
};

export const currencyData = listOfCurrency.map((currency) => {
  return {
    ...currency,
    margin: Number(Math.random() * (10 - 6.7) + 6.7).toFixed(1),
    leverage: "1.25x",
    limits: {
      minimum: randomMinimum(),
      maximum: randomMaximum(),
      networkFee: randomNetworkFee(),
    },
    data: {
      day: generateData(),
      week: generateData(),
      month: generateData(),
      threemonths: generateData(),
    },
  };
});
