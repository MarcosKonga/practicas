import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Simulación de procesamiento de PDF
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
  }

  // Simulamos un retraso de procesamiento de IA
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Resultado simulado basado en un análisis de "Caballero medieval"
  const analysis = {
    attributes: {
      face: "Estructura ósea marcada, ojos azules penetrantes, cicatriz leve en la mejilla izquierda",
      hair: "Cabello rubio ceniza, corto, despeinado estilo guerrero",
      clothing: "Armadura de placas de acero pulido, capa de lana roja desgastada, túnica blanca con emblema solar",
      style: "Cinemático, realista, iluminación de atardecer"
    },
    masterPrompt: "CharRef: [Physical: ash blonde messy short hair, piercing blue eyes, sharp jawline, faint cheek scar] [Outfit: polished steel plate armor, worn red wool cape, white tunic with sun emblem] [Style: cinematic, ultra-realistic, golden hour lighting]"
  };

  return NextResponse.json(analysis);
}
