<?php
ob_start();
session_start();

if (strlen($_GET['inputName']) > 0 && strptime($_GET['inputDate'], '%Y-%m-%d')) {
  $date_hash = md5($_GET['inputDate']);
  if ($_SESSION[$date_hash]['voted'] == false) {
    if (($fd = fopen('intresse.dat', 'a')) == false) {
      print("Could not open file");
      http_response_code(500);
    } else {
      if (!fwrite($fd, preg_replace('/[\r\n\t\;]*/', '', _GET['inputName']).";".$_GET['inputDate'].";\n")) {
        print("Could not write to file");
        http_response_code(500);
      } else {
        $_SESSION[$date_hash]['voted'] = true;
      }
      fclose($fd);
    }
  }
} else {
  print("Incorrect arguments");
  http_response_code(500);
}

ob_end_flush();
?>
