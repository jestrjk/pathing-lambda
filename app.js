const Maze = require( './maze.js' ) 
const Path = require( './lambda/pathing.js' ) 
var readline = require( 'readline' )
const { PerformanceObserver, performance } = require('perf_hooks');

async function app() {
    
  let maze = new Maze({ wallPercentage: .25, height: 100, width: 100 })
  
  let path = new Path( maze )

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

app() ;