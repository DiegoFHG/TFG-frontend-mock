"use client";

import { Card, CardContent } from "@/components/card";
import { useForm } from "react-hook-form";
import { evaluationTypes } from "../../page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

type Accreditation = {
  evaluationType: keyof typeof evaluationTypes;
  accreditationAgency: string;
  accreditation: string;
  startDate: string;
  endDate: string;
  date: string;
};

const evaluation = {
  0: "Figura de profesor universitario contratado",
  1: "Evaluación de los tramos de investigación",
};

export default function Page() {
  const form = useForm<Accreditation>();

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar acreditación</h1>
      <Card>
        <CardContent className="p-5">
          <Form {...form}>
            <form>
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="evaluationType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(evaluation).map(([key, value]) => (
                              <SelectItem
                                key={`evaluation-types-${key}`}
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
                  name="accreditationAgency"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Agencia acreditadora</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accreditation"
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Año inicio</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Año fin</FormLabel>
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Otorgado el</FormLabel>
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
