import http from "@/lib/http"
import DataTableContainer from "@/components/data-table-container"
import { cols } from "./person-columns"
import { Button } from "@/components/button"
import { GrAdd } from "react-icons/gr"
import Link from "next/link"

async function getPersons() {
  const data = await (await http('/persons?limit=10', { cache: 'no-store'})).json()

  return data
}

export default async function Page() {
  const { data, total } = await getPersons()

  return <div>
    <div className="flex justify-between">
      <h1 className="mb-10 text-3xl">Personas</h1>
      <Link href="/persons/add"><Button variant="ghost"><GrAdd /></Button></Link>
    </div>
    <DataTableContainer url="/persons" cols={cols} data={data} totalCount={total} limit={10} />
  </div>
}