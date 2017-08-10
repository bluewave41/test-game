<?php
    include('config.php');
    $type = $_POST['type'];
    switch($type) {
        case 'register':
            $username = $_POST['username'];
            $token = $_POST['token'];
            if(accountExists($conn, $username)) {
                echo 'This account name is already taken.';
                return;
            }
            if(!checkForToken($conn, $token)) {
                echo 'Invalid token.';
                return;
            }
            $password = $_POST['password'];
            $sql = "INSERT INTO users(username, password) VALUES ('$username', '$password')";
            $conn->query($sql);
            echo 'Account created. Login now.';
        break;
        case 'login':
            $username = $_POST['username'];
            $password = $_POST['password'];
            $token = $_POST['token'];
            if(!checkForToken($conn, $token)) {
                echo 'Invalid token.';
                return;
            }
            $sql = "SELECT password FROM users WHERE username = '$username'";
            $result = $conn->query($sql);
            if($result->num_rows == 0) {
                echo "Account doesn't exist.";
                return;
            }
            $result = $result->fetch_object()->password;
            if($result == $password) {
                $sql = "DELETE FROM token WHERE id = '$token'";
                $conn->query($sql);
                echo 'Logged in.';
            }
            else {
                echo 'Invalid password';
            }
        break;
    }

    function accountExists($conn, $username) {
        $sql = "SELECT username FROM users WHERE username = '$username'";
        $result = $conn->query($sql);
        return $result->num_rows == 1;
    }

    function checkForToken($conn, $token) {
        $sql = "SELECT id FROM token WHERE id = '$token'";
        $result = $conn->query($sql);
        return $result->num_rows == 1;
    }
?>