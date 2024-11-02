// Cambiar a la base de datos mongo_exercise o crearla si no existe
use mongo_exercise;

// Insertar documentos en la colección movies
db.movies.insertMany([
    {
        title: "Fight Club",
        writer: "Chuck Palahniuk",
        year: 1999,
        actors: ["Brad Pitt", "Edward Norton"]
    },
    {
        title: "Pulp Fiction",
        writer: "Quentin Tarantino",
        year: 1994,
        actors: ["John Travolta", "Uma Thurman"]
    },
    {
        title: "Inglorious Basterds",
        writer: "Quentin Tarantino",
        year: 2009,
        actors: ["Brad Pitt", "Diane Kruger", "Eli Roth"]
    },
    {
        title: "The Hobbit: An Unexpected Journey",
        writer: "J.R.R. Tolkein",
        year: 2012,
        franchise: "The Hobbit"
    },
    {
        title: "The Hobbit: The Desolation of Smaug",
        writer: "J.R.R. Tolkein",
        year: 2013,
        franchise: "The Hobbit"
    },
    {
        title: "The Hobbit: The Battle of the Five Armies",
        writer: "J.R.R. Tolkein",
        year: 2012,
        franchise: "The Hobbit",
        synopsis: "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain"
    },
    {
        title: "Pee Wee Herman's Big Adventure"
    },
    {
        title: "Avatar"
    }
]);

// Consultas en la colección movies

// 1. Obtener todos los documentos
db.movies.find();

// 2. Obtener documentos con writer igual a "Quentin Tarantino"
db.movies.find({ writer: "Quentin Tarantino" });

// 3. Obtener documentos con actors que incluyan a "Brad Pitt"
db.movies.find({ actors: "Brad Pitt" });

// 4. Obtener documentos con franchise igual a "The Hobbit"
db.movies.find({ franchise: "The Hobbit" });

// 5. Obtener todas las películas de los 90s
db.movies.find({ year: { $gte: 1990, $lt: 2000 } });

// 6. Obtener las películas estrenadas entre el año 2000 y 2010
db.movies.find({ year: { $gte: 2000, $lte: 2010 } });

// Actualizar documentos

// 1. Agregar sinopsis a "The Hobbit: An Unexpected Journey"
db.movies.updateOne(
    { title: "The Hobbit: An Unexpected Journey" },
    { $set: { synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." } }
);

// 2. Agregar sinopsis a "The Hobbit: The Desolation of Smaug"
db.movies.updateOne(
    { title: "The Hobbit: The Desolation of Smaug" },
    { $set: { synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." } }
);

// 3. Agregar un actor llamado "Samuel L. Jackson" a la película "Pulp Fiction"
db.movies.updateOne(
    { title: "Pulp Fiction" },
    { $push: { actors: "Samuel L. Jackson" } }
);

// Búsqueda por texto en la colección movies

// Crear índice de texto en el campo synopsis
db.movies.createIndex({ synopsis: "text" });

// 1. Encontrar las películas que en la sinopsis contengan la palabra "Bilbo"
db.movies.find({ $text: { $search: "Bilbo" } });

// 2. Encontrar las películas que en la sinopsis contengan la palabra "Gandalf"
db.movies.find({ $text: { $search: "Gandalf" } });

// 3. Encontrar las películas que en la sinopsis contengan la palabra "Bilbo" y no la palabra "Gandalf"
db.movies.find({ $text: { $search: "Bilbo -Gandalf" } });

// 4. Encontrar las películas que en la sinopsis contengan la palabra "dwarves" o "hobbit"
db.movies.find({ $text: { $search: "dwarves hobbit" } });

// 5. Encontrar las películas que en la sinopsis contengan las palabras "gold" y "dragon"
db.movies.find({ $text: { $search: "gold dragon" } });

// Eliminar documentos

// 1. Eliminar la película "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({ title: "Pee Wee Herman's Big Adventure" });

// 2. Eliminar la película "Avatar"
db.movies.deleteOne({ title: "Avatar" });
