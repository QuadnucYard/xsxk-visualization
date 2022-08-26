import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import axios from "axios";
import dateFormat from "dateformat";
import { ECharts } from "echarts";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;

interface DataItem {
  name: string;
  value: [string, number];
}

async function getData() {
  const {
    data: {
      data: { currentTime, onlineCount },
    },
  } = await axios.post("http://newxk.urp.seu.edu.cn/xsxk/web/now");
  const now = new Date(currentTime);
  return {
    name: now.toString(),
    value: [dateFormat(now, "yyyy/m/d H:MM:ss"), onlineCount] as [string, number],
  };
}

export default class MyChart {
  data: DataItem[] = [];
  myChart: echarts.ECharts;
  timespan: number;

  constructor(dom: HTMLElement, color: string, interval: number, timespan: number) {
    this.timespan = timespan;

    this.myChart = echarts.init(dom);
    let option: EChartsOption;

    option = {
      grid: {
        top: 40,
        bottom: 40,
        left: 60,
        right: 0,
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
        },
        scale: true,
      },
      series: [
        {
          name: "Online Count",
          type: "line",
          showSymbol: true,
          data: this.data,
          color: color,
        },
      ],
    };

    option && this.myChart.setOption(option);

    setInterval(this.addData, interval, this);
    this.addData(this);
  }

  async addData(self: MyChart) {
    const item = await getData();
    self.data.push(item);
    const now = new Date(item.name);
    while (now.getTime() - new Date(self.data[0].name).getTime() > self.timespan) {
      self.data.shift();
    }
    self.myChart.setOption<EChartsOption>({
      series: [{ data: self.data }],
    });
  }
}
