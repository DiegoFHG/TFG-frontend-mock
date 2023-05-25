import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import http from "@/lib/http"
import DataTableContainer from "@/components/data-table-container"

export type Person = {
  id: string
  name: string
  lastName: string
  idDocument: string
  socialSecurity: string
  nationality: string
  dateOfBirth: Date
  sex: boolean
  discapacityLevel: number
  discapacityNeedsHelp: boolean
  line: string
  city: string
  division: string
  country: string
  postalCode: string
  phoneNumber: string
  mobilePhoneNumber: string
  personalEmail: string
  institutionalEmail: string
  civilState: number
  type: number
}

const cols: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'lastName',
    header: 'Nombre'
  },
  {
    accessorKey: 'idDocument',
    header: 'Documento de identidad'
  },
  {
    accessorKey: 'institutionalEmail',
    header: 'Email'
  }
]

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