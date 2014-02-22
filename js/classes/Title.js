/*Title
/*******************************************************************************/
canvas.Scene.new({
	name: "Title",
	materials: {
		sounds:{
			background_sound:"sounds/title/fond.mp3",
		}
	},
	ready: function(stage){
		var self = this,
			buttons = {
				play : {
					height: 73,
					click: function() {
						//canvas.Scene.call("map");	
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
					this.drawImage("button_On", 0, pos, width, data_btn.height, 0, 0, width, data_btn.height);
				});
				btn.on("mouseout",function() {
					this.drawImage("button_Off", 0, pos, width, data_btn.height, 0, 0, width, data_btn.height);
				});			
				stage.append(btn);
		}
		
		var music = canvas.Sound.get("background_sound");
		music.play();
	},
	render: function(stage){	
		stage.refresh();
	}
});