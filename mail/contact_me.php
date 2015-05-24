<?php
 require_once "Mail.php";
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['subject'])      ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags($_POST['name']);
$email_address = strip_tags($_POST['email']);
$subject = strip_tags($_POST['subject']);
$message = strip_tags($_POST['message']);
echo "Sending " . $name . $email_address . $subject . $message;
   
// Create the email and send the message
$to = 'i@keithajackson.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "Name: $name<br /><br />Email: $email_address<br /><br />Subject: $subject<br /><br />Message:<br />$message";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers = array(
   'Content-Type' => 'text/html',
   'charset' => 'iso-8859-1',
   'From' => "noreply@keithajackson.com",
   'Subject' => '(keithajackson.com) ' . $subject,
   'Reply-To' => $email_address
   );
 $host = "mail.google.com";
 $username = "i@keithajackson.com";
 $password = "zstxvxsdwtqzciyi";
 
$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => $username,
        'password' => $password
    ));
 
 $mail = $smtp->send($to, $headers, $email_body);
 
 if (PEAR::isError($mail)) {
   echo("<p>" . $mail->getMessage() . "</p>");
   return false;
  } else {
   echo("<p>Message successfully sent!</p>");
   return true;
  }
 ?>