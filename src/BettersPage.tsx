import { CreateBetterCard } from './CreateBetterCard';
import { Better } from "./types";
import { BetterCard } from "./BetterCard";

interface BettersPageProps {
    betters: Better[],
    onAdd: (name: string) => void,
    addToAccount: (name: string) => (amount: number, message: string) => void
    resetAccount: (name: string) => void;
}

export const BettersPage = ({ betters, onAdd, addToAccount, resetAccount }: BettersPageProps) => {
    return (<>
        <CreateBetterCard onAdd={onAdd} existingBetters={betters.map(({name}) => name)} />
        {betters.map((better: Better) => <BetterCard resetAccount={() => resetAccount(better.name)} better={better} addToAccount={addToAccount(better.name)} key={better.name} />)}
    </>)

}