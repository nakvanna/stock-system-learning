<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section class="q-pb-none">
        <div class="row">
          <q-tabs
            dense
            align="left"
            inline-label
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/other-settings" label="ប្រភេទទំនិញ" exact/>
            <q-route-tab to="/other-settings/sub-categories" label="ប្រភេទទំនិញរង" exact/>
            <q-route-tab to="/other-settings/brands" label="ម៉ូដទំនិញ" exact/>
          </q-tabs>
          <q-space/>
          <!--Right Tab-->
          <q-tabs
            dense
            align="left"
            inline-label
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/settings" icon="fas fa-arrow-alt-circle-left"/>
          </q-tabs>
        </div>
        <q-separator/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <router-view/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import DataTable from 'components/DataTable.vue';

export default {
  name: 'TypeofIndex',
  components: {DataTable},
};
</script>
