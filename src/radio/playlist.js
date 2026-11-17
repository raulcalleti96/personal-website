// "Feliz Navidudu!" — Christmas album announcement.
//
// Only the first song is published for now. Tracks 2-9 are in the private
// Supabase bucket "radio"; to publish one again, put its file name back in `file`.
//
// To publish a song: copy its audio file to public/radio/ and write the file
// name in `file` below (leave it null until the audio exists). Songs play in
// this order and loop back to the first one after the last.
export const ALBUM = {
  title: "Feliz Navidudu!",
  letter:
    "La Navidad es una época de paz, de amor, de compartir momentos. Nos metemos en la treintena, y se han vivido muchas navidades juntos, que mejor que un disco para terminar el año, recordando tanto años de amistad, de risas, que nos llevaremos a la tumba. Feliz Navidudu",
};

export const TRACKS = [
  { title: "Casbabeleadudu", file: "01-casbabeleadudu.mp3" },
  { title: "Noche de Paz, noche de Ping Pong", file: null }, // unpublished: 02-noche-de-paz.mp3,
  { title: "¡Uy, que me estofo!", file: null }, // unpublished: 03-uy-que-me-estofo.mp3,
  { title: "Oh là là, Dudu", file: null }, // unpublished: 04-oh-la-la-dudu.mp3,
  { title: "Mio, Mio", file: null }, // unpublished: 05-mio-mio.mp3,
  { title: "Ah, Jesús", file: null }, // unpublished: 06-ah-jesus.mp3,
  { title: "¡Otra Guinness, que es Navidad!", file: null }, // unpublished: 07-otra-guinness.mp3,
  { title: "Another Christmas…", file: null }, // unpublished: 08-another-christmas.mp3,
  { title: "Edu, ¿Cuándo vienes?", file: null }, // unpublished: 09-edu-cuando-vienes.mp3,
];
