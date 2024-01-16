interface Course {
  name: string;
  exerciseCount: number;
}

const Header = ({ name }: { name: string }) => {
  return  <h1>{name}</h1>;
}

const Content = ({ courses }: {courses: Course[]}) => {
  return (
    <div>
      {courses.map(c => <p key={c.name}> {c.name} {c.exerciseCount}</p>)}
    </div>
  )
}

const Total = ({ courses }: {courses: Course[]}) => {
  const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {totalExercises}</p>
}
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;