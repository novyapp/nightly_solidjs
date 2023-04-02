import { Component, Suspense } from "solid-js";

import { selectedChartData } from "./store/store";
import { Snackbar } from "./components/snackbar/Snackbar";
import { lazy } from "solid-js";
import { Loader } from "./components/loader/Loader";

const Chart = lazy(() => import("./components/chart/Chart"));
const FormWithdraw = lazy(
  () => import("./components/form-withdraw/FormWitdraw")
);

export const Main: Component = () => {
  return (
    <div class="flex flex-col relative overflow-hidden min-h-screen">
      <div class="mt-1 ml-5 h-12 mb-3">
        <img src="/logo.svg" alt="logo" class=" h-12 ml-[1px] mt-[1px]" />
      </div>
      <div class="flex gap-10 m-6 md:m-14 items-start flex-col md:flex-row">
        <Suspense fallback={<Loader />}>
          <Snackbar />
          <FormWithdraw />
          <Chart chartData={selectedChartData} />
        </Suspense>
      </div>
    </div>
  );
};
