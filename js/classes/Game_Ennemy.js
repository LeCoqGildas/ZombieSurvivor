Class.create("Game_Ennemy", {
	map: null,
	dir: "",
	speed: 1,
	x: 0,
	y: 0,
	a: 0,//acceleration
	d: 0.1,//decélération
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
		if(player.x < this.x && player.y < this.y) this.dir = "leftUp";
		if(player.x < this.x && ((player.y-32) <= this.y || this.y >= (player.y+32))) this.dir = "left";
		if(player.x < this.x && player.y > this.y) this.dir = "leftBottom";

		if(player.x > this.x && player.y < this.y) this.dir = "rightUp";
		if(player.x > this.x && ((player.y-32) <= this.y || this.y >= (player.y+32))) this.dir = "right";
		if(player.x > this.x && player.y > this.y) this.dir = "rightBottom";

		if(player.y < this.y && player.x == this.x) this.dir = "up";
		if(player.y > this.y && player.x == this.x) this.dir = "bottom";

		if(callbacks[this.state]) callbacks[this.state].call(this, this.dir);
		//console.log(this.dir);
		//console.log(player.y +" "+ this.y);+ - 4
	},
	move: function(dir){
		this.dir = dir,
		this.a += 1;
		if(this.a >= 1){
			this.a =1;
		}
		var speed = this.speed * this.a;
		var x = this.x;
		var y = this.y;

		switch(dir){
			case "leftUp":
				x -= speed;
				y -= speed;
				break;
			case "left":
				x -= speed;
				break;
			case "leftBottom":
				x -= speed;
				y += speed;
				break;
			case "rightUp":
				x += speed;
				y -= speed;
				break;
			case "right":
				x += speed;
				break;
			case "rightBottom":
				x += speed;
				y += speed;
				break;
			case "up":
				y -= speed;
				break;
			case "bottom":
				y += speed;
				break;
		}
		if(this.map.isPassable(this.map,this, x, y)){
			//console.log("passable");
			this.x = x;
			this.y = y;

		}
		//this.x = x;
		//this.y = y;
	},
	moveClear: function(){
		this.a = 0;
		this.d = 1;
	},
	decelerationXUpdate: function(dir){
		var dir = dir;

		if (dir){
			var speed = this.speed;
			var y = this.y;
			var x = this.x;
			switch(dir){
				case "leftUp":
				x -= speed;
				y -= speed;
				break;
			case "left":
				x -= speed;
				break;
			case "leftBottom":
				x -= speed;
				y += speed;
				break;
			case "rightUp":
				x += speed;
				y -= speed;
				break;
			case "right":
				x += speed;
				break;
			case "rightBottom":
				x += speed;
				y += speed;
				break;
			case "up":
				y -= speed;
				break;
			case "bottom":
				y += speed;
				break;
			}
			if(this.map.isPassable(this.map,this, x, y)){
			//console.log("passable");
				this.x = x;
				this.y = y;

			}
			//this.y = y;
			//this.x = x;
		}
		return this.x;

	},
	decelerationYUpdate: function(dir){
		var dir = dir;
		if (dir){
			var speed = this.speed;
			var y = this.y;
			var x = this.x;
			switch(dir){
				case "leftUp":
				x -= speed;
				y -= speed;
				break;
			case "left":
				x -= speed;
				break;
			case "leftBottom":
				x -= speed;
				y += speed;
				break;
			case "rightUp":
				x += speed;
				y -= speed;
				break;
			case "right":
				x += speed;
				break;
			case "rightBottom":
				x += speed;
				y += speed;
				break;
			case "up":
				y -= speed;
				break;
			case "bottom":
				y += speed;
				break;
			}
			if(this.isPassable(this.map,this, x, y)){
				this.y = y;
			}
		}
		return this.y;

	},
	setDeceleration: function(dir){
		this.dir = dir;
	},
	isPassable: function(map, player, new_x, new_y){
			var ent;
			var self = this;

			if(new_x < 0 || (new_x + player.width) > map.map.getWidthPixel() || 
				new_y < 0 || (new_y + player.height) > map.map.getHeightPixel()){
				return false;
			}	
			var tile_w = map.map.getTileWidth();
			var tile_h = map.map.getTileHeight();

			
			function pointIsPassableInTile(x,y){
				var map_x = Math.floor(x / tile_w );
				var map_y = Math.floor(y / tile_h );
				var props = self.map.map.getTileProperties(null, map_x, map_y);
				for( var i = 0; i < props.length; i++){
					if(props[i] && props[i].passable == "0"){
						return false;
					}
				}
				return true;
			}

			if ( !pointIsPassableInTile(new_x, new_y) 
				|| !pointIsPassableInTile(new_x + player.width, new_y)
				|| !pointIsPassableInTile(new_x , new_y + player.height)
				|| !pointIsPassableInTile(new_x + player.width, new_y + player.height)){
				return false;
			}
			//return true;

			function pointIsPassable(ent, x, y){
				if(x >= ent.x && x <= ent.x + ent.width && y >= ent.y && y <= ent.y + ent.height){
					ent.hit(true);//ref game_entity
					return false;
				}
				ent.hit(false);
				return true;
			}

			/*for(var i = 0; i < map.entities.length; i++){
				ent = map.entities[i];
				if ( !pointIsPassable(ent, new_x, new_y) 
					|| !pointIsPassable(ent, new_x +player.width, new_y)
					|| !pointIsPassable(ent, new_x , new_y + player.height)
					|| !pointIsPassable(ent, new_x + player.width, new_y + player.height)){
					//non traversable
					return false;
				}
			}*/
			
			return true;
		}
}).extend("Game_Entity");