import DataTable from "@/components/DataTable";
import CoinOverview from "@/components/Home/CoinOverview";
import TrendingCoins from "@/components/Home/TrendingCoins";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/Home/Fallback";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      data: {
        price: 96000.0,
        price_change_percentage_24h: {
          usd: 2.5,
        },
      },
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      data: {
        price: 3500.0,
        price_change_percentage_24h: {
          usd: 1.2,
        },
      },
    },
  },
  {
    item: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      market_cap_rank: 5,
      thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
      large: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      data: {
        price: 150.0,
        price_change_percentage_24h: {
          usd: -5.4,
        },
      },
    },
  },
  {
    item: {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      market_cap_rank: 8,
      thumb: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",
      large: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
      data: {
        price: 0.12,
        price_change_percentage_24h: {
          usd: 10.5,
        },
      },
    },
  },
];

const topCoinsColumns: DataTableColumn<CoinMarketData>[] = [
  {
    header: "Name",
    cellClassName: "name-cell min-w-[200px]",
    cell: (coin) => (
      <Link href={`/coin/${coin.id}`} className="flex items-center gap-3">
        <Image src={coin.image} alt={coin.name} width={32} height={32} />
        <div className="flex flex-col">
          <span className="font-semibold">{coin.name}</span>
          <span className="text-xs text-gray-400">
            {coin.symbol.toUpperCase()}
          </span>
        </div>
      </Link>
    ),
  },
  {
    header: "Price",
    cell: (coin) => formatCurrency(coin.current_price),
  },
  {
    header: "24h Change",
    cell: (coin) => {
      const isPositive = coin.price_change_percentage_24h > 0;
      return (
        <div
          className={cn(
            "flex items-center gap-1",
            isPositive ? "text-green-500" : "text-red-500",
          )}
        >
          {isPositive ? (
            <TrendingUp width={16} height={16} />
          ) : (
            <TrendingDown width={16} height={16} />
          )}
          <span>{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
        </div>
      );
    },
  },
  {
    header: "Market Cap",
    cell: (coin) => formatCurrency(coin.market_cap),
  },
];

const dummyTopCoins: CoinMarketData[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 96000,
    market_cap: 1900000000000,
    price_change_percentage_24h: 2.5,
  } as CoinMarketData,
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    market_cap: 400000000000,
    price_change_percentage_24h: 1.2,
  } as CoinMarketData,
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 150,
    market_cap: 70000000000,
    price_change_percentage_24h: -5.4,
  } as CoinMarketData,
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 600,
    market_cap: 90000000000,
    price_change_percentage_24h: 0.5,
  } as CoinMarketData,
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 1.2,
    market_cap: 65000000000,
    price_change_percentage_24h: 3.8,
  } as CoinMarketData,
];

export default async function Home() {
  const coin = await fetcher<CoinDetailsData>("coins/bitcoin", {
    dex_pair_format: "symbol",
  });
  console.log(coin);
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Top 10 Cryptocurrencies</p>
      </section>
    </main>
  );
}
