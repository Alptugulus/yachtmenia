/** Stable slug for gallery category anchors (nav + in-page scroll targets). */
export function galleryCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
