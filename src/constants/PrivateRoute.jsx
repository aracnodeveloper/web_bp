import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken");
    const userId = Cookies.get("userId");

    // Verificar que todos los tokens necesarios estén presentes y sean válidos
    const isAuthenticated =
        accessToken &&
        userId &&
        accessToken !== "undefined" &&
        accessToken !== "null" &&
        accessToken !== "";

    if (!isAuthenticated) {
        // Limpiar todas las cookies si la autenticación falla
        const cookiesToClear = [
            "accessToken",
            "refreshToken",
            "userId",
            "roleName",
        ];
        cookiesToClear.forEach((cookie) => Cookies.remove(cookie));

        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;