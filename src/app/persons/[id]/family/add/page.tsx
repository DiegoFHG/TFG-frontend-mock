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
import { Checkbox } from "@/components/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Select } from "@radix-ui/react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/button";
import http from "@/lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/use-toast";
import { Ascendant, Descendant } from "@/app/person-columns";

const title = {
  ascendants: "Agregar ascendientes",
  descendants: "Agregar descendientes",
};

const discapacity = {
  0: "Ninguna",
  33: "Igual o superior al 33% e inferior al 65%",
  65: "Igual o superior al 65%",
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  const ascendantForm = useForm<Ascendant>({
    defaultValues: {
      uniqueConvivence: false,
    },
  });
  const descendantForm = useForm<Descendant>({
    defaultValues: {
      uniqueConvivence: false,
      adopted: false,
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const typeForm = searchParams.get("type");

  const onSubmit: SubmitHandler<Ascendant> = async (
    data: Ascendant | Descendant,
    e: any
  ) => {
    let familyMember: Response | null = null;

    e.preventDefault();

    if (String(typeForm) === "ascendants") {
      data as Ascendant;

      familyMember = await http(`/persons/${id}/ascendents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (String(typeForm) === "descendants") {
      data as Descendant;

      familyMember = await http(`/persons/${id}/descendents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (familyMember !== null && familyMember.status === 200) {
      toast({
        title: "Éxito!",
        description: "Familiar agregado correctamente",
      });
      router.push(`/persons/${id}`);
    } else {
      toast({
        title: "Error!",
        description: "No se pudo agregar el familiar",
      });
    }
  };

  function previousPage() {
    router.push(`/persons/${id}`);
  }

  function renderForm() {
    if (typeForm === null) return null;

    if (String(typeForm) === "ascendants") {
      const form = ascendantForm;

      return (
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado de minusvalía</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(discapacity).map(([key, value]) => (
                            <SelectItem key={`minusvality-${key}`} value={key}>
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
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tiene acreditada la necesidad de ayuda de terceras
                      personas o movilidad reducida
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uniqueConvivence"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Convivencia única</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
      );
    }

    if (String(typeForm) === "descendants") {
      const form = descendantForm;

      return (
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discapacity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Grado de minusvalía</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(discapacity).map(([key, value]) => (
                            <SelectItem
                              key={`contract-entities-${key}`}
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
                name="discapacityNeedsHelp"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tiene acreditada la necesidad de ayuda de terceras
                      personas o movilidad reducida
                    </FormLabel>
                    <FormControl>
                      <Checkbox className="mr-3" id="civil-state-0" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uniqueConvivence"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Convivencia única</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-3"
                        id="civil-state-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adopted"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Adoptado</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
      );
    }

    return null;
  }

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">
        {typeForm === "ascendants" ? title.ascendants : title.descendants}
      </h1>

      <Card>
        <CardContent className="p-5">{renderForm()}</CardContent>
      </Card>
    </div>
  );
}
