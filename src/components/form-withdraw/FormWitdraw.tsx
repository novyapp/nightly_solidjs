import { createEffect, createSignal } from "solid-js";
import { z, ZodFormattedError } from "zod";
import { Toggle } from "../toggle/Toggle";
import {
  formFields,
  setFormFields,
  selectedCurrency,
  disabled,
  setDisabled,
  setShowSnackbar,
} from "../../store/store";
import { Input } from "../input/Input";
import { CurrencyDetail } from "../currencydetail/CurrencyDetail";

export const FormWithdraw = () => {
  const [errors, setErrors] =
    createSignal<
      ZodFormattedError<{ withdraw: string; amount: number }, string>
    >();

  const FormData = z.object({
    withdraw: z
      .string()
      .startsWith("0x", { message: "Must start from 0x" })
      .regex(/[0-9]+/i, { message: "At least 1 number" })
      .regex(/[!@#$&*]+/i, { message: "At least 1 special character" })
      .length(32, { message: "Must be 32 characters long" }),

    amount: z
      .number()
      .min(Number(selectedCurrency().limits.minimum), {
        message: `Must be minimum ${selectedCurrency().limits.minimum}`,
      })
      .max(
        Number(selectedCurrency().limits.maximum) -
          Number(selectedCurrency().limits.networkFee),
        {
          message: `Must be maximum ${
            Number(selectedCurrency().limits.maximum) -
            Number(selectedCurrency().limits.networkFee)
          }`,
        }
      ),
  });

  const handleChange = (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => {
    const { name, value } = event.currentTarget;

    let parsedValue: string | number = value;
    if (name === "amount") {
      parsedValue = parseFloat(value);
    }

    setFormFields({ ...formFields(), [name]: parsedValue });

    const result = FormData.safeParse(formFields());
    if (!result.success) {
      setDisabled(true);
      setErrors(result.error.format());
    }
    if (result.success) {
      setDisabled(false);
      setErrors();
    }
  };

  const handleMaxValue = (e: MouseEvent) => {
    e.preventDefault();

    const max = +(
      selectedCurrency().limits.maximum - selectedCurrency().limits.networkFee
    ).toFixed(6);

    setFormFields({ ...formFields(), amount: max });

    console.log(max);
  };

  const handleCryptoAddress = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleSnackbar = (e: MouseEvent) => {
    e.preventDefault();
    setShowSnackbar(true);
    setFormFields(() => {
      return { withdraw: "", amount: "" };
    });
    console.log();
    setDisabled(true);
  };

  createEffect(() => {
    console.log(selectedCurrency().limits.maximum);
  });

  return (
    <>
      <span class="mb-6 block">Withdraw crypto</span>
      <Toggle />
      <form>
        <Input
          label="Withdraw to"
          name="withdraw"
          type="text"
          value={formFields}
          onInput={handleChange}
          error={errors}
          buttonType="icon"
          buttonAction={handleCryptoAddress}
        >
          <img src="/address.png" />
        </Input>
        <Input
          label="Amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
          value={formFields}
          step="0.000001"
          onInput={handleChange}
          error={errors}
          buttonAction={handleMaxValue}
        >
          Max
        </Input>
        <div class="flex flex-wrap pt-4 border-t border-[#2b344d]">
          <CurrencyDetail label="Minimum amount">
            {selectedCurrency().limits.minimum}
          </CurrencyDetail>
          <CurrencyDetail label="Maximum amount">
            {selectedCurrency().limits.maximum}
          </CurrencyDetail>
          <CurrencyDetail label="Network Fee">
            ~ {selectedCurrency().limits.networkFee}
          </CurrencyDetail>
        </div>
        <button
          class="w-full bg-[#6067f9] h-8 rounded text-sm border-0 mt-4 disabled:bg-[#7685a0]"
          disabled={disabled()}
          onClick={(e) => handleSnackbar(e)}
        >
          Withdraw
        </button>
      </form>
    </>
  );
};
