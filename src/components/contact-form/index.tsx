'use client'

import { useState } from "react";
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

const revenueRanges = ["< €1M", "€1M – €3M", "€3M – €8M", "€8M+"] as const;

const formSchema = z.object({
    name: z.string()
        .min(2, {
            message: 'Je naam moet minimaal 2 karakters bevatten'
        })
        .max(50, {
            message: 'Je naam mag niet meer dan 50 karakters bevatten'
        }),
    email: z.string().email({
        message: 'Ongeldig e-mailadres'
    }),
    contactNumber: z.string()
        .min(10, {
            message: 'Ongeldig telefoonnummer'
        })
        .max(14, {
            message: 'Ongeldig telefoonnummer'
        }),
    revenueRange: z.enum(revenueRanges, {
        message: 'Kies je huidige online omzet',
    }),
    bericht: z.string()
        .min(2, {
            message: 'Bericht moet langer dan 2 karakters zijn'
        })
        .max(2000, {
            message: 'Bericht mag niet langer dan 2000 karakters zijn'
        })
})

type ContactFormSchema = z.infer<typeof formSchema>;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
    source?: string;
}

export default function ContactForm({ source }: ContactFormProps) {
    const [status, setStatus] = useState<SubmitState>('idle');

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
                throw new Error(data.error || 'Er is iets mis gegaan bij het verzenden van het formulier');
            }

            form.reset();
            setStatus('success');
        } catch (error) {
            console.error('Fout bij het verzenden van het formulier:', error);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="text-surface">
                <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent mb-3">Verzonden</p>
                <h3 className="font-heading text-2xl mb-3">Bedankt voor je bericht.</h3>
                <p className="text-surface/70 leading-relaxed">
                    We nemen binnen één werkdag contact met je op.
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Naam</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Voer hier je volledige naam in
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">E-mail</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Voer hier je e-mailadres in
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Telefoonnummer</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Voer hier je telefoonnummer in
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Huidige online omzet</FormLabel>
                                <FormControl>
                                    <select
                                        className="h-12 w-full border border-surface/20 bg-surface/5 text-surface px-3 rounded-md focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                    >
                                        <option value="" disabled className="text-primary">Kies een range</option>
                                        {revenueRanges.map((range) => (
                                            <option key={range} value={range} className="text-primary">
                                                {range}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Zo kunnen we je meteen bij de juiste dienst indelen
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Bericht</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder=""
                                        className="min-h-32 resize-none border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Voer hier je bericht in
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    {status === 'error' && (
                        <p className="text-red-300 text-sm">
                            Er ging iets mis bij het verzenden. Probeer het opnieuw, of mail direct naar{' '}
                            <a href="mailto:info@tradual.com" className="underline">info@tradual.com</a>.
                        </p>
                    )}
                    <Button className="bg-accent text-primary hover:bg-accent/90" variant="default" size="lg" type="submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Versturen…' : 'Verzenden'}
                    </Button>
                </form>
            </Form>
    )
}
