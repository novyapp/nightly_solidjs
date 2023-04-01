import { createSignal } from "solid-js";
import { currencyData as data } from "../data/chartDataGenerator";
import { ZodError, ZodFormattedError } from "zod";

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

export const [cryptoList, setCryptoList] = createSignal(data);
export const [selectedCurrency, setSelectedCurrency] = createSignal(data[0]);

export const [disabled, setDisabled] = createSignal(true);

export const [showSnackbar, setShowSnackbar] = createSignal(false);
