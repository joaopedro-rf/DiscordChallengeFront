"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";


import { useModal } from "@/hooks/use-modals";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { set } from "react-hook-form";

interface ModalData {
  inviteCode: string;
}

export const InviteModal = () => {
  const { isOpen, onClose, type , data } = useModal();
  const inviteCode = (data as ModalData).inviteCode;
  const [copied , setCopied] = useState(false);
  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    },1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Convite seus amigos
          </DialogTitle>
          
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-secondary/70 ">
            Link de convite do servidor
          </Label>
          <div className="flex items-center mt-2 gap-x-2 ">
            <Input className="bg-zinc-300/50 border-0 focus-visibible:ring-0 text-black focus-visible:ring-offset-0"
            value={inviteCode}></Input>
            <Button onClick={onCopy} size="icon">
              {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
            
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
