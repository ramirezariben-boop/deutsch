export default function GridQuestion({ data }: any) {
  return (
    <div>
      <h2>{data.pregunta}</h2>

      {data.items.map((item: any) => (
        <div key={item.id}>
          <strong>{item.label}</strong>

          <select>
            <option value="">--</option>

            {data.opciones.map((op: string) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}