'use client';
import TopBar from '../ui/top';
import Achievements from '../ui/Achievements';
import Themes from '../ui/Themes';
import React, { useState, useEffect } from 'react';
import PowerUps from '../ui/PowerUps';
import PlayButton from '../ui/PlayButton';
import axios from 'axios';
import withAuth from '../withAuth';
import FriendsList from '../ui/FriendList';
import {dashboardData, profileData} from '../interfaces/interfaces';


function Dashboard() {

  const [dashboardData, setDashboardData] = useState<dashboardData | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('yo1.jpg');
  const [powerup, setPowerup] = useState('FireBall');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/Dashboard', { withCredentials: true});
        console.log("data", response.data);
        setDashboardData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("hello", dashboardData);
  const doneAchievements = dashboardData?.doneAchievements || [];
  const notDoneAchievements = dashboardData?.notDoneAchievements || [];
  const friends = dashboardData?.friends || [];
  const notifications = dashboardData?.notifications || [];

  const handleThemeChange = (newtheme: string) => {
    setTheme(newtheme);
  }
  const handlePowerUpChange = (newpowerup: string) => {
    setPowerup(newpowerup);
  }

  return (
    <main className="flex flex-col font-white bg-main  h-screen">
      <TopBar />
      <div className="flex flex-col lg:mt-10 md:mt-10 xl:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 lg:grid-rows-3 gap-4 w-full h-full mt-4 md:grid-row-5 grid-row-5">
        
          <div className="relative p-20 rounded-md col-span-1 lg:col-span-3 h-[200px] md:h-[300px] lg:w-full shadow-md" style={{backgroundImage: `url(${theme})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* todo: add Bot/Quee button */}
            <PlayButton theme = {theme} PowerUp={powerup}/>
          </div>
          
          <Achievements
            doneAchievements={doneAchievements}
            notDoneAchievements={notDoneAchievements} />

          <Themes handleThemeChange={handleThemeChange} />
          
          <FriendsList friends={friends} />

          <PowerUps handlePowerUpChange={handlePowerUpChange}/>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Dashboard);