Class.create("Game_Ennemy", {
	map: null,
	dir: "",
	speed: 3,
	x: 0,
	y: 0,
	a: 0,//acceleration
	d: 0.1,//decélération
	dece_dir: false,
	attack: 0,
	defense: 0,
	strenght: 0,
	hp: 0,
	hp_max: 0,
	detection_area:{
		size: 64 * 5,//taille d'un carreau
		state: ""
	},
	setParams: function(params){
		this.attack = params.attack;
		this.defense = params.defense;
		this.strenght = params.strenght;
		this.hp = params.hp;
		this.hp_max = params.hp_max;
		this.map = params.map;
		return this;
	},
	damage: function(player){
		var power = player.getAttack() - (this.defense / 2);
		var variance = 15;
		var damage = player.strenght + (variance + Math.floor(Math.random() * 
			Math.round(variance/3)) * (Math.random() > .5? -1:1));
		this.changeHp(-damage);
		return damage;
	},
	changeHp: function(num){
		var hp = this.hp;
		hp += num;
		if(hp > this.hp_max){
			hp = this.hp_max;
		}else if( hp < 0){
			hp = 0;
		}
		this.hp = hp;
	},
	changeDetectionState: function(name){
		this.detection_area.state = name;
	},
	isDetectionState: function(name){
		return this.detection_area.state == name;
	},
	detection: function(player){
		var area = this.detection_area.size;
		if(player.x >= this.x - area && player.x <= this.x + area &&
			player.y >= this.y - area && player.y <= this.y + area){
			if(!this.isDetectionState("reaction")){
				this.changeDetectionState("detect");
			}
			return true;
		}
		else{
			this.changeDetectionState("notDetect");
			this.state = "";
		}
		return false;
	},
	reaction: function(player, callbacks){
		
		if(this.detection(player) && this.isDetectionState("detect")){		
			this.changeDetectionState("reaction");

			if(player.hp * 100 / player.hp_max < 10){
				this.state = "mid-aggressive";
			}
			else if(player.getAttack() <= this.attack){
				this.state = "aggressive";
			}
			else{
				this.state = "attack";
			}
		}
		//corriger ici
		if(player.x < this.x) this.dir = "left";
		if(player.x > this.x) this.dir = "right";
		if(player.y < this.y) this.dir = "up";
		if(player.y > this.y) this.dir = "bottom";

		if(callbacks[this.state]) callbacks[this.state].call(this, this.dir);
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
			this.x = x;
			this.y = y;
		}
	},
	moveClear: function(){
		this.a = 0;
		this.d = 1;
	},
	decelerationXUpdate: function(dir){
		var dir = dir;

		if (dir){
			this.d -= .1;
			if(this.d <= 0){
				this.d = 0;
				this.dir = false;
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
				console.log(dir);
				this.y = y;
				this.x = x;
			}
		}
		return this.x;
	},
	decelerationYUpdate: function(dir){
		var dir = dir;
		if (dir){
			this.d -= .01;
			if(this.d <= 0){
				this.d = 0;
				this.dir = false;
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
				this.y = y;
			}
		}
		return this.y;
	},
	setDeceleration: function(dir){
		this.dece_dir = dir;
	}
}).extend("Game_Entity");