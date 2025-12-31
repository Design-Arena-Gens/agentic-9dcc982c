"use client";

import { useMemo } from "react";
import { Automation } from "@/lib/data";

interface AutomationMatrixProps {
  automations: Automation[];
}

export function AutomationMatrix({ automations }: AutomationMatrixProps) {
  const runningCount = useMemo(
    () => automations.filter((item) => item.status === "running").length,
    [automations],
  );

  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-[0_30px_140px_-80px_rgba(45,212,191,0.55)]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
            Automation matrix
          </p>
          <h2 className="text-2xl font-semibold">Mission Autopilot</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
              Active
            </span>
            <span className="text-2xl font-semibold">{runningCount}</span>
          </div>
          <button
            type="button"
            className="rounded-full border border-emerald-400/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200 transition hover:bg-emerald-500/10"
          >
            Add Routine
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {automations.map((automation) => (
          <article
            key={automation.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-4"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {automation.id.toUpperCase()}
                </p>
                <h3 className="text-lg font-semibold leading-tight text-white">
                  {automation.title}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] ${
                  automation.status === "running"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : automation.status === "scheduled"
                      ? "bg-sky-500/20 text-sky-300"
                      : "bg-white/10 text-white/70"
                }`}
              >
                {automation.status}
              </span>
            </header>

            <p className="flex-1 text-sm leading-relaxed text-white/80">
              {automation.description}
            </p>

            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Triggers
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {automation.triggers.map((trigger) => (
                    <span
                      key={trigger}
                      className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
                    >
                      {trigger}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Actions
                </dt>
                <dd className="mt-1 flex flex-col gap-1 text-white/80">
                  {automation.actions.map((action) => (
                    <span key={action} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      {action}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <footer className="flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.3em] text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Simulate
              </button>
              <button
                type="button"
                className="rounded-full bg-emerald-500/90 px-3 py-1 uppercase tracking-[0.3em] text-emerald-950 transition hover:bg-emerald-400"
              >
                Deploy
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
