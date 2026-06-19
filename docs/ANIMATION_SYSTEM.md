# Animation System

## Motion Philosophy
This website requires a **premium, cinematic, and editorial** animation language. It must avoid bouncy, elastic, or overly flashy effects. The user should *feel* the motion without noticing the animation.

All animations strictly adhere to these visual properties:
1. **Opacity**
2. **Blur (`filter`)**
3. **TranslateY**
4. **Stagger**

*We do not animate Width, Height, Top, or Left, ensuring optimal browser performance (GPU acceleration).*

---

## The Hooks Architecture

The framework is located in `src/lib/animations/`.

### Configuration (`animationConfig.ts`)
Controls global properties like our signature luxury easing (`[0.16, 1, 0.3, 1]`) and the default `top 85%` scroll trigger logic (`VIEWPORT`).

### `useEditorialReveal`
**Purpose**: Major Headings (e.g. SPIRIT OF ANTARAGNI).
**Animation**: `opacity: 0, filter: blur(12px), translateY: 40px` ➔ `opacity: 1, blur: 0, translateY: 0`
**Duration**: 1.2s
**Usage**:
```tsx
const { ref, controls, initial } = useEditorialReveal();
<motion.div ref={ref} initial={initial} animate={controls}>
  <EditorialHeading>LOREM IPSUM</EditorialHeading>
</motion.div>
```

### `useFadeUp`
**Purpose**: Paragraphs and body content. Subtle and elegant.
**Animation**: `opacity: 0, translateY: 20px` ➔ `opacity: 1, translateY: 0`
**Usage**:
```tsx
const { ref, controls, initial } = useFadeUp();
<motion.div ref={ref} initial={initial} animate={controls}>
  <BodyText>Description here...</BodyText>
</motion.div>
```

### `useImageReveal`
**Purpose**: Hero silhouettes and cinematic backgrounds. Avoids lateral slides.
**Animation**: `opacity: 0, scale: 1.04, filter: blur(10px)` ➔ `opacity: 1, scale: 1, blur: 0`
**Usage**:
```tsx
const { ref, controls, initial } = useImageReveal();
<motion.img ref={ref} initial={initial} animate={controls} src="..." />
```

### `useCounter`
**Purpose**: Festival and Ambassador statistics.
**Animation**: Counts up from 0 to the target value when intersecting the viewport. Runs strictly **once**.
**Usage**:
```tsx
const { ref, value } = useCounter(150, 2); // Count to 150 over 2 seconds
<motion.div ref={ref}>
  <StatisticBlock value={value.toString()} />
</motion.div>
```

### `useStaggerHeading`
**Purpose**: High-end word-by-word or line-by-line reveals. Avoids cheap letter-by-letter effects.
**Usage**: Provides `containerVariants` and `childVariants` to map over words seamlessly.

---

## Future Extension Guidelines
If new animations are required, they must:
1. Be encapsulated in a custom React Hook within `src/lib/animations/`.
2. Use the central `ANIMATION_CONFIG.EASING` and `ANIMATION_CONFIG.VIEWPORT`.
3. Never use `repeat: Infinity` loops unless specifically justified (e.g., a very subtle slow pan).
4. Rely exclusively on GPU-accelerated CSS properties.
