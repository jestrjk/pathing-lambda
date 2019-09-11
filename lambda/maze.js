var TileCoordinates = require('./tileCoordinates')

class Maze {
  constructor( { 
    wallPercentage = .25, 
    width = randInt(24)+12, 
    height = randInt(8)+8 
  } = {} ) {
  
    this.tileSet = {
      wall: '█',
      path: '.',
      wrong: 'x',
      player: '@',
      goal: '$',
      open: ' ',
    }
    
    this.wallPercentage = wallPercentage
    this.width = width
    this.height = height

    this.generateMaze()
  }

  generateMaze() {
    // We are going to use a single array, you just break it up using the width of the maze
    // you can see the math and calcs in all the methods below...basically y*width + x gives you
    // the right tile.
    this.tiles = new Array(this.height*this.width)
    this.tiles.fill( this.tileSet.open )

    // Place the walls
    let numberOfWalls = this.wallPercentage * this.tiles.length

    for( let wallIter = 0; wallIter < numberOfWalls ; wallIter++ ) {
      this.setTile( new TileCoordinates( randInt( this.width ), randInt( this.height ) ), this.tileSet.wall )
    }


  }
  
  tile(tc) {
    if ( tc.x < 0 || tc.x >= this.width ) return this.tileSet.wall
    if ( tc.y < 0 || tc.y >= this.height ) return this.tileSet.wall

    return this.tiles[this.tileIndex(tc)]
  }

  setTile(tc, tile) {
    this.tiles[this.tileIndex(tc)] = tile 
  }

  tileIndex( tc ){
    if ( tc === undefined ) return 0

    return tc.y*this.width + tc.x
  }
  
  
}

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Maze