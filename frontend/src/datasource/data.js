let utilisateurs = [
  {
    "id_utilisateur": 1,
    "nom_utilisateur": "Alice Dupont",
    "email_utilisateur": "alice.dupont@example.com",
    "mot_de_passe": "$2a$10$T4RyXAqGc9fUu.O0G85JN.g5WWmza0myrLKFrtuoRflKV6iLxLXXi", // user
    "adresse_utilisateur": "123 rue de Paris, 75001 Paris, France",
    "telephone": "0123456789",
    "date_inscription": "2024-01-01T00:00:00.000Z",
    "role": "utilisateur"
  },
  {
    "id_utilisateur": 2,
    "nom_utilisateur": "Bob Martin",
    "email_utilisateur": "bob.martin@example.com",
    "mot_de_passe": "$2b$10$O4aTDFMXhFL7Z1BRvkFpUuhcu8Q7ReCA0zEFkfv9uMfETV74gQVFO",
    "adresse_utilisateur": "456 avenue de Lyon, 69001 Lyon, France",
    "telephone": "0987654321",
    "date_inscription": "2024-01-05T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 3,
    "nom_utilisateur": "Carole Durand",
    "email_utilisateur": "carole.durand@example.com",
    "mot_de_passe": "$2b$10$osLQvsi/m97WV1DuebHXnOd1T.Aa8HTtnV9YsRGPw9SKa3f7l/ILO", // admin
    "adresse_utilisateur": "789 boulevard de Marseille, 13001 Marseille, France",
    "telephone": "0147258390",
    "date_inscription": "2024-02-10T00:00:00.000Z",
    "role": "admin"
  },
  {
    "id_utilisateur": 4,
    "nom_utilisateur": "David Lefevre",
    "email_utilisateur": "david.lefevre@example.com",
    "mot_de_passe": "$2b$10$YbQxfIWONNBFVQe/e//o.OK0XAlaYXORn1HvbtRrhNvgq5xZXcq6m",
    "adresse_utilisateur": "321 rue de Lille, 59800 Lille, France",
    "telephone": "0758392045",
    "date_inscription": "2024-03-15T00:00:00.000Z",
    "role": "utilisateur"
  },
  {
    "id_utilisateur": 5,
    "nom_utilisateur": "Emma Leroy",
    "email_utilisateur": "emma.leroy@example.com",
    "mot_de_passe": "$2b$10$OjgFFhjjeVNma.XTyZ7IQuHmZN3KEWE3R3.ZiO36LNLDe4naztlBe",
    "adresse_utilisateur": "654 avenue de Nice, 06000 Nice, France",
    "telephone": "0612345678",
    "date_inscription": "2024-04-20T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 6,
    "nom_utilisateur": "Marc Bernard",
    "email_utilisateur": "marc.bernard@example.com",
    "mot_de_passe": "$2b$10$MIu7eIl3f92QEvuJUvudIOFKZPV3xjnPHam3Nfp/wGPxt1FXNxFCK",
    "adresse_utilisateur": "123 avenue Bordeaux, 33000 Bordeaux, France",
    "telephone": "0600000001",
    "date_inscription": "2024-06-01T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 7,
    "nom_utilisateur": "Julie Vignon",
    "email_utilisateur": "julie.vignon@example.com",
    "mot_de_passe": "$2b$10$uLUB8y5kU9ZqO3YABr7RE.qj4/b0KHH6vzQnuVcZAl3VM1DMMRoaC",
    "adresse_utilisateur": "123 rue Strasbourg, 67000 Strasbourg, France",
    "telephone": "0600000002",
    "date_inscription": "2024-06-01T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 8,
    "nom_utilisateur": "Thomas Girard",
    "email_utilisateur": "thomas.girard@example.com",
    "mot_de_passe": "$2b$10$9Rb8OU7AE/Oid9D4DPHqL.RGcJyVbqtGsqE5N7TMWV46jofu4wY6S",
    "adresse_utilisateur": "123 rue Rouen, 76000 Rouen, France",
    "telephone": "0600000003",
    "date_inscription": "2024-06-01T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 9,
    "nom_utilisateur": "Sophie Marchand",
    "email_utilisateur": "sophie.marchand@example.com",
    "mot_de_passe": "$2b$10$LIbJEE10Hn.KTsPRgIiRde2MuflEXheUTEIiUk45FfQDJuAUoi3pS",
    "adresse_utilisateur": "123 rue Reims, 51100 Reims, France",
    "telephone": "0600000004",
    "date_inscription": "2024-06-01T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 10,
    "nom_utilisateur": "Paul Dubois",
    "email_utilisateur": "paul.dubois@example.com",
    "mot_de_passe": "$2b$10$r.lOV0yoiTUmTh89ssCQY.9UprXXAeolpjX5RMOl1AFH9QXJUt4Ci",
    "adresse_utilisateur": "321 avenue Nancy, 54000 Nancy, France",
    "telephone": "0600000005",
    "date_inscription": "2024-06-02T00:00:00.000Z",
    "role": "prestataire"
  },
  {
    "id_utilisateur": 11,
    "nom_utilisateur": "Claire Fontaine",
    "email_utilisateur": "claire.fontaine@example.com",
    "mot_de_passe": "$2b$10$1i9mT/CEaK3RDpucKrCevuQquWuuwE.0ug3EOEPeXQg4QJXXW6iL6",
    "adresse_utilisateur": "654 avenue Metz, 57000 Metz, France",
    "telephone": "0600000006",
    "date_inscription": "2024-06-03T00:00:00.000Z",
    "role": "prestataire"
  }
];


let prestataires = [
  {
    id: "1",
    nom: "Jeux et Divertissements",
    description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.",
    description_accueil: "Jeux et animations pour tous.",
    categorie: "Activité",
    id_emplacement: "1",
    id_evenement: "1",
    page_route: '/prestataire/1',
    image: "jeu_divertissement.jpg",
    id_utilisateur: "2",
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
    id_emplacement: "2",
    id_evenement: "1",
    page_route: '/prestataire/2',
    image: "restaurant.jpg",
    id_utilisateur: "5",
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
    id_emplacement: "3",
    id_evenement: "1",
    page_route: '/prestataire/3',
    image: "mascotte.jpg",
    id_utilisateur: "6",
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
    id_emplacement: "4",
    id_evenement: "1",
    page_route: '/prestataire/4',
    image: "stand.jpg",
    id_utilisateur: "7",
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
    id_emplacement: "5",
    id_evenement: "1",
    page_route: '/prestataire/5',
    image: "degustation_canard.jpg",
    id_utilisateur: "8",
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
    id_emplacement: "6",
    id_evenement: "1",
    page_route: '/prestataire/6',
    image: "concours_cuisine_canard.jpg",
    id_utilisateur: "9",
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
    id_emplacement: "7",
    id_evenement: "1",
    page_route: '/prestataire/7',
    image: "atelier_peinture_canard.jpg",
    id_utilisateur: "10",
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
    nom: "Ped'ailo!",
    description: "Avec Ped'ailo, prenez vos ailes et flottez comme un canard sur les étangs du Malsaucy en famille, entre amis ou en canard solitaire !",
    description_accueil: "Stand de pédalo sur les étangs",
    categorie: "Activité",
    id_emplacement: "8",
    id_evenement: "1",
    page_route: '/prestataire/8',
    image: "pedalo_canard.jpg",
    id_utilisateur: "11",
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
    description_accueil: "Soutenir la protection des canes sauvages à travers le monde.",
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
    description_accueil: "Offrir des expériences écoresponsables d'observation des canes dans leur milieu naturel.",
    description: "Natural Habitat Safaris propose des voyages d'éco-tourisme spécialement conçus pour observer les ansériformes dans leur habitat naturel. En s'associant au festival, ils encouragent une exploration durable des espaces naturels.",
    image: "logo.png",
  },
  {
    id_sponsor: "4",
    nom_sponsor: "Fondation des Marais Sauvages",
    description_accueil: "Protège les habitats naturels des ansériformes.",
    description: "La Fondation des Marais Sauvages est dédiée à la restauration et la conservation des marais et zones humides, habitats essentiels pour de nombreuses espèces de canes. Leur travail contribue à la biodiversité locale et à la préservation des écosystèmes.",
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
    message: "Pour vous soutenir les bébous!",
    montant: 500,
    date:"2024-10-28"
  }
]

let emplacements = [
  {
    id: "1",
    coordinates : [47.6862,6.8071],
    icon : 'evenement',
  },
  {
    id: "2",
    coordinates : [47.6865,6.8085],
    icon : 'restaurant',
  },
  {
    id: "3",
    coordinates : [47.6861,6.8089],
    icon : 'evenement',
  },
  {
    id: "4",
    coordinates : [47.6854,6.8079],
    icon : 'stand',
  },
  {
    id: "5",
    coordinates : [47.6867,6.8077],
    icon : 'restaurant',
  },
  {
    id: "6",
    coordinates : [47.6863,6.8079],
    icon : 'restaurant',
  },
  {
    id: "7",
    coordinates : [47.6867,6.8080],
    icon : 'peinture',
  },
  {
    id: "8",
    coordinates : [47.6860,6.8077],
    icon : 'pedalo',
  },
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
      ["70","550"],
      ["190","500"],
      ["210","550"],
      ["90", "600"],
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
      ["500","800"],
      ["450","800"],
      ["450","900"],
      ["500", "900"],
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
      ["280","600"],
      ["350","585"],
      ["350", "620"],
      ["280","645"],
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


let associations = [
  {
    id_association: "1",
    nom_association: "Les Canards Ailés",
    description_accueil: "Bienvenue à notre club passionné par l'aventure et la découverte.",
    description: "Nous organisons des activités en plein air pour amateurs de nature et d'aventure, telles que des randonnées, des excursions en canoë et bien plus.",
    image: "logo.png",
  },
  {
    id_association: "2",
    nom_association: "La Plume Solidaire",
    description_accueil: "Rejoignez-nous pour écrire un monde meilleur.",
    description: "Association dédiée à l'aide humanitaire à travers des ateliers d'écriture et de sensibilisation dans les écoles et les quartiers.",
    image: "logo.png",
  },
  {
    id_association: "3",
    nom_association: "L'Étang des Canards",
    description_accueil: "Un havre de paix pour les amoureux des canards.",
    description: "Cette association se consacre à la préservation des canards et de leurs habitats naturels à travers des actions locales et des ateliers pédagogiques.",
    image: "logo.png",
  },
];

let demandePrestataires = [
  {
    id: "0",
    nom: "Jeux et Divertissements",
    description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.",
    description_accueil: "Jeux et animations pour tous.",
    categorie: "Activité",
    id_emplacement: "8",
    id_evenement: "1",
    page_route: '/prestataire/1',
    image: "jeu_divertissement.jpg",
    id_utilisateur: "5",
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
]

let disponibilitesResto = {
  "2025-09-01": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00"],
  "2025-09-02": ["12:00", "13:00", "14:00", "19:00", "19:30", "20:00", "20:30"],
  "2025-09-03": ["12:30", "13:00", "14:30", "19:00", "19:30", "21:00"],
  "2025-09-04": ["12:00", "12:30", "13:00", "13:30", "14:00"],
  "2025-09-05": ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
  "2025-09-06": ["12:00", "13:00", "14:00"],
  "2025-09-07": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30"],
  "2025-09-08": ["12:30", "13:00", "14:00", "14:30", "19:00", "19:30", "20:30"],
  "2025-09-09": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00"],
  "2025-09-10": ["12:00", "12:30", "13:30", "14:30", "19:00", "20:00", "20:30", "21:00"],
};

let menu = {
  plats: [
    {
      id: 1,
      nom: "Confit de canard",
      description: "Confit de canard avec pommes de terre sautées.",
      prix: 18,
      image: "confit_canard.jpg",
    },
    {
      id: 2,
      nom: "Magret de canard",
      description: "Magret de canard avec sauce au miel.",
      prix: 22,
      image: "magret_canard.jpg",
    },
    {
      id: 3,
      nom: "Cuisse de canard à l'orange",
      description: "Une cuisse de canard tendre servie avec une sauce à l'orange.",
      prix: 20,
      image: "cuisse_canard_orange.jpg",
    },
    {
      id: 4,
      nom: "Poulet rôti",
      description: "Poulet rôti aux herbes de Provence.",
      prix: 15,
      image: "poulet_roti.jpg",
    },
    {
      id: 5,
      nom: "Steak frites",
      description: "Steak de bœuf grillé accompagné de frites maison.",
      prix: 17,
      image: "steak_frites.jpg",
    },
  ],
  boissons: [
    {
      id: 6,
      nom: "Eau plate",
      description: "Bouteille de 50 cl.",
      prix: 2,
      image: "eau_plate.jpg",
    },
    {
      id: 7,
      nom: "Eau pétillante",
      description: "Bouteille de 50 cl.",
      prix: 2.5,
      image: "eau_petillante.jpg",
    },
    {
      id: 8,
      nom: "Coca-Cola",
      description: "Canette de 33 cl.",
      prix: 3,
      image: "coca_cola.jpg",
    },
  ],
  desserts: [
    {
      id: 11,
      nom: "Tarte aux pommes",
      description: "Tarte maison avec des pommes caramélisées.",
      prix: 6,
      image: "tarte_pommes.jpg",
    },
    {
      id: 12,
      nom: "Mousse au chocolat",
      description: "Délicieuse mousse au chocolat noir.",
      prix: 5,
      image: "mousse_chocolat.jpg",
    },
    {
      id: 13,
      nom: "Crème brûlée",
      description: "Crème vanille avec une croûte caramélisée.",
      prix: 6,
      image: "creme_brulee.jpg",
    },
    {
      id: 14,
      nom: "Fondant au chocolat",
      description: "Fondant avec un cœur coulant au chocolat.",
      prix: 7,
      image: "fondant_chocolat.jpg",
    },
    {
      id: 15,
      nom: "Coupe glacée ",
      description: "Deux boules de glace avec des fruits frais.",
      prix: 5,
      image: "coupe_glacee.jpg",
    },
  ],
  menusEnfants: [
    {
      id: 16,
      nom: "Nuggets de poulet",
      description: "5 nuggets avec frites et jus d'orange.",
      prix: 8,
      image: "nuggets_poulet.jpg",
    },
    {
      id: 17,
      nom: "Mini burger",
      description: "Petit burger avec steak haché et frites.",
      prix: 9,
      image: "mini_burger.jpg",
    },
    {
      id: 18,
      nom: "Pâtes à la bolognaise",
      description: "Assiette de pâtes avec sauce tomate et viande hachée.",
      prix: 7,
      image: "pates_bolognaise.jpg",
    },
  ],
};

let reservations = [
]

let classement_concours = [
  {
    id_classement: "1",
    id_participant: "1",
    place: 1,
    concours: "cuisine",
  },
  {
    id_classement: "2",
    id_participant: "2",
    place: 2,
    concours: "cuisine",
  },
  {
    id_classement: "3",
    id_participant: "3",
    place: 3,
    concours: "cuisine",
  },
  {
    id_classement: "4",
    id_participant: "1",
    place: 1,
    concours: "defile",
  },
  {
    id_classement: "5",
    id_participant: "2",
    place: 2,
    concours: "defile",
  },
  {
    id_classement: "6",
    id_participant: "3",
    place: 3,
    concours: "defile",
  },
]

let shopInfo = [
  {
    id: 1,
    shopActive: true,
  }
]

let goodies = [
// Accessoire et Lifestyle
{ id: 1, nom: "Badge Festival", description: "Badge officiel du festival.", prix: 2, tailles: ["Unique"], couleurs: ["Jaune"], stock: 100, image: "badge.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 2, nom: "Badge Duo", description: "Set de 2 badges en édition limitée.", prix: 4, tailles: ["Unique"], couleurs: ["Multicolore"], stock: 50, image: "badge1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 3, nom: "Badge Trio", description: "Set de 3 badges exclusifs pour les collectionneurs.", prix: 6, tailles: ["Unique"], couleurs: ["Multicolore"], stock: 30, image: "badge2.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 4, nom: "Coque Téléphone", description: "Coque design avec motif de canard.", prix: 12, tailles: ["iPhone", "Samsung"], couleurs: ["Jaune", "Noir"], stock: 80, image: "coque.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 5, nom: "Coque Téléphone Fun", description: "Coque fantaisie avec design unique.", prix: 14, tailles: ["iPhone"], couleurs: ["Vert", "Bleu"], stock: 50, image: "coque1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 6, nom: "Coque Premium", description: "Coque premium avec un style épuré.", prix: 16, tailles: ["Samsung"], couleurs: ["Blanc", "Gris"], stock: 40, image: "coque2.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 7, nom: "Coque Luxe", description: "Coque de luxe avec détails dorés.", prix: 20, tailles: ["iPhone", "Samsung"], couleurs: ["Or", "Noir"], stock: 30, image: "coque3.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 8, nom: "Coque Édition Limitée", description: "Coque rare pour les amateurs de design.", prix: 22, tailles: ["iPhone"], couleurs: ["Rouge", "Bleu"], stock: 20, image: "coque4.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 9, nom: "Gourde Canard", description: "Gourde écologique avec motif canard.", prix: 15, tailles: ["500ml", "1L"], couleurs: ["Jaune"], stock: 70, image: "gourde.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 10, nom: "Lunettes Jaunes", description: "Lunettes amusantes en forme de canard.", prix: 8, tailles: ["Unique"], couleurs: ["Jaune"], stock: 90, image: "lunettes.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 11, nom: "Lunettes Festives", description: "Lunettes fantaisie pour les festivaliers.", prix: 10, tailles: ["Unique"], couleurs: ["Multicolore"], stock: 60, image: "lunettes1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 12, nom: "Lunettes Édition Limitée", description: "Lunettes stylées pour les soirées du festival.", prix: 12, tailles: ["Unique"], couleurs: ["Bleu", "Vert"], stock: 50, image: "lunettes2.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 13, nom: "Mug Festival", description: "Mug officiel avec logo du festival.", prix: 10, tailles: ["Standard"], couleurs: ["Blanc", "Jaune"], stock: 60, image: "mugs.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 14, nom: "Mug Collector", description: "Mug pour les collectionneurs du festival.", prix: 12, tailles: ["Standard"], couleurs: ["Noir", "Rouge"], stock: 40, image: "mugs1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 15, nom: "Mug Édition Limitée", description: "Mug rare en série limitée.", prix: 15, tailles: ["Standard"], couleurs: ["Bleu", "Vert"], stock: 30, image: "mugs2.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 16, nom: "Parapluie Festival", description: "Parapluie avec motif canard pour les jours de pluie.", prix: 18, tailles: ["Unique"], couleurs: ["Jaune", "Bleu"], stock: 40, image: "parapluie.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 17, nom: "Parapluie Compact", description: "Parapluie compact facile à transporter.", prix: 20, tailles: ["Unique"], couleurs: ["Noir", "Rouge"], stock: 30, image: "parapluie1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 18, nom: "Parapluie Luxe", description: "Parapluie élégant pour les festivaliers.", prix: 25, tailles: ["Unique"], couleurs: ["Vert", "Multicolore"], stock: 20, image: "parapluie2.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 19, nom: "Porte-clé Canard", description: "Porte-clé mignon en forme de canard.", prix: 5, tailles: ["Unique"], couleurs: ["Jaune"], stock: 100, image: "porte-cle.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 20, nom: "Porte-clé Collector", description: "Porte-clé pour les amateurs du festival.", prix: 6, tailles: ["Unique"], couleurs: ["Blanc", "Noir"], stock: 80, image: "porte-cle1.jpg", categorie: "accessoire_et_lifestyle" },
{ id: 21, nom: "Porte-clé Luxe", description: "Porte-clé en édition limitée avec logo.", prix: 8, tailles: ["Unique"], couleurs: ["Or", "Argent"], stock: 50, image: "porte-cle2.jpg", categorie: "accessoire_et_lifestyle" },

  // Aliments
  { id: 22, nom: "Biscuits Festival", description: "Biscuits décorés pour le festival.", prix: 5, tailles: ["Pack de 10"], couleurs: ["Doré"], stock: 60, image: "biscuits.jpg", categorie: "aliments" },
  { id: 23, nom: "Chocolats Festival", description: "Chocolats artisanaux avec design unique.", prix: 7, tailles: ["Boîte de 6"], couleurs: ["Marron"], stock: 50, image: "chocolats.jpg", categorie: "aliments" },

// Objet Cinéma et Tech
{ id: 24, nom: "Écouteurs Canard", description: "Écouteurs stylés avec design inspiré du canard.", prix: 25, tailles: ["Standard"], couleurs: ["Jaune", "Blanc"], stock: 30, image: "ecouteur.jpg", categorie: "objet_cinema_tech" },
{ id: 25, nom: "Écouteurs Premium", description: "Écouteurs premium pour une qualité sonore exceptionnelle.", prix: 35, tailles: ["Standard"], couleurs: ["Noir", "Rouge"], stock: 20, image: "ecouteur1.jpg", categorie: "objet_cinema_tech" },
{ id: 26, nom: "Clap de Cinéma", description: "Mini clap de cinéma pour les passionnés de film.", prix: 10, tailles: ["15x15 cm"], couleurs: ["Noir", "Blanc"], stock: 40, image: "mini-clap.jpg", categorie: "objet_cinema_tech" },
{ id: 27, nom: "Clé USB Festival", description: "Clé USB 32GB avec le logo officiel du festival.", prix: 12, tailles: ["32GB"], couleurs: ["Noir", "Jaune"], stock: 80, image: "usb.jpg", categorie: "objet_cinema_tech" },
{ id: 28, nom: "Clé USB Collector", description: "Clé USB édition limitée avec un design unique.", prix: 15, tailles: ["64GB"], couleurs: ["Argent", "Or"], stock: 50, image: "usb1.jpg", categorie: "objet_cinema_tech" },
{ id: 29, nom: "Vinyle Festival", description: "Vinyle de la bande sonore officielle du festival.", prix: 20, tailles: ["33 Tours"], couleurs: ["Noir"], stock: 35, image: "vinyle.jpg", categorie: "objet_cinema_tech" },
{ id: 30, nom: "Vinyle Collector", description: "Vinyle édition collector avec design exclusif.", prix: 30, tailles: ["33 Tours"], couleurs: ["Noir", "Transparent"], stock: 25, image: "vinyle1.jpg", categorie: "objet_cinema_tech" },

// Papeterie et Collection
{ id: 31, nom: "Carnet Festival", description: "Carnet de notes avec couverture inspirée du festival.", prix: 6, tailles: ["A5"], couleurs: ["Jaune", "Vert"], stock: 50, image: "carnet2.jpg", categorie: "papeterie_collection" },
{ id: 32, nom: "Carnet Collector", description: "Carnet premium pour les collectionneurs.", prix: 8, tailles: ["A5"], couleurs: ["Bleu", "Rouge"], stock: 40, image: "carnet3.jpg", categorie: "papeterie_collection" },
{ id: 33, nom: "Carte Postale Festival", description: "Carte postale officielle du festival.", prix: 2, tailles: ["10x15 cm"], couleurs: ["Multicolore"], stock: 100, image: "carte.jpg", categorie: "papeterie_collection" },
{ id: 34, nom: "Carte Postale Collector", description: "Carte postale en édition limitée.", prix: 3, tailles: ["10x15 cm"], couleurs: ["Blanc", "Noir"], stock: 70, image: "carte1.jpg", categorie: "papeterie_collection" },
{ id: 35, nom: "Marque-Page Festival", description: "Marque-page élégant pour vos livres.", prix: 2, tailles: ["Unique"], couleurs: ["Jaune", "Bleu"], stock: 80, image: "marque-page.jpg", categorie: "papeterie_collection" },
{ id: 36, nom: "Stylo Festival", description: "Stylo officiel pour prendre des notes durant le festival.", prix: 3, tailles: ["Standard"], couleurs: ["Noir", "Jaune"], stock: 100, image: "stylo.jpg", categorie: "papeterie_collection" },
  // Premium
  { id: 37, nom: "Catalogue Festival", description: "Catalogue officiel en édition limitée.", prix: 15, tailles: ["A4"], couleurs: ["Blanc"], stock: 20, image: "catalogue.jpg", categorie: "premium" },
  { id: 38, nom: "Mini Palme d'Or", description: "Réplique en or du trophée emblématique.", prix: 50, tailles: ["10 cm"], couleurs: ["Or"], stock: 10, image: "palme_or.jpg", categorie: "premium" },

// Textiles et Modes
{ id: 39, nom: "T-shirt Festival", description: "T-shirt officiel du Festival de Cannes.", prix: 18, tailles: ["S", "M", "L", "XL"], couleurs: ["Blanc", "Jaune"], stock: 60, image: "t-shirt.jpg", categorie: "textiles_et_modes" },
{ id: 40, nom: "T-shirt Édition Limitée", description: "T-shirt en édition limitée pour les fans.", prix: 20, tailles: ["S", "M", "L", "XL"], couleurs: ["Noir", "Gris"], stock: 50, image: "t-shirt2.jpg", categorie: "textiles_et_modes" },
{ id: 41, nom: "Sweat-shirt Festival", description: "Sweat-shirt confortable avec logo festival.", prix: 35, tailles: ["M", "L", "XL"], couleurs: ["Gris", "Bleu"], stock: 50, image: "sweat-shirt.jpg", categorie: "textiles_et_modes" },
{ id: 42, nom: "Sweat-shirt Classique", description: "Sweat-shirt classique avec design minimaliste.", prix: 38, tailles: ["M", "L", "XL"], couleurs: ["Noir", "Blanc"], stock: 40, image: "sweat-shirt1.jpg", categorie: "textiles_et_modes" },
{ id: 43, nom: "Sweat-shirt Édition Limitée", description: "Sweat-shirt rare pour les fans.", prix: 40, tailles: ["M", "L"], couleurs: ["Rouge", "Bleu"], stock: 30, image: "sweat-shirt2.jpg", categorie: "textiles_et_modes" },
{ id: 44, nom: "Bob Festival", description: "Bob tendance avec logo du festival.", prix: 15, tailles: ["Unique"], couleurs: ["Jaune", "Bleu"], stock: 70, image: "bob.jpg", categorie: "textiles_et_modes" },
{ id: 45, nom: "Bob Classique", description: "Bob classique avec design épuré.", prix: 16, tailles: ["Unique"], couleurs: ["Noir", "Blanc"], stock: 60, image: "bob2.jpg", categorie: "textiles_et_modes" },
{ id: 46, nom: "Bob Édition Limitée", description: "Bob en édition spéciale pour le festival.", prix: 18, tailles: ["Unique"], couleurs: ["Vert", "Rouge"], stock: 40, image: "bob3.jpg", categorie: "textiles_et_modes" },
{ id: 47, nom: "Bob Fantaisie", description: "Bob fantaisie pour un style unique.", prix: 20, tailles: ["Unique"], couleurs: ["Jaune", "Multicolore"], stock: 50, image: "bob4.jpg", categorie: "textiles_et_modes" },
{ id: 48, nom: "Écharpe Festival", description: "Écharpe chaude et stylée avec logo.", prix: 25, tailles: ["Unique"], couleurs: ["Rouge", "Blanc"], stock: 40, image: "echarpe.jpg", categorie: "textiles_et_modes" },
{ id: 49, nom: "Écharpe Hiver", description: "Écharpe idéale pour l'hiver.", prix: 28, tailles: ["Unique"], couleurs: ["Gris", "Bleu"], stock: 35, image: "echarpe1.jpg", categorie: "textiles_et_modes" },
{ id: 50, nom: "Tote Bag Festival", description: "Sac écologique avec motif canard.", prix: 12, tailles: ["Standard"], couleurs: ["Blanc", "Jaune"], stock: 80, image: "tote-bag.jpg", categorie: "textiles_et_modes" },
{ id: 51, nom: "Tote Bag Classique", description: "Sac pratique pour vos courses.", prix: 14, tailles: ["Standard"], couleurs: ["Vert", "Noir"], stock: 60, image: "tote-bag1.jpg", categorie: "textiles_et_modes" },
{ id: 52, nom: "Tote Bag Édition Limitée", description: "Sac rare pour les collectionneurs.", prix: 16, tailles: ["Standard"], couleurs: ["Rouge", "Bleu"], stock: 40, image: "tote-bag2.jpg", categorie: "textiles_et_modes" },
];


let balades = [
  {
    id_balade: "1",
    date_balade: "2025-09-01",
    heure_balade: "08:00",
    reserved_user_id: null
  },
  {
    id_balade: "2",
    date_balade: "2025-09-01",
    heure_balade: "08:30",
    reserved_user_id: null
  },
  {
    id_balade: "3",
    date_balade: "2025-09-01",
    heure_balade: "09:00",
    reserved_user_id: null
  },
  {
    id_balade: "4",
    date_balade: "2025-09-01",
    heure_balade: "09:30",
    reserved_user_id: null
  },
  {
    id_balade: "5",
    date_balade: "2025-09-01",
    heure_balade: "10:00",
    reserved_user_id: null
  },
  {
    id_balade: "6",
    date_balade: "2025-09-01",
    heure_balade: "10:30",
    reserved_user_id:null
  },
  {
    id_balade: "7",
    date_balade: "2025-09-01",
    heure_balade: "11:00",
    reserved_user_id: null
  },
  {
    id_balade: "8",
    date_balade: "2025-09-01",
    heure_balade: "12:00",
    reserved_user_id:null
  },
  {
    id_balade: "9",
    date_balade: "2025-09-01",
    heure_balade: "13:00",
    reserved_user_id: null
  },
  {
    id_balade: "10",
    date_balade: "2025-09-01",
    heure_balade: "14:00",
    reserved_user_id: null
  },
  {
    id_balade: "11",
    date_balade: "2025-09-01",
    heure_balade: "14:30",
    reserved_user_id: null
  },
  {
    id_balade: "12",
    date_balade: "2025-09-01",
    heure_balade: "15:00",
    reserved_user_id: null
  },
  {
    id_balade: "13",
    date_balade: "2025-09-01",
    heure_balade: "15:30",
    reserved_user_id: null
  },
  {
    id_balade: "14",
    date_balade: "2025-09-01",
    heure_balade: "16:00",
    reserved_user_id: null
  },
  {
    id_balade: "15",
    date_balade: "2025-09-01",
    heure_balade: "16:30",
    reserved_user_id: null
  },
  {
    id_balade: "16",
    date_balade: "2025-09-01",
    heure_balade: "17:00",
    reserved_user_id: null
  },
  {
    id_balade: "17",
    date_balade: "2025-09-01",
    heure_balade: "17:30",
    reserved_user_id: null
  },
  {
    id_balade: "18",
    date_balade: "2025-09-02",
    heure_balade: "08:00",
    reserved_user_id: null
  },
  {
    id_balade: "19",
    date_balade: "2025-09-02",
    heure_balade: "08:30",
    reserved_user_id: null
  },
  {
    id_balade: "20",
    date_balade: "2025-09-02",
    heure_balade: "09:00",
    reserved_user_id: null
  },
  {
    id_balade: "21",
    date_balade: "2025-09-02",
    heure_balade: "09:30",
    reserved_user_id: null
  },
  {
    id_balade: "22",
    date_balade: "2025-09-02",
    heure_balade: "10:00",
    reserved_user_id: null
  },
  {
    id_balade: "23",
    date_balade: "2025-09-02",
    heure_balade: "10:30",
    reserved_user_id: null
  },
  {
    id_balade: "24",
    date_balade: "2025-09-02",
    heure_balade: "11:00",
    reserved_user_id: null
  },
  {
    id_balade: "25",
    date_balade: "2025-09-02",
    heure_balade: "12:00",
    reserved_user_id: null
  },
  {
    id_balade: "26",
    date_balade: "2025-09-02",
    heure_balade: "13:00",
    reserved_user_id: null
  },
  {
    id_balade: "27",
    date_balade: "2025-09-02",
    heure_balade: "14:00",
    reserved_user_id: null
  },
  {
    id_balade: "28",
    date_balade: "2025-09-02",
    heure_balade: "14:30",
    reserved_user_id: null
  },
  {
    id_balade: "29",
    date_balade: "2025-09-02",
    heure_balade: "15:00",
    reserved_user_id: null
  },
  {
    id_balade: "30",
    date_balade: "2025-09-02",
    heure_balade: "15:30",
    reserved_user_id: null
  },
  {
    id_balade: "31",
    date_balade: "2025-09-02",
    heure_balade: "16:00",
    reserved_user_id: null
  },
  {
    id_balade: "32",
    date_balade: "2025-09-02",
    heure_balade: "16:30",
    reserved_user_id: null
  },
  {
    id_balade: "33",
    date_balade: "2025-09-02",
    heure_balade: "17:00",
    reserved_user_id: null
  },
  {
    id_balade: "34",
    date_balade: "2025-09-02",
    heure_balade: "17:30",
    reserved_user_id: null
  },
  {
    id_balade: "35",
    date_balade: "2025-09-03",
    heure_balade: "08:00",
    reserved_user_id: null
  },
  {
    id_balade: "36",
    date_balade: "2025-09-03",
    heure_balade: "08:30",
    reserved_user_id: null
  },
  {
    id_balade: "37",
    date_balade: "2025-09-03",
    heure_balade: "09:00",
    reserved_user_id: null
  },
  {
    id_balade: "38",
    date_balade: "2025-09-03",
    heure_balade: "09:30",
    reserved_user_id: null
  },
  {
    id_balade: "39",
    date_balade: "2025-09-03",
    heure_balade: "10:00",
    reserved_user_id: null
  },
  {
    id_balade: "40",
    date_balade: "2025-09-03",
    heure_balade: "10:30",
    reserved_user_id: null
  },
  {
    id_balade: "41",
    date_balade: "2025-09-03",
    heure_balade: "11:00",
    reserved_user_id: null
  },
  {
    id_balade: "42",
    date_balade: "2025-09-03",
    heure_balade: "12:00",
    reserved_user_id: null
  },
  {
    id_balade: "43",
    date_balade: "2025-09-03",
    heure_balade: "13:00",
    reserved_user_id: null
  },
  {
    id_balade: "44",
    date_balade: "2025-09-03",
    heure_balade: "14:00",
    reserved_user_id: null
  },
  {
    id_balade: "45",
    date_balade: "2025-09-03",
    heure_balade: "14:30",
    reserved_user_id: null
  },
  {
    id_balade: "46",
    date_balade: "2025-09-03",
    heure_balade: "15:00",
    reserved_user_id: null
  },
  {
    id_balade: "47",
    date_balade: "2025-09-03",
    heure_balade: "15:30",
    reserved_user_id: null
  },
  {
    id_balade: "48",
    date_balade: "2025-09-03",
    heure_balade: "16:00",
    reserved_user_id: null
  },
  {
    id_balade: "49",
    date_balade: "2025-09-03",
    heure_balade: "16:30",
    reserved_user_id: null
  },
  {
    id_balade: "50",
    date_balade: "2025-09-03",
    heure_balade: "17:00",
    reserved_user_id: null
  },
  {
    id_balade: "51",
    date_balade: "2025-09-03",
    heure_balade: "17:30",
    reserved_user_id: null
  }
]

let notifications = []

let MOTS_DE_PASSE_UTILISATEURS = []

module.exports = {
  disponibilitesResto,
  balades,
  prestataires,
  billetterie,
  utilisateurs,
  avis,
  dons,
  sponsors,
  emplacements,
  map_data,
  associations,
  demandePrestataires,
  notifications,
  MOTS_DE_PASSE_UTILISATEURS,
  menu,
  reservations,
  classement_concours,
  goodies,
  shopInfo,
};