"use client";

import { Card, CardContent } from "@/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import PersonSection from "@/components/person-section";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Switch } from "@/components/switch";
import {
  useForm,
  SubmitHandler,
  useWatch,
  useFieldArray,
} from "react-hook-form";
import {
  dedicationOptions,
  degreeTypes,
  evaluationTypes,
  professionalDepartments,
  professionalFaculties,
  professionalTypes,
  titulationOptions,
} from "../[id]/page";
import React from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/button";
import { GrAdd } from "react-icons/gr";
import http from "@/lib/http";

type FormInputs = {
  name: string;
  lastName: string;
  idDocument: string;
  partnerIdDocument: string;
  socialSecurity: string;
  nationality: string;
  dateOfBirth: string;
  sex: string;
  discapacityLevel: string;
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
  civilState: string;
  degrees: [{ type: string; name: string; date: string }];
  academics: {
    maximumStudies: string;
    accreditationAgency: string;
    dedication: string;
    titulation: string;
  };
  accreditations: [
    {
      evaluationType: string;
      accreditationAgency: string;
      accreditation: string;
      startDate: string;
      endDate: string;
      date: string;
    }
  ];
  professionalInfo: {
    type: string;
    department: string;
    faculty: string;
    field: string;
    area: string[];
    code: string[];
    position: string;
  };
  type: number;
};

export default function Page() {
  const form = useForm<FormInputs>({
    defaultValues: {
      discapacityNeedsHelp: false,
      degrees: [{ type: "", name: "", date: "" }],
      accreditations: [
        {
          evaluationType: "",
          accreditationAgency: "",
          accreditation: "",
          startDate: "",
          endDate: "",
          date: "",
        },
      ],
    },
  });
  const civilState = useWatch({
    name: "civilState",
    control: form.control,
  });
  const degrees = useFieldArray({
    name: "degrees",
    control: form.control,
  });
  const accreditations = useFieldArray({
    name: "accreditations",
    control: form.control,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (
    data: FormInputs,
    e: any
  ) => {
    e.preventDefault();
    const { academics, degrees, accreditations, professionalInfo, ...rest } = data;
    const formDataPerson = new FormData();
    for (const key in rest) {
      formDataPerson.append(key, rest[key]);
    }

    const createPerson = await (await http("/persons", { method: "POST", body: formDataPerson })).json();
  };

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar persona</h1>
      <Card>
        <CardContent>
          <PersonSection title="Datos personales" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idDocument"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Documento de identidad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialSecurity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Numero de seguridad social</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nacionalidad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Masculino</SelectItem>
                            <SelectItem value="1">Femenino</SelectItem>
                            <SelectItem value="2">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discapacityLevel"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>% de discapacidad</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Ninguna</SelectItem>
                            <SelectItem value="33">
                              &gt;= 33% & &lt; 65%
                            </SelectItem>
                            <SelectItem value="65">&gt;= 65%</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discapacityNeedsHelp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Discapacidad necesita ayuda</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <PersonSection title="Datos de contacto" />
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="line"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Código postal</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Provincia</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobilePhoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Numero Movil</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Numero fijo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email personal</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="institutionalEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email institucional</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <PersonSection title="Situación familiar" />
              <div>
                <FormField
                  control={form.control}
                  name="civilState"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel>
                              Soltero/a, viudo/a, divorciado/a o separado/a
                              legalmente con hijos solteros menores de 18 años o
                              incapacitados judicialmente y sometidos a patria
                              potestad prorrogada o rehabilitada que conviven
                              exclusivamente con Vd. sin convivir también con el
                              otro progenitor, siempre que proceda consignar al
                              menos un hijo o descendiente en el apartado de
                              este documento.
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel>
                              Casado/a y no separado/a legalmente cuyo cónyuge
                              no obtiene rentas superiores a 1.500 euros
                              anuales, excluidas las extentas.
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel>
                              Situación familiar distinta de las dos anteriores
                              (solteros sin hijos, casados cuyo cónyuge obtiene
                              rentas superiores a 1.500 euros anuales, ... etc.)
                              <br />
                              (Marque también esta casilla si no desea
                              manifestar su situación familiar)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {parseInt(civilState) === 2 ? (
                  <FormField
                    control={form.control}
                    name="partnerIdDocument"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIF cónyuge</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : null}
              </div>
              <PersonSection title="Datos académicos" />
              <div className="grid grid-flow-row grid-cols-3 mb-3 gap-5">
                <FormField
                  control={form.control}
                  name="academics.maximumStudies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Maxima categoría de estudios cursados
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="academics.accreditationAgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agencia acreditadora</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="academics.dedication"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dedicación</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(dedicationOptions).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`dedication-type-${key}`}
                                  value={key}
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="academics.titulation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Titulación</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(titulationOptions).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`titulation-type-${key}`}
                                  value={key}
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mb-4">
                <h2 className="text-xl">Titulaciones</h2>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    degrees.append({
                      type: "",
                      date: "",
                      name: "",
                    })
                  }
                >
                  <GrAdd />
                </Button>
              </div>
              {degrees.fields.map((field, index) => (
                <div className="flex justify-between" key={field.id}>
                  <div className="grid grid-flow-row grid-cols-3 gap-5 mb-3 w-full">
                    <FormField
                      control={form.control}
                      name={`degrees.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tipo</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(degreeTypes).map(
                                  ([key, value]) => (
                                    <SelectItem
                                      key={`degree-type-${key}`}
                                      value={key}
                                    >
                                      {value}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`degrees.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`degrees.${index}.date`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => degrees.remove(index)}
                    className="self-center"
                  >
                    <MdDelete />
                  </Button>
                </div>
              ))}
              <div className="flex justify-between mb-4">
                <h2 className="text-xl">Acreditaciones</h2>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    accreditations.append({
                      evaluationType: "",
                      accreditation: "",
                      accreditationAgency: "",
                      date: "",
                      endDate: "",
                      startDate: "",
                    })
                  }
                >
                  <GrAdd />
                </Button>
              </div>

              {accreditations.fields.map((field, index) => (
                <div className="flex justify-between mb-10" key={field.id}>
                  <div className="grid grid-flow-row grid-cols-3 gap-5 w-full">
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.evaluationType`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Evaluación profesorado</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(evaluationTypes).map(
                                  ([key, value]) => (
                                    <SelectItem
                                      key={`evaluation-type-${key}`}
                                      value={key}
                                    >
                                      {value}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.accreditationAgency`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Agencia acreditante</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.accreditation`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Acreditación o reconocimiento</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Año inicio</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Año fin</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`accreditations.${index}.date`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Concedido el</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => accreditations.remove(index)}
                    className="self-center"
                  >
                    <MdDelete />
                  </Button>
                </div>
              ))}
              <PersonSection title="Datos profesionales" />
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name={`professionalInfo.type`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(professionalTypes).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`professional-type-${key}`}
                                  value={key}
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`professionalInfo.department`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(professionalDepartments).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`professional-department-type-${key}`}
                                  value={key}
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`professionalInfo.faculty`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Facultad</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(professionalFaculties).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`professional-faculty-type-${key}`}
                                  value={key}
                                >
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button>Crear</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
