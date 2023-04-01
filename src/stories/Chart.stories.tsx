import { Story } from "@storybook/web-components";
import { Chart } from "../components/chart/Chart";
import { ChartProps } from "../components/chart/Chart";

import { selectedChartData, selectedCurrency } from "../store/store";
import { ChartDataProps } from "../data/chartDataGenerator";

export default {
  title: "Component/Chart",
  component: Chart,
};

const Template: Story<ChartProps> = (args) => (
  <Chart {...args} chartData={selectedChartData} />
);

export const Default = Template.bind({});
Default.args = {
  chartData: () => "" as ChartDataProps,
};
