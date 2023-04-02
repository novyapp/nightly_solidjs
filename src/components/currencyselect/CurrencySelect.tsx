import { Component } from "solid-js";
import { selectedCurrency } from "../../store/store";

export interface CurrencySelectProps {
  toogleCryptoList: () => boolean;
  setToogleCryptoList: (arg0: boolean) => void;
}

export const CurrencySelect: Component<CurrencySelectProps> = ({
  toogleCryptoList,
  setToogleCryptoList,
}) => {
  const handleToggle = () => {
    setToogleCryptoList(!toogleCryptoList());
  };

  return (
    <div>
      <label class=" text-xs text-[#7685a0] my-2 block">Select a coin</label>
      <div
        class="md:w-[300px] h-10 py-2 px-3 bg-[#171c2f] rounded text-sm
         text-[#f7f7f7] flex justify-between items-center cursor-pointer mb-2"
        onClick={() => handleToggle()}
      >
        <img src={selectedCurrency().iconUrl} class="mr-2" />
        {selectedCurrency().fullLabel}
        <span class="block ml-1 text-[#7685a0]">
          ({selectedCurrency().shortLabel})
        </span>
        <span class="ml-auto mr-2 text-[#7685a0]">
          {selectedCurrency().balanse}
        </span>
        <img
          src="star.png"
          class={`${
            toogleCryptoList() ? "rotate-180" : null
          } transition-transform`}
        />
      </div>
    </div>
  );
};
