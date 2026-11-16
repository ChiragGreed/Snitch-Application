import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { registerApi, loginApi, getMeApi, protectedRouteApi, logoutApi } from "../services/authApi.js";
import { setLoading, setUser } from "../states/authSlice.js";

const useAuth = () => {

    const dispatch = useDispatch();

    const registerHandler = async ({ fullname, email, contact, password, role }) => {
        try {
            const userData = await registerApi({ fullname: fullname.trim(), email: email.trim().toLowerCase(), contact: contact.trim(), password: password.trim(), role });
            dispatch(setUser(userData.user));
            dispatch(setLoading(true));
        } catch (error) {
            console.error("Register Error: ", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const loginHandler = async ({ email, password }) => {
        try {

            const userData = await loginApi({ email, password });
            dispatch(setUser(userData?.user));
            dispatch(setLoading(true));
            return true;
        } catch (error) {
            console.error("Login Handler Error: ", error);
            return false;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const logoutHandler = async () => {

        const userData = await logoutApi();
        dispatch(setUser(null));
        dispatch(setLoading(true));
        dispatch(setLoading(false));

    }

    const protectedRouteHandler = async () => {
        try {
            await protectedRouteApi();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    const getMeHandler = useCallback(async () => {
        try {
            const userData = await getMeApi();
            dispatch(setLoading(true));
            dispatch(setUser(userData.user));
        } catch (error) {
            return error;
        }
        finally {
            dispatch(setLoading(false));
        }

    }, [dispatch]);

    return { registerHandler, loginHandler, logoutHandler, getMeHandler, protectedRouteHandler }
}

export default useAuth
