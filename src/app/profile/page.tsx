"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { User, Settings, Bell, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/ui/loader"), { ssr: false });

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // 🔒 Redirection si pas connecté
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  // ⏳ Pendant le chargement → afficher seulement le loader
  if (loading) return <Loader />;

  // 🛑 Sécurité supplémentaire (au cas où)
  if (!user) return null;

  const sections = [
    {
      title: "Mon profil",
      icon: <User className="w-5 h-5 text-primary" />,
      description: "Gérez vos informations personnelles et préférences.",
      action: () => router.push("/profile/edit"),
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5 text-primary" />,
      description: "Consultez vos alertes et mises à jour.",
      action: () => router.push("/profile/notifications"),
    },
    {
      title: "Statistiques",
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      description: "Visualisez vos performances et activités.",
      action: () => router.push("/profile/stats"),
    },
    {
      title: "Paramètres",
      icon: <Settings className="w-5 h-5 text-primary" />,
      description: "Personnalisez votre expérience sur la plateforme.",
      action: () => router.push("/profile/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Bonjour{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {user.email.split("@")[0]}
              </span>{" "}
              👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Bienvenue dans ton espace personnel.
            </p>
          </div>
        </div>

        {/* Grid sections */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {sections.map((section, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                onClick={section.action}
                className="cursor-pointer border-border hover:border-primary/40 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      {section.icon}
                    </div>
                    <h2 className="font-semibold text-lg">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
