const localLambdaFunction = require( './lambda/find-path.js' ) 
const AWS = require ( 'aws-sdk')
const { PerformanceObserver, performance } = require('perf_hooks');

const lambdaService = new AWS.Lambda()

async function app() {
  
  var numberOfIterations = 20

  performance.mark( 'local 1x start')
  // LOCAL
  localLambdaFunction.main( {}, {} ).then( (data) => {
    display( data )
  })

  performance.mark( 'local 1x end' )

  performance.mark( `local ${numberOfIterations}x start` )
  for( let i = 0 ; i < numberOfIterations ; i++ ) {
    await localLambdaFunction.main( {}, {} )
  }
 
  // ASYNC LAMBDA
  performance.mark( `local ${numberOfIterations}x end` )
  await lambdaService.invoke( { FunctionName: 'pathing-lambda-pathinglambdaC958412A-1WMVM78U8IESK'}).promise().then( (data) => {
    
    let maze = JSON.parse( data.Payload )
    console.log( `LAMBDA: `)
    display( maze )
  })

  
  performance.mark( `LAMBDA ${numberOfIterations}x Start` )
  
  var mazePromises = []

  performance.mark( 'lambda invocations')
  for( let i = 0 ; i < numberOfIterations ; i++ ) {
    mazePromises.push( lambdaService.invokeAsync( { InvokeArgs: JSON.stringify({nothing: 'here'} ), FunctionName: 'pathing-lambda-pathinglambdaC958412A-1WMVM78U8IESK'}).promise())
  }
  performance.mark( 'lambda invocations end')

  console.log( "Starting multiple iterations of each and measuring performance" )

  Promise.all( mazePromises ).then ( () => {
    performance.mark( `LAMBDA ${numberOfIterations}x End`)
    performance.measure( 'local 1x', 'local 1x start', 'local 1x end')
    performance.measure( `lambda invokes`, 'lambda invocations start', 'lambda invocations end')
    performance.measure( `LAMBDA Results ${numberOfIterations}x`, `LAMBDA ${numberOfIterations}x Start`, `LAMBDA ${numberOfIterations}x End`)
    performance.measure( `local ${numberOfIterations}x`, `local ${numberOfIterations}x start`, `local ${numberOfIterations}x end`)
  })

};

///
/// Helper Functions
///
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

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach ( entry => console.log( `${entry.name}: ${entry.duration}` ) ) 
});
obs.observe({ entryTypes: ['measure'] });

app() ;