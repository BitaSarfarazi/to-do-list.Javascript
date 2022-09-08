<?php
// api pour ajouter addTodo ('tache','importance','description')
	require_once('fonctionsDB.php');

	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
	echo addTodo($_GET['tache'],$_GET['importance'],$_GET['description']);


	// echo json_encode($tableau);
?>
