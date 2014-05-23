Class.create("Sprite_Bullets", {
	el: null,
	scene: null,
	anim: null,
	initialize: function(id, scene, layer, x, y, width, height, attack, strenght){
		this.scene = scene;
		this.el = scene.createElement(width, height);
		this.attack = attack;
		this.strenght = strenght;
		/*this.anim = canvas.Animation.new({
				images:"bullet",
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
		this.anim.add(this.el);*/

		//this.el.drawImage("bullet");

		this.setPosition(x,y);
		this._displayBullet();

		layer.append(this.el);
	},
	_displayBullet: function(){
		this.bullet = this.scene.createElement();
		this.bullet.fillStyle = "White";
		this.bullet.fillRect(0, 0, 5, 5);
		this.el.append(this.bullet);
	},
	setPosition: function(x, y){
		this.el.x = x;
		this.el.y = y;
	},
	hit: function(damage){
		console.log("hit");
	},
	getAttack: function(){
		return this.attack;
	},
	pointIsPassable: function(bullet, ent, sprite_ennemy){
		if( //Border Top Left
			(bullet.x < sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y < sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height < sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Top
			(bullet.x == sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width == sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y < sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height < sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Border Top Right
			(bullet.x > sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width > sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y < sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height < sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Left
			(bullet.x < sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y == sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height == sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Border Bottom Left
			(bullet.x < sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y > sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height > sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Bottom
			(bullet.x == sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width == sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y > sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height > sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Border Bottom Right
			(bullet.x > sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width > sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y > sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height > sprite_ennemy.el.y + sprite_ennemy.el.height) ||

			//Right
			(bullet.x > sprite_ennemy.el.x &&
			bullet.x + bullet.width > sprite_ennemy.el.x &&
			bullet.x < sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.x + bullet.width > sprite_ennemy.el.x + sprite_ennemy.el.width &&
			bullet.y == sprite_ennemy.el.y &&
			bullet.y + bullet.height > sprite_ennemy.el.y &&
			bullet.y < sprite_ennemy.el.y + sprite_ennemy.el.height &&
			bullet.y + bullet.height == sprite_ennemy.el.y + sprite_ennemy.el.height)
		){
			
			if(ent && ent.__name__ && ent.__name__=="Game_Ennemy"){
				var damage = ent.damage(this);
				this.scene._displayDamage(damage, sprite_ennemy.el);
				if(sprite_ennemy.hit(damage)){
					this.scene.deleteEnnemy(ent.id);
				}
			}
			return false;
		}
		return true;
		
		
	}
});