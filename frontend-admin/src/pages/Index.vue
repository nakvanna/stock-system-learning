<template>
  <q-page class="row items-center justify-evenly">
    {{ data }}
    <q-btn label="Click me" @click="dialog.popup_example = true"/>
    <popup-example :dialog.sync="dialog.popup_example" v-model="data"/>
    <tag-input v-model="tag_input" label="tag input"/>
  </q-page>
</template>

<script lang="ts">
import {reactive, ref} from '@vue/composition-api';
import PopupExample from "components/PopupExample.vue";
import TagInput from "components/TagInput.vue";

export default {
  name: 'PageIndex',
  components: {TagInput, PopupExample},
  setup() {
    const dialog = reactive({
      popup_example: false,
    });
    const data = ref();
    const tag_input = ref([{
      "__typename": "VariantOptionType",
      "_id": "5fdc4061f7673e0c66d05fc9",
      "name": "Orange",
      "label": "Orange"
    }, {
      "__typename": "VariantOptionType",
      "_id": "5fdc4061f7673e0c66d05fc8",
      "name": "Pink",
      "label": "Pink"
    }, {
      "__typename": "VariantOptionType",
      "_id": "5fdc4061f7673e0c66d05fc6",
      "name": "White",
      "label": "White"
    }, {"__typename": "VariantOptionType", "_id": "5fdc4061f7673e0c66d05fc7", "name": "Yellow", "label": "Yellow"}]);
    return {dialog, data, tag_input};
  }
};
</script>
