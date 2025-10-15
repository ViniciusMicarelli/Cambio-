# Cambio+ — Conversor de Moedas em Tempo Real

![Screenshot](assets/screenshot.png)

> **Stack:** React + Next.js • Tailwind CSS • Chart.js (ou Recharts) • Fetch/SSR • Vercel Ready

O **Cambio+** é um conversor de moedas com foco em **UX moderna** e **tempo real**, incluindo histórico gráfico e suporte a múltiplos pares utilizando a API pública da AwesomeAPI.

---

## ✨ Funcionalidades

- Conversão em tempo real entre pares de moedas (ex.: **BRL ⇄ USD**).
- Campo de valor com **formatação amigável** e troca rápida entre moedas.
- **Gráfico de histórico** (últimos dias) do par selecionado.
- UI responsiva (Mobile‑First) com **animações suaves** (hover, transições, skeletons).
- Atualização periódica das cotações (intervalo configurável).
- Pronto para **deploy na Vercel**.

---

## 🧱 Tecnologias

- **Next.js** (App Router ou Pages, SSR/SSG conforme necessidade).
- **React** (Hooks, Context opcional para estado global).
- **Tailwind CSS** (design tokens e dark mode).
- **Charting**: `chart.js` + `react-chartjs-2` _ou_ `recharts`.
- **TypeScript** (recomendado).

---

## 🔌 API de Cotações

Usamos a AwesomeAPI:

```
https://economia.awesomeapi.com.br/json/last/{PAR}
```

Exemplos de pares:
```
USD-BRL  | Dólar Americano/Real Brasileiro
USD-BRLT | Dólar Americano/Real Brasileiro Turismo
CAD-BRL  | Dólar Canadense/Real Brasileiro
EUR-BRL  | Euro/Real Brasileiro
GBP-BRL  | Libra Esterlina/Real Brasileiro
ARS-BRL  | Peso Argentino/Real Brasileiro
BTC-BRL  | Bitcoin/Real Brasileiro
LTC-BRL  | Litecoin/Real Brasileiro
JPY-BRL  | Iene Japonês/Real Brasileiro
CHF-BRL  | Franco Suíço/Real Brasileiro
AUD-BRL  | Dólar Australiano/Real Brasileiro
```
> Dica: normalizamos a resposta para sempre retornar **valor de compra/venda**, timestamp e símbolo.

---

## 🙌 Agradecimentos

- [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) por fornecer as cotações públicas.
- Comunidade Next.js/Tailwind.


