import { DataTable } from "@/components/data-table"
import DataTableContainer from "@/components/data-table-container"
import http from "@/lib/http"
import { ColumnDef } from "@tanstack/react-table"

export type PermitCasualtyPerson = {
  id: string
  name: string
  lastName: string
}

export type Incident = {
  person: PermitCasualtyPerson
  type: string
  description: string
  severity: number
  notes: string
  startDate: Date
  endDate: Date
  startHour: string
  endHour: string
}

const cols: ColumnDef<Incident>[] = [
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
  },
]

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