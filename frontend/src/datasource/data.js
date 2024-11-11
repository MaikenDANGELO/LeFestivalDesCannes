let prestataires = [
    {
      id: "1",
      nom: "Jeux et Divertissements",
      description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.",
      description_accueil: "Jeux et animations pour tous.",
      categorie: "Activité",
      id_emplacement: "8",
      id_evenement: "1",
      page_route: '/prestataire/1',
      image: "jeu_divertissement.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "2",
      nom: "Restaurant Le Gourmet",
      description: "Restaurant proposant une variété de plats traditionnels et internationaux, mettant en avant des ingrédients locaux et de saison. Profitez d'un menu diversifié avec des options pour tous les goûts, y compris des plats végétariens, végétaliens, et sans gluten. Le cadre chaleureux et accueillant rend chaque repas une expérience mémorable.",
      description_accueil: "Cuisine variée et ingrédients locaux.",
      categorie: "Gastronomie",
      id_emplacement: "1",
      id_evenement: "1",
      page_route: '/prestataire/2',
      image: "restaurant.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "3",
      nom: "Mascotte Festival",
      description: "Notre mascotte officielle anime le festival et pose pour des photos avec les visiteurs. En plus de cela, la mascotte participe à des parades et des spectacles tout au long de l'événement, apportant de la joie et de l'énergie aux petits et grands. Ne manquez pas les séances de dédicaces et les moments de partage avec notre mascotte emblématique.",
      description_accueil: "Animations et photos avec la mascotte.",
      categorie: "Mascotte",
      id_emplacement: "2",
      id_evenement: "1",
      page_route: '/prestataire/3',
      image: "mascotte.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "4",
      nom: "Stand Artisanat Local",
      description: "Découvrez et achetez des produits artisanaux locaux fabriqués par nos prestataires. Le stand propose une variété d'articles allant des bijoux faits main aux objets en céramique, en passant par des peintures et des œuvres d'art uniques. Participez à des ateliers de création pour apprendre les techniques artisanales et repartez avec vos propres créations.",
      description_accueil: "Produits artisanaux uniques.",
      categorie: "Activité",
      id_emplacement: "3",
      id_evenement: "1",
      page_route: '/prestataire/4',
      image: "stand.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "5",
      nom: "Dégustation de Canard",
      description: "Venez déguster une variété de plats à base de canard, préparés par des chefs renommés. Découvrez des recettes traditionnelles et innovantes, toutes mettant en vedette le canard sous ses meilleures formes.",
      description_accueil: "Dégustation de plats à base de canard.",
      categorie: "Gastronomie",
      id_emplacement: "4",
      id_evenement: "1",
      page_route: '/prestataire/5',
      image: "degustation_canard.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "6",
      nom: "Concours de Cuisine ",
      description: "Participez ou assistez à un concours de cuisine où des chefs amateurs et professionnels se défient pour créer le meilleur plat à base de canard. Un jury de renom évaluera les créations et décernera des prix aux meilleurs chefs.",
      description_accueil: "Concours de cuisine autour du canard.",
      categorie: "Événement",
      id_emplacement: "5",
      id_evenement: "1",
      page_route: '/prestataire/6',
      image: "concours_cuisine_canard.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "7",
      nom: "Atelier Peinture ",
      description: "Découvrez l'art de la peinture sur canard. Participez à cet atelier unique où des artistes locaux vous montreront comment créer des œuvres d'art étonnantes en utilisant des canards comme toile.",
      description_accueil: "Atelier de peinture sur canard.",
      categorie: "Activité",
      id_emplacement: "6",
      id_evenement: "1",
      page_route: '/prestataire/7',
      image: "atelier_peinture_canard.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    },
    {
      id: "8",
      nom: "Parade des Canards",
      description: "Assistez à une parade spectaculaire mettant en vedette des canards ornés de costumes colorés. Profitez de la musique, des danses, et des chars magnifiquement décorés pour célébrer la culture du canard.",
      description_accueil: "Parade des canards colorée.",
      categorie: "Événement",
      id_emplacement: "7",
      id_evenement: "1",
      page_route: '/prestataire/8',
      image: "parade_canards.jpg",
      services: [
        {
          id_service: "1",
          nom_service: "service1",
          description_service: "description",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    }
  ];

  let sponsors = [
    {
      id_sponsor: "1",
      nom_sponsor: "BirdLife International",
      description_accueil: "Soutenir la protection des cannes sauvages à travers le monde.",
      description: "BirdLife International est un leader mondial en matière de protection des oiseaux et de conservation des habitats naturels. Ils soutiennent activement la préservation des espèces d'ansériformes grâce à des actions locales et internationales.",
      image: "logo.png",
    },
    {
      id_sponsor: "2",
      nom_sponsor: "Wild Ducks Conservation",
      description_accueil: "Engagés pour un environnement sûr pour les canards sauvages.",
      description: "Wild Ducks Conservation s'efforce de créer des zones de refuge pour les canards sauvages et d'éduquer le public sur l'importance des habitats naturels pour les ansériformes. Leur programme 'Canards en sécurité' est actif dans plusieurs pays.",
      image: "logo.png",
    },
    {
      id_sponsor: "3",
      nom_sponsor: "Natural Habitat Safaris",
      description_accueil: "Offrir des expériences écoresponsables d'observation des cannes dans leur milieu naturel.",
      description: "Natural Habitat Safaris propose des voyages d'éco-tourisme spécialement conçus pour observer les ansériformes dans leur habitat naturel. En s'associant au festival, ils encouragent une exploration durable des espaces naturels.",
      image: "logo.png",
    },
    {
      id_sponsor: "4",
      nom_sponsor: "Fondation des Marais Sauvages",
      description_accueil: "Protège les habitats naturels des ansériformes.",
      description: "La Fondation des Marais Sauvages est dédiée à la restauration et la conservation des marais et zones humides, habitats essentiels pour de nombreuses espèces de cannes. Leur travail contribue à la biodiversité locale et à la préservation des écosystèmes.",
      image: "logo.png",
    },
    {
      id_sponsor: "5",
      nom_sponsor: "Éco Nature Environnement",
      description_accueil: "Un partenaire clé pour la sensibilisation et la préservation des ansériformes.",
      description: "Éco Nature Environnement organise des campagnes de sensibilisation et des projets éducatifs pour promouvoir la protection des canards et des zones humides. Leurs actions visent à sensibiliser les communautés locales et à préserver la biodiversité.",
      image: "logo.png",
    }
  ];
  
let billetterie = []

let utilisateurs = [
  {
    "id_utilisateur": 1,
    "nom_utilisateur": "Alice Dupont",
    "email_utilisateur": "alice.dupont@example.com",
    "mot_de_passe": "$2a$10$WEc3O0B4VyI/k7fmE3dWTeq28gwfed5Tl/ilbfHs/PwWQbxW95cWm", // mdp = "user1"
    "adresse_utilisateur": "123 rue de Paris, 75001 Paris, France",
    "telephone": "0123456789",
    "date_inscription": "2024-01-01T00:00:00.000Z",
    "role": "utilisateur"
  },
  {
    "id_utilisateur": 2,
    "nom_utilisateur": "Bob Martin",
    "email_utilisateur": "bob.martin@example.com",
    "mot_de_passe": "$2b$10$sYoU/ZAwBMS7T.E88Q4sTeH3nw/.hC4SojRPdiWrpGE/qzWDm.SUq",
    "adresse_utilisateur": "456 avenue de Lyon, 69001 Lyon, France",
    "telephone": "0987654321",
    "date_inscription": "2024-01-05T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 3,
    "nom_utilisateur": "Carole Durand",
    "email_utilisateur": "carole.durand@example.com",
    "mot_de_passe": "$2a$10$7n8smCSe7IomBz2iPKp/4u4Ld3wJBDpUWIhw3c5KX7zg18IXLlBMe", // mdp = "admin"
    "adresse_utilisateur": "789 boulevard de Marseille, 13001 Marseille, France",
    "telephone": "0147258390",
    "date_inscription": "2024-02-10T00:00:00.000Z",
    "role": "admin"
  },
  {
    "id_utilisateur": 4,
    "nom_utilisateur": "David Lefevre",
    "email_utilisateur": "david.lefevre@example.com",
    "mot_de_passe": "$2b$10$ccTRo40sVCNNgXGoJAALvuDJVx5z7uOPWz/Qc8ag95GBBSJS3W3L.",
    "adresse_utilisateur": "321 rue de Lille, 59800 Lille, France",
    "telephone": "0758392045",
    "date_inscription": "2024-03-15T00:00:00.000Z",
    "role": "utilisateur"
  },
  {
    "id_utilisateur": 5,
    "nom_utilisateur": "Emma Leroy",
    "email_utilisateur": "emma.leroy@example.com",
    "mot_de_passe": "$2b$10$SN.7HixVvKl16QyPxZtzNOtV3EA3897OerzoktomyxwvT9gM/XLEy",
    "adresse_utilisateur": "654 avenue de Nice, 06000 Nice, France",
    "telephone": "0612345678",
    "date_inscription": "2024-04-20T00:00:00.000Z",
    "role": "prestataire"
  }
];

let avis = [
  {
    id_commentaire: 1,
    id_prestataire: 1,
    id_utilisateur: 1,
    texte: "Je me suis trop méga amusée omg omg wouhouuu !!",
    note: 5,
  },
  {
    id_commentaire: 2,
    id_prestataire: 1,
    id_utilisateur: 2,
    texte: "C'était trop bien, mais j'ai marché sur un caca de chien. Où sont les nettoyeurs ?",
    note: 4,
  },
];

let dons = [
  {
    id: 1,
    id_utilisateur: 1,
    id_prestataire: 1,
    montant: 500,
    date:"2024-10-28"
  }
]

let map_data = [
  {
    id: "1",
    name: "emplacement1",
    points: [
      ["550","680"],
      ["580","660"],
      ["615","730"],
      ["580", "750"],
    ],
    fill_color: "cyan",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "2",
    name: "emplacement2",
    points: [
      ["360","750"],
      ["390","740"],
      ["415","800"],
      ["380", "810"],
    ],
    fill_color: "green",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "3",
    name: "emplacemen3",
    points: [
      ["160","750"],
      ["290","740"],
      ["315","800"],
      ["180", "810"],
    ],
    fill_color: "blue",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "4",
    name: "emplacement4",
    points: [
      ["760","750"],
      ["890","740"],
      ["815","800"],
      ["780", "810"],
    ],
    fill_color: "red",
    stroke_color: "white",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "5",
    name: "emplacement5",
    points: [
      ["360","450"],
      ["390","340"],
      ["415","300"],
      ["380", "210"],
    ],
    fill_color: "yellow",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "6",
    name: "emplacement6",
    points: [
      ["160","350"],
      ["290","440"],
      ["315","400"],
      ["280", "310"],
    ],
    fill_color: "pink",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  },
  {
    id: "7",
    name: "emplacement7",
    points: [
      ["1060","750"],
      ["1190","770"],
      ["1310", "1010"],
      ["1100","1200"],
    ],
    fill_color: "orange",
    stroke_color: "yellow",
    stroke_width: "2",
    opacity: "0",
  }
  ,
  {
    id: "8",
    name: "emplacement8",
    points: [
      ["654","345"],
      ["690","360"],
      ["759","569"],
      ["654", "650"],
    ],
    fill_color: "white",
    stroke_color: "red",
    stroke_width: "2",
    opacity: "0",
  }
]

module.exports = {
  prestataires,
  billetterie,
  utilisateurs,
  avis,
  dons,
  sponsors,
  map_data,
};