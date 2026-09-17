import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Brand() {
  return (
    <Link to="/" className="brand">
      <b>agri</b>
      <strong>Connect</strong>
      <small>by AgroVision</small>
    </Link>
  )
}

export function DemoButton({ demo }) {
  const navigate = useNavigate()

  return (
    <button
      className="demo"
      onClick={() => {
        demo()
        navigate('/farmer')
      }}
    >
      🎯 DEMO MODE
    </button>
  )
}

export default function Navbar({ demo }) {
  const { language, setLanguage } = useLanguage()

  const handleLanguageToggle = () => {
    if (language === 'en') {
      setLanguage('hi')
    } else {
      setLanguage('en')
    }
  }

  return (
    <header>
      <Brand />

      <nav>
        <Link to="/forecast">Forecast</Link>
        <Link to="/reverse-mandi">Reverse Mandi</Link>
        <Link to="/schemes">Schemes</Link>
        <Link to="/impact">SIH Project</Link>
      </nav>

      {/* LANGUAGE SWITCH */}
      <button
        type="button"
        className={`language-switch ${
          language === 'hi' ? 'is-hindi' : ''
        }`}
        onClick={handleLanguageToggle}
        title={
          language === 'en'
            ? 'Switch to Hindi'
            : 'Switch to English'
        }
        aria-label={
          language === 'en'
            ? 'Switch to Hindi'
            : 'Switch to English'
        }
      >
        <span>अ</span>

        <b>
          {language === 'en'
            ? 'हिन्दी'
            : 'English'}
        </b>
      </button>

      <DemoButton demo={demo} />

      <Link className="avatar" to="/usertype">
        AS
      </Link>
    </header>
  )
}