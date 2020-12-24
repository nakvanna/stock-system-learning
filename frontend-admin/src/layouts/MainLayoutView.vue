<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-cyan">
      <q-toolbar>
        <q-btn flat round dense icon="fas fa-user-circle"/>
        <q-space/>
        <q-btn flat round dense icon="sim_card" class="q-mr-xs"/>
        <div class="q-pa-md q-gutter-sm">
          <q-btn dense flat round icon="fas fa-cart-plus" class="q-ml-md">
            <q-badge color="red" floating>
              0
            </q-badge>
          </q-btn>
        </div>
      </q-toolbar>

      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Home" icon="home"/>
          <q-breadcrumbs-el label="View" icon="widgets"/>
          <q-breadcrumbs-el label="Sale"/>
        </q-breadcrumbs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

export default {
  name: 'MainLayoutView',
};
</script>
