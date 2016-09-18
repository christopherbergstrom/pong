var body;
var table;
var player;
var comp;
var ball;
var pressed = [];
var up = true;
var down = true;
var up2 = true;
var down2 = true;
var vert = 0;
var compVert = 0;
var ballX = 0;
var ballY = 65;
var intDown;
var intUp;
var intDown2;
var intUp2;
var ballInt;
var compInt;
var launched = true;
var playerTurn = true;
var onePlayer = false;
var compSpeed = 1;
var playerSpeed = 1;
var ballSpeedX1 = 1;
var ballSpeedX2 = 2;
var ballSpeedX3 = 3;
var ballSpeedY1 = 1;
var ballSpeedY2 = 2;

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
var upSharpLeft = false;
var downSharpLeft = false;
var upSharpRight = false;
var downSharpRight = false;

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
    onePlayer = true;
    $("#menu").remove();
    createGame();
  });
  $("#two").click(function()
  {
    $("#menu").remove();
    createGame();
  });
}
function createGame()
{
  body.append("<div id='scores'></div>");
  $("#scores").append("<div id='compPoint'>0</div>");
  $("#scores").append("<div id='playerPoint'>0</div>");
  body.append("<div id='table'></div>");
  $("#table").append("<div id='tableTop'></div>");
  $("#table").append("<div id='tableBottom'></div>");
  $("#table").append("<div id='tableLeft'></div>");
  $("#table").append("<div id='tableRight'></div>");
  $("#table").append("<div id='player'></div>");
  $("#player").append("<div id='p1'></div>");
  $("#player").append("<div id='p2'></div>");
  $("#player").append("<div id='p3'></div>");
  $("#player").append("<div id='p4'></div>");
  $("#player").append("<div id='p5'></div>");
  $("#player").append("<div id='p6'></div>");
  $("#player").append("<div id='p7'></div>");
  $("#table").append("<div id='comp'></div>");
  $("#comp").append("<div id='c1'></div>");
  $("#comp").append("<div id='c2'></div>");
  $("#comp").append("<div id='c3'></div>");
  $("#comp").append("<div id='c4'></div>");
  $("#comp").append("<div id='c5'></div>");
  $("#comp").append("<div id='c6'></div>");
  $("#comp").append("<div id='c7'></div>");
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
  if (onePlayer)
  {
    play();
  }
  else
  {
    play();
    play2();
  }
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
        vert -= playerSpeed;
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
        vert += playerSpeed;
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
function play2()
{
  comp.css("top", compVert+"px");
  // check();
  $(document).keydown(function(e)
  {
    pressed[e.which] = true;
    // up
    if (pressed[81] && up2)
    {
      up2 = false;
      intUp2 = setInterval(function()
      {
        compVert -= playerSpeed;
        player2Check();
        comp.css("top", compVert+"px");
        if (launched)
        {
          ballPreLaunch();
        }
      }, 1);
    }
    // down
    else if (pressed[65] && down2)
    {
      down2 = false;
      intDown2 = setInterval(function()
      {
        compVert += playerSpeed;
        player2Check();
        comp.css("top", compVert+"px");
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
    if (e.which == 81 || e.which == 65)
    {
      if (!up2 && !pressed[81])
      {
        if (intUp2)
        {
          clearInterval(intUp2);
          up2 = true;
        }
      }
      if (!down2 && !pressed[65])
      {
        if (intDown2)
        {
          clearInterval(intDown2);
          down2 = true;
        }
      }
    }
  });
}
function ballPreLaunch()
{
  if (onePlayer)
  {
    ball.css("top", (vert+65)+"px");
    ballY = vert+65;
  }
  else
  {
    if (playerTurn)
    {
      ball.css("top", (vert+65)+"px");
      ballY = vert+65;
    }
    else
    {
      ball.css("top", (compVert+65)+"px");
      ballY = compVert+65;
    }
  }
}
function launch()
{
  var launchDirection = Math.floor(Math.random()*3);
  if (launchDirection === 0)
  {
    if (playerTurn)
      ballLeft();
    else
      ballUpRight();
  }
  else if (launchDirection === 1)
  {
    if (playerTurn)
      ballLeft();
    else
      ballDownRight();
  }
  else
  {
    if (playerTurn)
      ballLeft();
    else
      ballRight();
  }
  if (onePlayer)
  {
    moveComp();
  }
}
function playerCheck()
{
  if(vert < 0)
  {
    vert = 0;
  }
  else if((vert + 140) > table.innerHeight())
  {
    vert = (table.innerHeight() - 140);
  }
}
function player2Check()
{
  if(compVert < 0)
  {
    compVert = 0;
  }
  else if((compVert + 140) > table.innerHeight())
  {
    compVert = (table.innerHeight() - 140);
  }
}
function compCheck()
{
  if(compVert < 0)
  {
    compVert = 0;
  }
  else if((compVert + 140) > table.innerHeight())
  {
    compVert = (table.innerHeight() - 140);
  }
}
function ballCheck()
{
  // comp scores
  if (ballX >= table.innerWidth())
  {
    clearInts();
    $("#compPoint").html(parseInt(($("#compPoint").html()))+1);
    launched = true;
    playerTurn = true;
    resetBallPlayer();
  }
  // player scores
  else if (ballX <= 0)
  {
    clearInts();
    $("#playerPoint").html(parseInt(($("#playerPoint").html()))+1);
    playerTurn = false;
    resetBallComp();
    if (onePlayer)
    {
      setTimeout(function()
      {
        launch();
      }, 1000);
    }
    else
    {
      launched = true;
    }
  }
  if (ballX >= Math.floor(((table.innerWidth()/100) * 93)))
  {
    for (var i = 1; i < 8; i++)
    {
      if (collision(ball, ($("#p"+i+""))))
      {
        clearInterval(ballInt);
        if (i === 1)
          ballSharpUpLeft();
        if (i === 2)
          ballUpLeft();
        if (i === 3)
          ballUpSharpLeft();
        if (i === 4)
          ballLeft();
        if (i === 5)
          ballDownSharpLeft();
        if (i === 6)
          ballDownLeft();
        if (i === 7)
          ballSharpDownLeft();
      }
    }
  }
  else if (ballX <= Math.floor(((table.innerWidth()/100) * 7)))
  {
    for (var i = 1; i < 8; i++)
    {
      if (collision(ball, ($("#c"+i+""))))
      {
        clearInterval(ballInt);
        if (i === 1)
          ballSharpUpRight();
        if (i === 2)
          ballUpRight();
        if (i === 3)
          ballUpSharpRight();
        if (i === 4)
          ballRight();
        if (i === 5)
          ballDownSharpRight();
        if (i === 6)
          ballDownRight();
        if (i === 7)
          ballSharpDownRight();
      }
    }
  }
  if (ballY <= 0)
  {
    clearInterval(ballInt);
    if (upLeft)
      ballDownLeft();
    else if (upRight)
      ballDownRight();
    else if (sharpUpLeft)
      ballSharpDownLeft();
    else if (sharpUpRight)
      ballSharpDownRight();
    else if (upSharpLeft)
      ballDownSharpLeft();
    else if (upSharpRight)
      ballDownSharpRight();
  }
  else if ((ballY + 10) > table.innerHeight())
  {
    clearInterval(ballInt);
    if (downLeft)
      ballUpLeft();
    else if (downRight)
      ballUpRight();
    else if (sharpDownLeft)
      ballSharpUpLeft();
    else if (sharpDownRight)
      ballSharpUpRight();
    else if (downSharpLeft)
      ballUpSharpLeft();
    else if (downSharpRight)
      ballUpSharpRight();
  }
}
function moveComp()
{
  compInt = setInterval(function()
  {
    if ((compVert + 65) > ballY)
    {
      compVert -= compSpeed;
      compCheck();
      comp.css("top", compVert);
    }
    else if ((compVert + 65) < ballY)
    {
      compVert += compSpeed;
      compCheck();
      comp.css("top", compVert);
    }
  }, 1);
}
function ballUpLeft()
{
  makeFalse();
  upLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX2;
    ballY -= ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownLeft()
{
  makeFalse();
  downLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX2;
    ballY += ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballUpRight()
{
  makeFalse();
  upRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX2;
    ballY -= ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownRight()
{
  makeFalse();
  downRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX2;
    ballY += ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballSharpUpLeft()
{
  makeFalse();
  sharpUpLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX1;
    ballY -= ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballSharpDownLeft()
{
  makeFalse();
  sharpDownLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX1;
    ballY += ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballSharpUpRight()
{
  makeFalse();
  sharpUpRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX1;
    ballY -= ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballSharpDownRight()
{
  makeFalse();
  sharpDownRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX1;
    ballY += ballSpeedY2;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballUpSharpLeft()
{
  makeFalse();
  upSharpLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX2;
    ballY -= ballSpeedY1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownSharpLeft()
{
  makeFalse();
  downSharpLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX2;
    ballY += ballSpeedY1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballUpSharpRight()
{
  makeFalse();
  upSharpRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX2;
    ballY -= ballSpeedY1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballDownSharpRight()
{
  makeFalse();
  downSharpRight = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX2;
    ballY += ballSpeedY1;
    ball.css("left", ballX+"px");
    ball.css("top", ballY+"px");
    ballCheck();
  }, 1);
}
function ballLeft()
{
  makeFalse();
  left = true;
  ballInt = setInterval(function()
  {
    ballX -= ballSpeedX3;
    ball.css("left", ballX+"px");
    ballCheck();
  }, 1);
}
function ballRight()
{
  makeFalse();
  right = true;
  ballInt = setInterval(function()
  {
    ballX += ballSpeedX3;
    ball.css("left", ballX+"px");
    ballCheck();
  }, 1);
}
function resetBallPlayer()
{
  ball.css("left", "93%");
  ball.css("top", (vert + 65)+"px");
  ballX = Math.floor(((table.innerWidth()/100) * 93));
  ballY = (vert + 65);
}
function resetBallComp()
{
  ball.css("left", "7%");
  ball.css("top", (compVert + 65)+"px");
  ballX = Math.floor(((table.innerWidth()/100) * 7));
  ballY = (compVert + 65);
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
  upSharpLeft = false;
  downSharpLeft = false;
  upSharpRight = false;
  downSharpRight = false;
}
function clearInts()
{
  clearInterval(ballInt);
  clearInterval(compInt);
}
function collision($div1, $div2)
{
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
