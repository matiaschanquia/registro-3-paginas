import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

const temas = ["Desarrollo de Software", "User Experiencie", "Diseño Gráfico"];

const App = () => {

	const [pagina, setPagina] = useState(1);
	const [data, setData] = useState({
		name: "",
		email: "",
		topics: temas.map(() => 0)
	});
	const [msgTopic, setMsgTopic] = useState(false);

	const submitHandlePaso1 = (e) => {
		e.preventDefault();
		setPagina(2);
	};

	const handleChangeName = (e) => {
		setData({
			...data,
			name: e.target.value
		});
	};

	const handleChangeEmail = (e) => {
		setData({
			...data,
			email: e.target.value
		});
	};

	const submitHandlePaso2 = (e) => {
		e.preventDefault();

		const activeTopics = data.topics.filter((topic) => {
			return topic === 1;
		});

		if(activeTopics.length === 0) {
			setMsgTopic(true);
			return;
		}

		setPagina(3);
		
	};

	const handleClickTema = (index) => {
		setMsgTopic(false);
		const copiaTopics = Array.from(data.topics);
		copiaTopics[index] = copiaTopics[index] === 1 ? 0 : 1;
		setData({
			...data,
			topics: copiaTopics
		});
	};

	return (
		<div className="app">
			<div className="container-app">
				<section className="section-form">
					{
						pagina === 1 ? 
							<div className="pagina1">
								<h1 className="titulo">Registro</h1>
								<form onSubmit={submitHandlePaso1}>
									<div>
										<label htmlFor="name">Nombre</label>
										<input type="text" name="name" id="name" placeholder="Ingrese su nombre" 
											onChange={handleChangeName} value={data.name} required/>
									</div>
									<div>
										<label htmlFor="name">Email</label>
										<input type="email" name="email" id="email" placeholder="Ingrese su email" 
											onChange={handleChangeEmail} value={data.email} required/>
									</div>
									<Button value="Confirmar"/>
								</form>
							</div> :
							pagina === 2 ? 
								<div className="pagina2">
									<h1 className="titulo">¿En qué temas estas interesado?</h1>
									<div className="temas">
										{
											temas.map((tema, index) => (
												<div key={index} onClick={() => handleClickTema(index)}
													className={`tema ${data.topics[index] === 1 ? "active" : ""}`} >
													<p>{tema}</p>
												</div>
											))
										}
									</div>
									{
										msgTopic ? <p className="msg-topic">Debe seleccionar un tema.</p> : ""
									}
									<p></p>
									<Button value="Continuar" submitHandlePaso2={submitHandlePaso2}/>
								</div> :
								pagina === 3 ? 
									<div className="pagina3">
										<h1 className="titulo">Resumen</h1>
										<div className="resumen">
											<p><span>Nombre:</span> {data.name}</p>
											<p><span>Email:</span> {data.email}</p>
											<br />
											<p className="titulo-temas">Temas:</p>
											<ul>
												{
													data.topics
														.reduce((acum, elem, index) => {
															if(elem === 1) {
																acum.push(index);
															}
															return acum;
														}, [])
														.map((item, index) => (
															<li key={index}>{temas[item]}</li>
														))
												}
											</ul>
										</div>
										<Button value="Confirmar" />
									</div> :
									<div className="pagina-error">
										<h1>Error</h1>
									</div>
					}
				</section>
				<div className="page-current">
					<p>Página {pagina} de 3</p>
					<div className="circles-pages">
						<span className={`active ${pagina === 1 ? "current" : ""}`}></span>
						<span className={`${pagina >= 2 ? "active" : ""} ${pagina === 2 ? "current" : ""}`}></span>
						<span className={`${pagina >= 3 ? "active" : ""} ${pagina === 3 ? "current" : ""}`}></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
