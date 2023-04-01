import { Story } from "@storybook/web-components";
import FormWithdraw from "../components/form-withdraw/FormWitdraw";

export default {
  title: "Component/Form Withdraw",
  component: FormWithdraw,
};

const Template: Story = (args) => <FormWithdraw {...args} />;

export const Default = Template.bind({});
