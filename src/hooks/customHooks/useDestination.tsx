import { useParams } from "next/navigation"
import * as yup from "yup"
import useChangeUrl from "../use-change-url"
import destinationSevices from "@/services/destination.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { IDestination } from "@/types/destination"
import { ITour } from "@/types/tour"

const useDestination = ()=>{
    const params = useParams()
    const {currentLimit, currentPage, currentSearch}= useChangeUrl()
    const destinationId = params?.id as string | undefined;

    const getDestination = async ()=> {
        let queryParams = `limit=${currentLimit || '10'}&page=${currentPage || '1'}`;
        if (currentSearch) {
            queryParams += `&search=${currentSearch}`;
        }

        const res = await destinationSevices.getDestinations(queryParams);
        const { data } = res;
        return data;
    }

    const {data: dataDestinations, isLoading: isLoadingDestinations, isRefetching: isRefetchingDestinations, refetch: refetchDestinations} = useQuery({
        queryKey: ["Destinations", currentPage, currentLimit, currentSearch],
        queryFn: () => getDestination(),
    })

    const getDestinationById = async ()=> {
        if (!destinationId) return null;
        const { data } = await destinationSevices.getDestinationById(destinationId);
        return data.data;
    }

    const {data: dataDestinationById, refetch: refetchDestinationById, isLoading: isLoadingDestinationById, isRefetching: isRefetchingDestinationById} = useQuery({
        queryKey: ["DestinationById", destinationId],
        queryFn: getDestinationById,
        enabled: !!destinationId,
    })

    const schemeAddDestination = yup.object({
        title: yup.string().required("Please input destination title"),
        description: yup.string().required("Please input destination description"),
        images: yup.array().of(yup.string()).required("Please input destination image"),
        attractions: yup.array().of(yup.string()).required("Please input destination attraction"),
    })

    const {control, handleSubmit: handleSubmitForm, formState: {errors}, reset, watch, getValues, setValue} = useForm({
        resolver: yupResolver(schemeAddDestination),
    })

    const addDestination = async (payload: IDestination) => {
        const res = await destinationSevices.addDestination(payload);
        return res;
    }

    const {mutate: mutateAddDestination, isPending: isPendingMutateAddDestination, isSuccess: isSuccessMutateAddDestination} = useMutation({
        mutationFn: addDestination,
        onError: (error) => {
            toast(error.message || "Failed to add destination", {
                position: "top-right",
                style: {
                    background: "var(--color-destructive)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
        onSuccess: () => {
            reset();
            toast("Destination added successfully", {
                position: "top-right",
                style: {
                    background: "var(--color-success)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
            refetchDestinations();
        },
    })

    const handleAddDestination = (data: IDestination) => mutateAddDestination(data)

    const updateDestination = async (payload: IDestination)=>{
        const {data} = await destinationSevices.updateDestination(`${destinationId}`, payload);
        return data.data;
    }

    const {mutate: mutateUpdateDestination, isPending: isPendingMutateUpdateDestination, isSuccess: isSuccessMutateUpdateDestination}= useMutation({
        mutationFn: (payload: IDestination)=>updateDestination(payload),
        onError: (error)=>{
            toast(error.message || "Failed to update destination", {
                position: "top-right",
                style: {
                    background: "var(--color-destructive)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
        onSuccess: ()=>{
            refetchDestinationById();
            toast("Destination updated successfully", {
                position: "top-right",
                style: {
                    background: "var(--color-success)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        }
    })

    const handleUpdateDestination = (data: IDestination) => mutateUpdateDestination(data)

    const deleteDestination = async (id: string)=> {
        const res = destinationSevices.deleteDestination(id)
        return res
    }

    const {mutate: mutateDeleteDestination, isPending: isPendingMutateDeleteDestination, isSuccess: isSuccessMutateDeleteDestination}= useMutation({
        mutationFn: deleteDestination,
        onError: (error)=>{
            toast(error.message || "Failed to delete destination", {
                position: "top-right",
                style: {
                    background: "var(--color-destructive)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
        onSuccess: ()=>{
            toast("Destination deleted successfully", {
                position: "top-right",
                style: {
                    background: "var(--color-success)",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
            refetchDestinations();
        }
    })

    const handleDeleteDestination = (id: string)=> mutateDeleteDestination(id)

    return {
        //get all destination
        dataDestinations,
        isLoadingDestinations,
        isRefetchingDestinations,
        refetchDestinations,
        //get destination by id
        dataDestinationById,
        isLoadingDestinationById,
        isRefetchingDestinationById,
        refetchDestinationById,
        //form add destination
        control,
        handleSubmitForm,
        errors,
        reset,
        watch,
        getValues,
        setValue,
        //add destination
        mutateAddDestination,
        isPendingMutateAddDestination,
        isSuccessMutateAddDestination,
        //update destination
        mutateUpdateDestination,
        isPendingMutateUpdateDestination,
        isSuccessMutateUpdateDestination,
        //delete destination
        mutateDeleteDestination,
        isPendingMutateDeleteDestination,
        isSuccessMutateDeleteDestination,
        //handle delete destination
        handleDeleteDestination,
    }
}

export default useDestination;