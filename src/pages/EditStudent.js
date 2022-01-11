import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';




class EditStudent extends React.Component{

    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
    };

    async componentDidMount(){
        const stud_id = this.props.match.params.id;

        const res = await axios.get(`http://localhost:8000/api/edit-student/${stud_id}`);

        const student_data = res.data.student[0];

        if(res.data.status === 200){

            // student_data.map((data)=>(
            //     this.setState({
            //         data,
            //     })
            // ));
            console.log(student_data.name);

            this.setState({
                name: student_data.name,
                course: student_data.course,
                email:student_data.email,
                phone: student_data.phone,
            });

        }
        
        
    }

    saveStudent (){
        e.preventDefault();
        console.log('it is running');
    }
    
   


    handleInput = (e) => {
        const formValue=  e.target.value;
        this.setState({
            [e.target.name] :formValue,
        });
    }

    updateStudent = async (e) =>{
        e.preventDefault();
        let updateButton = document.getElementById('update_button');
        updateButton.innerText = "Updating...";
        updateButton.disabled = true;
        const stud_id = this.props.match.params.id;
        const res = await axios.put(
            `http://localhost:8000/api/update-student/${stud_id}`, this.state);

        if(res.data.status === 200){
            swal({
                title:"Success",
                text: res.data.message,
                icon:"success",
                buttons:"Okay"

            });
            updateButton.innerText = "Update Student";
            updateButton.disabled = false;
            
        }
    }

    render(){
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="card">
                            <div className="card-header">
                                <h4> EditStudent
                                    <Link to={'/'} className='btn btn-primary btn-sm float-right'>BACK</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.updateStudent}>
                                    <div className='form-group mb-3'>
                                        <label>Student Name:</label>
                                        <input type='text' name="name" onChange={this.handleInput} value={this.state.name} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Student Course:</label>
                                        <input type='text' name="course" onChange={this.handleInput} value={this.state.course} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Student email:</label>
                                        <input type='text' name="email" onChange={this.handleInput} value={this.state.email} className='form-control' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Student Phone:</label>
                                        <input type='text' name="phone" onChange={this.handleInput} value={this.state.phone} className='form-control' />
                                    </div>

                                    <button type='submit' className='btn btn-primary' id="update_button">  Update Student</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    };
}




export default EditStudent;