let prestataires = [
    {
      id: "1",
      nom: "Jeux et Divertissements",
      description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.",
      description_accueil: "Jeux et animations pour tous.",
      categorie: "Jeux",
      id_emplacement: "1",
      id_evenement: "1",
      page_route: '/prestataire/1',
      image: "jeu_divertissement.jpg",
      services: [
        {
          nom_service: "service1",
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
      categorie: "Restaurant",
      id_emplacement: "1",
      id_evenement: "1",
      page_route: '/prestataire/2',
      image: "restaurant.jpg",
      services: [
        {
          nom_service: "service1",
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
          nom_service: "service1",
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
      categorie: "Artisanat",
      id_emplacement: "3",
      id_evenement: "1",
      page_route: '/prestataire/4',
      image: "stand.jpg",
      services: [
        {
          nom_service: "service1",
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
          nom_service: "service1",
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
          nom_service: "service1",
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
      categorie: "Art",
      id_emplacement: "6",
      id_evenement: "1",
      page_route: '/prestataire/7',
      image: "atelier_peinture_canard.jpg",
      services: [
        {
          nom_service: "service1",
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
      categorie: "Spectacle",
      id_emplacement: "7",
      id_evenement: "1",
      page_route: '/prestataire/8',
      image: "parade_canards.jpg",
      services: [
        {
          nom_service: "service1",
          lien_service: "lien_service1",
          statut_service: "actif",
        }
      ]
    }
  ];


let billetterie = []

let utilisateurs = [
  {
    "id_utilisateur": 1,
    "nom_utilisateur": "Alice Dupont",
    "email_utilisateur": "alice.dupont@example.com",
    "mot_de_passe": "$2b$10$oBECECHPwfW.6qVIZDObxe5XLn9KyDrIv0YKIJHcbeRgSfUo3Fudq",
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
    "mot_de_passe": "$2a$10$T2rlLbnHLU6kEl1wgBF85uU0bN9WWbjdivAY5Ia1sKyN6lkdfvHou", // mdp = "maiken"
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
    montant: 500,
    date:"2024-10-28"
  }
]

module.exports = {
  prestataires,
  billetterie,
  utilisateurs,
  avis,
  dons,
};