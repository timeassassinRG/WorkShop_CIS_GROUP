<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Get the form data
    $name    = strip_tags($_POST['name']); 
    $email   = strip_tags($_POST['email']);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);

    // 2. Set the recipient (your email) and build the email headers
    $to       = "alessio.mezzina@phd.unict.com";  // <== Replace with your real email
    $fullSubject = "WBO25 Contact Form: " . $subject;
    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 3. Construct the body of the email 
    $emailBody = "Name: $name\n"
               . "Email: $email\n"
               . "Message:\n$message\n";

    // 4. Attempt to send the email
    if (mail($to, $fullSubject, $emailBody, $headers)) {
        // Email sent successfully; redirect to a thank you page or show success
        header("Location: thankyou.html");
        exit;
    } else {
        // If the mail function fails, show an error (or handle gracefully)
        echo "Oops! There was a problem sending your message. Please try again later.";
    }
} else {
    // If someone navigates directly to sendmail.php without POST data
    echo "Invalid request.";
}
?>
