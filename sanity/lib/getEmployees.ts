// lib/sanity/getEmployees.ts
import { client } from '@/sanity/lib/client';
import { type SanityDocument } from 'next-sanity';

const EMPLOYEE_QUERY = `*[_type == "employee"]`;

export async function getEmployees(): Promise<SanityDocument[]> {
    return await client.fetch<SanityDocument[]>(EMPLOYEE_QUERY);
}