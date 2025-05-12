import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
    title: yup.string().required("Please input title"),
    description: yup.string().required("Please input description"),
    slug: yup.string().required("Please input slug"),
    destination: yup.string().required("Please input destination"),
    duration: yup.number().required("Please input duration"),
    maxParticipant: yup.number().required("Please input max participant"),
    price: yup.object().shape({
        adult: yup.number().required("Please input adult price"),
        child: yup.number().required("Please input child price"),
    }),
});

const useInfoTab = () => {
    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo,
        watch: watchUpdateInfo,
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
    });

    return {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        watchUpdateInfo
    };
};

export default useInfoTab;
