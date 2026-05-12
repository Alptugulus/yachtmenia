import { Link, Navigate, useParams } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { FadeIn } from '@/components/common/FadeIn'
import { PageHeader } from '@/components/layout/PageHeader'
import { getPostBySlug } from '@/data'
import { useTranslatedPost } from '@/i18n/dataT'
import { intlLocaleForLanguage } from '@/i18n/intlLocale'

export function BlogPost() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  const basePost = slug ? getPostBySlug(slug) : undefined
  const post = useTranslatedPost(basePost)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const dateLocale = intlLocaleForLanguage(i18n.resolvedLanguage ?? i18n.language)

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />

      <PageHeader
        title={post.title}
        subtitle={post.excerpt}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('seo.titles.blog'), to: '/blog' },
          { label: post.title },
        ]}
        backgroundImage={post.coverImage}
      />

      <article className="mx-auto max-w-[820px] px-4 py-14 sm:px-6 lg:px-10">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wide text-slate">
            <span className="rounded-full bg-mist px-3 py-1 text-primary">{post.category}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center gap-1 text-primary/75">
              <Clock className="h-4 w-4" />
              {t('common.minRead', { count: post.readMinutes })}
            </span>
            {post.author ? <span>{post.author}</span> : null}
          </div>
        </FadeIn>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-slate">
          {post.content.map((para, idx) => (
            <FadeIn key={idx} delay={idx * 0.04}>
              <p>{para}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-14 border-t border-stone/60 pt-8">
            <Link to="/blog" className="text-sm font-semibold text-primary hover:text-primary/75">
              {t('blogPost.back')}
            </Link>
          </div>
        </FadeIn>
      </article>
    </>
  )
}
