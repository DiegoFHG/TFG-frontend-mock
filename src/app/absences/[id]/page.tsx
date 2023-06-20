import { Card, CardContent } from "@/components/card";
import TextLabel from "@/components/text-label";
import http from "@/lib/http";

async function getAbsence(id: string) {
  const data = await (
    await http(`/absences/${id}`, { cache: "no-store" })
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
  const absence = await getAbsence(id);
  const person = await getPerson(absence.person);

  return (
    <div>
      <h1 className="mb-10 text-3xl">Ausencia</h1>
      <Card>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-3 gap-5 pt-3">
            <TextLabel
              label="Persona"
              text={`${person.name} ${person.lastName}`}
            />
            <TextLabel label="Tipo" text={absence.type} />
            <TextLabel label="Fecha inicio" text={absence.startDate} />
            <TextLabel label="Fecha fin" text={absence.endDate} />
            <TextLabel label="Hora inicio" text={absence.startHour} />
            <TextLabel label="Hora fin" text={absence.endHour} />
            <TextLabel label="Descripción" text={absence.description} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
