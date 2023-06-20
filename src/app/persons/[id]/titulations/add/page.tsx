"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { degreeTypes } from "../../page";
import { Card, CardContent } from "@/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useToast } from "@/components/use-toast";
import { useRouter } from "next/navigation";
import http from "@/lib/http";

type Titulation = {
  type: keyof typeof degreeTypes;
  name: string;
  date: string;
};

const types = {
  0: "Bachiller o equivalente",
  1: "Ciclo Formativo de Grado Medio o equivalente",
  2: "Ciclo Formativo de Grado Superior o equivalente",
  3: "Grado / Licenciatura/ Diplomatura",
  4: "Máster",
  5: "Doctorado",
  6: "Otros",
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const form = useForm<Titulation>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<Titulation> = async (
    data: Titulation,
    e: any
  ) => {
    e.preventDefault();
    const titulation = { person: id, ...data };
    const formData = new FormData();
    for (const key in titulation) {
      formData.append(key, titulation[key]);
    }

    const createTitulation = await http("/titulations", {
      method: "POST",
      body: formData,
    });

    if (createTitulation.status === 200) {
      toast({
        title: "Éxito!",
        description: "Titulación agregada correctamente",
      });
      router.push(`/persons/${id}`);
    } else {
      toast({
        title: "Error!",
        description:
          "No se pudo agregar la titulación (datos inválidos o conflicto)",
      });
    }
  };

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar titulación</h1>
      <Card>
        <CardContent className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(types).map(([key, value]) => (
                              <SelectItem key={`types-${key}`} value={key}>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button>Crear</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
