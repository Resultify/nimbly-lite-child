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
- Use **relative** module paths (`../modules/...`), never `/<theme-name>/modules/...`.
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
- **Heading line-height:** define line-height on **every** pair `h1`/`.h1` … `h6`/`.h6` together (same value on the tag and the class). Unicard often uses a semantic tag (e.g. `h2`) with a display class (e.g. `.h6`); if `.h6` has no line-height, the `h2` rule wins and the visual size looks wrong. Never use **px** line-heights — headings resize responsively; use unitless multipliers or `calc(n/d)` (comment the Figma ratio when useful).
- Scope page-specific chrome (e.g. transparent header) with a template/body class + `theme/js/custom.js` measuring CSS vars — don’t apply sitewide without opt-in.
- Hide empty optional UI in HubL (flag + data check) rather than leaving empty headings/modules.
- Localize editor-facing defaults and system templates with `html_lang` (`sv` / `da` / `en`).
- Hide unused scaffold templates: `isAvailableForNewContent: false`.
- Extract repeated banners/CTAs to `theme/partials/` and include them from templates.
- After HubDB upload, update `foreignTableId` / portal `content_id` values for the **target** hub — don’t copy sandbox IDs.

## New section checklist

1. `theme/sections/{name}.html` — label, description, `screenshotPath`, sensible DnD defaults (desktop **and** mobile; vertical padding ≈ half of desktop). Give `dnd_section` a distinctive `class` (e.g. `tipsa-section-wrp`) so section CSS can target it without brittle selectors.
2. `theme/css/sections/{name}-section.css`
3. `{% include %}` in `theme/css/sections.css`
4. Preview image under `theme/images/section-previews/`
5. Wire into the relevant template(s) if it should appear by default
6. Module paths must be relative (`../modules/...`)

## Modules

- Typical files: `meta.json`, `module.html`, `module.css`, `module.js`, `_locales/`, plus `fields.json` and/or `fields.js`.
- Unicard family: prefer `fields.js` + shared builders under `theme/partials/`; run `npm run fields` after edits.
- Keep `module.html` thin — import shared partials/macros when they exist.
- Content vs Style tabs: follow `theme/README.md` (Style order: presets → alignment → spacing → background → … → custom theme overrides).
- Small focused modules are OK when Unicard can’t cover custom JS/CSS (e.g. anchor-point, banner-video).
- **Image aspect ratio:** Unicard full-width images use `full_width_image_aspect_ratio` with presets `1/1`, `1.91/1`, `2/1`, `3/1`, `3/2`, `4/3`, `4/5`, `5/4`, `9/16`, `16/9` (see `theme/partials/components/full-width-image.js`). Prefer the closest preset in section/module defaults — do not invent custom ratios in CSS or inline styles when a preset matches (or is close enough).

## Auth

- Local: `.env` with `hub_<portalname>=<personal-access-key>` (or `~/.rh/.env.root`).
- Never commit access keys or `hubspot.config.yml`.

## CI / validate pitfalls

- Default branch: `master`.
- PR validate workflow: **`ciUpload` → `validate` → `lighthouse`** against the CI portal.
- Marketplace validate downloads the theme **from the portal** by `theme.json` `name`. If that folder is missing/empty → `DOWNLOAD_EMPTY`. Upload first.
- Bulk `ciUpload` can hit **Cloudflare 403** under HubSpot’s fixed upload concurrency (~10). Single-file `watch` often works; empty `ciUploadTheme error:` usually means a 403 HTML body. Retry or patch concurrency upstream — not a theme logic bug.
- Commit subject prefix: `[FEATURE|BUGFIX|TASK|TEST|DOC|WIP]` (optional `[!!!]`).

## Client theme scaffolding (when copying this repo)

1. Rename `package.json` `name`, `theme/theme.json` `label`/`name`, README title.
2. Brand `theme/fields.json`.
3. Configure CI/prod HubSpot secrets.

Canonical finished example: `menomedic-nimbly-lite-child-2026`.

## Dig deeper

- Root `README.md` — auth, HubDB events/case study, GraphQL notes
- `theme/README.md` — module fields / Style tab conventions
- HubSpot module & theme fields best practices (linked from `theme/README.md`)
