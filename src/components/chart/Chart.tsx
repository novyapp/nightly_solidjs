import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { createEffect, on } from "solid-js";
import { listOfCurrencyProps } from "../../data/chartDataGenerator";

export interface ChartProps {
  selectedCurrency: () => listOfCurrencyProps;
}

let chartContainerRef: HTMLDivElement;
let container: HTMLDivElement;
let toolTip: HTMLDivElement;

export const Chart = ({ selectedCurrency }: ChartProps) => {
  let chart: IChartApi;
  let seriesRef: ISeriesApi<"Area">;

  createEffect(() => {
    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: "#090b12" },
        textColor: "#ffffff",
      },
      width: chartContainerRef.clientWidth,
      height: 400,
    };

    chart = createChart(chartContainerRef, chartOptions);

    chart.applyOptions({
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false,
        },
      },
      // hide the grid lines
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    seriesRef = chart.addAreaSeries({
      topColor: "transparent",
      bottomColor: "transparent",
      lineColor: "#5AB88B",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      priceLineVisible: true,
    });

    seriesRef.priceScale().applyOptions({
      scaleMargins: {
        top: 0.3, // leave some space for the legend
        bottom: 0.25,
      },
      autoScale: true,
    });

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTip.style.display = "flex";
        const dataSeries = param.seriesData.get(seriesRef);

        if (!dataSeries) return;

        let price: number;
        price = (dataSeries as { value: number }).value;

        toolTip.innerHTML = `
        <span style="color: ${"#7685a0"}">${dateStr}</span>
        <span>
          Balance: <span style="color: ${"#5ab88b"}">  ${
          Math.round(100 * price) / 100
        }$</span>
        </span>
        <span>Leverage:  ${selectedCurrency().leverage}</span>
        <span>Margin usage: ${selectedCurrency().margin}</span>
 `;

        const coordinate = seriesRef.priceToCoordinate(price);
        let shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
        );
        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  container.clientHeight - toolTipHeight - toolTipMargin,
                  coordinate + toolTipMargin
                )
              );
        toolTip.style.left = shiftedCoordinate + "px";
        toolTip.style.top = coordinateY + "px";
      }
    });

    chart.timeScale().fitContent();
  });

  createEffect(() => {
    if (chart) {
      seriesRef.setData(selectedCurrency().data.day);
    }
  });

  return (
    <div id="container" class="relative" ref={container}>
      <div class="flex m-2">
        <button
          class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
          onClick={() => seriesRef.setData(selectedCurrency().data.day)}
        >
          24H
        </button>
        <button
          class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
          onClick={() => seriesRef.setData(selectedCurrency().data.week)}
        >
          1W
        </button>
        <button
          class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
          onClick={() => seriesRef.setData(selectedCurrency().data.month)}
        >
          1M
        </button>
        <button
          class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
          onClick={() => seriesRef.setData(selectedCurrency().data.threemonths)}
        >
          3M
        </button>
      </div>
      <div
        ref={toolTip}
        class="w-36 h-20 ml-12 mt-12 absolute hidden p-2 box-border text-xs text-left border-[#5ab88b] bg-[#171c2f]
         z-40 left-3 top-3 pointer-events-none border-l-2 rounded-sm antialiased flex-col shadow-md"
      ></div>
      <div ref={chartContainerRef} />
    </div>
  );
};
