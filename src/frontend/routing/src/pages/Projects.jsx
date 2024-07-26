import { Link } from 'react-router-dom';

export default function Projects({ fakeProjectsData }) {
  return (
    <div>
      <div className='card-container'>
        {fakeProjectsData &&
          fakeProjectsData.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className='card'>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
