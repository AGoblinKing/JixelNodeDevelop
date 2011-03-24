var JxlRandomTileMap = Class({
    Extends: JxlTileMap,
    createRandom: function(width, height) {
        this.map = [];
        for(var x=0;x<width;x++) {
            this.map[x] = [];
            for(var y=0;y<height;y++) {
                this.map[x][y] = 1;
            }
        }  
    },
    stampOut: function() {
        
    }
});