import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

// COMMENT: react navigation
//	* <Link>: similar to <a>, "clickable link" (to a specific route)
//	* <NavLink>: like <Link> but add styling "active"-class
//	* <Navigate>: programmatic, conditional redirects
//	* useNavigate(): programmatic, within in function

export default function Project({ fakeProjectsData }) {
  const [project, setProject] = useState({});
  const { projectID } = useParams();

  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    const foundProject = fakeProjectsData.find((project) => project.id === projectID);
    setProject(foundProject);
  }, [fakeProjectsData, projectID]);

  if (!project) return <Navigate to='/error' />;
  return (
    <div>
      <h1>{project.name}</h1>
      <img src={project.imageUrl} width='200' height='130' />
      <p>{project.description}</p>

      <div className='navigation'>
        <button onClick={goBack}>Go Back</button>
        <button>
          <Link to='/'>Home</Link>
        </button>
      </div>
    </div>
  );
}
