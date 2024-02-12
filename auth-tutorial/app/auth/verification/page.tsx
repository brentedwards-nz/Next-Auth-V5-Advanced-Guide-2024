"use client";

import { BeatLoader } from "react-spinners"
import { CardWrapper } from "@/components/auth/card-wrapper";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { verifyEmailByToken } from "@/project/actions/verification";
import { useState } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const VerificationPage = () => {
  const [error, setError] = useState<string|undefined>();
  const [success, setSuccess] = useState<string|undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if(!token) {
      setError("Missing token")
      return;
    }

    verifyEmailByToken(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    }).catch(() => {
      setError("Something whent wrong");
    })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit])
  return (
    <CardWrapper
    headerLabel="Confirming your email"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
    showSocial={false}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error &&(<BeatLoader/>)}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
export default VerificationPage;