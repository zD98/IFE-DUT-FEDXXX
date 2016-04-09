function Mediator() {
	var id;
	var speed = 20;
	var energy;
	var isFlying;
	var shipbody;

	return {
		fly: function () {
			if (energy > 0)
			{
				isFlying = true;
			}
		},
		pause: function() {
			isFlying = false;
		},
		selfkill: function() {

		}
	};
}