<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$service = isset($input['service']) ? trim($input['service']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validation
if (empty($name) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Имя и телефон обязательны для заполнения']);
    exit;
}

// Email configuration
$to = 'onemetal@ya.ru';
$subject = 'Новая заявка с сайта Чистый Источник';

// Email body
$email_body = "
Новая заявка с сайта wells-mo.ru

Имя: $name
Телефон: $phone
Email: $email
Услуга: $service
Сообщение: $message

Дата: " . date('d.m.Y H:i:s') . "
IP адрес: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = "From: noreply@wells-mo.ru\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки заявки']);
}
?>

