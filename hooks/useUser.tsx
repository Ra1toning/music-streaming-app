import { User } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useEffect, useState } from 'react';
import {Subscription, UserDetails} from '@/types';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props{
    [propName: string]: unknown;
}

/**
 * MyUserContextProvider компонент нь хэрэглэгчийн мэдээллийг агуулсан контекст провайдер юм.
 * 
 * @param {Props} props - Компонентийн пропс.
 * @returns {JSX.Element} - UserContext.Provider элемент.
 * 
 * @remarks
 * Энэ компонент нь хэрэглэгчийн сессийн мэдээлэл, хэрэглэгчийн дэлгэрэнгүй мэдээлэл болон захиалгын мэдээллийг агуулдаг.
 * 
 * @example
 * ```tsx
 * <MyUserContextProvider>
 *   <YourComponent />
 * </MyUserContextProvider>
 * ```
 * 
 * @component
 * @category Hooks
 */
export const MyUserContextProvider = (props: Props) => {
    const {session, isLoading: isUserLoading, supabaseClient: supabase} = useSessionContext();

    const user = useSupaUser();

    const accessToken = session?.access_token ?? null;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from("users").select("*").single();

    const getSubscription = () => 
        supabase.from("subscriptions")
        .select("*, prices(*,products(*))")
        .in("status", ["trailing", "active"])
        .single();

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0];
                const subscriptionDetailPromise = results[1];

                if(userDetailsPromise.status === "fulfilled") {
                    setUserDetails(userDetailsPromise.value.data as UserDetails)
                }

                if(subscriptionDetailPromise.status === "fulfilled") {
                    setSubscription(subscriptionDetailPromise.value.data as Subscription);
                }
                setIsLoadingData(false);
            })
        } else if(!user && !isLoadingData && !isUserLoading) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isUserLoading]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading : isUserLoading || isLoadingData,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />
};

export const userUser = () => {
    const context = useContext(UserContext);

    if(context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider")
    }

    return context;
};