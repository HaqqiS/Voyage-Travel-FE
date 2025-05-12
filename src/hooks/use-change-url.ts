"use client";

import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

const useChangeUrl = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // const debounce = useDebounce();

    // Create a new URLSearchParams object to manipulate
    const createQueryString = useCallback(
        (params: Record<string, string | number | null | undefined>) => {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            
            // Update or delete parameters based on the provided values
            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            });
            
            return newSearchParams.toString();
        },
        [searchParams]
    );

    // Get current parameter values
    const currentLimit = searchParams.get("limit");
    const currentPage = searchParams.get("page");
    const currentSearch = searchParams.get("search");
    const currentCategory = searchParams.get("category");
    const currentIsOnline = searchParams.get("isOnline");
    const currentIsFeatured = searchParams.get("isFeatured");

    const setUrl = () => {
        const queryString = createQueryString({
            limit: currentLimit || LIMIT_DEFAULT,
            page: currentPage || PAGE_DEFAULT,
            search: currentSearch || null,
        });
        
        router.replace(`${pathname}?${queryString}`);
    };

    const setUrlExplore = () => {
        const queryString = createQueryString({
            limit: currentLimit || LIMIT_DEFAULT,
            page: currentPage || PAGE_DEFAULT,
            category: currentCategory || null,
            isOnline: currentIsOnline || null,
            isFeatured: currentIsFeatured || null,
        });
        
        router.replace(`${pathname}?${queryString}`);
    };

    // const handleChangePage = (page: number) => {
    //     const queryString = createQueryString({
    //         ...Object.fromEntries(searchParams.entries()),
    //         page,
    //     });
        
    //     router.push(`${pathname}?${queryString}`);
    // };

    const handleChangePage = (page: number) => {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set("page", String(page + 1))
        router.push(`${window.location.pathname}?${searchParams.toString()}`)
    }

    // const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const selectedLimit = e.target.value;
    //     const queryString = createQueryString({
    //         ...Object.fromEntries(searchParams.entries()),
    //         limit: selectedLimit,
    //         page: PAGE_DEFAULT,
    //     });
        
    //     router.push(`${pathname}?${queryString}`);
    // };

    const handleChangeLimit = (size: number) => {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set("limit", String(size))
        searchParams.set("page", "1") // Reset to first page when changing page size
        router.push(`${window.location.pathname}?${searchParams.toString()}`)
    }

    // const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
        
    //     debounce(() => {
    //         const queryString = createQueryString({
    //             ...Object.fromEntries(searchParams.entries()),
    //             search: value || null,
    //             page: PAGE_DEFAULT,
    //         });
            
    //         router.push(`${pathname}?${queryString}`);
    //     }, DELAY);
    // };

    // const handleChangeCategory = (category: string) => {
    //     const queryString = createQueryString({
    //         ...Object.fromEntries(searchParams.entries()),
    //         category,
    //         page: PAGE_DEFAULT,
    //     });
        
    //     router.push(`${pathname}?${queryString}`);
    // };

    // const handleChangeIsOnline = (isOnline: string) => {
    //     const queryString = createQueryString({
    //         ...Object.fromEntries(searchParams.entries()),
    //         isOnline,
    //         page: PAGE_DEFAULT,
    //     });
        
    //     router.push(`${pathname}?${queryString}`);
    // };

    // const handleChangeIsFeatured = (isFeatured: string) => {
    //     const queryString = createQueryString({
    //         ...Object.fromEntries(searchParams.entries()),
    //         isFeatured,
    //         page: PAGE_DEFAULT,
    //     });
        
    //     router.push(`${pathname}?${queryString}`);
    // };

    return {
        setUrl,
        setUrlExplore,
        handleChangePage,
        handleChangeLimit,
        // handleChangeSearch,
        // handleChangeCategory,
        // handleChangeIsOnline,
        // handleChangeIsFeatured,
        currentLimit,
        currentPage,
        currentSearch,
        currentCategory,
        currentIsOnline,
        currentIsFeatured,
    };
};

export default useChangeUrl;