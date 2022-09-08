<?php
    // api pour utiliser la list de todo 
	require_once('fonctionsDB.php');

	$todoResponse = array();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
	header('content-type: application/json');

	if(isset($_GET['order']))
		$todos = getAllTodosOrdered($_GET['order']);
	else
		$todos = getAllTodos();

	while ($todo = mysqli_fetch_assoc($todos)) {
	   $todoResponse[] = $todo;
    }

	echo json_encode($todoResponse);
?>
