"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field";
import { Button } from "@workspace/ui/components/button";
import { ImageUploader } from "./image-uploader";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCategoriesAction,
  getSubCategoriesAction,
} from "@/lib/actions/category/category-action";
import { ModifyCombobox } from "@/components/common/modify/modify-combobox";
import { useEffect } from "react";
import { ColorSelector } from "./color-selector";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import { PlusCircle, XIcon } from "lucide-react";
import { InputController } from "../../../../../../components/common/form/input-controller";
import { TextareaController } from "@/components/common/form/textarea-controller";
import { TagsController } from "@/components/common/form/tags-controller";
import { RichTextEditor } from "./rich-text-editor";
import { SwitchController } from "@/components/common/form/switch-contoller";
import { SelectController } from "@/components/common/form/select-controller";
import { SizeSelector } from "./size-selector";
import { productCreateAction } from "@/lib/actions/product-action";
import { LoadingButton } from "@/components/common/loading-button";

export const CreateProductForm = () => {
  const deliveryType = ["physical", "digital", "service"];
  const productStatus = ["draft", "active", "archived"];
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });

  const cat = data?.categories.map((item) => ({
    label: item.name,
    value: item.slug,
  }));
  const form = useForm<z.input<typeof productCreateSchema>>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      images: [],
      categorySlug: "",
      subCategorySlug: "",
      shortDescription: "",
      basePrice: undefined,
      salePrice: undefined,
      stock: undefined,
      weight: undefined,
      tags: [],
      color: [],
      specification: [],
      description: "",
      cashOnDelevary: false,
      cupon: "",
      type: "physical",
      status: "draft",
      sizes: [],
    },
  });
  const selectedCat = form.watch("categorySlug");
  useEffect(() => {
    form.setValue("subCategorySlug", "");
  }, [selectedCat, form]);
  const { data: subCatData } = useQuery({
    queryKey: ["subCategories", selectedCat],
    queryFn: () => getSubCategoriesAction(selectedCat),
    enabled: !!selectedCat,
  });

  const subCat = subCatData?.subCategories.map((item) => ({
    label: item.name,
    value: item.slug,
  }));

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  //create product

  const createMutation = useMutation({
    mutationFn: productCreateAction,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  async function onSubmit(data: z.input<typeof productCreateSchema>) {
    createMutation.mutate(data);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="creatd-product" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-5">
            <FieldGroup>
              <InputController
                name="title"
                control={form.control}
                title="Product Name"
                placeholder="e.g. Premium Leather Wallet"
              />
              <TextareaController
                name="shortDescription"
                control={form.control}
                placeholder="Slim handmade wallet crafted from genuine leather"
                title=" Write a short description"
              />

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
              <div className="grid md:grid-cols-2 gap-5">
                <Controller
                  name="categorySlug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="create-product-catId">
                        Select a category
                      </FieldLabel>
                      <ModifyCombobox optoins={cat || []} {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="subCategorySlug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="create-product-subCatId">
                        Select a sub category
                      </FieldLabel>
                      <ModifyCombobox optoins={subCat || []} {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <InputController
                  name="basePrice"
                  control={form.control}
                  title="Product Base Price"
                  placeholder="e.g. 59"
                />
                <InputController
                  name="salePrice"
                  control={form.control}
                  title="Product Sale Price"
                  placeholder="e.g. 55.55"
                />
                <InputController
                  name="stock"
                  control={form.control}
                  title="Total Products"
                  placeholder="e.g. 120"
                />
                <InputController
                  name="weight"
                  control={form.control}
                  title="Total Weight"
                  placeholder="e.g. 0.3"
                />
              </div>
            </FieldGroup>
            <FieldGroup>
              <TagsController
                control={form.control}
                name="tags"
                title="Product Tags"
                placeholder="e.g. Organic"
              />
              <ColorSelector control={form.control} name="color" />
              <FieldSet className="gap-4">
                <FieldLegend variant="label">Custom Specification</FieldLegend>
                <FieldGroup className="gap-4">
                  {fields.map((field, index) => (
                    <div className="flex gap-2" key={field.id}>
                      <Controller
                        name={`specification.${index}.key`}
                        control={form.control}
                        render={({ field: controllerField, fieldState }) => (
                          <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <InputGroup>
                                <InputGroupInput
                                  {...controllerField}
                                  id={`specification-${index}`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Key"
                                />
                              </InputGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldContent>
                          </Field>
                        )}
                      />

                      <Controller
                        name={`specification.${index}.value`}
                        control={form.control}
                        render={({ field: controllerField, fieldState }) => (
                          <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <InputGroup>
                                <InputGroupInput
                                  {...controllerField}
                                  id={`specification-value-${index}`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Value"
                                />
                              </InputGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldContent>
                          </Field>
                        )}
                      />

                      {fields.length > 1 && (
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => remove(index)}
                            aria-label={`Remove specification ${index + 1}`}
                          >
                            <XIcon />
                          </InputGroupButton>
                        </InputGroupAddon>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ key: "", value: "" })}
                    disabled={fields.length >= 5}
                  >
                    <PlusCircle /> Add Specification
                  </Button>
                </FieldGroup>
              </FieldSet>

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-desc">
                      Product Description
                    </FieldLabel>
                    <RichTextEditor onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid md:grid-cols-2 gap-5">
                <SwitchController
                  control={form.control}
                  name="cashOnDelevary"
                  title="Cash on delevary enable?"
                  description="Pay with cash when your order is delivered. Vendors can enable or disable this option."
                />
                <InputController
                  control={form.control}
                  name="cupon"
                  title="Discount Coupon (optional)"
                  placeholder="Have a coupon? Enter it here"
                />
                <SelectController
                  control={form.control}
                  name="type"
                  options={deliveryType.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  title="Delivery type"
                  placeholder="Select delivery type"
                />
                <SelectController
                  control={form.control}
                  name="status"
                  options={productStatus.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  title="Product status"
                  placeholder="Select product status"
                />
              </div>
              <SizeSelector
                control={form.control}
                name="sizes"
                title="Add Sizes (optional)"
              />
            </FieldGroup>
          </div>
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
            <Button type="submit" form="creatd-product">
              Submit
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
};
