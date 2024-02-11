import { FaExclamationTriangle } from "react-icons/fa";
import { CardWrapper } from "./card-wrapper";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import {
  Card,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


const ErrorCard = () => {
  return <CardWrapper
    headerLabel="Oops, something went wrong"
    backButtonLabel="Back to login" 
    backButtonHref="/auth/login"
    showSocial={false}
  >
    <div className="w-full flex items-center justify-center">
      <ExclamationTriangleIcon className="text-red-600 h-10 w-10"/>
    </div>
  </CardWrapper>
}

export default ErrorCard;