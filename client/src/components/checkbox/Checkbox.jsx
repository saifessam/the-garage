import './styles.css';

const Checkbox = ({ checkboxs, name, action, gird = false }) => {
  return (
    <div className={gird ? 'checkboxs grid' : 'checkboxs row'}>
      {checkboxs?.map((checkbox) => {
        return (
          <div className="checkbox" key={checkbox.value}>
            <input type="checkbox" name={name} defaultValue={checkbox.value} onChange={action} />
            <label>{checkbox.label}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
