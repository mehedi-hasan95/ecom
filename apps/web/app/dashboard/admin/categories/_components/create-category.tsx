"use client";

import { ImageUploader } from "@/app/dashboard/vendor/create-product/_components/image-uploader";
import { LoadingButton } from "@/components/common/loading-button";
import { createCategoryAction } from "@/lib/actions/admin/admin-action";
import getQueryClient from "@/lib/query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { categorySchema } from "@workspace/open-api/schemas/admin.schamas";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@workspace/ui/components/input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const CreateCategory = () => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      image: undefined,
    },
  });
  const createMutation = useMutation({
    mutationFn: createCategoryAction,

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/dashboard/admin/categories");
    },
  });
  function onSubmit(data: z.infer<typeof categorySchema>) {
    createMutation.mutate(data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="category-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field orientation="horizontal">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category-form-name">
                      Category Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="category-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Mobile"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category-form-slug">
                      Category Slug
                    </FieldLabel>
                    <Input
                      {...field}
                      id="category-form-slug"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. mobile"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category-form-image">
                    Category Image
                  </FieldLabel>
                  <ImageUploader
                    maxFiles={1}
                    disabled={form.formState.isSubmitting}
                    value={field.value ? [field.value] : []}
                    onChange={(files) => field.onChange(files?.[0])}
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
          {createMutation.isPending ? (
            <LoadingButton />
          ) : (
            <Button type="submit" form="category-form">
              Submit
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
};
