<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mockery\Generator\StringManipulation\Pass\Pass;

class StudentController extends Controller
{
    //
    public function store(Request $request){


        $validator =
        Validator::make($request->all(), [
            'name'=>'required|max:191|unique:students',
            'email' => 'required|email|max:191',
            'course' => 'required|max:191',
            'phone'=> 'required|numeric|min:10|max:10'
            ]
        );
        $k = 'jibberish';
        if($validator->fails()){
            return response()->json([
                'err_message'=> $validator->messages(),
            ]);
        }else{
            $student = new Student();
            $student->name = $request->input('name');
            $student->course = $request->input('course');
            $student->email = $request->input('email');
            $student->phone = $request->input('phone');

            $student->save();

            // Student::create(
            // $request->all()
            // );

            return response()->json([
                'status' => 200,
                'message'=> 'Student Added Successfully'
            ]);
        }



    }

    public function index(){
        $students = Student::all();

        return response()->json([
            'status' => 200,
            'students' => $students,
        ]);
    }

    public function edit(Student $student){
        $student = Student::find($student);
        return response()->json([
            'status' => 200,
            'student' => $student,
        ]);

    }


    public function update(Request $request, $student){
        $student = Student::find($student);

        $student->name = $request->input('name');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');

        $student->update();

        return response()->json([
            'status' => 200,
            'message' => "Student updated successfully",
        ]);
    }

    public function destroy(Request $request, $id){
        $student = Student::find($id);

        $student->delete();

        return response()->json([
            'status' => 200,
            'message' => "Deleted Successfully",
        ]);
    }
}
