import React from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    const { setLogado } = props;
    const [iuser, setIuser] = React.useState("");
    const [ipass, setIpass] = React.useState("");
    const [load, setLoad] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        const formData = {
            email: iuser,
            password: ipass
        }
        if (!formData.email || !formData.password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        const response = await fetch("https://backend-idf.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        const result = await response.json()

        // Verificar se o registro foi bem-sucedido
        if (result.token) {
            let meuToken = result.token
            let userName = result.user.name
            localStorage.setItem("userLogado", userName)
            localStorage.setItem("token", meuToken)
            alert("Login realizado com sucesso!")
            setLogado(true);
            setLoad(false)
            navigate('/dashboard');


            // Redirecionar para a página desejada após o login bem-sucedido
        } else {
            if (result.message == "Email não encontrado.") {
                //new bootstrap.Toast(document.getElementById('liveToastEmail')).show();
                setLoad(false)
                alert("Email não encontrado.")
                return
            }
            if (result.message == "Senha incorreta") {
                //new bootstrap.Toast(document.getElementById('liveToastPass')).show()
                setLoad(false)
                alert("Senha incorreta.")
                return;
            }
        }
    }




    return (
        <form id="formLogin" onSubmit={handleSubmit}>
            <div className="modal-overlay active">
                <div id="principal">
                    <h4>Login Metric UI</h4>
                    <div className="input-group">
                        <span className="ico">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#e3e3e3">
                                <path
                                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>
                        </span>
                        <input type="text" id="iuser" placeholder="User" autoComplete="username" required value={iuser}
                            onChange={(e) => setIuser(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <span className="ico">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#Fff">
                                <path
                                    d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                            </svg>
                        </span>
                        <input type="password" id="ipass" placeholder="Password" autoComplete="current-password" required value={ipass} onChange={(e) => setIpass(e.target.value)} />
                    </div>

                    <button type="submit" id="go">
                        <span className="spinner-border spinner-border-sm" aria-hidden="true" id="load" style={{display: load ? 'inline-block' : 'none'}}></span> 
                        Go</button>
                    <span id="jaTem">Não tem uma conta? <a href="https://eckin33.github.io/Projeto-IdFocus/" id="a_jaTem" target='blank'>Cadastrar</a></span>
                </div>
            </div>
        </form>
    )
}

export default Login