DROP TABLE IF EXISTS associations, points, map_data,dons, avis, utilisateurs, billetterie, sponsors, services, prestataires;

-- Création des tables

CREATE TABLE code_prestataire(
    code INTEGER
);

CREATE TABLE prestataires (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description TEXT,
    description_accueil VARCHAR(255),
    categorie VARCHAR(100),
    id_emplacement INT,
    id_evenement INT,
    page_route VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    id_service VARCHAR(255),
    nom_service VARCHAR(255),
    description_service TEXT,
    lien_service VARCHAR(255),
    statut_service VARCHAR(50),
    id_prestataire INT REFERENCES prestataires(id)
);

CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    id_sponsor VARCHAR(255),
    nom_sponsor VARCHAR(255),
    description_accueil TEXT,
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE billetterie (
    id SERIAL PRIMARY KEY,
    nombre_billets INTEGER,
    prix_total INTEGER,
    date_achat DATE,
    email VARCHAR(255)
);

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom_utilisateur VARCHAR(255),
    email_utilisateur VARCHAR(255) UNIQUE,
    mot_de_passe VARCHAR(255),
    adresse_utilisateur VARCHAR(255),
    telephone VARCHAR(20),
    date_inscription TIMESTAMP,
    role VARCHAR(50)
);

CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    id_commentaire INT,
    id_prestataire INT REFERENCES prestataires(id),
    id_utilisateur INT REFERENCES utilisateurs(id),
    texte TEXT,
    note INT
);

CREATE TABLE dons (
    id SERIAL PRIMARY KEY,
    id_utilisateur INT REFERENCES utilisateurs(id),
    id_prestataire INT REFERENCES prestataires(id),
    message TEXT,
    montant DECIMAL(10, 2),
    date DATE
);

CREATE TABLE map_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    fill_color VARCHAR(50),
    stroke_color VARCHAR(50),
    stroke_width VARCHAR(10),
    opacity VARCHAR(10)
);

CREATE TABLE points (
    id SERIAL PRIMARY KEY,
    map_id INT REFERENCES map_data(id),
    x_coord VARCHAR(10),
    y_coord VARCHAR(10)
);

CREATE TABLE associations (
    id SERIAL PRIMARY KEY
    -- Autres champs si nécessaires
);

-- Insertion des données

INSERT INTO code_prestataire VALUES (1000);

-- Table prestataires
INSERT INTO prestataires (id, nom, description, description_accueil, categorie, id_emplacement, id_evenement, page_route, image) VALUES
(1, 'Jeux et Divertissements', 'Espace dédié aux jeux pour enfants et adultes...', 'Jeux et animations pour tous.', 'Activité', 8, 1, '/prestataire/1', 'jeu_divertissement.jpg'),
(2, 'Restaurant Le Gourmet', 'Restaurant proposant une variété de plats...', 'Cuisine variée et ingrédients locaux.', 'Gastronomie', 1, 1, '/prestataire/2', 'restaurant.jpg'),
(3, 'Mascotte Festival', 'Notre mascotte officielle anime le festival...', 'Animations et photos avec la mascotte.', 'Mascotte', 2, 1, '/prestataire/3', 'mascotte.jpg'),
(4, 'Stand Artisanat Local', 'Découvrez et achetez des produits artisanaux locaux...', 'Produits artisanaux uniques.', 'Activité', 3, 1, '/prestataire/4', 'stand.jpg'),
(5, 'Dégustation de Canard', 'Venez déguster une variété de plats à base de canard...', 'Dégustation de plats à base de canard.', 'Gastronomie', 4, 1, '/prestataire/5', 'degustation_canard.jpg'),
(6, 'Concours de Cuisine', 'Participez ou assistez à un concours de cuisine...', 'Concours de cuisine autour du canard.', 'Événement', 5, 1, '/prestataire/6', 'concours_cuisine_canard.jpg'),
(7, 'Atelier Peinture', 'Découvrez l''art de la peinture sur canard...', 'Atelier de peinture sur canard.', 'Activité', 6, 1, '/prestataire/7', 'atelier_peinture_canard.jpg'),
(8, 'Parade des Canards', 'Assistez à une parade spectaculaire mettant en vedette...', 'Parade des canards colorée.', 'Événement', 7, 1, '/prestataire/8', 'parade_canards.jpg');

-- Table services
INSERT INTO services (id_service, nom_service, description_service, lien_service, statut_service, id_prestataire) VALUES
('1', 'service1', 'description', 'lien_service1', 'actif', 1),
('1', 'service1', 'description', 'lien_service1', 'actif', 2),
('1', 'service1', 'description', 'lien_service1', 'actif', 3),
('1', 'service1', 'description', 'lien_service1', 'actif', 4),
('1', 'service1', 'description', 'lien_service1', 'actif', 5),
('1', 'service1', 'description', 'lien_service1', 'actif', 6),
('1', 'service1', 'description', 'lien_service1', 'actif', 7),
('1', 'service1', 'description', 'lien_service1', 'actif', 8);

-- Table sponsors
INSERT INTO sponsors (id_sponsor, nom_sponsor, description_accueil, description, image) VALUES
('1', 'BirdLife International', 'Soutenir la protection des cannes sauvages...', 'BirdLife International est un leader mondial...', 'logo.png'),
('2', 'Wild Ducks Conservation', 'Engagés pour un environnement sûr...', 'Wild Ducks Conservation s''efforce de créer...', 'logo.png'),
('3', 'Natural Habitat Safaris', 'Offrir des expériences écoresponsables...', 'Natural Habitat Safaris propose des voyages...', 'logo.png'),
('4', 'Fondation des Marais Sauvages', 'Protège les habitats naturels des ansériformes.', 'La Fondation des Marais Sauvages est dédiée...', 'logo.png'),
('5', 'Éco Nature Environnement', 'Un partenaire clé pour la sensibilisation...', 'Éco Nature Environnement organise des campagnes...', 'logo.png');

-- Table utilisateurs
INSERT INTO utilisateurs (id, nom_utilisateur, email_utilisateur, mot_de_passe, adresse_utilisateur, telephone, date_inscription, role) VALUES
(1, 'Alice Dupont', 'alice.dupont@example.com', '$2a$10$WEc3O0B4VyI/k7fmE3dWTeq28gwfed5Tl/ilbfHs/PwWQbxW95cWm', '123 rue de Paris, 75001 Paris, France', '0123456789', '2024-01-01', 'utilisateur'),
(2, 'Bob Martin', 'bob.martin@example.com', '$2b$10$sYoU/ZAwBMS7T.E88Q4sTeH3nw/.hC4SojRPdiWrpGE/qzWDm.SUq', '456 avenue de Lyon, 69001 Lyon, France', '0987654321', '2024-01-05', 'prestataire'),
(3, 'Carole Durand', 'carole.durand@example.com', '$2a$10$7n8smCSe7IomBz2iPKp/4u4Ld3wJBDpUWIhw3c5KX7zg18IXLlBMe', '789 boulevard de Marseille, 13001 Marseille, France', '0147258390', '2024-02-10', 'admin'),
(4, 'David Lefevre', 'david.lefevre@example.com', '$2b$10$ccTRo40sVCNNgXGoJAALvuDJVx5z7uOPWz/Qc8ag95GBBSJS3W3L.', '321 rue de Lille, 59800 Lille, France', '0758392045', '2024-03-15', 'utilisateur'),
(5, 'Emma Leroy', 'emma.leroy@example.com', '$2b$10$SN.7HixVvKl16QyPxZtzNOtV3EA3897OerzoktomyxwvT9gM/XLEy', '654 avenue de Nice, 06000 Nice, France', '0612345678', '2024-04-20', 'prestataire');

-- Table avis
INSERT INTO avis (id_commentaire, id_prestataire, id_utilisateur, texte, note) VALUES
(1, 1, 1, 'Je me suis trop méga amusée omg omg wouhouuu !!', 5),
(2, 1, 2, 'C''était trop bien, mais j''ai marché sur un caca de chien. Où sont les nettoyeurs ?', 4);

-- Table dons
INSERT INTO dons (id_utilisateur, id_prestataire, message, montant, date) VALUES
(1, 1, 'Pour vous soutenir les bébous!', 500, '2024-10-28');

-- Table map_data
INSERT INTO map_data (id, name, fill_color, stroke_color, stroke_width, opacity) VALUES
(1, 'emplacement1', 'cyan', 'red', '2', '0'),
(2, 'emplacement2', 'green', 'red', '2', '0'),
(3, 'emplacement3', 'blue', 'red', '2', '0');

-- Table points
INSERT INTO points (map_id, x_coord, y_coord) VALUES
(1, '150', '80'),
(1, '175', '115'),
(1, '200', '80'),
(2, '180', '50'),
(2, '210', '80'),
(3, '240', '100'),
(3, '260', '120');


