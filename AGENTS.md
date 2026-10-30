# AGENTS.md — Nimbly Lite Grownup

Guidance for AI agents working in this repo (and client themes scaffolded from it).

## What this repo is

- Classic **HubL** HubSpot CMS theme (`@resultify/hubspot-cms-lib`), **not** HubSpot Projects / React.
- Package / theme name: `nimbly-lite-grownup` — a **self-contained** scaffold (no `extends` in `theme/theme.json`; it no longer inherits from `/nimbly-lite`).
- Client themes are usually copied from this scaffold, then renamed — they stay self-contained too.

Prefer `rh` / `npm run …` scripts over inventing a second toolchain.

## Core rules

- Prefer **minimal, focused diffs**; match existing patterns before inventing new ones.
- Put cross-cutting visual overrides in `theme/css/custom.css`.
- Put domain CSS in the matching file (`theme/css/blog-common.css`, `theme/css/templates/*`, `theme/css/sections/*-section.css`) — do not dump everything into `custom.css`.
- Prefer tuning **section/template DnD defaults** and Unicard field props over adding new modules.
- When adjusting section spacing, set both `default` and `mobile` padding on `dnd_section`. **Vertical** mobile padding (top/bottom) should usually be about **half** of desktop/default (e.g. `100px` → `50px`); horizontal padding is often left as-is unless the design says otherwise.
- Prefer `padding` / `margin` on `dnd_column` (or `dnd_section`) over `dnd_row` when either works. In the HubSpot page editor, rows are often hidden unless there is a reason to show them (e.g. more than one column in the row), so spacing on rows is harder for editors to find and change.
- Use **relative** module paths (`../modules/...`), never `/<theme-name>/modules/...`.
- For `max-width` media queries, use a `.98px` upper bound that pairs with the next `min-width` (e.g. `max-width: 991.98px` with `min-width: 992px`) so there is no 1px gap between breakpoints. Match existing theme CSS.
- Do not commit secrets (`.env`, `hubspot.config.yml`) or regenerable build output.
- Do not strip `{# [rmstart] #}` / `{# [rmend] #}` markers.
- Do not invent a parallel build/upload stack outside cms-lib.

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | ESLint + JS typecheck |
| `npm run build` | Compile `src/` → `theme/assets/` |
| `npm run fields` | Generate `fields.json` from `fields.js` |
| `npm run watch` | Build + watch/upload on change |
| `npm run upload` | Upload theme |
| `npm run ciUpload` | Build + fields + clean CI upload (uses `.cihsignore`) |
| `npm run validate` | Marketplace validation (**theme must already exist on the portal**) |
| `npm run lighthouse` | Lighthouse via HubSpot |
| `npm run fetchDb` / `uploadDb` | HubDB sync |
| `npm run generateBlogCsv` | Write `blog/hubspot-blog-import.csv` for HubSpot blog CSV import |

`theme.json` `name` must match `package.json` `name` and the Design Manager folder path.

## Layout

```
theme/           # Uploaded theme root
  modules/       # HubSpot modules
  sections/      # Theme sections (DnD)
  templates/     # Pages, layouts, system pages, partials/
  partials/      # Shared HubL + fields builders
  css/           # base, global-theme-settings, sections/, templates/, custom.css
  js/            # Theme JS (custom.js, etc.)
  assets/        # GENERATED from src/ (gitignored)
  fields.json    # Brand tokens (colors, fonts, spacing)
src/             # Vendor JS/CSS/SCSS sources → theme/assets/
hubdb/           # HubDB table JSON
standalone-modules/  # Marketplace packaging (not day-to-day page work)
```

### Generated / ignored (do not hand-edit as source of truth)

- `theme/assets/*` — from `npm run build`
- Many Unicard `fields.json` files — from `npm run fields` / `fields.js`
- `.hsignore` — skip `fields.js`, partials JS, data-queries on upload
- `.cihsignore` — CI also skips HubDB-heavy modules (`case-study-list`, `event-list`) and data-queries

Edit `fields.js` / `src/`, then regenerate.

## Design & content work (client themes)

Patterns from real client polish:

- Brand tokens and global type live in `theme/fields.json`; avoid hardcoding fonts that should inherit.
- **Body line-height:** use Typography → Page global → Line height (px). CSS emits `calc(line-height / font-size)` on `body` (inherits into paragraphs / rich text); empty keeps `1.5`. Prefer that over one-off `main p` / module richtext rules in `custom.css`.
- **Heading line-height:** use theme Typography → Headings separately → Line height (px). CSS emits `calc(line-height / font-size)` on every `h1`/`.h1` … `h6`/`.h6` and `.display-*` pair (or `normal` if unset) so Unicard semantic tag + display class stays correct. Never hardcode px line-heights in `custom.css` for those styles.
- **Ingress / preamble:** HubSpot has no lead style. Use Typography → Ingress: set the RTE font size editors should pick + Figma line height. Theme CSS targets `main p/span[style*="font-size:…"]` and `.ingress` with `calc(line-height / font-size)`. Prefer that over one-off rules in `custom.css`.
- Scope page-specific chrome (e.g. transparent header) with a template/body class + `theme/js/custom.js` measuring CSS vars — don’t apply sitewide without opt-in.
- Hide empty optional UI in HubL (flag + data check) rather than leaving empty headings/modules.
- Localize editor-facing defaults and system templates with `html_lang` (`sv` / `da` / `en`).
- Hide unused scaffold templates: `isAvailableForNewContent: false`.
- Extract repeated banners/CTAs to `theme/partials/` and include them from templates.
- After HubDB upload, update `foreignTableId` / portal `content_id` values for the **target** hub — don’t copy sandbox IDs. Same for HubSpot form IDs and HubSpot video `player_id` values.
- **HubSpot video:** `player_id` is not the File Manager file ID. Player IDs only work on the portal they belong to — a sandbox video will not play on the client hub. Reliable way to capture the right ID: pick the video in a module on the target portal, then export the section from the page.
- When replacing a theme image under `theme/images/` (or a File Manager asset referenced by path), give the new file a **new name**. HubSpot’s image CDN can keep serving the old file if the path is unchanged.
- When generating AI placeholder photos, describe the scene without mentioning text or lettering (e.g. “nothing written anywhere in the frame”). Otherwise generators often paint garbled typography.

## New section checklist

1. `theme/sections/{name}.html` — label, description, **`screenshotPath` (required for sections)**, sensible DnD defaults (desktop **and** mobile; vertical padding ≈ half of desktop). Prefer column/section spacing over row spacing so editors can see it in the UI. Give `dnd_section` a distinctive `class` (e.g. `tipsa-section-wrp`) so section CSS can target it without brittle selectors.
2. `theme/css/sections/{name}-section.css`
3. `{% include %}` in `theme/css/sections.css`
4. Preview image under `theme/images/section-previews/`
5. Wire into the relevant template(s) if it should appear by default
6. Module paths must be relative (`../modules/...`)

New **templates** do not need a `screenshotPath` — HubSpot shows a live page preview. Existing template preview images can stay; don’t strip them just to “clean up.”

## Modules

- Typical files: `meta.json`, `module.html`, `module.css`, `module.js`, `_locales/`, plus `fields.json` and/or `fields.js`.
- Unicard family: prefer `fields.js` + shared builders under `theme/partials/`; run `npm run fields` after edits.
- Keep `module.html` thin — import shared partials/macros when they exist.
- Content vs Style tabs: follow `theme/README.md` (Style order: presets → alignment → spacing → background → … → custom theme overrides).
- Small focused modules are OK when Unicard can’t cover custom JS/CSS (e.g. anchor-point, banner-video).
- **Image aspect ratio:** Unicard full-width images use `full_width_image_aspect_ratio` with presets `1/1`, `1.91/1`, `2/1`, `3/1`, `3/2`, `4/3`, `4/5`, `5/4`, `9/16`, `16/9` (see `theme/partials/components/full-width-image.js`). Prefer the closest preset in section/module defaults — do not invent custom ratios in CSS or inline styles when a preset matches (or is close enough).
- **Field gotchas:** Unicard choice alignments that feed `justify-content` (e.g. `simple_image_alignment`, `button_alignment`) use `start` / `center` / `end` — not `left` / `right`. HubSpot `alignment` fields still use `LEFT` / `CENTER` / `RIGHT`. When seeding a form field default in DnD/module defaults, use the shape `{"form_id": "…", "form_type": "HUBSPOT", "response_type": "inline", "message": "…"}` with a form ID from the **target** portal.

## Auth

- Local: `.env` with `hub_<portalname>=<personal-access-key>` (or `~/.rh/.env.root`).
- Never commit access keys or `hubspot.config.yml`.

## CI / validate pitfalls

- Default branch: `master`.
- PR validate workflow: **`ciUpload` → `validate` → `lighthouse`** against the CI portal.
- Marketplace validate downloads the theme **from the portal** by `theme.json` `name`. If that folder is missing/empty → `DOWNLOAD_EMPTY`. Upload first.
- Bulk `ciUpload` can hit **Cloudflare 403** under HubSpot’s fixed upload concurrency (~10). Single-file `watch` often works; empty `ciUploadTheme error:` usually means a 403 HTML body. Retry or patch concurrency upstream — not a theme logic bug.
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, …).

## Client theme scaffolding (when copying this repo)

1. Rename `package.json` `name`, `theme/theme.json` `label`/`name`, README title.
2. Brand `theme/fields.json`.
3. Configure CI/prod HubSpot secrets.

Canonical finished example: `menomedic-nimbly-lite-child-2026`.

## Dig deeper

- Root `README.md` — auth, HubDB events/case study, GraphQL notes
- `theme/README.md` — module fields / Style tab conventions
- HubSpot module & theme fields best practices (linked from `theme/README.md`)
