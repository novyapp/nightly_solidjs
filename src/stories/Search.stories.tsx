import { Meta, Story } from "@storybook/web-components";
import { createSignal } from "solid-js";
import { listOfCurrencyProps } from "../data/chartDataGenerator";
import { Search, SearchProps } from "../components/search/Search";

export default {
  title: "Search",
  component: Search,
};

const Template = (args: SearchProps) => {
  const [filter, setFilter] = createSignal("");

  return <Search {...args} filter={filter} setFilter={setFilter} />;
};

export const Default: Story<SearchProps> = Template.bind({});
