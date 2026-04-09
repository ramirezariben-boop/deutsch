// components/missions/MissionRenderer.tsx
import InputQuestion from "@/components/missions/types/InputQuestion";
import GridQuestion from "@/components/missions/types/GridQuestion";
import CheckboxGridQuestion from "@/components/missions/types/CheckboxGridQuestion";

type Props = {
  mission: any;
  answers: Record<string, string>;
  onAnswer: (pregunta: string, respuesta: string) => void;
};

export default function MissionRenderer({ mission, answers, onAnswer }: Props) {
  if (!mission?.blocks) return null; 

  return (
    <div>
      <h1 style={{ color: "#4dff91", fontFamily: "monospace", fontSize: "16px", letterSpacing: "2px", marginBottom: "1.5rem" }}>
        {mission.title}
      </h1>
      {mission.blocks.map((block: any) => {
        switch (block.type) {
          case "text":
            return (
              <InputQuestion
                key={block.id}
                preguntas={[block.prompt]}
                answers={answers}
                onAnswer={onAnswer}
              />
            );
          case "grid":
            return (
              <GridQuestion
                key={block.id}
                data={block}
                answers={answers}
                onAnswer={onAnswer}
              />
            );
          case "checkbox_grid":
            return (
              <CheckboxGridQuestion
                key={block.id}
                data={block}
                answers={answers}
                onAnswer={onAnswer}
              />
            );
          default:
            return <div key={block.id} style={{ color: "#555" }}>Tipo no soportado: {block.type}</div>;
        }
      })}
    </div>
  );
}