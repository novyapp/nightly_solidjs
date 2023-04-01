import { createEffect } from "solid-js";
import { z } from "zod";
import { Toggle } from "../toggle/Toggle";
import {
  formFields,
  setFormFields,
  selectedCurrency,
  disabled,
  setDisabled,
  setShowSnackbar,
  setErrors,
  errors,
} from "../../store/store";
import { Input } from "../input/Input";
import { CurrencyDetail } from "../currencydetail/CurrencyDetail";

export const FormWithdraw = () => {
  const validate = () => {
    const FormData = z.object({
      withdraw: z
        .string()
        .startsWith("0x", { message: "Must start from 0x" })
        .regex(/[0-9]+/i, { message: "At least 1 number" })
        .regex(/[A-Z]+/, { message: "At least 1 capitalize letter" })
        .regex(/[!@#$&*]+/i, { message: "At least 1 special character" })
        .length(32, { message: "Must be 32 characters long" }),

      amount: z
        .number()
        .min(selectedCurrency().limits.minimum, {
          message: `Must be minimum ${selectedCurrency().limits.minimum}`,
        })
        .max(
          +(
            selectedCurrency().limits.maximum -
            selectedCurrency().limits.networkFee
          ).toFixed(6),
          {
            message: `Must be maximum ${+(
              selectedCurrency().limits.maximum -
              selectedCurrency().limits.networkFee
            ).toFixed(6)}`,
          }
        ),
    });

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
    validate();
  };

  const handleMaxValue = (e: MouseEvent) => {
    e.preventDefault();

    const maxs = +(
      selectedCurrency().limits.maximum - selectedCurrency().limits.networkFee
    ).toFixed(6);
    setFormFields({ ...formFields(), amount: maxs });

    validate();
  };

  const handleCryptoAddress = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleSnackbar = (e: MouseEvent) => {
    e.preventDefault();
    setShowSnackbar(true);
    setDisabled(true);
  };

  createEffect(() => {
    console.log(formFields());
    console.log(selectedCurrency().limits.maximum);
    console.log(selectedCurrency().limits.minimum);
    console.log(errors());
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
          onKeyUp={handleChange}
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
