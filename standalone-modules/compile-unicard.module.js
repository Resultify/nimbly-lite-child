export default {
  name: 'unicard',
  meta: {
    content_types: ['KNOWLEDGE_BASE', 'MEMBERSHIP', 'QUOTE_TEMPLATE', 'LANDING_PAGE', 'SITE_PAGE', 'CUSTOMER_PORTAL', 'BLOG_LISTING', 'WEB_INTERACTIVE', 'BLOG_POST'],
    categories: ['BODY_CONTENT', 'MEDIA', 'TEXT'],
    icon: './card.svg',
    host_template_types: ['PAGE', 'BLOG_LISTING', 'BLOG_POST'],
    label: 'Card'
  },
  fields: [
    {
      name: 'custom_button_background',
      inherited_value: {
        "default_value_path": "theme.primary_color"
      },
    },
    {
      name: 'heading_style',
      locked: true
    },
    {
      name: 'heading_font',
      inherited_value: {
        "default_value_path": "theme.heading_font"
      },
    },
    {
      name: 'button_style',
      default: 'custombutton',
      choices: [
        ['linkonly', 'Link'],
        ['cta', 'CTA'],
        ['customlink', 'Custom link'],
        ['custombutton', 'Custom Button']
      ],
    }
  ],
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
  css: { files: [
    'standalone-modules/src/css/global/base/browser-defaults-overrides.css',
    'standalone-modules/src/css/global/base/stretched-link.css',
    'standalone-modules/src/css/global/base/visually-hidden.css',
    'standalone-modules/src/css/global/root.css',
    'standalone-modules/src/css/unicard/button-defaults.css',
    'standalone-modules/src/css/unicard/headings-defaults.css',
    'standalone-modules/src/css/unicard/link-defaults.css',
    'theme/partials/modules/unicard.css',
  ], dirs: [] }
}
