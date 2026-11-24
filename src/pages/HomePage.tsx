import DashBoard from "../components/DashBoard";
import pfp from "../assets/pfp.png"
import {Line, Bar, Pie} from "react-chartjs-2";
import "../context/ContactsContext.tsx";
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    BarElement,
    Title, 
    Tooltip, 
    Legend,
    ArcElement
} from "chart.js"
import { ContactsProvider, useContacts } from "../context/ContactsContext.tsx";
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    ArcElement,
    BarElement,
    Title, 
    Tooltip, 
    Legend
);

const data = {
  labels: ['Website', 'Sistema de Gestão', 'Segurança'],
  datasets: [
    {
      label: '# de projetos',
      data: [19, 12, 3],
      backgroundColor: [
        'rgb(43, 145, 213)',
        'rgb(255, 207, 86)',
        'rgb(255, 99, 133)',
      ]
    },
  ],
};

/*
let dataLine = {
  labels: ['Julho', "Agosto", "Setembro", "Outubro"],
  datasets: [
    {
      label: 'Clientes Novos',
      data: [5, 12, 8, 6],
      backgroundColor: [
        'rgb(43, 145, 213)'
      ]
    },
  ],
};*/

async function teste_api(){
    const url = "https://pokeapi.co/api/v2/pokemon/gengar"
    const info = await fetch(url)
    const json = await info.json()
    //alert(json["id"])
    return json["id"]
}

import { ArrowSprintRegular } from '@fluentui/react-icons';

async function return_all_projects_tags(){
    const url = "https://jaga-crm-back.vercel.app/api/projeto"
    const info = await fetch(url)
    const json = await info.json()
    const table_lista = [];
    
    for(let i = 0; i < json.length; i++){
        const url_client = "https://jaga-crm-back.vercel.app/api/cliente/" + json[i]["cnpj_cliente"];
        const info_client = await fetch(url_client)
        const json_client = await info_client.json()
        const client_name = json_client[0]["nome"]
        
        table_lista.push(
            <td>{json[i]["titulo"]}</td>,
            <td>{client_name}</td>,
            <td>{json[i]["tipo"]}</td>,
            <td>prazo do mal</td>,
            <td>{json[i]["status"]}</td>
        )
    }
    return table_lista;
}

function HomePage(){
    const [dataLine, setDataLine] = useState({
        labels: ['teste', "teste", "teste", "teste"],
        datasets: [
            {
            label: 'Clientes Novos',
            data: [1, 2, 3, 4],
            backgroundColor: [
                'rgb(43, 145, 213)'
            ]
            },
        ],
        });


    const [projects_table, setProjectsTable] = useState<React.ReactNode>(null);

    useEffect(() => {
        async function merda(){
            const url = "https://pokeapi.co/api/v2/pokemon/pikachu"
            const info = await fetch(url)
            const json = await info.json()

            setDataLine({
            labels: ['Julho', "Agosto", "Setembro", "Outubro"],
            datasets: [
                {
                label: 'Clientes Novos',
                data: [json["id"], 12, 8, 6],
                backgroundColor: [
                    'rgb(43, 145, 213)'
                ]
                },
            ],
            })
        }

        merda();
        setProjectsTable(
        return_all_projects_tags()
        );
    }, []);

    const {contacts} = useContacts();
    const frase = contacts[0].name;
    const clients_total_count = contacts.length;
    return(
        <div>
            <ContactsProvider>
                <DashBoard></DashBoard>
                <div style={{overflow:"auto", height:"100vh", padding:"2rem", paddingTop:"1rem"}}>
                    <div style={{display:"flex"}}>
                        <div>
                            <h3>Dashboard</h3>
                            <p>Bem vindo à dashboard</p>
                        </div>
                        <div style={{marginLeft:"auto", display:"flex"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <img src={pfp} height="65rem"></img>
                                <p style={{margin:"0rem", marginLeft:"0.5rem"}}>Usuario</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div style={{border:"1px solid grey", borderRadius:"0.5rem", padding:"1rem", boxShadow:"4px 4px 10px grey"}}>
                                <h3 style={{textAlign:"left", marginBottom:"1rem"}}>Projetos em andamento</h3>
                                <table>
                                    <tr>
                                        <th style={{minWidth:"10rem"}}>Projeto</th>
                                        <th style={{minWidth:"10rem"}}>Cliente</th>
                                        <th style={{minWidth:"10rem"}}>Tipo</th>
                                        <th style={{minWidth:"10rem"}}>Prazo</th>
                                        <th style={{minWidth:"10rem"}}>Status</th>
                                    </tr>
                                    <tr>
                                        {projects_table}
                                    </tr>
                                </table>
                                {/*
                                <div style={{display:"flex", justifyContent:"flex-start"}}>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"8rem", marginRight:"1px"}}>Projeto</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Portal Corporativo</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Sistema de Gestão</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Segurança de Rede</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Loja Virtual</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Gestão de Estoque</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"6rem", marginRight:"1px"}}>Cliente</p>
                                        <p style={{paddingLeft:"0.5rem"}}>NovaTech</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Alpha Solutions</p>
                                        <p style={{paddingLeft:"0.5rem"}}>CKMT Corp.</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Orion Commerce</p>
                                        <p style={{paddingLeft:"0.5rem"}}>BluePeak</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"8rem", marginRight:"1px"}}>Tipo</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Website</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Sistema de Gestão</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Segurança</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Website</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Sistema de Gestão</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"2rem", marginRight:"1px"}}>Progresso</p>
                                        <p style={{color:"green", paddingLeft:"0.5rem"}}>15%</p>
                                        <p style={{color:"green", paddingLeft:"0.5rem"}}>92%</p>
                                        <p style={{color:"green", paddingLeft:"0.5rem"}}>52%</p>
                                        <p style={{color:"green", paddingLeft:"0.5rem"}}>66%</p>
                                        <p style={{color:"green", paddingLeft:"0.5rem"}}>67%</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"6rem", marginRight:"1px"}}>Prazo</p>
                                        <p style={{paddingLeft:"0.5rem"}}>12/10/2026</p>
                                        <p style={{paddingLeft:"0.5rem"}}>18/10/2026</p>
                                        <p style={{paddingLeft:"0.5rem"}}>08/10/2026</p>
                                        <p style={{paddingLeft:"0.5rem"}}>02/11/2026</p>
                                        <p style={{paddingLeft:"0.5rem"}}>15/11/2026</p>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <p style={{backgroundColor: "rgb(124, 154, 202)", padding:"0.5rem", paddingRight:"6rem"}}>Status</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Em andamento</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Em andamento</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Pausado</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Planejamento</p>
                                        <p style={{paddingLeft:"0.5rem"}}>Não iniciado</p>
                                    </div>
                                </div>
                                */}
                            </div>
                        </div>
                        <div className="col-4">
                            <div style={{border: "1px solid black", borderRadius:"0.5rem", padding:"1rem"}}>
                                <h3 style={{textAlign:"left"}}>Tipos de Projeto</h3>
                                <div style={{width:"25rem", height:"15rem", margin:"0 auto"}}>
                                    <Pie data={data} options={{maintainAspectRatio: false, plugins: { legend: { position: 'right' }}}}></Pie>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div>
                                <h3 style={{textAlign:"center"}}>Chamados novos por mês</h3>
                                <div style={{width:"30rem", height:"15rem", margin:"0 auto", aspectRatio: 1}}>
                                    <Bar data={dataLine}></Bar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    
                </div>
            </ContactsProvider>
        </div>
    );
}

export default HomePage;