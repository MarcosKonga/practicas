<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            display: flex; /* Utilizamos flexbox para alinear el panel y el contenido */
            height: 100vh; /* Ocupa el 100% de la altura de la ventana */
        }
        #config-panel {
            background-color: #247BA0;
            width: 250px; /* Ancho fijo para el panel lateral */
            color: #E2E2E2;
            padding: 20px;
            box-sizing: border-box;
        }
        #main-content {
            color: #2d8383ff;
            flex-grow: 1; /* El contenido principal ocupa el resto del espacio */
            padding: 20px;
            box-sizing: border-box;
            background-color: #0A2463;
        }

        #config-panel button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #605F5E;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        #config-panel button:hover {
            background-color: #2a2a29ff;
        }
    </style>
</head>
<body>
    <!-- Panel de configuración lateral -->
    <aside id="config-panel">
        <h2>Configuración</h2>
        <p>Opciones del panel...</p>
        <button>ADN de personaje</button>
        <button>Subir archivos</button>
    </aside>
    <!-- Contenido principal -->
    <main id="main-content">
        <h1>Vista Principal</h1>
        <p>Este es el contenido principal de tu aplicación.</p>
    </main>
</body>
</html>