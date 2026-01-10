"use client";

import * as React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogicLevel, LibraryFilters } from "@/lib/types";

interface LibrarySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange: (filters: Omit<LibraryFilters, "searchQuery">) => void;
}

export function LibrarySearchBar({
  value,
  onChange,
  onFilterChange,
}: LibrarySearchBarProps) {
  const [localValue, setLocalValue] = React.useState(value);
  const [filters, setFilters] = React.useState<
    Omit<LibraryFilters, "searchQuery">
  >({
    logicLevel: "all",
    folderId: "all",
    quickSavedOnly: false,
  });

  // Sync local value with prop if prop changes externally
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search update to parent
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleFilterUpdate = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search prompts..."
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={filters.logicLevel}
          onValueChange={(val) =>
            handleFilterUpdate({ logicLevel: val as LogicLevel | "all" })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Logic Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={
                filters.quickSavedOnly ? "bg-accent text-accent-foreground" : ""
              }
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.quickSavedOnly}
              onCheckedChange={(checked) =>
                handleFilterUpdate({ quickSavedOnly: checked })
              }
            >
              Quick Saved Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
