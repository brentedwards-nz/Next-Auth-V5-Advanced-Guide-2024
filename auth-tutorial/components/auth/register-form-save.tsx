import { CardWrapper } from "@/components/auth/card-wrapper"

export const RegisterForm = () => {
  return (
    <CardWrapper
    headerLabel="Register"
    backButtonLabel="Login"
    backButtonHref="/auth/login"
    showSocial
    >Register Form</CardWrapper>
  )
}