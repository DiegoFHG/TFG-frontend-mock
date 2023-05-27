import http from "@/lib/http"
import DataTableContainer from "@/components/data-table-container"
import { cols } from "./absences-columns"

async function getAbsences() {
  const data = await (await http('/absences?limit=10', {
    cache: 'no-store'
  })).json()

  return data
}

export default async function Page() {
  const { data, total } = await getAbsences()

  return <div>
    <h1 className="mb-10 text-3xl">Ausencias</h1>
    <DataTableContainer url="/absences" cols={cols} data={data} totalCount={total} limit={10} />
  </div>
}