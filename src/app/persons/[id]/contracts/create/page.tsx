"use client";

import { Card, CardContent } from "@/components/card";
import {
  CommercialContract,
  LaboralContract,
  agreements,
  categories,
  commercialContractModalities,
  entities,
  locations,
  modalities,
  schedules,
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
import { useForm } from "react-hook-form";
import { dedicationOptions } from "../../page";
import { Button } from "@/components/button";
import React from "react";

const contractTypes = {
  0: "Contrato laboral",
  1: "Contrato comercial",
  2: "Nombramiento Ad Honorem",
  3: "Beca colaboración",
  4: "Beca doctorado",
  5: "Estancia profesorado",
  6: "Estancia investigación",
};

export default function Page() {
  const [selectedContractType, setSelectedContractType] = useState<
    string | null
  >(null);
  const laboralContractForm = useForm<LaboralContract>();
  const commercialContractForm = useForm<CommercialContract>();

  function renderContract() {
    if (selectedContractType === null) return null;

    if (parseInt(selectedContractType) === 0) {
      const form = laboralContractForm;
      const agreement = form.watch("collectiveAgreement");

      return (
        <Form {...form}>
          <form>
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
          <form>
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
                        {Object.entries(commercialContractModalities).map(([key, value]) => (
                          <SelectItem
                            key={`commercial-contract-modalities-${key}`}
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
          </form>
        </Form>
      );
    }

    if (Number(selectedContractType) === 2) {
    }

    if (Number(selectedContractType) === 3) {
    }

    if (Number(selectedContractType) === 4) {
    }

    if (Number(selectedContractType) === 5) {
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
          <div className="flex justify-end">
            <Button>Crear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
