<script setup>
  import AppText from "./AppText.vue"

  const { multiple = true } = defineProps({ multiple: Boolean })
  const model = defineModel({ default: [] })

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList)
    const result = multiple ? [...newFiles] : [newFiles[0]]
    model.value = result
  }

  const handleDrop = (event) => {
    const droppedFiles = event.dataTransfer?.files
    if (droppedFiles) addFiles(droppedFiles)
  }

  const handleMultipleFiles = (event) => {
    const selectedFiles = event.target.files
    if (selectedFiles) addFiles(selectedFiles)
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
        :multiple="multiple"
        name="file"
        id="fileInput"
        accept="image/*"
        class="hidden-input"
        @change="handleMultipleFiles"
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
