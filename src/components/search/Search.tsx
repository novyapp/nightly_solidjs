import { Component, createMemo, For } from "solid-js";
import { listOfCurrencyProps } from "../../data/chartDataGenerator";

import {
  cryptoList,
  setSelectedCurrency,
  setFormFields,
  setDisabled,
} from "../../store/store";

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
    setSelectedCurrency(item);
    setFilter("");
    setToogleCryptoList(false);
    setFormFields({ withdraw: "", amount: "" });
    setDisabled(true);
  };

  const filteredCurrency = createMemo(() =>
    cryptoList().filter(
      (f) =>
        f.fullLabel.toLowerCase().includes(filter().toLowerCase()) ||
        filter() === ""
    )
  );

  return (
    <div class="w-[300px]  p-2 bg-[#171c2f] border border-[#2b344d] shadow-lg rounded absolute z-10">
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
          class="absolute right-3 top-0 translate-y-[100%]"
        />
      </div>
      <ul class=" mt-3 p-0">
        <For each={filteredCurrency()}>
          {(crypto) => {
            return (
              <li
                onClick={() => handleCurrencyChange(crypto)}
                class=" flex cursor-pointer h-10 items-center text-[#f7f7f7] text-sm"
              >
                <img src={crypto.iconUrl} class="m-2" /> {crypto.fullLabel}
                <span class="text-[#7685a0] ml-2">({crypto.shortLabel})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};
