Class.create("Game_Entity", {
	name:"entitee",
	speed: 0,
	x: 0,
	y: 0,
	width:0,
	height: 0,
	frequence: 2,
	currentFrequence:0,
	dir:"right",
	_hit: false,
	_call_hit: {},
	initialize: function(id, x, y, width, height){
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
	},
	callHit: function(on, off){
		this._call_hit.on = on;//sprite.hit(true);
		this._call_hit.off = off;//sprite.hit(false);	
	},
	hit: function(val){
		//console.log(val);
		if(val && !this._hit){
			if(this._call_hit.on){
				this._call_hit.on.call(this);
			} 
		}else if(!val && this._hit){	
			if(this._call_hit.off){
				this._call_hit.off.call(this);
			} 
		}
		this._hit = val;
	},
	isHit: function(){
		return this._hit;
	},
	moveLoop: function(a, b){
		var new_x = this.x;
		if(this.currentFrequence >= this.frequence){
			if(new_x >=b){
				this.dir="left";
			}
			else if(new_x <= a){
				this.dir="right";
			}

			switch (this.dir){
				case "left":
					new_x -= this.speed;
					break;
				case "right":
					new_x += this.speed;
					break;
			}
			this.x = new_x;
			this.currentFrequence = 0;
		}
		this.currentFrequence++;
		return new_x;
	},
	moveBulletX: function(dir){
		var new_x = this.x;
		if(this.currentFrequence >= this.frequence){
			switch (dir){
				case "left":
					new_x -= this.speed;
					break;
				case "right":
					new_x += this.speed;
					break;
			}
			this.x = new_x;
			this.currentFrequence = 0;
		}
		this.currentFrequence++;
		return new_x;
	},
	moveBulletY: function(dir){
		var new_y = this.y;

		if(this.currentFrequence >= this.frequence){
			switch (this.dir){
				case "up":
					new_y -= this.speed;
					break;
				case "bottom":
					new_y += this.speed;
					break;
			}
			this.y = new_y;
			this.currentFrequence = 0;
		}
		this.currentFrequence++;
		return new_y;
	}

});
