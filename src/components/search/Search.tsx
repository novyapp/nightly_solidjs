import { Component, createMemo, For } from "solid-js";

import {
  cryptoList,
  setSelectedCurrency,
  setFormFields,
  setDisabled,
  formFields,
  chartData,
  setSelectedChartData,
  selectedChartData,
} from "../../store/store";
import { listOfCurrencyProps } from "../../data/currenciesDataGenerator";

export interface SearchProps {
  filter: () => string;
  setFilter: (value: string) => void;
  setToogleCryptoList: (arg0: boolean) => void;
}

export const Search: Component<SearchProps> = ({
  filter,
  setFilter,
  setToogleCryptoList,
}) => {
  const handleCurrencyChange = (item: listOfCurrencyProps) => {
    const [filterChartData] = chartData().filter(
      (chart) => chart.shortLabel === item.shortLabel
    );
    setSelectedCurrency(item);
    setFilter("");
    setToogleCryptoList(false);
    setFormFields({ ...formFields(), amount: "" });
    setDisabled(true);
    setSelectedChartData(filterChartData);
  };

  const filteredCurrency = createMemo(() =>
    cryptoList().filter(
      (f) =>
        f.fullLabel.toLowerCase().includes(filter().toLowerCase()) ||
        filter() === ""
    )
  );

  return (
    <div class="md:w-[300px] md:ml-0 p-2 bg-[#171c2f] border border-[#2b344d] shadow-lg rounded absolute z-10">
      <div class="relative">
        <input
          class="bg-[#040407] rounded flex justify-between items-center py-1.5 
          px-2 pr-8 border-0 w-full text-white text-sm"
          type="text"
          placeholder="Search coin"
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
        />
        <img
          src="union.png"
          class="absolute right-3 top-0 translate-y-[90%] translate-x-1"
        />
      </div>
      <ul class=" mt-1 p-0">
        <For each={filteredCurrency()}>
          {(crypto) => {
            return (
              <li
                onClick={() => handleCurrencyChange(crypto)}
                class="flex cursor-pointer h-10 mb-1 items-center text-[#f7f7f7] text-sm"
              >
                <img src={crypto.iconUrl} class="m-2 h-6 w-6" />{" "}
                {crypto.fullLabel}
                <span class="text-[#7685a0] ml-1">({crypto.shortLabel})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};
