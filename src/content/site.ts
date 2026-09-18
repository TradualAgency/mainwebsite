// Centrale bedrijfsfeiten. Eén bron zodat footer, metadata en CTA's nooit uit elkaar lopen.
// Vertaalbare teksten (tagline, belofte) staan in messages/*/common.json.
// TODO: telefoonnummer, KvK-nummer, btw-nummer en echte social-URL's zijn nog niet aangeleverd.
// Zolang die ontbreken tonen we ze bewust niet (liever geen claim dan een verzonnen of dode link).

export const site = {
  name: "Tradual",
  legalName: "Tradual",
  url: "https://tradual.com",
  email: {
    general: "info@tradual.com",
    support: "jordy@tradual.nl",
  },
  social: {
    // Nog geen bevestigde profiel-URL's — bewust leeg gelaten i.p.v. dode "#"-links.
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },
} as const;
