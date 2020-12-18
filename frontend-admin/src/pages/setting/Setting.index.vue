<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section class="q-pb-none">
        <div class="row">
          <!--Left Tab-->
          <q-tabs
            dense
            align="left"
            inline-label
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/settings" label="កត់ឈ្មោះទំនិញ" exact/>
            <q-route-tab to="/settings/sku" label="កំណត់ទំនិញ" exact/>
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
            <q-route-tab to="/other-settings" label="កំណត់ផ្សេងៗ"/>
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
<script>
export default {
  name: "Setting.index"
}
</script>

<style scoped>

</style>
