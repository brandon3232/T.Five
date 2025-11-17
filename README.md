# T.Five 🧘

**Tómate cinco minutos** — Una aplicación para el descanso mental y emocional a través de la música, la meditación y la introspección.

## 📖 Sobre el proyecto

T.Five es una aplicación web que ofrece un espacio de descanso mental y emocional, utilizando herramientas como la musicoterapia, la meditación guiada, la reflexión personal y el aburrimiento consciente. 

El nombre proviene de "Take Five", una invitación a tomarse cinco minutos para parar, respirar y reconectar con el presente. Inspirada en la filosofía taoísta del Wu-Wei (no acción) y la crítica de Byung-Chul Han a la sociedad del rendimiento.

### 🎯 Filosofía

- **Sin métricas ni gamificación**: No hay rachas, puntos ni recompensas que refuercen la dependencia
- **Interfaz minimalista**: Diseñada para ser funcional sin distraer
- **Privacidad primero**: Todos los datos se guardan localmente en tu navegador
- **Autonomía emocional**: El objetivo es que aprendas a no necesitar la aplicación

## ✨ Características

- 🧘 **Meditaciones guiadas** con temporizador y sugerencias basadas en Wu-Wei
- 🎵 **Búsqueda de música en Jamendo** con categorías para meditación y relajación
- 📝 **Diario emocional** con preguntas de sondeo para la reflexión
- 🌊 **Mural narrativo** que visualiza tu viaje de introspección
- ⏱️ **Modo aburrimiento consciente** para practicar estar sin hacer
- 🎨 **Temas claro/oscuro** con opción de seguir el sistema
- 💾 **Persistencia local** con exportar/importar datos

## 🚀 Tecnologías

- **React 19** con TypeScript
- **Vite** para desarrollo ultra-rápido
- **Tailwind CSS v4** para estilos
- **Jamendo API** para música libre y completa
- **LocalStorage** para persistencia de datos

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ y pnpm (o npm/yarn)
- Jamendo API Key (gratuita, para la búsqueda de música)

### 1. Clonar el repositorio

```bash
git clone https://github.com/brandon3232/T.Five.git
cd T.Five
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar Jamendo API

#### a) Crear una cuenta en Jamendo Developer

1. Ve a [Jamendo Developer Portal](https://devportal.jamendo.com/)
2. Crea una cuenta o inicia sesión
3. Ve a "Your applications"
4. Crea una nueva aplicación:
   - **Application name**: T.Five
   - **Description**: Aplicación de meditación y música
   - **Website**: http://localhost:5173
5. Copia tu **Client ID** (API Key)

#### b) Configurar las variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y agrega tu API Key
VITE_JAMENDO_CLIENT_ID=tu_client_id_aqui
```

> ✅ **Ventaja**: Jamendo solo requiere un Client ID (no secret), es más seguro para apps frontend.

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Build para producción

```bash
pnpm build
pnpm preview
```

## 📂 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes reutilizables (Button, Card, Input)
│   ├── meditate/       # Componentes de meditación
│   ├── music/          # Componentes de música y Jamendo
│   ├── journal/        # Componentes del diario
│   ├── mural/          # Componente del mural narrativo
│   ├── boredom/        # Componente de aburrimiento consciente
│   └── settings/       # Componentes de ajustes
├── hooks/              # Custom hooks
│   ├── useLocalStorage.ts
│   ├── useTheme.ts
│   ├── useTimer.ts
│   └── useJamendo.ts   # Hook para Jamendo API
├── lib/                # Utilidades y servicios
│   ├── utils.ts
│   ├── constants.ts
│   └── jamendo.ts      # Cliente de Jamendo API
├── types/              # Definiciones de TypeScript
│   ├── index.ts
│   └── jamendo.ts
└── App.tsx             # Componente principal
```

## 🎵 Uso de la integración con Jamendo

La aplicación utiliza **Jamendo API**, que ofrece música Creative Commons perfecta para meditación:

- ✅ Buscar canciones por palabra clave
- ✅ Explorar 8 categorías predefinidas de meditación
- ✅ **Reproducción completa** (no solo 30 segundos como Spotify)
- ✅ Música 100% legal bajo licencia Creative Commons
- ✅ Agregar canciones a tus playlists locales
- ✅ 35,000 requests gratuitos al mes

### Categorías disponibles

- 🧘 **Meditación**: Música especial para meditación profunda
- 😌 **Relajación**: Sonidos relajantes para desconectar
- 🌌 **Ambiental**: Música ambiental y atmosférica
- 🌿 **Naturaleza**: Sonidos de la naturaleza
- 🕉️ **Yoga**: Música perfecta para practicar yoga
- 😴 **Dormir**: Ayuda a conciliar el sueño
- 🎹 **Instrumental**: Música instrumental sin voces
- 🎹 **Piano**: Melodías suaves de piano

### Ventajas sobre Spotify

- ✅ **Reproducción completa** vs preview de 30s
- ✅ **Música libre** sin restricciones de copyright
- ✅ **Más seguro**: Solo requiere Client ID (no secret)
- ✅ **Ideal para meditación**: Catálogo curado
- ✅ **Sin autenticación OAuth**: Más simple de implementar

## 🔒 Privacidad y datos

- **Todos los datos se guardan localmente** en tu navegador usando LocalStorage
- **No hay servidor backend** que almacene tu información
- **No hay tracking ni analytics**
- Puedes **exportar/importar** tus datos en formato JSON
- Puedes **borrar todos los datos** desde la sección de Ajustes

## 🤝 Contribuir

Este es un proyecto académico sin fines comerciales. Si tienes sugerencias o mejoras, eres bienvenido a:

1. Hacer fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible sin fines comerciales con propósitos educativos.

## 🙏 Agradecimientos

- Inspirado en el libro *"Cómo dejar de ser tu peor enemigo"* de Alba Cardalda
- Filosofía basada en *"La sociedad del cansancio"* de Byung-Chul Han
- Concepto taoísta de Wu-Wei (no acción)
- Jamendo API para música libre y legal

---

**T.Five** · Desarrollado con 💙 para promover el descanso mental sin culpa
