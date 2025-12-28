-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "tipoCategoria" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sitio" (
    "id" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "tipoSitio" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcionCorta" VARCHAR(200) NOT NULL,
    "descripcionCompleta" TEXT,
    "direccion" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "referencia" TEXT,
    "distrito" TEXT,
    "telefono" TEXT,
    "telefonoEmergencia" TEXT,
    "email" TEXT,
    "sitioWeb" TEXT,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "horario" TEXT,
    "precioGeneral" DOUBLE PRECISION,
    "precioEstudiante" DOUBLE PRECISION,
    "precioNino" DOUBLE PRECISION,
    "tiempoVisitaMinutos" INTEGER,
    "imagenPrincipal" TEXT NOT NULL,
    "imagenPrincipalAntigua" TEXT,
    "anioImagenAntigua" INTEGER,
    "fuenteImagenAntigua" TEXT,
    "descripcionImagenAntigua" TEXT,
    "imagenesGaleriaActuales" JSONB,
    "imagenesGaleriaAntiguas" JSONB,
    "epocaHistorica" TEXT,
    "anioConstruccion" INTEGER,
    "estadoConservacion" TEXT,
    "declaratoriaPatrimonio" TEXT,
    "datosHistoricos" TEXT,
    "rangoPrecios" TEXT,
    "especialidadCocina" TEXT,
    "tipoAlojamiento" TEXT,
    "numeroHabitaciones" INTEGER,
    "capacidadPersonas" INTEGER,
    "tieneEstacionamiento" BOOLEAN NOT NULL DEFAULT false,
    "aceptaTarjetas" BOOLEAN NOT NULL DEFAULT false,
    "tieneWifi" BOOLEAN NOT NULL DEFAULT false,
    "esAccesible" BOOLEAN NOT NULL DEFAULT false,
    "serviciosAdicionales" JSONB,
    "atencion24h" BOOLEAN NOT NULL DEFAULT false,
    "serviciosEmergencia" JSONB,
    "especialidadesMedicas" JSONB,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "visitasTotales" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sitio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruta" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracionHoras" DOUBLE PRECISION NOT NULL,
    "distanciaKm" DOUBLE PRECISION NOT NULL,
    "dificultad" TEXT NOT NULL,
    "tipoRuta" TEXT NOT NULL,
    "mejorEpoca" TEXT,
    "puntoInicio" TEXT NOT NULL,
    "puntoFin" TEXT NOT NULL,
    "recomendaciones" TEXT,
    "queTraer" JSONB,
    "imagenPortada" TEXT NOT NULL,
    "imagenesRuta" JSONB,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitioRuta" (
    "id" TEXT NOT NULL,
    "rutaId" TEXT NOT NULL,
    "sitioId" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "tiempoPermanenciaMin" INTEGER NOT NULL,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SitioRuta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sitio_slug_key" ON "Sitio"("slug");

-- CreateIndex
CREATE INDEX "Sitio_categoriaId_idx" ON "Sitio"("categoriaId");

-- CreateIndex
CREATE INDEX "Sitio_tipoSitio_idx" ON "Sitio"("tipoSitio");

-- CreateIndex
CREATE INDEX "Sitio_slug_idx" ON "Sitio"("slug");

-- CreateIndex
CREATE INDEX "Sitio_destacado_idx" ON "Sitio"("destacado");

-- CreateIndex
CREATE INDEX "Sitio_latitud_longitud_idx" ON "Sitio"("latitud", "longitud");

-- CreateIndex
CREATE UNIQUE INDEX "Ruta_slug_key" ON "Ruta"("slug");

-- CreateIndex
CREATE INDEX "Ruta_slug_idx" ON "Ruta"("slug");

-- CreateIndex
CREATE INDEX "Ruta_destacada_idx" ON "Ruta"("destacada");

-- CreateIndex
CREATE INDEX "SitioRuta_rutaId_idx" ON "SitioRuta"("rutaId");

-- CreateIndex
CREATE INDEX "SitioRuta_sitioId_idx" ON "SitioRuta"("sitioId");

-- CreateIndex
CREATE UNIQUE INDEX "SitioRuta_rutaId_sitioId_key" ON "SitioRuta"("rutaId", "sitioId");

-- AddForeignKey
ALTER TABLE "Sitio" ADD CONSTRAINT "Sitio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitioRuta" ADD CONSTRAINT "SitioRuta_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "Ruta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitioRuta" ADD CONSTRAINT "SitioRuta_sitioId_fkey" FOREIGN KEY ("sitioId") REFERENCES "Sitio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
