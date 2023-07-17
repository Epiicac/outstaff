<?php

$API = "6f0f29b81c8818a40c3e1b3e611b1774";
// $list_id = "3";
$template_id = 847704;
$query = "https://api.mailopost.ru/v1/email/templates/{$template_id}/messages";
$curl = curl_init($query);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$json = array("to" => $_GET['email']);
$json = json_encode($json);
curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Bearer '. $API
));
$response = curl_exec($curl);
echo $response;
?>