import { apiWithAuth } from '../api';
import type { StatisticItem, MiddleStatisticsResponse } from '@/types/statistics.types';
import { API } from '../constants';

class StatisticsService {
  async getMain() {
    return apiWithAuth.get<StatisticItem[]>(API.statistics('main'));
  }

  async getMiddle() {
    return apiWithAuth.get<MiddleStatisticsResponse>(API.statistics('middle'));
  }
}

export const statisticsService = new StatisticsService();
