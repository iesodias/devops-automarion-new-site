export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
