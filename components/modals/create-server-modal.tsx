"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCreateGuild } from "@/hooks/use-create-guild";
import { useCallback } from "react";
import { useModal } from "@/hooks/use-modals";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome do servidor deve ter pelo menos 1 caractere.",
    })
    .max(30),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;
  const { createGuild, isLoading, error } = useCreateGuild();
  const isModalOpen = isOpen && type === "createServer";
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const googleId = Cookies.get("googleId");
      if (googleId) {
        try {
          await createGuild({ ...values, googleId: parseInt(googleId) });
          handleClose();
        } catch (error) {
          console.error("Failed to create guild:", error);
        }
      } else {
        console.error("Google ID not found in cookies");
      }
    },
    [createGuild]
  );

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Personalize seu servidor
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Deixe seu novo servidor com a sua cara dando um nome e um ícone a
            ele. Se quiser, é possível mudar depois.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center"></div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Nome do servidor
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Nome do servidor"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant={"primary"}>Criar</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
