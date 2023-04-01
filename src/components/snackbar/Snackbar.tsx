import { Show } from "solid-js";
import {
  formFields,
  selectedCurrency,
  setShowSnackbar,
  showSnackbar,
} from "../../store/store";

export const Snackbar = () => {
  const handleSnackbarClose = (e: MouseEvent) => {
    e.preventDefault();
    setShowSnackbar(false);
  };

  return (
    <>
      <Show when={showSnackbar()}>
        <div class="bg-black/60 z-10 h-screen w-screen absolute left-0 top-0 transition-all"></div>
      </Show>
      <div
        class={`
          ${
            showSnackbar() ? "scale-100 opacity-100" : "scale-0 opacity-20"
          } transition-all  ease-out absolute justify-center items-center  flex z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-96
           border-[#5ab88b] bg-[#171c2f] rounded p-4 border `}
      >
        <div>
          <h2 class="text-lg text-[#5ab88b]">Operation successful</h2>
          <p>
            You withdrew {formFields().amount} {selectedCurrency().shortLabel}{" "}
            and paid {selectedCurrency().limits.networkFee}{" "}
            {selectedCurrency().shortLabel} as a fee.
          </p>
        </div>

        <button
          class="text-[#5ab88b] text-xl border-2 border-[#5ab88b] rounded-full h-12 w-12 shrink-0"
          onClick={(e) => handleSnackbarClose(e)}
        >
          X
        </button>
      </div>
    </>
  );
};
