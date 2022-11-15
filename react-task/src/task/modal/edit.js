import { useRef } from "react";
import "./modal.css"

export const Edit = ({ editRef, onEdit }) => {
    const formRef = useRef(null);

    return (
        <dialog ref={editRef} className="modal">
            <form id="form" ref={formRef} onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(formRef.current);

                const id = formData.get("id")
                const name = formData.get("name");
                const username = formData.get("username");
                const email = formData.get("email");

                onEdit(id, name, username, email);
                editRef.current.close();
            }}>
                <input type="number" min="1" name="id" placeholder="ID" />
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="username" placeholder="User name" />
                <input type="email" name="email" placeholder="E-mail" />
                <button className="submit" type="submit"> Edit </button>
            </form>
            <button className="close-btn" onClick={() => {
                editRef.current.close();
            }}> X </button>
        </dialog>
    )
}