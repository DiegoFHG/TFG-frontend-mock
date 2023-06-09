"use client";

import PermitCasualtyPerson from "../incidents/page";

import { ColumnDef } from "@tanstack/react-table";
import { GrView } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/button";
import Link from "next/link";

export type Absence = {
  id: string
  person: string;
  type: string;
  name: string;
  description: string;
  severity: number;
  notes: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
};

export const cols: ColumnDef<Absence>[] = [
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
      const absence = row.original
      
      return (
        <div className="space-x-1">
          <Link href={`/absences/${absence.id}`}>
            <Button variant="ghost">
              <GrView />
            </Button>
          </Link>
          <Link href={`/absences/${absence.id}/edit`}>
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
