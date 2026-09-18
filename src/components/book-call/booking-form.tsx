'use client'

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ErrorKey = "nameMin" | "nameMax" | "email" | "companyMax" | "notesMax";

// Schema als factory, zodat de foutmeldingen uit de actieve taal komen (zelfde patroon
// als het contactformulier). De server valideert dezelfde grenzen nog een keer.
function buildSchema(msg: (key: ErrorKey) => string) {
  return z.object({
    name: z.string().trim().min(2, { message: msg("nameMin") }).max(80, { message: msg("nameMax") }),
    email: z.string().trim().email({ message: msg("email") }).max(254, { message: msg("email") }),
    company: z.string().trim().max(120, { message: msg("companyMax") }),
    notes: z.string().trim().max(1000, { message: msg("notesMax") }),
    // Honeypot: mensen zien dit veld niet, dus het moet leeg blijven.
    website: z.string().max(0),
  });
}

export type BookingFormValues = z.infer<ReturnType<typeof buildSchema>>;

interface BookingFormProps {
  onSubmit: (values: BookingFormValues) => Promise<void>;
  submitting: boolean;
  disabled?: boolean;
  submitError: string | null;
}

const labelClass = "font-heading text-[10px] uppercase tracking-[0.14em] text-accent";
const inputClass = "h-12 border-primary/20 bg-surface text-primary placeholder:text-primary/40 focus-visible:border-accent focus-visible:ring-accent/30";

export function BookingForm({ onSubmit, submitting, disabled = false, submitError }: BookingFormProps) {
  const t = useTranslations("BookCallPage.widget");
  const schema = useMemo(() => buildSchema((key) => t(`errors.${key}`)), [t]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", notes: "", website: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t("form.name")}</FormLabel>
                <FormControl>
                  <Input className={inputClass} autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t("form.email")}</FormLabel>
                <FormControl>
                  <Input className={inputClass} type="email" autoComplete="email" inputMode="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t("form.company")}</FormLabel>
              <FormControl>
                <Input className={inputClass} autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t("form.notes")}</FormLabel>
              <FormControl>
                <Textarea className="min-h-28 resize-none border-primary/20 bg-surface text-primary focus-visible:border-accent focus-visible:ring-accent/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
          </label>
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-destructive">
            {submitError}
          </p>
        )}

        <Button className="w-full bg-accent text-primary hover:bg-accent/90 sm:w-auto" variant="default" size="lg" type="submit" disabled={submitting || disabled}>
          {submitting ? t("submitting") : t("submit")}
        </Button>
      </form>
    </Form>
  );
}
