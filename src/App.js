import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Input from "./Input";

function App(props) {
  const [followedEarnings, setFollowedEarnings] = useState([]);
  const [availableEarnings, setAvailableEarnings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("UPCOMING");
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  // refs
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const userMessageRef = useRef();

  const addEarningsFollowed = (id) => {
    setFollowedEarnings([...followedEarnings, id]);
  };

  const removeEarningsFollowed = (id) => {
    setFollowedEarnings(followedEarnings.filter((earningId) => earningId !== id));
  };

  useEffect(() => {
    let earnings = [
      {
        id: 1,
        companyName: "Google",
        ticker: "GOOGL",
        EPS: 0.66,
        estimatedEPS: 0.70,
        revenue: 61.88,
        date: "2024-09-10",
        time: "14:30",
        sentiment: "Bullish",
      },
      {
        id: 2,
        companyName: "Facebook",
        ticker: "FB",
        EPS: 0.97,
        estimatedEPS: 0.90,
        revenue: 29.01,
        date: "2024-09-12",
        time: "13:00",
        sentiment: "Neutral",
      },
      {
        id: 3,
        companyName: "Amazon",
        ticker: "AMZN",
        EPS: 7.09,
        estimatedEPS: 7.00,
        revenue: 108.52,
        date: "2024-09-15",
        time: "16:00",
        sentiment: "Bearish",
      },
    ];

    setAvailableEarnings(earnings);
  }, []);

  const handleContactUsSubmit = (e) => {
    e.preventDefault();
    setUserName("");
    setUserEmail("");
    setUserMessage("");
    console.log(userName, " - ", userEmail, ", Message: ", userMessage);
    userNameRef.current.value = "";
    userEmailRef.current.value = "";
    userMessageRef.current.value = "";
  }

  return (
    <>
      <hr />
      <h1 className="h1-title">Listen Live</h1>
      <hr />
      <h3>{props.welcome}</h3>
      <p>Below are the most anticipated earnings this week.</p>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h3>Available Earnings</h3>
        <div>
          {["PAST", "CURRENT", "UPCOMING", "ALL"].map((filter) => (
            <button
              key={filter}
              className={`btn btn-sm btn-outline-primary rounded-pill mx-1 ${
                selectedFilter === filter ? "active" : ""
              }`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <br />
      <ul className="list-group">
        {/* Column Names */}
        <li className="list-group-item">
          <div className="row align-items-center font-weight-bold">
            <div className="col-2"><strong>Company Name</strong></div>
            <div className="col-2"><strong>Ticker</strong></div>
            <div className="col-2"><strong>Estimated EPS</strong></div>
            <div className="col-2"><strong>Date and Time (EST)</strong></div>
            <div className="col-2"><strong>Sentiment</strong></div>
            <div className="col-2 text-right"><strong>Actions</strong></div>
          </div>
        </li>
        {availableEarnings.map((earningsCall) => (
          <li key={earningsCall.id} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-2">
                <strong>
                  {earningsCall.companyName}{" "}
                  {followedEarnings.includes(earningsCall.id) && <span><br />👀</span>}
                </strong>
              </div>
              <div className="col-2">{earningsCall.ticker}</div>
              <div className="col-2">{earningsCall.estimatedEPS}</div>
              <div className="col-2">
                {earningsCall.date}, {earningsCall.time}
              </div>
              <div className="col-2">{earningsCall.sentiment}</div>
              <div className="col-2 text-right">
                {followedEarnings.includes(earningsCall.id) ? (
                  <>
                    <i className="bi bi-calendar-check-fill"></i>
                    <a
                      href="#!"
                      className="btn btn-outline-secondary btn-sm ml-2"
                      style={{ width: "100px" }}
                      onClick={() => removeEarningsFollowed(earningsCall.id)}
                    >
                      Unfollow
                    </a>
                  </>
                ) : (
                  <>
                    <i className="bi bi-calendar-check"></i>
                    <a
                      href="#!"
                      className="btn btn-outline-secondary btn-sm ml-2"
                      style={{ width: "100px" }}
                      onClick={() => addEarningsFollowed(earningsCall.id)}
                    >
                      Follow
                    </a>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul> <br />
      <hr />
      <h3>Followed Earnings</h3>
      <br />
      <ul className="list-group">
        {followedEarnings.map((followedEarningId) => {
          const followedEarning = availableEarnings.find(
            (earning) => earning.id === followedEarningId
          );

          return (
            <li key={followedEarning.id} className="list-group-item">
              <div className="row align-items-center">
                <div className="col-2">
                  <strong>{followedEarning.companyName}</strong>
                </div>
                <div className="col-2">{followedEarning.ticker}</div>
                <div className="col-2">Estimated EPS: {followedEarning.estimatedEPS}</div>
                <div className="col-2">
                  {followedEarning.date} {followedEarning.time}
                </div>
                <div className="col-2">Sentiment: {followedEarning.sentiment}</div>
                <div className="col-2 text-right">
                  <i className="bi bi-calendar-check-fill"></i>
                  <a
                    href="#!"
                    className="btn btn-outline-secondary btn-sm ml-2"
                    style={{ width: "100px" }}
                    onClick={() => removeEarningsFollowed(followedEarning.id)}
                  >
                    Unfollow
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <form autoComplete="off">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="company-name"
            name="company-name"
            placeholder="Enter company name."
            autoComplete="company-name-added"
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const foundCompany = availableEarnings.find(
                  (earning) =>
                    earning.companyName.toLowerCase() === companyName.toLowerCase()
                );
                if (foundCompany) {
                  addEarningsFollowed(foundCompany.id);
                  setCompanyName("");
                } else {
                  alert("Company not found.");
                }
              }
            }}
          ></input>
        </div>
      </form>
      <hr />
      <h3>Contact Us!</h3> <br />
      <form autoComplete="off" onSubmit={handleContactUsSubmit}>
        <Input
          title="Name:"
          name="name"
          type="text"
          className="form-control"
          autoComplete="name"
          placeholder="Enter your name."
          ref={userNameRef}
          onChange={(e) => setUserName(e.target.value)}
          />
        <Input
          title="Email:"
          name="email"
          type="email"
          className="form-control"
          autoComplete="email"
          placeholder="Enter your email."
          ref={userEmailRef}
          onChange={(e) => setUserEmail(e.target.value)}
          />
        <Input
          title="Message:"
          name="message"
          type="text"
          className="form-control"
          autoComplete="message"
          placeholder="Enter your message."
          ref={userMessageRef}
          onChange={(e) => setUserMessage(e.target.value)}
          />

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
    </>
  );
}

export default App;
