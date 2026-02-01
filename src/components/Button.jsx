import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-light',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
  white: 'bg-white text-primary hover:bg-purple-50',
  'outline-white': 'border-2 border-white text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href, 
  className = '', 
  ...props 
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return <Link to={to} className={baseClasses} {...props}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={baseClasses} {...props}>{children}</a>;
  }

  return <button className={baseClasses} {...props}>{children}</button>;
}
