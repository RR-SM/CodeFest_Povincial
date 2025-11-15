# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository overview

As of this version, the repository only contains a minimal `README.md` with the project name (`CodeFest_Povincial`) and no additional source code or configuration files.

There are currently **no** detected:
- Build or packaging configuration files (e.g., `package.json`, `pyproject.toml`, `.csproj`, `Makefile`)
- Test frameworks or test configuration
- Linting or formatting configuration
- Tool-specific rules files (CLAUDE, Cursor, Copilot)

Future instances of Warp should re-scan the repository structure before assuming any particular language, framework, or tooling.

## Commands

Because there are no build, lint, or test configuration files yet, there are **no canonical commands** to document for this project.

When such tooling is added (for example via `package.json`, `pyproject.toml`, `.csproj`, or similar):
- Prefer the commands and scripts documented in those files and in `README.md`.
- Mirror the primary build, lint, and test commands into this `WARP.md` so agents have a single, reliable reference.

## Code architecture and structure

There is currently no source code or project structure to document. When code is added, future instances of Warp should:

1. Inspect the top-level directories (e.g., `src/`, `app/`, `backend/`, etc.) to identify the main application entry points and layers.
2. Summarize the high-level architecture here (e.g., UI vs. API vs. data access layers, domain modules, shared utilities).
3. Note any important cross-cutting concerns (e.g., configuration, logging, authentication) and where they live.

At this time, no such architecture can be inferred from the repository contents.
