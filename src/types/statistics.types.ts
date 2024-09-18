export interface TopMovie {
  title: string;
  view: number;
}

export interface SalesByWeek {
  date: string;
  total: number;
}

export interface StatisticItem {
  id: number;
  name: string;
  value: number;
}

export interface MiddleStatisticsResponse {
  topMovies: TopMovie[];
  salesByWeek: SalesByWeek[];
}
