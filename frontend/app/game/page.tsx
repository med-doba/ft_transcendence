"use client"
import { useContext, useEffect, useState } from "react";
import gameSocket, { GameContext } from "../context/gameSockets";
import { matchInfo } from "./types/interfaces";
import { useRouter } from "next/navigation";
import { off } from "process";


function GameQueue() {

    const   router = useRouter();
    const   [progress, setProgress] = useState<number>(5);
    const   {data, setData, gameId, setGameId, playerL, playerR, setPlayerL, setPlayerR} = useContext(GameContext);
    
    // useEffect(() => {
        
    // }, [router, setData]);
    
    useEffect(() => {
            const handleMatchReady = (data: any) => {
            console.log('dat ==> ', data);
            setProgress(100);
            setData(data);
            setGameId(data[0].roomId);
            console.log('data: ', data);
            router.push(`/game/${data[0].roomId}`);
            data[0].id
            data[0].profilePic
            data[0].nickname
            data[0].opponentId
            data[1].id
            data[1].profilePic
            data[1].nickname
            data[1].opponentId
            setPlayerL({name: data[0].nickname, picture: data[0].profilePic});
            setPlayerR({name: data[1].nickname, picture: data[1].profilePic});
            // router.push(`/game/${Math.floor(Math.random() * 100) + 1}`);
        };
        
        gameSocket.on('MatchReady', handleMatchReady);
        gameSocket.emit('ImReady');
        // handleMatchReady('VSboot');

        return () => {
            gameSocket.off('MatchReady', handleMatchReady);
        };
    },[]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress < 90 ? prevProgress + 5 : prevProgress));
        }, 1000);
    
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <main className="main flex bg-cyan-900 justify-center items-center h-screen w-screen">
            <div className="bg-cyan-100 h-[93.75%] w-[95.83%] flex space-x-[0.87%] items-end justify-center rounded-[15px]">
                <div 
                className={`bg-black flex flex-col w-full  items-center relative rounded-[10px] transition-all duration-1000 ease-in-out bottom-0`}
                style={{ height: `${progress}%` }}
                >
                    <h1 className="text-red-600 text-3xl self-center">{`${progress}%`}</h1>
                </div>
            </div>
        </main>
    );
};

export default GameQueue;