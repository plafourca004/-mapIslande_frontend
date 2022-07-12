import { useEffect, useState } from 'react';
import './TagList.css'

function TagList(props) {

    const [checkedState, setCheckedState] = useState(new Array(props.tags.length).fill(true))
    const [checkAll, setCheckAll] = useState(true)

    useEffect(() => {
        if(checkedState.length === 0) {
            setCheckedState(new Array(props.tags.length).fill(true))
        }
    }, [props, checkedState.length])

    const listCheckedFromIsCheckedArray = (newCheckedState) => {
        let listChecked = []
        for(let i = 0; i < props.tags.length; i++) {
            if(newCheckedState[i]) {
                listChecked.push(props.tags[i])
            }
        }
        return listChecked;
    }

    const handleOnChange = (position) => {
        const newCheckedState = checkedState.map((tag, index) =>
            index === position ? !tag : tag
        )

        setCheckedState(newCheckedState)

        props.checkedChanged(listCheckedFromIsCheckedArray(newCheckedState))
    }

    const handleCheckAll = () => {
        let inverse = !checkAll
        setCheckAll(inverse)
        let newArray = new Array(props.tags.length).fill(inverse)
        setCheckedState(newArray)
        props.checkedChanged(listCheckedFromIsCheckedArray(newArray))
    }

  return (
    <div id="taglist">
        <h3>Catégories à afficher</h3>
        <ul>
            {props.tags.map((tag, index) => {
                if(checkedState.length > 0) {
                    return (
                        <li key={index}>
                            <div>
                                <input type="checkbox" className="cat" name={tag} value={tag} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                                <label>{tag}</label>
                            </div>
                        </li>
                    )
                }
                else return null
            })}<br />
            <li>
                <input type="checkbox" checked={checkAll} onChange={() => handleCheckAll()} />
                <lab>{checkAll ? "Déchocher" : "Cocher"} tout</lab>
            </li>
        </ul>
    </div>
  );
}

export default TagList;
