import { selectedCurrency } from "../../store/store";
import { createEffect, children, JSXElement } from "solid-js";

export interface CurrencyDetailProps {
  children: JSXElement;
  label: string;
}

export const CurrencyDetail = (props: CurrencyDetailProps) => {
  const currencyData = children(() => props.children);

  return (
    <div class="flex flex-col w-1/2">
      <label class=" text-xs text-[#7685a0] my-2 block">{props.label}</label>
      <p class="text-md">
        {currencyData()} {selectedCurrency().shortLabel}
      </p>
    </div>
  );
};
