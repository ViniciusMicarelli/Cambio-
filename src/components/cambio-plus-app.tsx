'use client';

import { useState, useEffect, useMemo } from 'react';
import { ConversionCard } from './conversion-card';
import { motion, AnimatePresence } from 'framer-motion';
import { currencies, CurrencyPair } from '@/lib/currencies';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AwesomeAPIResponse, AwesomeAPIData } from '@/lib/types';
import { getExchangeRate, getExchangeRateHistory } from '@/lib/api';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { HistoryChart } from './history-chart';

export function CambioPlusApp() {
  const [fromAmount, setFromAmount] = useState('100');
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', ['USD-BRL', 'EUR-BRL', 'BTC-BRL']);

  const [fromCurrency, setFromCurrency] = useState<CurrencyPair>(
    currencies.find(c => c.code === 'USD')!
  );
  const [toCurrency, setToCurrency] = useState<CurrencyPair>(
    currencies.find(c => c.code === 'BRL')!
  );

  const [exchangeRate, setExchangeRate] = useState<AwesomeAPIResponse | null>(null);
  const [history, setHistory] = useState<AwesomeAPIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toAmount = useMemo(() => {
    if (!exchangeRate) return '';
    const rateKey = Object.keys(exchangeRate)[0];
    const rate = exchangeRate[rateKey];
    if (!rate || !rate.bid) return '';
    
    const numericFromAmount = parseFloat(fromAmount);
    if (isNaN(numericFromAmount)) return '';

    const result = numericFromAmount * parseFloat(rate.bid);
    
    const isCrypto = fromCurrency.isCrypto || toCurrency.isCrypto;
    return result.toFixed(isCrypto ? 6 : 2);
  }, [fromAmount, exchangeRate, fromCurrency, toCurrency]);

  const unitRate = useMemo(() => {
    if (!exchangeRate) return null;
    const rateKey = Object.keys(exchangeRate)[0];
    const rate = exchangeRate[rateKey];
    if (!rate || !rate.bid) return null;
    const isCrypto = fromCurrency.isCrypto || toCurrency.isCrypto;
    return `1 ${rate.code} = ${parseFloat(rate.bid).toFixed(isCrypto ? 4 : 2)} ${rate.codein}`;
  }, [exchangeRate, fromCurrency, toCurrency]);

  const lastUpdated = useMemo(() => {
    if (!exchangeRate) return null;
    const rateKey = Object.keys(exchangeRate)[0];
    const rate = exchangeRate[rateKey];
    if (!rate) return null;
    const date = new Date(parseInt(rate.timestamp) * 1000);
    return `Atualizado ${formatDistanceToNow(date, { addSuffix: true, locale: ptBR })}`;
  }, [exchangeRate]);

  useEffect(() => {
    const fetchRate = async () => {
      if (!fromCurrency || !toCurrency || fromCurrency.code === toCurrency.code) {
        setExchangeRate(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const pairCode = `${fromCurrency.code}-${toCurrency.code}`;
        const data = await getExchangeRate(pairCode);
        if(Object.keys(data).length === 0){
            setError(`Cotação para ${pairCode} não encontrada.`);
            setExchangeRate(null);
        } else {
            setExchangeRate(data);
        }
      } catch (err) {
        setError('Falha ao buscar cotação. Tente novamente.');
        setExchangeRate(null);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchHistory = async () => {
      if (!fromCurrency || !toCurrency || fromCurrency.code === toCurrency.code) {
        setHistory([]);
        return;
      }
      setIsHistoryLoading(true);
      try {
        const pairCode = `${fromCurrency.code}-${toCurrency.code}`;
        const historyData = await getExchangeRateHistory(pairCode, 30);
        setHistory(historyData);
      } catch (err) {
        console.error(err);
        setHistory([]);
      } finally {
        setIsHistoryLoading(false);
      }
    };

    fetchRate();
    fetchHistory();
    const interval = setInterval(fetchRate, 60000);

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const toggleFavorite = (code: string) => {
    setFavorites(prev => 
      prev.includes(code) ? prev.filter(fav => fav !== code) : [...prev, code]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          Cambio+
        </h1>
        <p className="text-muted-foreground mt-2">
          Seu conversor de moedas em tempo real.
        </p>
      </div>
      <ConversionCard
        fromAmount={fromAmount}
        onFromAmountChange={setFromAmount}
        fromCurrency={fromCurrency}
        onFromCurrencyChange={setFromCurrency}
        toAmount={toAmount}
        toCurrency={toCurrency}
        onToCurrencyChange={setToCurrency}
        onSwap={handleSwap}
        isLoading={isLoading}
        unitRate={unitRate}
        lastUpdated={lastUpdated}
        error={error}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
       <AnimatePresence>
        {!error && history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-4"
          >
            <HistoryChart
              data={history}
              isLoading={isHistoryLoading}
              fromCurrency={fromCurrency.code}
              toCurrency={toCurrency.code}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
