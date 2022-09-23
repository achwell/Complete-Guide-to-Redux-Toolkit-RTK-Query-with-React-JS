import React, {FC} from "react"
import { Card, Skeleton } from "antd"

interface Props {
    count: number
}

const LoadingCard: FC<Props> = ({ count }) => {
    const cards = () => {
        let totalCards = []

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Card className="col-md-12" key={i}>
                <Skeleton active></Skeleton>
                </Card>
        );
        }
        return totalCards;
    }
    return <div className="row pb-5">{cards()}</div>
}

export default LoadingCard
