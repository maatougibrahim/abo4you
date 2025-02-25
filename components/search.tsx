"use client"

import { Input } from "./ui/input"
import { useState, useCallback } from "react"
import { Search as SearchIcon } from "lucide-react"

interface SearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function Search({ 
  onSearch, 
  placeholder = "Search...", 
  className = "" 
}: SearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }, [onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <SearchIcon 
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" 
      />
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="w-full pl-9 pr-4"
      />
    </form>
  )
} 