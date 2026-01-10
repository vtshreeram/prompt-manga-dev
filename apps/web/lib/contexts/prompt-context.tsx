"use client";

import * as React from "react";

interface PromptContextValue {
  resetPrompt: () => void;
  onReset: (callback: () => void) => () => void;
}

const PromptContext = React.createContext<PromptContextValue | undefined>(
  undefined,
);

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const resetCallbacks = React.useRef<Set<() => void>>(new Set());

  const resetPrompt = React.useCallback(() => {
    resetCallbacks.current.forEach((callback) => callback());
  }, []);

  const onReset = React.useCallback((callback: () => void) => {
    resetCallbacks.current.add(callback);
    return () => {
      resetCallbacks.current.delete(callback);
    };
  }, []);

  const value: PromptContextValue = {
    resetPrompt,
    onReset,
  };

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = React.useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
}
