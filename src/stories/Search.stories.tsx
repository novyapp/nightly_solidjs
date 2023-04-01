import { Meta, Story } from "@storybook/web-components";
import { createSignal } from "solid-js";
import { listOfCurrencyProps } from "../data/chartDataGenerator";
import { Search, SearchProps } from "../components/search/Search";

export default {
  title: "Search",
  component: Search,
};

const Template = (args: SearchProps) => {
  const [filter, setFilter] = createSignal("");

  return <Search {...args} filter={filter} setFilter={setFilter} />;
};

const mockData = [
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

export const Default: Story<SearchProps> = Template.bind({});
Default.args = {
  cryptoList: () => mockData as listOfCurrencyProps[],
};