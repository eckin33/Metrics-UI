import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login_temp.jsx'
import PrivateRoute from './privateRoute';
import { Chart as ChartJS, defaults, Legend } from 'chart.js/auto';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = '#ffffffa6';
defaults.plugins.legend.labels.color = '#ffffffa6';
defaults.plugins.title.color = '#ffffffa6';
defaults.plugins.subtitle.color = '#ffffffa6';
defaults.plugins.tooltip.titleColor = '#ffffffa6';
defaults.plugins.tooltip.bodyColor = '#ffffffa6';

function Dashboard() {
  const navigate = useNavigate();
  let [dados, setDados] = useState(null)
  let [dadosFoco, setDadosFoco] = useState(null)
  let [dadosTask, setDadosTask] = useState(null)
  let [days, setDays] = useState(7)

  //Logout
  function HandleLogout() {
    localStorage.removeItem("token");
    navigate('/');
  }

  const trocarDays = (event) => {
    setDays(event.target.value);
  }

  //Lógica de expiração de token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/" />;
    }
    if (!token) {
      alert("Você precisa estar logado para acessar o dashboard.");
      navigate('/');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > exp) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        navigate('/');
      }

    } catch (error) {
      console.error("Token inválido:", error);
      localStorage.removeItem("token");
      navigate('/');
    }

  }, [navigate])


  //Coleta de dados API 
  useEffect(() => {
    async function fetchDashboard() {

      try {
        const token = localStorage.getItem("token");
        const request = await fetch(`https://backend-idf.vercel.app/dashboard?days=${days}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        let response = await request.json();

        if (response.error) {
          alert("Erro ao buscar dados do dashboard. Faça login novamente.")
          return;
        }
        setDados(response)

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    }
    fetchDashboard()
  }, [days])

  useEffect(() => {
    async function fetchTask() {

      try {
        const token = localStorage.getItem("token");
        const request = await fetch(`https://backend-idf.vercel.app/metrics/tasks/history?days=${days}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        let response = await request.json();

        if (response.error) {
          alert("Erro ao buscar dados do dashboard. Faça login novamente.")
          return;
        }
        setDadosTask(response)

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    }
    fetchTask()
  }, [days])

  useEffect(() => {
    async function fetchFocus() {

      try {
        const token = localStorage.getItem("token");
        const request = await fetch(`https://backend-idf.vercel.app/metrics/focus/history?days=${days}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        let response = await request.json();

        if (response.error) {
          alert("Erro ao buscar dados do dashboard. Faça login novamente.")
          return;
        }
        setDadosFoco(response)

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    }
    fetchFocus()
  }, [days])

  if (!dados) {
    return (
      <h1>Carregando...</h1>
    )
  }

  if (!dadosFoco) {
    return (
      <h1>Carregando...</h1>
    )
  }
  if (!dadosTask) {
    return (
      <h1>Carregando...</h1>
    )
  }

  let concluídasXcriadas = (dadosTask.quantidadeConcluidas > - dadosTask.quantidadeCriadas)
  let textoDias = ""

  switch (days) {
    case "1":
      textoDias = "Hoje"
      break;
    case "7":
      textoDias = "Nessa semana"
      break;
    case "14":
      textoDias = "Nos últimos 14 dias"
      break;
    case "30":
      textoDias = "Nos últimos 30 dias"
      break;
    case "9999":
      textoDias = "Desde o início"
      break;
    default:
      textoDias = "Nessa semana"
  }

  

  return (
    <div id='box_all'>
      <div id='header_box_all'>
        <h1 id='h1_'>Dashboard</h1>
        <div id='buttons_area'>
          <select name="days" className='form-select' id="select_days" value={days} onChange={trocarDays}>
            <option value="1" >Hoje</option>
            <option value="7" >7 Dias</option>
            <option value="14" >14 Dias</option>
            <option value="30" >30 Dias</option>
            <option value="9999" >Sempre</option>
          </select>
        </div>
      </div>

      <div id='part_top'>
        <div className="top_childrens" id='top_children_1'>
          <div className="graph_top" id='graph_top_1'>

            <Doughnut
              data={{
                labels: ["Login", "Tarefas", "Sessões de Foco"],
                datasets: [
                  {
                    label: "Quantidade",
                    data: [dados.quantidadeLogin, dados.quantidadeTarefas, dadosFoco.sessoesFoco]
                  }
                ],
                options: {
                  plugins: {
                    legend: {
                      display: true,
                      labels: {
                        color: '#ffffff'
                      }
                    }
                  }
                }

              }}

            />
          </div>
          <div className="graph_desc1">

          </div>
          <div className="graph_desc2">

          </div>
        </div>
        <div className="top_childrens" id='top_childrens_2'>
          <div className="graph_top">
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" id='bi-clock' className="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
          </div>
          <div className="graph_desc1">
            <h5 id='h5_'>{textoDias} você ficou focado<br /> <span id="destaque_"> {dadosFoco.tempoFocado == null ? "0" : dadosFoco.tempoFocado} {dadosFoco.tempoFocado == 1 ? "minuto." : "minutos."} </span></h5>

          </div>
          <div className="graph_desc2">

          </div>
        </div>
        <div className="top_childrens" id='top_children_3'>
          <div className="graph_top" id='graph_top_3'>
              <p className='descricoes_graph_top'>Seu índice de produtividade <br /> é de <span className='destaque'><strong>{dados.indiceProdutividade}</strong></span></p>
              <p className='descricoes_graph_top'>{dados.indiceProdutividade >= 6 ? "Continue assim! Focado! 🥳" : "Vamos focar + 🙃"}</p>

          </div>
          <div className="graph_desc1">

          </div>
          <div className="graph_desc2">

          </div>
        </div>
      </div>
      <div id='part_bottom'>
        <div className="bottom_childrens">
          <div className="graph_bottom">
            <Bar
              data={{
                labels: ["Tarefas criadas", "Tarefas concluídas ", "Tarefas deletadas"],
                datasets: [
                  {
                    label: "Quantidade",
                    data: [dadosTask.quantidadeCriadas, dadosTask.quantidadeConcluidas, dadosTask.quantidadeDeletadas]
                  }
                ]
              }}
            />

          </div>
          <div className="graph_bt_desc1">
            <p className='descricoes'><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>{concluídasXcriadas ? "Aí sim, ta concluindo todas!" : "Completa essas tarefas sô"}</p>
          </div>
          <div className="graph_bt_desc2">

          </div>
        </div>
        <div className="bottom_childrens">
          <div className="graph_bottom">
            <Bar
              data={{
                labels: ["Sessões de Foco", "Quantidade de Pausas"],
                datasets: [
                  {
                    label: "Quantidade",
                    //data: [7, 3],
                    
                    data: [dadosFoco.sessoesFoco, dadosFoco.quantidadePausas]
                  }
                ]
              }}
            />
          </div>
          <div className="graph_bt_desc1">
            <p className='descricoes'><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" fill="currentColor" className="bi bi-info" viewBox="0 0 16 16">
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>{dadosFoco.quantidadePausas >= 3 ? "Vamos focar mais e pausar menos! 😉" : "Lembre do seu objetivo. 🎯" }</p>
          </div>
          <div className="graph_bt_desc2">

          </div>
        </div>
      </div>
      {/* <button onClick={HandleLogout}>Logout</button> */}
    </div>
  )
}

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Metrics-UI/"
          element={<Login setLogado={setLogado} logado={logado} />} />
        <Route path="/Metrics-UI/dashboard"
          element={
            <PrivateRoute logado={logado}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
