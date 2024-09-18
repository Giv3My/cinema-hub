import React from 'react';

import type { TopMovie } from '@/types/statistics.types';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TopMoviesTooltip } from './top-movies-tooltip';
import { Heading } from '@/components/ui';
import styles from './top-movies.module.scss';

interface Props {
  data: TopMovie[];
}

const COLORS = ['#b61c1c', '#822a2a', '#790a0a', '#5d0b0b'];

export const TopMovies: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.top_movies}>
      {data.length ? (
        <ResponsiveContainer width="100%" height={390}>
          <PieChart>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="right"
              iconType="circle"
              content={({ payload }) => (
                <ul>
                  {payload?.map((entry: any, index) => (
                    <li key={index}>{entry.payload?.title}</li>
                  ))}
                </ul>
              )}
            />
            <Tooltip content={<TopMoviesTooltip />} />
            <Pie
              dataKey="views"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              paddingAngle={4}
              stroke="none"
              labelLine={false}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={index}
                  style={{ outline: 'none' }}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Heading as="h3" className={styles.not_found}>
          Фильмы не найдены
        </Heading>
      )}
    </div>
  );
};
