$(document).on("page:beforein", '.page[data-name="home"]', function () {
  app.store.dispatch("calcUserScore");
});

$(document).on("page:afterin", '.page[data-name="home"]', function () {
  var userScore = app.store.getters.getUserScore.value;
  console.log("HOME INIT, SCORE:", userScore);

  var userHome = app.store.getters.getHome.value;
  let coords = userHome.location;

  $("#userScore").html(Math.round(userScore * 1000) / 1000 + "km");
  $("#userHome").html(`${Math.round(coords.lat*100000)/100000}, ${Math.round(coords.lng*100000)/100000}`)
});
