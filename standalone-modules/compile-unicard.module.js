export default {
  name: 'Unicard',
  meta: {
    content_types: ['KNOWLEDGE_BASE', 'MEMBERSHIP', 'QUOTE_TEMPLATE', 'LANDING_PAGE', 'SITE_PAGE', 'CUSTOMER_PORTAL', 'BLOG_LISTING', 'WEB_INTERACTIVE', 'BLOG_POST'],
    categories: ['BODY_CONTENT', 'MEDIA', 'TEXT'],
    icon: './card.svg',
    host_template_types: ['PAGE', 'BLOG_LISTING', 'BLOG_POST'],
    label: 'Unicard'
  },
  template: {
    files: [
      'theme/css/macros.css',
      'theme/partials/components/button-group.html',
      'theme/partials/components/custom-text-group.html',
      'theme/partials/components/heading.html',
      'theme/partials/components/icon.html',
      'theme/partials/components/list-group.html',
      'theme/partials/components/richtext.html',
      'theme/partials/components/simple-image.html',
      'theme/partials/components/simple-text.html',
      'theme/partials/components/video.html',
      'theme/partials/components/media-group.html',
      'theme/partials/components/lottie.html',
      'theme/partials/components/full-width-image.html'
    ],
    dirs: [
      'theme/partials/utils/*.html',
      'theme/partials/modules/*.html'
    ]
  },
  js: { files: [], dirs: [] },
  css: { files: ['theme/partials/modules/unicard.css', 'standalone-modules/src/css/unicard.css'], dirs: [] }
}
