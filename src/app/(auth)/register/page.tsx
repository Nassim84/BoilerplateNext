"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/guards/ProtectedRoute";

const registerSchema = z
  .object({
    email: z.email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court (min. 6 caractères)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.email, data.password);
      toast.success("Compte créé avec succès 🎉");
      router.push("/login");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création du compte"
      );
    }
  };

  return (
    <ProtectedRoute requiresAuth={false}>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border border-gray-200/50 shadow-xl dark:border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
                Créer un compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    aria-label="Adresse e-mail"
                    {...register("email")}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    autoComplete="new-password"
                    aria-label="Mot de passe"
                    {...register("password")}
                    className="h-11"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    autoComplete="new-password"
                    aria-label="Confirmation du mot de passe"
                    {...register("confirmPassword")}
                    className="h-11"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Création..." : "Créer mon compte"}
                </Button>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
                  Déjà un compte ?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Se connecter
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
