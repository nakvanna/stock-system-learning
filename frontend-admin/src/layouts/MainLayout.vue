<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen"
        />

        <q-toolbar-title>
          ផ្ទាំង ADMIN
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      dark
      :mini="miniState"
      :mini-width="100"
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="400"
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item class="text-bold text-black">
            មីនុយ
          </q-item>
          <q-item :to="item.to"
                  exact
                  clickable
                  v-ripple
                  v-for="(item,index) in menus"
                  :key="index"
                  :active="getActive===item.to.replace('/','')"
          >
            <q-item-section
              avatar>
              <q-icon :name="item.icon"
                      size="30px"
                      :class="miniState && !$q.screen.lt.md?'q-mx-auto q-mb-xs':''"/>
              <div v-if="miniState && !$q.screen.lt.md"
                   class="text-bold">
                {{ item.mini_label }}
              </div>
            </q-item-section>

            <q-item-section>
              <div v-if="!miniState"
                   class="text-bol">
                {{ item.label }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from '@vue/composition-api';
import {MainLayoutInterface} from "layouts/MainLayoutInterface";

export default defineComponent({
  name: 'MainLayout',
  setup(prop, context) {
    function leftDrawerOpen(): void {
      miniState.value = !miniState.value
      if (context.root.$q.screen.lt.md) {
        drawer.value = !drawer.value
        if (drawer.value) {
          miniState.value = false
        }
      }
    }

    const drawer = ref(false)
    const miniState = ref(true)
    const menus = ref<MainLayoutInterface[]>([
      {
        to: '/',
        icon: 'fas fa-home',
        label: 'ផ្ទាំងដើម',
        mini_label: 'ផ្ទាំងដើម'
      },{
        to: '/brands',
        icon: 'fas fa-home',
        label: 'មូដទំនិញ',
        mini_label: 'មូដទំនិញ'
      },{
        to: '/settings',
        icon: 'fas fa-cog',
        label: 'ការកំណត់',
        mini_label: 'ការកំណត់'
      },
    ])
    //computed
    const getActive = computed(() => context.root.$route.meta)
    return {leftDrawerOpen, drawer, miniState, menus, getActive}
  }
});
</script>
