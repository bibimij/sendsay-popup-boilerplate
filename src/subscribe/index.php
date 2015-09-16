<?php

if (empty($_POST)) {
  header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found');
  exit;
}

require_once 'sendsay.php';

$ss = new Sendsay('', '', '', TRUE);

$email = $_POST['email']; // Электронная почта
$data = array(
  'a29' => array(
    'q66' => $_POST['name'] // Имя
  ),
  '-group' => array(
    'p919' => 1
  )
);

$ss->member_set($email, $data);

