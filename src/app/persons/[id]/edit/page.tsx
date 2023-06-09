import EditPerson from "@/components/edit-person";
import http from "@/lib/http";

async function getPerson(id: string) {
  const data = await (
    await http(`/persons/${id}`, { cache: "no-store" })
  ).json();

  return data;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getPerson(id);

  return <EditPerson defaultValues={data} />
}
