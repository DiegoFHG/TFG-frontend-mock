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
import { BankData } from "@/app/person-columns";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const descendantForm = useForm<BankData>();

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<BankData> = async (data: BankData, e: any) => {
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

  const form = descendantForm;

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar datos bancarios</h1>

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
                  name="iban"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nº de cuenta</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primary"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Principal</FormLabel>
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
        </CardContent>
      </Card>
    </div>
  );
}
