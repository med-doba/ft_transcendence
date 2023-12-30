'use client';
import TopBar from "@/app/ui/top";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profileData } from "@/app/interfaces/interfaces";
import { ArrowTrendingUpIcon,   HandThumbUpIcon, UserPlusIcon, HandRaisedIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import { ArrowTrendingDownIcon,  ChatBubbleLeftEllipsisIcon, UserMinusIcon, WalletIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { FaUserFriends } from "react-icons/fa";
import ProgressBar from "@/app/ui/progressBar";
import Conditional from "@/app/ui/Conditional";

const matchHistory = [{
    id : "25/12/2024",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
{
    id : "26/12/2024",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : false,

},
{
    id : "26/2/2424",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
,
{
    id : "26/2/2424",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
{
    id : "26/24/2424",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
{
    id : "26/3/2424",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
{
    id : "26/120/2424",
    winner : {
        nickname:"player 1",
        profilePic:"url",
    },
    loser : {
        nickname : "player2",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : true,
},
{
    id : "26/185/2424",
    winner : {
        nickname:"med-doba",
        profilePic:"url",
    },
    loser : {
        nickname : "yimazoua",
        profilePic : "url",
    },
    winnerScore : 2,
    loserScore : 1,
    isMeWhoWon : false,
},]


const Profile = () => {

    const [isFriend, setIsFriend] = useState<boolean | undefined>(false);
    const [isprivateProfile, setisprivateProfile] = useState<boolean | undefined>(false);
    const pathname = usePathname();
    const [profileData, setProfileData] = useState<profileData | undefined>(undefined);
    let nickname : string = pathname.split("/")[2];

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/user/profile/${nickname}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });
                if (res.ok) {
                    const profileData = await res.json();
                    // console.log(profileData);
                    console.log("profile data == ", profileData);
                    setProfileData(profileData);
                }
            } catch (error) {
                console.error("Error during authentication check:", error);
            }
        };
        getProfileData();
        setIsFriend(profileData?.isfriend);
        setisprivateProfile(profileData?.privateProfile);
    }, []);
    var level : number = profileData?.userData?.level;

    return (
    <main className="flex flex-col">
        <TopBar />
        <div className="grid grid-cols-4 xl:mt-15 mt-20 lg:mt-5 lg:auto-rows-min xl:gap-5 gap-3 w-full md:grid-row-6 grid-row-6 ">
            <div className="relative col-start-1 col-end-5 xl:h-[33vh] lg:h-[33vh] md:h-[200px] h-[200px]  row-start-1 row-end-2 w-full shadow-md rounded-xl">
                <div className="flex relative  flex-col text-4xl text-white text-bold-900 rounded-xl xl:h-[33vh] lg:h-[33vh] md:h-[200px] h-[200px]">
                    <img src={profileData?.userData.BackgroundPic} className="w-full rounded-md h-full object-cover" alt="background Image"></img>
                    <h2 className="absolute top-2 left-0 pl-3 text-gray-300">{profileData?.userData.nickname}</h2>
                </div>
                <div  className="rounded-full lg:w-[100px] md:w-[90px] w-[80px] xl:h-[150px] xl:w-[150px] absolute bottom-0 left-0 transform  xl:translate-x-[10px] xl:translate-y-[55px] translate-x-[8px] translate-y-[32px] border-2 max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px]">
                    <img src={profileData?.userData.profilePic} alt="profile Picture" className="lg:w-[100px] md:w-[90px] w-[80px] xl:h-[150px] xl:w-[150px] rounded-full max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px]" />
                </div>
            </div>
            <div className="bg-lightblue lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:mt-0 mt-2 md:mt-4 lg:row-end-3 col-start-1 col-end-4 row-start-3 row-end-4
            h-[30px] xl:h-[40px] rounded-2xl lg:w-[100%] md:w-[100%] w-[90%] flex shadow-md">
                <ProgressBar level={level} />
            </div>
            <div className="relative col-start-4 col-end-5 mt-2 md:mt-4 bg-accents rounded-2xl lg:mt-0 lg:row-start-2 mx-auto h-[30px] xl:h-[40px] lg:row-end-3 row-start-3 row-end-4 flex w-[80%] lg:w-[70%] xl:w-[70%]">
                <Conditional isfriend={profileData?.isfriend} privateProfile = {profileData?.privateProfile} isBlocked = {profileData?.isBlocked} userId= {profileData?.userData?.id}/>
            </div>
            {/* 4 cards */}
            <div  className="bg-accents col-span-1 lg:row-start-3 row-start-4 row-end-5 flex justify-between lg:row-end-4 w-full xl:h-[12vh] lg:h-[12vh] md:h-[180px] h-[120px] shadow-md rounded-3xl">
                <div className="flex lg:flex-row flex-col h-full">
                    <WalletIcon className="text-white xl:w-[60px] xl:h-[60px] lg:w-[80px] mb-4 md:w-[80px] w-[40px] xl:mt-8 mt-4 lg:ml-2 md:ml-2 ml-0"/>
                    <p className="lg:text-2xl xl:text-3xl lg:block md:block hidden text-lg text-center xl:mt-12 lg:w-20 w-10 lg:ml-5 ml-7 pb-2 lg:mt-10 mt-3 text-bold-900">Wallet</p>
                </div>
                <h2 className="lg:text-2xl xl:text-5xl md:text-2xl text-lg mt-7 xl:mt-10 lg:mt-12 md:mt-10 text-bold-900 mr-3 md:mr-3 lg:mr-4">{profileData?.userData.wallet}</h2>
            </div>
            <div  className="bg-accents col-span-1 flex justify-between lg:row-start-3 xl:h-[12vh] lg:h-[12vh] h-[120px] row-start-4 row-end-5 lg:row-end-4 w-full` shadow-md rounded-3xl">
            <div className="flex lg:flex-row flex-col h-full">
                    <TrophyIcon className="text-white xl:w-[60px] xl:h-[60px] lg:w-[80px] mb-4 md:w-[80px] w-[70px] xl:mt-8 mt-4 lg:ml-2 md:ml-2 ml-0"/>
                    <p className="lg:text-2xl xl:text-3xl lg:block md:block hidden text-lg text-center xl:mt-12 lg:w-20 w-10 lg:ml-5 ml-7 pb-2 lg:mt-10 mt-3 text-bold-900">Rank</p>
                </div>
                <h2 className="lg:text-2xl xl:text-5xl md:text-2xl text-lg mt-7 xl:mt-10 lg:mt-12 md:mt-10 text-bold-900 mr-3 md:mr-3 lg:mr-4">2</h2>
            </div>
            <div className="bg-accents col-span-1 lg:row-start-3 row-start-4 row-end-5 lg:row-end-4 w-full xl:h-[12vh] lg:h-[12vh] h-[120px] shadow-md flex justify-between rounded-3xl">
                <HandThumbUpIcon width={150} height={100} className="text-white text-2xl xl:mt-5 lg:mt-5 mt-2"/>
                <span className="center text-black text-bold xl:mt-10 lg:mt-10 md:mt-5 mt-5 lg:mr-20 mr-5 ml-2 lg:text-5xl text-3xl" >2</span>
            </div>
            <div  className="bg-accents col-span-1 lg:row-start-3 row-start-4 row-end-5 lg:row-end-4 w-full xl:h-[12vh] lg:h-[12vh] h-[120px] shadow-md flex justify-between rounded-3xl">
                <HandThumbDownIcon width={150} height={100} className="text-white text-2xl xl:mt-5 lg:mt-5 mt-2"/>
                <span className="center text-black text-bold xl:mt-10 lg:mt-10 md:mt-5 mt-5 lg:mr-20 mr-5 ml-2 lg:text-5xl text-3xl" >2</span>
            </div>
            <div className="bg-accents lg:col-span-2 col-span-4 lg:row-start-4 lg:row-end-5 row-start-5 row-end-6 w-full xl:h-[37vh] lg:h-[38vh] h-[450px] shadow-md rounded-xl">
                <div className="overflow-y-scroll h-full pt-2 styled-scrollbar ">
                    <div className="lg:w-[90%] xl:w-[90%] w-[98%] mt-5 h-full  mx-auto">
                        {matchHistory.map((match) => {
                            return (
                            <div key={match?.id} className="flex flex-col border  border-lightQuartze rounded-xl w-full mt-2 xl:mt-4">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row m-3 items-center ">
                                        <img src="/yo.jpg" alt="profilePic" className="mt-2 w-10 h-10 xl:w-15 xl:w-15 rounded-full" />
                                        <h2 className="text-bold m-1 lg:ml-5 md:ml-5 ml-1 text-white lg:text-lg xl:text-2xl md:text-lg text-sm ">{match?.winner.nickname}</h2>
                                    </div>
                                    <div className="flex flex-col m-0">
                                        <div className="flex flex-row-reverse justify-evenly items-center border border-white rounded-xl xl:w-[100px] w-[100px] mb-2 h-[30px] xl:h-[40px] bg-button text-white">
                                        <span className="text-bold mt-2 xl:text-lg  h-full text-xl">{match?.isMeWhoWon ? `won` : `lose`}</span>  
                                        <div className="flex flex-row">
                                            <h2 className="text-bold ml-0 xl:mt-1 text-xl">{match?.winnerScore}</h2>
                                            <h2 className="text-bold xl:mt-1 text-xl">:</h2>
                                            <h2 className="text-bold mr-0 xl:mt-1 text-xl">{match?.loserScore}</h2>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse m-3 items-center"> 
                                        <img src="/yo1.jpg" alt="profilePic" className="mt-2 w-10 h-10 xl:w-15 xl:w-15 rounded-full" />
                                        <h2 className="text-bold m-2 lg:mr-5 md:mr-5 mr-1 lg:text-lg xl:text-2xl md:text-lg text-sm text-white" >{match?.loser.nickname}</h2>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="bg-accents lg:col-span-2 col-span-4 lg:row-start-4 lg:row-end-5 row-start-6 row-end-7 w-full xl:h-[37vh] lg:h-[38vh] h-[450px] shadow-md rounded-xl"> match history </div>
        </div>
    </main>
    );

}

export default  (Profile);