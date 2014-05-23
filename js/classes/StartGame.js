canvas.Scene.new({
	name: "startGame",
	materials: {
		images: {
			tileset:"img/sd/tileset/tileset.gif",
			playerSprite:"img/sd/sprite/player.png",
			playerBottomFix:"img/sd/sprite/playerfixbottom.png",
			box:"img/sd/box/messageBox.png"
		},
		sounds:{
		}
	},
	sprites_items: {},
	sprites: {},
	ennemies: {},
	bullets_sprite: {},
	bullets: {},
	width_bar: 80,
	NB_ENNEMY: 5,
	createPlayer: function(stage, tile_w, tile_h){
		//Creation du joueur
		var name = "Player";
		this.game_player = Class.new("Game_Player", ["player" ,64 ,64 ,6 * tile_w, 3 * tile_h, this.game_map]);
		this.game_player.setLevel(1);
		this.player = this.createElement();
		this.player.drawImage("playerBottomFix");
		this.player.x = this.game_player.x;
		this.player.y = this.game_player.y;
		this._displayBar();//barre de vie
		this._displayName(this.player, name);//nom du joueur
		stage.append(this.player);//affiche le joueur
	},
	createEnnemies: function(n, layer_event){
		console.log("Creation de "+n+" ennemies...");
		console.log("_____________________________________");
		for( var i = 0; i < n; i++){
			this.addEnnemy(i, layer_event,{
				name: "zombie_"+i,
				x: Math.floor((Math.random() * this.game_map.map.width)+1) * this.game_map.map.tile_w,
				y: Math.floor((Math.random() * this.game_map.map.height)+1) * this.game_map.map.tile_h,
				width: 64,
				height: 64,
				speed: 0.5,
				attack: 1,
				defense: 5,
				strenght: 1,
				hp: 400,
				hp_max: 400,
				map: this.game_map,
			});
		}
	},
	createItems: function(stage, layer, data){
		var self = this;

		this.game_player.addItemGun(self, stage,{
			id: data.id,
			used: data.used,
			price: data.price,
			description: data.description,
			name: data.name,
			hp: data.hp,
			layer: layer,
			speed: data.speed,
			capacity: data.capacity,
		});
	},
	useItem: function(stage,item){
		var self = this;
		canvas.Input.press(Input.A, function(){
			item.fire(self);
		});
	},
	addEnnemy: function(id, layer, data){
	/*Ajout d'un énnemie sur la carte*/
		this.ennemies[id] = this.game_map.addEntity(id, data).setParams(data);
		this.sprites[id] = Class.new("Sprite_Ennemies", [id, this, layer, data]);
		console.log("Apparition de "+this.ennemies[id].name);
	},
	pressEnnemies: function(stage){
	/*Gestion de l'attaque du joueur contre un ennemie s'il presse ENTER*/
		var self = this;
		var damage;
		canvas.Input.press(Input.Enter, function(){
			for(var id in self.ennemies){
				if(self.ennemies[id].isHit()){
					damage = self.ennemies[id].damage(self.game_player);
					self._displayDamage(damage, self.sprites[id].el);
					if(self.sprites[id].hit(damage)){
						self.deleteEnnemy(id);
					}
				}
			}
		});
	},
	deleteEnnemy: function(id){
	/*Suppretion d'un énnemie (Generer aléatoirement des ennemies)*/
		console.log(this.ennemies[id].name+" est mort");
		clearTimeout(this.ennemies[id].attaquer);
		this.game_map.removeEntity(id);

		delete this.ennemies[id];
		delete this.sprites[id];

		this.displayScore(Object.keys(this.ennemies).length+" ennemies!");
		this.testVictoire();

		/*var layer_event = this.game_map.map.getLayerObject();
		this.addEnnemy(id, layer_event,{
				name: "zombie_"+id,
				x: Math.floor((Math.random() * 20)+1) * this.game_map.map.tile_w,
				y: Math.floor((Math.random() * 20)+1) * this.game_map.map.tile_h,
				width: 64,
				height: 64,
				speed: 0.5,
				attack: 10,
				defense: 5,
				strength: 10,
				hp: 100,
				hp_max: 100,
				map: this.game_map,
		});*/
	},
	menu: function(stage){
	/*Apparition du menu*/
		var _canvas = this.getCanvas();
		var self = this;
		this.menu = this.createElement();
		var items_bar = this.createElement();
		var item_1 = this.createElement();
		var item_2 = this.createElement();
		var item_3 = this.createElement();
		var item_4 = this.createElement();
		var item_5 = this.createElement();
		var text = this.createElement();


		//menu.drawImage("box", 0, 0);
		this.menu.fillStyle = "rgba(0,0,0,.6)";
		this.menu.fillRect(0, 0, 200, 30);
		this.menu.strokeStyle = "red";
		this.menu.strokeRect(0, 0, 200, 30);

		text.font = 'normal 15px Arial';
		text.fillStyle = '#FFF';
		text.fillText("Inventory", 10, 430);

		items_bar.fillStyle = "rgba(0,0,0,.8)";
		items_bar.fillRect(0, 415, 285, 80);
		items_bar.strokeStyle = "red";
		items_bar.strokeRect(0, 415, 285, 80);

		item_1.fillStyle = "rgba(255,0,0,.3)";
		item_1.fillRect(10, 432.5, 45, 45);
		item_1.strokeStyle = "red";
		item_1.strokeRect(10, 432.5, 45, 45);

		item_2.fillStyle = "rgba(255,0,0,.3";
		item_2.fillRect(65, 432.5, 45, 45);
		item_2.strokeStyle = "red";
		item_2.strokeRect(65, 432.5, 45, 45);

		item_3.fillStyle = "rgba(255,0,0,.3";
		item_3.fillRect(120, 432.5, 45, 45);
		item_3.strokeStyle = "red";
		item_3.strokeRect(120, 432.5, 45, 45);

		item_4.fillStyle = "rgba(255,0,0,.3";
		item_4.fillRect(175, 432.5, 45, 45);
		item_4.strokeStyle = "red";
		item_4.strokeRect(175, 432.5, 45, 45);

		item_5.fillStyle = "rgba(255,0,0,.3";
		item_5.fillRect(230, 432.5, 45, 45);
		item_5.strokeStyle = "red";
		item_5.strokeRect(230, 432.5, 45, 45);

		this.menu.append(items_bar);
		this.menu.append(text);
		this.menu.append(item_1);
		this.menu.append(item_2);
		this.menu.append(item_3);
		this.menu.append(item_4);
		this.menu.append(item_5);

		stage.append(this.menu);
	},
	score: function(stage){
	/*Initialisation du score*/
		this.score = this.createElement();
		this.score.font = 'bold 14px Arial';
		this.score.fillStyle = '#FFF';
		this.score.x = 5;
		this.score.y = 5;
		stage.append(this.score);

		this.displayScore(Object.keys(this.ennemies).length+" ennemies!");
	},
	displayScore: function(text){
	/*Changement du score*/
		this.score.fillText(text, 10, 20);
	},
	totalBullet: function(stage){
	/*Initialisation du nombre de balles*/
		this.totalBullet = this.createElement();
		this.totalBullet.font = 'bold 14px Arial';
		this.totalBullet.fillStyle = '#FFF';
		this.totalBullet.x = 80;
		this.totalBullet.y = 430;
		stage.append(this.totalBullet);

		this._displayTotalBullet(this.game_player.items[0].capacity - this.game_player.items[0].used+"/"+this.game_player.items[0].capacity+" bullets");
	},
	_displayTotalBullet: function(text){
	/*Changement du nombre de balles*/
		this.totalBullet.fillText(text, 80, 430);
	},
	testVictoire: function(){
	/*Verification pour déterminer une potentiel victoire*/
		if(Object.keys(this.ennemies).length == 0){
			console.log("_____________________________________");
			console.log("______________VICTOIRE!______________");
			this.displayScore("VICTOIRE!");
		}
	},
	openDialog: function(stage, msg){
	/*Gestion des messages (trouver un moyen de centrer avec le scrool)*/
		console.log("Dialogue:"+msg);

		var _canvas = this.getCanvas();
		var self = this;
		var dialog = this.createElement();
		var text = this.createElement();

		//dialog.drawImage("box", 0, 0);
		dialog.fillStyle = "rgba(0,0,0,.8)";
		dialog.fillRect(0, 0, 500, 100);
		dialog.strokeStyle = "red";
		dialog.strokeRect(0, 0, 500, 100);

		text.font = 'normal 15px Arial';
		text.fillStyle = '#FFF';
		text.fillText(msg, 20, 30);

		dialog.append(text);
		stage.append(dialog);

		/*this.scrolling.addScroll({
			element: dialog,
		});*/

		//dialog.x = _canvas.width/2 - dialog.img.width/2;
		//dialog.y = _canvas.height - dialog.img.height - 10;
		dialog.x = self.player.x - 217;
		dialog.y = self.player.y ;

		stage.refresh();
		this.pause = true;
		stage.refresh();

		canvas.Input.press(Input.Space, function() {
			self.pause = false;
			dialog.remove();
		});
	},
	_displayDamage: function(text_damage, sprite){
	/*Affichage des dégats*/
		var text = this.createElement();
		text.font= 'bold 15px Arial';
		text.fillStyle = '#FFF';
		text.textBaseline = 'middle';
		text.fillText(text_damage, 0, 0);
		text.strokeStyle = '#000';
		text.strokeText(text_damage, 0,0);
		sprite.append(text);

		canvas.Timeline.new(text)
			.add({y: -30, opacity: -1}, 40, Ease.easeOutQuint)
			.call(function(){
				this.remove();
			});
	},
	_displayBar: function(){
	/*Barre de vie du player*/
		this.bar = this.createElement();
		this.bar.fillStyle = "blue";
		this.bar.fillRect(-8, -8, this.width_bar, 7);
		this.bar.strokeStyle = "black";
		this.bar.strokeRect(-8, -8, this.width_bar, 7);
		this.player.append(this.bar);
	},
	_displayName: function(sprite, name){
	/*Nom du player*/
		var text = this.createElement();
		text.font= 'bold 18px Arial';
		text.fillStyle = '#FFF';
		text.textBaseline = 'middle';
		text.fillText(name, 0, -20);
		text.strokeStyle = '#000';
		text.strokeText(name, 0,-20);
		sprite.append(text);
	},
	hit: function(damage){
	/*Flash rouge*/
		var _canvas = this.getCanvas();
		var effect = this.createElement();
			effect.fillStyle = "red";
			effect.globalCompositeOperation = "lighter";
			effect.opacity = 0.5;
			effect.fillRect(-_canvas.width,-_canvas.height, _canvas.width*2, _canvas.height*2);
			this.player.append(effect);

			canvas.Timeline.new(effect)
			.to({opacity:"0"},10)
			.call(function(){
				this.remove();
			});
	/*Gestion des dégats ennemie*/
		this.game_player.hp -= damage;
		if( this.game_player.hp < 0){
			//annim
			this.player.remove();
			//musique défaite
			canvas.Sound.fadeOut("background_sound",30);
			canvas.Scene.call("Game_Over");		
		}
		var width = this.width_bar * this.game_player.hp / this.game_player.hp_max;
		this.bar.fillRect(-8, -8, width, 7);

		return false;
	},
	useItem: function(stage, item){
		self = this;
		canvas.Input.press(Input.A, function(){
			item.fire(self, stage);
		});
	},
	ready: function(stage) {
		var self = this;
		var tiled = canvas.Tiled.new();
		
		tiled.load(this, stage, "data/level_1.json");
		tiled.ready(function() {
			var tile_w = this.getTileWidth();
			var tile_h = this.getTileHeight();
			var layer_event;
			layer_event = this.getLayerObject();

			//Creation de la carte
			self.game_map = Class.new("Game_Map", [this,self, stage]);//(ajout de la self)
			//Creation du joueur
			self.createPlayer(stage, tile_w, tile_h);	
			//Creation des ennemis
			self.createEnnemies(self.NB_ENNEMY, layer_event);
			self.menu(stage);
			//Creation du score
			self.score(stage);


			/*id:0 = item 1
			  id:1 = item 2
			  id:2 = item 3
			  id:3 = item 4
			  id:4 = item 5*/
			//Item
			self.createItems(stage, layer_event,{
				id: 0,
				used: 0,
				price: 100,
				description: "weapon gun",
				name: "gun",
				hp: 10,
				speed: 800,
				capacity: 5,
			});
			self.useItem(stage, self.game_player.items[0]);
			if(self.game_player.items[0].__name__ == "Item_Gun"){
				self.totalBullet(stage);
			}
			

			//Gestion du scrool
			self.scrolling = canvas.Scrolling.new(self, tile_w, tile_h);
			self.scrolling.setMainElement(self.player);
			var map = self.scrolling.addScroll({
				element: this.el, //element décor
				speed: 7,//vitesse de defilement
				block: true, //ne défile plus si les extremite touche le bord du canvas
				width: this.getWidthPixel(),
				height: this.getHeightPixel()
			});
			self.scrolling.setScreen(map);
			//fixe le score sur l'écran
			self.scrolling.addScroll({
				element: self.score,
			});
			self.scrolling.addScroll({
				element: self.menu,
			});

			if(self.dialog){
				self.scrolling.addScroll({
					element: self.dialog,
				});
			}

			if(self.items){
				self.scrolling.addScroll({
					element: self.items,
				});
			}

			self.scrolling.addScroll({
				element: self.totalBullet,
			});
			

			//Creation de la boite de dialog
			self.openDialog(stage,"Hello on my game! press <<ESPACE>> for start game!");

			canvas.Input.keyDown(Input.Q, function(){
				if(!self.pause){
					self.openDialog(stage, "Pause, press << espace >> for continue");
				}
				
			});

			//Annimation du joueur
			var anim = canvas.Animation.new({
				images:"playerSprite",
				animations:{
					bottom:{
						frames: [0,2],
						size:{
							width: 64,
							height: 64,
						},
						frequence: 6
					},
					left:{
						frames: [3,5],
						size:{
							width: 64,
							height: 64,
						},
						frequence: 6
					},
					right:{
						frames: [6,8],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					},
					up:{
						frames: [9,11],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					}	
				}
			});
			anim.add(self.player);

			

			//Association des touches avec les animations
			canvas.Input.keyDown(Input.Right, function(){
				//anim.stop();
				anim.play("right",true);
			});
			canvas.Input.keyDown(Input.Left, function(){
				//anim.stop();
				anim.play("left",true);
			});
			canvas.Input.keyDown(Input.Up, function(){	
				//anim.stop();
				anim.play("up",true);
			});
			canvas.Input.keyDown(Input.Bottom, function(){
				//anim.stop();
				anim.play("bottom",true);	
			});


			canvas.Input.keyUp(Input.Right, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("right");

				//si deux touches sont appuyé permet de jouer une annimation
				if(canvas.Input.isPressed(Input.Left))anim.play("left",true);
				else if(canvas.Input.isPressed(Input.Up))anim.play("up",true);
				else if(canvas.Input.isPressed(Input.Bottom))anim.play("bottom",true);
			});
			canvas.Input.keyUp(Input.Left, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("left");

				if(canvas.Input.isPressed(Input.Right))anim.play("right",true);
				else if(canvas.Input.isPressed(Input.Up))anim.play("up",true);
				else if(canvas.Input.isPressed(Input.Bottom))anim.play("bottom",true);
			});
			canvas.Input.keyUp(Input.Up, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("up");

				if(canvas.Input.isPressed(Input.Right))anim.play("right",true);
				else if(canvas.Input.isPressed(Input.Left))anim.play("left",true);
				else if(canvas.Input.isPressed(Input.Bottom))anim.play("bottom",true);
			});
			canvas.Input.keyUp(Input.Bottom, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("bottom");

				if(canvas.Input.isPressed(Input.Right))anim.play("right",true);
				else if(canvas.Input.isPressed(Input.Up))anim.play("up",true);
				else if(canvas.Input.isPressed(Input.Left))anim.play("left",true);
			});

			

			self.pressEnnemies(stage);
		});//Tile
		
	},
	render: function(stage){
		var self = this;

		if(!this.game_player){
			//Tant que le joueur n'est pas creer on attend
			return;
		}
		if(this.pause){
			//Si le jeux est en pause on attend
			//seule la boite de dialog se raffraichit
			stage.refresh();
			return;
		}
		//Déclaration des touches claviers
		var input={
			"left":[Input.Left,x],
			"right":[Input.Right,x],
			"up":[Input.Up,y],
			"bottom":[Input.Bottom,y]
		};
		//Mise en écoute de chaque touches
		for(var key in input){
			if(canvas.Input.isPressed(input[key][0])){
				this.player[input[key][1]] = this.game_player.move(key);
			}
		}
		this.scrolling.update();
		//console.log(((this.player.x / this.game_map.map.getTileWidth()) % 3));
		this.player.x = this.game_player.decelerationXUpdate();
		this.player.y = this.game_player.decelerationYUpdate();

		/*Mouvements des tirs*/
		for(var id in self.bullets){
			var bullet = self.bullets[id];
			var sprite = self.bullets_sprite[id];
				if(bullet.dir == "left" || bullet.dir == "right"){
					sprite.el.x = bullet.moveBulletX(bullet.dir);
					sprite.el.y = bullet.y;

					for(var id in self.ennemies){
						var ennemy = self.ennemies[id];
						var sprite_ennemy = self.sprites[id];

						if(!sprite.pointIsPassable(sprite.el, ennemy, sprite_ennemy)){
							self.game_player.items[0].deleteBullet(self,bullet.id);
						}
					}
				}
				if(bullet.dir == "up" || bullet.dir == "bottom"){
					sprite.el.x = bullet.x;
					sprite.el.y = bullet.moveBulletY(bullet.dir);

					for(var id in self.ennemies){
						var ennemy = self.ennemies[id];
						var sprite_ennemy = self.sprites[id];

						if(!sprite.pointIsPassable(sprite.el, ennemy, sprite_ennemy)){
							self.game_player.items[0].deleteBullet(self,bullet.id);
						}
					}
				}
		}


		//Mouvements de l'énnemie
		for(var id in self.ennemies){
			var ennemy = self.ennemies[id];

			var sprite = self.sprites[id];
			var animDir = null;
			ennemy.reaction(this.game_player, {
				"aggressive": function(dir){
					//console.log("agressive");
					if(dir != animDir){
						sprite.animZombie(dir);
						animDir=dir;
					}
					
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.x = ennemy.decelerationXUpdate(dir);
					}
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.y = ennemy.decelerationYUpdate(dir);
					}
					//active les dégats constant s'il y à une collision
					if(!self.game_player.pointIsPassable(self.game_player,sprite.el)){
						self.game_map.isPassable(self.game_player, self.player.x,self.player.y);
					}
				},
				"mid-aggressive": function(dir){
					//console.log("mid-agressive");
					if(dir != animDir){
						sprite.animZombie(dir);
						animDir=dir;
					}
					
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.x = ennemy.decelerationXUpdate(dir);
					}
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.y = ennemy.decelerationYUpdate(dir);
					}
					//active les dégats constant s'il y à une collision
					if(!self.game_player.pointIsPassable(self.game_player,sprite.el)){
						self.game_map.isPassable(self.game_player, self.player.x,self.player.y);
					}
				},
				"attack": function(dir){
					if(dir != animDir){
						sprite.animZombie(dir);
						animDir=dir;
					}
					
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.x = ennemy.decelerationXUpdate(dir);
					}
					if(self.game_player.pointIsPassable(self.game_player,sprite.el)){
						sprite.el.y = ennemy.decelerationYUpdate(dir);
					}
					//active les dégats constant s'il y à une collision
					if(!self.game_player.pointIsPassable(self.game_player,sprite.el)){
						self.game_map.isPassable(self.game_player, self.player.x,self.player.y);
					}
				}
			});
			if(ennemy && ennemy.detection_area.state == "notDetect"){
				sprite.anim.stop();
			}	
		}
		
		stage.refresh();
	}
	
});

