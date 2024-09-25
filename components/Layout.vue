<template>
    <div class="mf-layout-wrapper">
        <div class="mf-header">
            <div class="mf-header-logo">
                
            </div>
            <div class="mf-header-button-controllers">
                <button class="mf-action" @click="minimizeApp()"><img src="../assets/icons/minimize.svg"></button>
                <button class="mf-action" @click="maximizeApp()"><img src="../assets/icons/maximize.svg"></button>
                <button class="mf-action invasive" @click="closeApp()"><img src="../assets/icons/close.svg"></button>
            </div>
        </div>
        <div class="mf-layout">
            <div class="mf-side"></div>
            <div class="mf-main">
            </div>
        </div>
    </div>
</template>

<script>
const fs = require('fs');


export default {
    data() {
        return {

        }
    },
    methods: {
        closeApp() {
            useElectron().titleBarActions.close();
        },
        maximizeApp() {
            useElectron().titleBarActions.toggleMaximize();
        },
        minimizeApp() {
            useElectron().titleBarActions.minimize();
        },
    }
}
</script>