'use client'
import { useContext, useEffect } from "react";
import PongZoneBoot from "../ui/BootLogic";
import GameResultBar from "../ui/GameResultBar";
import gameSocket, { GameContext } from "@/app/context/gameSockets";
import { usePathname } from "next/navigation";

function    BotGame(){

    const   path = usePathname();
    const   {gameId, setGameId, setPlayerL, setPlayerR} = useContext(GameContext);

    useEffect(() => {

        gameSocket.emit('ImReadyBot');

        const handleBotReady = (data: any) => {
            setGameId(data.id);
            setPlayerL({name: data.nickname, picture: data.profilePic});
            setPlayerR({name: 'BOT', picture: '/WhatsApp Image 2023-11-08 at 17.00.12_964408e7.jpg'});
        };

        gameSocket.on('BotReady', handleBotReady);
        
        return () => {
            gameSocket.off('BotReady', handleBotReady);
        };

    },[]);


    setInterval(() => {
        if (path !== `/game/bot`)
            gameSocket.emit('leaveGameBot');
    }, 1000);

    return (
        <main className="main flex bg-cyan-900 justify-center items-center h-screen w-screen">
            <div className="bg-cyan-100 h-[93.75%] w-[95.83%] flex space-x-[0.87%] items-end justify-center rounded-[15px]">
                <div className="flex flex-col w-[91.74%] h-[97.33%] items-center relative rounded-[10px]">
                        <GameResultBar />
                        {<PongZoneBoot />} 
                </div>
            </div>
        </main>
    );
};

export default BotGame;