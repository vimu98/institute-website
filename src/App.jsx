import { useState, useEffect, useRef } from 'react'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  ChevronDown,
  GraduationCap,
  Users,
  Award,
  BookOpen
} from 'lucide-react'
import instituteLogo from './assets/Logo.png'
import heroBackground01 from './assets/hero-background-01.jpg'
import heroBackground02 from './assets/hero-background-02.jpg'
import heroBackground03 from './assets/hero-background-03.jpg'
import heroImg01 from './assets/hero-img-01.jpg'
import heroImg02 from './assets/hero-img-02.jpg'
import heroImg03 from './assets/hero-img-03.jpg'
import './App.css'
import certificatesData from './data/certificates.json'
import brandLogo from './assets/logo.png'

// Local logo assets for brands not reliably available via CDN
import windsurfLogo from './assets/logos/windsurf.svg'
import cursorLogo from './assets/logos/cursor.svg'
import ganacheLogo from './assets/logos/ganache.svg'
import deepseekLogo from './assets/logos/deepseek.svg'
import cicdLogo from './assets/logos/cicd.svg'
import geminiLogo from './assets/logos/gemini.svg'
import skillfulProfessionalsImg from './assets/logos/skillfull -proffetionals.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactHint, setShowContactHint] = useState(false)
  const hintTimerRef = useRef(null)
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
  const [toast, setToast] = useState({ visible: false, text: '', variant: 'info' })
  const [aboutImageIndex, setAboutImageIndex] = useState(0)
  // Verify route state
  const [verifyId, setVerifyId] = useState(null)

  // Social media links (update these to your official pages)
  const socialLinks = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://www.linkedin.com/company/',
    youtube: 'https://www.youtube.com/@'
  }

  // WhatsApp config and handler (full international format number)
  const whatsappNumber = '+94751107119'
  const showToast = (text, variant = 'info') => {
    setToast({ visible: true, text, variant })
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast({ visible: false, text: '', variant }), 2500)
  }
  const sendWhatsAppFromForm = () => {
    const form = document.getElementById('contactForm')
    if (!form) return
    const nameInput = form.querySelector('input[placeholder="Your Name"]')
    const msgTextarea = form.querySelector('textarea[placeholder="Your Message"]')
    const name = nameInput.value.trim()
    const message = msgTextarea.value.trim()
    if (!name) {
      showToast('Please enter your name.', 'error')
      nameInput.focus()
      return
    }
    if (!message) {
      showToast('Please enter your message.', 'error')
      msgTextarea.focus()
      return
    }
    const text = encodeURIComponent(`New inquiry (Website)\n\nName: ${name}\n\nMessage:\n${message}`)
    const phone = whatsappNumber.replace(/[^+\d]/g, '').replace(/^\+/, '')
    const url = `https://wa.me/${phone}?text=${text}`
    window.open(url, '_blank')
    showToast('Opening WhatsApp…', 'success')
  }

  const courseTitles = [
    "in Programming Languages ",
    "in Databases", 
    "in DevOps",
    "in Front End Technologies",
    "in Back End Technologies",
    "in Web Security",
    "in Artificial Intelligence",
    "in Web 3 Applications"
  ]

  // Scroll to Contact and show 5s animated hint
  const scrollToContactWithHint = () => {
    scrollToSection('contact')
    setShowContactHint(true)
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current)
    }
    hintTimerRef.current = setTimeout(() => setShowContactHint(false), 5000)
  }

  // Cleanup hint timer on unmount
  useEffect(() => {
    return () => {
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current)
      }
    }
  }, [])

  const heroImages = [
    heroImg01,
    heroImg02,
    heroImg03
  ]

  const heroBackgrounds = [
    heroBackground01,
    heroBackground02,
    heroBackground03
  ]

  // --- Verify Certificate: route parsing and navigation ---
  const parseVerifyFromLocation = () => {
    const path = window.location.pathname || ''
    // Match /verify/certificate/id=XYZ
    const m = path.match(/^\/verify\/certificate\/id=(.+)$/)
    if (m && m[1]) return decodeURIComponent(m[1])
    // Also accept /verify/certificate?id=XYZ
    const params = new URLSearchParams(window.location.search)
    const q = params.get('id')
    return q ? decodeURIComponent(q) : null
  }

  const navigateToVerify = (id) => {
    const target = `/verify/certificate/id=${encodeURIComponent(id.trim())}`
    window.history.pushState({}, '', target)
    setVerifyId(id.trim())
  }

  useEffect(() => {
    const id = parseVerifyFromLocation()
    setVerifyId(id)
    const onPopState = () => setVerifyId(parseVerifyFromLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseIndex((prevIndex) => 
        prevIndex === courseTitles.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [courseTitles.length])

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 7000)

    return () => clearInterval(imageInterval)
  }, [heroImages.length])

  // Our Vision slideshow (5s crossfade)
  useEffect(() => {
    const aboutInterval = setInterval(() => {
      setAboutImageIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(aboutInterval)
  }, [heroImages.length])

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        prevIndex === heroBackgrounds.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(backgroundInterval)
  }, [heroBackgrounds.length])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'courses', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const courses = [
    {
      id: 1,
      title: "Java SE EE & Spring Boot",
      duration: "4 Months",
      level: "Certificate",
      description: "Learn Java fundamentals, object-oriented programming, and build full-stack web applications using Spring Boot and REST APIs.",
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Advanced Python For AI",
      duration: "6 Weeks",
      level: "Certificate",
      description: "Master Python for artificial intelligence, covering machine learning algorithms, data processing, and AI model development.",
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Next.js Fullstack Development",
      duration: "6 Weeks",
      level: "Certificate",
      description: "Build modern full-stack applications using Next.js, integrating APIs, databases, and server-side rendering for high-performance web apps.",
      icon: <Award className="w-8 h-8" />
    }
    
  ]
  // If on verify route, render the verification page only
  if (verifyId !== null) {

    const normalized = (verifyId || '').trim().toLowerCase()
    const foundCert = certificatesData.find(c => (c.id || '').toLowerCase() === normalized)
    const isValid = !!foundCert

    return (
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <span className="logo-text">
                <span className="logo-innovative">
                  <span className="logo-i-mark">
                    <span className="i-letter" aria-label="i">i</span>
                    <span className="i-cap" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#e11d48" d="M4 22l28-10 28 10-28 10-28-10zm6 9v10c0 6 10 11 22 11s22-5 22-11V31l-22 8-22-8z"/>
                        <circle cx="12" cy="45" r="4" fill="#e11d48"/>
                      </svg>
                    </span>
                  </span>
                  <span className="logo-rest">nnovative</span>
                </span>
                <span className="logo-ict">INSTITUTE OF COMPUTING & TECHNOLOGY</span>
              </span>
            </div>
          </div>
        </nav>

        <main className="verify-page">
          <div className="verify-card">
            <img src={brandLogo} alt="Institute Logo" className="verify-brand" />
            <h1 className="verify-title">Certificate Verification</h1>

            <div className={`verify-status ${isValid ? 'valid' : 'invalid'}`}>
              {isValid ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Verified Certificate
                </>
              ) : (
                'Invalid / Not Found'
              )}
            </div>

            {isValid && (
              <div className="verify-details">
                <div className="detail-row"><span className="label">Certificate ID</span><span className="value">{foundCert.id}</span></div>
                <div className="detail-row"><span className="label">Student Name</span><span className="value">{foundCert.studentName}</span></div>
                <div className="detail-row"><span className="label">Course</span><span className="value">{foundCert.course}</span></div>
                <div className="detail-row"><span className="label">Course Duration</span><span className="value">{foundCert.duration || foundCert.courseDuration || '—'}</span></div>
                <div className="detail-row"><span className="label">Issued On</span><span className="value">{foundCert.issueDate}</span></div>
                <div className="detail-row"><span className="label">Status</span><span className="value">{foundCert.status}</span></div>
                {Array.isArray(foundCert.assessments) && foundCert.assessments.length > 0 && (
                  <div className="assessments">
                    <h3 className="assessments-title">Assessments</h3>
                    <ul className="assessments-list">
                      {foundCert.assessments.map((a, i) => (
                        <li key={i} className="assessment-item">
                          <div className="assessment-main">
                            <span className="assessment-name">{a.name}</span>
                            {a.link && (
                              <a href={a.link} target="_blank" rel="noreferrer" className="assessment-link">Open</a>
                            )}
                          </div>
                          <span className={`status-pill ${a.completed ? 'completed' : 'pending'}`}>
                            {a.completed ? 'Completed' : 'Not Completed'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button
              className="btn btn-outline back-btn"
              onClick={() => { window.history.pushState({}, '', '/'); setVerifyId(null); }}
            >
              ← Back to Site
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">
              <span className="logo-innovative">
                <span className="logo-i-mark">
                  <span className="i-letter" aria-label="i">i</span>
                  <span className="i-cap" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#e11d48" d="M4 22l28-10 28 10-28 10-28-10zm6 9v10c0 6 10 11 22 11s22-5 22-11V31l-22 8-22-8z"/>
                      <circle cx="12" cy="45" r="4" fill="#e11d48"/>
                    </svg>
                  </span>
                </span>
                <span className="logo-rest">nnovative</span>
              </span>
              <span className="logo-ict">INSTITUTE OF COMPUTING & TECHNOLOGY</span>
            </span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </a>
            <a 
              href="#courses" 
              className={`nav-link ${activeSection === 'courses' ? 'active' : ''}`}
              onClick={() => scrollToSection('courses')}
            >
              Courses
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </a>
          </div>

          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        {/* Background Image Layers */}
        <div className="hero-background-layers">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`hero-bg-layer ${index === currentBackgroundIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>

        {/* Left Top Corner Card */}
        <div className="hero-top-left-card">
          {/* Animated Programming Language Logos on Card */}
          <div className="programming-logos-rain-card">
            {/* Pass 1: Ensure every logo appears once, evenly spaced and more visible */}
            {(() => {
              const techLogos = [
                { name: 'HTML', slug: 'html5', color: 'E34F26' },
                { name: 'CSS', slug: 'css3', color: '1572B6', localSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
                { name: 'JS', slug: 'javascript', color: 'F7DF1E' },
                { name: 'Tailwind', slug: 'tailwindcss', color: '38BDF8' },
                { name: 'Java', slug: 'java', color: 'ED8B00', localSrc: 'https://www.vectorlogo.zone/logos/java/java-icon.svg' },
                { name: 'Python', slug: 'python', color: '3776AB' },
                { name: 'MySQL', slug: 'mysql', color: '4479A1' },
                { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
                { name: 'Next.js', slug: 'nextdotjs', color: '000000' },
                { name: 'Spring Boot', slug: 'springboot', color: '6DB33F' },
                { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
                { name: 'React', slug: 'react', color: '61DAFB' },
                { name: 'Angular', slug: 'angular', color: 'DD0031' },
                { name: 'React Native', slug: 'react', color: '61DAFB' },
                { name: 'Android', slug: 'android', color: '3DDC84' },
                { name: 'iOS', slug: 'apple', color: '000000' },
                { name: 'Dart', slug: 'dart', color: '0175C2' },
                { name: 'Flutter', slug: 'flutter', color: '02569B' },
                { name: 'AI', slug: null, color: null },
                { name: 'AWS', slug: 'amazonwebservices', color: 'FF9900' },
                { name: 'GCP', slug: 'googlecloud', color: '4285F4' },
                { name: 'CI/CD', slug: null, color: null, localSrc: cicdLogo },
                { name: 'GitHub', slug: 'github', color: '181717' },
                { name: 'Jenkins', slug: 'jenkins', color: 'D24939' },
                { name: 'Cursor AI', slug: null, color: null, localSrc: cursorLogo },
                { name: 'Windsurf', slug: null, color: null, localSrc: windsurfLogo },
                { name: 'Docker', slug: 'docker', color: '2496ED' },
                { name: 'Kubernetes', slug: 'kubernetes', color: '326CE5' },
                { name: 'IntelliJ', slug: 'intellijidea', color: '000000' },
                { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC', localSrc: 'https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg' },
                { name: 'Pandas', slug: 'pandas', color: '150458' },
                { name: 'OpenCV', slug: 'opencv', color: '5C3EE8' },
                { name: 'C#', slug: 'csharp', color: '239120', localSrc: 'https://cdn.simpleicons.org/csharp/239120' },
                { name: '.NET', slug: 'dotnet', color: '512BD4' },
                { name: 'PHP', slug: 'php', color: '777BB4' },
                { name: 'Laravel', slug: 'laravel', color: 'FF2D20' },
                { name: 'ChatGPT', slug: 'openai', color: '10A37F' },
                { name: 'DeepSeek', slug: null, color: null, localSrc: deepseekLogo },
                { name: 'Gemini', slug: 'googlegemini', color: '1A73E8', localSrc: geminiLogo },
                { name: 'Anthropic MCP', slug: 'anthropic', color: '000000' },
                { name: 'Ollama', slug: 'ollama', color: '000000' },
                { name: 'Vercel', slug: 'vercel', color: '000000' },
                { name: 'Netlify', slug: 'netlify', color: '00C7B7' },
                { name: 'PyCharm', slug: 'pycharm', color: '000000' },
                { name: 'Blockchain', slug: 'blockchaindotcom', color: '121D33' },
                { name: 'Ganache', slug: null, color: null, localSrc: ganacheLogo },
                { name: 'MetaMask', slug: 'metamask', color: 'E2761B', localSrc: 'https://www.vectorlogo.zone/logos/metamaskio/metamaskio-icon.svg' },
                { name: 'Claude', slug: 'anthropic', color: '000000' },
                { name: 'Perplexity', slug: 'perplexity', color: '1F1F1F' },
                { name: 'n8n', slug: 'n8n', color: 'F05A4A' },
                { name: 'Express.js', slug: 'express', color: '000000' }
              ];

              return techLogos.map((tech, idx) => {
                const leftPercent = ((idx + 0.5) / techLogos.length) * 100; // even spacing
                // Deterministic jitter to avoid periodic sync while staying stable across renders
                const seed = Math.sin((idx + 1) * 12.9898) * 43758.5453;
                const r = ((seed % 1) + 1) % 1; // 0..1
                const delay = (idx % 10) * 0.8 - r * 0.7; // allow negative to start mid-flight
                const duration = 10 + (idx % 6) + r * 0.8; // 10..16.8s
                const driftA = 6 + r * 6; // 6px..12px horizontal drift amplitude
                const colorParam = tech.color ? `/${tech.color}` : '';
                const cdnSrc = tech.slug ? `https://cdn.simpleicons.org/${tech.slug}${colorParam}` : null;
                const preferredSrc = tech.localSrc || cdnSrc;
                const fallbackSrcMap = {
                  amazonwebservices: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
                  googlecloud: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg'
                };

                return (
                  <div
                    key={`prominent-${tech.name}`}
                    className={`logo-drop-card prominent`}
                    style={{ left: `${leftPercent}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s`, '--driftA': `${driftA}px` }}
                  >
                    <div className={`programming-logo-card ${(tech.slug || tech.localSrc) ? 'with-img' : ''}`} title={tech.name}>
                      {preferredSrc ? (
                        <img
                          className="logo-img"
                          src={preferredSrc}
                          alt={`${tech.name} logo`}
                          loading="lazy"
                          onError={(e) => {
                            const cdn = cdnSrc;
                            const fallback = tech.slug ? fallbackSrcMap[tech.slug] : null;
                            if (tech.localSrc && cdn && e.currentTarget.src !== cdn) {
                              e.currentTarget.src = cdn;
                            } else if (fallback && e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            } else {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent && !parent.querySelector('span')) {
                                const span = document.createElement('span');
                                span.textContent = tech.name;
                                parent.appendChild(span);
                              }
                            }
                          }}
                        />
                      ) : (
                        <span>{tech.name}</span>
                      )}
                    </div>
                  </div>
                );
              })
            })()}

            {/* Pass 2: Randomized fillers for density */}
            {Array.from({ length: 60 }, (_, i) => {
              // Use Simple Icons CDN for real brand SVGs. For missing brands, fallback to text.
              const techLogos = [
                { name: 'HTML', slug: 'html5', color: 'E34F26' },
                { name: 'CSS', slug: 'css3', color: '1572B6', localSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
                { name: 'JS', slug: 'javascript', color: 'F7DF1E' },
                { name: 'Tailwind', slug: 'tailwindcss', color: '38BDF8' },
                { name: 'Java', slug: 'java', color: 'ED8B00', localSrc: 'https://www.vectorlogo.zone/logos/java/java-icon.svg' },
                { name: 'Python', slug: 'python', color: '3776AB' },
                { name: 'MySQL', slug: 'mysql', color: '4479A1' },
                { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
                { name: 'Next.js', slug: 'nextdotjs', color: '000000' },
                { name: 'Spring Boot', slug: 'springboot', color: '6DB33F' },
                { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
                { name: 'React', slug: 'react', color: '61DAFB' },
                { name: 'Angular', slug: 'angular', color: 'DD0031' },
                { name: 'React Native', slug: 'react', color: '61DAFB' },
                { name: 'Android', slug: 'android', color: '3DDC84' },
                { name: 'iOS', slug: 'apple', color: '000000' },
                { name: 'Dart', slug: 'dart', color: '0175C2' },
                { name: 'Flutter', slug: 'flutter', color: '02569B' },
                { name: 'AI', slug: null, color: null },
                { name: 'AWS', slug: 'amazonwebservices', color: 'FF9900' },
                { name: 'GCP', slug: 'googlecloud', color: '4285F4' },
                { name: 'CI/CD', slug: null, color: null, localSrc: cicdLogo },
                { name: 'GitHub', slug: 'github', color: '181717' },
                { name: 'Jenkins', slug: 'jenkins', color: 'D24939' },
                { name: 'Cursor AI', slug: null, color: null, localSrc: cursorLogo },
                { name: 'Windsurf', slug: null, color: null, localSrc: windsurfLogo },
                { name: 'Docker', slug: 'docker', color: '2496ED' },
                { name: 'Kubernetes', slug: 'kubernetes', color: '326CE5' },
                { name: 'IntelliJ', slug: 'intellijidea', color: '000000' },
                { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC', localSrc: 'https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg' },
                { name: 'Pandas', slug: 'pandas', color: '150458' },
                { name: 'OpenCV', slug: 'opencv', color: '5C3EE8' },
                { name: 'C#', slug: 'csharp', color: '239120', localSrc: 'https://cdn.simpleicons.org/csharp/239120' },
                { name: '.NET', slug: 'dotnet', color: '512BD4' },
                { name: 'PHP', slug: 'php', color: '777BB4' },
                { name: 'Laravel', slug: 'laravel', color: 'FF2D20' },
                { name: 'ChatGPT', slug: 'openai', color: '10A37F' },
                { name: 'DeepSeek', slug: null, color: null, localSrc: deepseekLogo },
                { name: 'Gemini', slug: 'googlegemini', color: '1A73E8', localSrc: geminiLogo },
                { name: 'Anthropic MCP', slug: 'anthropic', color: '000000' },
                { name: 'Ollama', slug: 'ollama', color: '000000' },
                { name: 'Vercel', slug: 'vercel', color: '000000' },
                { name: 'Netlify', slug: 'netlify', color: '00C7B7' },
                { name: 'PyCharm', slug: 'pycharm', color: '000000' },
                { name: 'Blockchain', slug: 'blockchaindotcom', color: '121D33' },
                { name: 'Ganache', slug: null, color: null, localSrc: ganacheLogo },
                { name: 'MetaMask', slug: 'metamask', color: 'E2761B', localSrc: 'https://www.vectorlogo.zone/logos/metamaskio/metamaskio-icon.svg' },
                { name: 'Claude', slug: 'anthropic', color: '000000' },
                { name: 'Perplexity', slug: 'perplexity', color: '1F1F1F' },
                { name: 'n8n', slug: 'n8n', color: 'F05A4A' },
                { name: 'Express.js', slug: 'express', color: '000000' }
              ];

              const tech = techLogos[i % techLogos.length];
              const colorParam = tech.color ? `/${tech.color}` : '';
              const cdnSrc = tech.slug
                ? `https://cdn.simpleicons.org/${tech.slug}${colorParam}`
                : null;
              const preferredSrc = tech.localSrc || cdnSrc;

              // Fallback URLs for brands that may not resolve correctly via Simple Icons CDN
              const fallbackSrcMap = {
                amazonwebservices: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
                googlecloud: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg'
              };

              // Deterministic positions/timings with fractional jitter to avoid periodic sync
              const total = 60;
              const baseLeft = ((i + 0.5) / total) * 100;
              const seed = Math.sin((i + 1) * 78.233) * 951.1357;
              const r = ((seed % 1) + 1) % 1; // 0..1
              const jitter = (r - 0.5) * 6; // -3%..+3%
              const left = Math.min(98, Math.max(2, Math.round(baseLeft + jitter)));
              const duration = 11 + r * 7.3; // 11..18.3s
              const delay = -(r * 9.7 + (i % 5) * 0.33); // varied negative delays
              const driftA = 6 + r * 6; // 6px..12px horizontal drift amplitude
              return (
                <div key={`filler-${i}`} className={`logo-drop-card logo-drop-card-${(i % 20) + 1}`} style={{ left: `${left}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s`, '--driftA': `${driftA}px` }}>
                  <div className={`programming-logo-card ${(tech.slug || tech.localSrc) ? 'with-img' : ''}`} title={tech.name}>
                    {preferredSrc ? (
                      <img
                        className="logo-img"
                        src={preferredSrc}
                        alt={`${tech.name} logo`}
                        loading="lazy"
                        onError={(e) => {
                          const cdn = cdnSrc;
                          const fallback = tech.slug ? fallbackSrcMap[tech.slug] : null;
                          if (tech.localSrc && cdn && e.currentTarget.src !== cdn) {
                            // If local failed, try CDN next
                            e.currentTarget.src = cdn;
                          } else if (fallback && e.currentTarget.src !== fallback) {
                            // Then try a known fallback logo URL
                            e.currentTarget.src = fallback;
                          } else {
                            // Final fallback: show text
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent && !parent.querySelector('span')) {
                              const span = document.createElement('span');
                              span.textContent = tech.name;
                              parent.appendChild(span);
                            }
                          }
                        }}
                      />
                    ) : (
                      <span>{tech.name}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hero-logo">
            <img src={instituteLogo} alt="Institute Logo" className="hero-logo-img" />
          </div>
          <p className="hero-subtitle">
            Welcome to our institute where learning meets excellence <br></br>{' '}
            <span className="animated-text">{courseTitles[currentCourseIndex]}</span>
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('courses')}
            >
              Explore Courses
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>Our Vision</h2>
            <p>Filling the industry gap with skillful professionals</p>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <h3>Creating Skillful Professionals</h3>
              <p>
                We fill the industry gap by developing highly skilled professionals 
                with practical expertise and industry-ready capabilities.
              </p>
              
              <div className="features">
                <div className="feature">
                  <div className="feature-icon">
                    <GraduationCap />
                  </div>
                  <div className="feature-content">
                    <h4>Skill Development</h4>
                    <p>Comprehensive training for professional excellence</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <Users />
                  </div>
                  <div className="feature-content">
                    <h4>Industry Ready</h4>
                    <p>Professionals equipped for immediate employment</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <Award />
                  </div>
                  <div className="feature-content">
                    <h4>Expert Training</h4>
                    <p>Advanced skills for career advancement</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-image">
              <div className="image-placeholder">
                <div className="about-slideshow">
                  {heroImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Our Vision ${idx + 1}`}
                      className={`about-slide ${idx === aboutImageIndex ? 'active' : ''}`}
                      loading="eager"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses">
        <div className="container">
          <div className="section-header">
            <h2>Our Courses</h2>
            <p>Choose from our wide range of academic programs</p>
          </div>
          
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-icon">
                  {course.icon}
                </div>
                <h3>{course.title}</h3>
                <div className="course-badges">
                  <span className="badge badge-online">Online Batch</span>
                </div>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  <span className="level">{course.level}</span>
                </div>
                <p>{course.description}</p>
                <button className="btn btn-outline" onClick={scrollToContactWithHint}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Get in touch with us for any inquiries</p>
            {showContactHint && (
              <div className="contact-hint" role="status" aria-live="polite">
                <span className="finger" aria-hidden>👉</span>
                <span className="hint-text">For more details, contact us</span>
              </div>
            )}
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin />
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p>Kaluthara, Western, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+94 (075) 110-7119</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>iictcall@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form id="contactForm" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <div className="contact-actions">
                  <button type="button" className="btn btn-whatsapp" onClick={sendWhatsAppFromForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.5 0 .2 5.29.2 11.84c0 2.08.54 4.11 1.58 5.91L0 24l6.4-1.67a11.84 11.84 0 0 0 5.67 1.45h.01c6.55 0 11.86-5.29 11.86-11.84 0-3.17-1.24-6.15-3.42-8.46zM12.08 21.2h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.8.99 1.02-3.7-.24-.38a9.9 9.9 0 0 1-1.52-5.28c0-5.46 4.46-9.91 9.94-9.91 2.65 0 5.14 1.03 7.02 2.91a9.87 9.87 0 0 1 2.92 7c0 5.47-4.46 9.92-9.93 9.92zm5.67-7.39c-.31-.16-1.84-.91-2.12-1.02-.28-.1-.48-.16-.68.16-.2.31-.78 1.02-.96 1.23-.18.2-.36.23-.67.08-.31-.16-1.32-.49-2.51-1.56-.93-.83-1.56-1.86-1.75-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.38-.03-.54-.08-.16-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.5-.18 0-.38-.02-.58-.02-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56s1.1 2.97 1.25 3.17c.15.21 2.16 3.29 5.23 4.62.73.32 1.31.51 1.76.65.74.24 1.42.21 1.95.13.59-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36z"/>
                    </svg>
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-text">Innovative Institute of Computing & Technology</span>
              </div>
              <p>Empowering minds, shaping futures through quality education.</p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
                <li><a href="#courses" onClick={() => scrollToSection('courses')}>Courses</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Subscribe & Follow</h4>
              <p>Stay connected with us on social media</p>
              <div className="social-links">
                <a href={socialLinks.facebook} className="social-link facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook />
                </a>
                <a href={socialLinks.instagram} className="social-link instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram />
                </a>
                <a href={socialLinks.linkedin} className="social-link linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
                <a href={socialLinks.youtube} className="social-link youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 iict. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {toast.visible && (
        <div className={`toast toast-${toast.variant}`} role="status" aria-live="polite">{toast.text}</div>
      )}
    </div>
  )
}

export default App
