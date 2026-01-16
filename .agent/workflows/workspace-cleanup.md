---
description: Workspace Cleanup - Remove Obsolete Files
---

# Workspace Cleanup Workflow

This workflow helps maintain a clean project by identifying and removing obsolete files.

## When to Run This Workflow

- After major refactoring
- Before committing to version control
- Weekly maintenance
- Before deploying to production

## Steps

### 1. Identify Obsolete Files

Check for files that are:
- No longer imported or referenced
- Replaced by newer versions
- Deprecated features
- Old documentation
- Unused CSS/JS files

### 2. Common Obsolete File Patterns

```bash
# Find unused CSS files
npm run find:unused-css

# Find files not imported anywhere
npx findead ./app

# Check for duplicate files
npx jscpd ./app
```

### 3. Safe Files to Remove

✅ **Can safely delete:**
- `*.bak`, `*.old`, `*.tmp` files
- Commented-out code blocks
- Unused component files
- Deprecated documentation
- Old design tokens not in use

⚠️ **Check before deleting:**
- Config files (might be used by tools)
- Assets referenced in CSS
- Files in `public/` folder
- Environment variable files

❌ **Never delete:**
- `node_modules` (managed by npm)
- `.git` folder
- Active configuration files
- Files in `.gitignore`

### 4. Removal Checklist

Before removing any file, verify:

- [ ] File is not imported in any `.jsx`, `.tsx`, `.js`, or `.ts` file
- [ ] File is not referenced in CSS (`url()`, `@import`)
- [ ] File is not used in HTML or markdown
- [ ] File is not referenced in `package.json` scripts
- [ ] File is not a config file for installed tools
- [ ] No routes point to this file

### 5. How to Remove Files Safely

```bash
# Search for file references
grep -r "filename" ./app

# Check imports
grep -r "from.*filename" ./app

# Move to archive folder first (safer)
mkdir .archive
mv obsolete-file.js .archive/

# Test the app
npm run dev
npm run build

# If no errors, permanently delete
rm -rf .archive
```

### 6. Current Cleanup Recommendations

Based on your Hydrogen project:

**✅ All files are currently in use!**

Your styles folder is clean:
- `app.css` - Main styles (in use)
- `components.css` - Horizon component styles (in use)
- `product-modal.css` - Modal styles (in use)
- `reset.css` - CSS reset (in use)
- `tabbed-collection.css` - Tab styles (in use)
- `theme.css` - Design tokens (in use)

### 7. Future Cleanup Triggers

Watch for these signs:
- Files with "old", "backup", "copy" in the name
- Multiple versions of the same component
- Commented-out imports
- CSS files not imported in `root.jsx`
- Components not used in any routes

### 8. Automated Cleanup (Optional)

Add to `package.json`:

```json
{
  "scripts": {
    "clean:unused": "find ./app -type f -name '*.old' -delete",
    "clean:bak": "find ./app -type f -name '*.bak' -delete",
    "check:unused": "npx depcheck"
  }
}
```

## Post-Cleanup

After removing files:

1. Test the application thoroughly
2. Run linter: `npm run lint`
3. Run build: `npm run build`
4. Commit changes with descriptive message:
   ```bash
   git add .
   git commit -m "chore: remove obsolete files"
   ```

---

**Remember:** When in doubt, move to an `.archive` folder first, test thoroughly, then delete permanently!
