var connectedSlider = document.getElementById('nonlinear');


var input_from = document.getElementById('price_from');
var input_to = document.getElementById('price_to');

var price_inputs = [input_from, input_to];


noUiSlider.create(connectedSlider, {
    animationDuration: 300,
    start: [150, 2300],
    step: 50,
    tooltips: true,
    format: wNumb({
        decimals: 0,
        thousand: ' '
    }),
    connect: true,
    range: {
        'min': 150,
        'max': 2300
    }
});

connectedSlider.noUiSlider.on('update', function( values, handle ) {
	price_inputs[handle].value = values[handle];
});


function setSliderHandle(i, value) {
	var r = [null,null];
	r[i] = value;
	connectedSlider.noUiSlider.set(r);
}

// Listen to keydown events on the input field.
price_inputs.forEach(function(input, handle) {

	input.addEventListener('change', function(){
		setSliderHandle(handle, this.value);
	});

	input.addEventListener('keydown', function( e ) {

		var values = connectedSlider.noUiSlider.get();
		var value = Number(values[handle]);

		// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
		var steps = connectedSlider.noUiSlider.steps();

		// [down, up]
		var step = steps[handle];

		var position;

		// 13 is enter,
		// 38 is key up,
		// 40 is key down.
		switch ( e.which ) {

			case 13:
				setSliderHandle(handle, this.value);
				break;

			case 38:

				// Get step to go increase slider value (up)
				position = step[1];

				// false = no step is set
				if ( position === false ) {
					position = 1;
				}

				// null = edge of slider
				if ( position !== null ) {
					setSliderHandle(handle, value + position);
				}

				break;

			case 40:

				position = step[0];

				if ( position === false ) {
					position = 1;
				}

				if ( position !== null ) {
					setSliderHandle(handle, value - position);
				}

				break;
		}
	});
});