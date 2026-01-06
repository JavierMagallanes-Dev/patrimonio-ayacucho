-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "descripcionCorta" VARCHAR(200) NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "esAnual" BOOLEAN NOT NULL DEFAULT false,
    "mesEvento" INTEGER,
    "sitioId" TEXT,
    "ubicacionGeneral" TEXT,
    "horario" TEXT,
    "programacion" JSONB,
    "imagenPortada" TEXT NOT NULL,
    "imagenesGaleria" JSONB,
    "videoUrl" TEXT,
    "entrada" TEXT,
    "recomendaciones" TEXT,
    "queTraer" JSONB,
    "organizador" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "sitioWeb" TEXT,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evento_slug_key" ON "Evento"("slug");

-- CreateIndex
CREATE INDEX "Evento_tipoEvento_idx" ON "Evento"("tipoEvento");

-- CreateIndex
CREATE INDEX "Evento_fechaInicio_idx" ON "Evento"("fechaInicio");

-- CreateIndex
CREATE INDEX "Evento_destacado_idx" ON "Evento"("destacado");

-- CreateIndex
CREATE INDEX "Evento_mesEvento_idx" ON "Evento"("mesEvento");

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_sitioId_fkey" FOREIGN KEY ("sitioId") REFERENCES "Sitio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
