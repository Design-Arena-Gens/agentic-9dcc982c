"use client";

import { Capability } from "@/lib/data";

const impactPalette: Record<Capability["impact"], string> = {
  critical: "from-rose-500/60 via-orange-500/40 to-rose-500/20",
  high: "from-purple-500/60 via-indigo-500/40 to-purple-500/20",
  medium: "from-sky-500/60 via-cyan-500/40 to-sky-500/20",
  emerging: "from-emerald-500/60 via-lime-500/40 to-emerald-500/20",
};

interface CapabilityMatrixProps {
  capabilities: Capability[];
}

export function CapabilityMatrix({ capabilities }: CapabilityMatrixProps) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-white shadow-[0_30px_140px_-90px_rgba(249,115,22,0.4)]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
            Capability map
          </p>
          <h2 className="text-2xl font-semibold">Jarvice Systems Stack</h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="uppercase tracking-[0.3em] text-white/50">
            Impact key
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-rose-400" />
            Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-purple-400" />
            High
          </span>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {capabilities.map((capability) => (
          <article
            key={capability.id}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${impactPalette[capability.impact]} opacity-40`}
            />
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  {capability.id}
                </p>
                <h3 className="text-lg font-semibold leading-tight text-white">
                  {capability.title}
                </h3>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/60">
                {capability.impact}
              </span>
            </header>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {capability.description}
            </p>
            <footer className="mt-4 flex flex-wrap gap-2">
              {capability.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
