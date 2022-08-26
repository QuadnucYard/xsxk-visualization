import MyChart from "./mychart";

new MyChart(document.getElementById("chart1")!, "#2ec7c9", 1000, 3600 * 1000); // 长期
new MyChart(document.getElementById("chart2")!, "#b6a2de", 1000, 60 * 1000); // 短期
new MyChart(document.getElementById("chart3")!, "#5ab1ef", 1000, 300 * 1000); // 中期
