# Context Manager (Pro) - Visual Walkthrough

## 🎨 Visual Guide to Context Manager

This guide shows you exactly what the Context Manager feature looks like and how to use it.

---

## 📱 Feature Location

The Context Manager is accessed via the **"Context (Pro)"** button in the prompt builder:

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [Enhance your conversations...]                             │
│                                                               │
│  ┌───────────────────┐  ┌────────────────────┐              │
│  │  ⚪ Basic ▼       │  │  👑 Context (Pro)  │  [Generate]  │
│  └───────────────────┘  └────────────────────┘              │
│                              ↑                                │
│                         Click Here!                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Default State (No Context Active)

### Button Appearance
```
┌────────────────────┐
│  👑 Context (Pro)  │  ← Gray/Muted Colors
└────────────────────┘     Outline Crown Icon
```

**Visual Characteristics:**
- Text: `Context (Pro)` in muted gray
- Icon: Outline crown (not filled)
- Border: Dashed, muted color
- Background: Transparent or light gray

---

## ✨ Active State (Context Selected)

### Button Appearance
```
┌──────────────────────┐
│  👑 Marketing Voice  │  ← ORANGE Colors!
└──────────────────────┘     Filled Crown Icon
```

**Visual Characteristics:**
- Text: Context name in **orange** (`text-orange-600`)
- Icon: **Filled** crown in orange
- Border: Solid orange (`border-orange-600/30`)
- Background: Light orange tint (`bg-orange-50`)
- Hover: Slightly darker orange

---

## 📋 View 1: Context List (Default View)

### Modal Structure
```
┌──────────────────────────────────────────┐
│  Select Active Context              [×]  │  ← Header
├──────────────────────────────────────────┤
│  🔍 [Search contexts...]                 │  ← Search Bar
├──────────────────────────────────────────┤
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  👑  Marketing Voice          ◉   │  │  ← Active (Selected)
│  │      Use a professional, witty... │  │     Orange Border
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  👑  Tech Documentation       ○   │  │  ← Inactive
│  │      Write clear, concise...      │  │     Gray Border
│  └────────────────────────────────────┘  │
│                                           │  ← Scrollable List
│  ┌────────────────────────────────────┐  │
│  │  👑  Startup Pitch            ○   │  │
│  │      Focus on problem-solution... │  │
│  └────────────────────────────────────┘  │
│                                           │
├──────────────────────────────────────────┤
│         [+ Create New Context]           │  ← Footer Button
└──────────────────────────────────────────┘
```

### Context Row (Active)
```
┌────────────────────────────────────────┐
│  👑  Marketing Voice              ◉   │  ← Orange border
│      Use a professional, witty tone.   │     Filled radio
│      Target Gen Z. Avoid jargon.       │     Orange icon
└────────────────────────────────────────┘
```

### Context Row (Inactive)
```
┌────────────────────────────────────────┐
│  👑  Tech Documentation           ○   │  ← Gray border
│      Write clear, concise docs for...  │     Empty radio
└────────────────────────────────────────┘     Gray icon
       Hover → Border turns orange
```

### Empty State
```
┌──────────────────────────────────────────┐
│  Select Active Context              [×]  │
├──────────────────────────────────────────┤
│  🔍 [Search contexts...]                 │
├──────────────────────────────────────────┤
│                                           │
│                  📁                       │
│                                           │
│     No contexts yet.                     │
│     Create your first one!               │
│                                           │
├──────────────────────────────────────────┤
│         [+ Create New Context]           │
└──────────────────────────────────────────┘
```

---

## ✏️ View 2: Create Context

### Modal Structure
```
┌──────────────────────────────────────────┐
│  ← Back    New Context Memory            │  ← Header with Back
├──────────────────────────────────────────┤
│                                           │
│  Context Name                            │
│  [e.g., My Startup Pitch...........]     │  ← Name Input
│                                           │
│  Context Instructions                    │
│  ┌───────────────────────────────────┐  │
│  │ Describe your project background, │  │  ← Large Textarea
│  │ brand voice, or rules here.       │  │
│  │ This will be added to every       │  │
│  │ prompt silently.                  │  │
│  │                                    │  │
│  │                                    │  │
│  └───────────────────────────────────┘  │
│                                           │
├──────────────────────────────────────────┤
│        [Cancel]    [Save Context]        │  ← Footer Actions
└──────────────────────────────────────────┘
```

### Form Validation (Error State)
```
Context Name
[                           ]  ← Empty field
❌ Context name is required     ← Error message in red

Context Instructions
┌───────────────────────────┐
│                            │  ← Empty field
└───────────────────────────┘
❌ Context instructions are required
```

---

## 🎬 Interaction Flow (Step-by-Step)

### Flow 1: First Time User (Creating Context)

**Step 1: Click Button**
```
[👑 Context (Pro)]  →  Click
```

**Step 2: Modal Opens (Empty State)**
```
┌─────────────────────────┐
│   📁                    │
│   No contexts yet.      │
│   Create your first!    │
│                         │
│ [+ Create New Context]  │ → Click
└─────────────────────────┘
```

**Step 3: Create Form**
```
← Back    New Context Memory

Context Name
[Marketing Voice_____]  ← Type here

Context Instructions
┌──────────────────────────┐
│ Use professional, witty  │ ← Type here
│ tone. Target Gen Z...    │
└──────────────────────────┘

        [Save Context]  → Click
```

**Step 4: Auto-Selected & Closed**
```
Modal closes automatically
Button updates:
[👑 Marketing Voice]  ← Orange! Active!
```

---

### Flow 2: Switching Contexts

**Step 1: Click Active Context**
```
[👑 Marketing Voice]  →  Click
      (Orange)
```

**Step 2: See List with Active**
```
┌────────────────────────┐
│ 👑 Marketing Voice  ◉ │ ← Currently active
├────────────────────────┤
│ 👑 Tech Docs        ○ │ ← Click to switch
├────────────────────────┤
│ 👑 Startup Pitch    ○ │
└────────────────────────┘
```

**Step 3: Select Different Context**
```
Click → [👑 Tech Docs  ○]
```

**Step 4: Modal Closes, Button Updates**
```
[👑 Tech Docs]  ← Button now shows new context
    (Orange)
```

---

### Flow 3: Searching Contexts

**Large Context Library:**
```
┌─────────────────────────────┐
│ 🔍 [market________]  ← Type │
├─────────────────────────────┤
│ 👑 Marketing Voice      ◉  │ ← Matches!
├─────────────────────────────┤
│ 👑 Market Research      ○  │ ← Matches!
└─────────────────────────────┘
                ↑
        Other contexts hidden
```

**Real-time Filtering:**
- Searches both title AND content
- Case-insensitive
- Instant results (no delay)

---

## 🎨 Color Palette

### Default/Inactive State
- **Text**: `text-muted-foreground` (gray)
- **Border**: `border-muted-foreground/30` (light gray, dashed)
- **Background**: `transparent` or `hover:bg-muted/50`
- **Icon**: Outline crown, primary color

### Active State
- **Light Mode**:
  - Text: `text-orange-600` 🟠
  - Border: `border-orange-600/30`
  - Background: `bg-orange-50`
  - Hover: `hover:bg-orange-100`
  
- **Dark Mode**:
  - Text: `text-orange-500` 🟠
  - Border: `border-orange-500/30`
  - Background: `bg-orange-950/30`
  - Hover: `hover:bg-orange-950/50`

- **Icon**: Filled crown (`fill-current`)

### Selected Row (in List)
- **Border**: `border-primary` (matches theme primary)
- **Background**: `bg-primary/5` (subtle tint)
- **Radio**: Filled circle with inner dot

---

## 📱 Responsive Design

### Desktop (> 640px)
```
┌────────────────────────────────────┐
│     Modal centered, max-w-540px    │
│     Full features visible          │
└────────────────────────────────────┘
```

### Mobile (< 640px)
```
┌──────────────────────┐
│   Modal full-width   │
│   with margins       │
│   Scrollable content │
└──────────────────────┘
```

---

## 🎭 Animation & Transitions

### Modal Open/Close
```
Open:  Fade in + Scale up (zoom-in-95)
Close: Fade out + Scale down (zoom-out-95)
Duration: 100ms
```

### Backdrop
```
Blur effect: backdrop-blur-sm
Fade: fade-in-0 / fade-out-0
Overlay: bg-black/10
```

### Button Hover
```
Default → Hover: bg-muted/50
Active → Hover: bg-orange-100 (darker orange)
Smooth transition on all properties
```

### Context Row Hover
```
Normal → Hover:
  - Border: border-primary/50
  - Background: bg-accent/50
  - Smooth transition
```

---

## 🔍 Detailed Components

### Search Input
```
┌─────────────────────────────────┐
│ 🔍  Search contexts...          │
└─────────────────────────────────┘
  ↑ Icon inside input (left)
```

### Radio Button (Unselected)
```
○  ← Empty circle, gray border
   Hover: border turns orange
```

### Radio Button (Selected)
```
◉  ← Filled circle, orange border
   Inner white dot
```

### Back Button
```
← Back  ← Arrow icon + text
        Ghost button style
```

### Crown Icon Variants
```
Default:  👑 (outline)
Active:   👑 (filled with orange)
```

---

## 💡 Visual Cues

### User Knows Context is Active
1. ✅ Button text changes from "Context (Pro)" → Context name
2. ✅ Button color changes from gray → orange
3. ✅ Crown icon changes from outline → filled
4. ✅ Background gets orange tint

### User Knows Context is Selected in List
1. ✅ Orange border around the row
2. ✅ Orange radio button (filled)
3. ✅ Light orange background tint
4. ✅ Orange crown icon

### User Knows Field Has Error
1. ✅ Red error message below field
2. ✅ Field has `aria-invalid` attribute
3. ✅ Error appears inline (not modal popup)

---

## 📐 Dimensions

### Modal
- **Max Width**: 540px (desktop)
- **Max Height**: 80vh
- **Padding**: 6 units (1.5rem)
- **Border Radius**: xl (0.625rem)

### Context List
- **Max Height**: 320px (scrollable)
- **Row Height**: Auto (based on content)
- **Row Padding**: 4 units (1rem)

### Inputs
- **Height**: 9 units (2.25rem)
- **Textarea Min Height**: 160px (40 units)

### Icons
- **Crown**: 5×5 units (1.25rem)
- **Search**: 4×4 units (1rem)
- **Back Arrow**: 4×4 units (1rem)

---

## 🎯 Visual Hierarchy

### Importance Order
1. **Primary Action**: "Save Context" / "Create New Context" (solid button)
2. **Context Selection**: Large clickable rows
3. **Search**: Prominent at top
4. **Secondary Actions**: "Cancel", "Back" (outline buttons)
5. **Close**: X icon (subtle, top-right)

---

## ✨ Polish Details

### Micro-interactions
- Hover states on all interactive elements
- Smooth color transitions (not instant)
- Radio button animation on select
- Modal slide-in effect
- Backdrop blur for depth

### Typography
- **Modal Title**: text-lg, font-semibold
- **Context Title**: text-sm, font-medium
- **Context Preview**: text-xs, muted
- **Labels**: text-sm
- **Error Messages**: text-xs, destructive

### Spacing
- Consistent padding: 6 units (header/footer)
- Row spacing: 2 units gap
- Form field spacing: 5 units gap
- Icon-text spacing: 2-3 units

---

## 🖼️ Complete Visual Example

### Full User Journey
```
STEP 1: Default State
┌──────────────────────────────────────┐
│ [Enhance your conversations...]      │
│                                      │
│ [👑 Context (Pro)]  [Generate]      │ ← Click Context
└──────────────────────────────────────┘

STEP 2: Create First Context
┌─────────────────────────────────┐
│ ← Back  New Context Memory      │
│                                  │
│ Context Name                    │
│ [Marketing Voice_______]        │
│                                  │
│ Context Instructions            │
│ ┌─────────────────────────────┐ │
│ │ Professional, witty tone... │ │
│ └─────────────────────────────┘ │
│                                  │
│      [Cancel] [Save Context]    │ ← Click Save
└─────────────────────────────────┘

STEP 3: Context Active
┌──────────────────────────────────────┐
│ [Enhance your conversations...]      │
│                                      │
│ [👑 Marketing Voice]  [Generate]    │ ← Orange! Active!
└──────────────────────────────────────┘

STEP 4: Type Prompt
┌──────────────────────────────────────┐
│ Write a product launch email___      │ ← User types
│                                      │
│ [👑 Marketing Voice]  [Generate]    │ ← Click Generate
└──────────────────────────────────────┘

STEP 5: Behind the Scenes
┌─────────────────────────────────────┐
│ ACTUAL PROMPT SENT:                 │
│                                     │
│ Professional, witty tone...         │ ← Context prepended
│                                     │ ← Blank line
│ Write a product launch email        │ ← User input
└─────────────────────────────────────┘
```

---

## 🎨 Design Principles

1. **Clarity**: User always knows if context is active
2. **Feedback**: Visual confirmation on every action
3. **Consistency**: Matches existing design system
4. **Simplicity**: Minimal clicks to accomplish tasks
5. **Discoverability**: Search helps find contexts easily
6. **Accessibility**: Proper contrast, labels, ARIA

---

**Visual Guide Complete!** 🎉

For interactive demo, run the app and click the "Context (Pro)" button!