"use client";

import { Card, CardContent } from "@/components/card";
import { SubmitHandler, useForm } from "react-hook-form";
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
import http from "@/lib/http";
import { useToast } from "@/components/use-toast";
import { useRouter } from "next/navigation";

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

export default function Page({ params: { id } }: { params: { id: string } }) {
  const form = useForm<Accreditation>();
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit: SubmitHandler<Accreditation> = async (data: Accreditation, e: any) => {
    e.preventDefault()
    const accreditation = { person: id, ...data }
    const formData = new FormData();
    for (const key in accreditation) {
      formData.append(key, accreditation[key])
    }

    const createAccreditation = await http("/accreditations", { method: 'POST', body: formData })
    
    if (createAccreditation.status === 200) {
      toast({ title: 'Éxito!', description: 'Acreditación agregada correctamente' })
      router.push(`/persons/${id}`) 
    } else {
      toast({ title: 'Error!', description: 'No se pudo agregar la acreditación (datos inválidos o conflicto)' })
    }
  }

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar acreditación</h1>
      <Card>
        <CardContent className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <FormLabel>Fecha inicio</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                        <Input type="date" {...field} />
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
                        <Input {...field} />
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
