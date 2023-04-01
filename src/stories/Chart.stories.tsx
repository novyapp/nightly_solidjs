import { Story } from "@storybook/web-components";
import Chart from "../components/chart/Chart";
import { ChartProps } from "../components/chart/Chart";

import { selectedChartData, selectedCurrency } from "../store/store";
import { ChartDataProps } from "../data/chartDataGenerator";

export default {
  title: "Component/Chart",
  component: Chart,
};

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const Default = Template.bind({});
Default.args = {
  chartData: () => ({
    id: 2,
    fullLabel: "Ethereum",
    shortLabel: "ETH",
    iconUrl: "ethereum.png",
    margin: "9.8",
    leverage: "1.25x",
    data: {
      day: [
        {
          time: "Apr 1, 2:13:17 PM",
          value: 11,
        },
        {
          time: "Apr 2, 2:13:17 PM",
          value: 17,
        },
        {
          time: "Apr 3, 2:13:17 PM",
          value: 22,
        },
        {
          time: "Apr 4, 2:13:17 PM",
          value: 31,
        },
      ],
      week: [
        {
          time: "Apr 1, 2:13:17 PM",
          value: 3,
        },
        {
          time: "Apr 2, 2:13:17 PM",
          value: 11,
        },
        {
          time: "Apr 3, 2:13:17 PM",
          value: 6,
        },
        {
          time: "Apr 4, 2:13:17 PM",
          value: 11,
        },
      ],
      month: [
        {
          time: "Apr 1, 2:13:17 PM",
          value: 11,
        },
        {
          time: "Apr 2, 2:13:17 PM",
          value: 17,
        },
        {
          time: "Apr 3, 2:13:17 PM",
          value: 22,
        },
        {
          time: "Apr 4, 2:13:17 PM",
          value: 31,
        },
      ],
      threemonths: [
        {
          time: "Apr 1, 2:13:17 PM",
          value: 4,
        },
        {
          time: "Apr 2, 2:13:17 PM",
          value: 12,
        },
        {
          time: "Apr 3, 2:13:17 PM",
          value: 11,
        },
        {
          time: "Apr 4, 2:13:17 PM",
          value: 22,
        },
      ],
    },
  }),
};
