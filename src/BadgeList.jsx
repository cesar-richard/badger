import React, {useContext} from 'react'
import {Grid} from 'semantic-ui-react'
import DataContext from "./DataContext";
import Badge from "./Badge";


const BadgeList = () => {
    const {badges, rectoImg} = useContext(DataContext);
    const rightColumn = badges.filter((v, i) => {
        return i % 2 === 1
    }).map((v, i) => <Badge key={i} jobTitle={v.jobTitle} lastName={v.lastName} firstName={v.firstName}
                            background={rectoImg}/>)
    const leftColumn = badges.filter((v, i) => {
        return i % 2 === 0
    }).map((v, i) => <Badge key={i} jobTitle={v.jobTitle} lastName={v.lastName} firstName={v.firstName}
                            background={rectoImg}/>)

    return (
        <Grid columns={2} centered>
            <Grid.Column className={"badgeColumn"}>
                {leftColumn}
            </Grid.Column>
            <Grid.Column className={"badgeColumn"}>
                {rightColumn}
            </Grid.Column>
        </Grid>
    )
}

export default BadgeList



