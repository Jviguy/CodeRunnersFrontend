"use client"

import { Code2, ChevronDown, Settings, LogOut } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

interface LoggedInHeaderProps {
  username: string
  experience: string
  language: string
}

export function LoggedInHeader({ username, experience, language }: LoggedInHeaderProps) {
  const router = useRouter()

  const handleChangeData = () => {
    router.push("/start")
  }

  const handleSignOut = () => {
    localStorage.removeItem("crucibleUser")
    router.push("/")
  }

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-mono text-lg font-bold">The Crucible</span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-sans">Welcome back,</p>
                  <p className="font-mono font-bold text-foreground">{username}</p>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {experience}
                </Badge>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <p className="font-mono font-semibold text-foreground">{username}</p>
                <p className="text-xs text-muted-foreground font-sans">
                  {experience} • {language}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleChangeData} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                <span className="font-sans">Change Data</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="font-sans">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
