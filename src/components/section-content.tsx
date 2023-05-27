export default function SectionContent({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-flow-row grid-cols-3">
    {children}
  </div>
}