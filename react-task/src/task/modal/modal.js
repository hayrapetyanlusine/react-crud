import { useRef } from "react";
import "./modal.css"

export const Modal = ({ modalRef, onSubmit }) => {
    const formRef = useRef(null);

    return (
        <dialog ref={modalRef} className="modal">
            <form id="form" ref={formRef} onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(formRef.current);
                const name = formData.get("name");
                const username = formData.get("username");
                const email = formData.get("email");

                const nameRegexp = /^[A-Za-z]{3,}$/;
                const mailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                const validName = nameRegexp.test(name);
                const validUserName = nameRegexp.test(username);
                const validMail = mailRegexp.test(email);

                if (validName && validUserName && validMail) {
                    onSubmit(name, username, email);
                    modalRef.current.close();
                }
            }}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="username" placeholder="User name" />
                <input type="email" name="email" placeholder="E-mail" />
                <button className="submit" type="submit"> Submit </button>
            </form>
            <button className="close-btn" onClick={() => {
                modalRef.current.close();
            }}> X </button>
        </dialog>
    )
}