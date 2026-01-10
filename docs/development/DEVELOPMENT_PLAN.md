# Prompt Manager - Frontend Development Plan

> **Document Type:** Frontend Development Plan  
> **Scope:** Screen 1 (Central Dashboard), Screen 2 (Browser Extension Panel), Screen 3 (In-Chat Overlay)  
> **UI Framework:** shadcn/ui (radix-vega style) with Tailwind CSS v4  
> **Tech Stack:** Next.js 16, React 19, TypeScript 5

---

## Table of Contents

1. [Overview](#overview)
2. [Quality & Validation Criteria](#quality--validation-criteria)
3. [Design System Guidelines](#design-system-guidelines)
4. [Phase I: Central Dashboard](#phase-i-central-dashboard)
5. [Phase II: Browser Extension Panel](#phase-ii-browser-extension-panel)
6. [Phase III: In-Chat Overlay](#phase-iii-in-chat-overlay)
7. [Mock Data Specifications](#mock-data-specifications)
8. [Component Registry](#component-registry)

---

## Overview

This development plan outlines the frontend implementation for the Prompt Manager application, covering three main screens:

1. **Central Dashboard** - The main web application serving as the command center
2. **Browser Extension Panel** - Sidebar/popup interface for browser extension
3. **In-Chat Overlay** - On-page optimization layer for AI model websites

All functionality described uses **mock behavior only** with no backend integration.

---

## Quality & Validation Criteria

All development must satisfy the following checks before completion:

### 1. Type Check
- Run `bun run check-types` or `turbo run check-types`
- Zero TypeScript errors allowed
- All components must have proper TypeScript interfaces/types
- Props must be explicitly typed (no `any` types)
- Mock data must have corresponding type definitions

### 2. Lint Check
- Run `bun run lint` or `turbo run lint`
- Zero ESLint errors allowed
- Follow Next.js ESLint configuration
- Ensure proper import ordering
- No unused variables or imports

### 3. Build Check
- Run `bun run build` or `turbo run build`
- Zero build errors allowed
- All pages must be statically analyzable where applicable
- No runtime-only dependencies in server components
- Proper "use client" directives where needed

---

## Design System Guidelines

### Mandatory Rules

1. **ONLY use shadcn/ui components** from `@/components/ui`
2. **ONLY reference CSS variables** defined in `globals.css`
3. **ONLY use Tailwind utility classes** with design tokens
4. **NEVER hard-code colors** (e.g., no `#ffffff`, no `rgb()`, no `hsl()`)
5. **NEVER hard-code theme values** (e.g., no `text-gray-500`)
6. **ALWAYS use semantic color tokens** (e.g., `text-foreground`, `bg-background`, `border-border`)

### Available Design Tokens

| Token Category | Variables |
|----------------|-----------|
| **Background** | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`, `bg-secondary` |
| **Foreground** | `text-foreground`, `text-card-foreground`, `text-popover-foreground`, `text-muted-foreground`, `text-accent-foreground`, `text-secondary-foreground` |
| **Primary** | `bg-primary`, `text-primary`, `text-primary-foreground` |
| **Border** | `border-border`, `border-input`, `ring-ring` |
| **Destructive** | `bg-destructive`, `text-destructive` |
| **Sidebar** | `bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`, `border-sidebar-border` |
| **Radius** | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` |

### Existing shadcn/ui Components

The following components are already installed and must be reused:

- `alert-dialog` - For confirmation modals
- `badge` - For tags and status indicators
- `button` - For all interactive buttons
- `card` - For content containers
- `combobox` - For searchable dropdowns
- `dropdown-menu` - For action menus
- `field` - For form field wrappers
- `input-group` - For input with addons
- `input` - For text inputs
- `label` - For form labels
- `select` - For dropdown selections
- `separator` - For visual dividers
- `textarea` - For multi-line text inputs

### Additional Components to Install

```bash
bunx shadcn@latest add dialog
bunx shadcn@latest add tabs
bunx shadcn@latest add tooltip
bunx shadcn@latest add scroll-area
bunx shadcn@latest add toggle-group
bunx shadcn@latest add popover
bunx shadcn@latest add sheet
bunx shadcn@latest add sidebar
bunx shadcn@latest add collapsible
bunx shadcn@latest add progress
```

---

## Phase I: Central Dashboard

### Phase I Overview

Build the main web application dashboard with sidebar navigation and prompt builder functionality.

**Directory Structure:**
```
apps/web/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── library/
│   │   │   └── page.tsx
│   │   ├── folders/
│   │   │   └── [folderId]/
│   │   │       └── page.tsx
│   │   └── context/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── dashboard/
│   │   ├── sidebar/
│   │   ├── prompt-builder/
│   │   └── library/
│   └── shared/
├── lib/
│   ├── utils.ts
│   ├── types/
│   └── mock-data/
└── hooks/
```

---

### Phase I.1: Project Setup & Type Definitions

#### Task 1.1.1: Create Type Definitions

**File:** `apps/web/lib/types/index.ts`

Define TypeScript interfaces for all data models:

```typescript
// Prompt Types
interface Prompt {
  id: string;
  title: string;
  content: string;
  variables: Variable[];
  logicLevel: LogicLevel;
  contextId: string | null;
  folderId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isQuickSaved: boolean;
}

type LogicLevel = 'basic' | 'advanced' | 'pro';

interface Variable {
  id: string;
  name: string;
  defaultValue?: string;
  description?: string;
}

// Folder Types
interface SmartFolder {
  id: string;
  name: string;
  icon?: string;
  promptCount: number;
  createdAt: Date;
}

// Context Types
interface ContextMemory {
  id: string;
  name: string;
  description: string;
  content: string;
  type: 'project-background' | 'brand-guideline' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

// UI State Types
interface PromptBuilderState {
  content: string;
  logicLevel: LogicLevel;
  selectedContextId: string | null;
  variables: Variable[];
  isDirty: boolean;
}
```

**Acceptance Criteria:**
- [ ] All interfaces exported from index file
- [ ] No `any` types used
- [ ] Type check passes with zero errors

---

#### Task 1.1.2: Create Mock Data

**File:** `apps/web/lib/mock-data/index.ts`

Create mock data arrays for all entity types:

- `mockPrompts: Prompt[]` - 10 sample prompts
- `mockFolders: SmartFolder[]` - 5 sample folders
- `mockContexts: ContextMemory[]` - 3 sample contexts

**Mock Behavior Functions:**

```typescript
// Simulated async operations with delay
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const getMockPrompts = async (): Promise<Prompt[]> => {
  await mockDelay();
  return mockPrompts;
};

export const getMockFolders = async (): Promise<SmartFolder[]> => {
  await mockDelay();
  return mockFolders;
};

export const getMockContexts = async (): Promise<ContextMemory[]> => {
  await mockDelay();
  return mockContexts;
};
```

**Acceptance Criteria:**
- [ ] Mock data matches type definitions
- [ ] Realistic sample data provided
- [ ] Async functions simulate network delay

---

### Phase I.2: Sidebar Navigation

#### Task 1.2.1: Create Dashboard Layout with Sidebar

**File:** `apps/web/app/(dashboard)/layout.tsx`

**Component:** `DashboardLayout`

Create the main dashboard layout using shadcn/ui Sidebar component.

**Requirements:**
- Use `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarFooter` from shadcn/ui
- Implement collapsible sidebar with `SidebarTrigger`
- Apply `bg-sidebar` and `text-sidebar-foreground` tokens
- Include header area for branding/logo
- Include main content area with proper padding

**Structure:**
```
┌─────────────────────────────────────────────┐
│ Sidebar Header (Logo/Brand)                 │
├─────────────────────────────────────────────┤
│ Context Memory Manager (Collapsible)        │
├─────────────────────────────────────────────┤
│ Smart Folders (Collapsible List)            │
├─────────────────────────────────────────────┤
│ Library Link                                │
├─────────────────────────────────────────────┤
│ Sidebar Footer                              │
└─────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Uses shadcn/ui Sidebar components
- [ ] Responsive collapse behavior works
- [ ] No hard-coded colors
- [ ] Uses sidebar design tokens

---

#### Task 1.2.2: Create Context Memory Manager Section

**File:** `apps/web/components/dashboard/sidebar/context-memory-section.tsx`

**Component:** `ContextMemorySection`

**Requirements:**
- Collapsible section using shadcn/ui `Collapsible`
- List of context items with `Card` component
- "Add New Context" button using `Button` variant="outline"
- Each item displays: name, type badge, description preview
- Use `Badge` component for context type indicator
- Click handler logs to console (mock behavior)

**Mock Behavior:**
- On load: Display mock contexts from mock data
- On "Add New": Log "Add context clicked" to console
- On item click: Log "Context selected: {id}" to console

**Acceptance Criteria:**
- [ ] Uses Collapsible, Card, Button, Badge components
- [ ] Displays mock context data
- [ ] Console logs for interactions
- [ ] Proper TypeScript props interface

---

#### Task 1.2.3: Create Smart Folders Section

**File:** `apps/web/components/dashboard/sidebar/smart-folders-section.tsx`

**Component:** `SmartFoldersSection`

**Requirements:**
- Collapsible section for folders list
- Each folder item shows: icon, name, prompt count badge
- "Create Folder" button at section bottom
- Folder items are clickable/navigable
- Use `Badge` for prompt count
- Use Lucide icons (`Folder`, `Plus`)

**Mock Behavior:**
- On load: Display mock folders from mock data
- On folder click: Log "Navigate to folder: {id}" to console
- On "Create Folder": Log "Create folder clicked" to console

**Acceptance Criteria:**
- [ ] Uses Collapsible, Badge, Button components
- [ ] Lucide icons properly imported
- [ ] Displays mock folder data
- [ ] Console logs for interactions

---

#### Task 1.2.4: Create Library Navigation Link

**File:** `apps/web/components/dashboard/sidebar/library-link.tsx`

**Component:** `LibraryLink`

**Requirements:**
- Navigation link using `Button` variant="ghost"
- Library icon from Lucide (`Library` or `BookOpen`)
- Shows total prompt count badge
- Active state styling using `bg-sidebar-accent`

**Mock Behavior:**
- Display count from mock prompts array length
- On click: Log "Navigate to library" to console

**Acceptance Criteria:**
- [ ] Uses Button, Badge components
- [ ] Proper active state styling
- [ ] No hard-coded colors

---

### Phase I.3: Prompt Builder

#### Task 1.3.1: Create Prompt Builder Container

**File:** `apps/web/components/dashboard/prompt-builder/prompt-builder.tsx`

**Component:** `PromptBuilder`

**Requirements:**
- Main container using `Card` component
- Card header with title "Prompt Builder"
- Sections for each sub-component
- Use `Separator` between sections
- Manage local state with `useState` for builder state

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Card Header: "Prompt Builder"               │
├─────────────────────────────────────────────┤
│ Input Area (Textarea)                       │
├─────────────────────────────────────────────┤
│ Logic Level Selector                        │
├─────────────────────────────────────────────┤
│ Dynamic Variable Injector                   │
├─────────────────────────────────────────────┤
│ Context Genie Selector                      │
├─────────────────────────────────────────────┤
│ Action Buttons                              │
└─────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Uses Card, Separator components
- [ ] State management for form data
- [ ] Proper TypeScript state interface

---

#### Task 1.3.2: Create Input Area Component

**File:** `apps/web/components/dashboard/prompt-builder/input-area.tsx`

**Component:** `InputArea`

**Props Interface:**
```typescript
interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Requirements:**
- Use shadcn/ui `Textarea` component
- Use `Label` component for field label
- Use `Field` wrapper for proper spacing
- Placeholder text: "Enter your rough idea or draft..."
- Auto-resize behavior (min 4 rows, max 12 rows)
- Character count display using `text-muted-foreground`

**Mock Behavior:**
- On change: Update parent state via callback
- Display character count in real-time

**Acceptance Criteria:**
- [ ] Uses Textarea, Label, Field components
- [ ] Props properly typed
- [ ] No hard-coded colors for character count

---

#### Task 1.3.3: Create Logic Level Selector

**File:** `apps/web/components/dashboard/prompt-builder/logic-level-selector.tsx`

**Component:** `LogicLevelSelector`

**Props Interface:**
```typescript
interface LogicLevelSelectorProps {
  value: LogicLevel;
  onChange: (value: LogicLevel) => void;
}
```

**Requirements:**
- Use shadcn/ui `ToggleGroup` with `ToggleGroupItem`
- Three options: Basic, Advanced, Pro
- Each option shows label and brief description via `Tooltip`
- Visual indication of selected state
- Use `Label` for section title

**Levels:**
| Level | Label | Description |
|-------|-------|-------------|
| `basic` | Basic | Simple, straightforward prompts |
| `advanced` | Advanced | Refined prompts with structure |
| `pro` | Pro | Complex, multi-layered prompts |

**Mock Behavior:**
- On selection: Update parent state via callback
- Log "Logic level changed to: {level}" to console

**Acceptance Criteria:**
- [ ] Uses ToggleGroup, Tooltip, Label components
- [ ] All three levels functional
- [ ] Proper TypeScript enum usage

---

#### Task 1.3.4: Create Dynamic Variable Injector

**File:** `apps/web/components/dashboard/prompt-builder/variable-injector.tsx`

**Component:** `VariableInjector`

**Props Interface:**
```typescript
interface VariableInjectorProps {
  variables: Variable[];
  onAddVariable: (variable: Variable) => void;
  onRemoveVariable: (variableId: string) => void;
  onInsertVariable: (variableName: string) => void;
}
```

**Requirements:**
- Use `Input` for new variable name entry
- Use `Button` to add variable
- Display existing variables as `Badge` components with remove action
- Click on badge inserts `{{variable_name}}` at cursor position
- Use `Popover` for variable creation form
- Variable name validation (alphanumeric and underscore only)

**UI Layout:**
```
┌─────────────────────────────────────────────┐
│ Label: "Variables"                          │
│ ┌─────────────────────────────────────────┐ │
│ │ [variable_1] [product_name] [+Add]      │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Mock Behavior:**
- On add: Generate UUID for new variable, add to list
- On remove: Remove from list
- On badge click: Log "Insert variable: {{name}}" to console
- Validate: Only allow valid variable names

**Acceptance Criteria:**
- [ ] Uses Input, Button, Badge, Popover components
- [ ] Variable validation working
- [ ] Console logs for actions

---

#### Task 1.3.5: Create Context Genie Selector

**File:** `apps/web/components/dashboard/prompt-builder/context-selector.tsx`

**Component:** `ContextSelector`

**Props Interface:**
```typescript
interface ContextSelectorProps {
  value: string | null;
  onChange: (contextId: string | null) => void;
  contexts: ContextMemory[];
}
```

**Requirements:**
- Use shadcn/ui `Select` component
- Placeholder: "Select context..."
- Option to clear selection ("None")
- Each option shows context name and type
- Display selected context preview below dropdown
- Use `Card` variant for preview container

**Mock Behavior:**
- Load contexts from mock data
- On selection: Update parent state
- Show context content preview when selected

**Acceptance Criteria:**
- [ ] Uses Select, Card components
- [ ] Loads mock context data
- [ ] Clear selection option works

---

#### Task 1.3.6: Create Action Buttons

**File:** `apps/web/components/dashboard/prompt-builder/action-buttons.tsx`

**Component:** `ActionButtons`

**Props Interface:**
```typescript
interface ActionButtonsProps {
  onGenerate: () => void;
  onSave: () => void;
  isGenerating: boolean;
  canSave: boolean;
}
```

**Requirements:**
- "Generate / Optimize" button using `Button` variant="default"
- "Save & Tag" button using `Button` variant="outline"
- Loading state for generate button
- Disabled state when form is empty
- Use Lucide icons (`Sparkles`, `Save`)
- Flex layout with gap

**Mock Behavior:**
- On Generate: Set loading state, wait 1.5s, log "Generated optimized prompt" to console
- On Save: Open save modal (trigger callback)

**Acceptance Criteria:**
- [ ] Uses Button component with proper variants
- [ ] Loading and disabled states work
- [ ] Lucide icons properly used

---

#### Task 1.3.7: Create Save & Tag Modal

**File:** `apps/web/components/dashboard/prompt-builder/save-modal.tsx`

**Component:** `SaveModal`

**Props Interface:**
```typescript
interface SaveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SavePromptData) => void;
  folders: SmartFolder[];
}

interface SavePromptData {
  title: string;
  folderId: string | null;
  tags: string[];
}
```

**Requirements:**
- Use shadcn/ui `Dialog` component
- Form fields:
  - Title input (`Input`)
  - Folder selector (`Select`)
  - Tags input (`Input` with comma separation)
- Display existing tags as `Badge` components
- Cancel and Save buttons in footer
- Form validation (title required)

**Mock Behavior:**
- On save: Log save data to console, close modal
- On cancel: Close modal without action

**Acceptance Criteria:**
- [ ] Uses Dialog, Input, Select, Badge, Button components
- [ ] Form validation working
- [ ] Modal open/close behavior correct

---

### Phase I.4: Library View

#### Task 1.4.1: Create Library Page

**File:** `apps/web/app/(dashboard)/library/page.tsx`

**Component:** `LibraryPage`

**Requirements:**
- Page header with title "Prompt Library"
- Search/filter bar
- Prompt grid/list view
- Empty state component
- Use `Card` components for prompt items

**Mock Behavior:**
- Load prompts from mock data
- Filter by search term (client-side)

**Acceptance Criteria:**
- [ ] Server component for page
- [ ] Proper data loading pattern
- [ ] Uses semantic color tokens

---

#### Task 1.4.2: Create Library Search Bar

**File:** `apps/web/components/dashboard/library/search-bar.tsx`

**Component:** `LibrarySearchBar`

**Props Interface:**
```typescript
interface LibrarySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange: (filters: LibraryFilters) => void;
}

interface LibraryFilters {
  logicLevel: LogicLevel | 'all';
  folderId: string | 'all';
  quickSavedOnly: boolean;
}
```

**Requirements:**
- Search input using `InputGroup` with search icon
- Filter dropdowns using `Select`
- Quick filter toggle for "Quick Saved" items
- Use `DropdownMenu` for advanced filters
- Debounced search (300ms)

**Mock Behavior:**
- On search: Filter mock data client-side
- On filter change: Update filter state

**Acceptance Criteria:**
- [ ] Uses InputGroup, Select, DropdownMenu components
- [ ] Debounce implemented
- [ ] All filters functional

---

#### Task 1.4.3: Create Prompt Card Component

**File:** `apps/web/components/dashboard/library/prompt-card.tsx`

**Component:** `PromptCard`

**Props Interface:**
```typescript
interface PromptCardProps {
  prompt: Prompt;
  onEdit: (promptId: string) => void;
  onDelete: (promptId: string) => void;
  onDuplicate: (promptId: string) => void;
}
```

**Requirements:**
- Use `Card`, `CardHeader`, `CardContent`, `CardFooter`
- Display: title, content preview (truncated), logic level badge, tags
- Action menu using `DropdownMenu` (Edit, Duplicate, Delete)
- "Quick Saved" indicator badge if applicable
- Variable count indicator
- Hover state with `bg-accent`

**Mock Behavior:**
- On edit: Log "Edit prompt: {id}" to console
- On delete: Show confirmation dialog, log deletion
- On duplicate: Log "Duplicate prompt: {id}" to console

**Acceptance Criteria:**
- [ ] Uses Card, Badge, DropdownMenu, AlertDialog components
- [ ] Content properly truncated
- [ ] All actions have console logs

---

#### Task 1.4.4: Create Library Empty State

**File:** `apps/web/components/dashboard/library/empty-state.tsx`

**Component:** `LibraryEmptyState`

**Requirements:**
- Centered container
- Illustration placeholder (use Lucide icon `FileQuestion`)
- Heading: "No prompts yet"
- Description text
- CTA button: "Create your first prompt"
- Use `text-muted-foreground` for description

**Mock Behavior:**
- On CTA click: Navigate to prompt builder (log action)

**Acceptance Criteria:**
- [ ] Uses Button component
- [ ] Proper text color tokens
- [ ] Centered layout

---

### Phase I.5: Context Management Page

#### Task 1.5.1: Create Context Management Page

**File:** `apps/web/app/(dashboard)/context/page.tsx`

**Component:** `ContextPage`

**Requirements:**
- Page header with "Context Memory Manager" title
- Add new context button
- List/grid of context items
- Use `Card` components for context items

**Mock Behavior:**
- Load contexts from mock data

**Acceptance Criteria:**
- [ ] Proper page structure
- [ ] Mock data loading

---

#### Task 1.5.2: Create Context Card Component

**File:** `apps/web/components/dashboard/context/context-card.tsx`

**Component:** `ContextCard`

**Props Interface:**
```typescript
interface ContextCardProps {
  context: ContextMemory;
  onEdit: (contextId: string) => void;
  onDelete: (contextId: string) => void;
}
```

**Requirements:**
- Use `Card` with header, content sections
- Display: name, type badge, description, content preview
- Last updated timestamp
- Edit and Delete actions in dropdown menu

**Mock Behavior:**
- On edit: Log "Edit context: {id}" to console
- On delete: Show confirmation, log deletion

**Acceptance Criteria:**
- [ ] Uses Card, Badge, DropdownMenu, AlertDialog components
- [ ] Proper date formatting
- [ ] Delete confirmation working

---

#### Task 1.5.3: Create Context Editor Modal

**File:** `apps/web/components/dashboard/context/context-editor.tsx`

**Component:** `ContextEditor`

**Props Interface:**
```typescript
interface ContextEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: ContextMemory; // undefined for new context
  onSave: (context: Omit<ContextMemory, 'id' | 'createdAt' | 'updatedAt'>) => void;
}
```

**Requirements:**
- Use `Dialog` component
- Form fields:
  - Name (`Input`)
  - Description (`Input`)
  - Type (`Select` - project-background, brand-guideline, custom)
  - Content (`Textarea` with large height)
- Form validation (name and content required)
- Cancel and Save buttons

**Mock Behavior:**
- On save: Log context data to console, close modal

**Acceptance Criteria:**
- [ ] Uses Dialog, Input, Select, Textarea, Button components
- [ ] Form validation working
- [ ] Edit mode pre-fills data

---

### Phase I Checklist Summary

| Task | Component | Status |
|------|-----------|--------|
| 1.1.1 | Type Definitions | ☐ |
| 1.1.2 | Mock Data | ☐ |
| 1.2.1 | Dashboard Layout | ☐ |
| 1.2.2 | Context Memory Section | ☐ |
| 1.2.3 | Smart Folders Section | ☐ |
| 1.2.4 | Library Link | ☐ |
| 1.3.1 | Prompt Builder Container | ☐ |
| 1.3.2 | Input Area | ☐ |
| 1.3.3 | Logic Level Selector | ☐ |
| 1.3.4 | Variable Injector | ☐ |
| 1.3.5 | Context Selector | ☐ |
| 1.3.6 | Action Buttons | ☐ |
| 1.3.7 | Save Modal | ☐ |
| 1.4.1 | Library Page | ☐ |
| 1.4.2 | Library Search Bar | ☐ |
| 1.4.3 | Prompt Card | ☐ |
| 1.4.4 | Library Empty State | ☐ |
| 1.5.1 | Context Page | ☐ |
| 1.5.2 | Context Card | ☐ |
| 1.5.3 | Context Editor Modal | ☐ |

---

## Phase II: Browser Extension Panel

### Phase II Overview

Build the browser extension popup/sidebar interface for prompt management.

**Note:** This phase focuses on the extension UI as a standalone React application that will be bundled for the browser extension. The same components should be reusable.

**Directory Structure:**
```
apps/web/
├── components/
│   └── extension/
│       ├── extension-panel.tsx
│       ├── platform-header.tsx
│       ├── folder-navigation.tsx
│       ├── search-bar.tsx
│       ├── prompt-list.tsx
│       ├── prompt-item.tsx
│       └── variable-injection-modal.tsx
```

---

### Phase II.1: Extension Panel Foundation

#### Task 2.1.1: Create Extension Panel Container

**File:** `apps/web/components/extension/extension-panel.tsx`

**Component:** `ExtensionPanel`

**Requirements:**
- Fixed width container (350px) suitable for browser extension sidebar
- Use `Card` as main container
- Scrollable content area using `ScrollArea`
- Stack layout for sections
- Compact padding for extension context

**Layout:**
```
┌──────────────────────────┐
│ Platform Detection Header│
├──────────────────────────┤
│ Search Bar               │
├──────────────────────────┤
│ Folder Navigation        │
│ └── Prompt List          │
│     └── Prompt Items     │
└──────────────────────────┘
```

**Mock Behavior:**
- Panel state management for selected folder
- Search state management

**Acceptance Criteria:**
- [ ] Uses Card, ScrollArea components
- [ ] Fixed width appropriate for extension
- [ ] Compact design tokens used

---

#### Task 2.1.2: Create Platform Detection Header

**File:** `apps/web/components/extension/platform-header.tsx`

**Component:** `PlatformHeader`

**Props Interface:**
```typescript
type AIPlatform = 'chatgpt' | 'gemini' | 'claude' | 'unknown';

interface PlatformHeaderProps {
  platform: AIPlatform;
}
```

**Requirements:**
- Display detected AI platform icon and name
- Platform-specific styling (using semantic tokens only)
- Fallback for unknown platforms
- Use Lucide icons or simple text indicators
- Compact header design with `bg-muted`

**Platform Display:**
| Platform | Display Name | Icon |
|----------|--------------|------|
| `chatgpt` | ChatGPT | `MessageSquare` |
| `gemini` | Gemini | `Sparkles` |
| `claude` | Claude | `Bot` |
| `unknown` | AI Assistant | `HelpCircle` |

**Mock Behavior:**
- Accept platform as prop (mock value: 'chatgpt')
- Display corresponding icon and name

**Acceptance Criteria:**
- [ ] Uses semantic color tokens only
- [ ] All platforms have fallback
- [ ] Lucide icons used

---

#### Task 2.1.3: Create Extension Search Bar

**File:** `apps/web/components/extension/search-bar.tsx`

**Component:** `ExtensionSearchBar`

**Props Interface:**
```typescript
interface ExtensionSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
```

**Requirements:**
- Compact search input using `Input` component
- Search icon using `InputGroup`
- Clear button when value present
- Debounced search (200ms)
- Placeholder: "Search prompts..."

**Mock Behavior:**
- On change: Update parent state via callback
- Filter results client-side

**Acceptance Criteria:**
- [ ] Uses Input, InputGroup components
- [ ] Debounce implemented
- [ ] Clear functionality works

---

### Phase II.2: Folder Navigation

#### Task 2.2.1: Create Folder Navigation

**File:** `apps/web/components/extension/folder-navigation.tsx`

**Component:** `FolderNavigation`

**Props Interface:**
```typescript
interface FolderNavigationProps {
  folders: SmartFolder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}
```

**Requirements:**
- Vertical list of folders using `Button` variant="ghost"
- "All Prompts" option at top
- Each folder shows: icon, name, prompt count badge
- Selected state using `bg-accent`
- Collapsible section using `Collapsible`
- Compact item height for extension context

**Mock Behavior:**
- Load folders from mock data
- On folder click: Update selected folder state

**Acceptance Criteria:**
- [ ] Uses Button, Badge, Collapsible components
- [ ] Selected state styling correct
- [ ] Compact design for extension

---

### Phase II.3: Prompt Selection & Customization

#### Task 2.3.1: Create Prompt List

**File:** `apps/web/components/extension/prompt-list.tsx`

**Component:** `PromptList`

**Props Interface:**
```typescript
interface PromptListProps {
  prompts: Prompt[];
  onSelectPrompt: (prompt: Prompt) => void;
  searchQuery: string;
}
```

**Requirements:**
- Virtualized/scrollable list using `ScrollArea`
- Filter prompts based on search query
- Display `PromptItem` for each prompt
- Empty state when no results
- Loading skeleton state

**Mock Behavior:**
- Filter mock prompts by search query
- On prompt select: Open variable injection modal

**Acceptance Criteria:**
- [ ] Uses ScrollArea component
- [ ] Client-side filtering works
- [ ] Empty state displayed when no results

---

#### Task 2.3.2: Create Prompt Item

**File:** `apps/web/components/extension/prompt-item.tsx`

**Component:** `PromptItem`

**Props Interface:**
```typescript
interface PromptItemProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
}
```

**Requirements:**
- Compact card design using base elements with `cn()` utility
- Display: title, content preview (2 lines max), variable count
- Logic level indicator using `Badge`
- Hover state with `bg-accent`
- Click triggers selection

**Mock Behavior:**
- On click: Call onSelect with prompt data

**Acceptance Criteria:**
- [ ] Uses Badge component
- [ ] Content properly truncated
- [ ] Hover state uses design tokens

---

#### Task 2.3.3: Create Variable Injection Modal

**File:** `apps/web/components/extension/variable-injection-modal.tsx`

**Component:** `VariableInjectionModal`

**Props Interface:**
```typescript
interface VariableInjectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt | null;
  onUsePrompt: (filledPrompt: string) => void;
}
```

**Requirements:**
- Use `Dialog` component (compact variant)
- Display prompt title and preview
- Generate `Input` field for each `{{variable}}`
- Input label shows variable name
- Placeholder shows default value if available
- "Use Prompt" button at bottom
- Real-time preview of filled prompt

**Variable Processing:**
```typescript
// Parse variables from prompt content
const parseVariables = (content: string): string[] => {
  const regex = /\{\{(\w+)\}\}/g;
  const matches = content.match(regex) || [];
  return [...new Set(matches.map(m => m.slice(2, -2)))];
};

// Replace variables with values
const fillVariables = (content: string, values: Record<string, string>): string => {
  return content.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
};
```

**Mock Behavior:**
- On use prompt: Combine context + prompt + variables, log final prompt to console
- Log "Injected prompt into AI input" to console

**Acceptance Criteria:**
- [ ] Uses Dialog, Input, Button, Label components
- [ ] All variables have input fields
- [ ] Live preview updates correctly
- [ ] Final prompt combination logic correct

---

### Phase II.4: Use Prompt Action

#### Task 2.4.1: Create Use Prompt Button Component

**File:** `apps/web/components/extension/use-prompt-button.tsx`

**Component:** `UsePromptButton`

**Props Interface:**
```typescript
interface UsePromptButtonProps {
  onUse: () => void;
  disabled: boolean;
  isInjecting: boolean;
}
```

**Requirements:**
- Primary `Button` component
- Loading state while "injecting"
- Icon: `Send` from Lucide
- Full width in modal footer
- Text: "Use Prompt"

**Mock Behavior:**
- On click: Set injecting state, wait 500ms, log injection, reset state

**Acceptance Criteria:**
- [ ] Uses Button component
- [ ] Loading state works
- [ ] Proper disabled handling

---

### Phase II Checklist Summary

| Task | Component | Status |
|------|-----------|--------|
| 2.1.1 | Extension Panel Container | ☐ |
| 2.1.2 | Platform Detection Header | ☐ |
| 2.1.3 | Extension Search Bar | ☐ |
| 2.2.1 | Folder Navigation | ☐ |
| 2.3.1 | Prompt List | ☐ |
| 2.3.2 | Prompt Item | ☐ |
| 2.3.3 | Variable Injection Modal | ☐ |
| 2.4.1 | Use Prompt Button | ☐ |

---

## Phase III: In-Chat Overlay

### Phase III Overview

Build the floating overlay components that appear on AI model websites.

**Note:** These components are designed to be rendered as an overlay layer on third-party websites. They must be self-contained and use inline-compatible styles.

**Directory Structure:**
```
apps/web/
├── components/
│   └── overlay/
│       ├── genie-icon.tsx
│       ├── feedback-indicator.tsx
│       ├── enhancement-overlay.tsx
│       ├── quick-save-button.tsx
│       └── overlay-container.tsx
```

---

### Phase III.1: Input Bar Integration

#### Task 3.1.1: Create Overlay Container

**File:** `apps/web/components/overlay/overlay-container.tsx`

**Component:** `OverlayContainer`

**Props Interface:**
```typescript
interface OverlayContainerProps {
  children: React.ReactNode;
  position: 'input-adjacent' | 'floating';
}
```

**Requirements:**
- Portal-based rendering for overlay isolation
- Position handling for different placement modes
- Z-index management using CSS variables
- Transparent background with contained children
- Use CSS custom properties for positioning

**Mock Behavior:**
- Render children in positioned container
- Position prop determines layout style

**Acceptance Criteria:**
- [ ] Portal rendering working
- [ ] Position modes implemented
- [ ] Z-index properly managed

---

#### Task 3.1.2: Create Genie Icon Button

**File:** `apps/web/components/overlay/genie-icon.tsx`

**Component:** `GenieIcon`

**Props Interface:**
```typescript
interface GenieIconProps {
  onClick: () => void;
  isActive: boolean;
  hasOptimizations: boolean;
}
```

**Requirements:**
- Small floating `Button` (icon only variant)
- Custom icon or Lucide `Wand2`
- Tooltip on hover using `Tooltip` component
- Pulsing animation when optimizations available
- Active state styling with `bg-primary`
- Size: 32x32px

**Animation (using Tailwind):**
```css
/* Use animate class from tw-animate-css */
.animate-pulse-subtle {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Mock Behavior:**
- On click: Toggle enhancement overlay
- Active state changes visual appearance

**Acceptance Criteria:**
- [ ] Uses Button, Tooltip components
- [ ] Animation uses Tailwind classes
- [ ] Proper size and positioning

---

#### Task 3.1.3: Create Real-Time Feedback UI

**File:** `apps/web/components/overlay/feedback-indicator.tsx`

**Component:** `FeedbackIndicator`

**Props Interface:**
```typescript
interface FeedbackIndicatorProps {
  promptText: string;
  isVisible: boolean;
}

interface PromptScore {
  overall: number; // 0-100
  clarity: number;
  specificity: number;
  structure: number;
}
```

**Requirements:**
- Small indicator bar/badge near input
- Display "Super Prompt Score" (0-100)
- Color coding using semantic tokens:
  - Low (0-40): `text-destructive`
  - Medium (41-70): `text-muted-foreground`
  - High (71-100): `text-primary`
- Use `Progress` component for score bar
- Compact design that doesn't obstruct typing

**Mock Behavior:**
- Calculate mock score based on text length and keywords
- Update score in real-time as user types (debounced 500ms)

**Mock Score Algorithm:**
```typescript
const calculateMockScore = (text: string): PromptScore => {
  const length = text.length;
  const hasContext = text.toLowerCase().includes('context');
  const hasRole = text.toLowerCase().includes('you are') || text.toLowerCase().includes('act as');
  const hasFormat = text.toLowerCase().includes('format') || text.toLowerCase().includes('output');
  
  let base = Math.min(length / 5, 40);
  if (hasContext) base += 20;
  if (hasRole) base += 20;
  if (hasFormat) base += 20;
  
  return {
    overall: Math.min(Math.round(base), 100),
    clarity: Math.round(Math.random() * 30 + 50),
    specificity: Math.round(Math.random() * 30 + 50),
    structure: Math.round(Math.random() * 30 + 50),
  };
};
```

**Acceptance Criteria:**
- [ ] Uses Progress, Badge components
- [ ] Score color coding works
- [ ] Debounced updates implemented

---

### Phase III.2: Optimization Interaction

#### Task 3.2.1: Create Enhancement Overlay

**File:** `apps/web/components/overlay/enhancement-overlay.tsx`

**Component:** `EnhancementOverlay`

**Props Interface:**
```typescript
interface EnhancementOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalText: string;
  onApply: (enhancedText: string) => void;
}
```

**Requirements:**
- Use `Popover` or `Sheet` component
- Two-column or stacked layout:
  - Left/Top: Original text (readonly)
  - Right/Bottom: Enhanced text
- Visual diff highlighting (optional, use `bg-accent` for additions)
- Apply button using `Button` variant="default"
- Close button using `Button` variant="ghost"
- Smooth open/close transitions

**Mock Enhancement Algorithm:**
```typescript
const mockEnhancePrompt = (text: string): string => {
  // Mock enhancement logic
  const enhancements = [
    `You are an expert assistant. `,
    `\n\nPlease provide a detailed and structured response.`,
    `\n\nFormat your response with clear sections and bullet points where appropriate.`,
  ];
  
  let enhanced = text;
  if (!text.toLowerCase().includes('you are')) {
    enhanced = enhancements[0] + enhanced;
  }
  if (!text.includes('format') && !text.includes('structure')) {
    enhanced += enhancements[1];
  }
  enhanced += enhancements[2];
  
  return enhanced;
};
```

**Mock Behavior:**
- On open: Generate enhanced version of original text
- On apply: Log enhanced text, call onApply callback, close overlay

**Acceptance Criteria:**
- [ ] Uses Popover/Sheet, Button components
- [ ] Original and enhanced text displayed
- [ ] Mock enhancement generates reasonable output

---

#### Task 3.2.2: Create Apply Button

**File:** `apps/web/components/overlay/apply-button.tsx`

**Component:** `ApplyButton`

**Props Interface:**
```typescript
interface ApplyButtonProps {
  onClick: () => void;
  isApplying: boolean;
}
```

**Requirements:**
- `Button` component with icon `Check` or `Replace`
- Loading state during application
- Text: "Apply Enhancement"
- Full width within overlay footer

**Mock Behavior:**
- On click: Set applying state, wait 300ms, trigger apply callback

**Acceptance Criteria:**
- [ ] Uses Button component
- [ ] Loading state works
- [ ] Lucide icon used

---

#### Task 3.2.3: Create Quick Save Button

**File:** `apps/web/components/overlay/quick-save-button.tsx`

**Component:** `QuickSaveButton`

**Props Interface:**
```typescript
interface QuickSaveButtonProps {
  onSave: () => void;
  isSaved: boolean;
  isVisible: boolean;
}
```

**Requirements:**
- Small icon button using `Button` size="sm" variant="ghost"
- Icon: `Bookmark` (outline) or `BookmarkCheck` (filled when saved)
- Tooltip: "Quick Save to Library"
- Positioned adjacent to injected text
- Visual feedback on save (icon change)

**Mock Behavior:**
- On click: Toggle saved state, log "Quick saved prompt to library" to console
- Show success state for 2 seconds, then reset

**Acceptance Criteria:**
- [ ] Uses Button, Tooltip components
- [ ] Icon toggles on save
- [ ] Proper positioning

---

### Phase III.3: Overlay State Management

#### Task 3.3.1: Create Overlay State Hook

**File:** `apps/web/hooks/use-overlay-state.ts`

**Hook:** `useOverlayState`

**Return Interface:**
```typescript
interface OverlayState {
  isGenieActive: boolean;
  isEnhancementOpen: boolean;
  isFeedbackVisible: boolean;
  currentText: string;
  promptScore: PromptScore | null;
  enhancedText: string | null;
  isSaved: boolean;
}

interface OverlayActions {
  toggleGenie: () => void;
  openEnhancement: () => void;
  closeEnhancement: () => void;
  updateText: (text: string) => void;
  applyEnhancement: () => void;
  quickSave: () => void;
}

const useOverlayState = (): [OverlayState, OverlayActions];
```

**Requirements:**
- Centralized state management for overlay components
- Debounced score calculation
- Enhancement generation on demand
- Save state management

**Mock Behavior:**
- All state changes logged to console
- Debounced updates for performance

**Acceptance Criteria:**
- [ ] All state fields properly typed
- [ ] Actions update state correctly
- [ ] Debounce implemented where needed

---

#### Task 3.3.2: Create Demo Page for Overlay

**File:** `apps/web/app/(dashboard)/overlay-demo/page.tsx`

**Component:** `OverlayDemoPage`

**Requirements:**
- Demo page showing overlay components in isolation
- Mock text input area simulating AI chat input
- All overlay components rendered and interactive
- Documentation of component usage

**Mock Behavior:**
- Fully interactive demo of overlay functionality
- Console logs for all interactions

**Acceptance Criteria:**
- [ ] All overlay components rendered
- [ ] Interactive demo works
- [ ] Serves as component documentation

---

### Phase III Checklist Summary

| Task | Component | Status |
|------|-----------|--------|
| 3.1.1 | Overlay Container | ☐ |
| 3.1.2 | Genie Icon Button | ☐ |
| 3.1.3 | Feedback Indicator | ☐ |
| 3.2.1 | Enhancement Overlay | ☐ |
| 3.2.2 | Apply Button | ☐ |
| 3.2.3 | Quick Save Button | ☐ |
| 3.3.1 | Overlay State Hook | ☐ |
| 3.3.2 | Demo Page | ☐ |

---

## Mock Data Specifications

### Prompt Mock Data

```typescript
export const mockPrompts: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'Blog Post Outline Generator',
    content: 'Create a detailed blog post outline about {{topic}}. The target audience is {{audience}}. Include an introduction, 5 main sections, and a conclusion.',
    variables: [
      { id: 'var-1', name: 'topic', defaultValue: 'technology trends' },
      { id: 'var-2', name: 'audience', defaultValue: 'beginners' }
    ],
    logicLevel: 'advanced',
    contextId: 'context-1',
    folderId: 'folder-1',
    tags: ['content', 'blog', 'writing'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    isQuickSaved: false
  },
  // ... 9 more prompts
];
```

### Folder Mock Data

```typescript
export const mockFolders: SmartFolder[] = [
  {
    id: 'folder-1',
    name: 'Content Creation',
    icon: 'pen-tool',
    promptCount: 5,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'folder-2',
    name: 'Social Media Strategy',
    icon: 'share-2',
    promptCount: 3,
    createdAt: new Date('2024-01-05')
  },
  // ... 3 more folders
];
```

### Context Mock Data

```typescript
export const mockContexts: ContextMemory[] = [
  {
    id: 'context-1',
    name: 'Tech Startup Brand',
    description: 'Brand guidelines for our tech startup',
    content: 'We are an innovative tech startup focused on AI solutions. Our tone is professional yet approachable. We target enterprise clients but communicate in plain language.',
    type: 'brand-guideline',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  // ... 2 more contexts
];
```

---

## Component Registry

### shadcn/ui Components Required

| Component | Phase | Installation |
|-----------|-------|--------------|
| `alert-dialog` | I, II | ✅ Installed |
| `badge` | I, II, III | ✅ Installed |
| `button` | I, II, III | ✅ Installed |
| `card` | I, II | ✅ Installed |
| `collapsible` | I, II | 🔧 Install |
| `combobox` | I | ✅ Installed |
| `dialog` | I, II | 🔧 Install |
| `dropdown-menu` | I, II | ✅ Installed |
| `field` | I | ✅ Installed |
| `input-group` | I, II | ✅ Installed |
| `input` | I, II, III | ✅ Installed |
| `label` | I, II | ✅ Installed |
| `popover` | I, III | 🔧 Install |
| `progress` | III | 🔧 Install |
| `scroll-area` | II | 🔧 Install |
| `select` | I, II | ✅ Installed |
| `separator` | I | ✅ Installed |
| `sheet` | III | 🔧 Install |
| `sidebar` | I | 🔧 Install |
| `tabs` | I | 🔧 Install |
| `textarea` | I | ✅ Installed |
| `toggle-group` | I | 🔧 Install |
| `tooltip` | I, II, III | 🔧 Install |

### Installation Commands

```bash
# Navigate to web app directory
cd apps/web

# Install required shadcn/ui components
bunx shadcn@latest add collapsible
bunx shadcn@latest add dialog
bunx shadcn@latest add popover
bunx shadcn@latest add progress
bunx shadcn@latest add scroll-area
bunx shadcn@latest add sheet
bunx shadcn@latest add sidebar
bunx shadcn@latest add tabs
bunx shadcn@latest add toggle-group
bunx shadcn@latest add tooltip
```

---

## Validation Commands

Run these commands at project root to validate development:

```bash
# Type checking
bun run check-types

# Linting
bun run lint

# Build verification
bun run build

# All checks (recommended before PR)
bun run check-types && bun run lint && bun run build
```

---

## Document Version

- **Version:** 1.0.0
- **Last Updated:** See git history
- **Author:** Development Team
- **Status:** Ready for Implementation