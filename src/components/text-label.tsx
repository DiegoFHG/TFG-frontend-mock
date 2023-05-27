export default function TextLabel({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="flex flex-col mb-3">
      <label className="font-bold">{label}</label>
      <span>{text ? text : 'N/A'}</span>
    </div>
  );
}
