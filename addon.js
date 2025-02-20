import pkg from 'stremio-addon-sdk';
const { addonBuilder, serveHTTP } = pkg;
import parseTorrent from 'parse-torrent';

// Datos de los torrents
const torrents = [
    {
        id: 'tt-una-nueva-vida-124',
        title: 'Una Nueva Vida 124',
        magnet: 'magnet:?xt=urn:btih:01b878dee30938e9d0cbf5d0403e227c361bf701&dn=Un%20nueva%20vida%20%5bHDTV%5d%5bCap.124%5d&tr=udp%3a%2f%2ftracker.bittor.pw%3a1337%2fannounce&tr=udp%3a%2f%2f85.17.19.180%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=http%3a%2f%2fopen.acgtracker.com%3a1096%2fannounce&tr=udp%3a%2f%2ftracker.kuroy.me%3a5944%2fannounce&tr=http%3a%2f%2fretracker.gorcomnet.ru%2fannounce&tr=http%3a%2f%2ftracker.kuroy.me%3a5944%2fannounce&tr=http%3a%2f%2f85.17.19.180%2fannounce&tr=udp%3a%2f%2f195.123.209.40%3a80%2fannounce&tr=udp%3a%2f%2ftracker.flashtorrents.org%3a6969%2fannounce&tr=udp%3a%2f%2f185.86.149.205%3a1337%2fannounce&tr=udp%3a%2f%2fmgtracker.org%3a2710%2fannounce&tr=udp%3a%2f%2f74.82.52.209%3a6969%2fannounce&tr=udp%3a%2f%2f213.163.67.56%3a1337%2fannounce&tr=udp%3a%2f%2f178.33.73.26%3a2710%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=http%3a%2f%2ftorrentsmd.com%3a8080%2fannounce&tr=udp%3a%2f%2ftracker.yoshi210.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.vanitycore.co%3a6969%2fannounce&tr=http%3a%2f%2f91.216.110.47%2fannounce&tr=http%3a%2f%2ftracker.yoshi210.com%3a6969%2fannounce&tr=http%3a%2f%2fsecure.pow7.com%2fannounce&tr=http%3a%2f%2fretracker.krs-ix.ru%2fannounce&tr=http%3a%2f%2f59.36.96.77%3a6969%2fannounce&tr=http%3a%2f%2f178.33.73.26%3a2710%2fannounce&tr=http%3a%2f%2ftracker.dutchtracking.com%2fannounce&tr=http%3a%2f%2ftracker.bittorrent.am%2fannounce&tr=udp%3a%2f%2f94.23.183.33%3a6969%2fannounce&tr=http%3a%2f%2fmgtracker.org%3a2710%2fannounce&tr=https%3a%2f%2fwww.wareztorrent.com%2fannounce&tr=http%3a%2f%2fmgtracker.org%3a6969%2fannounce&tr=udp%3a%2f%2f191.101.229.236%3a1337%2fannounce&tr=http%3a%2f%2ftracker.bittor.pw%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.mg64.net%3a6969%2fannounce&tr=http%3a%2f%2f125.227.35.196%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.ex.ua%3a80%2fannounce&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.to%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.sktorrent.net%3a6969%2fannounce&tr=http%3a%2f%2ftracker.dutchtracking.nl%3a80%2fannounce&tr=udp%3a%2f%2fzer0day.ch%3a1337%2fannounce&tr=http%3a%2f%2ftracker.internetwarriors.net%3a1337%2fannounce&tr=http%3a%2f%2ftracker.tvunderground.org.ru%3a3218%2fannounce&tr=udp%3a%2f%2ftracker2.indowebster.com%3a6969%2fannounce&tr=http%3a%2f%2f87.253.152.137%2fannounce&tr=http%3a%2f%2ftracker.tfile.me%2fannounce&tr=http%3a%2f%2f104.28.1.30%3a8080%2fannounce&tr=udp%3a%2f%2f194.106.216.222%3a80%2fannounce&tr=udp%3a%2f%2f107.150.14.110%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%2fannounce&tr=udp%3a%2f%2ftorrent.gresille.org%3a80%2fannounce&tr=http%3a%2f%2ftorrent.gresille.org%2fannounce&tr=http%3a%2f%2ftracker2.wasabii.com.tw%3a6969%2fannounce&tr=http%3a%2f%2ftracker2.itzmx.com%3a6961%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce&tr=udp%3a%2f%2ftracker.filetracker.pl%3a8089%2fannounce&tr=http%3a%2f%2ftracker3.itzmx.com%3a6961%2fannounce&tr=udp%3a%2f%2f5.79.83.193%3a6969%2fannounce&tr=http%3a%2f%2f194.106.216.222%2fannounce&tr=udp%3a%2f%2f151.80.120.114%3a2710%2fannounce&tr=http%3a%2f%2f74.82.52.209%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.grepler.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.uw0.xyz%3a6969%2fannounce&tr=http%3a%2f%2f107.150.14.110%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2fp4p.arenabg.com%3a1337%2fannounce&tr=udp%3a%2f%2f46.4.109.148%3a6969%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=http%3a%2f%2fp4p.arenabg.com%3a1337%2fannounce&tr=http%3a%2f%2fbt2.careland.com.cn%3a6969%2fannounce&tr=http%3a%2f%2f158.69.146.212%3a7777%2fannounce&tr=http%3a%2f%2f87.248.186.252%3a8080%2fannounce&tr=udp%3a%2f%2f188.165.253.109%3a1337%2fannounce&tr=udp%3a%2f%2fshadowshq.eddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2f114.55.113.60%3a6969%2fannounce&tr=http%3a%2f%2f93.92.64.5%2fannounce&tr=http%3a%2f%2ftracker.grepler.com%3a6969%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969&tr=udp%3a%2f%2f9.rarbg.com%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.piratepublic.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.aletorrenty.pl%3a2710%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.skyts.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.port443.xyz%3a6969%2fannounce&tr=udp%3a%2f%2feddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2f185.5.97.139%3a8089%2fannounce&tr=udp%3a%2f%2f89.234.156.205%3a80%2fannounce&tr=udp%3a%2f%2ftracker.eddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2fzer0day.to%3a1337%2fannounce&tr=udp%3a%2f%2f62.138.0.158%3a6969%2fannounce&tr=http%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=udp%3a%2f%2f128.199.70.66%3a5944%2fannounce&tr=http%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.mg64.net%3a2710%2fannounce&tr=http%3a%2f%2f213.159.215.198%3a6970%2fannounce&tr=udp%3a%2f%2f182.176.139.129%3a6969%2fannounce&tr=udp%3a%2f%2f51.254.244.161%3a6969%2fannounce&tr=http%3a%2f%2f157.7.202.64%3a8080%2fannounce&tr=http%3a%2f%2f213.163.67.56%3a1337%2fannounce&tr=udp%3a%2f%2fretracker.lanta-net.ru%3a2710%2fannounce&tr=udp%3a%2f%2f109.121.134.121%3a1337%2fannounce&tr=udp%3a%2f%2fpublic.popcorn-tracker.org%3a6969&tr=udp%3a%2f%2fpublic.popcorn-tracker.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.dutchtracking.nl%2fannounce&tr=http%3a%2f%2ftracker.dutchtracking.com%3a80%2fannounce&tr=http%3a%2f%2ftracker1.wasabii.com.tw%3a6969%2fannounce&tr=http%3a%2f%2ftracker.skyts.net%3a6969%2fannounce&tr=http%3a%2f%2f80.246.243.18%3a6969%2fannounce&tr=http%3a%2f%2f104.28.16.69%2fannounce&tr=udp%3a%2f%2f9.rarbg.to%3a2730%2fannounce&tr=http%3a%2f%2ftracker.flashtorrents.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2f195.123.209.37%3a1337%2fannounce&tr=https%3a%2f%2f104.28.17.69%2fannounce&tr=udp%3a%2f%2ftracker.ilibr.org%3a80%2fannounce&tr=udp%3a%2f%2f91.218.230.81%3a6969%2fannounce&tr=udp%3a%2f%2f5.79.249.77%3a6969%2fannounce&tr=http%3a%2f%2f81.200.2.231%2fannounce&tr=http%3a%2f%2f109.121.134.121%3a1337%2fannounce&tr=http%3a%2f%2f195.123.209.37%3a1337%2fannounce&tr=http%3a%2f%2fpow7.com%3a80%2fannounce&tr=http%3a%2f%2fopen.lolicon.eu%3a7777%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=http%3a%2f%2fbt.henbt.com%3a2710%2fannounce&tr=http%3a%2f%2ft1.pow7.com%2fannounce&tr=http%3a%2f%2f128.199.70.66%3a5944%2fannounce&tr=http%3a%2f%2fretracker.krs-ix.ru%3a80%2fannounce&tr=http%3a%2f%2fthetracker.org%3a80%2fannounce&tr=http%3a%2f%2ftracker.mg64.net%3a6881%2fannounce&tr=http%3a%2f%2f188.165.253.109%3a1337%2fannounce&tr=http%3a%2f%2ftracker.kamigami.org%3a2710%2fannounce&tr=udp%3a%2f%2f168.235.67.63%3a6969%2fannounce&tr=http%3a%2f%2ftracker.baravik.org%3a6970%2fannounce&tr=http%3a%2f%2fbt.pusacg.org%3a8080%2fannounce&tr=http%3a%2f%2fwww.wareztorrent.com%2fannounce&tr=udp%3a%2f%2f62.212.85.66%3a2710%2fannounce&tr=http%3a%2f%2f5.79.83.193%3a2710%2fannounce&tr=http%3a%2f%2f210.244.71.25%3a6969%2fannounce&tr=http%3a%2f%2ftracker.filetracker.pl%3a8089%2fannounce&tr=http%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.me%3a2780%2fannounce&tr=udp%3a%2f%2ftracker.kicks-ass.net%3a80%2fannounce&tr=http%3a%2f%2fp4p.arenabg.ch%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a1337%2fannounce&tr=http%3a%2f%2f173.254.204.71%3a1096%2fannounce&tr=http%3a%2f%2f185.5.97.139%3a8089%2fannounce&tr=udp%3a%2f%2fopen.demonii.si%3a1337%2fannounce&tr=udp%3a%2f%2ftracker1.itzmx.com%3a8080%2fannounce&tr=http%3a%2f%2ftracker.kicks-ass.net%3a80%2fannounce&tr=http%3a%2f%2f5.79.249.77%3a6969%2fannounce&tr=udp%3a%2f%2fshadowshq.yi.org%3a6969%2fannounce&tr=http%3a%2f%2ft2.pow7.com%2fannounce&tr=http%3a%2f%2ftracker.edoardocolombo.eu%3a6969%2fannounce&tr=http%3a%2f%2f114.55.113.60%3a6969%2fannounce&tr=http%3a%2f%2f46.4.109.148%3a6969%2fannounce&tr=udp%3a%2f%2f37.19.5.155%3a2710%2fannounce&tr=udp%3a%2f%2ftracker4.piratux.com%3a6969%2fannounce&tr=udp%3a%2f%2f208.67.16.113%3a8000%2fannounce&tr=http%3a%2f%2f37.19.5.155%3a6881%2fannounce&tr=http%3a%2f%2f210.244.71.26%3a6969%2fannounce&tr=http%3a%2f%2f51.254.244.161%3a6969%2fannounce&tr=http%3a%2f%2ftracker.aletorrenty.pl%3a2710%2fannounce&tr=http%3a%2f%2ftracker.ex.ua%2fannounce&tr=http%3a%2f%2f182.176.139.129%3a6969%2fannounce&tr=http%3a%2f%2f91.218.230.81%3a6969%2fannounce&tr=udp%3a%2f%2fbt.xxx-tracker.com%3a2710%2fannounce&tr=http%3a%2f%2f178.175.143.27%2fannounce&tr=http%3a%2f%2fopen.touki.ru%2fannounce.php&tr=http%3a%2f%2f91.217.91.21%3a3218%2fannounce&tr=http%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=http%3a%2f%2ftracker.ex.ua%3a80%2fannounce&tr=http%3a%2f%2fatrack.pow7.com%2fannounce&tr=http%3a%2f%2f37.19.5.139%3a6969%2fannounce&tr=http%3a%2f%2fwww.wareztorrent.com%3a80%2fannounce&tr=http%3a%2f%2ftracker.calculate.ru%3a6969%2fannounce&tr=http%3a%2f%2ftracker.kicks-ass.net%2fannounce',
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
