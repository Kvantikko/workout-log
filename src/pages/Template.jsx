import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { resetWorkoutPath } from "../redux/reducers/navReducer"

import WorkoutDetails from "./WorkoutDetails"
import TemplateMenu from "../components/Menus/TemplateMenu"

const Template = () => {

    const { id }= useParams()
    const template = useSelector(state => state.templates.find(template => template.id === Number.parseInt(id)))
    const dispatch = useDispatch()

    return (
        <WorkoutDetails
            workout={template}
            backFunction={() => dispatch(resetWorkoutPath())}
            link="/"
            startButtonText="Start workout"
            menu={
                <TemplateMenu workout={template} />
            }
        />
    )
}

export default Template