# SEG GitHub Upload Manifest

**Project:** SEG — Smart Emergency Guide

**Target repository:** `https://github.com/KISSCRISIS/manus`

**Target branch:** `main`

**Repository visibility at verification:** Public (`isPrivate: false`). No visibility change was requested or performed.

**Published commit:** `42e21eb43ae2371625a960c92210d103bd972d76`

**Remote verification:** `origin/main` contains the published source snapshot commit and contains 288 tracked files; later documentation-only continuity commits may follow.

**Purpose:** Record the exact safe source-publication boundary for the first upload to the empty repository.

## Included

The upload includes the current React/Vite/TypeScript/Tailwind/Express/tRPC source, configuration, deployment documentation, Phase 3 production-readiness implementation, approved visual-freeze reports, Accessibility Review evidence, read-only Visual Production Readiness evidence, governance and continuity records, and the empty `SEG_CONTENT_LIBRARY` pipeline structure. It also includes the latest structure-completion and production-readiness reports.

## Excluded

The upload excludes `.env` files, secrets, OAuth tokens, database credentials, `node_modules`, `.pnpm-store`, `dist`, `build`, `.vite`, coverage output, local runtime data, temporary directories, editor and operating-system artifacts, `.git`, and local/private logs covered by the repository ignore rules. Generated dependency and build directories are reproducible and are not source deliverables.

The external transfer archives stored outside the project root are not copied into the source tree as duplicate binaries. The project’s continuity and deployment documentation remains included, while the existing archive files remain available in the sandbox as separate transfer artifacts.

## Protected boundaries

No application code, routes, Dashboard architecture, Manus OAuth, database schema, approved assets, medical-content records, or Visual Freeze decisions are changed by this publication. The `SEG_CONTENT_LIBRARY` directories are structure-only and contain no medical content files.

## Known documented gaps

The target deployment’s Production Readiness report remains `REMAINING PRODUCTION READINESS GAPS` because the public target did not expose `/healthz`, authenticated Dashboard content was not opened without OAuth, and two external legacy asset names remain unavailable. No placeholder assets were created.

## Publication evidence

The initial source publication was verified after the GitHub push. The remote `main` branch contains source snapshot commit `42e21eb43ae2371625a960c92210d103bd972d76` and contains 288 tracked files; continuity documentation updates are tracked separately in the same branch. The remote repository is public; no repository-visibility change was performed. The local continuity archive was rebuilt separately; its final checksum is recorded in the sidecar file `SEG_PROJECT_CONTINUITY_PACKAGE_FINAL.sha256`.

