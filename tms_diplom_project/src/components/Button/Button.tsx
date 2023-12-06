interface ButtonProps {
  children: string,
  className?: string,
  onClick?: () => void
}

export const Button = ({children, className, onClick} : ButtonProps) => {
  return <button className = {className} onClick={onClick}>{ children }</button>
}