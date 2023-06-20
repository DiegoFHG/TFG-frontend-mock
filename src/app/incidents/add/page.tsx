import http from "@/lib/http";
import CreateIncident from "@/components/create-incident";

async function getPersons() {
  const { data } = await (await http('/persons?limit=0', { cache: 'no-store' })).json()

  return data
}

export default async function Page() {
  const persons = await getPersons()

  return <CreateIncident persons={persons} />;
}
