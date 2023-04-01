import { createSignal } from "solid-js";
import { currencyData } from "../data/currenciesDataGenerator";
import { currencyChartData } from "../data/chartDataGenerator";
import { ZodFormattedError } from "zod";

interface FormFields {
  withdraw: string;
  amount: number | string;
}

const defaultFormFields: FormFields = {
  withdraw: "",
  amount: 0,
};

export const [formFields, setFormFields] =
  createSignal<FormFields>(defaultFormFields);
export const [errors, setErrors] =
  createSignal<ZodFormattedError<FormFields>>();

export const [cryptoList, setCryptoList] = createSignal(currencyData);
export const [selectedCurrency, setSelectedCurrency] = createSignal(
  currencyData[0]
);

export const [disabled, setDisabled] = createSignal(true);

export const [showSnackbar, setShowSnackbar] = createSignal(false);

export const [chartData, setChartData] = createSignal(currencyChartData);
export const [selectedChartData, setSelectedChartData] = createSignal(
  currencyChartData[0]
);
