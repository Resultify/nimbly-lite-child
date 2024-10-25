export default {
  name: 'Unicard',
  meta: {
    content_types: ['KNOWLEDGE_BASE', 'MEMBERSHIP', 'QUOTE_TEMPLATE', 'LANDING_PAGE', 'SITE_PAGE', 'CUSTOMER_PORTAL', 'BLOG_LISTING', 'WEB_INTERACTIVE', 'BLOG_POST'],
    categories: ['BODY_CONTENT', 'MEDIA', 'TEXT'],
    icon: './card.svg',
    host_template_types: ['PAGE', 'BLOG_LISTING', 'BLOG_POST'],
    label: 'Unicard'
  },
  template: { files: ['theme/css/macros.css'], dirs: ['theme/partials/**/*.html'] },
  js: { files: [], dirs: [] },
  css: { files: ['theme/partials/modules/unicard.css', 'standalone-modules/src/css/unicard.css'], dirs: [] }
}
