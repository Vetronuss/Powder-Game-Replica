var grid = []
var gridSize = 50;
var spotSize;

function setup() {
  squareCanvas()
  for (var i = 0; i < gridSize; i++)
  {
    grid.push([])
    for (var o = 0; o < gridSize; o++)
    {
      
      grid[i].push(new Spot(i,o))
      if (o == gridSize-1)
      {
        grid[i][o].type = "solid";
      }
      
    }
  }
  spotSize = width/gridSize;
}

function draw() {
  background(0);
  for (var i = 0; i < gridSize; i++)
  {
    
    for (var o = 0; o < gridSize; o++)
    {
      grid[gridSize-1-i][gridSize-1-o].draw();
      grid[gridSize-1-i][gridSize-1-o].update();
      
      
      if (distance((gridSize-1-i)*spotSize,(gridSize-1-o)*spotSize,mouseX,mouseY)<30)
      {
        if (key == 'a'){
          grid[gridSize-1-i][gridSize-1-o].type = "sand";
        }
        if (key == 's')
        {
          grid[gridSize-1-i][gridSize-1-o].type = "water";
        }if (key == 'd')
        {
          grid[gridSize-1-i][gridSize-1-o].type = "solid";
        }if (key == 'f')
        {
          grid[gridSize-1-i][gridSize-1-o].type = "empty";
        }if (key == 'g')
        {
          grid[gridSize-1-i][gridSize-1-o].type = "lava";
        }
      }
    }
  }
  key = NaN;
  push();
  fill(255)
  noStroke();
  text("Fps: " + getFps(true), 10,10)
  pop();
}

class Spot
{
  constructor(x,y)
  {

    this.x = x;
    this.y = y;
    this.type = "empty";
    
  }
  
  update()
  {
    if (this.type == "sand")
    {
      try{
      if (grid[this.x][this.y+1].type == "empty")
      {
        grid[this.x][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x][this.y+1].type == "water")
      {
        grid[this.x][this.y+1].type = this.type;
        this.type = "water";
      }
      }catch(asd)
      {
        grid[this.x][this.y].type = "empty";
      }
    }
    
    if (this.type == "water")
    {
      try{
      
      if (this.y == gridSize-1)
      {
        this.type = "empty";
        return;
      }
        
      if (grid[this.x][this.y+1].type == "empty")
      {
        grid[this.x][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x+1][this.y+1].type == "empty")
      {
        grid[this.x+1][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x-1][this.y+1].type == "empty")
      {
        grid[this.x-1][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x-1][this.y].type == "empty")
      {
        if (grid[this.x+1][this.y].type == "empty")
        {
          if (round(random(0,1))==1)
          {
            grid[this.x+1][this.y].type = this.type;
            this.type = "empty";
            return;
          }
        }
        grid[this.x-1][this.y].type = this.type;
        this.type = "empty";
      }else if (grid[this.x+1][this.y].type == "empty")
      {
        grid[this.x+1][this.y].type = this.type;
        this.type = "empty";
      }
      }catch(as)
      {
        //this.type = "empty"
      }
    }
    
    if (this.type == "lava")
    {
      try{
      if (this.y == gridSize-1)
      {
        this.type = "empty";
        return;
      }
      if (grid[this.x][this.y+1].type == "empty")
      {
        grid[this.x][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x+1][this.y+1].type == "empty")
      {
        grid[this.x+1][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x-1][this.y+1].type == "empty")
      {
        grid[this.x-1][this.y+1].type = this.type;
        this.type = "empty";
      }else if (grid[this.x][this.y+1].type == "water")
      {
        grid[this.x][this.y+1].type = this.type;
        this.type = "water";
      }
      }catch(asg)
      {
        this.type = "empty";
      }
    }
  }
  
  draw()
  {
    noStroke();
    if (this.type == "sand")
    {
      fill(245, 164, 66);
    }else if(this.type == "solid")
    {
      fill(100)         
    }else if(this.type == "water")
    {
      fill('blue')      
    }else if(this.type == "lava")
    {
      fill('brown')      
    }else
    {
      noFill();
    }
    square(this.x*spotSize,this.y*spotSize,spotSize);
  }
};


