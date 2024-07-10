CREATE TABLE utilisateurs (
    uid INTEGER NOT NULL AUTO_INCREMENT,
    account_id VARCHAR(50),
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    profile_picture VARCHAR(200),
    PRIMARY KEY (uid)
);

CREATE TABLE caves (
    id integer not null AUTO_INCREMENT,
    proprietaire_uid integer not null,
    nom VARCHAR(50) NOT NULL unique,
    primary key (id),
    foreign key (proprietaire_uid) references utilisateurs(uid)
);

CREATE TABLE bouteilles (
    id integer not null AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    cepage VARCHAR(50) NOT NULL,
    millesime integer NOT NULL,
    categorie VARCHAR(50) NOT NULL,
    cave_id integer not null,
    primary key (id),
    FOREIGN KEY (cave_id) REFERENCES caves(id)
);

CREATE TABLE amis (
    id INTEGER NOT NULL AUTO_INCREMENT,
    utilisateur_id INTEGER NOT NULL,
    ami_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(uid),
    FOREIGN KEY (ami_id) REFERENCES utilisateurs(uid)
);
