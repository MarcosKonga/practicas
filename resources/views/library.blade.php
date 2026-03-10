<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Biblioteca</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #0A2463; /* Mismo fondo que el panel principal de index */
            color: #E2E2E2; /* Mismo color de texto general */
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Nav/Header Superior */
        header {
            background-color: #247BA0; /* Mismo fondo que el panel izquierdo de index */
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        header h1 {
            margin: 0;
            font-size: 24px;
            color: #ffffff;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .avatar {
            width: 45px;
            height: 45px;
            background-color: #605F5E; /* Botones oscuros de index */
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 18px;
            color: white;
            border: 2px solid #2d8383ff;
        }

        /* Contenedor Principal del Dashboard */
        .dashboard-container {
            padding: 40px;
            flex-grow: 1;
        }

        /* Cabeceras de Sección */
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #247BA0;
            padding-bottom: 10px;
            margin-top: 30px;
        }

        .section-header h2 {
            margin: 0;
            font-size: 22px;
            color: #2d8383ff; /* Color de acento usado antes */
        }

        .btn-add {
            background-color: #605F5E; /* Botones oscuros */
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-weight: bold;
            font-size: 14px;
        }

        .btn-add:hover {
            background-color: #2a2a29ff; /* Efecto dark hover */
        }

        /* Grid para las tarjetas */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }

        /* Tarjetas (Cards) de proyectos, assets, vídeos */
        .card {
            background-color: rgba(36, 123, 160, 0.15); /* #247BA0 translúcido */
            border: 1px solid #247BA0;
            border-radius: 10px;
            padding: 20px;
            transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            background-color: rgba(36, 123, 160, 0.25);
            border-color: #2d8383ff;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            align-items: center;
        }

        .card-title {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
            color: #ffffff;
        }

        .card-badge {
            background-color: #247BA0;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 20px;
            color: #fff;
        }

        .card-desc {
            color: #a0a0a0;
            font-size: 14px;
            flex-grow: 1; /* Permite que la tarjeta se expanda si hay varias */
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .card-actions {
            display: flex;
            gap: 10px;
        }

        .btn-action {
            flex: 1;
            background-color: transparent;
            border: 1px solid #605F5E;
            color: #E2E2E2;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            font-size: 14px;
        }

        .btn-action.primary {
            background-color: #605F5E;
            border-color: #605F5E;
        }

        .btn-action:hover {
            background-color: #2a2a29ff;
            border-color: #2a2a29ff;
            color: white;
        }
        
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 50px 20px;
            background-color: rgba(0,0,0,0.2);
            border-radius: 10px;
            border: 1px dashed #247BA0;
            color: #a0a0a0;
        }

        .empty-state p {
            font-size: 16px;
        }
    </style>
</head>
<body>

    <header>
        <h1>Mi Biblioteca</h1>
        <div class="user-profile">
            <span>Usuario Conectado</span>
            <div class="avatar">U</div>
        </div>
    </header>

    <div class="dashboard-container">
        
        <!-- Próyectos -->
        <div class="section-header" style="margin-top: 0;">
            <h2>Mis Proyectos</h2>
            <button class="btn-add">+ Crear Nuevo Proyecto</button>
        </div>
        <div class="grid-container">
            <!-- Card Proyecto 1 -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Campaña de Verano '26</h3>
                    <span class="card-badge">En curso</span>
                </div>
                <p class="card-desc">Proyecto principal de publicidad estival. Generación animada de los assets 3D.</p>
                <div class="card-actions">
                    <button class="btn-action primary">Continuar</button>
                    <button class="btn-action">Ajustes</button>
                </div>
            </div>
            
            <!-- Proyecto 2 -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Demo Producto VR</h3>
                    <span class="card-badge" style="background-color: #605F5E;">Terminado</span>
                </div>
                <p class="card-desc">Vídeo explicativo para el lanzamiento, renderizado y revisado.</p>
                <div class="card-actions">
                    <button class="btn-action primary">Ver y Exportar</button>
                </div>
            </div>
        </div>

        <!-- Personajes y ADN -->
        <div class="section-header">
            <h2>Mi ADN de Personaje</h2>
            <button class="btn-add">+ Entrenar Personalidad</button>
        </div>
        <div class="grid-container">
            <!-- Card Personaje -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Avatar Corporativo</h3>
                    <span class="card-badge" style="background-color: #2d8383ff;">Activo</span>
                </div>
                <p class="card-desc">Asistente principal entrenado con base de respuestas de atención al cliente de la empresa.</p>
                <div class="card-actions">
                    <button class="btn-action primary">Ver ADN</button>
                    <button class="btn-action">Evolucionar</button>
                </div>
            </div>
            
            <div class="empty-state">
                <p>Crea variaciones de personalidad e inteligencia para tus avatares.</p>
            </div>
        </div>

        <!-- Videos Finalizados (Historial) -->
        <div class="section-header">
            <h2>Videos Finalizados</h2>
        </div>
        <div class="grid-container">
            <div class="empty-state">
                <p>Aún no has generado tu primer corto finalizado. ¡Entrena un personaje y crea un proyecto!</p>
            </div>
        </div>
        
    </div>
</body>
</html>
