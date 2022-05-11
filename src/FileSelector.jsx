import React, {useContext, useEffect, useState} from "react";
import {ImagePicker} from 'react-file-picker'
import {Button, Grid, Image} from "semantic-ui-react";
import DataContext from "./DataContext";

const FileSelector = () => {
    const {rectoImg, versoImg, updateBackgrounds} = useContext(DataContext)
    const [fgImg, setFgImg] = useState(rectoImg)
    const [bgImg, setBgImg] = useState(versoImg)

    useEffect(() => {
        updateBackgrounds(fgImg, bgImg)
    })

    return (
        <Grid centered>
            <Grid.Column>
                <Grid.Row>
                    <ImagePicker
                        extensions={['jpg', 'jpeg', 'png']}
                        dims={{minWidth: 700, maxWidth: 1000, minHeight: 100, maxHeight: 1000}}
                        onChange={base64 => setFgImg(base64)}
                        onError={errMsg => (console.error(errMsg))}
                    >
                        <Button color="green">
                            Front
                        </Button>
                    </ImagePicker>
                </Grid.Row>
                <Grid.Row>
                    <Image src={fgImg} size="large"/>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column>
                <Grid.Row>
                    <ImagePicker
                        extensions={['jpg', 'jpeg', 'png']}
                        dims={{minWidth: 700, maxWidth: 1000, minHeight: 100, maxHeight: 1000}}
                        onChange={base64 => setBgImg(base64)}
                        onError={errMsg => (console.error(errMsg))}
                    >
                        <Button color="red">
                            Back
                        </Button>
                    </ImagePicker>
                </Grid.Row>
                <Grid.Row>
                    <Image src={bgImg} size="large"/>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )

}

export default FileSelector
