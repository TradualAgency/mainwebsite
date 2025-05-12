import { Resend } from 'resend'
import ContactEmailTemplate from "@/components/email-templates/contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        console.log("API Key aanwezig:", !!process.env.RESEND_API_KEY);

        const formData = await request.json();
        console.log("Ontvangen formulier data:", formData);

        const { firstName, email, mobileNumber, message } = formData;

        try {
            // Gebruik het standaard Resend domein voor de afzender
            const { data, error } = await resend.emails.send({
                from: 'info@tradual.com',
                to: ['info@tradual.com'],  // Je ontvangst-emailadres
                subject: 'Contact Formulier Bericht',
                react: ContactEmailTemplate({
                    firstName,
                    email,
                    mobileNumber,
                    message
                }),
            });

            if (error) {
                console.error("Resend error:", error);
                return Response.json({error: error.message, details: error}, {status: 500});
            }

            console.log("Email verzonden, response data:", data);
            return Response.json({success: true, data});
        } catch (sendError) {
            console.error("Error tijdens het verzenden van de email:", sendError);
            return Response.json({
                error: sendError instanceof Error ? sendError.message : 'Onbekende fout bij email versturen',
                details: sendError
            }, {status: 500});
        }
    } catch (error) {
        console.error("Algemene API route error:", error);
        return Response.json({
            error: error instanceof Error ? error.message : 'Onbekende fout',
            details: error
        }, {status: 500});
    }
}