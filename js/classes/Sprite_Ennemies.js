Class.create("Sprite_Ennemies", {
	el: null,
	scene: null,
	hp: 0,
	hp_max: 0,
	width_bar: 60,
	initialize: function(id, scene, layer,data){
		this.scene = scene;
		this.el = scene.createElement(data.width, data.height);

		this.el.drawImage("zombie1", 0, 0, 64, 64, 0, 0, 64, 64);

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
	}
});