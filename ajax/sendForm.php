<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $resultSend = [
        'success_send_to_crm' => false,
        'success_send_to_email' => false
    ];
    require_once __DIR__ . '/sendRequestToCrm.php';
    // require_once __DIR__ . '/sendRequestToEmail.php';
    echo json_encode($resultSend);