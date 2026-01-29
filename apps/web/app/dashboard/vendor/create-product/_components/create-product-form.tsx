"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { productCreateSchema } from "@workspace/open-api/schemas/product.schemas";
import z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Button } from "@workspace/ui/components/button";
import { ImageUploader } from "./image-uploader";

export const CreateProductForm = () => {
  const form = useForm<z.infer<typeof productCreateSchema>>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      images: [],
    },
  });
  function onSubmit(data: z.infer<typeof productCreateSchema>) {
    console.log(data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="creatd-product" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Product Image
                  </FieldLabel>
                  <ImageUploader
                    onChange={field.onChange}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    maxFiles={5}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="creatd-product">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
