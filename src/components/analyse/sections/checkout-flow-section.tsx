import { PortableText } from '@portabletext/react'
import type { ProspectScan } from '@/sanity/lib/getProspectScans'
import { StatusPill } from '@/components/analyse/status-pill'

export function CheckoutFlowSection({ checkout }: { checkout: NonNullable<ProspectScan['checkoutFlow']> }) {
  return (
    <section className="py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 flex-wrap mb-4">
          <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent">Mystery checkout</p>
          {checkout.testedAsMobile != null && (
            <StatusPill status={checkout.testedAsMobile ? 'yes' : 'no'} />
          )}
        </div>
        <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-4">
          We walked through the checkout.
        </h2>
        <p className="text-body text-sm mb-10">From product page to payment screen, without completing a purchase.</p>

        {(checkout.fieldsInAddressForm != null || checkout.redirectsBeforePayment != null || checkout.totalCheckoutTimeSeconds != null) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {checkout.fieldsInAddressForm != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <p className="font-heading text-primary text-[48px] leading-none mb-1">{checkout.fieldsInAddressForm}</p>
                <p className="text-xs text-body">Fields in address form</p>
              </div>
            )}
            {checkout.redirectsBeforePayment != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <p className="font-heading text-primary text-[48px] leading-none mb-1">{checkout.redirectsBeforePayment}</p>
                <p className="text-xs text-body">Redirects before payment</p>
              </div>
            )}
            {checkout.totalCheckoutTimeSeconds != null && (
              <div className="bg-surface border border-primary/10 p-6">
                <p className="font-heading text-primary text-[48px] leading-none mb-1">{checkout.totalCheckoutTimeSeconds}s</p>
                <p className="text-xs text-body">Total checkout time</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {checkout.guestCheckoutAvailable != null && (
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Guest checkout</p>
              <StatusPill status={checkout.guestCheckoutAvailable ? 'yes' : 'no'} />
            </div>
          )}

          {checkout.paymentMethodsOrder && checkout.paymentMethodsOrder.length > 0 && (
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Payment methods (order)</p>
              <ol className="space-y-1">
                {checkout.paymentMethodsOrder.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-primary">
                    <span className="font-heading text-accent text-[10px] w-4">{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {checkout.errorsEncountered && checkout.errorsEncountered.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-red-600 mb-3">Errors encountered</p>
            <ul className="space-y-1">
              {checkout.errorsEncountered.map((e, i) => (
                <li key={i} className="text-sm text-body border-l-2 border-red-400 pl-4 py-1">{e}</li>
              ))}
            </ul>
          </div>
        )}

        {checkout.observedFriction && checkout.observedFriction.length > 0 && (
          <div className="mb-10 overflow-x-auto">
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-accent mb-4">Friction points</p>
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="text-left py-2 pr-6 font-heading text-[10px] uppercase tracking-[0.12em] text-body">Step</th>
                  <th className="text-left py-2 pr-6 font-heading text-[10px] uppercase tracking-[0.12em] text-body">Problem</th>
                  <th className="text-left py-2 font-heading text-[10px] uppercase tracking-[0.12em] text-body">Impact</th>
                </tr>
              </thead>
              <tbody>
                {checkout.observedFriction.map(f => (
                  <tr key={f._key} className="border-b border-primary/10">
                    <td className="py-3 pr-6 text-primary font-medium">{f.step}</td>
                    <td className="py-3 pr-6 text-body">{f.issue}</td>
                    <td className="py-3 text-body/70 italic">{f.estImpact ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {checkout.postPurchaseObservations && (
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-body mb-2">Post-purchase observations</p>
            <p className="text-body text-sm leading-relaxed whitespace-pre-line">{checkout.postPurchaseObservations}</p>
          </div>
        )}

        {checkout.notesAndDiagnosis && (
          <div className="prose prose-sm max-w-3xl text-body border-t border-primary/10 pt-8">
            <PortableText value={checkout.notesAndDiagnosis} />
          </div>
        )}
      </div>
    </section>
  )
}
