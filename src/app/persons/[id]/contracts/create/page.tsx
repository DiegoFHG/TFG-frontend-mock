"use client";

import { Card, CardContent } from "@/components/card";
import {
  CommercialContract,
  LaboralContract,
  AdHonoremContract,
  agreements,
  categories,
  commercialContractModalities,
  entities,
  locations,
  modalities,
  schedules,
  InternshipContract,
  levels,
  StayContract,
  TrialPeriod,
} from "@/components/contract";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Select } from "@radix-ui/react-select";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { dedicationOptions, titulationOptions } from "../../page";
import { Button } from "@/components/button";
import React from "react";
import { Switch } from "@/components/switch";
import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/use-toast";

const contractTypes = {
  0: "Contrato laboral",
  1: "Contrato comercial",
  2: "Nombramiento Ad Honorem",
  3: "Beca colaboración",
  4: "Beca doctorado",
  5: "Estancia profesorado",
  6: "Estancia investigación",
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [selectedContractType, setSelectedContractType] = useState<
    string | null
  >(null);
  const laboralContractForm = useForm<LaboralContract>({
    defaultValues: {
      undefinedEndDate: false
    }
  });
  const commercialContractForm = useForm<CommercialContract>();
  const adHonoremContractFrom = useForm<AdHonoremContract>();
  const colaborationInternshipContractForm = useForm<InternshipContract>();
  const phdInternshipContractForm = useForm<InternshipContract>();
  const stayContractForm = useForm<StayContract>();
  const investigationContractForm = useForm<StayContract>();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<
    | StayContract
    | LaboralContract
    | CommercialContract
    | InternshipContract
    | AdHonoremContract
  > = async (
    data:
      | StayContract
      | LaboralContract
      | CommercialContract
      | InternshipContract
      | AdHonoremContract,
    e: any
  ) => {
    e.preventDefault();
    if (selectedContractType !== null) {
      if (selectedContractType) {
        const newData = data as LaboralContract;

        newData.trialPeriod = [
          (newData.trialPeriod as TrialPeriod).start,
          (newData.trialPeriod as TrialPeriod).end,
        ];
      }

      const formDataContract = new FormData();
      formDataContract.append("person", id);
      formDataContract.append("contractType", selectedContractType);
      formDataContract.append("contract", JSON.stringify(data));

      const createContract = await http("/contracts", {
        method: "POST",
        body: formDataContract,
      });

      if (createContract.status === 200) {
        router.push(`/persons/${id}`);
      }

      if (createContract.status === 400) {
        toast({
          title: "Error!",
          description:
            "Los datos no están en el formato requerido o hay datos faltantes",
        });
      }
    }
  };

  function renderContract() {
    if (selectedContractType === null) return null;

    if (parseInt(selectedContractType) === 0) {
      const form = laboralContractForm;
      const agreement = form.watch("collectiveAgreement");

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="entity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Entidad contratante</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(entities).map(([key, value]) => (
                            <SelectItem
                              key={`contract-entities-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Modalidad de contrato</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(modalities).map(([key, value]) => (
                            <SelectItem
                              key={`laboral-contract-modalities-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jornada</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(schedules).map(([key, value]) => (
                            <SelectItem
                              key={`laboral-contract-schedules-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dedication"
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
                                key={`laboral-contract-dedications-${key}`}
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
                name="collectiveAgreement"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Convenio de aplicación</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(agreements).map(([key, value]) => (
                            <SelectItem
                              key={`laboral-contract-agreements-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={agreement === undefined}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {agreement !== undefined
                            ? Object.entries(categories[agreement]).map(
                                ([key, value]) => (
                                  <SelectItem
                                    key={`laboral-contract-categories-${key}`}
                                    value={key}
                                  >
                                    {value}
                                  </SelectItem>
                                )
                              )
                            : null}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="professionalGroup"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grupo profesional</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Centro de trabajo</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(locations).map(([key, value]) => (
                            <SelectItem
                              key={`laboral-contract-locations-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha inicio</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha fin</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trialPeriod.start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio periodo de prueba</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trialPeriod.end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Final periodo de prueba</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="anualRetribution.amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retribución (€)</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="undefinedEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Contrato indefinido</FormLabel>
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
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 1) {
      const form = commercialContractForm;
      const modality = form.watch("modality");

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="modality"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <FormLabel>Modalidad</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(commercialContractModalities).map(
                          ([key, value]) => (
                            <SelectItem
                              key={`commercial-contract-modalities-${key}`}
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
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="entity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entidad contratante</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro de trabajo</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="printDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha impresión</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de horas de la actividad</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materias a impartir</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe de la actividad</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              {Number(modality) === 1 ? (
                <React.Fragment>
                  <FormField
                    control={form.control}
                    name="societyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre sociedad</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyCif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CIF</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyRegisteredOffice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domicilio social</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyIncorporationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha constitución sociedad</FormLabel>
                        <Input {...field} type="date" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyConstitutionNotary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notario constitución</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyProtocolNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nº protocolo</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="societyCommercialRegistry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscripción registro mercantil</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              ) : null}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 2) {
      const form = adHonoremContractFrom;

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="governingCouncilDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha junta consejo de gobierno</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validityDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vigencia del nombramiento</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulación</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="governingCouncilDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha aceptación de nombramiento</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 3) {
      const form = colaborationInternshipContractForm;

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(levels).map(([key, value]) => (
                            <SelectItem
                              key={`internship-contract-levels-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titulation"
                render={({ field }) => (
                  <FormItem>
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
                                key={`internship-contract-titulations-${key}`}
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internshipAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe beca</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feeExemption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% exención de tasas</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residencyInternship"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Beca residencia</FormLabel>
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
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 4) {
      const form = phdInternshipContractForm;

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(levels).map(([key, value]) => (
                            <SelectItem
                              key={`internship-contract-levels-${key}`}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titulation"
                render={({ field }) => (
                  <FormItem>
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
                                key={`internship-contract-titulations-${key}`}
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internshipAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe beca</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feeExemption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% exención de tasas</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residencyInternship"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Beca residencia</FormLabel>
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
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 5) {
      const form = stayContractForm;

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="proccedenceEntity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entidad de procedencia</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsablePerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsable en el centro de acogida</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 6) {
      const form = investigationContractForm;

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="proccedenceEntity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entidad de procedencia</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsablePerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsable en el centro de acogida</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <Input {...field} type="date" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    return null;
  }

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar contrato a persona</h1>
      <Card>
        <CardContent className="p-5">
          <div className="mb-5">
            <Label className="mb-3">Tipo de contrato</Label>
            <Select
              onValueChange={(value: string) => setSelectedContractType(value)}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(contractTypes).map(([key, value]) => (
                  <SelectItem key={`contract-type-${key}`} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderContract()}
        </CardContent>
      </Card>
    </div>
  );
}
