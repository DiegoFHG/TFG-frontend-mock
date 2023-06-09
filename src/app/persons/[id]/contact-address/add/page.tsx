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
import { ContactAddress } from "@/app/person-columns";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const contactAddressForm = useForm<ContactAddress>();

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactAddress> = async (
    data: ContactAddress,
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

  const form = contactAddressForm;

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Agregar dirección</h1>

      <Card>
        <CardContent className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-flow-row grid-cols-3 gap-5">
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
                      <FormLabel>Población</FormLabel>
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Télefono 1</FormLabel>
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
                      <FormLabel>Télefono 2</FormLabel>
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
