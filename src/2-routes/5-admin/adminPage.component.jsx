import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminValidationPage from "./admin.component";

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (!role) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <AdminValidationPage/>
  )
}
