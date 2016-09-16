var body;
var table;
var player;
var comp;
var ball;
var pressed = [];
var up = true;
var down = true;
var vert = 0;
var intDown;
var intUp;
var launched = true;

// var pTop;
// var pMiddle;
// var pBottom;
// var cTop;
// var comp;
// var cMiddle;
// var cBottom;

var upLeft = false;
var downLeft = false;
var upRight = false;
var downRight = false;
var sharpUpLeft = false;
var sharpDownLeft = false;
var sharpUpRight = false;
var sharpDownRight = false;
var straight = false;

$(document).ready(function()
{
  body = $("body");
  createMenu();
});
function createMenu()
{
  body.append("<div id='menu'></div>");
  $("#menu").append("<button id='one'>1 Player</button>");
  $("#menu").append("<button id='two'>2 Player</button>");
  $("#one").click(function()
  {
    $("#menu").remove();
    createGame();
  });
}
function createGame()
{
  body.append("<div id='table'></div>");
  $("#table").append("<div id='player'>P</div>");
  $("#player").append("<div id='pTopH'></div>");
  $("#player").append("<div id='pTopL'></div>");
  $("#player").append("<div id='pMid'></div>");
  $("#player").append("<div id='pLowL'></div>");
  $("#player").append("<div id='pLowH'></div>");
  $("#table").append("<div id='comp'>C</div>");
  $("#comp").append("<div id='cTopH'></div>");
  $("#comp").append("<div id='cTopL'></div>");
  $("#comp").append("<div id='cMid'></div>");
  $("#comp").append("<div id='cLowL'></div>");
  $("#comp").append("<div id='cLowH'></div>");
  $("#table").append("<div id='ball'></div>");
  table = $("#table");
  ball = $("#ball");
  player = $("#player");
  comp = $("#comp");
  play();
}
function play()
{
  player.css("top", vert+"px");
  // check();
  $(document).keydown(function(e)
  {
    pressed[e.which] = true;
    // up
    if (pressed[38] && up)
    {
      up = false;
      intUp = setInterval(function()
      {
        vert -= 1;
        check();
        player.css("top", vert+"px");
        if (launched)
        {
          ballPreLaunch();
        }
      }, 1);
    }
    // down
    else if (pressed[40] && down)
    {
      down = false;
      intDown = setInterval(function()
      {
        vert += 1;
        check();
        player.css("top", vert+"px");
        if (launched)
        {
          ballPreLaunch();
        }
      }, 1);
    }
    else if (pressed[32] && launched)
    {
      launched = false;
      launch();
    }
  }).keyup(function(e)
  {
    pressed[e.which] = false;
    if (e.which == 38 || e.which == 40)
    {
      if (!up && !pressed[38])
      {
        if (intUp)
        {
          clearInterval(intUp);
          up = true;
        }
      }
      if (!down && !pressed[40])
      {
        if (intDown)
        {
          clearInterval(intDown);
          down = true;
        }
      }
    }
  });
}
function ballPreLaunch()
{
  ball.css("top", (vert+45)+"px");
}
function check()
{
  if(vert < 0)
  {
    vert = 0;
  }
  else if((vert + 100) > (table.outerHeight() - 5))
  {
    vert = (table.outerHeight() - 105);
  }
}
function launch()
{
  console.log("launched");
  var launchDirection = Math.floor(Math.random()*2);
  if (launchDirection === 0)
    ballUpLeft();
  else if (launchDirection === 1)
    ballDownLeft();
  else
    ballStraight();
}
function moveComp()
{

}
function ballUpLeft()
{

}
function ballDownLeft()
{

}
function ballUpRight()
{

}
function ballDownRight()
{

}
function ballSharpUpLeft()
{

}
function ballSharpDownLeft()
{

}
function ballSharpUpRight()
{

}
function ballSharpDownRight()
{

}
function ballStraight()
{

}
function resetBall()
{
  ball.css("margin-left", "93%");
  ball.css("top", "45px");
}
