import "./task.css";

export function CreateTable({ data, del, modalRef, editRef }) {
    let ind = 1;

    return (
        <div className="all">
            <table border="1" id="table" >
                <tbody>
                    <tr className="tr">
                        <th>ID</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>E-mail</th>
                    </tr>
                    {
                        data.map(val => {
                            return (
                                <tr key={val.id}>
                                    <td>{ind++}</td>
                                    <td>{val.name}</td>
                                    <td>{val.username}</td>
                                    <td>{val.email}</td>
                                    <td><button className="delete" onClick={() => {
                                        del(val.id);
                                    }}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button className="btn" onClick={() => {
                modalRef.current.showModal();
            }}> Create </button>

            <button className="edit-btn" onClick={() => {
                editRef.current.showModal();
            }}> Edit </button>
        </div>
    )
}