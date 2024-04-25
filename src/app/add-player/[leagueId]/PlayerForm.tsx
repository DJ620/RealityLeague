"use client";
import { ILeague } from "@/app/models/League";
import { IPlayer } from "@/app/models/Player";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";

type props = {
    addPlayer: (
        player: string, leagueMongoId: ObjectId
    ) => Promise<ILeague>;
    leagueId: ObjectId;
};

export default function PlayerForm({addPlayer, leagueId}: props) {
    const router = useRouter();
    const [player, setPlayer] = useState<string>("");

    const handleAddPlayer = async () => {
        await addPlayer(player, leagueId);
        router.refresh();
    };

    return (
        <form onSubmit={handleAddPlayer}>
            <div className="mb-3">
                <label>Player name:</label>
                <input 
                    type="text"
                    name="player"
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                    className="text-black p-1"
                />
            </div>
            <button type="submit">Add Player</button>
        </form>
    )
}