let utilisateurs = [
  {
    "id_utilisateur": 1,
    "nom_utilisateur": "Alice Dupont",
    "email_utilisateur": "alice.dupont@example.com",
    "mot_de_passe": "$2b$10$.9seAsiDiYFD.ytPORnvPeHKyzWZRee1CT3gXYY3gHOuBHIzbHbRy",
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
    "mot_de_passe": "$2b$10$osLQvsi/m97WV1DuebHXnOd1T.Aa8HTtnV9YsRGPw9SKa3f7l/ILO",
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
  "2024-12-10": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00"],
  "2024-12-11": ["12:00", "13:00", "14:00", "19:00", "19:30", "20:00", "20:30"],
  "2024-12-12": ["12:30", "13:00", "14:30", "19:00", "19:30", "21:00"],
  "2024-12-13": ["12:00", "12:30", "13:00", "13:30", "14:00"],
  "2025-01-05": ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
  "2025-01-06": ["12:00", "13:00", "14:00"],
  "2025-01-07": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30"],
  "2025-01-08": ["12:30", "13:00", "14:00", "14:30", "19:00", "19:30", "20:30"],
  "2025-02-14": ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00"],
  "2025-02-15": ["12:00", "12:30", "13:30", "14:30", "19:00", "20:00", "20:30", "21:00"],
};


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
};