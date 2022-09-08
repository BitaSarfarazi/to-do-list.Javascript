<?php
	// obtenir todoId du client et envoyer les détails de todo
	require_once('fonctionsDB.php');

	$todoResponse = array();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
	header('content-type: application/json');

	$todos = getTodoDetail($_GET['id']);

	while ($todo = mysqli_fetch_assoc($todos)) {
	   $todoResponse[] = $todo;
    }

	echo json_encode($todoResponse);
?>
