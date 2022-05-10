import React, {useContext, useState} from 'react'
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import Badge from "./Badge";
import DataContext from "./DataContext";
import {Button, Progress} from "semantic-ui-react";

const BadgeList = () => {
    const [working, setWorking] = useState(false);
    const [step, setStep] = useState(0)

    const generateImageFromElement = async (elem) => {
        elem.style.display = 'block'
        const canvas = await html2canvas(elem, {
            scale: 1,
            allowTaint: true,
            useCORS: true,
        })
        elem.style.display = 'none'
        const img = new Image();
        img.src = canvas.toDataURL('image/jpeg');
        return img
    }

    const generatePdf = async () => {
        const arr = document.querySelectorAll(".toRender")
        const imageBack = await generateImageFromElement(document.querySelector('#backside'))

        let i = 0
        const doc = new jsPDF();
        for (const elem of arr) {
            const img = await generateImageFromElement(elem)
            doc.addImage({imageData: img, format: 'JPEG', x: 8, y: 0});
            doc.addPage()
            setStep(++i)
            doc.addImage({imageData: imageBack, format: 'JPEG', x: 8, y: 0});
            doc.addPage()
            setStep(++i)
        }
        doc.deletePage(doc.internal.getNumberOfPages());
        doc.save('badger.pdf');
        setWorking(false)
        setStep(0)
    }

    const {badges} = useContext(DataContext);
    const renderedBadges = []
    let i = 0
    for (const v of badges) {
        if (i % 2 === 0) {
            renderedBadges.push([
                <Badge
                    jobTitle={v.jobTitle}
                    lastName={v.lastName}
                    firstName={v.firstName}
                    background={"/bg.png"}
                />,
                badges[i + 1] ?
                    <Badge
                        jobTitle={badges[i + 1].jobTitle}
                        lastName={badges[i + 1].lastName}
                        firstName={badges[i + 1].firstName}
                        background={"/bg.png"}
                    /> : null
            ])
        }
        i++
    }

    const grouppedBadges = []
    let tmp = []
    i = 0
    for (const v of renderedBadges) {
        tmp.push(
            <tr>
                <td className={"badgeColumn"}>
                    {v[0]}
                </td>
                <td className={"badgeColumn"}>
                    {v[1]}
                </td>
            </tr>
        )
        if (i % 4 === 0) {
            grouppedBadges.push(<div className={"toRender"} style={{display: "none"}}>{tmp}</div>)
            tmp = []
        }
        i++
    }
    if (tmp.length > 0) {
        grouppedBadges.push(<div className={"toRender"}>{tmp}</div>)
    }

    return (
        <>
            <Button
                primary
                disabled={working}
                onClick={() => {
                    setWorking(true);
                    generatePdf()
                }}>
                Télécharger
            </Button>
            {working &&
                <Progress value={step} total={document.querySelectorAll(".toRender").length * 2} progress='ratio'/>
            }
            <div id="backside" style={{display: "none"}}>
                <tr>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                    <td>
                        <Badge id="backside" background={'/numbers.png'}/>
                    </td>
                </tr>
            </div>
            <table>
                {grouppedBadges}
            </table>
        </>
    )
}

export default BadgeList;