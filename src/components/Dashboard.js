import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, createGoal, getGoalsByUid } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Header from "./Header";
function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        if (doc) {
          const goalsList = await getGoalsByUid(user?.uid);
          setGoals(goalsList);
        }
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };

    if (loading) return;
    if (!user) return navigate("/");
    fetchUserInfo();
  }, [user, loading, navigate]);

  const updateInput = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleGoalSubmit = (event) => {
    event.preventDefault();
    const savedGoal = createGoal(user, formData);
    setGoals([...goals, savedGoal]);
    setFormData({
      goalName: '',
      goalAmount: '',
      goalUnit: '',
    });
  }

  return (
    <div>
      <Header user={user} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div>
            <div className="goalForm">
              Add a goal
              <form onSubmit={handleGoalSubmit}>
                <input
                  type="text"
                  name="goalName"
                  placeholder="Goal Name"
                  onChange={updateInput}
                  value={formData.goalName || ''}
                />
                <input
                  type="text"
                  name="goalAmount"
                  placeholder="Goal Amount"
                  onChange={updateInput}
                  value={formData.goalAmount || ''}
                />
                <input
                  type="text"
                  name="goalUnit"
                  placeholder="Goal Unit"
                  onChange={updateInput}
                  value={formData.goalUnit || ''}
                />
                <input type="submit" value="Submit"/>
              </form>
            </div>
            <div>
              {goals.map((goal) => {
                return (
                  <div key={goal.id}>
                    {goal.goalName} - {goal.goalAmount} {goal.goalUnit}
                  </div>
                )
              }
              )}
            </div>
          </div>
        </div>
      </div>
     </div>
  );
}
export default Dashboard;
