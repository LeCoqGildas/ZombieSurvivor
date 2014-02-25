Class.create("Sprite_Ennemies", {
	el: null,
	scene: null,
	hp: 0,
	hp_max: 0,
	width_bar: 60,
	anim: null,
	initialize: function(id, scene, layer,data){
		this.scene = scene;
		this.el = scene.createElement(data.width, data.height);
		this.anim = canvas.Animation.new({
				images:"zombie",
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
						frames: [12,14],
						size:{
							width: 64,
							height: 64,
						},
						frequence: 6
					},
					right:{
						frames: [24,26],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					},
					up:{
						frames: [36,38],
						size:{
							width:64,
							height:64,
						},
						frequence: 6
					}	
				}
			});
		this.anim.add(this.el);

		this.el.drawImage("zombie1");

		this.setPosition(data.x,data.y);
		this.hp = this.hp_max = data.hp_max;
		this._displayBar();
		layer.append(this.el);
	},
	_displayBar: function(){
		this.bar = this.scene.createElement();

		this.bar.fillStyle = "red";
		this.bar.fillRect(2, -5, this.width_bar, 5);

		this.bar.strokeStyle = "black";
		this.bar.strokeRect(2, -5, this.width_bar, 5);

		this.el.append(this.bar);

	},
	setPosition: function(x, y){
		this.el.x = x;
		this.el.y = y;
	},
	hit: function(damage){
		this.hp -= damage;
		if( this.hp < 0){
			//annim
			this.el.remove();
			return true;
		}
		var width = this.width_bar * this.hp / this.hp_max;
		this.bar.fillRect(2, -5, width, 5);
		return false;
	},
	animZombie: function(dir){
		switch(dir){
			case "leftUp":
				this.anim.play("up", true);
				break;
			case "left":
				this.anim.play("left", true);
				break;
			case "leftBottom":
				this.anim.play("bottom", true);
				break;
			case "rightUp":
				this.anim.play("up", true);
				break;
			case "right":
				this.anim.play("right", true);
				break;
			case "rightBottom":
				this.anim.play("bottom", true);
				break;
			case "up":
				this.anim.play("up", true);
				break;
			case "bottom":
				this.anim.play("bottom", true);
				break;
		}
						
		
		
	}
});