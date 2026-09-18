'use client'

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"
import { site } from "@/content/site";

// De waarden blijven vast (ze gaan zo naar de mail); de labels komen uit messages.
const revenueRanges = ["< €1M", "€1M – €3M", "€3M – €8M", "€8M+"] as const;

type ErrorKey = "nameMin" | "nameMax" | "email" | "phone" | "revenue" | "messageMin" | "messageMax";

// Schema als factory, zodat de foutmeldingen uit de actieve taal komen.
function buildSchema(msg: (key: ErrorKey) => string) {
    return z.object({
        name: z.string()
            .min(2, { message: msg("nameMin") })
            .max(50, { message: msg("nameMax") }),
        email: z.string().email({ message: msg("email") }),
        contactNumber: z.string()
            .min(10, { message: msg("phone") })
            .max(14, { message: msg("phone") }),
        revenueRange: z.enum(revenueRanges, { message: msg("revenue") }),
        bericht: z.string()
            .min(2, { message: msg("messageMin") })
            .max(2000, { message: msg("messageMax") }),
    });
}

type ContactFormSchema = z.infer<ReturnType<typeof buildSchema>>;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
    source?: string;
}

export default function ContactForm({ source }: ContactFormProps) {
    const t = useTranslations("ContactForm");
    const rangeLabels = t.raw("ranges") as string[];
    const [status, setStatus] = useState<SubmitState>('idle');

    const formSchema = useMemo(() => buildSchema((key) => t(`errors.${key}`)), [t]);

    const form = useForm<ContactFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            contactNumber: "",
            revenueRange: undefined,
            bericht: "",
        },
    })

    async function onSubmit(values: ContactFormSchema){
        setStatus('submitting');

        try {
            const response = await fetch('/api/contact-send-email', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: values.name,
                    email: values.email,
                    mobileNumber: values.contactNumber,
                    revenueRange: values.revenueRange,
                    message: source ? `[${source}] ${values.bericht}` : values.bericht,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong sending the form');
            }

            form.reset();
            setStatus('success');
        } catch (error) {
            console.error('Error sending the form:', error);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="text-surface">
                <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent mb-3">{t("success.eyebrow")}</p>
                <h3 className="font-heading text-2xl mb-3">{t("success.heading")}</h3>
                <p className="text-surface/70 leading-relaxed">
                    {t("success.body")}
                </p>
            </div>
        );
    }

    return(
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 text-surface">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">{t("fields.name.label")}</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    {t("fields.name.description")}
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">{t("fields.email.label")}</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    {t("fields.email.description")}
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">{t("fields.phone.label")}</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    {t("fields.phone.description")}
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="revenueRange"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">{t("fields.revenue.label")}</FormLabel>
                                <FormControl>
                                    <select
                                        className="h-12 w-full border border-surface/20 bg-surface/5 text-surface px-3 rounded-md focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                    >
                                        <option value="" disabled className="text-primary">{t("fields.revenue.placeholder")}</option>
                                        {revenueRanges.map((range, index) => (
                                            <option key={range} value={range} className="text-primary">
                                                {rangeLabels[index] ?? range}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    {t("fields.revenue.description")}
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bericht"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">{t("fields.message.label")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder=""
                                        className="min-h-32 resize-none border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    {t("fields.message.description")}
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    {status === 'error' && (
                        <p className="text-red-300 text-sm">
                            {t.rich("error", {
                                email: site.email.general,
                                link: (chunks) => (
                                    <a href={`mailto:${site.email.general}`} className="underline">{chunks}</a>
                                ),
                            })}
                        </p>
                    )}
                    <Button className="bg-accent text-primary hover:bg-accent/90" variant="default" size="lg" type="submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? t("submitting") : t("submit")}
                    </Button>
                </form>
            </Form>
    )
}
