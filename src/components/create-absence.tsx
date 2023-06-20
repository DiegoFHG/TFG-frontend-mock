"use client";

import { Card, CardContent } from "@/components/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { Absence } from "@/app/absences/absences-columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Person } from "@/app/person-columns";
import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { types } from "./create-incident";

export default function CreateAbsence({ persons }: { persons: Person[] }) {
  const form = useForm<Absence>();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Absence> = async (data: Absence, e: any) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const createAccreditation = await http("/absences", {
      method: "POST",
      body: formData,
    });

    if (createAccreditation.status === 200) {
      toast({
        title: "Éxito!",
        description: "Ausencia agregada correctamente",
      });
      router.push(`/absences`);
    } else {
      toast({
        title: "Error!",
        description: "No se pudo agregar la ausencia",
      });
    }
  };

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Crear ausencia</h1>
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
