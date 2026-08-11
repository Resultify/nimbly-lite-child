#!/usr/bin/env node
/**
 * CI helpers for ephemeral theme Design Manager paths.
 *
 * Usage:
 *   node scripts/ci-theme-path.js rename
 *   node scripts/ci-theme-path.js delete
 *
 * rename — rewrite package.json + theme/theme.json `name` to
 *   `${base}-ci-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}`
 *   and print/export CI_THEME_PATH.
 *
 * delete — remove CI_THEME_PATH from the portal identified ONLY by
 *   HUBSPOT_PORTAL_ID + HUBSPOT_PERSONAL_ACCESS_KEY (same as cmslib CI).
 *   Refuses .env hub_* selection and refuses deleting the stable theme name.
 */
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = process.cwd()
const packagePath = resolve(root, 'package.json')
const themeJsonPath = resolve(root, 'theme/theme.json')

const CI_SUFFIX_RE = /^(.+)-ci-(\d+)-(\d+)$/

function readJson (path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function writeJson (path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}

function assertSafeCiPath (path, baseName) {
  const match = CI_SUFFIX_RE.exec(path)
  if (!match) {
    throw new Error(
      `Refusing path "${path}": must match {base}-ci-{run_id}-{run_attempt}`
    )
  }
  if (match[1] !== baseName) {
    throw new Error(
      `Refusing path "${path}": base "${match[1]}" !== package name base "${baseName}"`
    )
  }
  if (path === baseName) {
    throw new Error(`Refusing to operate on stable theme name "${baseName}"`)
  }
}

function cmdRename () {
  const runId = process.env.GITHUB_RUN_ID
  const runAttempt = process.env.GITHUB_RUN_ATTEMPT || '1'
  if (!runId) {
    throw new Error('GITHUB_RUN_ID is required for rename')
  }

  const pkg = readJson(packagePath)
  const theme = readJson(themeJsonPath)
  const baseName = pkg.name

  if (!baseName || theme.name !== baseName) {
    throw new Error(
      `package.json name (${pkg.name}) must match theme.json name (${theme.name}) before rename`
    )
  }
  if (CI_SUFFIX_RE.test(baseName)) {
    throw new Error(`package.json name already looks like a CI path: ${baseName}`)
  }

  const dest = `${baseName}-ci-${runId}-${runAttempt}`
  assertSafeCiPath(dest, baseName)

  pkg.name = dest
  theme.name = dest
  writeJson(packagePath, pkg)
  writeJson(themeJsonPath, theme)

  if (process.env.GITHUB_ENV) {
    appendFileSync(process.env.GITHUB_ENV, `CI_THEME_PATH=${dest}\n`)
    appendFileSync(process.env.GITHUB_ENV, `CI_THEME_BASE=${baseName}\n`)
  }

  console.log(`CI theme path: ${dest}`)
  console.log(`Base theme name: ${baseName}`)
}

async function loadCiPortalAuth () {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const accessKey = process.env.HUBSPOT_PERSONAL_ACCESS_KEY

  if (!portalId || !accessKey) {
    throw new Error(
      'delete requires HUBSPOT_PORTAL_ID and HUBSPOT_PERSONAL_ACCESS_KEY ' +
      '(same vars as cmslib CI). Refusing to fall back to .env hub_* keys.'
    )
  }

  const { getAccessToken } = require('@hubspot/local-dev-lib/personalAccessKey')
  const {
    getAndLoadConfigIfNeeded,
    validateConfig
  } = require('@hubspot/local-dev-lib/config')

  // Same gate cmslib uses: PAK must belong to HUBSPOT_PORTAL_ID.
  const accessTokenData = await getAccessToken(accessKey)
  const tokenPortalId = Number(accessTokenData.portalId || accessTokenData.hubId)

  if (tokenPortalId !== Number(portalId)) {
    throw new Error(
      `Portal mismatch: HUBSPOT_PORTAL_ID=${portalId} but access key belongs to portal ${tokenPortalId}`
    )
  }

  // Prefer HubSpot "native" env auth — no hubspot.config.yml, no .env hub_* picker.
  await getAndLoadConfigIfNeeded({ silenceErrors: false, useEnv: true })
  await validateConfig()

  return { portalId: tokenPortalId }
}

async function cmdDelete () {
  const dest = process.env.CI_THEME_PATH
  const baseName = process.env.CI_THEME_BASE || readJson(packagePath).name.replace(CI_SUFFIX_RE, '$1')

  if (!dest) {
    throw new Error('CI_THEME_PATH is required for delete')
  }

  assertSafeCiPath(dest, baseName)

  const { portalId } = await loadCiPortalAuth()
  const { deleteFile } = require('@hubspot/local-dev-lib/api/fileMapper')

  console.log(`Deleting Design Manager path "${dest}" from portal ${portalId}`)
  try {
    await deleteFile(portalId, dest)
    console.log(`Deleted ${dest}`)
  } catch (error) {
    const status = error?.statusCode || error?.response?.status
    if (status === 404) {
      console.warn(`Path ${dest} already absent on portal ${portalId} (404)`)
    } else {
      throw error
    }
  }
}

const cmd = process.argv[2]
try {
  if (cmd === 'rename') {
    cmdRename()
  } else if (cmd === 'delete') {
    await cmdDelete()
  } else {
    console.error('Usage: node scripts/ci-theme-path.js <rename|delete>')
    process.exit(1)
  }
} catch (error) {
  console.error(error?.message || error)
  process.exit(1)
}
