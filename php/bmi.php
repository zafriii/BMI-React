<?php
session_start();


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bmi_test";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


function sanitize_input($input) {
    return htmlspecialchars(trim($input));
}


$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$age = isset($_POST['age']) ? intval($_POST['age']) : 0;
$gender = isset($_POST['gender']) ? sanitize_input($_POST['gender']) : '';
$height_cm = isset($_POST['height']) ? floatval($_POST['height']) : 0.0;
$weight_kg = isset($_POST['weight']) ? floatval($_POST['weight']) : 0.0;

$height_m = $height_cm / 100;


if ($height_m > 0 && $weight_kg > 0) {
    $bmi = $weight_kg / ($height_m * $height_m);
} else {
    $bmi = 0;
}


if ($bmi < 18.5) {
    $health_message = "Your BMI indicates that you are underweight. It's important to ensure you're getting enough nutrients.";
} elseif ($bmi >= 18.5 && $bmi < 25) {
    $health_message = "Your BMI is within the healthy range. Keep up the good work with a balanced diet and regular exercise.";
} elseif ($bmi >= 25 && $bmi < 30) {
    $health_message = "Your BMI indicates that you are overweight. Consider adjusting your diet and increasing physical activity.";
} else {
    $health_message = "Your BMI indicates obesity. Consult a healthcare professional for personalized advice and support.";
}

 

$sql_insert_user = "INSERT INTO BMIUsers (Name, Age, Gender) VALUES (?, ?, ?)";
$stmt_user = $conn->prepare($sql_insert_user);
$stmt_user->bind_param("sis", $name, $age, $gender);


try {
    if ($stmt_user->execute()) {
    
        $bmi_user_id = $stmt_user->insert_id;
    
        $sql_insert_bmi = "INSERT INTO BMIRecords (BMIUserID, Height, Weight, BMI) VALUES (?, ?, ?, ?)";
        $stmt_bmi = $conn->prepare($sql_insert_bmi);
        $stmt_bmi->bind_param("iddd", $bmi_user_id, $height_m, $weight_kg, $bmi);
    
        if ($stmt_bmi->execute()) {
            echo json_encode([
                'success' => true,
                'bmi' => $bmi,
                'message' => $health_message,
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} catch (Exception $e) {
    // response(400, "Problem: " . $e);
    echo "error: " . $e; 
}


$stmt_user->close();
$stmt_bmi->close();
$conn->close();
?>