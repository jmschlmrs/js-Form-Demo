$('document').ready(function() {
    
    // set initial slider output value
    var jackedSliderOutput = $('#jackedSliderOutput');
    jackedSliderOutput.val($('#jackedSlider').val());

    // attach event handlers
    $('#jackedSlider').on('change', function(event) {
        jackedSliderOutput.val(event.target.value);
    });
    $('#registrationForm').on('submit', function(event) {
        event.preventDefault();

        var formData = {
            name: $(this).find('#nameInput').val(),
            email: $(this).find('#emailInput').val(),
            password: $(this).find('#passwordInput').val(),
            confirmPassword: $(this).find('#confirmPasswordInput').val(),
            discoverSource: $(this).find('#selectDiscoverSource').val(),
            howJacked: $(this).find('#jackedSlider').val()
        };

        $.ajax('/register', {
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'JSON',
            type: 'post',
        })
        .done(function(data) {
            console.dir(data);
            $('#formMessage').text('Successfully registered as ' + data.name + '.')
            $('#formMessageContainer').css('visibility','visible');
        })
        .fail(function(error) {
            $('#formMessage').text('Registration error.');
            $('#formMessageContainer').css({
                'visibility': 'visible',
                'background-color': 'red'
            });
        });
    });

});