/**
 * res.render() без callback отдаёт ошибку шаблона асинхронно —
 * в async-хендлерах её не поймать обычным try/catch (получается 500).
 */
function renderPage(res, view, locals, statusCode) {
  if (typeof statusCode === "number") {
    res.status(statusCode);
  }
  return new Promise((resolve, reject) => {
    res.render(view, locals, (err, html) => {
      if (err) {
        reject(err);
        return;
      }
      res.send(html);
      resolve();
    });
  });
}

module.exports = { renderPage };
