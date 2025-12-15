"use client";

import { Settings, Globe, LinkIcon } from "lucide-react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SEOFormProps {
  control: Control<any>;
  slugField: string;
  metaTitleField: string;
  metaDescriptionField: string;
}

export default function SEOForm({
  control,
  slugField,
  metaTitleField,
  metaDescriptionField,
}: SEOFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Settings className="h-5 w-5" />
            SEO Settings
          </CardTitle>
          <CardDescription>
            Optimize your product page for search engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name={slugField}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  URL Slug
                </FormLabel>
                <FormDescription>
                  The unique URL path for this product
                </FormDescription>
                <div className="flex items-center">
                  <div className="rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm text-muted-foreground">
                    ivostores.com/store/products
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-l-none"
                      placeholder="product-slug"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={metaTitleField}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Meta Title
                </FormLabel>
                <FormDescription>
                  The title that appears in search engine results (50-60
                  characters recommended)
                </FormDescription>
                <FormControl>
                  <Input {...field} placeholder="Product name - Your Brand" />
                </FormControl>
                <div className="mt-1 text-right text-xs text-muted-foreground">
                  {field.value?.length || 0}/60 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={metaDescriptionField}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormDescription>
                  A brief summary of the product for search results (150-160
                  characters recommended)
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your product in a way that entices potential customers to click through from search results"
                    className="min-h-24 resize-none"
                  />
                </FormControl>
                <div className="mt-1 text-right text-xs text-muted-foreground">
                  {field.value?.length || 0}/160 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-md border p-4">
            <h3 className="mb-2 text-sm font-medium">Search Engine Preview</h3>
            <div className="space-y-1">
              <div className="text-base text-blue-600 hover:underline">
                {control._formValues[metaTitleField] ||
                  "Product Title - Your Brand"}
              </div>
              <div className="text-sm text-green-700">
                ivostores.com/store/products
                {control._formValues[slugField] || "product-slug"}
              </div>
              <div className="text-sm text-slate-700">
                {control._formValues[metaDescriptionField] ||
                  "This is how your product description will appear in search results. Make it compelling to increase click-through rates."}
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-md border p-4">
            <h3 className="text-sm font-medium">SEO Tips</h3>
            <ul className="ml-6 list-disc text-sm text-muted-foreground">
              <li>
                Include your main keyword in both the title and description
              </li>
              <li>
                Keep titles under 60 characters to avoid truncation in search
                results
              </li>
              <li>
                Write descriptions between 150-160 characters for optimal
                display
              </li>
              <li>
                Make your description action-oriented and include a call to
                action
              </li>
              <li>Use a unique title and description for each product</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
