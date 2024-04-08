
const Button = (props) => {
	return (
		<div>
			{
				!props.submitHandlePaso2 ? 
					<input className="main-button" type="submit" value={props.value}/> :
					<input className="main-button" type="submit" value={props.value} onClick={props.submitHandlePaso2}/>
			}
		</div>
	);
}; 

export default Button;