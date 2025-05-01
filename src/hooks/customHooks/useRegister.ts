import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import * as yup from "yup"
import { IRegister } from "@/types/auth"
import authServices from "@/services/auth.service"

const registerSchema = yup.object({
    fullname: yup.string().required("Please input your fullname"),
    username: yup.string().required("Please input your username"),
    email: yup.string().email("Invalid email").required("Please input your email"),
    password: yup
        .string()
        .min(8, "Minimal 8 character")
        .required("Please input your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Password not match")
        .required("Please input your password confirmation"),
})

const useRegister = () => {
    const router = useRouter();
    // const { setToaster } = useContext(ToasterContext);
    // const [visiblePassword, setVisiblePassword] = useState({
    //     password: false,
    //     confirmPassword: false,
    // });

    // const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    //     setVisiblePassword({
    //         ...visiblePassword,
    //         [key]: !visiblePassword[key],
    //     });
    // };

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    };

    const { mutate: mutateRegister, isPending: isPendingRegister } =
        useMutation({
            mutationFn: registerService,
            onError: (error: Error) => {
                // setToaster({
                //     type: "error",
                //     message: "username or email already exist",
                // });r
                setError("root", {
                    type: "server",
                    message: error.message || "Login failed. Please try again.",
                })
            },
            onSuccess: () => {
                reset();
                // setToaster({
                //     type: "success",
                //     message: "Register success",
                // });
                router.push("/auth/login");
            },
        });

    const handleRegister = (data: IRegister) => mutateRegister(data);

    return {
        // visiblePassword,
        // handleVisiblePassword,
        control,
        handleSubmit,
        errors,
        handleRegister,
        isPendingRegister,
    };
};

export default useRegister;