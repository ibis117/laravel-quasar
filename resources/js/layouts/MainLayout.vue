<template>
    <q-layout view="hHh Lpr lff">
        <q-header bordered class="bg-white">
            <q-toolbar class="bg-white text-dark" >

                <q-toolbar-title>
                    Godam
                </q-toolbar-title>

                <div>
                    Profile
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            :breakpoint="500"
            :mini="miniState"
            :width="240"
            bordered
            show-if-above
            @mouseout="miniState = true"
            @mouseover="miniState = false"
        >
            <q-list>
                <MenuLink
                    v-for="link in linksList"
                    :key="link.title"
                    v-bind="link"
                />
                <div class="q-mb-lg"></div>

            </q-list>
        </q-drawer>
        <q-page-container>
            <slot />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import MenuLink from "../components/MenuLink.vue";


const linksList = [
    {title: 'Dashboard', icon: 'dashboard', link: '/'},
    {title: 'Profile', icon: 'pages', link: '/social-profiles'},
    {title: 'Message', icon: 'chat_bubble', link: '/social-conversations'},
    {title: 'Feeds', icon: 'feed', link: '/social-feeds'},
]
const leftDrawerOpen = ref(false)
const miniState = ref(true)


</script>

<style scoped>
.scroll::-webkit-scrollbar {
    display: none;
}


::-webkit-scrollbar {
    width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #eee;
}


/* Handle */
::-webkit-scrollbar-thumb {
    background: #fff;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}



</style>
