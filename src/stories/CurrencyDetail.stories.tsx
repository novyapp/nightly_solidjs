import { Story } from "@storybook/web-components";
import {
  CurrencyDetail,
  CurrencyDetailProps,
} from "../components/currencydetail/CurrencyDetail";

export default {
  title: "UI/CurrencyDetail",
  component: CurrencyDetail,
};

const Template: Story<CurrencyDetailProps> = (args) => (
  <CurrencyDetail {...args}></CurrencyDetail>
);

export const Default = Template.bind({});
Default.args = {
  label: "Minimum amount",
  children: "0.000088",
};
