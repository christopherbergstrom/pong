var body;
var table;
var player;
var comp;
var ball;
var pressed = [];
var up = true;
var down = true;
var vert = 0;
var ballX = 0;
var ballY = 45;
var intDown;
var intUp;
var gameInt;
var launched = true;

// var pTop;
// var pMiddle;
// var pBottom;
// var cTop;
// var comp;
// var cMiddle;
// var cBottom;

var left = false;
var right = false;
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
  $("#table").append("<div id='tableTop'></div>");
  $("#table").append("<div id='tableBottom'></div>");
  $("#table").append("<div id='tableLeft'></div>");
  $("#table").append("<div id='tableRight'></div>");
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
  tableTop = $("#tableTop");
  tableBottom = $("#tableBottom");
  tableLeft = $("#tableLeft");
  tableRight = $("#tableRight");
  ball = $("#ball");
  player = $("#player");
  comp = $("#comp");
  ballX = Math.floor(((table.innerWidth()/100) * 93));
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
        playerCheck();
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
        playerCheck();
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
  ballY = vert+45;
}
function playerCheck()
{
  if(vert < 0)
  {
    vert = 0;
  }
  else if((vert + 100) > table.innerHeight())
  {
    vert = (table.innerHeight() - 100);
  }
}
function launch()
{
  console.log("ballX: "+ballX);
  console.log("ballY: "+ballY);
  var launchDirection = Math.floor(Math.random()*3);
  if (launchDirection === 0)
  {
    console.log("up left");
    ballUpLeft();
  }
  else if (launchDirection === 1)
  {
    console.log("down left");
    ballDownLeft();
  }
  else
  {
    console.log("left");
    ballLeft();
  }
}
function compCheck()
{
}
function ballCheck()
{
  if(ballY <= 0)
  {
    clearInterval(gameInt);
    if (upLeft)
      ballDownLeft();
    if (upRight)
      ballDownRight();
    if (sharpUpLeft)
      ballSharpDownLeft();
    if (sharpUpRight)
      ballSharpDownRight();
  }
  else if((ballY + 10) > table.innerHeight())
  {
    clearInterval(gameInt);
    if (downLeft)
      ballUpLeft();
    if (downRight)
      ballDownRight();
    if (sharpDownLeft)
      ballSharpDownLeft();
    if (sharpDownRight)
      ballSharpDownRight();
  }
}
function moveComp()
{

}
function ballUpLeft()
{
  makeFalse();
  upLeft = true;
  gameInt = setInterval(function()
  {
    ballX -= 1;
    ballY -= 1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownLeft()
{
  makeFalse();
  downLeft = true;
  gameInt = setInterval(function()
  {
    ballX -= 1;
    ballY += 1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballUpRight()
{
  makeFalse();
  upRight = true;
  gameInt = setInterval(function()
  {
    ballX += 1;
    ballY -= 1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownRight()
{
  makeFalse();
  downRight = true;
  gameInt = setInterval(function()
  {
    ballX += 1;
    ballY += 1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
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
function ballLeft()
{
  makeFalse();
  left = true;
  gameInt = setInterval(function()
  {
    ballX -= 1;
    ball.css("left", ballX+"px");
    ballCheck();
  }, 1);
}
function ballRight()
{
  makeFalse();
  right = true;
  gameInt = setInterval(function()
  {
    ballX += 1;
    ball.css("left", ballX+"px");
    ballCheck();
  }, 1);
}
function resetBall()
{
  ball.css("left", "93%");
  ball.css("top", "45px");
}
function makeFalse()
{
  left = false;
  right = false;
  upLeft = false;
  downLeft = false;
  upRight = false;
  downRight = false;
  sharpUpLeft = false;
  sharpDownLeft = false;
  sharpUpRight = false;
  sharpDownRight = false;
}
