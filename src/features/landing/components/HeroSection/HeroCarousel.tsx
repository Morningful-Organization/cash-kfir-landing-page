import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Sparkles,
  TrendingUp,
  Check,
} from 'lucide-react';

const accounts = [
  { bank: 'Chase', mask: '4821', balance: '$9.24M' },
  { bank: 'Mercury', mask: '1190', balance: '$7.41M' },
  { bank: 'Wells Fargo', mask: '7732', balance: '$5.18M' },
];

const entities = [
  { name: 'Acme Holdings', accounts: 5, balance: '$12.1M' },
  { name: 'Northwind Ltd', accounts: 4, balance: '$8.42M' },
  { name: 'Globex Inc', accounts: 5, balance: '$5.91M' },
];

const cardFrame =
  'min-h-[420px] rounded-2xl border border-border bg-surface p-6 shadow-card-lg sm:p-7';

/* Slide 1 — live cash overview */
const CashOverviewSlide: React.FC = () => (
  <div className={cardFrame}>
    <div className="flex items-start justify-between">
      <div>
        <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft">
          Total cash position
        </p>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink tabular-figures">
          $24.83M
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
        <ArrowUpRight className="h-3.5 w-3.5" />
        2.4%
      </span>
    </div>

    <div className="mt-6">
      <svg
        viewBox="0 0 320 110"
        className="h-24 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="carouselArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(4 135 226)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(4 135 226)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,84 C40,68 64,76 92,56 C120,38 150,48 190,46 C228,44 258,20 320,28 L320,110 L0,110 Z"
          fill="url(#carouselArea)"
        />
        <path
          d="M0,84 C40,68 64,76 92,56 C120,38 150,48 190,46 C228,44 258,20 320,28"
          fill="none"
          stroke="rgb(4 135 226)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div className="mt-5 space-y-1">
      {accounts.map(acct => (
        <div
          key={acct.bank}
          className="flex items-center justify-between rounded-lg px-3 py-2.5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-tertiary/40 font-mono text-xs font-semibold text-brand-secondary">
              {acct.bank.charAt(0)}
            </span>
            <div className="text-sm">
              <span className="font-medium text-ink">{acct.bank}</span>
              <span className="ml-2 font-mono text-xs text-ink-soft">
                ···· {acct.mask}
              </span>
            </div>
          </div>
          <span className="font-mono text-sm font-medium text-ink tabular-figures">
            {acct.balance}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* Slide 2 — corporate dashboard with plan price */
const CorporateSlide: React.FC = () => (
  <div className={cardFrame}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Building2 className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft">
            Corporate
          </p>
          <p className="text-sm font-medium text-ink">
            3 entities · 14 accounts
          </p>
        </div>
      </div>
      <span className="rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-white tabular-figures">
        $99.99/mo
      </span>
    </div>

    <div className="mt-6 space-y-1">
      {entities.map(e => (
        <div
          key={e.name}
          className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-surface-muted"
        >
          <div className="text-sm">
            <span className="font-medium text-ink">{e.name}</span>
            <span className="ml-2 font-mono text-xs text-ink-soft">
              {e.accounts} accounts
            </span>
          </div>
          <span className="font-mono text-sm font-medium text-ink tabular-figures">
            {e.balance}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-5 flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3.5">
      <span className="text-sm text-ink-soft">Total managed</span>
      <span className="font-mono text-lg font-semibold text-ink tabular-figures">
        $26.44M
      </span>
    </div>
  </div>
);

/* Slide 3 — Pro analytics with monthly price */
const ProSlide: React.FC = () => (
  <div className={cardFrame}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft">
            Pro
          </p>
          <p className="text-sm font-medium text-ink">AI insights & analytics</p>
        </div>
      </div>
      <span className="rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-white tabular-figures">
        $29.99/mo
      </span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-border p-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
          Cash runway
        </p>
        <p className="mt-1.5 font-display text-2xl font-semibold text-ink tabular-figures">
          18 mo
        </p>
      </div>
      <div className="rounded-xl border border-border p-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft">
          Net burn
        </p>
        <p className="mt-1.5 font-display text-2xl font-semibold text-ink tabular-figures">
          $1.3M
        </p>
      </div>
    </div>

    <div className="mt-4 space-y-2.5">
      <div className="flex items-start gap-2.5 rounded-lg bg-brand/5 px-3.5 py-3">
        <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
        <p className="text-sm text-ink">
          FX exposure down{' '}
          <span className="font-semibold text-brand-secondary">12%</span> vs last
          month.
        </p>
      </div>
      <div className="flex items-start gap-2.5 rounded-lg px-3.5 py-1">
        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
        <p className="text-sm text-ink-soft">
          All 9 accounts reconciled this morning.
        </p>
      </div>
    </div>
  </div>
);

const slides = [
  { id: 'cash', caption: 'Cash overview', Component: CashOverviewSlide },
  { id: 'corporate', caption: 'Corporate dashboard', Component: CorporateSlide },
  { id: 'pro', caption: 'Pro analytics', Component: ProSlide },
];

const HeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const Active = slides[index].Component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
          {slides[index].caption}
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Show ${s.caption}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 bg-brand'
                  : 'w-1.5 bg-border hover:bg-ink-soft/40'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCarousel;
export { HeroCarousel };
