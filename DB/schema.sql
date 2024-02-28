-- User Table
CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Allergen_info table
CREATE TABLE Allergy_info (
    allergen_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    allergen_name VARCHAR(255) NOT NULL
);

-- User_allergy_info Table
CREATE TABLE User_allergy_info (
    user_id INT,
    allergen_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (allergen_id) REFERENCES Allergy_info(allergen_id),
    PRIMARY KEY (user_id, allergen_id)
);

-- Recipe Table
CREATE TABLE Recipe (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255) NOT NULL,
    recipe_desc TEXT,
    user_id INT NOT NULL,
    image1_url VARCHAR(255),
    image2_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Recipe_allergy_info Table
CREATE TABLE Recipe_allergy_info (
    recipe_id INT,
    allergen_id INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (allergen_id) REFERENCES Allergy_info(allergen_id),
    PRIMARY KEY (recipe_id, allergen_id)
);

-- Category Table
CREATE TABLE Category (
    category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Recipe_category Table
CREATE TABLE Recipe_category (
    recipe_id INT,
    category_id INT,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    PRIMARY KEY (recipe_id, category_id)
);

-- Recipe_rating Table
CREATE TABLE Recipe_rating (
    rating_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    user_id INT,
    rating INT NOT NULL,
    review TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE User_category (
	user_id INT,
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    PRIMARY KEY (user_id, category_id)
);