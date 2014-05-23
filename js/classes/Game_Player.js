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
	dir: "bottom",
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
	defense: 5,
	exp:[0,0,25,65,127,215,337,499,709,974,1302],
	items:[],
	hp: 500,
	hp_max: 500,
	fire: false,
	initialize: function(id, width, height, x, y, map){
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.map = map;
		//setHp
	},
	addItemGun: function(scene, stage, data){
		var item = Class.new("Item_Gun", [data.id, data.used, data.price, data.description, data.name, data.hp, data.capacity]).setParams(data);
		scene.items = scene.createElement();
		scene.sprites_items[data.id] = Class.new("Sprite_Items", [data.id, scene, stage, 10, 432.5, 45 , 45, "pistol"]);
		scene.items.append(scene.sprites_items[data.id].el);
		stage.append(scene.items);

		this.items.push(item);
		return this.items[data.id];
	},
	damage: function(ennemy){
		var power = ennemy.getAttack() - (this.defense / 2);
		var variance = 15;
		var damage = ennemy.strenght + (variance + Math.floor(Math.random() * 
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
	setLevel: function(level){
		this.level = level;
	},
	getAttack: function(){
		return this.attack[this.level];
	},
	pointIsPassable: function (sprite,player){
	/*Gestion de la collision pour un ennemie*/
		if(	//Border Top Left
			(sprite.x < player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width < player.x + player.width &&
			sprite.y < player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height < player.y + player.height) ||

			//Top
			(sprite.x == player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width == player.x + player.width &&
			sprite.y < player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height < player.y + player.height) ||

			//Border Top Right
			(sprite.x > player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width > player.x + player.width &&
			sprite.y < player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height < player.y + player.height) ||

			//Left
			(sprite.x < player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width < player.x + player.width &&
			sprite.y == player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height == player.y + player.height) ||

			//Border Bottom Left
			(sprite.x < player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width < player.x + player.width &&
			sprite.y > player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height > player.y + player.height) ||

			//Bottom
			(sprite.x == player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width == player.x + player.width &&
			sprite.y > player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height > player.y + player.height) ||

			//Border Bottom Right
			(sprite.x > player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width > player.x + player.width &&
			sprite.y > player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height > player.y + player.height) ||

			//Right
			(sprite.x > player.x &&
			sprite.x + sprite.width > player.x &&
			sprite.x < player.x + player.width &&
			sprite.x + sprite.width > player.x + player.width &&
			sprite.y == player.y &&
			sprite.y + sprite.height > player.y &&
			sprite.y < player.y + player.height &&
			sprite.y + sprite.height == player.y + player.height)
			){
			return false;
		}
		return true;
	},
	moveClear: function(){
		this.a = 0;
		this.d = 1;
	},
	move: function(dir){
		var x = this.x;
		var y = this.y;
		this.dir = dir,
		this.a += .02;

		if(this.a >= 1){
			this.a =1;
		}
		var speed = this.speed * this.a;
		
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
	setDeceleration: function(dir){
		this.dece_dir = dir;
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
				this.x = x;
			}
		}
		return this.x;
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
				this.y = y;
			}
		}
		return this.y;
	}

});