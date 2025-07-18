import { Toaster as Sonner } from "sonner";

function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          color: "#062843", // navy
          border: "1px solid #92c3df", // sky-blue
          borderRadius: "12px",
          fontSize: "14px",
          fontFamily: '"National Park", sans-serif',
          boxShadow: "0 10px 25px -5px rgba(6, 40, 67, 0.1), 0 4px 6px -2px rgba(6, 40, 67, 0.05)",
        },
        className: "toaster-custom",
        duration: 4000,
        success: {
          style: {
            background: "#f0f9ff",
            color: "#126f39", // forest-green
            border: "1px solid #98d2af", // mint-green
          },
          iconTheme: {
            primary: "#126f39", // forest-green
            secondary: "#f0f9ff",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fca5a5",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fef2f2",
          },
        },
        warning: {
          style: {
            background: "#fffbeb",
            color: "#d97706",
            border: "1px solid #fed7aa",
          },
          iconTheme: {
            primary: "#d97706",
            secondary: "#fffbeb",
          },
        },
        info: {
          style: {
            background: "#f0f9ff",
            color: "#387999", // steel-blue
            border: "1px solid #92c3df", // sky-blue
          },
          iconTheme: {
            primary: "#387999", // steel-blue
            secondary: "#f0f9ff",
          },
        },
      }}
      richColors
      closeButton
      expand={true}
      visibleToasts={4}
    />
  );
}

export default Toaster;
