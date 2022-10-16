<?php

function db() {
  $request_body = file_get_contents('php://input');
  $request_data = json_decode($request_body);
  
  $dsn = 'mysql:dbname=db;host=localhost';
  $user = 'root';
  $user_password = 'usbw';
  $pdo = new Pdo(
    $dsn, $user, $user_password,
    [Pdo::ATTR_DEFAULT_FETCH_MODE => Pdo::FETCH_ASSOC]
  );
  
  $pdo_statement = $pdo->prepare('
    select *
    from `users`
    where `name` = :name and `money` = :money
  ');
  $pdo_statement->execute([':name' => $request_data->user_name, ':money' => $request_data->user_money]);
  $data = $pdo_statement->fetchAll();
  
  echo json_encode($data);
}


function db_connect() {
  $dsn = 'mysql:dbname=db;host=localhost';
  $user = 'root';
  $user_password = 'usbw';
  $pdo = new Pdo(
    $dsn, $user, $user_password,
    [Pdo::ATTR_DEFAULT_FETCH_MODE => Pdo::FETCH_ASSOC]
  );
  
  return $pdo;
}


function login() {
  $request_body = file_get_contents('php://input');
  $request_data = json_decode($request_body);
  
  $user_token = md5($request_data->user_name) . md5($request_data->user_password);
  
  $pdo = db_connect();
  
  $pdo_statement = $pdo->prepare('
    insert into `auth` (`user_id`, `user_token`)
    values (
      (
        select `id`
        from `users`
        where `name` = :user_name and `password` = :user_password
      ),
      :user_token
    )
  ');
  $pdo_statement->execute([
    ':user_name' => $request_data->user_name,
    ':user_password' => $request_data->user_password,
    ':user_token' => $user_token,
  ]);
  
  $error = $pdo->errorInfo();
  print_r($error);
  
  
  // echo $user_token;
}

login();

