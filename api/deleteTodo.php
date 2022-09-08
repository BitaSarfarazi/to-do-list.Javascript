<?php
    // obtenir l'identifiant du client et supprimer todo
	require_once('fonctionsDB.php');
	header('content-type: application/json');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	deleteTodo($_GET['id']);


	echo true;
?>
