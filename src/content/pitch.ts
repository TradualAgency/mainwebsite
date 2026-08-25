// De drie uniques uit de elevator pitch. Eén bron, zodat de homepage en latere
// pitch- of over-ons-pagina's dezelfde formulering aanhouden.

export type Unique = {
  title: string;
  body: string;
};

export const uniques: Unique[] = [
  {
    title: "Same traffic. More revenue.",
    body: "We don't start by buying more traffic. We start with how much more revenue is sitting in the demand you already earned.",
  },
  {
    title: "One performance engine.",
    body: "Technology, speed, data, UX and conversion have to work as one system, not as five separate projects.",
  },
  {
    title: "Performance you can prove.",
    body: "We map where revenue leaks away, translate it into euros, fix the biggest causes first, and measure what the improvement actually returns.",
  },
];
