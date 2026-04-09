import InputQuestion from "@/components/missions/types/InputQuestion";
import GridQuestion from "@/components/missions/types/GridQuestion";

type Props = {
  mission: any;
  answers: Record<string, string>;
  onAnswer: (pregunta: string, respuesta: string) => void;
};

export default function MissionRenderer({ mission, answers, onAnswer }: Props) {
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
                preguntas={block.preguntas}
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
          default:
            return <div key={block.id} style={{ color: "#555" }}>Tipo no soportado: {block.type}</div>;
        }
      })}
    </div>
  );
}