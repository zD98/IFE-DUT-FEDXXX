function Spaceship(id) {
	var _id = id;
	var speed = 20;
	var energy = 30;
	var isFlying;
	var shipbody;
	var privateObject = this.prototype;

	return {
		fly: function () {
			if (energy > 0)
			{
				isFlying = true;
				console.log(_id + ' fly in ' + speed);
			}
		},
		pause: function() {
			isFlying = false;
		},
		selfkill: function() {
			console.log('died');
		}
	};
}