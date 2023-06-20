"use client";

import { Card, CardContent } from "@/components/card";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Incident } from "@/app/incidents/incidents-columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

type Person = {
  id: string;
  name: string;
  lastName: string;
};

export const types = {
  0: "Asuntos personales",
  1: "Baja IT",
  2: "Baja Accidente Laboral",
  3: "Consulta Médica",
  4: "Deber de carácter público",
  5: "Dispensa académica",
  6: "Excedencia",
  7: "Exámenes oficiales",
  8: "Exámenes parciales",
  9: "Fallecimiento familiar",
  10: "Gestiones",
  11: "Hospitalización familiar",
  12: "Intervención familiar sin hospitalización",
  13: "Lactancia",
  14: "Permiso Matrimonio",
  15: "Permiso Maternidad",
  16: "Permiso Paternidad",
  17: "Permiso sin sueldo",
  18: "Traslado de domicilio",
};

export default function CreateIncident({ persons }: { persons: Person[] }) {
  const form = useForm<Incident>();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Incident> = async (data: Incident, e: any) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const createAccreditation = await http("/incidents", {
      method: "POST",
      body: formData,
    });

    if (createAccreditation.status === 200) {
      toast({
        title: "Éxito!",
        description: "Incidente agregado correctamente",
      });
      router.push(`/incidents`);
    } else {
      toast({
        title: "Error!",
        description: "No se pudo agregar el incidente",
      });
    }
  };

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Crear incidente</h1>
      <Card>
        <CardContent>
          <Form {...form}>
            <form className="pt-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="person"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Persona</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {persons.map((person) => (
                            <SelectItem
                              key={`persons-${person.id}`}
                              value={person.id}
                            >
                              {`${person.name} ${person.lastName}`}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(types).map(([key, value]) => (
                              <SelectItem key={`types-${key}`} value={value}>
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
                    <FormItem>
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
                    <FormItem>
                      <FormLabel>Fecha fin</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora inicio</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora fin</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Crear</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
