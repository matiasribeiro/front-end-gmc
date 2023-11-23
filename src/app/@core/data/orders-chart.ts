export interface OrdersChart {
  chartLabel: string[];
  linesData: number[][];
}


export interface LinhaChart {
  label: string[];
  dados: number[];
}



export abstract class OrdersChartData {
  abstract getOrdersChartData(period: string): any;
}
