import { Meta, Story } from "@storybook/web-components";
import { CurrencySelect, CurrencySelectProps } from "./CurrencySelect";
import { listOfCurrencyProps } from "../../data/chartDataGenerator";

export default {
  title: "Components/CurrencySelect",
  component: CurrencySelect,
};

const Template: Story<CurrencySelectProps> = (args) => (
  <CurrencySelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedCurrency: () =>
    ({
      iconUrl: "bitcoin.png",
      fullLabel: "ExampleCoin",
      shortLabel: "EXM",
    } as listOfCurrencyProps),
  toogleCryptoList: () => false,
  setToogleCryptoList: () => {},
};
