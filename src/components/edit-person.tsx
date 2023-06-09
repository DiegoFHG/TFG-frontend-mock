"use client";

import { Card, CardContent } from "@/components/card";
import PersonSection from "@/components/person-section";
import { FormInputs } from "@/app/persons/add/page";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import {
  dedicationOptions,
  maximumStudiesCategories,
  professionalDepartments,
  professionalFaculties,
  professionalTypes,
  titulationOptions,
} from "@/app/persons/[id]/page";
import { Button } from "@/components/button";
import { Switch } from "@/components/switch";
import http from "@/lib/http";
import { toast } from '@/components/use-toast'

export default function EditPerson({ defaultValues }: { defaultValues: any }) {
  const newDefaultValues = { ...defaultValues };
  const form = useForm<FormInputs>({
    defaultValues: newDefaultValues,
  });
  const civilState = useWatch({
    name: "civilState",
    control: form.control,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (
    data: FormInputs,
    e: any
  ) => {
    e.preventDefault();
    console.log(data)
    const { academics, degrees, accreditations, professionalInfo, ...rest } =
      data;
    const formDataPerson = new FormData();
    const formDataProfessional = new FormData()
    for (const key in rest) {
      if (rest[key] !== undefined) formDataPerson.append(key, rest[key]);
    }
    for (const key in professionalInfo) {
      if (rest[key] !== undefined) formDataProfessional.append(key, rest[key]);
    }

    const [person, academic, professional] = await Promise.all([
      http(`/persons/${newDefaultValues.id}`, {
        method: "PATCH",
        body: formDataPerson,
      }),
      http(`/persons/${newDefaultValues.id}/academics`, {
        method: "PATCH",
        body: JSON.stringify(academics),
      }),
      http(`/persons/${newDefaultValues.id}/professional`, {
        method: "PATCH",
        body: formDataProfessional,
      }),
    ]);

    if (person.status === 200) {
      toast({ title: 'Éxito!', description: 'Datos personales actualizados' })
    }

    if (academic.status === 200) {
      toast({ title: 'Éxito!', description: 'Datos académicos actualizados' })
    }

    if (professional.status === 200) {
      toast({ title: 'Éxito!', description: 'Datos profesionales actualizados' })
    }
  };

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Editar persona</h1>
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
                          defaultValue={field.value?.toString() ?? null}
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
                          defaultValue={field.value?.toString() ?? null}
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
                          checked={field.value ?? false}
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
                          defaultValue={field.value?.toString() ?? null}
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(maximumStudiesCategories).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`maximum-category-studies-${key}`}
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
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

              <PersonSection title="Datos profesionales" />
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name={`professionalInfo.type`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() ?? null}
                        >
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
              <Button>Actualizar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
