# Visual Editor Mode (Development Only)

## Overview
The Visual Editor Mode is a lightweight, embedded Figma-style tool that enables developers to manually configure the positioning (`x`, `y`), scaling (`scale`), rotation (`rotation`), opacity (`opacity`), and layer stacking (`zIndex`) of specific visual assets within the `IncentivesSection`.

It applies CSS translations over the existing, responsive Flexbox/Container-Query layout, meaning adjustments are non-destructive and preserve responsiveness across breakpoints.

## Activating Editor Mode
To enable the editor:
1. Open your `.env` or `.env.local` file.
2. Add the following line:
   ```env
   NEXT_PUBLIC_EDITOR_MODE=true
   ```
3. Restart your Next.js development server.

> [!NOTE]
> When this flag is missing or false, the editor components compile out their event listeners and floating panels, leaving zero performance overhead in production.

## Architecture

- **`EditableElement.tsx`**: A wrapper component that intercepts pointer events when Editor Mode is active. It binds to the selected element and updates its `transform` style relative to its flexbox origin.
- **`useEditorState.ts`**: The global context holding the current state of layout values (`x, y, scale...`) in memory. It listens for global keyboard shortcuts.
- **`useDraggable.ts`**: A robust hook that attaches native `pointerdown`, `pointermove`, and `pointerup` handlers for silky-smooth dragging without relying on external libraries.
- **`incentives-layout.ts`**: The source of truth for all layout numbers. It exports `incentivesLayout`.
- **`app/api/editor/save/route.ts`**: The persistent layer. Since browser JS cannot write to your hard drive, this local-only API route receives the JSON payload when you click "Save Layout" and overwrites `incentives-layout.ts` via Node's `fs` module.

## Adding New Editable Elements

To make a new element editable:
1. Open `src/components/sections/IncentivesSection.tsx`.
2. Wrap your target element with `<EditableElement id="your_unique_id">`.
3. If your target element has specific structural Tailwind classes (like `flex` or `absolute`), pass them to the wrapper instead: 
   ```tsx
   <EditableElement id="my_element" className="absolute top-0 flex items-center">
     <div className="inner-content">...</div>
   </EditableElement>
   ```
4. Open `src/config/incentives-layout.ts` and add `"your_unique_id"` to the `incentivesLayout` dictionary with the `defaultTransform` fallback.

## Editor Controls

When `NEXT_PUBLIC_EDITOR_MODE=true` is set:
- **Click** any wrapped element to select it.
- **Drag** elements freely with your mouse.
- Use the **Floating Panel** (top-right) to manually type exact values for Scale, Rotation, Opacity, and Z-Index.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `G` or `D` | Switch to **Drag** mode |
| `S` | Switch to **Scale** mode |
| `R` | Switch to **Rotate** mode |
| `Esc` | Deselect current element |
| `Arrow Keys` | Nudge value by 1 unit (1px, 1deg, or 0.01 scale) |
| `Shift + Arrow` | Nudge value by 10 units |
| `Alt + Arrow` | Nudge value by 0.1 units |

## Save Flow
1. Adjust your layout visually using the mouse or keyboard shortcuts.
2. Click the **💾 Save Layout** button in the floating panel.
3. The API route receives the layout state and permanently overwrites `src/config/incentives-layout.ts`.
4. Your development terminal will recompile the configuration.
5. The exact layout is now the default for all future reloads.

> [!WARNING]
> Do NOT run the visual editor in a production environment. The `/api/editor/save` route includes strict guards that reject requests unless `NODE_ENV === "development"`, but the editor itself should never be shipped to live users.
