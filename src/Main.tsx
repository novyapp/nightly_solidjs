import { Component, createEffect, createSignal } from "solid-js";
import { Search } from "./components/search/Search";

export interface listOfCurrencyProps {
  id: number;
  fullLabel: string;
  shortLabel: string;
  iconUrl: string;
}

const listOfCurrency: listOfCurrencyProps[] = [
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
    fullLabel: "NEAR Protocol ",
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

//onInput = OnChange

export const Main: Component = () => {
  const [cryptoList, setCryptoList] = createSignal(listOfCurrency);
  const [selectedCurrency, setSelectedCurrency] = createSignal(
    listOfCurrency[0]
  );
  const [filter, setFilter] = createSignal("");

  createEffect(() => {
    console.log(filter());
    console.log(selectedCurrency());
  });

  return (
    <>
      Search
      <Search
        cryptoList={cryptoList()}
        setSelectedCurrency={setSelectedCurrency}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};
