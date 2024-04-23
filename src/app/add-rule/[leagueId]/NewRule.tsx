"use client"

import { IRule } from "@/app/models/Rule";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import { v4 as uuid } from 'uuid';


type props = {
    setRules: Dispatch<SetStateAction<IRule[]>>
}

export default function NewRule({setRules}: props) {
    const [rule, setRule] = useState<string>("");
    const [value, setValue] = useState<number>(1);
    const [ruleId, setRuleId] = useState<string>("");

    useEffect(() => {
        setRuleId(uuid());
    }, []);

    return (
        <>
        <div className="mb-3 flex justify-between w-[610px] items-center">
            <label>Rule:</label>
            <input 
                type="text"
                name="rule"
                value={rule}
                onChange={(e) => setRule(e.target.value)}
                className="text-black p-1 w-[500px]"
            />
            </div>
            <div className="flex justify-between w-[610px] items-center">
            <label>Point Value:</label>
            <input 
                type="number"
                min={1}
                name="value"
                value={value}
                onChange={(e) => setValue(+e.target.value)}
                className="text-black p-1"
            />
            </div>
            <p>{ruleId}</p>
        </>
    )
}