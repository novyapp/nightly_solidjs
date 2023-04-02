import { selectedCurrency } from "../../store/store";
import { children, JSXElement, Component } from "solid-js";

export interface CurrencyDetailProps {
  children: JSXElement;
  label: string;
}

export const CurrencyDetail: Component<CurrencyDetailProps> = (props) => {
  const currencyData = children(() => props.children);

  return (
    <div class="flex flex-col w-1/2 mb-3">
      <label class="text-xs text-[#7685a0] block">{props.label}</label>
      <p class="text-base mt-2">
        {currencyData()} {selectedCurrency().shortLabel}
      </p>
    </div>
  );
};
