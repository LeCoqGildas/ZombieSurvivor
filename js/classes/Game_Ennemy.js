Class.create("Game_Ennemy", {
	attack: 0,
	defense: 0,
	strenght: 0,
	hp: 0,
	hp_max: 0,
	setParams: function(params){
		this.attack = params.attack;
		this.defense = params.defense;
		this.strenght = params.strenght;
		this.hp = params.hp;
		this.hp_max = params.hp_max;
		return this;
	},
	damage: function(player){
		var power = player.attack -(this.defense / 2);
		var variance = 15;
		var damage = player.strenght + (variance + Math.floor(Math.random() * 
			Math.round(variance/3)) * (Math.random() > .5? -1:1));
		this.changeHp(-damage);
		return damage;
	},
	changeHp: function(num){
		var hp = this.hp;
		hp += num;
		if(hp > this.hp_max){
			hp = this.hp_max;
		}else if( hp < 0){
			hp = 0;
		}
		this.hp = hp;
	}
}).extend("Game_Entity");