import React, { useEffect, useState } from 'react';

function App() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/depts`)
      .then(response => response.json())
      .then(data => setDepartments(data)) // Store API data in state
      .catch(err => console.error("Error fetching departments:", err));
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <h2>Department List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>DeptNo</th>
            <th>Name</th>
            <th>Loc</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.deptno}>
              <td>{dept.deptno}</td>
              <td>{dept.dname}</td>
              <td>{dept.loc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
