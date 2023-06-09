"use client";

import { Card, CardContent } from "@/components/card";
import { useForm } from "react-hook-form";
import { Incident } from "../incidents-columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Page() {
  const form = useForm<Incident>();

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Crear incidente</h1>
      <Card>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid grid-flow-row grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
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
              <Button type="button">Crear</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
