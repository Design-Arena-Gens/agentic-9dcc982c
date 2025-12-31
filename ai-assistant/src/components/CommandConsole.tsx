"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface ConversationEntry {
  id: string;
  author: "operator" | "jarvice";
  message: string;
  timestamp: string;
}

const seededConversation: ConversationEntry[] = [
  {
    id: "msg-01",
    author: "operator",
    message: "Jarvice, sync mission intel across all endpoints.",
    timestamp: "09:45",
  },
  {
    id: "msg-02",
    author: "jarvice",
    message:
      "Intel mesh aligned. Nomad Rig now hosts the primary briefing. Do you want it cast to Command Slate?",
    timestamp: "09:45",
  },
  {
    id: "msg-03",
    author: "operator",
    message: "Yes, mirror it in low-latency mode and stage a voice summary.",
    timestamp: "09:46",
  },
  {
    id: "msg-04",
    author: "jarvice",
    message:
      "Done. Generating a 40 second synopsis with delta markers for you. Notifying when ready.",
    timestamp: "09:46",
  },
];

const quickIntents = [
  "Prime defensive protocols",
  "Launch focus mode on Nomad Rig",
  "Hand off call to Quantum Link",
  "Spin up render cluster on Studio Core",
  "Audit access trails",
];

export function CommandConsole() {
  const [conversation, setConversation] = useState(seededConversation);
  const [draft, setDraft] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const intentQueue = useRef<string[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation]);

  useEffect(() => {
    if (!isDispatching || intentQueue.current.length === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      const nextIntent = intentQueue.current.shift();
      if (!nextIntent) {
        setIsDispatching(false);
        return;
      }

      setConversation((prev) => [
        ...prev,
        {
          id: `msg-${Math.random().toString(36).slice(2, 8)}`,
          author: "operator",
          message: nextIntent,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        {
          id: `msg-${Math.random().toString(36).slice(2, 8)}`,
          author: "jarvice",
          message: `Executing directive: “${nextIntent}”. Mission control will update once subsystems confirm.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 800);

    return () => clearTimeout(timeout);
  }, [isDispatching]);

  const personaIndicator = useMemo(() => {
    if (isListening) {
      return "Listening for neural cue…";
    }
    if (isDispatching) {
      return "Routing directives across the command mesh…";
    }
    return "Standing by for the next mission.";
  }, [isListening, isDispatching]);

  const submitMessage = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setConversation((prev) => [
      ...prev,
      {
        id: `msg-${Math.random().toString(36).slice(2, 8)}`,
        author: "operator",
        message: trimmed,
        timestamp,
      },
      {
        id: `msg-${Math.random().toString(36).slice(2, 8)}`,
        author: "jarvice",
        message:
          "Acknowledged. Drafting a multi-device execution plan. I’ll confirm when each endpoint reports green.",
        timestamp,
      },
    ]);
    setDraft("");
  };

  const stageIntent = (intent: string) => {
    intentQueue.current.push(intent);
    if (!isDispatching) {
      setIsDispatching(true);
    }
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-900/30 p-6 shadow-[0_40px_120px_-60px_rgba(99,102,241,0.45)] backdrop-blur-md">
      <header className="flex items-center justify-between pb-5">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-400">
            Neural Command Core
          </p>
          <h2 className="text-2xl font-semibold text-white">Jarvice Console</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsListening((state) => !state)}
          className={`group flex items-center gap-2 rounded-full border border-indigo-500/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
            isListening
              ? "bg-indigo-500 text-black shadow-[0_0_30px_rgba(129,140,248,0.5)]"
              : "text-indigo-200 hover:bg-indigo-500/20"
          }`}
        >
          <span
            className={`size-2 rounded-full transition ${
              isListening ? "bg-emerald-400" : "bg-indigo-400"
            }`}
          />
          {isListening ? "Listening" : "Prime Mic"}
        </button>
      </header>

      <div className="relative mb-4 flex flex-none items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-xs font-semibold text-white">
            AI
          </span>
          <div>
            <p className="font-medium text-white">{personaIndicator}</p>
            <p className="text-xs text-indigo-300/80">
              Aurora voice pipeline engaged • Quantum latency stable
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-[10px] uppercase tracking-[0.35em] text-indigo-200/80">
            Cognitive load
          </span>
          <span className="flex items-center gap-[3px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-2 w-4 rounded-sm transition ${
                  i < 3 ? "bg-indigo-400" : "bg-indigo-400/20"
                }`}
              />
            ))}
          </span>
        </div>
      </div>

      <div
        ref={transcriptRef}
        className="flex-1 space-y-4 overflow-y-auto pr-1 pt-1 text-sm"
      >
        {conversation.map((entry) => (
          <article
            key={entry.id}
            className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 ${
              entry.author === "jarvice"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                : "border-indigo-500/20 bg-indigo-500/10 text-indigo-100"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/70">
              <span>{entry.author === "jarvice" ? "Jarvice" : "Operator"}</span>
              <span>{entry.timestamp}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              {entry.message}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <div className="flex flex-wrap gap-2">
          {quickIntents.map((intent) => (
            <button
              key={intent}
              type="button"
              onClick={() => stageIntent(intent)}
              className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium tracking-wide text-indigo-200 transition hover:bg-indigo-500/20"
            >
              {intent}
            </button>
          ))}
        </div>
        <form
          className="flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-4 py-2"
          onSubmit={(event) => {
            event.preventDefault();
            submitMessage(draft);
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Transmit a directive to Jarvice…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="group relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.3em] text-zinc-400 transition hover:bg-white/15"
              onClick={() => setIsListening((state) => !state)}
            >
              <span
                className={`absolute inset-0 rounded-full blur-lg transition ${
                  isListening ? "bg-indigo-500/40" : "bg-transparent"
                }`}
              />
              <span className="relative">Mic</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_15px_40px_-18px_rgba(129,140,248,0.8)] transition hover:brightness-110"
            >
              Dispatch
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
