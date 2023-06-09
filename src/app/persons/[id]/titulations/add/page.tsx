"use client";

import { useForm } from "react-hook-form";
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

export default function Page() {
  const form = useForm<Titulation>();

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar titulación</h1>
      <Card>
        <CardContent className="p-5">
          <Form {...form}>
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
