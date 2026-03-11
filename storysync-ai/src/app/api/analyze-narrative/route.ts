import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
  }

  // Simulamos un retraso de procesamiento de IA para segmentación
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Resultado simulado: Segmentación de una historia de fantasía
  const scenes = [
    {
      id: "sc_1",
      narrative: "El sol se oculta tras las montañas de ceniza, tiñendo el cielo de un rojo sangre.",
      visual_score: 0.98,
      duration: 4.5,
      status: "ready"
    },
    {
      id: "sc_2",
      narrative: "Alaric ajusta su guantelete de acero mientras observa el valle desde el acantilado.",
      visual_score: 0.92,
      duration: 3.8,
      status: "ready"
    },
    {
      id: "sc_3",
      narrative: "Un rugido sordo retumba en las profundidades de la tierra, haciendo vibrar la piedra.",
      visual_score: 0.85,
      duration: 5.0,
      status: "ready"
    },
    {
      id: "sc_4",
      narrative: "De las sombras surge una silueta alada, sus ojos brillan como brasas ardientes.",
      visual_score: 0.95,
      duration: 4.2,
      status: "ready"
    }
  ];

  return NextResponse.json({ scenes });
}
