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
var ballY = 45;
var intDown;
var intUp;
var intDown2;
var intUp2;
var ballInt;
var compInt;
var launched = true;
var onePlayer = false;

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
  $("#table").append("<div id='comp'></div>");
  $("#comp").append("<div id='c1'></div>");
  $("#comp").append("<div id='c2'></div>");
  $("#comp").append("<div id='c3'></div>");
  $("#comp").append("<div id='c4'></div>");
  $("#comp").append("<div id='c5'></div>");
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
        compVert -= 1;
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
        compVert += 1;
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
  ball.css("top", (vert+45)+"px");
  ballY = vert+45;
}
function launch()
{
  if (onePlayer)
  {
    moveComp();
  }
  var launchDirection = Math.floor(Math.random()*3);
  if (launchDirection === 0)
  {
    ballUpLeft();
  }
  else if (launchDirection === 1)
  {
    ballDownLeft();
  }
  else
  {
    ballLeft();
  }
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
function player2Check()
{
  if(compVert < 0)
  {
    compVert = 0;
  }
  else if((compVert + 100) > table.innerHeight())
  {
    compVert = (table.innerHeight() - 100);
  }
}
function compCheck()
{
  if(compVert < 0)
  {
    compVert = 0;
  }
  else if((compVert + 100) > table.innerHeight())
  {
    compVert = (table.innerHeight() - 100);
  }
}
function ballCheck()
{
  if (ballX >= Math.floor(((table.innerWidth()/100) * 93)))
  {
    for (var i = 1; i < 6; i++)
    {
      if (collision(ball, ($("#p"+i+""))))
      {
        clearInterval(ballInt);
        if (i === 1)
          ballSharpUpLeft();
        if (i === 2)
          ballUpLeft();
        if (i === 3)
          ballLeft();
        if (i === 4)
          ballDownLeft();
        if (i === 5)
          ballSharpDownLeft();
      }
    }
  }
  else if (ballX <= Math.floor(((table.innerWidth()/100) * 7)))
  {
    for (var i = 1; i < 6; i++)
    {
      if (collision(ball, ($("#c"+i+""))))
      {
        clearInterval(ballInt);
        if (i === 1)
          ballSharpUpRight();
        if (i === 2)
          ballUpRight();
        if (i === 3)
          ballRight();
        if (i === 4)
          ballDownRight();
        if (i === 5)
          ballSharpDownRight();
      }
    }
  }
  if (ballY <= 0)
  {
    clearInterval(ballInt);
    if (upLeft)
      ballDownLeft();
    if (upRight)
      ballDownRight();
    if (sharpUpLeft)
      ballSharpDownLeft();
    if (sharpUpRight)
      ballSharpDownRight();
  }
  else if ((ballY + 10) > table.innerHeight())
  {
    clearInterval(ballInt);
    if (downLeft)
      ballUpLeft();
    if (downRight)
      ballUpRight();
    if (sharpDownLeft)
      ballSharpUpLeft();
    if (sharpDownRight)
      ballSharpUpRight();
  }
}
function moveComp()
{
  compInt = setInterval(function()
  {
    if ((compVert + 45) > ballY)
    {
      compVert-=1;
      compCheck();
      comp.css("top", compVert);
    }
    else if ((compVert + 45) < ballY)
    {
      compVert+=1;
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
  ballInt = setInterval(function()
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
  ballInt = setInterval(function()
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
  ballInt = setInterval(function()
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
  makeFalse();
  sharpUpLeft = true;
  ballInt = setInterval(function()
  {
    ballX -= 1;
    ballY -= 2;
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
    ballX -= 1;
    ballY += 2;
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
    ballX += 1;
    ballY -= 2;
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
    ballX += 1;
    ballY += 2;
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
    ballX -= 1;
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
    ballX += 1;
    ball.css("left", ballX+"px");
    ballCheck();
  }, 1);
}
function resetBallPlayer()
{
  ball.css("left", "93%");
  ball.css("top", "45px");
}
function resetBallComp()
{
  ball.css("left", "7%");
  ball.css("top", comp.offset().top + 45);
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
