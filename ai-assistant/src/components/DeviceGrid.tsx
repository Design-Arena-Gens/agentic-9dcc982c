"use client";

import { useMemo } from "react";
import { DeviceSummary } from "@/lib/data";

const iconMap: Record<DeviceSummary["type"], string> = {
  desktop: "🖥️",
  laptop: "💻",
  phone: "📱",
  tablet: "📟",
  iot: "🛰️",
};

const statusColor: Record<DeviceSummary["status"], string> = {
  online: "text-emerald-400",
  busy: "text-amber-300",
  sleep: "text-indigo-200",
  offline: "text-rose-400",
};

interface DeviceGridProps {
  devices: DeviceSummary[];
}

export function DeviceGrid({ devices }: DeviceGridProps) {
  const healthScore = useMemo(() => {
    if (devices.length === 0) {
      return 0;
    }
    const weights: Record<DeviceSummary["status"], number> = {
      online: 1,
      busy: 0.75,
      sleep: 0.65,
      offline: 0.2,
    };
    const total = devices.reduce((acc, device) => acc + weights[device.status], 0);
    return Math.round((total / devices.length) * 100);
  }, [devices]);

  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-[0_30px_120px_-70px_rgba(236,72,153,0.5)] backdrop-blur-lg">
      <header className="flex items-center justify-between text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-pink-300/80">
            Device constellation
          </p>
          <h2 className="text-2xl font-semibold">Connected Endpoints</h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs uppercase tracking-[0.25em] text-white/60">
            Health Index
          </span>
          <span className="flex items-baseline gap-1 text-3xl font-semibold text-white">
            {healthScore}
            <span className="text-xs uppercase text-white/60">%</span>
          </span>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {devices.map((device) => (
          <article
            key={device.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white transition hover:border-pink-400/40 hover:bg-pink-500/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl font-semibold tracking-tight">
                  {device.name}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {device.location}
                </p>
              </div>
              <span className="text-3xl">{iconMap[device.type]}</span>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <dt className="text-white/50">Status</dt>
                <dd className={`font-semibold ${statusColor[device.status]}`}>
                  {device.status.toUpperCase()}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-white/50">OS</dt>
                <dd className="font-medium text-white/90">{device.os}</dd>
              </div>
              {typeof device.battery === "number" && (
                <div className="flex items-center gap-2">
                  <dt className="text-white/50">Battery</dt>
                  <dd className="flex items-center gap-2 font-medium text-white">
                    <span>{device.battery}%</span>
                    <span className="flex h-2 w-28 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500"
                        style={{ width: `${device.battery}%` }}
                      />
                    </span>
                  </dd>
                </div>
              )}
              {device.activeProcess && (
                <div>
                  <dt className="text-white/50">Active mission</dt>
                  <dd className="text-sm text-white/90">
                    {device.activeProcess}
                  </dd>
                </div>
              )}
            </dl>

            <footer className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <span>Control link secured</span>
              <span>#{device.id}</span>
            </footer>

            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}
