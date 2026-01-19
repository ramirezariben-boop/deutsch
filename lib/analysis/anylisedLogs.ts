export default function analyzeLogs(logs, finalText) {
  const start = logs[0]?.t ?? 0;
  const end = logs.at(-1)?.t ?? start;

  const durationMs = end - start;
  const duration = Math.round(durationMs / 60000);

  let size = 0;
  const timeline = [];

  let pastes = 0;
  let undos = 0;
  let awayTime = 0;

  logs.forEach((e) => {
    if (e.type === "input") size += e.diff;
    if (e.type === "paste") {
      size += (e.pasted?.length || 0);
      pastes++;
    }
    if (e.type === "undo") undos++;
    if (e.type === "away-time") awayTime += e.ms;

    timeline.push({ t: e.t, size });
  });

  // puntuación de sospecha
  let suspicion = 0;

  if (pastes > 0) suspicion += 30;
  if (undos === 0 && finalText.split(" ").length > 150) suspicion += 15;
  if (awayTime > 30000) suspicion += 10;

  // saltos grandes en el timeline
  for (let i = 1; i < timeline.length; i++) {
    const dif = timeline[i].size - timeline[i - 1].size;
    if (dif > 40) suspicion += 30;
  }

  return {
    duration,
    wordCount: finalText.split(/\s+/).length,
    pastes,
    undos,
    awayTime: Math.round(awayTime / 1000),
    suspicionScore: Math.min(suspicion, 100),
    timeline,
  };
}
