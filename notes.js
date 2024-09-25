const addons = [
    {
        name: 'WeakAuras',
        icon: 'https://example.com/icon.jpg',
        description: 'An addon',
        images: [
            'https://example.com/image.jpg'
        ],
        uploaded: 'Aug 26 2024',
        author: 'Stanzilla',
        downloads: 202414,
        expansions: [
            'vanilla',
            'tbc',
            'wotlk'
        ],
        downloadLinks: {
            vanilla: 'https://example.com/vanilla',
            tbc: 'https://example.com/tbc',
            wotlk: 'https://example.com/wotlk'
        },
        curseforge: 'https://example.com'
    }
]

const installed = [
    {
        name: 'WeakAuras',
        expansion: 'wotlk'
    },
]

const installations = [
    {
        path: 'C:/Program Files/World of Warcraft/wotlk',
        expansion: 'wotlk',
        icon: 'wotlk'
    },
]

//function for syncing addons
fs.readdir('C:/Program Files (x86)/World of Warcraft/_wotlk_/Interface/AddOns', (e, files) => {
    console.log(files);
})
    


//sync function needs to know expansion that you chose path to and the expansion that it is


//function to write files
fs.writeFileSync('./assets/data/hellohello.json', this.test);