import { MetricsService } from './../utils/metrics.service';
import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { map } from 'rxjs/operators';
import { Issue } from '../../pages/e-commerce/charts-panel/charts-service.ts.service';

@Injectable()
export class OrdersChartService extends OrdersChartData {

  private year = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = { };

  issue: Issue;
  listaMes: string[];

  constructor(private period: PeriodsService,
    private metricsService: MetricsService) {
    super();
    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(this.issue),
      year: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(42, this.period.getWeeks()),
      linesData: [
        [
          184, 267, 326, 366, 389, 399,
          392, 371, 340, 304, 265, 227,
          191, 158, 130, 108, 95, 91, 97,
          109, 125, 144, 166, 189, 212,
          236, 259, 280, 300, 316, 329,
          338, 342, 339, 329, 312, 288,
          258, 221, 178, 128, 71,
        ],
        [
          158, 178, 193, 205, 212, 213,
          204, 190, 180, 173, 168, 164,
          162, 160, 159, 158, 159, 166,
          179, 195, 215, 236, 257, 276,
          292, 301, 304, 303, 300, 293,
          284, 273, 262, 251, 241, 234,
          232, 232, 232, 232, 232, 232,
        ],
        [
          58, 137, 202, 251, 288, 312,
          323, 324, 311, 288, 257, 222,
          187, 154, 124, 100, 81, 68, 61,
          58, 61, 69, 80, 96, 115, 137,
          161, 186, 210, 233, 254, 271,
          284, 293, 297, 297, 297, 297,
          297, 297, 297, 297, 297,
        ],
      ],
    };
  }



  getConverteMes(mes: number){



  }

  private getDataForMonthPeriod(issue: Issue): OrdersChart {
    return {
      //chartLabel: this.getDataLabels(4, this.period.getMonths()),
      chartLabel: this.period.getMes(),
      linesData: [
        [
          127, 159, 203, 259,
        ],
        [
          6, 83, 148, 200,
        ],
        [
          398, 348, 315, 292,
        ],
      ],
    };
  }

  private getDataForYearPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(42, this.year),
      linesData: [
        [
          190, 269, 327, 366, 389, 398,
          396, 387, 375, 359, 343, 327,
          312, 298, 286, 276, 270, 268,
          265, 258, 247, 234, 220, 204,
          188, 172, 157, 142, 128, 116,
          106, 99, 95, 94, 92, 89, 84,
          77, 69, 60, 49, 36, 22,
        ],
        [
          265, 307, 337, 359, 375, 386,
          393, 397, 399, 397, 390, 379,
          365, 347, 326, 305, 282, 261,
          241, 223, 208, 197, 190, 187,
          185, 181, 172, 160, 145, 126,
          105, 82, 60, 40, 26, 19, 22,
          43, 82, 141, 220, 321,
        ],
        [
          9, 165, 236, 258, 244, 206,
          186, 189, 209, 239, 273, 307,
          339, 365, 385, 396, 398, 385,
          351, 300, 255, 221, 197, 181,
          170, 164, 162, 161, 159, 154,
          146, 135, 122, 108, 96, 87,
          83, 82, 82, 82, 82, 82, 82,
        ],
      ],
    };
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }

  getOrdersChartData(period: string): OrdersChart {
    return this.data[period];
  }
}
