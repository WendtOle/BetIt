import { CreateBetterCard } from './CreateBetterCard';
import { Better } from "./types";
import { BetterCard } from "./BetterCard";

interface BettersPageProps {
    betters: Better[],
    onAdd: (name: string) => void,
    onUpdateAmount: (name: string) => (amount: number) => void
}

export const BettersPage = ({ betters, onAdd, onUpdateAmount }: BettersPageProps) => {
    return (<>
        <CreateBetterCard onAdd={onAdd} />
        {betters.map((better: Better) => <BetterCard better={better} onUpdateAmount={onUpdateAmount(better.name)} key={better.name} />)}
    </>)

}