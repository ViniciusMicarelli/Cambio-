'use server';
/**
 * @fileOverview Suggests possible currency pair matches if the user's input
 * doesn't yield a direct result.
 *
 * - suggestCurrencyMatches - A function that suggests currency matches.
 * - SuggestCurrencyMatchesInput - The input type for the suggestCurrencyMatches function.
 * - SuggestCurrencyMatchesOutput - The return type for the suggestCurrencyMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCurrencyMatchesInputSchema = z.object({
  input: z
    .string()
    .describe("The user's input for the currency pair."),
  availableCurrencies: z.array(z.string()).describe('A list of available currency pairs.'),
});
export type SuggestCurrencyMatchesInput = z.infer<typeof SuggestCurrencyMatchesInputSchema>;

const SuggestCurrencyMatchesOutputSchema = z.object({
  suggestedMatches: z.array(z.string()).describe('An array of suggested currency pairs.'),
});
export type SuggestCurrencyMatchesOutput = z.infer<typeof SuggestCurrencyMatchesOutputSchema>;

export async function suggestCurrencyMatches(input: SuggestCurrencyMatchesInput): Promise<SuggestCurrencyMatchesOutput> {
  return suggestCurrencyMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCurrencyMatchesPrompt',
  input: {schema: SuggestCurrencyMatchesInputSchema},
  output: {schema: SuggestCurrencyMatchesOutputSchema},
  prompt: `You are a currency conversion expert. The user has provided an input for a currency pair they want to convert, but it did not directly match any available currencies.

  Based on the user's input, suggest up to 5 possible currency pairs that the user might have meant. Return the suggestions as a list of currency pairs.

  User Input: {{{input}}}

  Available Currencies: {{availableCurrencies}}

  Consider typos, similar names, and common alternative symbols when creating your suggestions.
  `,
});

const suggestCurrencyMatchesFlow = ai.defineFlow(
  {
    name: 'suggestCurrencyMatchesFlow',
    inputSchema: SuggestCurrencyMatchesInputSchema,
    outputSchema: SuggestCurrencyMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
