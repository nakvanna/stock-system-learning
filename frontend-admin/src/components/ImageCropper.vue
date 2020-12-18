<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="max-width: 80%">
      <q-card-section class="q-gutter-sm">
        <div class="row q-gutter-sm">
          <div class="col-7 q-gutter-sm">
            <vue-cropper class="full-width" ref="cropper" :aspect-ratio="1" :src="srcImg"/>
          </div>
          <div class="col text-right">
            <q-avatar v-if="cropImg" size="150px" class="shadow-3">
              <q-img :src="cropImg"/>
            </q-avatar>
            <q-avatar v-else size="150px" class="shadow-3">
              <q-img :src="srcImg"/>
            </q-avatar>
          </div>
        </div>
        <div class="row">
          <q-btn-group outline class="col-12 flex flex-center">
            <q-btn @click="zoom(0.2)" size="13px" color="blue-5" dense outline icon="zoom_in"/>
            <q-btn @click="zoom(-0.2)" size="13px" color="blue-5" dense outline icon="zoom_out"/>
            <q-btn @click="move(-10, 0)" size="13px" color="blue-5" dense outline icon="arrow_left"/>
            <q-btn @click="move(10, 0)" size="13px" color="blue-5" dense outline icon="arrow_right"/>
            <q-btn @click="move(0, -10)" size="13px" color="blue-5" dense outline icon="arrow_drop_up"/>
            <q-btn @click="move(0, 10)" size="13px" color="blue-5" dense outline icon="arrow_drop_down"/>
            <q-btn @click="rotate(90)" size="13px" color="blue-5" label="+90deg" dense outline icon="autorenew"
                   no-caps/>
            <q-btn @click="rotate(-90)" size="13px" color="blue-5" label="-90deg" dense outline icon="cached" no-caps/>
            <q-btn @click="cropImage" size="13px" color="blue-5" dense outline icon="crop"/>
            <q-btn @click="reset" size="13px" color="blue-5" dense outline icon="clear_all"/>
          </q-btn-group>
        </div>
        <div class="row flex flex-center">
          <q-btn flat @click="showFileChooser" dense class="full-width bg-blue-1" label="ប្តូររូបភាព" color="blue"/>
        </div>
        <input hidden ref="input" type="file" name="image" accept="image/*" @change="setImage"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="ចាកចេញ" color="negative" v-close-popup/>
        <q-btn flat label="រក្សាទុក" color="primary" v-close-popup @click="onSave" :disable="!isCrop"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import {computed, ref, watch} from '@vue/composition-api';
import {useMutation} from "@vue/apollo-composable";
import shortid from "shortid";
import {create_upload_graphql} from './component.graphql';

export default {
  name: 'ImageCropper',
  components: {
    VueCropper,
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: 'https://i.ibb.co/BthkpNQ/profile-avatar.png'
    },
    uploaded: {
      type: String,
      default: ''
    }
  },
  setup(props: any, {emit}: any) {
    const srcImg = ref(props.imgSrc)
    const isCrop = ref(false)
    const input = ref()
    const cropper = ref()
    const cropImg = ref()
    const data = ref()

    const files = ref()
    const file_mapped = computed(() => {
      return {
        files: Array.isArray(files.value) ? files.value : [files.value]
      }
    })
    const {
      mutate: create
    } = useMutation(create_upload_graphql, () => ({
      variables: {
        files: file_mapped.value.files
      },
      context: {
        hasUpload: true
      }
    }));

    function onSave() {
      create().then(function (data: any) {
        const uploadedImage = data.data.createUpload.files[0]
        emit('cropped', uploadedImage)
        emit('update:uploaded', uploadedImage)
        srcImg.value = uploadedImage
      })
    }

    const dialog = computed({
      get: () => props.value,
      set: (value) => {
        emit("input", value);
      },
    });

    //methods
    function cropImage() {
      const croppedResult = cropper.value.getCroppedCanvas().toDataURL()
      cropImg.value = croppedResult;
      isCrop.value = true
      fetch(croppedResult)
        .then(res => res.blob())
        .then(blob => {
          files.value = new File([blob], shortid.generate() + '.png', {
            type: "image/png"
          })
        })
    }

    function move(offsetX: any, offsetY: any) {
      cropper.value.move(offsetX, offsetY);
    }

    function reset() {
      cropper.value.reset();
      cropImg.value = srcImg.value
    }

    function rotate(deg: any) {
      cropper.value.rotate(deg);
    }

    function setImage(e: any) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          srcImg.value = event.target.result;
          cropper.value.replace(event.target.result);
          cropImg.value = event.target.result
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    }

    function showFileChooser() {
      input.value.click();
    }

    function zoom(percent: any) {
      cropper.value.relativeZoom(percent);
    }

    watch(() => dialog.value, (first, second) => {
      if (first) {
        isCrop.value = false
      }
    });
    return {
      isCrop,
      srcImg,
      input,
      cropper,
      cropImg,
      data,
      dialog,
      onSave,
      cropImage,
      reset,
      showFileChooser,
      zoom,
      move,
      rotate,
      setImage
    }
  }
};
</script>

<style>
</style>
