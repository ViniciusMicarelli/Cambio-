'use client';

import { CurrencySelector } from './currency-selector';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { CurrencyPair } from '@/lib/currencies';
import { formatNumber } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface CurrencyInputPanelProps {
  label: string;
  amount: string;
  onAmountChange?: (value: string) => void;
  currency: CurrencyPair;
  onCurrencyChange: (currency: CurrencyPair) => void;
  isReadOnly?: boolean;
  favorites: string[];
  toggleFavorite: (code: string) => void;
}

export function CurrencyInputPanel({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  isReadOnly = false,
  favorites,
  toggleFavorite
}: CurrencyInputPanelProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onAmountChange) {
      const value = e.target.value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        return;
      }
      onAmountChange(value);
    }
  };
  
  return (
    <div className="p-4 rounded-lg bg-background/50 border border-border/50">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-4 mt-1">
        <CurrencySelector
          selectedCurrency={currency}
          onSelectCurrency={onCurrencyChange}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        {isReadOnly ? (
             <div className="text-2xl sm:text-3xl font-mono text-right w-full tabular-nums">
                {amount ? formatNumber(parseFloat(amount), currency.isCrypto) : <Skeleton className="h-8 w-3/4 float-right" />}
             </div>
        ) : (
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleInputChange}
              className="text-2xl sm:text-3xl font-mono text-right bg-transparent border-none h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 tabular-nums"
              placeholder="0.00"
              readOnly={isReadOnly}
            />
        )}
      </div>
    </div>
  );
}
