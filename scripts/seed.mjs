import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "sn7mthea",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documents = [
  // Chef (singleton)
  {
    _id: "chef-principal",
    _type: "chef",
    nom: "Chef Maison Saveur",
    citation:
      "La cuisine n'est pas une simple affaire de goût, c'est un moment de partage absolu où le temps s'arrête.",
  },
  // Services
  {
    _type: "service",
    titre: "Dîner Privé",
    description:
      "Un menu gastronomique en plusieurs temps servi dans l'intimité de votre demeure.",
    ordre: 1,
  },
  {
    _type: "service",
    titre: "Cocktail Réception",
    description:
      "Bouchées créatives et accords mets-vins pour vos célébrations les plus exclusives.",
    ordre: 2,
  },
  {
    _type: "service",
    titre: "Brunch & Déjeuner",
    description:
      "Le charme des matinées ensoleillées. Une cuisine généreuse et raffinée au fil des saisons.",
    ordre: 3,
  },
  // Plats signatures
  {
    _type: "plat",
    nom: "Mijoté d'agneau au thym de garrigue",
    description: "Agneau du Gard longuement mijoté aux herbes de la garrigue.",
    ordre: 1,
  },
  {
    _type: "plat",
    nom: "Légumes oubliés en textures",
    description:
      "Légumes anciens du terroir travaillés en différentes textures.",
    ordre: 2,
  },
  {
    _type: "plat",
    nom: "Soufflé à la lavande et miel du Gard",
    description: "Dessert aérien aux saveurs provençales.",
    ordre: 3,
  },
  {
    _type: "plat",
    nom: "Loup de Méditerranée, émulsion d'agrumes",
    description: "Poisson noble de Méditerranée, agrumes du jardin.",
    ordre: 4,
  },
  {
    _type: "plat",
    nom: "Le jardin d'été en canapés",
    description: "Sélection de canapés frais inspirés du potager.",
    ordre: 5,
  },
  // Temoignages
  {
    _type: "temoignage",
    citation:
      "Maison Saveur a transcendé notre mariage. Le Chef a su capturer l'essence de notre domaine pour offrir à nos invités un voyage sensoriel inoubliable. L'élégance et la discrétion étaient au rendez-vous.",
    auteur: "Élise & Marc",
    occasion: "Mariage au Domaine de Verchant",
    visible: true,
  },
  {
    _type: "temoignage",
    citation:
      "Un dîner d'exception dans notre mas. Chaque assiette racontait une histoire, chaque saveur était une découverte. Une soirée gravée dans nos mémoires.",
    auteur: "Philippe & Nathalie",
    occasion: "Dîner privé à Uzès",
    visible: true,
  },
  {
    _type: "temoignage",
    citation:
      "Le brunch organisé pour notre anniversaire de mariage fut un moment de pure grâce. Des produits sublimes, un service impeccable.",
    auteur: "Sophie & Antoine",
    occasion: "Brunch au Pont du Gard",
    visible: true,
  },
];

async function seed() {
  console.log("Seeding Sanity...");

  for (const doc of documents) {
    try {
      if (doc._id) {
        const result = await client.createOrReplace(doc);
        console.log(`  Created/replaced: ${result._type} (${result._id})`);
      } else {
        const result = await client.create(doc);
        console.log(`  Created: ${result._type} (${result._id})`);
      }
    } catch (err) {
      console.error(`  Error creating ${doc._type}:`, err.message);
    }
  }

  console.log("Seed complete!");
}

seed();
