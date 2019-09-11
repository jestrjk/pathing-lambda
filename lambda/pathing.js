
var TileCoordinates = require('./tileCoordinates')

class Path {
  constructor( maze, playerStart = { x: 0, y: 0 }, goal ) {
    this.playerStart = new TileCoordinates( playerStart.x, playerStart.y ) 
    if ( goal ) {
      this.goal = new TileCoordinates( goal.x, goal.y )
    } 
    else {
      this.goal = new TileCoordinates( maze.width-1, maze.height-1 )
    }

    this.pathTaken = [ this.playerStart ]
    this.maze = maze
    
    // Set the player start point, for visual reference
    maze.setTile( this.playerStart , maze.tileSet.player )
    // Set the ending goal
    maze.setTile( this.goal , maze.tileSet.goal )
  }
  
  currentCoords() {
    return this.pathTaken[this.pathTaken.length-1]
  }

  findPath() {

    let stillMoreOptions = true

    while( stillMoreOptions )
    {
      let step = this.getClosestOpenTile( this.currentCoords() )

      if ( step === undefined ) {
        if ( this.pathTaken.length == 1 ) stillMoreOptions = false
        this.backTrack()
      }
      else {
        this.pathTaken.push( step )
        if ( step.equals( this.goal ) ) {
          stillMoreOptions = false
          return 
        }
        this.maze.setTile(step, this.maze.tileSet.path)
      }
    }
  }

  backTrack() {
    let wrongPath = this.pathTaken.pop()
    this.maze.setTile( wrongPath , this.maze.tileSet.wrong )
  }

  isSamePosition( step ) {
    let cp = this.currentCoords()

    if ( cp.x == step.x && cp.y == step.y ) return true

    return false
  }

  getClosestOpenTile(coords) {
    let openTiles = this.getOpenTiles( coords ) 
    if ( openTiles.length > 0 ) {

      return openTiles.reduce( (prev, cur) => {
        if ( this.distanceToEnd( prev ) > this.distanceToEnd( cur ) ) {
          return cur
        } else {
          return prev
        }
      })
    }
    else {
      return undefined
    }
  }

  getOpenTiles( coords ) {
    
    if ( coords === undefined ) return []

    let openTiles = []
    let examineTileCoords = [ coords.left(), coords.right(), coords.up(), coords.down() ]
    
    examineTileCoords.forEach( tileCoords => {
      if ( this.tileIsOpen( tileCoords ) ) openTiles.push( tileCoords ) 
    })

    return openTiles
  }

  tileIsOpen( tileCoordinates ) {

    if ( 
      this.maze.tile(tileCoordinates) == this.maze.tileSet.open || 
      this.maze.tile(tileCoordinates) == this.maze.tileSet.goal 
    ) { 
      return true 
    }

    return false 
  }

  distanceToEnd( coords ) {
    let distance = Math.sqrt( Math.pow(this.goal.x - coords.x,2) + Math.pow(this.goal.y - coords.y,2) )
    return distance
  }
}

module.exports = Path