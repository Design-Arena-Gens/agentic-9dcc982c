import { AutomationMatrix } from "@/components/AutomationMatrix";
import { CapabilityMatrix } from "@/components/CapabilityMatrix";
import { CommandConsole } from "@/components/CommandConsole";
import { DeviceGrid } from "@/components/DeviceGrid";
import { HeroHeader } from "@/components/HeroHeader";
import { MissionLogPanel } from "@/components/MissionLog";
import { automations, capabilities, devices, missionLogs } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 py-10 text-white">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <HeroHeader />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <CommandConsole />
          <div className="flex flex-col gap-8">
            <DeviceGrid devices={devices} />
            <MissionLogPanel logs={missionLogs} />
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <AutomationMatrix automations={automations} />
          <CapabilityMatrix capabilities={capabilities} />
        </div>
      </main>
    </div>
  );
}
