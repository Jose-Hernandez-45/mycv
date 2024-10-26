<?php
    include 'conex.php';

    if (isset($_POST['correo']) && isset($_POST['nombre']) && isset($_POST['mensaje'])) {
        $correo = $_POST["correo"];
        $nombre = $_POST["nombre"];
        $mensaje = $_POST["mensaje"];

        $sql = "INSERT INTO contact(correo, nombre, mensaje) VALUES ('$correo', '$nombre', '$mensaje')";

        if (mysqli_query($con, $sql)) {
            echo "Se mandó el mensaje correctamente";
        } else {
            echo "Error al mandar el mensaje: " . mysqli_error($con);
        }

        mysqli_close($con);
    } else {
        echo "Faltan datos en el formulario";
    }
?>