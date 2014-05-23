canvasScore.Scene.new({
	name: "LoadScore",
	displayScore: function(number){
		this.score.fillText(number, 0, 100);
	},
	ready: function(stage){
		this.score = this.createElement();
		this.score.font = 'bold 24px Arial';
		this.score.fillStyle = '#FFF';
		this.score.x = 10;
		this.score.y = 10;
		stage.append(this.score);
		this.displayScore("Score");
	},
	render: function(stage){	
		stage.refresh();
	}
});