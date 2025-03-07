import pkg from 'stremio-addon-sdk';
const { addonBuilder, serveHTTP } = pkg;
import parseTorrent from 'parse-torrent';

// Datos de los torrents
const torrents = [
    {
        id: 'tt-una-nueva-vida-126',
        title: 'Una Nueva Vida 126',
        magnet: 'magnet:?xt=urn:btih:7c5c6b1ebc256cf3f28a29cda488a3ba173651d1&dn=Una%20nueva%20vida%20%5BHDTV%5D%5BCap.126%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker2.dler.org%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tryhackx.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.theoks.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.skynetcloud.site%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.qu.ax%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.ololosh.space%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.gmi.gd%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.gigantino.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filemail.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.darkness.services%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.0x7c0.com%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce',
        poster: 'https://pics.filmaffinity.com/Una_nueva_vida_Serie_de_TV-535836774-large.jpg',
        description: 'Episodio 24 de la serie "Una Nueva Vida".',
        type: 'movie'
    }
];

const builder = new addonBuilder({
    id: 'org.myexampleaddon',
    version: '1.0.0',
    name: 'Addon para Telenovelas',
    description: 'Tu mejor addon para telenovelas',
    catalogs: [
        {
            type: 'movie',
            id: 'una-nueva-vida-catalog',
            name: 'Una Nueva Vida',
            extra: [{ name: 'search', isRequired: false }]
        }
    ],
    resources: ['stream', 'meta', 'catalog'],
    types: ['movie'],
    idPrefixes: ['tt']
});

// Manejador de metadatos
builder.defineMetaHandler((args) => {
    const torrent = torrents.find(t => t.id === args.id);
    return Promise.resolve({
        meta: torrent ? {
            id: torrent.id,
            type: torrent.type,
            name: torrent.title,
            poster: torrent.poster,
            description: torrent.description
        } : null
    });
});

// Manejador de streams
builder.defineStreamHandler((args) => {
    console.log('Stream handler args:', args);
    const torrent = torrents.find(t => t.id === args.id);
    if (!torrent) {
        console.log('No torrent found for ID:', args.id);
        return Promise.resolve({ streams: [] });
    }
    console.log('Found torrent:', torrent);

    const infoHash = torrent.magnet.match(/btih:([a-fA-F0-9]+)/)?.[1];
    if (!infoHash) {
        console.log('No infoHash found in magnet link.');
        return Promise.resolve({ streams: [] });
    }

    return Promise.resolve({
        streams: [{
            title: torrent.title,
            infoHash,
            fileIdx: 0,
            type: 'torrent'
        }]
    });
});

// Manejador de catálogo
builder.defineCatalogHandler((args) => {
    console.log('Catalog handler args:', args);
    if (args.type === 'movie' && args.id === 'una-nueva-vida-catalog') {
        return Promise.resolve({
            metas: torrents.map(t => ({
                id: t.id,
                type: t.type,
                name: t.title,
                poster: t.poster,
                description: t.description
            }))
        });
    }
    return Promise.resolve({ metas: [] });
});

// Iniciar el servidor HTTP
serveHTTP(builder.getInterface(), { port: process.env.PORT || 5000 });
