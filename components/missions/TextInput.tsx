export default function TextInput({ block }: any) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {block.items?.map((item: any) => (
        <div key={item.id}>
          <p>{item.prompt}</p>
          <input type="text" />
        </div>
      ))}
    </div>
  );
}