# Permissions Required

To execute the Antaragni Autonomous Agent Protocol, the following permissions are required:

1. **Git Operations**
   - `git checkout -b <branch-name>`
   - `git add .`
   - `git commit -m "<message>"`
   - `git switch <branch-name>`
   - `git status`

2. **NPM Build**
   - `npm run build`

3. **Chrome Browser Automation**
   - Taking screenshots via `browser_subagent`
   - Reading rendered dimensions and overflow states

4. **Directory / File Creation**
   - Creating directories such as `docs/screenshots/before`, `docs/screenshots/after`, `docs/screenshots/comparison`
   - Writing files in `docs/` and `src/`
