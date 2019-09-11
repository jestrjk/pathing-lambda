const Path  = require('./pathing')
const Maze = require( './maze')

exports.main = async function ( event, context ) {

  let mazeHeight = 50 
  let mazeWidth = 100

  let maze = new Maze({ wallPercentage: .25, width: mazeWidth, height: mazeHeight })
  
  let playerStart = { x: randInt(mazeWidth/2), y: randInt(mazeHeight/2) }
  let goal = { x: randInt(mazeWidth/2) + mazeWidth/2, y: randInt(mazeHeight/2)+mazeHeight/2 }

  let path = new Path( maze, playerStart, goal )
  path.findPath()

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify( maze )
  }
}


function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}