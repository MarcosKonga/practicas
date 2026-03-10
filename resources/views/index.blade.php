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
        #config-panel label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            font-weight: bold;
        }
        #config-panel input, #config-panel select, #config-panel textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #f9f9f9;
            color: #333;
            font-family: inherit;
        }
        #config-panel textarea {
            resize: vertical;
            min-height: 80px;
        }
        #config-panel .form-section {
            margin-bottom: 20px;
            border-bottom: 1px dashed #605F5E;
            padding-bottom: 15px;
        }

        /* Estilos para el área de previsualización */
        .preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
        }

        .preview-header {
            width: 100%;
            max-width: 800px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .preview-header h2 {
            margin: 0;
            color: #E2E2E2;
            font-size: 20px;
        }

        .status-badge {
            background-color: #2d8383ff;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background-color: #4CAF50;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
        }

        .video-player-wrapper {
            width: 100%;
            max-width: 800px;
            aspect-ratio: 16 / 9;
            background-color: #000;
            border-radius: 12px;
            border: 2px solid #247BA0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .video-placeholder-text {
            color: #605F5E;
            text-align: center;
            z-index: 2;
        }

        .video-controls {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            gap: 15px;
            align-items: center;
            opacity: 0.8;
            transition: opacity 0.3s;
        }

        .video-player-wrapper:hover .video-controls {
            opacity: 1;
        }

        .control-btn {
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .progress-bar {
            flex-grow: 1;
            height: 5px;
            background-color: #605F5E;
            border-radius: 5px;
            position: relative;
        }

        .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 45%; /* Ejemplo de progreso */
            background-color: #2d8383ff;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <!-- Panel de configuración lateral -->
    <aside id="config-panel">
        <h2>ADN de Personaje</h2>
        <p style="font-size: 13px; color: #a0a0a0; margin-bottom: 20px;">Configura la identidad y reglas de tu avatar.</p>

        <form action="#" method="POST">
            <div class="form-section">
                <label for="char-name">Nombre del Personaje</label>
                <input type="text" id="char-name" name="char-name" placeholder="Ej: Asistente Virtual">

                <label for="char-role">Rol Profesional</label>
                <input type="text" id="char-role" name="char-role" placeholder="Ej: Especialista en Ventas">
            </div>

            <div class="form-section">
                <label for="char-traits">Rasgos de Personalidad</label>
                <textarea id="char-traits" name="char-traits" placeholder="Ej: Amable, directo, proactivo..."></textarea>
                
                <label for="char-tone">Tono de Voz</label>
                <select id="char-tone" name="char-tone">
                    <option value="formal">Formal y Profesional</option>
                    <option value="casual">Casual y Cercano</option>
                    <option value="humorous">Con sentido del humor</option>
                    <option value="technical">Técnico y Detallado</option>
                </select>
            </div>

            <button type="button" style="background-color: #2d8383ff;">Guardar ADN</button>
            <button type="button">Subir Archivos PDF</button>
        </form>
    </aside>
    <!-- Contenido principal -->
    <main id="main-content">
        <div class="preview-container">
            <div class="preview-header">
                <h2>Previsualización en Directo</h2>
                <div class="status-badge">
                    <div class="status-dot"></div>
                    Generando IA (Tiempo Real)
                </div>
            </div>
            
            <div class="video-player-wrapper">
                <!-- Aquí iría el reproductor de video <video> o canvas WebGL -->
                <div class="video-placeholder-text">
                    <p style="font-size: 48px; margin: 0; color: #247BA0;">🤖</p>
                    <p>Esperando entrada de texto / audio para animar el avatar...</p>
                </div>

                <div class="video-controls">
                    <button class="control-btn">▶</button>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <button class="control-btn">⛶</button>
                </div>
            </div>
        </div>
    </main>
</body>
</html>