import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { PermitCasualtyPerson } from "../incidents/page"
import http from "@/lib/http"
import DataTableContainer from "@/components/data-table-container"

export type Absence = {
  person: PermitCasualtyPerson
  type: string
  name: string
  description: string
  severity: number
  notes: string
  startDate: Date
  endDate: Date
  startHour: string
  endHour: string
}

const cols: ColumnDef<Absence>[] = [
  {
    accessorKey: "person.name",
    header: "Nombre"
  },
  {
    accessorKey: "person.lastName",
    header: "Apellidos"
  },
  {
    accessorKey: "type",
    header: "Tipo"
  },
  {
    accessorKey: "startDate",
    header: "Fecha inicio"
  },
  {
    accessorKey: "endDate",
    header: "Fecha fin"
  }
]

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