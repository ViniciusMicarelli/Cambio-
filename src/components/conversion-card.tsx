'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CurrencyInputPanel } from './currency-input-panel';
import { SwapButton } from './swap-button';
import { Card, CardContent } from './ui/card';
import type { CurrencyPair } from '@/lib/currencies';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { HistoryChart } from './history-chart';
import { AwesomeAPIData } from '@/lib/types';

interface ConversionCardProps {
  fromAmount: string;
  onFromAmountChange: (value: string) => void;
  fromCurrency: CurrencyPair;
  onFromCurrencyChange: (currency: CurrencyPair) => void;
  toAmount: string;
  toCurrency: CurrencyPair;
  onToCurrencyChange: (currency: CurrencyPair) => void;
  onSwap: () => void;
  isLoading: boolean;
  unitRate: string | null;
  lastUpdated: string | null;
  error: string | null;
  favorites: string[];
  toggleFavorite: (code: string) => void;
}

export function ConversionCard({
  fromAmount, onFromAmountChange, fromCurrency, onFromCurrencyChange,
  toAmount, toCurrency, onToCurrencyChange,
  onSwap, isLoading, unitRate, lastUpdated, error,
  favorites, toggleFavorite
}: ConversionCardProps) {
  
  return (
    <Card className="w-full max-w-md mx-auto bg-card/60 backdrop-blur-sm border-border/20 shadow-2xl shadow-black/20 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="relative flex flex-col gap-2">
          <CurrencyInputPanel
            label="Você envia"
            amount={fromAmount}
            onAmountChange={onFromAmountChange}
            currency={fromCurrency}
            onCurrencyChange={onFromCurrencyChange}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />

          <SwapButton onClick={onSwap} />

          <CurrencyInputPanel
            label="Você recebe"
            amount={toAmount}
            currency={toCurrency}
            onCurrencyChange={onToCurrencyChange}
            isReadOnly
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>

        <div className="mt-4 text-center h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div key="loader" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <Skeleton className="h-4 w-48" />
                </motion.div>
            ) : error ? (
                <motion.div key="error" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs">{error}</span>
                </motion.div>
            ) : unitRate && (
                <motion.div key="rate" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-xs text-muted-foreground flex flex-col items-center">
                    <span>{unitRate}</span>
                    <span className='opacity-70'>{lastUpdated}</span>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
