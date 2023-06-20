import { React, useState, useRef } from 'react'
import Card from './Card'
import Data from "../data";

const Home = (props) => {
    const [data, setData] = useState(Data); // State created for storing data into JSON form.
    var currId = null;
    const modalRef = useRef(null);

    // Logic for adding a new User and updating the 'data' state
    const handleClick = (e) => {
        e.preventDefault();
        const currentId = data.length + 1;
        const newUser = {
            id : currentId,
            name : document.getElementById("name").value,
            email : document.getElementById("email").value,
            phone : document.getElementById("phone").value
        }
        var flag = validate(newUser.name, newUser.email, newUser.phone);
        if(flag){
            setData(data => [...data, newUser])   
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            document.getElementById("phone").value = ""
            props.showAlert("success", "Done", "Sucessfully added the new user");
        }
    }

    // Logic for getting the current user when user clicks on edit button
    const updateUser = (currentUser) => {
        document.getElementById("ename").value = currentUser.name;
        document.getElementById("eemail").value = currentUser.email;
        document.getElementById("ephone").value = currentUser.phone;
        modalRef.current.click();
        currId = currentUser.id;
        
    }

    /// Logic for Updating the current user by saving changes to 'data' state
    const handleUpdate = (e) => {
        e.preventDefault()
        const newUser = {
            id : currId,
            name  : document.getElementById("ename").value,
            email  : document.getElementById("eemail").value,
            phone  : document.getElementById("ephone").value
        }
        var flag = validate(newUser.name, newUser.email, newUser.phone);
        if(flag){
            setData(data=> data.map(user=> (user.id === newUser.id ? {...user, ...newUser} : user)))
            props.showAlert("success", "Done", "User record updated successfully!");
        }
    }

    // Logic for Removing the user by filtering it from 'data' state
    const deleteUser = (userId) => {
        setData(data=> data.filter(user=> user.id !==userId));
        props.showAlert("success", "Deleted", "successfully");
    }


    // Validation using ReGEX
    function validate(name, email, phone) {
        const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPhone = /^[6-9]\d{9}$/;

        if(!(regexName.test(name))){
            props.showAlert( "danger", "invalid Name","Name should contain alphabets");
            return false;
        }
        if(!(regexEmail.test(email))){
            props.showAlert("danger",  "invalid Emaild Id", "Email id should contain a domain and username!");
            return false;
        }
        if(!(regexPhone.test(phone))){
            props.showAlert( "danger",  "invalid Phone no.",  "Please check your phone again" );
            return false;
        }
        return true
    }

    return (
        <div className="container">
            <h3 className="display-2 text-center">Welcome to User Records</h3>
            <div className="col mb-5" style={{ marginTop: "50px" }}>
                {data.length === 0 && 'No Users to display'}
            </div>
            <div className="row">
                {data.map((user) => {
                    return <Card key={user.id} id={user.id} name={user.name} email={user.email} phone={user.phone} updateUser={updateUser} deleteUser={deleteUser} />
                })}
            </div>

            {/* **********************************Modal for creating a new User record ********************************************************/}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-sharp fa-solid fa-plus"></i> Add user</button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="text" required className="form-control" id="name" name="name"/>
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" required className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="phone" className="form-label">Phone No</label>
                                <input type="text" required className="form-control" name="phone" id="phone"/>
                            </div>
                             <button type="submit" onClick={handleClick} data-bs-dismiss="modal" className="btn btn-primary">Add</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* **********************************Modal for Updating the User Records ********************************************************/}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" ref={modalRef} style={{display: "none"}}>
                Launch demo modal
            </button>
            <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLablel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateModalLablel">Update Record</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="text" required className="form-control" id="ename" name="ename"/>
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" required className="form-control" id="eemail" name="eemail" aria-describedby="eemailHelp"/>
                                <div id="eemailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="phone" className="form-label">Phone No</label>
                                <input type="text" required className="form-control" name="ephone" id="ephone"/>
                            </div>
                             <button type="submit" data-bs-dismiss="modal" onClick={handleUpdate} className="btn btn-primary">Save Changes</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home