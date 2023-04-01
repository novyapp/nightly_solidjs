import { randomMargin } from "../utils/math.utils";
import { listOfCurrency } from "./currenciesDataGenerator";

export type ChartData = {
  time: string;
  value: number;
};

export interface ChartDataProps {
  id: number;
  fullLabel: string;
  shortLabel: string;
  iconUrl: string;
  margin: string;
  leverage: string;
  data: {
    day: ChartData[];
    week: ChartData[];
    month: ChartData[];
    threemonths: ChartData[];
  };
}

const generateData = () => {
  const arr = [];
  const startDate = new Date();

  let prevValue = 0;

  for (var i = 0; i < 50; ++i) {
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

export const currencyChartData: ChartDataProps[] = listOfCurrency.map(
  (currency) => {
    return {
      ...currency,
      margin: randomMargin(),
      leverage: "1.25x",
      data: {
        day: generateData(),
        week: generateData(),
        month: generateData(),
        threemonths: generateData(),
      },
    };
  }
);
