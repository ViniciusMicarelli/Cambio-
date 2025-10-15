'use client';
import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { currencies, CurrencyPair } from '@/lib/currencies';
import { Check, Star, ChevronDown, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { motion } from 'framer-motion';
import { suggestCurrencyMatches } from '@/ai/flows/suggest-currency-matches';

interface CurrencySelectorProps {
  selectedCurrency: CurrencyPair;
  onSelectCurrency: (currency: CurrencyPair) => void;
  favorites: string[];
  toggleFavorite: (code: string) => void;
}

const CurrencyCommandItem = ({ currency, onSelect, selectedCurrency, favorites, toggleFavorite, onSelectCurrency }: { currency: CurrencyPair, onSelect: () => void, selectedCurrency: CurrencyPair, favorites: string[], toggleFavorite: (code: string) => void, onSelectCurrency: (currency: CurrencyPair) => void; }) => (
    <CommandItem
        key={currency.code}
        value={currency.code + " " + currency.name}
        onSelect={() => {
            onSelectCurrency(currency);
            onSelect();
        }}
        className="group"
    >
        <Check
            className={cn(
                'mr-2 h-4 w-4',
                selectedCurrency.code === currency.code ? 'opacity-100' : 'opacity-0'
            )}
        />
        <span className="flex-1">{currency.name} ({currency.code})</span>
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(currency.code);
            }}
            className="p-1 opacity-50 group-hover:opacity-100"
            aria-label={favorites.includes(currency.code) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
            <Star className={cn('w-4 h-4', favorites.includes(currency.code) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')} />
        </motion.button>
    </CommandItem>
);

const CurrencyList = ({ onSelect, onSelectCurrency, selectedCurrency, favorites, toggleFavorite }: { onSelect: () => void; onSelectCurrency: (currency: CurrencyPair) => void; selectedCurrency: CurrencyPair; favorites: string[]; toggleFavorite: (code: string) => void; }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const favoriteCurrencies = useMemo(() => {
        return currencies.filter(c => favorites.includes(c.code));
    }, [favorites]);

    const handleSearchChange = async (search: string) => {
        setSearchTerm(search);
        setSuggestions([]);
        if (search.length > 1) {
            const filtered = currencies.filter(currency =>
                currency.code.toLowerCase().includes(search.toLowerCase()) ||
                currency.name.toLowerCase().includes(search.toLowerCase())
            );
            if (filtered.length === 0) {
                setIsSuggesting(true);
                try {
                    const result = await suggestCurrencyMatches({
                        input: search,
                        availableCurrencies: currencies.map(c => c.code)
                    });
                    setSuggestions(result.suggestedMatches);
                } catch (error) {
                    console.error("AI suggestion failed:", error);
                } finally {
                    setIsSuggesting(false);
                }
            }
        }
    };
    
    const CommandItemComponent = useCallback(
        ({ currency, onSelect: onSelectItem }: { currency: CurrencyPair, onSelect: () => void }) => (
            <CurrencyCommandItem
                currency={currency}
                onSelect={onSelectItem}
                selectedCurrency={selectedCurrency}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onSelectCurrency={onSelectCurrency}
            />
        ),
        [selectedCurrency, favorites, toggleFavorite, onSelectCurrency]
    );

    return (
        <Command shouldFilter={false} className="bg-transparent">
        <CommandInput
            placeholder="Buscar moeda..."
            value={searchTerm}
            onValueChange={handleSearchChange}
        />
        <CommandList>
            <ScrollArea className="h-[40vh] lg:h-[300px]">
            <CommandEmpty>
                {isSuggesting ? (
                <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" /> Buscando sugestões...
                </div>
                ) : suggestions.length > 0 ? null : "Nenhuma moeda encontrada."}
            </CommandEmpty>

            {suggestions.length > 0 && (
                <CommandGroup heading="Sugestões com IA">
                {suggestions.map(suggestionCode => {
                    const currency = currencies.find(c => c.code === suggestionCode);
                    if (!currency) return null;
                    return (
                    <CommandItem
                        key={currency.code}
                        value={currency.code}
                        onSelect={() => {
                        onSelectCurrency(currency);
                        onSelect();
                        }}
                    >
                        <Check
                        className={cn(
                            'mr-2 h-4 w-4',
                            selectedCurrency.code === currency.code ? 'opacity-100' : 'opacity-0'
                        )}
                        />
                        <span className="flex-1">{currency.name} ({currency.code})</span>
                    </CommandItem>
                    );
                })}
                </CommandGroup>
            )}

            {favoriteCurrencies.length > 0 && (
                <CommandGroup heading="Favoritos">
                {favoriteCurrencies.map(currency => (
                    <CommandItemComponent key={currency.code} currency={currency} onSelect={onSelect} />
                ))}
                </CommandGroup>
            )}
            
            <CommandSeparator className={cn(favoriteCurrencies.length === 0 && 'hidden')} />
            
            <CommandGroup heading="Todas as Moedas">
                {currencies
                .filter(currency =>
                    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(currency => (
                    <CommandItemComponent key={currency.code} currency={currency} onSelect={onSelect} />
                ))}
            </CommandGroup>
            </ScrollArea>
        </CommandList>
        </Command>
    );
};

export function CurrencySelector({
  selectedCurrency,
  onSelectCurrency,
  favorites,
  toggleFavorite,
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const TriggerButton = (
    <Button variant="ghost" className="h-auto p-1 text-left">
      <div className="flex items-center">
        <div className="flex flex-col items-start">
          <span className="text-xl sm:text-2xl font-bold">{selectedCurrency.code}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[100px] hidden sm:block">
            {selectedCurrency.name.split('/')[0]}
          </span>
        </div>
        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </div>
    </Button>
  );
  
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-lg bg-popover">
          <SheetHeader>
            <SheetTitle>Selecionar Moeda</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <CurrencyList 
                onSelect={() => setOpen(false)} 
                onSelectCurrency={onSelectCurrency}
                selectedCurrency={selectedCurrency}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <CurrencyList 
            onSelect={() => setOpen(false)}
            onSelectCurrency={onSelectCurrency}
            selectedCurrency={selectedCurrency}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
        />
      </PopoverContent>
    </Popover>
  );
}
