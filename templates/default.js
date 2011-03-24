var jxl = new Jixel($('<canvas/>')[0]);        
var assets = {
              'randomTiles': ['script', 'extensions/JxlRandomTileMaps.js'],
              'autotiles': ['image', 'assets/autotiles.png'],
              'autotiles_alt' : ['image', 'assets/autotiles_alt.png'],
              'animals':['image', 'assets/animals.png']
            };
jxl.am.load(assets, function() {
    game.changeScale(1);
    game._width(480);
    game._height(3260);
    game.state = new DefaultState();
    game.showFPS();
    $('body').append(can);
    game.start();
});
   
var DefaultState = new Class({
    Extends: JxlState,
    initialize: function() {
        this.parent();
        this.level = new JxlTileMap(0,0,JxlTileMap.AUTO).loadMap(game,"0,1,1,1,1,1,1,0", am.get('autotiles'));
        this.player = new Cat(am.get('animals'), 50, 0);
        this.add(this.player);
        this.add(this.level);
        jxl.follow(this.player);
    },
    update: function(game, delta) {
        this.parent(game, delta);
        jxlU.collide(this.level, this.player);
    }
});
var Cat = new Class({
	Extends: JxlSprite,
	initialize: function(graphic, x, y) {
	  this.parent(graphic, x, y, 32, 32);
	  this.addAnimation('run', [72,73,74,73], .30);
	  this.addAnimation('idle', [48,49,50,49], .50);
	  this.play('idle');
	  this.speed = -80;
	  this.drag = new JxlPoint(150,150);
	  this.acceleration.y = 500;
	},
	update: function(game, time) {
	   if ('A' in game.keys) {
	     this.velocity.x = this.speed;
	     this._flipped = true;
	     this.play('run');
	   } else if ('D' in game.keys) {
	     this._flipped = false;
	     this.play('run');
	     this.velocity.x = -1*this.speed;
	   } else {
	     this.play('idle');
	   }
	   if('SPACE' in game.keys && this.onFloor) {
		emitter.setXSpeed(-50* ((this._flipped) ? -1 : 1), -10*( (this._flipped) ? -1 : 1));
	    this.velocity.y = -150;
	   } 
	   this.parent(game, time);
	}
});
