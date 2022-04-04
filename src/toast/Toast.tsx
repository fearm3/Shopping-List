import { useCallback, useEffect } from "react";
import "../css/Toast.css";
// import styles from "./Toast.module.css";

const Toast = ({ toastlist, position, setList }: any) => {
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastlist.filter((e: any) => e.id !== id);
      setList(toastListItem);
    },
    [toastlist, setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className="container">
      {toastlist.map((toast: any, i: number) => (
        <div
          key={i}
          className="notification toast"
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button onClick={() => deleteToast(toast.id)}>X</button>
          <div>
            <p className="title">{toast.title}</p>
            <p className="description">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
