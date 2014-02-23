/*Title
/*******************************************************************************/
canvas.Scene.new({
	name: "Title",
	materials: {
		sounds:{
			background_sound:"sounds/title/fond.mp3",
			button_on_sound:"sounds/title/button_on.mp3",
			button_off_sound:"sounds/title/button_off.mp3",
		}
	},
	ready: function(stage){
		var music = canvas.Sound.get("background_sound");
		var music_on_sound = canvas.Sound.get("button_on_sound");
		var music_off_sound = canvas.Sound.get("button_off_sound");

		var self = this,
			buttons = {
				play : {
					height: 73,
					click: function() {
						canvas.Sound.fadeOut("background_sound",30);
						
						canvas.Scene.call("startGame");	
					}
				},
				option : {
					height: 73,
					click: function() {
						//canvas.Scene.call("joueur");
					}
				}
			};

		var fond = self.createElement();
		fond.drawImage("title_background", 0, 0);
		stage.append(fond);


		var pos = 0;
		for(var key in buttons){
			displayButton(buttons[key], pos);
			pos += buttons[key].height ;
		}

		function displayButton(data_btn, pos){
			var width = 200,
				btn = self.createElement(200,73);

				btn.drawImage("button_Off", 0, pos, width, data_btn.height, 0, 0, width, data_btn.height);
				btn.x = 325;
				btn.y = pos + 180;
				
				btn.on("click", data_btn.click);
				btn.on("mouseover",function() {
					music_on_sound.play();
					var _canvas = self.getCanvas(),
							effect = self.createElement();
						effect.fillStyle = "white";
						effect.globalCompositeOperation = "lighter";
						effect.opacity = 0.5;
						effect.fillRect(0,0,_canvas.width, _canvas.height);
						stage.append(effect);

						canvas.Timeline.new(effect)
						.to({opacity:"0"},10)
						.call(function(){
							this.remove();
						});
					this.drawImage("button_On", 0, pos, width, data_btn.height, 0, 0, width, data_btn.height);
				});
				btn.on("mouseout",function() {
					music_off_sound.play();	
					this.drawImage("button_Off", 0, pos, width, data_btn.height, 0, 0, width, data_btn.height);
				});			
				stage.append(btn);
		}
		music.play();
	},
	render: function(stage){	
		stage.refresh();
	}
});