"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login(values);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/url`);
      const authURL = response.data.authURL;
      console.log(response);

      window.location.href = authURL;
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <Card className="bg-zinc-700 text-white">
        <CardHeader className="text-center">
          <CardTitle>Boas vindas de volta!</CardTitle>
          <p>Estamos muito animados em te ver novamente!</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl className="bg-neutral-800">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl className="bg-neutral-800">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                Entrar
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-700 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                className="w-full bg-zinc-700"
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={handleGoogle}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
