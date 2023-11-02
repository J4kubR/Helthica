import moment from "moment";

const TimeTable = () => {
  const [date] = React.useState(new Date());

  const [from] = React.useState(moment().subtract(3, "days").toDate());
  const [till] = React.useState(moment().add(3, "days").toISOString());
  const range = { from, till };

  const [items] = React.useState([
    {
      title: "Some event",
      startDate: moment().subtract(1, "hour").toDate(),
      endDate: moment().add(1, "hour").toDate(),
    },
  ]);

  return (
    <ScrollView>
      <Timetable
        // these two are required
        items={items}
        cardComponent={MyItemCard}
        // provide only one of these if you need to
        date={date} // optional
        range={range} // optional
      />
    </ScrollView>
  );
};

export default TimeTable;
