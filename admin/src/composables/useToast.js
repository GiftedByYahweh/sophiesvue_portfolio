import { ref } from "vue"

const message = ref("")
const type = ref("success")
const visible = ref(false)

let timer = null

export function useToast() {
  function show(msg, toastType) {
    clearTimeout(timer)
    message.value = msg
    type.value = toastType
    visible.value = true
    timer = setTimeout(() => {
      visible.value = false
    }, 3500)
  }

  return {
    message,
    type,
    visible,
    success: (msg) => show(msg, "success"),
    error: (msg) => show(msg, "error"),
    hide: () => {
      visible.value = false
    },
  }
}
