var table;
var movies = [];
var margin = 140;
var spacer = 190;
var baseline = 110;
var hovered = false;
var dash = 30;
var r = 13.5;
var b = 3;
var graphik;

const GRIDMID = 490; // midpoint of vertical line grid

function preload() {
  table = loadTable("budget.csv", "csv", "header");
  graphik = loadFont("fonts/graphik_medium.otf");
}


function setup() {
  createCanvas(8300, 850);
  rectMode(CENTER);

  for (var r = 0; r < 43; r++) {
  // for (var r = 0; r < table.getRowCount(); r++) {
    var movie = {};
    movie.date = parseInt(table.getRow(r).get("date"));
    movie.budget = parseFloat(table.getRow(r).get("budget"));
    movie.title = table.getRow(r).get("title");
    movie.awards = parseInt(table.getRow(r).get("awards"));
    movie.id = r;
    movies.push(movie);

  }
  console.log(movies);
}

function draw() {
  background(0);
  noFill();
  strokeWeight(2.5);
  stroke(255);
  
  $('h1').text("OSCAR NOMINATIONS v. BUDGET");  
  $('h2').text("among the 2018 films nominated for best picture");

  for (var m = 0; m < movies.length; m++) {
    var x = margin + m * spacer; // starting x postition of circles
    push();
    strokeWeight(2.5);
    stroke("#252e58");
    line(x, baseline + r * 12 / 2, x, baseline + r * 12 / 2 + dash);
    pop();
    for (var a = 0; a < 13; a++) {
      push();
      strokeWeight(2.5);
      stroke("#252e58");
      ellipse(x, baseline, r * a, r * a);
      pop();

      if (movies[m].awards >= a) {
        push();
        strokeWeight(3);
        stroke(255);
        ellipse(x, baseline, r * a, r * a);
        pop();
      }
    }
    push();
    noStroke();
    fill(250, 210, 245, 200);
    ellipse(x, -330 + movies[m].budget/0.66 + 552,
            movies[m].budget * b, movies[m].budget * b); // radius of 2 and abs(200 - .... also works)
    pop();
    push();
    noStroke();
    fill("#ffffff");
    textAlign(LEFT);
    var title = "#t" + movies[m].id + "";
    var budget = "#b" + movies[m].id + "";
    var date = "#y" + movies[m].id + "";
    $(title).text(movies[m].title);
    $(budget).text("$" + movies[m].budget + "m");
    $(date).text(movies[m].date);

    pop();
  }
  noLoop();

}