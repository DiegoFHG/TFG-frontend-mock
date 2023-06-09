"use client";

import { Card, CardContent } from "@/components/card";
import {
  CommercialContract,
  LaboralContract,
  AdHonoremContract,
  agreements,
  categories,
  commercialContractModalities,
  locations,
  modalities,
  schedules,
  InternshipContract,
  // levels,
  StayContract,
} from "@/components/contract";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
// import {}
import { Label } from "@/components/label";
import { Checkbox } from "@/components/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Select } from "@radix-ui/react-select";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { dedicationOptions } from "../../page";
import { Button } from "@/components/button";
// import { Switch } from '@/components/switch'
import http from "@/lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/use-toast";
import { Ascendant, Descendant } from "@/app/person-columns";

const title = {
  ascendants: "Agregar ascendientes",
  descendants: "Agregar descendientes",
};

const discapacity = {
  0: "Ninguna",
  33: "Igual o superior al 33% e inferior al 65%",
  65: "Igual o superior al 65%",
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const ascendantForm = useForm<Ascendant>();
  const descendantForm = useForm<Descendant>();

  const router = useRouter();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const typeForm = searchParams.get("type");

  const onSubmit: SubmitHandler<Ascendant> = async (
    data: Ascendant | Descendant,
    e: any
  ) => {
    e.preventDefault();

    // const formDataFamily = new FormData()
    // formDataFamily.append('person', id)
    // formDataFamily.append('contract', JSON.stringify(data))

    // LOGIC FOR SEND TO THE API......
    toast({ title: "Form Send!", description: "Datos enviados correctamente" });
    // LOGIC FOR SEND TO THE API......

    // const createContract = await http('/contracts', {
    //   method: 'POST',
    //   body: formDataFamily
    // })

    // if (createContract.status === 200) {
    //   router.push(`/persons/${id}`)
    // }
    // if (createContract.status === 400) {
    //   toast({ title: 'Error!', description: 'Los datos no están en el formato requerido o hay datos faltantes' })
    // }
  };

  function previousPage() {
    router.push(`/persons/${id}`);
  }

  function renderForm() {
    if (typeForm === null) return null;

    if (String(typeForm) === "ascendants") {
      const form = ascendantForm;

      return (
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado de minusvalía</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(discapacity).map(([key, value]) => (
                            <SelectItem
                              key={`minusvality-${key}`}
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
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tiene acreditada la necesidad de ayuda de terceras
                      personas o movilidad reducida
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Convivencia única</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button type="button" onClick={previousPage}>
                Regresar
              </Button>
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      );
    }

    if (String(typeForm) === "descendants") {
      const form = descendantForm;

      return (
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado de minusvalía</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(discapacity).map(([key, value]) => (
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
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tiene acreditada la necesidad de ayuda de terceras
                      personas o movilidad reducida
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Convivencia única</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
              control={form.control}
              name="adopted"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Adoptado</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="mr-3"
                      id="civil-state-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            </div> 

            <div className="flex justify-between mt-4">
              <Button type="button" onClick={previousPage}>
                Regresar
              </Button>
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
      <h1 className="mb-10 text-3xl">
        {typeForm === "ascendants" ? title.ascendants : title.descendants}
      </h1>

      <Card>
        <CardContent className="p-5">{renderForm()}</CardContent>
      </Card>
    </div>
  );
}
