import DataTableContainer from "@/components/data-table-container"
import http from "@/lib/http"
import { cols } from "./incidents-columns"

async function getIncidents() {
  const data = await (await http('/incidents?limit=10', { cache: 'no-store' })).json()
  
  return data
}

export default async function Page() {
  const { data, total } = await getIncidents()
  
  return <div>
    <h1 className="mb-10 text-3xl">Incidentes</h1>
    <DataTableContainer url="/incidents" cols={cols} data={data} totalCount={total} limit={10} />
  </div>
}