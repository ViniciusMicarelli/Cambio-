'use client';

import { format, fromUnixTime } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AwesomeAPIData } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { useMemo } from 'react';

interface HistoryChartProps {
  data: AwesomeAPIData[];
  isLoading: boolean;
  fromCurrency: string;
  toCurrency: string;
}

export function HistoryChart({ data, isLoading, fromCurrency, toCurrency }: HistoryChartProps) {
  const chartData = useMemo(() => {
    return data
      .map(item => ({
        timestamp: parseInt(item.timestamp, 10),
        value: parseFloat(item.bid),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-card/60 backdrop-blur-sm border-border/20 shadow-2xl shadow-black/20">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!data || data.length < 2) {
    return null;
  }

  const firstDate = fromUnixTime(chartData[0].timestamp);
  const lastDate = fromUnixTime(chartData[chartData.length - 1].timestamp);

  const formattedDateRange = `${format(firstDate, 'd MMM', { locale: ptBR })} - ${format(lastDate, 'd MMM yyyy', { locale: ptBR })}`;

  const yAxisDomain = [
    Math.min(...chartData.map(d => d.value)) * 0.995,
    Math.max(...chartData.map(d => d.value)) * 1.005,
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-card/60 backdrop-blur-sm border-border/20 shadow-2xl shadow-black/20">
      <CardHeader>
        <CardTitle className="text-lg">Histórico de {fromCurrency}/{toCurrency}</CardTitle>
        <CardDescription>{formattedDateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(unixTime) => format(fromUnixTime(unixTime), 'dd/MM')}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={(value) => value.toFixed(3)}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              orientation="right"
              width={70}
            />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--foreground))',
                }}
                labelFormatter={(label) => format(fromUnixTime(label), 'PPP', { locale: ptBR })}
                formatter={(value: number) => [value.toFixed(4), toCurrency]}
                cursor={{ stroke: 'hsl(var(--primary))' }}
             />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
