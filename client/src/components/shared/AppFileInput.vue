<script setup>
  import { useTemplateRef } from "vue"
  import AppText from "./AppText.vue"

  const model = defineModel({ default: [] })

  const fileInputElement = useTemplateRef("fileInput")

  const openFileSelectModal = () => fileInputElement.value?.click()

  const handleDrop = (event) => {
    const droppedFiles = event.dataTransfer?.files
    if (droppedFiles) addFiles(droppedFiles)
  }

  const handleFileChange = (event) => {
    const input = event.target
    const selectedFiles = input.files
    if (selectedFiles) addFiles(selectedFiles)
  }

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList)
    model.value = [...newFiles]
  }
</script>

<template>
  <div class="app-file-input">
    <div
      @dragover.prevent
      @dragleave.prevent
      @drop.prevent="handleDrop"
      class="file-field"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        name="file"
        id="fileInput"
        accept="image/*"
        class="hidden-input"
        @change="handleFileChange"
      />
      <label for="fileInput" class="file-label">
        <AppText align="center">
          Drag files here <br />
          or
          <AppText element="span" variant="accent" underline>
            click to upload
          </AppText>
        </AppText>
      </label>
    </div>
  </div>
</template>

<style scoped>
  .app-file-input {
    width: 100%;
    border: 1px dashed var(--accent-color);
    border-radius: 2px;
    display: grid;
    place-items: center;
    position: relative;
  }
  .file-field {
    padding: 40px 60px;
  }
  .file-label {
    cursor: pointer;
    padding: 40px 60px;
  }
  .hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
</style>
