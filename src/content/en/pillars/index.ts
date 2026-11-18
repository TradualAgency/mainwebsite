import type { PillarCopy, PillarId } from "../../types";
import { agenticCommerceCopy } from "./agentic-commerce";
import { aiAgentsCopy } from "./ai-agents";

// Copy per pijler staat in een eigen bestand, zodat aan elke pijlerpagina los gewerkt kan
// worden. Paden, iconen en beelden staan in src/content/shared/services.ts.
export const pillarsCopy: Record<PillarId, PillarCopy> = {
  "agentic-commerce": agenticCommerceCopy,
  "ai-agents": aiAgentsCopy,
};
