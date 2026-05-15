const express = require("express");
const { reviewValidationRules, validate } = require("../middleware/validation");

function createRouter(container) {
  const router = express.Router();
  const { pageController, reviewController } = container;

  router.get("/reviews.html", (req, res) => {
    res.redirect(301, "/reviews");
  });

  router.get("/", pageController.home.bind(pageController));
  router.get("/news", pageController.news.bind(pageController));
  router.get("/guides", pageController.guides.bind(pageController));
  router.get("/industry", pageController.industry.bind(pageController));
  router.get("/sales", pageController.sales.bind(pageController));
  router.get("/reviews", pageController.reviews.bind(pageController));

  router.post(
    "/reviews",
    reviewController.preparePageData.bind(reviewController),
    reviewValidationRules,
    validate,
    reviewController.create.bind(reviewController)
  );

  router.put(
    "/reviews/:id",
    reviewController.preparePageData.bind(reviewController),
    reviewValidationRules,
    validate,
    reviewController.update.bind(reviewController)
  );

  router.delete("/reviews/:id", reviewController.remove.bind(reviewController));

  return router;
}

module.exports = { createRouter };
