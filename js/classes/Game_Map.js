Class.create("Game_Map", {
		map: null,
		entities:[],
		initialize: function(map, scene, stage){
			this.map = map;
			this.scene = scene;
			this.stage = stage;
		},
		addEntity: function(id, data){
			var entity = Class.new("Game_Ennemy", [id, data.x, data.y, data.width, data.height]);
			this.entities.push(entity);
			return this.entities[id];
		},
		removeEntity: function(id){
			for(var i=0; i < this.entities.length; i++){
				if(this.entities[i].id == id){
					this.entities.splice(i,1);
					return true;
				}
			}
		},
		isPassable: function(player, new_x, new_y){
			var ent;
			var self = this;

			if(new_x < 0 || (new_x + player.width) > this.map.getWidthPixel() || 
				new_y < 0 || (new_y + player.height) > this.map.getHeightPixel()){
				return false;
			}	
			var tile_w = this.map.getTileWidth();
			var tile_h = this.map.getTileHeight();

			
			function pointIsPassableInTile(x,y){
				var map_x = Math.floor(x / tile_w );
				var map_y = Math.floor(y / tile_h );
				var props = self.map.getTileProperties(null, map_x, map_y);
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

			function pointIsPassable(ent, x, y){
				if(ent){
					if( x >= ent.x && 
						x <= ent.x + ent.width && 
						y >= ent.y && 
						y <= ent.y + ent.height){

						ent.hit(true);//ref game_entity
						//console.log(ent.name+" vous touche");
						if(ent && ent.__name__ && ent.__name__=="Game_Ennemy"){

							if (ent.enCombat == false ){
								var damage = player.damage(ent);

								ent.enCombat = true;
								console.log("attaque");
								ent.attaquer = setTimeout(function(){
									console.log(ent.name+" attaque: -"+damage+"hp");
									self.scene._displayDamage(damage, self.scene.player);
									if(self.scene.hit(damage, self.stage)){
										console.log("PERDU!");
									}
									ent.enCombat = false;
								},1300);
							}	
						}
						return false;
					}
					ent.hit(false);
					ent.enCombat = false;

					return true;
				}
			}

			for(var i = 0; i < this.entities.length; i++){
				ent = this.entities[i];

				if( //Border Top Left
					(player.x < ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width < ent.x + ent.width &&
					player.y < ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height < ent.y + ent.height) ||

					//Top
					(player.x == ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width == ent.x + ent.width &&
					player.y < ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height < ent.y + ent.height) ||

					//Border Top Right
					(player.x > ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width > ent.x + ent.width &&
					player.y < ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height < ent.y + ent.height) ||

					//Left
					(player.x < ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width < ent.x + ent.width &&
					player.y == ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height == ent.y + ent.height) ||

					//Border Bottom Left
					(player.x < ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width < ent.x + ent.width &&
					player.y > ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height > ent.y + ent.height) ||

					//Bottom
					(player.x == ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width == ent.x + ent.width &&
					player.y > ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height > ent.y + ent.height) ||

					//Border Bottom Right
					(player.x > ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width > ent.x + ent.width &&
					player.y > ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height > ent.y + ent.height) ||

					//Right
					(player.x > ent.x &&
					player.x + player.width > ent.x &&
					player.x < ent.x + ent.width &&
					player.x + player.width > ent.x + ent.width &&
					player.y == ent.y &&
					player.y + player.height > ent.y &&
					player.y < ent.y + ent.height &&
					player.y + player.height == ent.y + ent.height)

				){
					ent.hit(true);//ref game_entity

					if(ent && ent.__name__ && ent.__name__=="Game_Ennemy"){
						if (ent.enCombat == false ){
							var damage = player.damage(ent);
							ent.enCombat = true;
							ent.attaquer = setTimeout(function(){
								console.log(ent.name+" attaque: -"+damage+"hp");
								self.scene._displayDamage(damage, self.scene.player);
								if(self.scene.hit(damage, self.stage)){
									console.log("PERDU!");
								}
								ent.enCombat = false;
							},1300);
						}	
					}
					return false;
				}
				ent.hit(false);
				ent.enCombat = false;
			}
			return true;
		}
});
