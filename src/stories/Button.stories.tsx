import { Component } from "solid-js";
import { Story } from "@storybook/web-components";
import { Button, ButtonProps } from "../components/button/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    action: { action: "clicked" },
  },
};

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  action: (e) => alert("Clicked!"),
  disabled: () => false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Button",
  action: (e) => alert("Clicked!"),
  disabled: () => true,
};
