import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import InsightsHero from "@/containers/insights/hero-section";
import { portableTextComponents } from "@/components/portable-text-components";
import FinalCTA from "@/containers/home-page/final-cta-section";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/getPosts";
import { urlFor } from "@/sanity/lib/image";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, alt: post.mainImage?.alt || post.title }] : undefined,
    },
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(dateString)
  );
}

export default async function InsightArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = post.categories?.[0]?.title;
  const date = formatDate(post.publishedAt);
  const byline = [post.author?.name, date].filter(Boolean).join(" · ");

  return (
    <>
      <InsightsHero eyebrow={category ?? "Insights"} title={post.title} intro={post.excerpt} />

      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {byline && <p className="text-primary/60 text-sm text-center mb-10">{byline}</p>}

        {post.mainImage && (
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] mb-12">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && <PortableText value={post.body} components={portableTextComponents} />}

        <div className="pt-4 pb-16">
          <Link
            href="/insights"
            className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition text-sm md:text-base"
          >
            ← Back to all insights
          </Link>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}
