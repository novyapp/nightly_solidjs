import { createSignal } from "solid-js";
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
  };

  const handleSnackbar = (e: MouseEvent) => {
    e.preventDefault();
    setShowSnackbar(true);
    setFormFields(() => {
      return { withdraw: "", amount: "" };
    });
    setDisabled(true);
  };

  return (
    <>
      <span class="mb-6 block">Withdraw crypto</span>
      <Toggle />
      <form>
        <label class=" text-xs text-[#7685a0] my-2 block">Withdraw to</label>
        <div class=" w-full flex flex-col relative mb-4">
          <input
            class="bg-[#040407] border-[#171c2f] border rounded text-sm py-2 px-3 text-[#b1bdd4]"
            name="withdraw"
            type="text"
            value={formFields().withdraw}
            onInput={handleChange}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            class="cursor-pointer bg-[#6067f940]  h-6 w-6 border-0 absolute right-0
         top-0 translate-x-[-25%] translate-y-[25%] justify-center flex items-center rounded-full"
          >
            <img src="/address.png" />
          </button>
          {errors()?.withdraw?._errors.map((er) => (
            <p class=" text-[red] text-xs">{er}</p>
          ))}
        </div>
        <label class=" text-xs text-[#7685a0] my-2 block">Amount</label>
        <div class=" w-full flex flex-col relative mb-4">
          <input
            class="bg-[#040407] border-[#171c2f] border rounded text-sm py-2 px-3 text-[#b1bdd4]"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formFields().amount}
            step="0.000001"
            onInput={handleChange}
          />
          <button
            class="cursor-pointer bg-[#6067f940] text-[#8793FF] text-xs px-2 rounded h-6 border-0
          absolute right-0 top-0 translate-x-[-25%] translate-y-[25%]"
            onClick={(e) => handleMaxValue(e)}
          >
            Max
          </button>
          {errors()?.amount?._errors.map((er) => (
            <p class=" text-[red] text-xs">{er}</p>
          ))}
        </div>
        <div class="flex flex-wrap pt-4 border-t border-[#2b344d]">
          <div class="flex flex-col w-1/2">
            <label class=" text-xs text-[#7685a0] my-2 block">
              Minimum amount
            </label>
            <p class="text-md">
              {selectedCurrency().limits.minimum}{" "}
              {selectedCurrency().shortLabel}
            </p>
          </div>
          <div class="flex flex-col">
            <label class=" text-xs text-[#7685a0] my-2 block">
              Maximum amount
            </label>
            <p class=" text-md ">
              {selectedCurrency().limits.maximum}{" "}
              {selectedCurrency().shortLabel}
            </p>
          </div>
          <div class="flex flex-col">
            <label class=" text-xs text-[#7685a0] my-2 block">
              Network Fee
            </label>
            <p>
              ~ {selectedCurrency().limits.networkFee}{" "}
              {selectedCurrency().shortLabel}
            </p>
          </div>
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
