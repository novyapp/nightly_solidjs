import {
  randomBalans,
  randomMargin,
  randomMaximum,
  randomMinimum,
  randomNetworkFee,
} from "../utils/math.utils";

export interface listOfCurrencyType {
  id: number;
  fullLabel: string;
  shortLabel: string;
  iconUrl: string;
}

export interface listOfCurrencyProps {
  id: number;
  fullLabel: string;
  shortLabel: string;
  iconUrl: string;
  margin: string;
  balanse: string;
  leverage: string;
  limits: {
    minimum: number;
    maximum: number;
    networkFee: number;
  };
}

export const listOfCurrency: listOfCurrencyType[] = [
  {
    id: 1,
    fullLabel: "Bitcoin",
    shortLabel: "BTC",
    iconUrl: "bitcoin.png",
  },
  {
    id: 2,
    fullLabel: "Ethereum",
    shortLabel: "ETH",
    iconUrl: "ethereum.png",
  },
  {
    id: 3,
    fullLabel: "USD Coin",
    shortLabel: "USDC",
    iconUrl: "usd_coin.png",
  },
  {
    id: 4,
    fullLabel: "TetherUS",
    shortLabel: "USDT",
    iconUrl: "tetherus.png",
  },
  {
    id: 5,
    fullLabel: "NEAR Protocol",
    shortLabel: "NEAR",
    iconUrl: "near.png",
  },
  {
    id: 6,
    fullLabel: "Aptos",
    shortLabel: "APT",
    iconUrl: "aptos.png",
  },
];

export const currencyData: listOfCurrencyProps[] = listOfCurrency.map(
  (currency) => {
    return {
      ...currency,
      margin: randomMargin(),
      leverage: "1.25x",
      balanse: randomBalans(),
      limits: {
        minimum: randomMinimum(),
        maximum: randomMaximum(),
        networkFee: randomNetworkFee(),
      },
    };
  }
);
