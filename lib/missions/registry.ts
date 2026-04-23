// lib/missions/registry.ts

import type { MissionDefinition } from "@/lib/missions/types";

import { MISSIONS_BASICO_1 } from "@/config/missions/basico_1";
import { MISSIONS_BASICO_2 } from "@/config/missions/basico_2";
import { MISSIONS_BASICO_3 } from "@/config/missions/basico_3";
import { MISSIONS_BASICO_4 } from "@/config/missions/basico_4";
import { MISSIONS_BASICO_5 } from "@/config/missions/basico_5";
import { MISSIONS_BASICO_6 } from "@/config/missions/basico_6";
import { MISSIONS_BASICO_7 } from "@/config/missions/basico_7";
import { MISSIONS_BASICO_8 } from "@/config/missions/basico_8";

import { MISSIONS_INTERMEDIO_1 } from "@/config/missions/intermedio_1";
import { MISSIONS_INTERMEDIO_2 } from "@/config/missions/intermedio_2";
import { MISSIONS_INTERMEDIO_3 } from "@/config/missions/intermedio_3";
import { MISSIONS_INTERMEDIO_4 } from "@/config/missions/intermedio_4";
import { MISSIONS_INTERMEDIO_5 } from "@/config/missions/intermedio_5";
import { MISSIONS_INTERMEDIO_6 } from "@/config/missions/intermedio_6";
import { MISSIONS_INTERMEDIO_7 } from "@/config/missions/intermedio_7";
import { MISSIONS_INTERMEDIO_8 } from "@/config/missions/intermedio_8";

export const MISSION_CONFIGS: Record<
  string,
  Record<string, MissionDefinition>
> = {
  basico_1: MISSIONS_BASICO_1 as Record<string, MissionDefinition>,
  basico_2: MISSIONS_BASICO_2 as Record<string, MissionDefinition>,
  basico_3: MISSIONS_BASICO_3 as Record<string, MissionDefinition>,
  basico_4: MISSIONS_BASICO_4 as Record<string, MissionDefinition>,
  basico_5: MISSIONS_BASICO_5 as Record<string, MissionDefinition>,
  basico_6: MISSIONS_BASICO_6 as Record<string, MissionDefinition>,
  basico_7: MISSIONS_BASICO_7 as Record<string, MissionDefinition>,
  basico_8: MISSIONS_BASICO_8 as Record<string, MissionDefinition>,

  intermedio_1: MISSIONS_INTERMEDIO_1 as Record<string, MissionDefinition>,
  intermedio_2: MISSIONS_INTERMEDIO_2 as Record<string, MissionDefinition>,
  intermedio_3: MISSIONS_INTERMEDIO_3 as Record<string, MissionDefinition>,
  intermedio_4: MISSIONS_INTERMEDIO_4 as Record<string, MissionDefinition>,
  intermedio_5: MISSIONS_INTERMEDIO_5 as Record<string, MissionDefinition>,
  intermedio_6: MISSIONS_INTERMEDIO_6 as Record<string, MissionDefinition>,
  intermedio_7: MISSIONS_INTERMEDIO_7 as Record<string, MissionDefinition>,
  intermedio_8: MISSIONS_INTERMEDIO_8 as Record<string, MissionDefinition>,
};