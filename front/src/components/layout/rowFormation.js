const RowFormation = ({ title, id, date, guide, instructor }) => {
  return (
    <div className="card">
      <div className="card-header" id={`header-${id}`}>
        <h5 className="mb-0">
          <button
            className="btn btn-link"
            data-toggle="collapse"
            data-target={`#collapse-${id}`}
            aria-expanded="false"
            aria-controls={`collapse-${id}`}
          >
            {title}
          </button>
        </h5>
      </div>

      <div
        id={`collapse-${id}`}
        className="collapse"
        aria-labelledby={`header-${id}`}
        data-parent="#accordion"
      >
        <div className="card-body">
          <ul>
            <li> Date : {date}</li>
            <li>Instructeur : {instructor}</li>
            <li> Titre :{title}</li>
            <li>Guides liés
                <ul>
                  {guide.map(data=>(
                    <li>{data.title} de {data.author}</li>
                  ))}
                </ul>
            </li>

          </ul>
          <button> Reserver un session </button>
        </div>
      </div>
    </div>
  );
};

export default RowFormation;
