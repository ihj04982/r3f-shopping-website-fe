import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../common/component/LoadingSpinner";

const PrivateRoute = ({ permissionLevel }) => {
    const userState = useSelector((state) => state.user) || {};
    const { user, loading, initialized } = userState;
    const isAuthenticated = !!user && (user.level === permissionLevel || user.level === "admin");

    if (!initialized || loading) {
        return <LoadingSpinner fullScreen message="세션 확인 중..." />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
