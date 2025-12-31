"use client";

import { useEffect, useMemo, useState } from "react";

const missionStates = [
  {
    label: "Mission status",
    value: "Operational",
    tone: "text-emerald-300",
  },
  {
    label: "Spectrum lock",
    value: "Secured",
    tone: "text-sky-300",
  },
  {
    label: "Quantum sync",
    value: "58 ms latency",
    tone: "text-violet-300",
  },
];

const pulses = ["Aurora", "Nebula", "Halo"];

export function HeroHeader() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 3200);
    return () => clearInterval(interval);
  }, []);

  const pulseLabel = useMemo(
    () => pulses[tick % pulses.length],
    [tick],
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 text-white shadow-[0_40px_160px_-90px_rgba(129,140,248,0.6)]">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-300/80">
              Jarvice Operations Hub
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Control every device as one synchronized intelligence.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Direct your entire device fleet—from desktop to mobile to edge
              nodes—through a unified AI command center that anticipates your
              intent and executes with cinematic precision.
            </p>
          </div>
          <div className="flex h-28 w-full max-w-xs flex-none flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/5 text-center uppercase tracking-[0.35em] text-white/70">
            <span className="text-[11px]">Pulse</span>
            <span className="mt-2 text-2xl font-semibold text-white">
              {pulseLabel}
            </span>
            <span className="mt-2 text-[10px]">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </header>

        <div className="grid gap-3 text-sm sm:grid-cols-3">
          {missionStates.map((state) => (
            <article
              key={state.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                {state.label}
              </p>
              <p className={`mt-2 text-xl font-semibold ${state.tone}`}>
                {state.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-white/40">
                Synced moments ago
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
