Class.create("Item_Gun", {
	materials: {
		sounds:{
		}
	},
	setParams: function(params){
		this.id = params.id;
		this.used = params.used;
		this.capacity = params.capacity;
		this.price = params.price;
		this.description = params.description;
		this.name = params.name;
		this.hp = params.hp;
		this.layer = params.layer;
		this.speed = params.speed;
		return this;
	},
	fire: function(scene){
		var self = this;
	//Gestion du tire avec une arme à feu
		if(scene.game_player.fire == false && (self.capacity - self.used) >0){
			var temps = setTimeout(function(){
				scene.game_player.fire = false;
			},self.speed);
			var damage;
			this.use();
			this.addBullet(scene, scene.game_player.dir);
			scene.game_player.fire = true;
			scene._displayTotalBullet(scene.game_player.items[0].capacity - scene.game_player.items[0].used+"/"+scene.game_player.items[0].capacity+" bullets");
		}
	},
	addBullet: function(scene, dir){
	/*Ajout d'une balle*/
		var self = this;
		//les balles ont un id mini de 2000 pour ne pas mélanger avec les monstres
		var id = 2000 + this.used -1;

		scene.bullets[id] = Class.new("Game_Entity", [id, scene.player.x + (scene.game_player.width / 2), scene.player.y + (scene.game_player.height / 2)],60,60);
		scene.bullets[id].speed = 20;
		scene.bullets[id].dir = dir;

		//la hauteur est plus grande pour garder les colisions
		scene.bullets_sprite[id] = Class.new("Sprite_Bullets", [id, scene, this.layer, scene.player.x, scene.player.y, 64 , 64, 50, 50]);

		var temps = setTimeout(function(){
			self.deleteBullet(scene,id)
		},5000);
		return scene.bullets[id];
	},
	deleteBullet: function(scene, id){
	/*Suppretion d'une balle*/
	if(scene.bullets[id]){
		delete scene.bullets[id];
		scene.bullets_sprite[id].el.remove();
		delete scene.bullets_sprite[id];
	}
		

	},
	
	
}).extend("Game_Item");