import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment";

const TodoModal = ({ close }) => {
  return (
    <div className="todomodal" onClick={close}>
      <div className="modalCard"></div>
    </div>
  );
};

const Card = ({ data, add }) => {
  if (data?.content === "add") {
    return (
      <div className="cardContainer-add" onClick={add}>
        <h3>Add</h3>
      </div>
    );
  } else if (data?.content === "todo") {
    return (
      <div className="cardContainer-todo">
        <p className="plus">+</p> <p>{data?.todo?.title}</p>
        <p className="min">-</p>
      </div>
    );
  } else {
    return (
      <div className="cardContainer-done">
        <p>{data?.todo?.title}</p>
      </div>
    );
  }
};

const App = () => {
  const [days, setDays] = useState(undefined);
  const current = moment().format("dddd");
  const currentDate = new Date();
  // const rows = Array.from({ length: 24 }, (_, index) => index + 1);
  const [defaultArr, setDefaultArr] = useState(undefined);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const getCurrentWeekDays = () => {
    const today = moment();
    const startOfWeek = today.clone().startOf("week");
    const endOfWeek = today.clone().endOf("week");

    const days = [];
    const arr = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, "day");
      arr.push({
        day: `${day?.format("D")}`,
        content: "add",
        todo: {},
      });
    }
    setDays(days);
    setDefaultArr({ ewd: arr });
  };

  useEffect(() => {
    getCurrentWeekDays();
  }, []);

  useEffect(() => {
    setRows([defaultArr]);
  }, [defaultArr]);
  const isPastDate = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  const onAdd = () => {
    setRows([...rows, defaultArr]);
    setOpen(true);
  };

  return (
    <div className="awsmtodo-container">
      <div className="todo-wrapper">
        <table className="table">
          <thead>
            {days !== undefined ? (
              <tr>
                {days?.map((day, index) => {
                  return (
                    <th key={index}>
                      <div className="ths">
                        <p>{day.format("ddd")}</p>
                        {current === day.format("dddd") ? (
                          <div className="select">
                            <p>{day.format("D")}</p>
                          </div>
                        ) : (
                          <div>
                            <p>{day.format("D")}</p>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ) : null}
          </thead>
          <tbody>
            {rows?.map((item, indx) => {
              return (
                <tr key={indx}>
                  {days?.map((day, index) => {
                    return (
                      <td key={index}>
                        {item?.ewd?.map((it, inx) => {
                          if (it?.day === day.format("D")) {
                            if (it?.content === "todo") {
                              return <Card key={inx} data={it} />;
                            } else if (it?.content === "done") {
                              return <Card key={inx} data={it} />;
                            } else {
                              if (!isPastDate(day)) {
                                return <Card key={inx} data={it} add={onAdd} />;
                              }
                            }
                          }
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {open ? (
        <TodoModal
          close={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default App;
