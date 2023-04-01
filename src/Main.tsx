import { Component } from "solid-js";
import { Chart } from "./components/chart/Chart";
import { chartData, selectedChartData, selectedCurrency } from "./store/store";
import { FormWithdraw } from "./components/form-withdraw/FormWitdraw";
import { Snackbar } from "./components/snackbar/Snackbar";

export const Main: Component = () => {
  return (
    <div class="flex flex-col relative">
      <div class="my-4 mx-6">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div class="flex justify-between gap-10 m-14">
        <Snackbar />
        <FormWithdraw />
        <Chart chartData={selectedChartData} />
      </div>
    </div>
  );
};
