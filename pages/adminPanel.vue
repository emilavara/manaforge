<template>
    <div class="mf-admin-panel-container">
        <div class="mf-admin-panel-addonlist">
            <apAddonCard
            :class="selectedAddon === addon ? 'active' : ''"
            @click="selectAddon(index)"
            v-for="(addon, index) in addonList" :key="addon.id"
            :name="addon.name"
            :description="addon.description"
            :author="addon.author"
            :images="addon.images.length"
            :downloadLinks="Object.keys(addon.downloadLinks).length"
            :expansions="addon.expansions"
            />
        </div>
        <div class="mf-admin-panel-fields-container">
            <!-- {{selectedAddon}} -->
            <p>Name</p>
            <input v-model="selectedAddon.name" class="ap-text-input" placeholder="Name" type="text">
            <p>Description</p>
            <textarea v-model="selectedAddon.description" cols="30" rows="10"></textarea>
            <p>Links</p>
            <input v-for="link in selectedAddon.downloadLinks" :value="link" type="text" class="ap-text-input links">
            <button @click="addLink()">Add Link</button>
            <p>Images</p>
            <input v-for="image in selectedAddon.images" :value="image" type="text" class="ap-text-input images">
            <button @click="addImage()">Add Image</button>
        </div>
    </div>
</template>

<script>
import addons from '~/assets/data/addons.json'
// const fs = require('fs');

export default {
    data() {
        return {
            addonList: addons,
            addonObj: {
                name: 'name',
                icon: 'icon',
                description: 'description',
                images: [
                    'images',
                ],
                uploaded: 'uploaded',
                downloads: 'downloads',
                expansions: [
                    ''
                ],
                downloadLinks: {
                    vanilla: '',
                    tbc: '',
                    wotlk: '',
                    cata: '',
                    mop: ''
                }
            },
            selectedAddon: ''
        }
    },
    methods: {
        selectAddon(i) {
            this.selectedAddon = addons[i]
        },
        saveAddon() {
            //take addonObj and append it to addonList

            //save the addonList file

            //refresh the thingy
        },
        addLink() {
        }
    }
}
</script>
