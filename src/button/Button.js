import './Button.css'

function Button(props) {
    return (
        <button className="button" onClick={props.onClick} 
        style={
            {   backgroundColor: props.bgColor, 
                border: "1px solid",
                borderColor: props.bgColor,
                borderRadius: "5px",
                color: props.color,
                width: "100px",
                height: "40px",
                textAlign: "center",
                fontSize: "20px"
            }
        }>
            { props.text }
        </button>
    )
}

export default Button