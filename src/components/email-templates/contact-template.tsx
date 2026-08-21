import React from "react";
import { Html, Heading, Text, Section } from '@react-email/components'

interface ContactTemplateProps {
    firstName: string,
    email: string,
    mobileNumber: string,
    message: string,
    revenueRange?: string,
}

export default function ContactEmailTemplate(props: Readonly<ContactTemplateProps>)  {
    const { firstName, email, mobileNumber, message, revenueRange } = props;

    return (
        <Html>
            <Section>
                <Heading className="text-center">Contact request, {firstName}</Heading>
                <Text>Email: {email}</Text>
                <Text>Phone number: {mobileNumber}</Text>
                {revenueRange && <Text>Online revenue: {revenueRange}</Text>}
                <Text>Message: {message}</Text>
            </Section>
        </Html>
        )
}