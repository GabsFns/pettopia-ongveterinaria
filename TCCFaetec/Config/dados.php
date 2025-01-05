<?php
session_start();

// Verifique se o token está na sessão e extraia os dados do usuário
if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
} else {
    $user = null;
}
?>