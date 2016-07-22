(function() {
    
    // set initial slider output value
    var jackedSliderOutput = document.getElementById('jackedSliderOutput');
    var jackedSlider = document.getElementById('jackedSlider');
    jackedSliderOutput.value = jackedSlider.value;

    // attach event handlers
    jackedSlider.addEventListener('change', function(event) {
        jackedSliderOutput.value = event.target.value
    });

    var registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = {
            name: event.target.querySelector('#nameInput').value,
            email: event.target.querySelector('#emailInput').value,
            password: event.target.querySelector('#passwordInput').value,
            confirmPassword: event.target.querySelector('#confirmPasswordInput').value,
            discoverSource: [],
            howJacked: event.target.querySelector('#jackedSlider').value,
        };
        var selectedOptions = event.target.querySelector('#selectDiscoverSource').selectedOptions
        for (var i=0; i<selectedOptions.length; i++) {
            formData.discoverSource.push(selectedOptions[i].value);
        }

        fetch('/register', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(function(res) { 
            return res.json(); 
        })
        .then(function(data) { 
            document.querySelector('#formMessage').innerHTML = 'Successfully registered as ' + data.name + '.';
            document.querySelector('#formMessageContainer').style.visibility = 'visible';
        })
        .catch(function(error) {
            document.querySelector('#formMessage').innerHTML = 'Registration error.';
            document.querySelector('#formMessageContainer').style.cssText = 'visibility: visible; background-color: red';
        });
    });

})();