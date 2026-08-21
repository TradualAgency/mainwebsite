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
            message: 'Your name must be at least 2 characters'
        })
        .max(50, {
            message: 'Your name may not be more than 50 characters'
        }),
    email: z.string().email({
        message: 'Invalid email address'
    }),
    contactNumber: z.string()
        .min(10, {
            message: 'Invalid phone number'
        })
        .max(14, {
            message: 'Invalid phone number'
        }),
    revenueRange: z.enum(revenueRanges, {
        message: 'Choose your current online revenue',
    }),
    bericht: z.string()
        .min(2, {
            message: 'Message must be longer than 2 characters'
        })
        .max(2000, {
            message: 'Message may not be longer than 2000 characters'
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
                <p className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent mb-3">Sent</p>
                <h3 className="font-heading text-2xl mb-3">Thanks for your message.</h3>
                <p className="text-surface/70 leading-relaxed">
                    We'll get back to you within one working day.
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Name</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Enter your full name
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Email</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Enter your email address
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Phone number</FormLabel>
                                <FormControl>
                                    <Input className="h-12 border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Enter your phone number
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Current online revenue</FormLabel>
                                <FormControl>
                                    <select
                                        className="h-12 w-full border border-surface/20 bg-surface/5 text-surface px-3 rounded-md focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                    >
                                        <option value="" disabled className="text-primary">Choose a range</option>
                                        {revenueRanges.map((range) => (
                                            <option key={range} value={range} className="text-primary">
                                                {range}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    So we can place you with the right service immediately
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
                                <FormLabel className="font-heading text-[10px] uppercase tracking-[0.14em] text-accent">Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder=""
                                        className="min-h-32 resize-none border-surface/20 bg-surface/5 text-surface placeholder:text-surface/40 focus-visible:border-accent focus-visible:ring-accent/30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-surface/50">
                                    Enter your message
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                            </FormItem>
                        )}
                    />
                    {status === 'error' && (
                        <p className="text-red-300 text-sm">
                            Something went wrong sending this. Please try again, or email{' '}
                            <a href="mailto:info@tradual.com" className="underline">info@tradual.com</a> directly.
                        </p>
                    )}
                    <Button className="bg-accent text-primary hover:bg-accent/90" variant="default" size="lg" type="submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending…' : 'Send'}
                    </Button>
                </form>
            </Form>
    )
}
