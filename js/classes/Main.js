/*Init scene*/

var canvas = CE.defines("canvas")
		.extend(Tiled)
		.extend(Spritesheet)
		.extend(Animation)
		.extend(Input)
		.extend(Scrolling)
		.ready(function() {
		canvas.Scene.call("Preload");

});

/*load
/************************************************************************/
canvas.Scene.new({
	name: "Preload",
	materials: {
		images: {
			background_preload: "img/sd/preload/background.jpeg",
			bar_empty: "img/sd/preload/empty.png",
			bar_full: "img/sd/preload/full.png"			
		}
	},
	ready: function(stage) {
		var self = this,
		el = this.createElement();
		el.drawImage("background_preload", 0, 0);
		stage.append(el);
		
		//charge les fichiers référencées dans le fichier .json
		CE.getJSON("data/materials.json", function(files) {
			var percentage = 0,
				bar_full = self.createElement(),
				bar_empty = self.createElement();

			bar_empty.drawImage("bar_empty" , 260, 250);
			stage.append(bar_empty);
			stage.append(bar_full);
			canvas.Materials.load("images", files , function(){
				percentage += Math.round(100 / files.length);
				bar_full.drawImage("bar_full", 260, 250, percentage + "%");
				stage.refresh();
			}, function(){
				canvas.Scene.call("Title");
			});
		}, 'json');
	},
	render: function(stage){
		stage.refresh();
	}
});