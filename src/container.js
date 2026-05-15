const { createDbPool } = require("./db/pool");
const { createLogger } = require("./services/logger");
const { GameRepository } = require("./repositories/gameRepository");
const { ReviewRepository } = require("./repositories/reviewRepository");
const { PageController } = require("./controllers/pageController");
const { ReviewController } = require("./controllers/reviewController");

function createContainer(config) {
  const logger = createLogger();
  const db = createDbPool(config.db);
  const gameRepository = new GameRepository(db);
  const reviewRepository = new ReviewRepository(db);
  const pageController = new PageController(gameRepository, reviewRepository);
  const reviewController = new ReviewController(reviewRepository, gameRepository);

  return {
    logger,
    db,
    gameRepository,
    reviewRepository,
    pageController,
    reviewController
  };
}

module.exports = { createContainer };
