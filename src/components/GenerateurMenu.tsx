"use client";

import { useState } from "react";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  UtensilsCrossed,
} from "lucide-react";

const occasions = [
  { id: "anniversaire", label: "Anniversaire", icon: "gift" },
  { id: "mariage", label: "Mariage / Fiançailles", icon: "heart" },
  { id: "professionnel", label: "Dîner professionnel", icon: "briefcase" },
  { id: "romantique", label: "Soirée romantique", icon: "flame" },
  { id: "famille", label: "Réunion de famille", icon: "users" },
  { id: "autre", label: "Autre occasion", icon: "sparkles" },
];

const contraintes = [
  { id: "aucune", label: "Aucune contrainte" },
  { id: "vegetarien", label: "Végétarien" },
  { id: "vegan", label: "Vegan" },
  { id: "sans-gluten", label: "Sans gluten" },
  { id: "halal", label: "Halal" },
  { id: "sans-lactose", label: "Sans lactose" },
];

const budgets = [
  { id: "essentiel", label: "Essentiel", prix: "65 / pers.", description: "3 services" },
  { id: "signature", label: "Signature", prix: "95 / pers.", description: "5 services" },
  { id: "prestige", label: "Prestige", prix: "145 / pers.", description: "7 services + accords vins" },
];

const FALLBACK_MENU = `**Amuse-bouche**
Velouté de courgette au basilic, tuile parmesan

**Entrée**
Carpaccio de Saint-Jacques, émulsion citron caviar, huile d'olive des Alpilles

**Poisson**
Filet de loup en croûte d'herbes, risotto crémeux aux cèpes, jus de crustacés

**Viande**
Agneau des Causses rôti, jus aux herbes de garrigue, légumes confits du marché

**Pré-dessert**
Granité de verveine, sorbet citron vert

**Dessert**
Millefeuille revisité à la lavande, crème légère vanille Bourbon`;

export default function GenerateurMenu() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [selections, setSelections] = useState({
    occasion: "",
    contrainte: "",
    budget: "",
  });

  const generateMenu = async () => {
    setLoading(true);
    setStep(4);
    try {
      const response = await fetch("/api/generate-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selections),
      });
      const data = await response.json();
      setMenu(data.menu || FALLBACK_MENU);
    } catch {
      setMenu(FALLBACK_MENU);
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(0);
    setMenu(null);
    setSelections({ occasion: "", contrainte: "", budget: "" });
  };

  return (
    <section className="py-24 bg-dark-bg">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6">
            <Sparkles size={14} className="text-tertiary-fixed" />
            <span className="text-tertiary-fixed text-[10px] tracking-[0.3em] uppercase font-bold">
              Propulsé par l&apos;IA
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-4">
            Votre menu sur mesure
          </h2>
          <p className="text-outline text-sm">
            Décrivez votre soirée, notre IA compose votre menu gastronomique en 5 secondes.
          </p>
        </div>

        <div className="bg-surface p-8 md:p-10">
          {/* Step 0 - Intro */}
          {step === 0 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 bg-surface-container flex items-center justify-center">
                <UtensilsCrossed size={36} className="text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-4">
                Créez votre menu idéal
              </h3>
              <p className="text-on-surface-variant mb-8 max-w-sm mx-auto">
                3 questions / 5 secondes / Un menu gastronomique personnalisé
              </p>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-colors group"
              >
                <Sparkles size={16} />
                Générer mon menu
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          )}

          {/* Step 1 - Occasion */}
          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-2">
                Étape 1 sur 3
              </p>
              <h3 className="font-serif text-xl text-on-surface mb-6">
                Quelle est l&apos;occasion ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {occasions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSelections({ ...selections, occasion: o.id });
                      setStep(2);
                    }}
                    className="p-4 border border-outline-variant text-left hover:border-primary hover:bg-surface-container-low transition-all group"
                  >
                    <Sparkles size={20} className="text-primary/40 mb-2" />
                    <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                      {o.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Contraintes */}
          {step === 2 && (
            <div className="animate-fade-in">
              <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-2">
                Étape 2 sur 3
              </p>
              <h3 className="font-serif text-xl text-on-surface mb-6">
                Contraintes alimentaires ?
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {contraintes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelections({ ...selections, contrainte: c.id });
                      setStep(3);
                    }}
                    className="p-4 border border-outline-variant text-left hover:border-primary hover:bg-surface-container-low transition-all text-sm font-medium text-on-surface hover:text-primary"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-outline hover:text-on-surface-variant"
              >
                <ChevronLeft size={16} /> Retour
              </button>
            </div>
          )}

          {/* Step 3 - Budget */}
          {step === 3 && (
            <div className="animate-fade-in">
              <p className="text-[10px] tracking-[0.3em] uppercase text-outline mb-2">
                Étape 3 sur 3
              </p>
              <h3 className="font-serif text-xl text-on-surface mb-6">
                Votre budget ?
              </h3>
              <div className="space-y-3 mb-6">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelections({ ...selections, budget: b.id });
                      generateMenu();
                    }}
                    className="w-full p-5 border border-outline-variant text-left hover:border-primary hover:bg-surface-container-low transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        {b.label}
                      </div>
                      <div className="text-xs text-outline">{b.description}</div>
                    </div>
                    <div className="text-primary font-bold">{b.prix}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-sm text-outline hover:text-on-surface-variant"
              >
                <ChevronLeft size={16} /> Retour
              </button>
            </div>
          )}

          {/* Step 4 - Loading + Result */}
          {step === 4 && (
            <div className="animate-fade-in">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <Sparkles size={24} className="text-primary animate-spin" />
                    <span className="font-serif italic text-on-surface-variant text-lg">
                      Le Chef compose votre menu...
                    </span>
                  </div>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {[
                      "Analyse de vos préférences...",
                      "Sélection des produits de saison...",
                      "Composition des accords...",
                    ].map((txt, i) => (
                      <div
                        key={i}
                        className="text-xs text-outline tracking-wide animate-pulse"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      >
                        {txt}
                      </div>
                    ))}
                  </div>
                </div>
              ) : menu ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      <span className="text-xs tracking-widest uppercase text-primary font-bold">
                        Menu généré par IA
                      </span>
                    </div>
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 text-xs text-outline hover:text-on-surface-variant"
                    >
                      <RefreshCw size={14} />
                      Recommencer
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    {menu.split("\n\n").map((block, i) => {
                      const lines = block.split("\n");
                      const title = lines[0].replace(/\*\*/g, "");
                      const content = lines.slice(1).join("\n");

                      return (
                        <div
                          key={i}
                          className="border-l-2 border-outline-variant pl-4 py-1"
                        >
                          <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold mb-1">
                            {title}
                          </p>
                          <p className="font-serif italic text-on-surface text-sm leading-relaxed">
                            {content}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-surface-container-low p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-on-surface-variant italic font-serif">
                      Ce menu vous inspire ?
                    </p>
                    <a
                      href="#contact"
                      className="shrink-0 bg-primary text-white px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-primary-container transition-colors flex items-center gap-2"
                    >
                      Réserver avec ce menu
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
