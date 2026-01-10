"use client";

import * as React from "react";
import { Library, Prompt } from "@/lib/types";

interface LibraryContextValue {
  libraries: Library[];
  createLibrary: (name: string) => void;
  deleteLibrary: (libraryId: string) => void;
  addPromptToLibraries: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">, libraryIds: string[]) => void;
  getLibraryById: (libraryId: string) => Library | undefined;
  isLoading: boolean;
}

const LibraryContext = React.createContext<LibraryContextValue | undefined>(
  undefined,
);

const STORAGE_KEY_LIBRARIES = "prompt-manager-libraries";

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [libraries, setLibraries] = React.useState<Library[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load libraries from localStorage on mount
  React.useEffect(() => {
    try {
      const savedLibraries = localStorage.getItem(STORAGE_KEY_LIBRARIES);
      if (savedLibraries) {
        const parsed = JSON.parse(savedLibraries) as Library[];
        // Convert date strings back to Date objects
        const librariesWithDates = parsed.map((lib) => ({
          ...lib,
          createdAt: new Date(lib.createdAt),
          updatedAt: new Date(lib.updatedAt),
          prompts: lib.prompts.map((prompt) => ({
            ...prompt,
            createdAt: new Date(prompt.createdAt),
            updatedAt: new Date(prompt.updatedAt),
          })),
        }));
        setLibraries(librariesWithDates);
      }
    } catch (error) {
      console.error("Failed to load libraries from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save libraries to localStorage whenever they change
  React.useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY_LIBRARIES, JSON.stringify(libraries));
      } catch (error) {
        console.error("Failed to save libraries to localStorage:", error);
      }
    }
  }, [libraries, isLoading]);

  const createLibrary = React.useCallback((name: string) => {
    const newLibrary: Library = {
      id: `lib_${Date.now()}`,
      name,
      prompts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setLibraries((prev) => [...prev, newLibrary]);
  }, []);

  const deleteLibrary = React.useCallback((libraryId: string) => {
    setLibraries((prev) => prev.filter((lib) => lib.id !== libraryId));
  }, []);

  const addPromptToLibraries = React.useCallback(
    (
      promptData: Omit<Prompt, "id" | "createdAt" | "updatedAt">,
      libraryIds: string[],
    ) => {
      const newPrompt: Prompt = {
        ...promptData,
        id: `prm_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setLibraries((prev) =>
        prev.map((lib) => {
          if (libraryIds.includes(lib.id)) {
            return {
              ...lib,
              prompts: [...lib.prompts, newPrompt],
              updatedAt: new Date(),
            };
          }
          return lib;
        }),
      );
    },
    [],
  );

  const getLibraryById = React.useCallback(
    (libraryId: string) => {
      return libraries.find((lib) => lib.id === libraryId);
    },
    [libraries],
  );

  const value: LibraryContextValue = {
    libraries,
    createLibrary,
    deleteLibrary,
    addPromptToLibraries,
    getLibraryById,
    isLoading,
  };

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = React.useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
