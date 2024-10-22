const fs = require('fs');

const countStudents = (data_path) => {
  if (!fs.existsSync(data_path)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(data_path).isFile()) {
    throw new Error('Cannot load the database');
  }
  const lines = fs
    .readFileSync(data_path, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const student_groups = {};
  const field_names = lines[0].split(',');
  const student_prop_names = field_names.slice(0, field_names.length - 1);

  for (const line of lines.slice(1)) {
    const student_record = line.split(',');
    const student_prop_values = student_record.slice(0, student_record.length - 1);
    const field = student_record[student_record.length - 1];
    if (!Object.keys(student_groups).includes(field)) {
      student_groups[field] = [];
    }
    const student_entries = student_prop_names
      .map((prop_name, idx) => [prop_name, student_prop_values[idx]]);
    student_groups[field].push(Object.fromEntries(student_entries));
  }

  const total_students = Object
    .values(student_groups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${total_students}`);
  for (const [field, group] of Object.entries(student_groups)) {
    const student_names = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${student_names}`);
  }
};

module.exports = countStudents;
