import { Meta, Story } from "@storybook/web-components";
import { Input, InputProps } from "../components/input/Input";

export default {
  title: "Input",
  component: Input,
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const InputWithTextButton = Template.bind({});
InputWithTextButton.args = {
  label: "Amount",
  value: () => ({ amount: "test" }),
  error: () => {},
  children: "Max",
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  buttonType: "icon",
  label: "Withdraw To",
  value: () => ({ withdraw: "test" }),
  error: () => {},
  children: <img src="/address.png" />,
};
