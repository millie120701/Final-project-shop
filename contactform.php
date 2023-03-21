<?php


if (isset($_POST['sign-up'])) {
  $to = "millieg120701@gmail.com";
  $subject = 'Welcome to our newsletter!';
  $message = 'Thank you for signing up for our newsletter. You will receive updates and special offers from us soon.';
  $headers = 'From: millieg120701@gmail.com';

  if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
  } else {
    echo 'Error sending email.';
  }
}
?>