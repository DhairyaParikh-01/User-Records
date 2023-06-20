import {React} from 'react'


const Card = (props) => {
    const user = {
        id: props.id,
        name : props.name,
        email : props.email,
        phone : props.phone
    }
    const updateUser = props.updateUser;
    const deleteUser = props.deleteUser;
    return (
        <div className="card text-bg-info mb-3 mx-3" style={{maxWidth: "20em"}} >
                <div className="dropdown my-2" >
                    <button className="btn btn-dark mx-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item " href="/" onClick={(e)=>{e.preventDefault(); updateUser(user)}}><i className="fa-regular fa-pen-to-square mx-2"></i>Edit</a>
                        <a className="dropdown-item " href="/" onClick={(e)=>{e.preventDefault(); deleteUser(user.id)}} ><i className="fa-solid fa-trash-can mx-2" ></i>Delete</a>
                    </div>
                </div>
                <h5 className="card-header">{user.name}</h5>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Email: {user.email} </h6>
                <h6 className="card-subtitle mb-2 text-muted">Phone: {user.phone} </h6>
            </div>
        </div>
    )
}

export default Card
