import { Story } from "@storybook/web-components";
import { Main } from "../Main";

export default {
  title: "Page/Withdraw With Chart",
  component: Main,
};

const Template: Story = (args) => <Main {...args} />;

export const Default = Template.bind({});
