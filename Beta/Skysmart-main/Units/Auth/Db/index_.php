<?php

$dsn = 'mysql:dbname=db;host=localhost';
$user = 'root';
$user_password = 'usbw';
$pdo = new Pdo(
  $dsn, $user, $user_password,
  [Pdo::ATTR_DEFAULT_FETCH_MODE => Pdo::FETCH_ASSOC]
);

// $error = $pdo->errorInfo();
// print_r($error);


// $pdo_statement = $pdo->query('
//   select *
//   from `users`
// ');
// $data = $pdo_statement->fetchAll();
// print_r($data);


$pdo_statement = $pdo->prepare('
  insert into `users` (`name`, `money`)
  values (:name, :money)
');
$pdo_statement->execute([':name' => $_GET['name'], ':money' => $_GET['money']]);
// $data = $pdo_statement->fetchAll();
// print_r($data);








