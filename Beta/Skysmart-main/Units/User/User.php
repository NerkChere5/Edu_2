<?php

// $request_body = file_get_contents('php://input');
// $request_data = json_decode($request_body);
// $data_string = $request_data->email . "\r\n" . $request_data->password . "\r\n\r\n";
// file_put_contents('./Users.txt', $data_string, FILE_APPEND);

$request_body = file_get_contents('php://input');
$data_string = $request_body . "\r\n\r\n";
file_put_contents('./Users.json', $data_string, FILE_APPEND);
