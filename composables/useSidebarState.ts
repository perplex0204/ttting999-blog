/**
 * Composable for managing sidebar state (mobile menu)
 */
export const useSidebarState = () => {
  const isSidebarOpen = useState<boolean>('sidebar-open', () => false)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }
}
