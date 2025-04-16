"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";
import { useSettings } from "@/hooks/use-settings";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";

export const SettingsModal = () => {
  const settings = useSettings();
  const { user } = useUser()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Note taking looks on your device
            </span>
          </div>
          <ModeToggle />
       </div>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          >
            <div className="gap-x-2 flex items-center max-w-[150px]">
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="text-start font-mediun line-clamp-1">
                {user?.username || "Nkouakam romels"}&apos; Note taking
              </span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4 " />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
            <div className="flex items-center gap-x-2">
               <div className="rounded-md bg-secondary p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
               </div>
               <div className="space-y-1">
                <p className="text-sm line-clamp-1">
                    {user?.username || "Nkouakam romels"}&apos; Note taking
                </p>
               </div>
            </div>
          </div>
          <DropdownMenuSeparator/>
          <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
            <SignOutButton>
                   Log out
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </DialogContent>
    </Dialog>
  );
};
