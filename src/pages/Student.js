import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';




class Student extends React.Component{

    state = {
        students: [],
        loading: true
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/students');

       if(res.data.status === 200){
           this.setState({
                students: res.data.students,
                loading:false,
           });
       }
    }

    deleteStudent = async (e, id)=>{
        const clickDeleteButton = e.currentTarget;
        clickDeleteButton.innerText = "Deleting ... ";
        const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`);

        if(res.data.status == 200){
            swal({
                title:"Success",
                text: res.data.message,
                icon:"success",
                buttons:"Okay"

            });
            clickDeleteButton.closest("tr").remove();
        }
    }

    render(){
        let student_HTML_TABLE = "";

        if(this.state.loading){
            student_HTML_TABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
        }else{
            student_HTML_TABLE = this.state.students.map((item)=>(
                <tr key={item.id}>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.email}</td>
                    <td> {item.phone}</td>
                    <td>
                        <Link to={ `edit-student/${item.id}`} className="btn btn-success btn-sm"> Edit</Link>
                    </td>
                    <td>
                        <button 
                            type="button" 
                            className="btn btn-danger btn-sm"
                            onClick = {(e)=>this.deleteStudent(e, item.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ));
        }
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-header">
                                <h4> Student Data
                                    <Link to={'add-student'} className='btn btn-primary btn-sm float-right'>Add Student</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email Id</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                           {student_HTML_TABLE}
                                        </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

const jsx = (

   <h1>this is rendering </h1>
);

export default Student;