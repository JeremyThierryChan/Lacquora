import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)
  const isNavScrolled = ref(false)
  const activeMegaMenu = ref<string | null>(null)

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  function setNavScrolled(scrolled: boolean) {
    isNavScrolled.value = scrolled
  }

  function setActiveMegaMenu(key: string | null) {
    activeMegaMenu.value = key
  }

  return {
    isMobileMenuOpen,
    isNavScrolled,
    activeMegaMenu,
    toggleMobileMenu,
    closeMobileMenu,
    setNavScrolled,
    setActiveMegaMenu,
  }
})
