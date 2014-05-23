Class.create("Game_Item", {
	id: 0,
	used: 0,
	price: 0,
	description: "",
	name: "",
	hp: null,
	initialize: function(data){
		this.id = data.id;
		this.used = data.used;
		this.price = data.price;
		this.description = data.description;
		this.name = data.name;
		this.hp = data.hp;
	},
	use: function(){
		this.used++;
	},
	getInfo: function(){
		return {
			description: this.description,
			name: this.name,
			price: this.price
		};
	},
	isUsed: function(){
		return this.used > 0;
	}
});