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
      <div class="my-4 mx-6 h-8">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div class="flex gap-10 m-14 items-start">
        <Suspense fallback={<Loader />}>
          <Snackbar />
          <FormWithdraw />
          <Chart chartData={selectedChartData} />
        </Suspense>
      </div>
    </div>
  );
};
