import { Component } from "solid-js";
import { Chart } from "./components/chart/Chart";
import { selectedCurrency, showSnackbar } from "./store/store";
import { FormWithdraw } from "./components/form-withdraw/FormWitdraw";
import { Snackbar } from "./components/snackbar/Snackbar";

export const Main: Component = () => {
  return (
    <div class="flex flex-col relative">
      <div class="my-4 mx-6">
        <img src="/logo.svg" />
      </div>
      <div class="flex justify-between gap-10 m-14">
        {showSnackbar() ? <Snackbar /> : null}
        <div
          class="bg-[#090b12]  border border-[#2b344d] rounded-lg shadow-lg p-4 
        relative w-[330px]"
        >
          <FormWithdraw />
        </div>
        <div class="bg-[#090b12] border-[#2b344d] border shadow-lg rounded-lg flex-1">
          <Chart selectedCurrency={selectedCurrency} />
        </div>
      </div>
    </div>
  );
};
