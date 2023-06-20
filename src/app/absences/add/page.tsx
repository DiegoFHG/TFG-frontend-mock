import http from "@/lib/http";
import CreateAbsence from "@/components/create-absence";

async function getPersons() {
  const { data } = await (await http('/persons?limit=0', { cache: 'no-store' })).json()

  return data
}

export default async function Page() {
  const persons = await getPersons()

  return <CreateAbsence persons={persons} />; }