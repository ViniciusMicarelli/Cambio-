import { AwesomeAPIResponse } from './types';

const API_BASE_URL = 'https://economia.awesomeapi.com.br/json';

export async function getExchangeRate(pair: string): Promise<AwesomeAPIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/last/${pair}`);
    if (!response.ok) {
      if (response.status === 404) {
        return {};
      }
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch exchange rate for ${pair}:`, error);
    throw error;
  }
}

export async function getExchangeRateHistory(pair: string, days: number = 30): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/daily/${pair}/${days}`);
      if (!response.ok) {
        if (response.status === 404) {
            return []; 
        }
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch exchange rate history for ${pair}:`, error);
      throw error;
    }
  }