## Temporary preview-only installer setting

The existing committed `pnpm-lock.yaml` contains only the pnpm executable and
no application dependencies. The new `next-intl` dependency therefore fails
Vercel's frozen lockfile check.

`vercel.json` temporarily requests `pnpm install --no-frozen-lockfile` to
verify the draft preview. **Do not merge PR #9 with this override.**
Before release, run `pnpm install --lockfile-only` locally with pnpm 12.6.0,
commit the regenerated lockfile, remove `vercel.json` override and ensure
`pnpm install --frozen-lockfile` passes in CI.
