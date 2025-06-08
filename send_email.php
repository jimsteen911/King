<?php
// Set your email address
$to = "james@kingdavidcontracting.com";

// Collect and sanitize form data
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$company = isset($_POST['company']) ? strip_tags(trim($_POST['company'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Basic validation
if ($name && $email && $message && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $subject = "Contact Form Submission from $name";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Organization/Agency: $company\n\n";
    $body .= "Project Details:\n$message";
    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Thank you for contacting us, $name. We will get back to you soon.</p>";
    } else {
        echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
    }
} else {
    echo "<p>Please complete the form and provide a valid email address.</p>";
}
?>
