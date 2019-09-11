const localLambdaFunction = require( './lambda/find-path.js' ) 
const AWS = require ( 'aws-sdk')
const { PerformanceObserver, performance } = require('perf_hooks');

const lambdaService = new AWS.Lambda()

async function app() {

  // var findStart = performance.now()
  // var findEnd = performance.now()
  var event = {}
  var context = {}

  // LOCAL
  localLambdaFunction.main( event, context ).then ( (data) => {
    display( data )
  })

  // ASYNC LAMBDA
  lambdaService.invoke( { FunctionName: 'pathing-lambda-pathinglambdaC958412A-1WMVM78U8IESK'}).promise().then( (data) => {
    
    let maze = JSON.parse( data.Payload )
    display( maze )
  })

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