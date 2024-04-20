"use client"

import { ObjectId } from "mongoose"
import { useState } from "react";

type props = {
    addRuleToDB: any,
    leagueId: ObjectId
};

export default function RulesForm({addRuleToDB, leagueId}: props) {
    const [rule, setRule] = useState<string>("");
    const [value, setValue] = useState<number>(0);

    return (
        <div>
            
        </div>
    )
}