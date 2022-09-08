<?php
	$connexion = connectDB();

	function connectDB() {
		define('DB_HOST', 'localhost');
        define('DB_USER', 'root');
		// define('DB_PASSWORD', 'root');			// MAC
        define('DB_PASSWORD', '');			// Windows

        $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}

		$selected = mysqli_select_db($laConnexion, 'to-do-list');

		if(!$selected) {
			die('La base de données n\'existe pas.');
		}

		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}

	function executeRequete($requete) {
		global $connexion;
		$resultats = mysqli_query($connexion, $requete);

		return $resultats;
	}

	function getAllTodos() {
		return executeRequete('SELECT * FROM taches');
	}

	function getAllTodosOrdered($order) {
		return executeRequete('SELECT * FROM taches order by '.$order);
	}

	function getTodoDetail($todoId) {
		return executeRequete('SELECT * FROM taches where id='.$todoId);
	}

	function addTodo($tache,$importance,$description) {
        global $connexion;
		executeRequete("INSERT into taches(tache, description, importance) VALUES	('".$tache."', '".$description."', '".$importance."')");
		$last_id = mysqli_insert_id($connexion);
        echo $last_id;
	}

	function deleteTodo($id) {
		return executeRequete('DELETE FROM `taches` WHERE id='.$id);
	}


?>
