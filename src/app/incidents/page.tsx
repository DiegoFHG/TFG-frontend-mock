import DataTableContainer from "@/components/data-table-container";
import http from "@/lib/http";
import { cols } from "./incidents-columns";
import { GrAdd } from "react-icons/gr";
import { Button } from "@/components/button";
import Link from "next/link";

async function getIncidents() {
  const data = await (
    await http("/incidents?limit=10", { cache: "no-store" })
  ).json();

  return data;
}

export default async function Page() {
  const { data, total } = await getIncidents();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-10 text-3xl">Incidentes</h1>
        <Link href="/incidents/add">
          <Button variant="ghost">
            <GrAdd />
          </Button>
        </Link>
      </div>
      <DataTableContainer
        url="/incidents"
        cols={cols}
        data={data}
        totalCount={total}
        limit={10}
      />
    </div>
  );
}
