import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { translateText } from './translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agriconnect-language') || 'en'
  })

  // --------------------------------------------------
  // CHANGE LANGUAGE
  // --------------------------------------------------

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage)
    localStorage.setItem('agriconnect-language', newLanguage)
  }

  // --------------------------------------------------
  // TRANSLATE A SINGLE TEXT NODE
  // --------------------------------------------------

  const translateNode = node => {
    if (!node || node.nodeType !== Node.TEXT_NODE) {
      return
    }

    const parent = node.parentElement

    if (!parent) {
      return
    }

    // Don't translate scripts, styles or inputs
    const tag = parent.tagName

    if (
      tag === 'SCRIPT' ||
      tag === 'STYLE' ||
      tag === 'NOSCRIPT'
    ) {
      return
    }

    const text = node.textContent

    if (!text || !text.trim()) {
      return
    }

    const translated = translateText(text, language)

    if (translated !== text) {
      node.textContent = translated
    }
  }

  // --------------------------------------------------
  // TRANSLATE INPUT PLACEHOLDERS / VALUES
  // --------------------------------------------------

  const translateAttributes = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    if (element.hasAttribute('placeholder')) {
      const original = element.getAttribute('placeholder')

      if (original) {
        element.setAttribute(
          'placeholder',
          translateText(original, language),
        )
      }
    }

    if (
      element.tagName === 'BUTTON' &&
      element.hasAttribute('title')
    ) {
      const title = element.getAttribute('title')

      if (title) {
        element.setAttribute(
          'title',
          translateText(title, language),
        )
      }
    }

    if (element.hasAttribute('aria-label')) {
      const ariaLabel = element.getAttribute('aria-label')

      if (ariaLabel) {
        element.setAttribute(
          'aria-label',
          translateText(ariaLabel, language),
        )
      }
    }
  }

  // --------------------------------------------------
  // TRANSLATE WHOLE PAGE
  // --------------------------------------------------

  const translatePage = () => {
    if (language === 'en') {
      return
    }

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    )

    const textNodes = []

    let node

    while ((node = walker.nextNode())) {
      textNodes.push(node)
    }

    textNodes.forEach(translateNode)

    const elements = document.body.querySelectorAll('*')

    elements.forEach(translateAttributes)
  }

  // --------------------------------------------------
  // AUTOMATIC TRANSLATION
  // --------------------------------------------------

  useEffect(() => {
    if (!document.body) {
      return
    }

    // Small delay allows React to finish rendering
    const timer = setTimeout(() => {
      translatePage()
    }, 50)

    return () => {
      clearTimeout(timer)
    }
  }, [language])

  // --------------------------------------------------
  // WATCH FOR NEW REACT CONTENT
  // --------------------------------------------------

  useEffect(() => {
    if (language === 'en') {
      return
    }

    let translating = false

    const observer = new MutationObserver(mutations => {
      if (translating) {
        return
      }

      const newNodes = []

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          newNodes.push(node)
        })
      })

      if (newNodes.length === 0) {
        return
      }

      translating = true

      newNodes.forEach(node => {
        // Text node
        if (node.nodeType === Node.TEXT_NODE) {
          translateNode(node)
          return
        }

        // Element node
        if (node.nodeType === Node.ELEMENT_NODE) {
          translateAttributes(node)

          const walker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
          )

          const textNodes = []

          let textNode

          while ((textNode = walker.nextNode())) {
            textNodes.push(textNode)
          }

          textNodes.forEach(translateNode)

          node
            .querySelectorAll?.('*')
            .forEach(translateAttributes)
        }
      })

      translating = false
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [language])

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        changeLanguage,
        isHindi: language === 'hi',
        isEnglish: language === 'en',
        translateText: text =>
          translateText(text, language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}