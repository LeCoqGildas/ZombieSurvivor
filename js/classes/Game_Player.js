Class.create("Game_Player", {
	map: null,
	currentState: "",
	speed: 7,
	x: 0,
	y: 0,
	a: 0,//acceleration
	d: 0.1,//decélération
	height : 64,
	width : 64,
	dece_dir: false,
	dir: "right",
	_gravity:{
		power: 50,
		velocity: 0
	},
	_jump:{
		power: 40,
		velocity: 1
	},
	level: 1,
	strenght: 10,
	attack: [20,50,70,90,100],
	exp:[0,0,25,65,127,215,337,499,709,974,1302],
	items:[],
	hp: 100,
	hp_max: 100,
	initialize: function(id, width, height, x, y, map){
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.map = map;
		//setHp
	},
	move: function(dir){
		this.dir = dir,
		this.a += .02;
		if(this.a >= 1){
			this.a =1;
		}
		var speed = this.speed * this.a;
		var x = this.x;
		var y = this.y;

		switch(dir){
			case "left":
				x -= this.speed;
				break;
			case "right":
				x += this.speed;
				break;
			case "up":
				y -= this.speed;
				break;
			case "bottom":
				y += this.speed;
				break;
		}
		if(this.map.isPassable(this, x, y)){
			//console.log("passable");
			this.x = x;
			this.y = y;

		}else{
			//console.log("pas passable");
		}
		//return (dir == "up" || dir == "bottom") || (dir == "left" || dir == "right") ? this.y : this.x;
		//return dir == "up" || dir == "bottom" ? this.y : this.x;

	},
	moveClear: function(){
		this.a = 0;
		this.d = 1;
	},
	decelerationXUpdate: function(){
		var dir = this.dece_dir;
		if (dir){
			this.d -= .1;
			if(this.d <= 0){
				this.d = 0;
				this.dece_dir = false;
			}
			var speed = this.speed * this.d;
			var y = this.y;
			var x = this.x;
			switch(dir){
				case "left":
					x -= speed;
					break;
				case "right":
					x += speed;
					break;
				case "up":
					y -= this.speed;
					break;
				case "bottom":
					y += this.speed;
					break;
			}
			if(this.map.isPassable(this, x, y)){
				//console.log("passable");
				this.y = y;
				this.x = x;
			}else{
				//console.log("pas passable");
			}
		}
		return this.x;
		//return (dir == "up" || dir == "bottom") || (dir == "left" || dir == "right") ? this.y : this.x;
	},
	decelerationYUpdate: function(){
		var dir = this.dece_dir;
		if (dir){
			this.d -= .01;
			if(this.d <= 0){
				this.d = 0;
				this.dece_dir = false;
			}
			var speed = this.speed * this.d;
			var y = this.y;
			var x = this.x;
			switch(dir){
				case "left":
					x -= speed;
					break;
				case "right":
					x += speed;
					break;
				case "up":
					y -= this.speed;
					break;
				case "bottom":
					y += this.speed;
					break;
			}
			if(this.map.isPassable(this, x, y)){
				//console.log("passable");
				this.y = y;
				//this.x = x;
			}
		}
		return this.y;
	},
	setDeceleration: function(dir){
		this.dece_dir = dir;
	},
	setLevel: function(level){
		this.level = level;
	},
	getAttack: function(){
		return this.attack[this.level];
	}
	
});