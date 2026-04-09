export function buildMissionFromMapeo(mapeo: string[]) {
  return {
    title: "Misión",
    blocks: [
      {
        id: "block-1",
        type: "text",
        preguntas: mapeo
      }
    ]
  };
}