import type { Meditation, Track } from '../types';

/**
 * Constantes y datos dummy de la aplicación
 */

export const LS_KEYS = {
  PLAYLISTS: 'tfive.playlists.v1',
  JOURNAL: 'tfive.journal.v1',
  SESSIONS: 'tfive.sessions.v1',
  THEME: 'tfive.theme.v1',
} as const;

export const TABS = [
  { id: 'meditar', label: 'Meditar', icon: '🧘‍♂️' },
  { id: 'musica', label: 'Música', icon: '🎵' },
  { id: 'diario', label: 'Diario', icon: '📔' },
  { id: 'mural', label: 'Mural', icon: '🖼️' },
  { id: 'aburrimiento', label: 'Aburrimiento', icon: '⏳' },
  { id: 'ajustes', label: 'Ajustes', icon: '⚙️' },
] as const;

export const MEDITATION_PROMPTS = [
  '¿Qué cosas consideras absolutamente verdaderas sobre ti mismo?',
  '¿Qué es para ti el éxito y qué crees que necesitas para alcanzarlo?',
  '¿Qué frase repites sobre tus capacidades o limitaciones?',
  '¿Qué piensas sobre el envejecimiento y la muerte?',
  '¿Qué es para ti la felicidad y qué consideres necesario para ser feliz?',
  '¿Qué emoción te cuesta más aceptar o expresar?',
  '¿Qué aspectos de tu vida sientes que controlas y cuáles escapan de tu control?',
  '¿Qué harías si supieras que nadie te va a juzgar?',
  '¿Qué necesitas soltar para sentirte más ligero?',
  '¿Qué significado le das al concepto de "descanso"?',
] as const;

export const GUIDED_MEDITATIONS: Meditation[] = [
  {
    id: 'med-1',
    title: 'Respiración consciente',
    description: 'Una práctica simple de atención a la respiración. Ideal para principiantes.',
    duration: 5,
    category: 'respiracion',
    guide: 'Siéntate cómodamente. Cierra los ojos. Lleva tu atención a la respiración. Inhala... Exhala... Sin forzar, solo observa.',
  },
  {
    id: 'med-2',
    title: 'Wu-Wei: No acción',
    description: 'Inspirada en el Taoísmo. Deja de resistir, fluye con lo que es.',
    duration: 10,
    category: 'wuwei',
    guide: 'Como el agua que se adapta sin perder su esencia, permite que tus pensamientos fluyan sin aferrarte a ellos.',
  },
  {
    id: 'med-3',
    title: 'Escaneo corporal',
    description: 'Recorre tu cuerpo con atención, liberando tensiones.',
    duration: 15,
    category: 'bodyscan',
    guide: 'Comienza por los pies. Siente cada parte de tu cuerpo. Nota las sensaciones sin juzgarlas.',
  },
  {
    id: 'med-4',
    title: 'Presencia plena',
    description: 'Mindfulness: estar aquí, ahora, sin más.',
    duration: 7,
    category: 'mindfulness',
    guide: 'Este momento es el único que existe. No hay nada que resolver, nada que lograr. Solo estar.',
  },
  {
    id: 'med-5',
    title: 'Amor compasivo',
    description: 'Cultiva amabilidad hacia ti mismo y los demás.',
    duration: 12,
    category: 'loving-kindness',
    guide: 'Que esté en paz. Que esté tranquilo. Que me permita descansar. Extiende estos deseos hacia otros.',
  },
];

export const DUMMY_TRACKS: Track[] = [
  // Ambient / Meditación
  {
    id: 'trk-1',
    title: 'Lluvia serena',
    artist: 'Naturaleza',
    url: '',
    length: 600,
    genre: 'Ambient',
  },
  {
    id: 'trk-2',
    title: 'Ondas del océano',
    artist: 'Naturaleza',
    url: '',
    length: 720,
    genre: 'Ambient',
  },
  {
    id: 'trk-3',
    title: 'Bosque al amanecer',
    artist: 'Naturaleza',
    url: '',
    length: 540,
    genre: 'Ambient',
  },
  
  // Piano
  {
    id: 'trk-4',
    title: 'Nocturno en Mi bemol',
    artist: 'Chopin',
    url: '',
    length: 300,
    genre: 'Clásica',
  },
  {
    id: 'trk-5',
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    url: '',
    length: 210,
    genre: 'Clásica',
  },
  {
    id: 'trk-6',
    title: 'Clair de Lune',
    artist: 'Debussy',
    url: '',
    length: 300,
    genre: 'Clásica',
  },
  
  // Moderna / Introspectiva
  {
    id: 'trk-7',
    title: 'Holocene',
    artist: 'Bon Iver',
    url: '',
    length: 337,
    genre: 'Indie Folk',
  },
  {
    id: 'trk-8',
    title: 'Svefn-g-englar',
    artist: 'Sigur Rós',
    url: '',
    length: 600,
    genre: 'Post-Rock',
  },
  {
    id: 'trk-9',
    title: 'The Maker Makes',
    artist: 'Rufus Wainwright',
    url: '',
    length: 198,
    genre: 'Folk',
  },
  {
    id: 'trk-10',
    title: 'Nuvole Bianche',
    artist: 'Ludovico Einaudi',
    url: '',
    length: 342,
    genre: 'Neoclásica',
  },
  
  // Jazz / Instrumental
  {
    id: 'trk-11',
    title: 'Take Five',
    artist: 'Dave Brubeck',
    url: '',
    length: 324,
    genre: 'Jazz',
  },
  {
    id: 'trk-12',
    title: 'Blue in Green',
    artist: 'Miles Davis',
    url: '',
    length: 337,
    genre: 'Jazz',
  },
  {
    id: 'trk-13',
    title: 'Spiegel im Spiegel',
    artist: 'Arvo Pärt',
    url: '',
    length: 540,
    genre: 'Minimalista',
  },
  
  // Electrónica contemplativa
  {
    id: 'trk-14',
    title: 'An Ending (Ascent)',
    artist: 'Brian Eno',
    url: '',
    length: 265,
    genre: 'Ambient',
  },
  {
    id: 'trk-15',
    title: 'Avril 14th',
    artist: 'Aphex Twin',
    url: '',
    length: 122,
    genre: 'Electrónica',
  },
  {
    id: 'trk-16',
    title: 'Nude',
    artist: 'Radiohead',
    url: '',
    length: 254,
    genre: 'Alternative',
  },
  
  // Más contemplativas
  {
    id: 'trk-17',
    title: 'The Blower\'s Daughter',
    artist: 'Damien Rice',
    url: '',
    length: 290,
    genre: 'Folk',
  },
  {
    id: 'trk-18',
    title: 'Mad World',
    artist: 'Gary Jules',
    url: '',
    length: 189,
    genre: 'Alternative',
  },
  {
    id: 'trk-19',
    title: 'Weightless',
    artist: 'Marconi Union',
    url: '',
    length: 480,
    genre: 'Ambient',
  },
  {
    id: 'trk-20',
    title: 'Resonance',
    artist: 'HOME',
    url: '',
    length: 212,
    genre: 'Synthwave',
  },
];

export const DEFAULT_PLAYLISTS = [
  {
    id: 'pl-default-1',
    name: 'Refugio sonoro',
    description: 'Tu primer espacio de calma',
    tracks: [DUMMY_TRACKS[0], DUMMY_TRACKS[4], DUMMY_TRACKS[10]],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pl-default-2',
    name: 'Naturaleza',
    description: 'Sonidos del mundo natural',
    tracks: [DUMMY_TRACKS[0], DUMMY_TRACKS[1], DUMMY_TRACKS[2]],
    createdAt: new Date().toISOString(),
  },
];
