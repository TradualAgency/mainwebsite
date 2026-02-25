import {defineField, defineType} from 'sanity'

export const employeeType = defineType({
    name: 'employee',
    title: 'Employee',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'functie',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'image'
        })
    ],
})