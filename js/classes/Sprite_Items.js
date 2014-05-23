Class.create("Sprite_Items", {
	el: null,
	scene: null,
	initialize: function(id, scene, stage, x, y, width, height, img){
		var self = this;
		this.scene = scene;
		this.el = scene.createElement(width, height);
		//il faut dessiner directement l'image à l'endroit voulue sur l'écran
		this.el.drawImage(img,x, y);
	}
});