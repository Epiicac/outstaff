<?php

    $sendTo = 'i.pashin@softmg.ru';

    function getEmailRow($title, $value) {
        return '<b>' . $title . ': </b>' . $value;
    }

    $emailBody = '';
    $emailBodyRows = [];
    if (!empty($_POST['name'])) {
        $emailBodyRows[] = getEmailRow('Имя клиента', $_POST['name']);
    }
    if (!empty($_POST['email'])) {
        $emailBodyRows[] = getEmailRow('Почта клиента', $_POST['email']);
    }
    if (!empty($email)) {
        $emailBodyRows[] = getEmailRow('Почта клиента', $email);
    }
    if (!empty($phone)) {
        $emailBodyRows[] = getEmailRow('Телефон клиента', $phone);
    }
    if (!empty($commentWithoutExtraServices)) {
        $emailBodyRows[] = getEmailRow('Комментарий от клиента', $commentWithoutExtraServices);
    }
    if (!empty($extraServicesComments)) {
        $emailBodyRows[] = getEmailRow('Дополнительные услуги', $extraServicesComments);
    }

    $emailBody = implode('<br>', $emailBodyRows);

    require_once __DIR__ . '/phpMailer/PHPMailer.php';
    require_once __DIR__ . '/phpMailer/SMTP.php';
    require_once __DIR__ . '/phpMailer/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->addAddress($sendTo);
    $mail->isHTML(true);
    $mail->CharSet = "UTF-8";
    $mail->Subject = "Новая заявка из лендинга (" .date('d.m.Y H:i:s') . ")";
    $mail->Body = $emailBody;

    foreach ($tmpFiles as $filePath => $fileName) {
        $mail->addAttachment($filePath, $fileName);
    }
    unset($filePath, $fileName);

    if ($mail->send()) {
        $resultSend['success_send_to_email'] = true;
    }