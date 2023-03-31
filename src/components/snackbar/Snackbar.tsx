import {
  formFields,
  selectedCurrency,
  setShowSnackbar,
} from "../../store/store";

export const Snackbar = () => {
  const handleSnackbarClose = (e: MouseEvent) => {
    e.preventDefault();

    setShowSnackbar(false);
  };

  return (
    <div class="absolute justify-center items-center  flex z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-96 border-[#5ab88b] bg-[#171c2f] rounded p-4 border ">
      <p>
        You withdrawned {formFields().amount} {selectedCurrency().shortLabel}{" "}
        and paid {selectedCurrency().limits.networkFee}{" "}
        {selectedCurrency().shortLabel} Fee.
      </p>
      <button
        class="text-[#5ab88b] text-xl border-2 border-[#5ab88b] rounded-full h-12 w-12 shrink-0"
        onClick={(e) => handleSnackbarClose(e)}
      >
        X
      </button>
    </div>
  );
};
