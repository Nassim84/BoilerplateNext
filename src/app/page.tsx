"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, LogOut, Gauge, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ultrarapide",
      description:
        "Performances optimales et chargement instantané pour une expérience sans friction.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurisé",
      description:
        "Vos données sont protégées par les meilleures normes de sécurité du secteur.",
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Scalable",
      description:
        "Grandit avec vous, peu importe la taille de votre utilisation.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboratif",
      description:
        "Travaillez en équipe avec des outils conçus pour la collaboration.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Utilisateurs actifs" },
    { value: "99.9%", label: "Disponibilité" },
    { value: "24/7", label: "Support client" },
    { value: "4s", label: "Temps de réponse" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
            >
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                notre plateforme
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
            >
              La solution complète pour transformer votre façon de travailler.
              Rapide, sécurisé et conçu pour les équipes modernes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <div className="text-center flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <p className="text-base text-muted-foreground mb-4 sm:mb-0">
                    👋 Ravi de te revoir{" "}
                    <span className="font-semibold text-primary">
                      {user?.email.split("@")[0]}
                    </span>
                    !
                  </p>

                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="gap-2"
                      onClick={() => router.push("/profile")}
                    >
                      Aller à mon espace
                      <ArrowRight className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2"
                      onClick={logout} // ton logout avec mise à jour immédiate du context
                    >
                      <LogOut className="w-4 h-4" /> Déconnexion
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => router.push("/login")}
                  >
                    Commencer maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.push("/register")}
                  >
                    Créer un compte gratuit
                  </Button>
                </>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 rounded-2xl border border-border bg-card/50 backdrop-blur p-2"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    Interface moderne et intuitive
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-y border-border bg-card/50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-balance"
            >
              Pourquoi nous choisir ?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Nos fonctionnalités sont conçues pour vous aider à réussir
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-primary-foreground text-balance"
            >
              Prêt à transformer votre productivité ?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-primary-foreground/90 max-w-2xl mx-auto"
            >
              Rejoignez des milliers d'utilisateurs qui font confiance à notre
              plateforme pour gérer leurs projets.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                onClick={() => router.push("/register")}
              >
                Créer mon compte gratuitement
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TonApplication — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
