import http from "@/lib/http"
import DataTableContainer from "@/components/data-table-container"
import { cols } from "./person-columns"

async function getPersons() {
  const data = await (await http('/persons?limit=10', { cache: 'no-store'})).json()

  return data
}

export default async function Page() {
  const { data, total } = await getPersons()

  return <div>
    <h1 className="mb-10 text-3xl">Personas</h1>
    <DataTableContainer url="/persons" cols={cols} data={data} totalCount={total} limit={10} />
  </div>
}