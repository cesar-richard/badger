import React, {useContext} from 'react'
import {Container, Form, Input} from 'semantic-ui-react'
import DataContext from "./DataContext";


const BadgeForm = () => {
    const context = useContext(DataContext);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [jobTitle, setJobTitle] = React.useState('');
    return (
        <Container>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Prénom</label>
                    <Input fluid placeholder='Prénom' value={firstName}
                           onChange={(event, {value}) => setFirstName(value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Nom</label>
                    <Input fluid placeholder='Nom' value={lastName} onChange={(event, {value}) => setLastName(value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Poste</label>
                    <Input fluid placeholder='Poste' value={jobTitle}
                           onChange={(event, {value}) => setJobTitle(value)}/>
                </Form.Field>
                <Form.Button primary disabled={firstName === '' && lastName === '' && jobTitle === ''} onClick={() => {
                    context.addBadge({
                        firstName,
                        lastName,
                        jobTitle,
                        created: Date.now()
                    })
                    setFirstName('');
                    setLastName('');
                    setJobTitle('');
                }
                }
                >
                    Ajouter
                </Form.Button>
                <Form.Button disabled={context.badges.length === 0} onClick={() => {
                    setFirstName('');
                    setLastName('');
                    setJobTitle('');
                    context.clearBadges();
                }
                }
                >
                    Tout supprimer
                </Form.Button>
            </Form.Group>
        </Container>
    )
}

export default BadgeForm

