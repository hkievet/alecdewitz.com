var submitForm = false;

$(function () {

    function after_form_submitted(data) {
        if (data.result == 'success') {
            $('form#contactForm').hide();
            $('#success_message').show();
            $('#error_message').hide();
        } else {
            $('#error_message ul').remove();
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors, function (key, val) {
                $('#error_message ul').html('<li>' + key + ':' + val + '</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function () {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if (label) {
                    $btn.prop('type', 'submit');
                    $btn.text(label);
                    $btn.prop('orig_label', '');
                }
            });

        }
    }

    $('#contactForm').submit(function (e) {
        e.preventDefault();

        if (submitForm) {
            $form = $(this);
            //show some response on the button
            $('button[type="submit"]', $form).each(function () {
                $btn = $(this);
                // $btn.prop('type', 'button');
                $btn.prop('orig_label', $btn.text());
                $btn.text('Sending ...');
            });
            $.ajax({
                type: "POST",
                url: 'https://code.alecdewitz.com/contact.php', // code.alecdewitz.com has some code btw
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json'
            });
        }
    });

});

var onloadCallback = function () {
    grecaptcha.render('recaptcha', {
        'sitekey': '6LfKfoEUAAAAAIknUMVH1dkBfZSsTesjrhTqCSki',
        'callback': reCaptchaVerify,
        'expired-callback': reCaptchaExpired
    });
};

function reCaptchaVerify(response) {
    if (response === document.querySelector('.g-recaptcha-response').value) {
        submitForm = true;
    }
}

function reCaptchaExpired(data) {
    console.error('Captcha has expired.');
}