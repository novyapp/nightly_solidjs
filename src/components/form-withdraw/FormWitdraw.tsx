import { z } from "zod";
import { Toggle } from "../toggle/Toggle";
import {
  formFields,
  setFormFields,
  selectedCurrency,
  setDisabled,
  setShowSnackbar,
  setErrors,
  errors,
  disabled,
} from "../../store/store";
import { Input } from "../input/Input";
import { CurrencyDetail } from "../currencydetail/CurrencyDetail";
import { Button } from "../button/Button";

const FormWithdraw = () => {
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

  return (
    <div class="bg-[#090b12]  border border-[#2b344d] rounded-lg shadow-lg p-4 w-full relative md:w-[330px]">
      <form class="w-full flex flex-col">
        <span class="mb-6 block">Withdraw crypto</span>
        <Toggle />
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
        <Button label="Withdraw" action={handleSnackbar} disabled={disabled} />
      </form>
    </div>
  );
};

export default FormWithdraw;
