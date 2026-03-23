import React, {useMemo, useRef, useState} from 'react';
import {LineChart} from '@mui/x-charts';

type MetricSeries = {
  label: string;
  data: number[];
};

export type MetricChartProps = {
  dates: string[];
  series: MetricSeries[];
  unit: string;
  tickStep: number; // 5cm, etc.
  yMinOffset?: number; // par défaut: 5 (un peu d'espace sous le min)
  margin?: {top: number; right: number; bottom: number; left: number};
};

const roundTo = (value: number, decimals: number) => {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
};

const MetricChart: React.FC<MetricChartProps> = ({dates, series, unit, tickStep, yMinOffset = 5, margin}) => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [chartHeight, setChartHeight] = useState<number>(0);

  const {min, max, tickValues} = useMemo(() => {
    const allValues = series.flatMap((s) => s.data).filter((v) => Number.isFinite(v));
    if (allValues.length === 0) {
      return {min: 0, max: 0, tickValues: [0]};
    }

    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);

    const rawMin = minVal - yMinOffset;
    const yMin = Math.floor(rawMin / tickStep) * tickStep;
    const yMax = Math.ceil(maxVal / tickStep) * tickStep;

    const ticks: number[] = [];
    for (let v = yMin; v <= yMax + 1e-9; v += tickStep) {
      // Ici tickStep est en cm (entier) mais on garde un arrondi pour éviter les flottants
      ticks.push(roundTo(v, 2));
    }

    return {min: roundTo(yMin, 2), max: roundTo(yMax, 2), tickValues: ticks};
  }, [series, tickStep, yMinOffset]);

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

    const rect = node.getBoundingClientRect();
    setChartHeight(Math.round(rect.height));

  };

  const effectiveMargin = margin ?? {top: 20, right: 20, bottom: 30, left: 20};

  return (
    <div ref={setWrapperRef} style={{width: '100%', height: '100%'}}>
      {chartHeight > 0 ? (
        <LineChart
          height={chartHeight}
          series={series.map((s) => ({data: s.data, label: s.label}))}
          xAxis={[{scaleType: 'point', data: dates, height: 28}]}
          yAxis={[
            {
              width: 50,
              scaleType: 'linear',
              min,
              max,
              domainLimit: 'strict',
              tickInterval: tickValues,
              valueFormatter: (value) => `${roundTo(value as number, 2)} ${unit}`,
            },
          ]}
          margin={effectiveMargin}
        />
      ) : null}
    </div>
  );
};

export default MetricChart;

