import React from "react";
import { Html, Heading, Text, Section } from '@react-email/components'

interface ContactTemplateProps {
    firstName: string,
    email: string,
    mobileNumber: string,
    message: string,
}

export default function ContactEmailTemplate(props: Readonly<ContactTemplateProps>)  {
    const { firstName, email, mobileNumber, message } = props;

    return (
        <Html>
            <Section>
                <Heading className="text-center">Contact aanvraag, {firstName}</Heading>
                <Text>Email: {email}</Text>
                <Text>Telefoonnummer: {mobileNumber}</Text>
                <Text>Bericht: {message}</Text>
            </Section>
        </Html>
        )
}