"use client";

import { GrView } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/button";
import Link from "next/link";
import { dedicationOptions, degreeTypes, evaluationTypes, maximumStudiesCategories, professionalDepartments, professionalFaculties, professionalFields, professionalTypes, titulationOptions } from "./persons/[id]/page";

export type Ascendant = {
  id: string;
  name: string;
  dateOfBirth: Date;
  discapacity: number;
  discapacityNeedsHelp: boolean;
  uniqueConvivence: boolean;
};

export type Descendant = {
  id: string;
  name: string;
  dateOfBirth: Date;
  discapacity: number;
  discapacityNeedsHelp: boolean;
  uniqueConvivence: boolean;
  adopted: boolean;
};

export type Degree = {
  id: string
  type: keyof typeof degreeTypes
  name: string
  date: Date
}

export type Accreditation = {
  id: string
  evaluationType: keyof typeof evaluationTypes
  accreditationAgency: string
  accreditation: string
  startDate: Date
  endDate: Date
  date: Date
}

export type Academics = {
  maximumStudies: keyof typeof maximumStudiesCategories;
  accreditationAgency: string;
  dedication: keyof typeof dedicationOptions;
  titulation: keyof typeof titulationOptions;
  degrees: Degree[]
  accreditations: Accreditation[]
};

export type ProfessionalInfo = {
  type: keyof typeof professionalTypes
  department: keyof typeof professionalDepartments
  faculty: keyof typeof professionalFaculties
  field: string
  area: string[]
  code: string[]
  position: string
}

export type Person = {
  id: string;
  name: string;
  lastName: string;
  idDocument: string;
  partnerIdDocument: string;
  socialSecurity: string;
  nationality: string;
  dateOfBirth: Date;
  sex: boolean;
  discapacityLevel: number;
  discapacityNeedsHelp: boolean;
  line: string;
  city: string;
  division: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  mobilePhoneNumber: string;
  personalEmail: string;
  institutionalEmail: string;
  civilState: number;
  type: number;
  academics: Academics;
  ascendents: Ascendant[];
  descendents: Descendant[];
  professional: ProfessionalInfo 
};

export const cols: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Nombre",
  },
  {
    accessorKey: "idDocument",
    header: "Documento de identidad",
  },
  {
    accessorKey: "institutionalEmail",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;

      return (
        <div className="space-x-1">
          <Link href={`/persons/${person.id}`}>
            <Button variant="ghost">
              <GrView />
            </Button>
          </Link>
          <Link href={`/persons/${person.id}/edit`}>
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
