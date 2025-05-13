import Loading from '@/components/common/loading/Loading'

export const Button = props => {
  //? Props
  const {
    type = 'button',
    isLoading = false,
    children,
    className = '',
    isRounded = false,
    ...restPropps
  } = props

  //? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`text-lg font-bold bg-primary hover:bg-primary-300 button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

export const LoginBtn = ({ children, ...restPropps }) => (
  <Button type="submit" className="mx-auto rounded-3xl w-44 bg-violet-600" {...restPropps}>
    {children}
  </Button>
)

export const SubmitModalBtn = ({ children, ...restPropps }) => (
  <Button
    type="submit"
    className="w-full max-w-xl mx-auto rounded-md btn text-lg lg:w-64 lg:ml-0 bg-violet-500"
    {...restPropps}
  >
    {children}
  </Button>
)