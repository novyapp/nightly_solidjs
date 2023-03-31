import { Story } from "@storybook/web-components";

import { listOfCurrencyProps } from "../../data/chartDataGenerator";
import { createSignal } from "solid-js";
import { CurrencySelectProps, Toggle } from "./toggle";

export default {
  title: "Toggle",
  component: Toggle,
};

const Template: Story<CurrencySelectProps> = (args) => {
  const [cryptoList, setCryptoList] = createSignal(mockData);
  const [selectedCurrency, setSelectedCurrency] = createSignal(mockData[0]);

  return (
    <Toggle
      {...args}
      selectedCurrency={selectedCurrency}
      setSelectedCurrency={setSelectedCurrency}
    />
  );
};

const mockData = [
  {
    id: 1,
    fullLabel: "Bitcoin",
    shortLabel: "BTC",
    iconUrl: "bitcoin.png",
    margin: "df",
    leverage: "2",
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },
  {
    id: 2,
    fullLabel: "Ethereum",
    shortLabel: "ETH",
    iconUrl: "ethereum.png",
    margin: 1.5,
    leverage: 10,
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },
  {
    id: 3,
    fullLabel: "USD Coin",
    shortLabel: "USDC",
    iconUrl: "usd_coin.png",
    margin: 1.5,
    leverage: 10,
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },

  {
    id: 4,
    fullLabel: "TetherUS",
    shortLabel: "USDT",
    iconUrl: "tetherus.png",
    margin: 1.5,
    leverage: 10,
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },
  {
    id: 5,
    fullLabel: "NEAR Protocol ",
    shortLabel: "NEAR",
    iconUrl: "near.png",
    margin: 1.5,
    leverage: 10,
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },
  {
    id: 6,
    fullLabel: "Aptos",
    shortLabel: "APT",
    iconUrl: "aptos.png",
    margin: 1.5,
    leverage: 10,
    limits: [{ minimum: 9, maximum: 12, networkFee: 3 }],
    data: [],
  },
];

export const Default = Template.bind({});
Default.args = {
  cryptoList: () => mockData as unknown as listOfCurrencyProps[],
  selectedCurrency: () =>
    ({
      iconUrl: "bitcoin.png",
      fullLabel: "ExampleCoin",
      shortLabel: "EXM",
    } as listOfCurrencyProps),
};
