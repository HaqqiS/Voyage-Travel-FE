"use client"
import tourServices from "@/services/tour.service";
import useChangeUrl from "../use-change-url";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { ITour } from "@/types/tour";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useTour = () => {
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const params = useParams();

    // Get the ID and slug from params, handling them as optional
    const tourId = params?.id as string | undefined;
    const tourSlug = params?.slug as string | undefined;

    //get data tours
    const getTours = async () => {
        let queryParams = `limit=${currentLimit || '10'}&page=${currentPage || '1'}`;
        if (currentSearch) {
            queryParams += `&search=${currentSearch}`;
        }

        const res = await tourServices.getTours(queryParams);
        const { data } = res;
        return data;
    };

    const {
        data: dataTours,
        isLoading: isLoadingTours,
        isRefetching: isRefetchingTours,
        refetch: refetchTours,
    } = useQuery({
        queryKey: ["Tours", currentPage, currentLimit, currentSearch],
        queryFn: () => getTours(),
        // We don't need router.isReady in App Router
        // Default values are handled in the getTours function
    });

    //get data tour by id
    const getTourById = async () => {
        if (!tourId) return null;
        const { data } = await tourServices.getTourById(tourId);
        return data.data;
    };
    
    //get data tour by id
    const { 
        data: dataTourById, 
        refetch: refetchTourById, 
        isLoading: isLoadingTourById, 
        isRefetching: isRefetchingTourById 
    } = useQuery({
        queryKey: ["TourById", tourId],
        queryFn: getTourById,
        enabled: !!tourId, // Only run if tourId exists
    });

    //get data tour by slug
    const getTourBySlug = async () => {
        if (!tourSlug) return null;
        const { data } = await tourServices.getTourBySlug(tourSlug);
        return data.data;
    };

    const { 
        data: dataTourBySlug, 
        refetch: refetchTourBySlug, 
        isLoading: isLoadingTourBySlug, 
        isRefetching: isRefetchingTourBySlug 
    } = useQuery({
        queryKey: ["TourBySlug", tourSlug],
        queryFn: getTourBySlug,
        enabled: !!tourSlug, // Only run if tourSlug exists
    });

    //schema add tour
    const schemaAddTour = yup.object({
        title: yup.string().required("Please input tour title"),
        slug: yup.string().required("Please input tour slug"),
        destination: yup.string().required("Please input tour destination"),
        description: yup.string().required("Please input tour description"),
        itinerary: yup.array().of(
            yup.object({
                day: yup.number().required("Please input day"),
                detail: yup.string().required("Please input detail"),
                image: yup.string().required("Please input image"),
            })
        ),
        maxParticipant: yup.number().required("Please input max participant"),
        isRecurring: yup.boolean().required("Please input is recurring"),
        duration: yup.number().required("Please input duration"),
        availability: yup.object({
            availableDays: yup.array().of(yup.string()).required("Please input available days"),
            fixedDates: yup.array().of(yup.string()).required("Please input fixed dates"),
        }),
        price: yup.object({
            adult: yup.number().required("Please input adult price"),
            child: yup.number().required("Please input child price"),
        }),
    });

    //form add tour
    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schemaAddTour),
    });

    //add tour
    const addTour = async (payload: ITour) => {
        const res = await tourServices.addTour(payload);
        return res;
    };

    //add tour mutation
    const {
        mutate: mutateAddTour,
        isPending: isPendingMutateAddTour,
        isSuccess: isSuccessMutateAddTour,
    } = useMutation({
        mutationFn: addTour,
        onError: (error: Error) => {
            toast(error.message || "Failed to add tour", {
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
            toast("Tour added successfully", {
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
            // Optionally navigate after success or refetch data
            refetchTours();
        },
    });

    const handleAddTour = (data: ITour) => {
        const payload = {
            ...data,
            availability: {
                availableDays: data.availability?.availableDays,
                fixedDates: data.availability?.fixedDates,
            },
            price: {
                adult: data.price?.adult,
                child: data.price?.child,
            },
        };
        mutateAddTour(payload as ITour);
    };

    //update tour
    const updateTour = async (payload: ITour) => {
        const { data } = await tourServices.updateTour(
            `${tourId}`,
            payload,
        );

        return data.data;
    };

    const {
        mutate: mutateUpdateTour,
        isPending: isPendingMutateUpdateTour,
        isSuccess: isSuccessMutateUpdateTour,
    } = useMutation({
        mutationFn: (payload: ITour) => updateTour(payload),
        onError: (error) => {
            toast(error.message || "Failed to update tour", {
                position: "top-right",
                style: {
                    background: "red",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
        onSuccess: () => {
            refetchTourById();
            toast("Tour updated successfully", {
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
    });

    const handleUpdateTour = (data: ITour) => mutateUpdateTour(data);

    const deleteTour = async (id: string) => {
        const res = tourServices.deleteTour(id);
        return res;
    };

    const {
        mutate: mutateDeleteTour,
        isPending: isPendingMutateDeleteTour,
        isSuccess: isSuccessMutateDeleteTour,
    } = useMutation({
        mutationFn: deleteTour,
        onError: (error) => {
            toast(error.message || "Failed to delete tour", {
                position: "top-right",
                style: {
                    background: "red",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
        onSuccess: () => {
            toast("Successfully delete tour", {
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(),
                },
            });
        },
    });

    const handleDeleteTour = (id: string) => mutateDeleteTour(id);

    return {
        //tour
        dataTours,
        isLoadingTours,
        isRefetchingTours,
        refetchTours,

        //tour by id
        dataTourById,
        isLoadingTourById,
        isRefetchingTourById,
        refetchTourById,

        //tour by slug
        dataTourBySlug,
        isLoadingTourBySlug,
        isRefetchingTourBySlug,
        refetchTourBySlug,
        
        //form add tour
        control,
        handleSubmitForm,
        errors,
        reset,
        watch,
        getValues,
        setValue,

        //add tour
        handleAddTour,
        isPendingMutateAddTour,
        isSuccessMutateAddTour,

        //update tour
        handleUpdateTour,
        isPendingMutateUpdateTour,
        isSuccessMutateUpdateTour,

        //delete tour
        handleDeleteTour,
        isPendingMutateDeleteTour,
        isSuccessMutateDeleteTour,
    };
};

export default useTour;