const lambda = require( './lambda/find-path.js' ) 
const { PerformanceObserver, performance } = require('perf_hooks');

async function app() {

  // var findStart = performance.now()
  // var findEnd = performance.now()
  var event = {}
  var context = {}

  var lambdaResult = await lambda.main( event, context )
  console.log( lambdaResult.body ) 

  var maze = JSON.parse( lambdaResult.body )

  // let length = path.pathTaken.length
  // if ( length > 1 ) {
  //   console.log( `Length traveled: ${path.pathTaken.length} `)
  // }
  // else {
  //   console.log( `No path, so sad, length travled: ${path.pathTaken.length}`)
  // }
  
  display( maze )

};

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function display(maze) {
  console.log( `${maze.width}x${maze.height} @ ${maze.wallPercentage * 100}% walls` )
  for( let y = 0 ; y < maze.height ; y++ ) {
    console.log( maze.tiles.slice( y*maze.width, y*maze.width + maze.width ).join('') )
  }
}

app() ;