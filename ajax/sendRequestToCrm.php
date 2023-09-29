<?php
$queryUrl = 'https://crm-new.softmg.ru/rest/1/u16dt96aasrnqwr0/crm.lead.add.json';
use Bitrix\Main\Type\DateTime;
$date = date("Y-m-d H:i:s");
$files = [];
$tmpFiles = [];
if (isset($_FILES['additional-file']['error'][0]) && ($_FILES['additional-file']['error'][0]) == 0) {
    for ($i = 0; $i < count($_FILES['additional-file']['error']); $i++) {
        $file = [
            'error' => $_FILES['additional-file']['error'][$i],
            'name' => $_FILES['additional-file']['name'][$i],
            'tmp_name' => $_FILES['additional-file']['tmp_name'][$i],
        ];
        if ($file['error'] == 0) {
            $fileStream = fopen($file['tmp_name'], 'r');
            $fileContent = fread($fileStream, filesize($file['tmp_name']));
            fclose($fileStream);
            if ($fileContent) {
                $files[] = [
                    'fileData' => [
                        $file['name'],
                        base64_encode($fileContent)
                    ]
                ];
                $tmpFiles[$file['tmp_name']] = $file['name'];
            }
        }
    }
}
$title = "Новая заявка из лендинга (" .date('d.m.Y H:i:s') . ")";
$comment = '';
if (isset($_POST['description'])) {
    $comment = $_POST['description'];
} elseif (isset($_POST['description'])) {
    $comment = $_POST['description'];
}

$commentWithoutExtraServices = $comment;

$extraFields = [
    'extra_backend' => 'Backend',
    'extra_mobile' => 'Mobile',
    'extra_frontend' => 'Frontend',
    'extra_analyst' => 'Аналитики',
    'extra_ux_ui' => 'UX/UI Design',
    'extra_testers' => 'Тестировщики'
];
$extraServicesComments = [];
foreach ($extraFields as $extraFieldKey => $extraFieldValue) {
    if (isset($_POST[$extraFieldKey])) {
        $extraServicesComments[] = $extraFieldValue;
    }
}
$extraServicesComments = implode(', ', $extraServicesComments);
if ($extraServicesComments != '') {
    $comment.= PHP_EOL . '. Дополнительные услуги: ' . $extraServicesComments;
}
$queryData = array(
    'fields' => array(
        'TITLE' => $title ,
        'NAME' => $_POST['name'],
        'UF_CRM_1666013498' => $_SERVER['REMOTE_ADDR'], // IP-адрес
        'DATE_CREATE' => $date,
        'SOURCE_ID' => 'WEB',
        'UF_CRM_1667486861' => $files,
        'COMMENTS' => $comment
    ),
    'params' => array("REGISTER_SONET_EVENT" => "N")
);

$phone = $email = '';

if (isset($_POST['contacts'])) {
    $_POST['email-or-phone'] = $_POST['contacts'];
}

if (isset($_POST['email-or-phone'])) {
    if (filter_var($_POST['email-or-phone'], FILTER_VALIDATE_EMAIL)) {
        $email = $_POST["email-or-phone"];
    } else {
        $phone = $_POST["email-or-phone"];
    }
}
if ($phone != '') {
    $queryData['fields']['PHONE'][] = [
        'VALUE' => $phone,
        'VALUE_TYPE' => "WORK"
    ];
}
if ($email != '') {
    $queryData['fields']['EMAIL'][] = [
        'VALUE' => $email,
        'VALUE_TYPE' => "WORK"
    ];
}

if (isset($_POST['email'])) {
    $queryData['fields']['EMAIL'][] = [
        'VALUE' => $_POST['email'],
        'VALUE_TYPE' => "WORK"
    ];
}

$link = explode('?', $_POST['link']);
$utms = [];
if (isset($link[1])) {
    $getParams = explode('&', $link[1]);
    foreach ($getParams as $getParamItem) {
        $getParamArr = explode("=", $getParamItem);
        if (count($getParamArr) == 2) {
            $getParamKey = $getParamArr[0];
            $getParamValue = $getParamArr[1];
        } else {
            continue;
        }
        if ($getParamKey == "utm_medium") {
            $queryData['fields']["UTM_MEDIUM"] = $getParamValue;
        } elseif ($getParamKey == "utm_source") {
            $queryData['fields']["UTM_SOURCE"] = $getParamValue;
        } elseif ($getParamKey == "utm_content") {
            $queryData['fields']["UTM_CONTENT"] = $getParamValue;
        } elseif ($getParamKey == "utm_camping") {
            $queryData['fields']["UTM_CAMPAIGN"] = $getParamValue;
        } elseif ($getParamKey == "utm_term") {
            $queryData['fields']["UTM_TERM"] = $getParamValue;
        }
    }
    unset ($getParamItem);
}
$queryData = http_build_query($queryData);
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryUrl,
    CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);

file_put_contents(__DIR__ . '/logs/to_crm.log', $result . PHP_EOL . PHP_EOL, FILE_APPEND);
$resultDecode = json_decode($result, true);
if (!empty($resultDecode['result'])) {
 $resultSend['success_send_to_crm'] = true;
}
?>