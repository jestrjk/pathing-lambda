const Maze = require( './maze.js' ) 
const Path = require( './lambda/pathing.js' ) 
var readline = require( 'readline' )
const { PerformanceObserver, performance } = require('perf_hooks');

async function app() {

  let mazeHeight = 50 
  let mazeWidth = 100

  let maze = new Maze({ wallPercentage: .25, width: mazeWidth, height: mazeHeight })
  
  let playerStart = { x: randInt(mazeWidth/2), y: randInt(mazeHeight/2) }
  let goal = { x: randInt(mazeWidth/2) + mazeWidth/2, y: randInt(mazeHeight/2)+mazeHeight/2 }

  let path = new Path( maze, playerStart, goal )

  var findStart = performance.now()
  path.findPath()
  var findEnd = performance.now()


  let length = path.pathTaken.length
  if ( length > 1 ) {
    console.log( `Length traveled: ${path.pathTaken.length} `)
  }
  else {
    console.log( `No path, so sad, length travled: ${path.pathTaken.length}`)
  }
  
  maze.display()

  console.log( `finding the path took: ${findEnd - findStart}` )

};

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app() ;