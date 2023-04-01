import { Story } from "@storybook/web-components";
import { Chart } from "../components/chart/Chart";
import { ChartProps } from "../components/chart/Chart";

import { selectedCurrency } from "../store/store";

import { listOfCurrencyProps } from "../data/chartDataGenerator";

export default {
  title: "Component/Chart",
  component: Chart,
};

const Template: Story<ChartProps> = (args) => (
  <Chart {...args} selectedCurrency={selectedCurrency} />
);

export const Default = Template.bind({});
Default.args = {
  selectedCurrency: () => [] as listOfCurrencyProps,
};
