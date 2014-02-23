canvas.Scene.new({
	name: "startGame",
	materials: {
		images: {
			tileset:"img/sd/tileset/tileset.gif",
			playerSprite:"img/sd/sprite/player.png",
			playerBottomFix:"img/sd/sprite/playerfixbottom.png"
		},
		sounds:{
			
		}
	},
	sprites: {},
	ennemies: {},
	addEnnemy: function(id, layer, data){
		this.ennemies[id] = this.game_map.addEntity(id, data).setParams(data);
		this.sprites[id] = Class.new("Sprite_Ennemies", [id, this, layer, data]);
	},
	pressEnnemies: function(stage){
		var self = this, damage;
		canvas.Input.press(Input.Enter, function(){
			for(var id in self.ennemies){
				if(self.ennemies[id].isHit()){
					damage = self.ennemies[id].damage(self.game_player);
					self.displayDamage(damage, self.sprite[id].el);
					if(self.sprite[id].hit(damage)){
						self.deleteEnnemy[id];
					}
				}
			}
		});
	},
	deleteEnnemy: function(id){
		this.game_map.removeEntity(id);
		delete this.ennemies[id];
		delete this.sprites[id];
	},
	displayDamage: function(text_damage, sprite){
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
	ready: function(stage) {
		var self = this;
		var tiled = canvas.Tiled.new();

		tiled.load(this, stage, "data/level_1.json");
		tiled.ready(function() {
			var tile_w = this.getTileWidth();
			var tile_h = this.getTileHeight();
			var layer_event;

			self.game_map = Class.new("Game_Map", [this]);
			self.game_player = Class.new("Game_Player", ["player",64,64,10 * tile_w, 10 * tile_h, self.game_map]);
			self.player = self.createElement();
			self.player.drawImage("playerBottomFix");
			self.player.x = self.game_player.x;
			self.player.y = self.game_player.y;
			layer_event = this.getLayerObject();

			self.addEnnemy(1, layer_event,{
				x: 10 * tile_w,
				y: 5 * tile_h,
				width: 64,
				heigth: 64,
				attack: 10,
				defense: 5,
				strength: 10,
				hp_max: 100
			});
			stage.append(self.player);//affiche le joueur
			

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

			canvas.Input.keyDown(Input.Right, function(){
				anim.play("right",true);
			});
			canvas.Input.keyDown(Input.Left, function(){
				anim.play("left",true);
			});
			canvas.Input.keyDown(Input.Up, function(){	
				anim.play("up",true);
			});
			canvas.Input.keyDown(Input.Bottom, function(){
				anim.play("bottom",true);	
			});
			canvas.Input.keyUp(Input.Right, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("right");
			});
			canvas.Input.keyUp(Input.Left, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("left");
			});
			canvas.Input.keyUp(Input.Up, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("up");
			});
			canvas.Input.keyUp(Input.Bottom, function(){
				anim.stop();
				//self.game_player.moveClear();
				self.game_player.setDeceleration("bottom");
			});
		});
		this.pressEnnemies(stage);
	
	},
	render: function(stage){
		if(!this.game_player){
			return;
		}
		
		var input={
			"left":[Input.Left,x],
			"right":[Input.Right,x],
			"up":[Input.Up,y],
			"bottom":[Input.Bottom,y]
		};
		for(var key in input){
			if(canvas.Input.isPressed(input[key][0])){
				this.player[input[key][1]] = this.game_player.move(key);
			}
		}
		this.scrolling.update();
	
		this.player.x = this.game_player.decelerationXUpdate();
		this.player.y = this.game_player.decelerationYUpdate();

		stage.refresh();
	}
	
	
});

