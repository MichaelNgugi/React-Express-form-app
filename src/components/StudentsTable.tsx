interface Student {
  name: string;
  idNo: string;
  course: string[];
}

interface StudentsTableProps {
  students: Student[];
}

function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div>
      <h3>Student data</h3>
      <table id="content">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>ID Number</th>
            <th>Courses Completed</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.idNo}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsTable;
