$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            // alert("Submit error!");
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // disable the send button until we have a result
            $("#sendMailButton").prop("disabled", true);
            // show the sending message
            $("#result .message").html("Sending your message...");
            $("#result").removeClass("alert-success").removeClass("alert-danger").addClass("alert-warning");
            $("#result").show();
            // get values from FORM
            var name = $("input#replyTo").val();
            var email = $("input#replyToAddress").val();
            var subject = $("input#subjectText").val();
            var message = $("textarea#messageText").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $("#result .message").html("Your message has been sent. Thanks so much!");
                    $("#result").removeClass("alert-warning").addClass("alert-success");
                    //clear all fields and enable send button
                    $('#contact form').trigger("reset");
                    $('#sendMailButton').prop("disabled", false);
                },
                error: function() {
                    // Fail message
                    $("#result .message").html("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $("#result").removeClass("alert-warning").addClass("alert-danger");
                    //clear all fields
                    $('#contact form').trigger("reset");
                    $('#sendMailButton').prop("disabled", false);
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
