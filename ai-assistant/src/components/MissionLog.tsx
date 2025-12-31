"use client";

import { MissionLog } from "@/lib/data";

const toneStyles: Record<MissionLog["status"], string> = {
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  failed: "border-rose-400/40 bg-rose-500/10 text-rose-100",
  pending: "border-sky-400/40 bg-sky-500/10 text-sky-100",
};

interface MissionLogProps {
  logs: MissionLog[];
}

export function MissionLogPanel({ logs }: MissionLogProps) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-white shadow-[0_30px_120px_-80px_rgba(59,130,246,0.45)] backdrop-blur-lg">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
            Mission log
          </p>
          <h2 className="text-2xl font-semibold">Real-time Telemetry</h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-sky-400/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-sky-200 transition hover:bg-sky-500/10"
        >
          Export
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {logs.map((log) => (
          <article
            key={log.id}
            className={`rounded-2xl border px-4 py-4 transition hover:translate-x-1 hover:border-white/30 ${toneStyles[log.status]}`}
          >
            <header className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em]">
              <span>{log.timestamp}</span>
              <span>{log.device}</span>
            </header>
            <h3 className="mt-2 text-sm font-semibold text-white">
              {log.summary}
            </h3>
            <p className="mt-1 text-sm text-white/70">{log.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
