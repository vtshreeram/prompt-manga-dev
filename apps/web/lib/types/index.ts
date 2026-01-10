// Prompt Types
export type LogicLevel = "basic" | "advanced" | "pro";

export interface Variable {
  id: string;
  name: string;
  defaultValue?: string;
  description?: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  variables: Variable[];
  logicLevel: LogicLevel;
  contextId: string | null;
  folderId: string | null;
  libraryId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isQuickSaved: boolean;
}

// Library Types
export interface Library {
  id: string;
  name: string;
  prompts: Prompt[];
  createdAt: Date;
  updatedAt: Date;
}

// Folder Types
export interface SmartFolder {
  id: string;
  name: string;
  icon?: string;
  promptCount: number;
  createdAt: Date;
}

// Context Types
export interface ContextMemory {
  id: string;
  name: string;
  description: string;
  content: string;
  type: "project-background" | "brand-guideline" | "custom";
  createdAt: Date;
  updatedAt: Date;
}

// UI State Types
export interface PromptBuilderState {
  content: string;
  logicLevel: LogicLevel;
  selectedContextId: string | null;
  variables: Variable[];
  isDirty: boolean;
}

export interface SavePromptData {
  title: string;
  folderId: string | null;
  libraryIds: string[];
  tags: string[];
}

export interface LibraryFilters {
  logicLevel: LogicLevel | "all";
  folderId: string | "all";
  quickSavedOnly: boolean;
  searchQuery: string;
}
