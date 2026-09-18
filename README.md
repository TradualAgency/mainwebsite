This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Booking calls

`/book-a-call` (English) and `/nl/book-a-call` (Dutch) use Sanity to reserve
30-minute slots and Resend to send notifications and calendar attachments.
Add these variables to `.env.local` and to the hosting environment:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-server-only-sanity-editor-token
RESEND_API_KEY=your-resend-api-key
```

The Sanity token needs permission to create and update `bookingSlot` documents.
Never prefix this token with `NEXT_PUBLIC_`. Resend must allow sending from the
address in `src/content/site.ts`. Restart the development server after changing
environment variables if Next.js has not reloaded them.

Configure working hours, holidays, notice period and an optional Google Meet URL
in `src/content/booking.ts`. When the Meet URL is empty, the confirmation explains
that Jordy will email it before the call. Availability is a fixed schedule: other
calendar appointments are not synced automatically. Publish a `Booking slot` in
Sanity Studio with status `blocked` to block time; `cancelled` releases it.

If the internal notification succeeds but the visitor's email fails, the booking
stays reserved and the visitor sees instructions to request their confirmation.
An uncertain mail delivery also keeps the slot reserved; check Resend before
cancelling it in Studio.

Verification (no real bookings or emails are created by the test script):

```bash
node scripts/check-messages.mjs
npx tsc --noEmit
npm run lint
npm run test:booking
npm run build
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
