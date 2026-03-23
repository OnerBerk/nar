import React, {useMemo, useRef, useState} from 'react';
import {LineChart} from '@mui/x-charts';

export type WeightPoint = {
  date: string;
  // weight en grams (DB)
  weight: number;
};

type WeightChartProps = {
  points: WeightPoint[] | undefined;
  yMinOffsetKg?: number;
  tickStepKg?: number;
};

const roundTo = (value: number, decimals: number) => {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
};

const WeightChart: React.FC<WeightChartProps> = ({points, yMinOffsetKg = 5, tickStepKg = 0.2}) => {
  const [chartHeight, setChartHeight] = useState<number>(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const setWrapperRef = (node: HTMLDivElement | null) => {
    if (!node) {
      observerRef.current?.disconnect();
      observerRef.current = null;
      return;
    }
    if (typeof ResizeObserver === 'undefined') return;

    observerRef.current?.disconnect();
    observerRef.current = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setChartHeight(Math.round(cr.height));
    });

    observerRef.current.observe(node);
    // Valeur initiale immédiatement après attachement
    const rect = node.getBoundingClientRect();
    setChartHeight(Math.round(rect.height));
  };

  const sorted = useMemo(
    () => [...(points ?? [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [points]
  );

  const xLabels = sorted.map((p) => {
    const d = new Date(p.date);
    return Number.isNaN(d.getTime())
      ? p.date
      : d.toLocaleDateString('fr-FR', {month: '2-digit', day: '2-digit', year: '2-digit'});
  });

  const uDataKg = sorted.map((p) => p.weight / 1000);

  const minKg = uDataKg.length ? Math.min(...uDataKg) : 0;
  const maxKg = uDataKg.length ? Math.max(...uDataKg) : 0;

  const rawMin = minKg - yMinOffsetKg;
  const step = tickStepKg > 0 ? tickStepKg : 0.2;
  const yMinKg = roundTo(Math.floor(rawMin / step) * step, 2);
  const yMaxKg = roundTo(Math.ceil(maxKg / step) * step, 2);

  const tickValuesKg: number[] = [];
  for (let v = yMinKg; v <= yMaxKg + 1e-9; v += step) {
    tickValuesKg.push(roundTo(v, 2));
  }

  return (
    <div ref={setWrapperRef} style={{width: '100%', height: '100%'}}>
      {chartHeight > 0 ? (
        <LineChart
          height={chartHeight}
          series={[{data: uDataKg, label: 'Poids', area: true, showMark: false}]}
          xAxis={[{scaleType: 'point', data: xLabels}]}
          yAxis={[
            {
              scaleType: 'linear',
              min: yMinKg,
              max: yMaxKg,
              domainLimit: 'strict',
              tickInterval: tickValuesKg,
              valueFormatter: (value) => `${roundTo(value as number, 2)}`,
            },
          ]}
          margin={{top: 20, right: 20, bottom: 40, left: 50}}
        />
      ) : null}
    </div>
  );
};

export default WeightChart;
