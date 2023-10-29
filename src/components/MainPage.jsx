function MainPage() {
  return (
    <div className="containter rounded-5">
      <div
        className="left-column rounded-5"
        style={{ backgroundColor: "#999999" }}
      >
        Hello 1
      </div>
      <div className="right-rows">
        <div className="row rounded-5" style={{ backgroundColor: "#999999" }}>
          Hello 2
        </div>
        <div className="row rounded-5 " style={{ backgroundColor: "#999999" }}>
          Hello 3
        </div>
      </div>
    </div>
  );
}

export default MainPage;
