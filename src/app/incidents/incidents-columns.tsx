"use client";

import { Button } from "@/components/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

export type PermitCasualtyPerson = {
  id: string;
  name: string;
  lastName: string;
};

export type Incident = {
  id: string;
  person: string;
  type: string;
  description: string;
  severity: number;
  notes: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
};

export const cols: ColumnDef<Incident>[] = [
  {
    accessorKey: "person.name",
    header: "Nombre",
  },
  {
    accessorKey: "person.lastName",
    header: "Apellidos",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "startDate",
    header: "Fecha inicio",
  },
  {
    accessorKey: "endDate",
    header: "Fecha fin",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const incident = row.original;

      return (
        <div className="space-x-1">
          <Link href={`/incidents/${incident.id}`}>
            <Button variant="ghost">
              <GrView />
            </Button>
          </Link>
          <Link href={`/incidents/${incident.id}/edit`}>
            <Button variant="ghost">
              <FaPencilAlt />
            </Button>
          </Link>
          <Button variant="ghost">
            <MdDelete />
          </Button>
        </div>
      );
    },
  },
];
