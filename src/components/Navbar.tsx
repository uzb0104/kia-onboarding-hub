import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import admGlobalLogo from '@/assets/adm-global-logo.png';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <img 
              src={admGlobalLogo} 
              alt="ADM Global" 
              className="h-10 transition-transform group-hover:scale-105"
              style={{ mixBlendMode: 'multiply' }}
            />
          </Link>

          <div className="flex items-center space-x-2">
            <Link to="/employees">
              <Button variant="ghost" className="hover:bg-accent">
                {t('nav.employees')}
              </Button>
            </Link>
            <Link to="/departments">
              <Button variant="ghost" className="hover:bg-accent">
                {t('nav.departments')}
              </Button>
            </Link>
            <div className="h-6 w-px bg-border mx-2" />
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
