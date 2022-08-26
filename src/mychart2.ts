import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import dateFormat from "dateformat";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;

interface DataItem {
  name: string;
  value: [string, number];
}

export interface TimeEntry {
  onlineCount: number;
  currentTime: number;
}

export default class MyChart2 {
  data: DataItem[] = [];
  myChart: echarts.ECharts;
  timespan: number;

  constructor(dom: HTMLElement, color: string, timespan: number) {
    this.timespan = timespan;

    this.myChart = echarts.init(dom);
    let option: EChartsOption;

    option = {
      grid: { top: 40, bottom: 40, left: 60, right: 0 },
      xAxis: { type: "time", splitLine: { show: true }, animation: false },
      yAxis: { type: "value", splitLine: { show: true }, scale: true, animation: false },
      series: [
        {
          name: "Online Count",
          type: "line",
          showSymbol: true,
          data: this.data,
          color: color,
          animation: false,
        },
      ],
    };

    option && this.myChart.setOption(option);
  }

  async addData(self: MyChart2, item: TimeEntry) {
    const stamp = item.currentTime;
    self.data.push({
      name: new Date(stamp).toString(),
      value: [dateFormat(stamp, "yyyy/m/d H:MM:ss"), item.onlineCount] as [string, number],
    });
    while (stamp - new Date(self.data[0].name).getTime() > self.timespan) {
      self.data.shift();
    }
    self.myChart.setOption<EChartsOption>({
      series: [{ data: self.data }],
    });
  }
}
