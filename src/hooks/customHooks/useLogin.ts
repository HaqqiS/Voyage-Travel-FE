import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import * as yup from "yup"
import { ILogin } from "@/types/auth"
import { signIn } from "next-auth/react"

const loginSchema = yup.object({
    identifier: yup.string().required("Please enter your email or username"),
    password: yup.string().min(8, "Min 8 character").required("Please enter your password"),
})

const useLogin = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    // Build callback URL properly
    const callbackUrl = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname || "/"

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    })

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        })

        if (result?.error) {
            // Provide more specific error message based on status code
            if (result.status === 401) {
                throw new Error("Your email/username or password is incorrect")
            } else {
                throw new Error(result.error || "Login failed. Please try again.")
            }
        }

        return result
    }

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError: (error: Error) => {
            // Set a specific error message from the error object
            setError("root", {
                type: "server",
                message: error.message || "Login failed. Please try again.",
            })
        },
        onSuccess: () => {
            // Redirect first, then reset form to avoid UI flash
            router.push(callbackUrl)
            reset()
        },
    })

    const handleLogin = (data: ILogin) => mutateLogin(data)

    return {
        control,
        handleSubmit,
        errors,
        handleLogin,
        isPendingLogin,
    }
}

export default useLogin
