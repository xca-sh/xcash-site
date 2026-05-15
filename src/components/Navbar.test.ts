import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const navbarSource = readFileSync(new URL('./Navbar.tsx', import.meta.url), 'utf8')

test('docs navigation links directly to the API reference', () => {
  assert.match(navbarSource, /const docsUrl = 'https:\/\/github\.com\/xca-sh\/xcash\/blob\/main\/API\.md'/)
  assert.equal(
    navbarSource.match(/href=\{docsUrl\}/g)?.length,
    2,
    'docs link should be present in both desktop and mobile navigation',
  )
})
