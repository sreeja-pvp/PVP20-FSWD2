import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Student (){
    return (
        <div class="container"> 
        <table  class ="table table-bordered" style={{
                
                margin: "20px auto",
                textAlign: "center"
            }}>
            <tr>
                <th>RollNO</th>
                <th>Name</th>
                <th>Dept</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Rohan</td>
                <td>Data Science</td>
            </tr>
        </table>    
         </div>
    );
}

export default Student;

