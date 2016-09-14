var body;
var table;
var player;
var comp;
var ball;
var down = [];
var up = true;
var down = true;
var vert = 10;
var intDown;
var intup;

// var moveRight = true;
// var moveLeft = false;

// var pTop;
// var pMiddle;
// var pBottom;
// var cTop;
// var comp;
// var cMiddle;
// var cBottom;
var time = 0;
var time2 = 0;
var launchDir;
var tableRect;
var ballRect;
var upLeft = false;
var downLeft = false;
var upRight = false;
var downRight = false;
$(document).ready(function()
{

  body = $("body")
  table = $("#table");
  // tableRect = table.getBoundingClientRect();
  ball = $("#ball");
  // ballRect = table.getBoundingClientRect();

  player = $("#player");
  // pTop = document.getElementById("pTop");
  // pMiddle = document.getElementById("pMiddle");
  // pBottom = document.getElementById("pBottom");

  comp = $("#comp");
  // cTop = document.getElementById("cTop");
  // cMiddle = document.getElementById("cMiddle");
  // cBottom = document.getElementById("cBottom");
  // vDistance = 10;
  // hDistance = 10;
  createMenu();
  findPositions();
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
  $("#table").append("<div id='comp'>C</div>");
  $("#table").append("<div id='ball'></div>");
  play();
}
function play()
{
  player.css("top", vert+"px");
  player.css("left", hor+"px");
  check();
  $(document).keydown(function(e)
  {
    down[e.which] = true;

    // right
    if (down[39] && right)
    {
      right = false;
      moveRight = true;
      moveLeft = false;
      player.css("background-image", "url(images/stickRight.png)");
      intRight = setInterval(function()
      {
        hor += 1;
        if(hor > 930)
        {
          hor = 930;
        }
        player.css("left", hor+"px");
      }, 1);
    }

    // left
    if (down[37] && left)
    {
      left = false;
      moveRight = false;
      moveLeft = true;
      player.css("background-image", "url(images/stickLeft.png)");
      intLeft = setInterval(function()
      {
        hor -= 1;
        if(hor < 0)
        {
          hor = 0;
        }
        player.css("left", hor+"px");
      }, 1);
    }
  }).keyup(function(e)
  {
    down[e.which] = false;
    if (e.which == 38 || e.which == 40)
    {
      if (!right && jump)
      {
        if (intRight)
        {
          clearInterval(intRight);
          right = true;
        }
      }
      else if (!right && !jump && !down[39])
      {
        if (intRight)
        {
          clearInterval(intRight);
          right = true;
        }
      }
      if (!left && jump)
      {
        if (intLeft)
        {
          clearInterval(intLeft);
          left = true;
        }
      }
      else if (!left && !jump && !down[37])
      {
        if (intLeft)
        {
          clearInterval(intLeft);
          left = true;
        }
      }
    }
  });
}
function findPositions()
{
  addEventListener("keydown", function(e)
  {
    // if (e.keyCode === 87)
    // {
    //   console.log("up");
    //   moveUp();
    // }
    // if (e.keyCode === 83)
    // {
    //   console.log("down");
    //   moveDown();
    // }
    if (e.keyCode === 38)
    {
      // console.log("up");
      moveUp();
    }
    if (e.keyCode === 40)
    {
      // console.log("down");
      moveDown();
    }
    if (e.keyCode === 32)
    {
      // console.log("space");
      launch();
    }
  });
}
function moveUp()
{
  var pRect = player.getBoundingClientRect();
  if (pRect.top > tableRect.top)
  {
    player.style.position = "absolute";
    var playerRect = player.getBoundingClientRect();
    var playerY = pRect.top - 10;
    player.style.transition = ".05s";
    player.style.top = playerY+'px';
  }
}
function moveDown()
{
  var pRect = player.getBoundingClientRect();
  if (pRect.bottom < tableRect.bottom)
  {
    player.style.position = "absolute";
    var playerRect = player.getBoundingClientRect();
    var playerY = pRect.top + 10;
    player.style.transition = ".05s";
    player.style.top = playerY+'px';
  }
}
function translateComp(ballY)
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
function whichDirection()
{
  launchDir = Math.floor(Math.random()*3);
  if (launchDir === 1)
  {
    translateBallUpLeft(pX, pY);
  }
  else if (launchDir === 2)
  {
    translateBallDownLeft(pX, pY);
  }
  else
  {
    translateBallStraight(pX, pY);
  }
}
function resetBall(playerX, playerY)
{
  ball.style.position = "absolute";
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.left;
  var ballY = ballRect.top;
  ball.style.transition = ".01s linear";
  ball.style.left = playerX+'px';
  ball.style.top = playerY+'px';
  // translateBallUpLeft(playerX, playerY);
}
function check(playerX, playerY)
{
  var ballRect = ball.getBoundingClientRect();
  var ballX = ballRect.left;
  var ballY = ballRect.top;
  // if (ballRect.top > tableRect.top)
  //   translateBallUpLeft()
  // if (ballRect.bottom < tableRect.bottom)
  //   translateBallUpLeft()
  if (upLeft === true)
    translateBallUpLeft();
  if (downLeft === true)
    translateBallDownLeft();
  if (upRight === true)
    translateBallUpRight();
  if (downRight === true)
    translateBallDownRight();
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
