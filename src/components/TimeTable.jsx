const TimeTable = () => {
  const currentDate = new Date();
  return (
    <div>
      <div className="container rounded-5">
        <button type="button" className="btn button btn-primary rounded-5">
          Left arrow
        </button>
        <button type="button" className="btn button btn-primary rounded-5">
          {currentDate.toDateString()}
        </button>
        <button type="button" className="btn button btn-primary rounded-5">
          Right arrow
        </button>
      </div>
    </div>
  );
};

export default TimeTable;
