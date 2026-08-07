/**
 * Generate a HubSpot blog CSV import file for seeding test content.
 *
 * Headers match HubSpot’s sample CSV (csv-blog-import-sample.csv):
 * POST_URL,TITLE,SEO_TITLE,PUBLISH_DATE,AUTHOR,META_DESCRIPTION,FEATURED_IMAGE,POST_BODY,TAGS
 *
 * Usage:
 *   npm run generateBlogCsv
 *   npm run generateBlogCsv -- 50
 *   npm run generateBlogCsv -- --count=100 --author="Demo Author"
 *
 * Then in HubSpot: Settings → Content → Blog → Import blog → CSV file upload
 * Docs: https://knowledge.hubspot.com/blog/import-your-blog-into-hubspot-as-a-csv-file
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

const OUT_DIR = path.join(process.cwd(), 'blog')
const OUT_FILE = path.join(OUT_DIR, 'hubspot-blog-import.csv')

/** Column order from HubSpot’s official sample CSV. */
const HEADERS = [
  'POST_URL',
  'TITLE',
  'SEO_TITLE',
  'PUBLISH_DATE',
  'AUTHOR',
  'META_DESCRIPTION',
  'FEATURED_IMAGE',
  'POST_BODY',
  'TAGS',
]

const TOPICS = [
  'typography',
  'layout',
  'accessibility',
  'performance',
  'content strategy',
  'design systems',
  'HubSpot CMS',
  'modules',
  'templates',
  'SEO',
]

const TAG_SETS = [
  'News',
  'Guide, Product',
  'Design, Typography',
  'CMS, HubSpot',
  'Tips',
  'Case Study, Customers',
  'Release Notes',
]

/**
 * @param {string[]} argv
 */
function parseArgs (argv) {
  let count = 25
  let author = 'Demo Author'
  let baseUrl = 'https://www.example.com/blog'

  for (const arg of argv) {
    if (/^\d+$/.test(arg)) {
      count = Number(arg)
      continue
    }
    const countMatch = arg.match(/^--count=(\d+)$/)
    if (countMatch) {
      count = Number(countMatch[1])
      continue
    }
    const authorMatch = arg.match(/^--author=(.+)$/)
    if (authorMatch) {
      author = authorMatch[1].replace(/^["']|["']$/g, '')
      continue
    }
    const baseMatch = arg.match(/^--base-url=(.+)$/)
    if (baseMatch) {
      baseUrl = baseMatch[1].replace(/\/$/, '').replace(/^["']|["']$/g, '')
    }
  }

  if (!Number.isFinite(count) || count < 1) {
    console.error(`${chalk.red.bold('[Error]')} count must be a positive number`)
    process.exit(1)
  }

  return { count, author, baseUrl }
}

/**
 * @param {string|number|boolean|null|undefined} value
 */
function csvCell (value) {
  const text = value === null || value === undefined ? '' : String(value)
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

const TITLE_TEMPLATES = [
  'How better {topic} improves HubSpot blog posts in production',
  'A practical {topic} guide for CMS marketing and content teams',
  'Lessons on {topic} from shipping ten client HubSpot themes',
  '{topic} patterns that hold up in production, not just Figma',
  'Rethinking {topic} for long-form blogs and listing cards',
  'Draft to publish: cleaner {topic} choices for HubSpot editors',
  'Why {topic} still breaks on mobile — and the fixes that stuck',
  'Small {topic} changes that make a big difference in theme QA',
]

const SECTION_HEADINGS = [
  [
    'Why this sample post exists and how to use it in QA',
    'Concrete details you can check while reviewing the layout',
  ],
  [
    'The problem this article is meant to surface in the theme',
    'What to verify once the post is imported into HubSpot',
  ],
  [
    'Context for designers reviewing typography and spacing',
    'Checklist items for modules, cards, and related posts',
  ],
  [
    'How generated content helps catch line-length issues early',
    'Extra notes on tags, images, and ingress styling hooks',
  ],
]

/**
 * Build a title near ~60 characters (roughly 54–66).
 * @param {number} index
 * @param {string} topic
 */
function buildTitle (index, topic) {
  const template = TITLE_TEMPLATES[index % TITLE_TEMPLATES.length]
  const topicLabel = topic.charAt(0).toUpperCase() + topic.slice(1)
  return template.replace('{topic}', topicLabel)
}

/**
 * HubSpot sample uses M/D/YYYY (e.g. 9/24/2020).
 * @param {Date} date
 */
function formatPublishDate (date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

/**
 * @param {number} index
 * @param {{ author: string, baseUrl: string }} options
 */
function buildPost (index, options) {
  const n = index + 1
  const topic = TOPICS[index % TOPICS.length]
  const tags = TAG_SETS[index % TAG_SETS.length]
  const slug = `test-post-${String(n).padStart(3, '0')}-${topic.replace(/\s+/g, '-')}`
  const title = buildTitle(index, topic)
  const [sectionOne, sectionTwo] = SECTION_HEADINGS[index % SECTION_HEADINGS.length]
  const publishDate = new Date()
  publishDate.setDate(publishDate.getDate() - (index * 3))

  const ingress =
    `Lead paragraph for ${title}. A short preamble that should render larger than body copy when Typography → Ingress is configured. Use this space to set context for the article, hint at the main takeaway, and give readers a reason to continue into the sections below.`
  const postBody = [
    `<p class="ingress">${ingress}</p>`,
    `<p>This is test article ${n} about ${topic}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices, erat sed ultricies ultricies, dolor orci varius nibh, et semper nulla arcu eget justo. Etiam sem sem, ultricies et sagittis sed, aliquam sit amet orci. Ut a dolor a metus laoreet luctus nec aliquet urna.</p>`,
    `<p>Donec nec ornare libero. Nunc venenatis tortor interdum convallis ornare. Phasellus accumsan ligula magna, vel porta velit eleifend eget. Aliquam elementum bibendum pharetra. Duis pulvinar dignissim massa eget ornare.</p>`,
    `<h2>${sectionOne}</h2>`,
    `<p>Use the HubSpot blog CSV import to seed many posts quickly. Edit <code>scripts/generate-blog-csv.js</code> or bump the count when you need more content. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer vitae nisl at nisl tincidunt tincidunt.</p>`,
    `<p>Mauris non nisi quis elit tincidunt tincidunt. Sed euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Cras sit amet libero at nisl tincidunt tincidunt. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>`,
    `<h2>${sectionTwo}</h2>`,
    `<p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh.</p>`,
    `<ul>`,
    `<li>Post number: ${n}</li>`,
    `<li>Topic: ${topic}</li>`,
    `<li>Tags: ${tags}</li>`,
    `</ul>`,
    `<p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada.</p>`,
    `<blockquote><p>Good test data makes layout bugs obvious. Longer paragraphs also reveal line-length and spacing issues that short stubs hide.</p></blockquote>`,
    `<p>Etiam sem sem, ultricies et sagittis sed, aliquam sit amet orci. Ut a dolor a metus laoreet luctus nec aliquet urna. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat.</p>`,
    `<p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Proin eget tortor risus.</p>`,
  ].join('')

  return {
    POST_URL: `${options.baseUrl}/${slug}`,
    TITLE: title,
    SEO_TITLE: title,
    PUBLISH_DATE: formatPublishDate(publishDate),
    AUTHOR: options.author,
    META_DESCRIPTION: `Test meta description for post ${n} (${topic}).`,
    FEATURED_IMAGE: `https://picsum.photos/seed/${slug}/1200/630`,
    POST_BODY: postBody,
    TAGS: tags,
  }
}

async function main () {
  const options = parseArgs(process.argv.slice(2))

  const rows = [HEADERS.map(csvCell).join(',')]
  for (let i = 0; i < options.count; i++) {
    const post = buildPost(i, options)
    rows.push(HEADERS.map((header) => csvCell(post[header])).join(','))
  }

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, `${rows.join('\n')}\n`, 'utf8')

  console.log(`${chalk.green('Wrote')} ${chalk.cyan(path.relative(process.cwd(), OUT_FILE))}`)
  console.log(`${chalk.dim(`${options.count} posts · author "${options.author}" · base ${options.baseUrl}`)}`)
  console.log('')
  console.log('Import in HubSpot:')
  console.log('  Settings → Content → Blog → Import blog → CSV file upload')
  console.log('  Platform: "Other" or "I am not sure" — headers match HubSpot sample CSV')
  console.log('  Columns should auto-map; import as drafts (recommended for test content).')
  console.log(chalk.dim('  https://knowledge.hubspot.com/blog/import-your-blog-into-hubspot-as-a-csv-file'))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
