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
	ready: function(stage) {
		var self = this;
		var tiled = canvas.Tiled.new();

		tiled.load(this, stage, "data/level_1.json");
		tiled.ready(function() {
			var tile_w = this.getTileWidth();
			var tile_h = this.getTileHeight();
			

			self.game_map = Class.new("Game_Map", [this]);
			self.game_player = Class.new("Game_Player", ["playerSprite",64,64,1 * tile_w, 8*tile_h, self.game_map]);

			self.player = self.createElement();
			self.player.drawImage("playerBottomFix");
			self.player.x = self.game_player.x;
			self.player.y = self.game_player.y;
			stage.append(self.player);//affiche le joueur
			

			self.scrolling = canvas.Scrolling.new(self, tile_w, tile_h);
			self.scrolling.setMainElement(self.player);
			
			var map = self.scrolling.addScroll({
				element: this.el, //element décor
				speed: 3,//vitesse de defilement
				block: true, //ne défile plus si les extremite touche le bord du canvas
				width: this.getWidthPixel(),
				height: this.getHeightPixel()
			});
			self.scrolling.setScreen(map);
		
			var anim_right = canvas.Animation.new({
				images:"playerSprite",
				animations:{
					right:{
						frames: [2,2],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					}
				}
			});
			var anim_left = canvas.Animation.new({
				images:"playerSprite",
				animations:{
					left:{
						frames: [1,2],
						size:{
							width: 64,
							height: 64,
						},
						frequence: 6
					}
				}
			});
			var anim_up = canvas.Animation.new({
				images:"playerSprite",
				animations:{
					up:{
						frames: [3,2],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					}
				}
			});
			var anim_bottom = canvas.Animation.new({
				images:"playerSprite",
				animations:{
					bottom:{
						frames: [0,2],
						size:{
							width: 64,
							height: 64,
						},
						frequence: 6
					}
				}
			});

			anim_left.add(self.player);
			anim_right.add(self.player);
			anim_up.add(self.player);
			anim_bottom.add(self.player);

			canvas.Input.keyDown(Input.Right, function(){
				//self.player
				anim_right.play("right",true);
			});

			canvas.Input.keyDown(Input.Left, function(){
				anim_left.play("left",true);
				
			});
			canvas.Input.keyDown(Input.Up, function(){
				//self.player
				anim_up.play("up",true);
			});

			canvas.Input.keyDown(Input.Bottom, function(){
				anim_bottom.play("bottom",true);
				
			});

			canvas.Input.keyUp(Input.Right, function(){
				anim_right.stop();
				self.game_player.moveClear();
				self.game_player.setDeceleration("right");
				//self.player.drawImage("player");
				
			});

			canvas.Input.keyUp(Input.Left, function(){
				anim_left.stop();
				self.game_player.moveClear();
				self.game_player.setDeceleration("left");
				//self.player.drawImage("player");
			});
			canvas.Input.keyUp(Input.Up, function(){
				anim_up.stop();
				self.game_player.moveClear();
				self.game_player.setDeceleration("up");
				//self.player.drawImage("player");
				
			});

			canvas.Input.keyUp(Input.Bottom, function(){
				anim_bottom.stop();
				self.game_player.moveClear();
				self.game_player.setDeceleration("Bottom");
				//self.player.drawImage("player");
			});
				
			/*canvas.Input.press(Input.Space, function(){	
				self.game_player.jump(true);
				//console.log("saut");
				//animation...
			});

			canvas.Input.keyUp(Input.Space, function(){	
				self.game_player.jump(false);
				//console.log("lacher saut");
				//animation...
			});*/

		});
	
	},
	render: function(stage){
		if(!this.game_player){
			return;
		}
		
		var input={
			"left":[Input.Left,x],
			"right":[Input.Right,x],
			"up":[Input.Up,y],
			"bottom":[Input.Bottom,y]/*,
			"space":Input.Space*/
		};
		/*for(var key in input){
			if(canvas.Input.isPressed(input[key][0])){
				this.player[input[key][1]] = this.game_player.move(key);
			}
		}*/
		/*if(canvas.Input.isPressed(Input.Space)){
			this.game_player.jumpUpdate();	
		}*/

		this.scrolling.update();
		//this.player.x = this.game_player.decelerationUpdate();
		//this.player.y = this.game_player.gravityUpdate();
		
		
		stage.refresh();
	}
	
	
});

