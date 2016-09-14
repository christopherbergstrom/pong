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
var intup;
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
    console.log("key pressed");

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
      launchDir();
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
function launchDir()
{
  var launchDirection = Math.floor(Math.random()*2);
  if (launchDirection === 0)
    moveBallUpLeft(pX, pY);
  else if (launchDirection === 1)
    moveBallDownLeft(pX, pY);
  else
    moveBallStraight(pX, pY);
}
function launch()
{
  var pRect = player.getBoundingClientRect();
  var pX = pRect.left;
  var pY = pRect.top;
  resetBall(pX, pY);
  // whichDirection();
  translateBallUpLeft(pX, pY);
  upLeft = true;
  time = setInterval(function()
  {
    ballRect = ball.getBoundingClientRect();
    // translateComp(pPosRect.left);
    translateComp(ballRect.top);
  }, 1);
  time2 = setInterval(function()
  {
    var bPosRect = ball.getBoundingClientRect();
    check();
  }, 1);
}
function moveComp(ballY)
{
  comp.style.position = "absolute";
  // var compRect = cMiddle.getBoundingClientRect();
  var compRect = comp.getBoundingClientRect();
  var compY = compRect.top;
  var compYBottom = compRect.bottom;
  // var compY = compRect.top;
  // console.log(ballY);
  // console.log(compY);
  // console.log(compYBottom);
  // console.log(tableRect.top);
  // console.log(tableRect.bottom);
  if (ballY > compY)
  {
    // console.log("go down");
    compY += 1;
  }
  else if (ballY < compYBottom)
  {
    compY -= 1;
    // console.log("go up");
  }
  else
    compY = compY;
  comp.style.transition = ".01s linear";
  comp.style.top = compY+'px';
}

function resetBall(playerX, playerY)
{
  ball.css("margin-left", "93%");
  ball.css("top", "45px");
}
function translateBallUpLeft()
{
  var compRect = comp.getBoundingClientRect();
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.left;
  var ballY = ballRect.top;
  if (ballY > tableRect.top && ballX > compRect.right)
  {
    ball.style.position = "absolute";
    ballX -= 1;
    ballY -= 1;

    ball.style.transition = ".01s linear";
    ball.style.left = ballX+'px';
    ball.style.top = ballY+'px';
  }
  // if ball hits comp
  else if (ballY > tableRect.top && ballX <= compRect.right)
  {
    upLeft = false;
    downLeft = false;
    upRight = true;
    downRight = false;
  }
  // if ball hits top
  else
  {
    upLeft = false;
    downLeft = true;
    upRight = false;
    downRight = false;
  }
}
function translateBallDownLeft()
{
  var compRect = comp.getBoundingClientRect();
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.left;
  var ballY = ballRect.bottom;
  if (ballY < tableRect.bottom && ballX > compRect.right)
  {
    ball.style.position = "absolute";
    ballX -= 1;
    ballY += 1;

    ball.style.transition = ".01s linear";
    ball.style.left = ballX+'px';
    ball.style.top = ballY+'px';
  }
  // if ball hits comp
  else if (ballY > tableRect.top && ballX <= compRect.right)
  {
    upLeft = false;
    downLeft = false;
    upRight = false;
    downRight = true;
  }
  // if ball hits bottom
  else
  {
    upLeft = true;
    downLeft = false;
    upRight = false;
    downRight = false;
  }
}
function translateBallUpRight()
{
  var pRect = player.getBoundingClientRect();
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.right;
  var ballY = ballRect.top;
  if (ballY > tableRect.top && ballX < pRect.left)
  {
    ball.style.position = "absolute";
    ballX += 1;
    ballY -= 1;

    ball.style.transition = ".01s linear";
    ball.style.left = ballX+'px';
    ball.style.top = ballY+'px';
  }
  // if ball hits player
  else if (ballY > tableRect.top && ballX >= pRect.left)
  {
    upLeft = true;
    downLeft = false;
    upRight = false;
    downRight = false;
  }
  // if ball hits top
  else
  {
    upLeft = false;
    downLeft = false;
    upRight = false;
    downRight = true;
  }
}
function translateBallDownRight()
{
  var pRect = player.getBoundingClientRect();
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.right;
  var ballY = ballRect.bottom;
  if (ballY < tableRect.bottom && ballX < pRect.left)
  {
    ball.style.position = "absolute";
    ballX += 1;
    ballY += 1;

    ball.style.transition = ".01s linear";
    ball.style.left = ballX+'px';
    ball.style.top = ballY+'px';
  }
  // if ball hits player
  else if (ballY < tableRect.bottom && ballX >= pRect.left)
  {
    upLeft = false;
    downLeft = true;
    upRight = false;
    downRight = false;
  }
  // if ball hits bottom
  else
  {
    upLeft = false;
    downLeft = false;
    upRight = true;
    downRight = false;
  }
}
function translateBallStraight()
{
  ball.style.position = "absolute";
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.left;
  var ballY = ballRect.top;
  if (playerX > ballX)
    ballX += 10;
  else if (playerX < ballX)
    ballX -= 10;
  if (playerY > ballY)
    ballY += 10;
  else if (playerY < ballY)
    ballY -= 10;

  ball.style.transition = "5s linear";
  ball.style.left = playerX+'px';
  ball.style.top = playerY+'px';
}
