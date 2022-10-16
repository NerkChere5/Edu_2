<?php

$_pdo = null;




function _db_user_check($user_name, $user_password) {
  $pdo_statement = $_pdo->prepare('
    select *
    from `users`
    where `name` = :name
  ');
  $pdo_statement->execute([
    ':name' => $request_data->user_name,
  ]);
  $data = $pdo_statement->fetchAll();
}


function _pdo_define($db_name, $db_host = 'localhost', $user_name = 'root', $user_password = 'usbw') {
  global $_pdo;
  
  $dsn = "mysql:dbname=$db_name;host=$db_host";
  $_pdo = new Pdo(
    $dsn, $user_name, $user_password,
    [Pdo::ATTR_DEFAULT_FETCH_MODE => Pdo::FETCH_ASSOC]
  );
}




function login($user_name, $user_password) {
  
  
  
  
  
}


function main() {
  $method = $_GET['method'];
  $request_data = json_decode(file_get_contents('php://input'));
  
  if (method == 'login') {
    login($request_data->user_name, $request_data->user_password);
  }
  
}


function test() {
  global $_pdo;
  
  $request_body = file_get_contents('php://input');
  $request_data = json_decode($request_body);
  
  $pdo_statement = $_pdo->prepare('
    select *
    from `users`
    where `name` = :name
  ');
  $pdo_statement->execute([
    ':name' => $request_data->user_name,
  ]);
  $data = $pdo_statement->fetchAll();
  
  echo json_encode($data);
}





_pdo_define('skysmart');
test();

