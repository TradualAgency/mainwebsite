'use client'

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

const formSchema = z.object({
    name: z.string()
        .min(2, {
            message: 'Uw naam moet minimaal 1 karakter bevatten'
        })
        .max(50, {
            message: 'Uw naam mag niet meer dan 50 karakters bevatten'
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
    bericht: z.string()
        .min(2, {
            message: 'Bericht moet langer dan 2 karakters zijn'
        })
        .max(100, {
            message: 'Bericht mag niet langer dan 100 karakters zijn'
        })
})

type ContactFormSchema = z.infer<typeof formSchema>;


export default function ContactForm() {
    const form = useForm<ContactFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            contactNumber: "",
            bericht: "",
        },
    })

    async function onSubmit(values: ContactFormSchema){
        console.log(values);

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
                    message: values.bericht,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Er is iets mis gegaan bij het verzenden van het formulier');
            }
            //Formulier succesvol verzonden
            form.reset();
            console.log('Email succesvol verzonden', data);

        } catch (error) {
            console.log('Fout bij het verzenden van het formulier:', error);
        } finally {
            console.log('Try catch voltooid');
        }
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
                                    Voer hier uw volledige naam in
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
                                    Voer hier uw e-mailadres in
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
                                    Voer hier uw telefoonnummer in
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
                                    Voer hier uw bericht in
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-accent text-primary hover:bg-accent/90" variant="default" size="lg" type="submit">Verzenden</Button>
                </form>
            </Form>
    )
}
