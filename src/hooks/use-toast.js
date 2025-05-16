"use client"

import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

let count = 0
const toasts = []

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const addToast = (toast) => {
  toasts.push({ ...toast, id: genId() })
  dispatchChange()
}

const removeToast = (id) => {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    dispatchChange()
  }
}

const updateToast = (id, toast) => {
  const index = toasts.findIndex((t) => t.id === id)
  if (index > -1) {
    toasts[index] = { ...toasts[index], ...toast }
    dispatchChange()
  }
}

const dispatchChange = () => {
  window.dispatchEvent(new CustomEvent("toast-change", { detail: toasts }))
}

export function useToast() {
  const [localToasts, setLocalToasts] = useState([])

  useEffect(() => {
    setLocalToasts([...toasts])
    
    const handleChange = (e) => {
      setLocalToasts([...e.detail])
    }

    window.addEventListener("toast-change", handleChange)
    return () => window.removeEventListener("toast-change", handleChange)
  }, [])

  return {
    toasts: localToasts,
    toast: (props) => {
      const id = genId()
      const dismiss = () => removeToast(id)
      
      const newToast = {
        id,
        ...props,
        dismiss,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      }
      
      addToast(newToast)
      return { id, dismiss, update: (props) => updateToast(id, { ...props, id }) }
    },
    dismiss: (id) => removeToast(id),
    update: updateToast,
  }
} 