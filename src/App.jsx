import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (start, end, smooth) => start + (end - start) * smooth

function App() {
  const leftRingRef = useRef(null)
  const rightRingRef = useRef(null)
  const haloRef = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const updateRings = () => {
      const progress = clamp((scrollHeight + 120) / (window.innerHeight * 0.9), 0, 1)
      const eased = easeOutCubic(progress)
      const leftX = lerp(26, 50, eased)
      const rightX = lerp(84, 50, eased)
      const topY = lerp(12, 58, eased)
      const scale = lerp(1, 0.94, eased)
      const haloVisible = progress > 0.85

      if (leftRingRef.current) {
        leftRingRef.current.style.transform = `translate(-50%, -50%) translate(${leftX}vw, ${topY}vh) scale(${scale}) rotate(-9deg)`
        leftRingRef.current.style.zIndex = '102'
      }
      if (rightRingRef.current) {
        rightRingRef.current.style.transform = `translate(-50%, -50%) translate(${rightX}vw, ${topY}vh) scale(${scale}) rotate(10deg)`
        rightRingRef.current.style.zIndex = '101'
      }
      if (haloRef.current) {
        haloRef.current.style.opacity = haloVisible ? '1' : '0'
        haloRef.current.style.transform = haloVisible
          ? 'translate(-50%, -50%) scale(1)'
          : 'translate(-50%, -50%) scale(0.68)'
      }
    }

    updateRings()
  }, [scrollHeight])

  return (
    <>
      <section className="ring-hero">
        <div className="ring-stage">
          <div className="ring ring-left" ref={leftRingRef}>
            <img src="/Ringimage.png" alt="Gold wedding ring" />
          </div>
          <div className="ring ring-right" ref={rightRingRef}>
            <img src="/Ringimage.png" alt="Gold wedding ring" />
          </div>
          <div className="ring-halo" ref={haloRef}></div>
          <div className="ring-copy">
            <p>Scroll down to see the rings merge</p>
          </div>
        </div>
      </section>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Wedding invitation motion</h1>
          <p>
            This hero uses a real ring image from the <code>public</code> folder and
            animates along the scroll path.
          </p>
        </div>
      </section>

      <div className="countdown" id="countdown">
        <h2>12 July 2026</h2>
        <p>The rings unite here for our wedding celebration.</p>
      </div>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
