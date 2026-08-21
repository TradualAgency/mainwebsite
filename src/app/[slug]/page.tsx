import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/landing/page-builder";
import { getLandingPageBySlug, getLandingPageSlugs } from "@/sanity/lib/getLandingPages";
import { urlFor } from "@/sanity/lib/image";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getLandingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);

  if (!page) {
    return { title: "Page not found" };
  }

  const title = page.seo?.title || page.title;
  const description = page.seo?.description;
  const ogImage = page.seo?.ogImage?.asset
    ? urlFor(page.seo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: page.seo?.ogImage?.alt || title }] : undefined,
    },
  };
}

export default async function LandingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} source={slug} />;
}
