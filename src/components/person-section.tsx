export default function PersonSection({ title } : { title: string }) {
  return <div>
    <h2 className="mb-3 text-xl font-bold">{title}</h2>
    <hr className="mb-3" />
  </div>
}