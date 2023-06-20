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
// import {}
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { dedicationOptions } from '../../page'
import { Button } from "@/components/button";
// import { Switch } from '@/components/switch'
// import http from '@/lib/http'
import { Checkbox } from "@/components/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/use-toast";
import { EmergencyContact } from "@/app/person-columns";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import http from "@/lib/http";

const relationships = {
  0: "Pareja",
  1: "Padre/Madre",
  2: "Hermano/a",
  3: "Otros",
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const emergencyContactForm = useForm<EmergencyContact>();

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<EmergencyContact> = async (
    data: EmergencyContact,
    e: any
  ) => {
    e.preventDefault();
    const emergencyContact = { person: id, ...data };

    const createAccreditation = await http("/emergency-contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emergencyContact),
    });

    if (createAccreditation.status === 200) {
      toast({
        title: "Éxito!",
        description: "Contacto de emergencia agregada correctamente",
      });
      router.push(`/persons/${id}`);
    } else {
      toast({
        title: "Error!",
        description:
          "No se pudo agregar el contacto de emergencia (datos inválidos o conflicto)",
      });
    }
  };

  function previousPage() {
    router.push(`/persons/${id}`);
  }

  const form = emergencyContactForm;

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar contacto de emergencia</h1>

      <Card>
        <CardContent className="p-5">
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
                  name="address"
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Telefóno móvil</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Relación</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(relationships).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={`relationships-${key}`}
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
              <div className="flex justify-between mt-4">
                <Button type="button" onClick={previousPage}>
                  Regresar
                </Button>
                <Button type="submit">Crear</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
