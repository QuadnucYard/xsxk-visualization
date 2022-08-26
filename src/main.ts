//import MyChart from "./mychart";
import "./style.css";

// new MyChart(document.getElementById("chart1")!, "#2ec7c9", 1000, 3600 * 1000); // 长期
// new MyChart(document.getElementById("chart2")!, "#b6a2de", 1000, 60 * 1000); // 短期
// new MyChart(document.getElementById("chart3")!, "#5ab1ef", 1000, 300 * 1000); // 中期

import oc1 from "@/assets/oc.json";
import oc2 from "@/assets/oc2.json";
import MyChart2 from "./mychart2";

const inputData = oc1.concat(oc2);

const C1 = new MyChart2(document.getElementById("chart1")!, "#2ec7c9", 1800 * 1000); // 长期
const C2 = new MyChart2(document.getElementById("chart2")!, "#b6a2de", 60 * 1000); // 短期
const C3 = new MyChart2(document.getElementById("chart3")!, "#5ab1ef", 300 * 1000); // 中期
const timeLabel = document.getElementById("time")!;

let index = 0;
let handle = 0;
const progress = () => {
  if (index >= inputData.length) clearInterval(handle);
  if (index % 5 == 0) C1.addData(C1, inputData[index]);
  C2.addData(C2, inputData[index]);
  C3.addData(C3, inputData[index]);
  timeLabel.innerText = new Date(inputData[index].currentTime).toString();
  index++;
};

handle = setInterval(progress, 10);
