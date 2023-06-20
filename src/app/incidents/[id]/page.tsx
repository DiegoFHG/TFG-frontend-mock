import { Card, CardContent } from "@/components/card";
import TextLabel from "@/components/text-label";
import http from "@/lib/http";

async function getIncident(id: string) {
  const data = await (
    await http(`/incidents/${id}`, { cache: "no-store" })
  ).json();

  return data;
}

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
  const incident = await getIncident(id);
  const person = await getPerson(incident.person);

  return (
    <div>
      <h1 className="mb-10 text-3xl">Incidente</h1>
      <Card>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-3 gap-5 pt-3">
            <TextLabel
              label="Persona"
              text={`${person.name} ${person.lastName}`}
            />
            <TextLabel label="Tipo" text={incident.type} />
            <TextLabel label="Fecha inicio" text={incident.startDate} />
            <TextLabel label="Fecha fin" text={incident.endDate} />
            <TextLabel label="Hora inicio" text={incident.startHour} />
            <TextLabel label="Hora fin" text={incident.endHour} />
            <TextLabel label="Descripción" text={incident.description} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
