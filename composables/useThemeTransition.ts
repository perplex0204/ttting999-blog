/**
 * Composable for theme transition with circular reveal animation
 * Uses View Transitions API for smooth theme switching effect
 */

export const useThemeTransition = () => {
  /**
   * Toggle theme with circular reveal animation from click position
   * @param event - Mouse click event to get cursor position
   * @param colorMode - Nuxt color mode composable
   */
  const toggleThemeWithTransition = async (
    event: MouseEvent,
    colorMode: any
  ) => {
    // Check if browser supports View Transitions API
    // @ts-ignore - View Transitions API is not yet in TypeScript definitions
    if (!document.startViewTransition) {
      // Fallback: directly toggle theme without animation
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      return
    }

    // Get click position
    const x = event.clientX
    const y = event.clientY

    // Calculate the maximum distance from click position to viewport edges
    // This will be the radius of the expanding circle
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Set CSS custom properties for the animation
    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
    document.documentElement.style.setProperty('--r', `${endRadius}px`)

    // Start the view transition
    // @ts-ignore - View Transitions API is not yet in TypeScript definitions
    const transition = document.startViewTransition(() => {
      // Toggle theme preference inside the transition callback
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    })

    // Wait for transition to be ready
    await transition.ready
  }

  return {
    toggleThemeWithTransition
  }
}
