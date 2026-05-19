'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({ password: z.string().min(1, 'Vul een wachtwoord in') })
type FormValues = z.infer<typeof schema>

interface UnlockGateProps {
  slug: string
  clientName?: string
}

export function UnlockGate({ slug, clientName }: UnlockGateProps) {
  const router = useRouter()
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { password: '' } })

  async function onSubmit(values: FormValues) {
    let data: { error?: string; success?: boolean } = {}
    try {
      const res = await fetch('/api/analyse-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password: values.password }),
      })
      const text = await res.text()
      data = text ? JSON.parse(text) : {}
      if (!res.ok) {
        form.setError('password', { message: data.error ?? 'Onjuist wachtwoord' })
        return
      }
    } catch {
      form.setError('password', { message: 'Er is iets misgegaan. Probeer het opnieuw.' })
      return
    }
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-8 py-24">
      <div className="bg-surface max-w-md w-full p-10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center">
            <Lock className="text-accent" size={22} strokeWidth={1.5} />
          </div>
        </div>

        <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent text-center mb-3">
          Vertrouwelijk
        </p>
        <h1 className="font-heading text-primary text-[32px] leading-tight text-center mb-2">
          {clientName ? `Welkom, ${clientName}` : 'Toegang vereist'}
        </h1>
        <p className="text-body text-sm leading-relaxed text-center mb-8">
          Deze analyse is alleen beschikbaar met een persoonlijk wachtwoord.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Wachtwoord" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-accent text-primary font-medium hover:opacity-90 transition"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Controleren…' : 'Toegang krijgen'}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-body text-xs">
          Geen toegang?{' '}
          <a href="mailto:jordy@tradual.nl" className="underline decoration-accent underline-offset-4">
            Neem contact op
          </a>
        </p>
      </div>
    </div>
  )
}
