// Middleware pour gérer les erreurs asynchrones dans les routes Express.
// Il prend une fonction asynchrone 'func' en paramètre et renvoie une nouvelle fonction middleware.
// Cette nouvelle fonction middleware est destinée à être utilisée dans une route Express.
// Elle exécute la fonction 'func' avec les objets de requête (req), réponse (res) et le prochain middleware (next).
// Si 'func' rejette une promesse (c'est-à-dire qu'une erreur asynchrone se produit),
// elle attrape cette erreur et la passe au middleware suivant avec 'next(err)'.
const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

export default asyncErrorHandler;
