import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { Component, createEffect, on } from "solid-js";
import { ChartDataProps } from "../../data/chartDataGenerator";

export interface ChartProps {
  chartData: () => ChartDataProps;
}

let chartContainerRef: HTMLDivElement;
let container: HTMLDivElement;
let toolTip: HTMLDivElement;

const Chart: Component<ChartProps> = ({ chartData }) => {
  let chart: IChartApi;
  let seriesRef: ISeriesApi<"Area">;

  createEffect(() => {
    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#7685A0",
      },

      height: 300,
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
      handleScale: false,
      handleScroll: false,
    });

    seriesRef = chart.addAreaSeries({
      topColor: "transparent",
      bottomColor: "transparent",
      lineColor: "#5AB88B",
      lineWidth: 2,
      crosshairMarkerVisible: true,
      priceLineVisible: false,
    });

    seriesRef.priceScale().applyOptions({
      scaleMargins: {
        top: 0.3, // leave some space for the legend
        bottom: 0.15,
      },
      visible: false,
      autoScale: true,
    });

    new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef) {
        return;
      }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
      chart.timeScale().fitContent();
    }).observe(chartContainerRef);

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
        <span>Leverage:  ${chartData().leverage}</span>
        <span>Margin usage: ${chartData().margin}</span>
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
  });

  createEffect(() => {
    if (chart) {
      seriesRef.setData(chartData().data.day);
    }
  });

  return (
    <div class="bg-[#090b12] border-[#2b344d] border shadow-lg rounded-lg grow w-full md:min-w-[200px] items-start ">
      <div id="container" class="relative" ref={container}>
        <div class="flex m-2">
          <button
            class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
            onClick={() => seriesRef.setData(chartData().data.day)}
          >
            24H
          </button>
          <button
            class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
            onClick={() => seriesRef.setData(chartData().data.week)}
          >
            1W
          </button>
          <button
            class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
            onClick={() => seriesRef.setData(chartData().data.month)}
          >
            1M
          </button>
          <button
            class="border-0 bg-[#2b344d] py-1 px-2 rounded mr-2 cursor-pointer text-sm"
            onClick={() => seriesRef.setData(chartData().data.threemonths)}
          >
            3M
          </button>
        </div>
        <div
          ref={toolTip}
          class="w-36 h-20 ml-12 mt-8 absolute hidden p-2 box-border text-xs text-left border-[#5ab88b] bg-[#171c2f]
         z-40 left-3 top-3 pointer-events-none border-l-2 rounded-sm antialiased flex-col shadow-md"
        ></div>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};

export default Chart;
